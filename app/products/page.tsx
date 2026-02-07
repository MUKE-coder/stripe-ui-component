import db from "@/lib/prisma";
import { ProductGrid } from "@/components/stripe/product-grid";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await db.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="mt-1 text-muted-foreground">
            Browse our collection and add items to your cart
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Category filters */}
      <div className="mb-6 flex gap-2">
        <Link
          href="/products"
          className="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <ProductGrid
        products={products.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          price: p.price,
          image: p.image,
          categoryId: p.categoryId || undefined,
        }))}
      />
    </div>
  );
}
