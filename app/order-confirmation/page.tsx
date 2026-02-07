import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OrderConfirmation } from "@/components/stripe/order-confirmation";
import { Suspense } from "react";

export default async function OrderConfirmationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center">Loading...</div>}>
      <OrderConfirmation />
    </Suspense>
  );
}
