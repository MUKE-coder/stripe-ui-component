"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/components/zustand-cart";
import { AddressForm, type ShippingAddress } from "./address-form";
import { OrderSummary } from "./order-summary";
import { CheckoutForm } from "./checkout-form";
import { StripeProvider } from "./stripe-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotalPrice } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [error, setError] = useState<string>("");
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = getCartTotalPrice();
  const deliveryFee = items.length > 0 ? 9.99 : 0;
  const tax = totalPrice * 0.05;
  const orderTotal = totalPrice + deliveryFee + tax;

  const isAddressValid =
    address.fullName.trim() !== "" &&
    address.addressLine1.trim() !== "" &&
    address.city.trim() !== "" &&
    address.state.trim() !== "" &&
    address.postalCode.trim() !== "" &&
    address.country.trim() !== "";

  const handleProceedToPayment = async () => {
    if (!isAddressValid) {
      setError("Please fill in all required address fields.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setIsCreatingIntent(true);
    setError("");

    try {
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            image: item.image,
          })),
          shippingAddress: address,
          deliveryFee,
          tax,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment intent");
      }

      setClientSecret(data.clientSecret);
      setOrderId(data.orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsCreatingIntent(false);
    }
  };

  if (items.length === 0 && !clientSecret) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground">
          Add some products before checking out.
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Address + Payment */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <AddressForm address={address} onChange={setAddress} />
          </div>

          {clientSecret ? (
            <div className="rounded-lg border bg-card p-6">
              <StripeProvider clientSecret={clientSecret}>
                <CheckoutForm totalAmount={orderTotal} orderId={orderId} />
              </StripeProvider>
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Payment</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Fill in your shipping address above, then proceed to payment.
              </p>

              {error && (
                <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  <p>{error}</p>
                  {error.includes("products not found") && (
                    <p className="mt-2 text-xs">
                      Your cart may contain outdated items. Please{" "}
                      <button
                        type="button"
                        className="underline font-medium"
                        onClick={() => {
                          useCartStore.getState().clearCart();
                          setError("");
                        }}
                      >
                        clear your cart
                      </button>{" "}
                      and add products from the{" "}
                      <Link href="/products" className="underline font-medium">
                        products page
                      </Link>
                      .
                    </p>
                  )}
                </div>
              )}

              <Button
                onClick={handleProceedToPayment}
                disabled={!isAddressValid || isCreatingIntent}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                size="lg"
              >
                {isCreatingIntent ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Preparing Payment...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
