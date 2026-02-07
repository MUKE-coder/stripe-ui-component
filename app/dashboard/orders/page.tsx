import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/prisma";
import { OrderHistory } from "@/components/stripe/order-history";

export default async function OrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: {
        select: { items: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          View and track your order history
        </p>
      </div>

      <OrderHistory
        orders={orders.map((order) => ({
          ...order,
          createdAt: order.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
