import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const categories = [
  {
    name: "Men's Clothing",
    slug: "mens-clothing",
    description: "Premium clothing for men",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500&q=80",
  },
  {
    name: "Women's Clothing",
    slug: "womens-clothing",
    description: "Elegant clothing for women",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&q=80",
  },
];

const products = [
  // Men's Clothing
  {
    name: "Classic Oxford Shirt",
    description: "A timeless oxford button-down shirt in crisp white cotton. Perfect for both casual and formal occasions.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
    categorySlug: "mens-clothing",
  },
  {
    name: "Slim Fit Chino Pants",
    description: "Modern slim fit chinos crafted from premium stretch cotton. Comfortable all-day wear with a tailored look.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
    categorySlug: "mens-clothing",
  },
  {
    name: "Merino Wool Sweater",
    description: "Luxuriously soft merino wool crew neck sweater. Lightweight warmth for layering in any season.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1638643391904-9b551ba91eaa?w=500&q=80",
    categorySlug: "mens-clothing",
  },
  {
    name: "Leather Bomber Jacket",
    description: "Premium genuine leather bomber jacket with ribbed cuffs and hem. A wardrobe essential for the modern man.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    categorySlug: "mens-clothing",
  },
  {
    name: "Tailored Blazer",
    description: "A sharp tailored blazer in navy blue. Made from Italian wool blend for a sophisticated, polished look.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80",
    categorySlug: "mens-clothing",
  },
  // Women's Clothing
  {
    name: "Silk Wrap Dress",
    description: "Elegant silk wrap dress with a flattering silhouette. Perfect for dinner parties and special occasions.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    categorySlug: "womens-clothing",
  },
  {
    name: "Cashmere Cardigan",
    description: "Ultra-soft cashmere cardigan in a relaxed fit. Effortless luxury for everyday styling.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a98?w=500&q=80",
    categorySlug: "womens-clothing",
  },
  {
    name: "High-Waisted Trousers",
    description: "Sophisticated high-waisted wide-leg trousers. Versatile enough for the office or a night out.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80",
    categorySlug: "womens-clothing",
  },
  {
    name: "Linen Blazer",
    description: "Lightweight linen blazer in a soft blush tone. Ideal for spring and summer layering.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=500&q=80",
    categorySlug: "womens-clothing",
  },
  {
    name: "Floral Midi Skirt",
    description: "Beautiful floral print midi skirt with a flowing silhouette. Pairs perfectly with a simple blouse.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80",
    categorySlug: "womens-clothing",
  },
];

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.slug] = created.id;
    console.log(`Created category: ${cat.name}`);
  }

  // Create products
  for (const product of products) {
    const { categorySlug, ...productData } = product;
    await prisma.product.create({
      data: {
        ...productData,
        categoryId: createdCategories[categorySlug],
      },
    });
    console.log(`Created product: ${product.name}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
