"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/components/zustand-cart";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId?: string;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold">No products found</h3>
        <p className="text-sm text-muted-foreground">
          Check back later for new products.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-50">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="mb-1 line-clamp-1 text-sm font-semibold transition-colors group-hover:text-indigo-600">
                {product.name}
              </h3>
              <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
                <Button
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      <FloatingCart />
    </>
  );
}

function FloatingCart() {
  const { items, getCartTotalItems, getCartTotalPrice } = useCartStore();
  const totalItems = getCartTotalItems();
  const totalPrice = getCartTotalPrice();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/checkout">
        <Button
          size="lg"
          className="flex items-center gap-3 bg-indigo-600 shadow-lg hover:bg-indigo-700"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
          <span className="border-l border-white/30 pl-3">
            ${totalPrice.toFixed(2)}
          </span>
        </Button>
      </Link>
    </div>
  );
}
