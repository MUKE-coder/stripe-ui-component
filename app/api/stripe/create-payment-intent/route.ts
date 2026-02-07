import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { headers } from "next/headers";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export async function POST(req: Request) {
  try {
    // Authenticate user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      items,
      shippingAddress,
      deliveryFee = 0,
      tax = 0,
    }: {
      items: CartItem[];
      shippingAddress: ShippingAddress;
      deliveryFee: number;
      tax: number;
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Verify products exist in our database and get current prices
    const productIds = items.map((item) => item.productId);
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      const foundIds = products.map((p) => p.id);
      const missingIds = productIds.filter((id) => !foundIds.includes(id));
      return NextResponse.json(
        {
          error:
            "Some products not found. Your cart may contain outdated items. Please clear your cart and add products from the products page.",
          missingIds,
        },
        { status: 400 }
      );
    }

    // Ensure products exist in Stripe, create if not
    for (const product of products) {
      if (!product.stripeProductId || !product.stripePriceId) {
        const stripeProduct = await stripe.products.create({
          name: product.name,
          description: product.description || undefined,
          images: product.image ? [product.image] : undefined,
        });

        const stripePrice = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: Math.round(product.price * 100),
          currency: "usd",
        });

        await db.product.update({
          where: { id: product.id },
          data: {
            stripeProductId: stripeProduct.id,
            stripePriceId: stripePrice.id,
          },
        });
      }
    }

    // Calculate total using DB prices (not client prices) for security
    const subtotal = items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);

    const totalAmount = subtotal + deliveryFee + tax;
    const amountInCents = Math.round(totalAmount * 100);

    // Create order in database
    const order = await db.order.create({
      data: {
        userId: session.user.id,
        status: "pending",
        paymentStatus: "unpaid",
        totalAmount,
        shippingAddress: JSON.stringify(shippingAddress),
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: product?.price || item.price,
            };
          }),
        },
      },
    });

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: order.id,
        userId: session.user.id,
      },
    });

    // Update order with payment intent ID
    await db.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
