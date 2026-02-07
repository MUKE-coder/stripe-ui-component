"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/components/zustand-cart";
import Link from "next/link";
import Image from "next/image";

interface OrderDetails {
  id: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  } | null;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      image: string;
    };
  }[];
  createdAt: string;
}

export function OrderConfirmation() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const clearCart = useCartStore((state) => state.clearCart);

  const paymentIntentId = searchParams.get("payment_intent");
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentIntentId || !orderId) {
        setError("Missing payment information.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/stripe/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId, orderId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify payment");
        }

        setOrderDetails(data.order);

        // Clear cart on successful payment
        if (data.order.paymentStatus === "paid") {
          clearCart();
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to verify payment"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentIntentId, orderId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        <p className="text-lg text-muted-foreground">
          Verifying your payment...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <XCircle className="h-16 w-16 text-destructive" />
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  if (!orderDetails) return null;

  const isPaid = orderDetails.paymentStatus === "paid";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        {isPaid ? (
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        ) : (
          <XCircle className="mx-auto h-16 w-16 text-yellow-500" />
        )}

        <h1 className="mt-4 text-3xl font-bold">
          {isPaid ? "Payment Successful!" : "Payment Pending"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {isPaid
            ? "Thank you for your purchase. Your order has been confirmed."
            : "Your payment is being processed. We'll update you shortly."}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Order ID: {orderDetails.id}
        </p>
      </div>

      {/* Order Items */}
      <div className="mt-8 rounded-lg border bg-card p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Package className="h-5 w-5" />
          Order Items
        </h3>
        <div className="space-y-3">
          {orderDetails.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${orderDetails.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      {orderDetails.shippingAddress && (
        <div className="mt-6 rounded-lg border bg-card p-6">
          <h3 className="mb-2 text-lg font-semibold">Shipping Address</h3>
          <p className="text-sm text-muted-foreground">
            {orderDetails.shippingAddress.fullName}
          </p>
          <p className="text-sm text-muted-foreground">
            {orderDetails.shippingAddress.addressLine1}
          </p>
          {orderDetails.shippingAddress.addressLine2 && (
            <p className="text-sm text-muted-foreground">
              {orderDetails.shippingAddress.addressLine2}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {orderDetails.shippingAddress.city},{" "}
            {orderDetails.shippingAddress.state}{" "}
            {orderDetails.shippingAddress.postalCode}
          </p>
          <p className="text-sm text-muted-foreground">
            {orderDetails.shippingAddress.country}
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <Button asChild variant="outline">
          <Link href="/dashboard/orders">View My Orders</Link>
        </Button>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
