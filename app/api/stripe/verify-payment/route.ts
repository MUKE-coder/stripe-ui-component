import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // Authenticate user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { paymentIntentId, orderId } = await req.json();

    if (!paymentIntentId || !orderId) {
      return NextResponse.json(
        { error: "Missing payment intent ID or order ID" },
        { status: 400 }
      );
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Find the order and verify it belongs to the user
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Update order based on payment status
    if (paymentIntent.status === "succeeded" && order.paymentStatus !== "paid") {
      await db.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "paid",
          status: "completed",
        },
      });

      return NextResponse.json({
        order: {
          ...order,
          paymentStatus: "paid",
          status: "completed",
          shippingAddress: order.shippingAddress
            ? JSON.parse(order.shippingAddress)
            : null,
        },
      });
    }

    return NextResponse.json({
      order: {
        ...order,
        shippingAddress: order.shippingAddress
          ? JSON.parse(order.shippingAddress)
          : null,
      },
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
