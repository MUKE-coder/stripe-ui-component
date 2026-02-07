"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CreditCard,
  ShoppingBag,
  Shield,
  Package,
  CheckCircle,
  ArrowRight,
  Copy,
  Check,
  LayoutDashboard,
  ShoppingCart,
  Globe,
  Youtube,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const registryUrl = `${baseUrl}/r/stripe-ui-component.json`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function CodeBlock({
  children,
  title,
}: {
  children: string;
  title?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-50 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
          </div>
          {title && (
            <span className="text-xs text-zinc-500 ml-2">{title}</span>
          )}
        </div>
        <CopyButton text={children} />
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function TechBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-700 dark:text-violet-300">
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 text-white shadow-md">
              <CreditCard className="h-4.5 w-4.5" />
            </div>
            <span className="font-bold text-lg">Stripe UI</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="https://www.youtube.com/@JBWEBDEVELOPER"
              target="_blank"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/muke-johnbaptist-95bb82198/"
              target="_blank"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://jb.desishub.com"
              target="_blank"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Globe className="h-5 w-5" />
            </Link>
            <div className="w-px h-6 bg-border mx-2" />
            <Link href="/products">
              <Button className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md">
                View Demo
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300 mb-6">
            <CreditCard className="h-4 w-4" />
            shadcn Registry Component
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Stripe UI Component
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A complete file storage solution with Stripe Payment Element and checkout support.
            Includes payment components, order management, and example pages.
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <TechBadge icon={CreditCard} label="Stripe Payment Element" />
            <TechBadge icon={Shield} label="Next.js 16" />
            <TechBadge icon={Package} label="Prisma 7" />
            <TechBadge icon={ShoppingCart} label="Zustand" />
          </div>
        </div>
      </section>

      {/* Quick Install - Gradient Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-linear-to-br from-violet-600 via-indigo-600 to-purple-700 p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Quick Install
            </h2>
            <p className="text-violet-200 mb-6">
              Install the stripe-ui component using the shadcn CLI:
            </p>
            <div className="rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur text-zinc-50 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-zinc-500 ml-2">Terminal</span>
                </div>
                <CopyButton text={`pnpm dlx shadcn@latest add ${registryUrl}`} />
              </div>
              <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code>
                  <span className="text-green-400">pnpm dlx</span>{" "}
                  <span className="text-zinc-300">shadcn@latest add</span>{" "}
                  <span className="text-violet-400 break-all">{registryUrl}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What&apos;s Included</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Everything you need for a complete Stripe checkout experience in
              your Next.js application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CreditCard,
                title: "Payment Element",
                desc: "Embedded Stripe Payment Element with automatic card detection, 3D Secure, and multiple payment methods.",
              },
              {
                icon: ShoppingCart,
                title: "Cart & Checkout",
                desc: "Full checkout flow with order summary, shipping address form, and cart integration via Zustand.",
              },
              {
                icon: Package,
                title: "Order Management",
                desc: "Order history, order details, payment verification, and status tracking in the dashboard.",
              },
              {
                icon: Shield,
                title: "API Routes",
                desc: "Server-side payment intent creation, automatic Stripe product sync, and payment verification.",
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-500/30 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-500/10 to-indigo-500/10 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 transition-colors mb-3">
                    <feature.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section id="installation" className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Installation Guide</h2>
            <p className="text-muted-foreground text-lg">
              Follow these steps to add Stripe checkout to your Next.js project.
            </p>
          </div>

          <div className="space-y-10">
            {/* Step 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-md">
                  1
                </span>
                Prerequisites
              </h3>
              <p className="text-sm text-muted-foreground mb-4 ml-11">
                This component requires{" "}
                <strong className="text-foreground">better-auth-ui</strong> (for authentication & Prisma setup) and{" "}
                <strong className="text-foreground">zustand-cart</strong> (for cart state management) to be installed
                first.
              </p>
              <div className="ml-11 space-y-3">
                <CodeBlock title="Install better-auth-ui">
                  {`pnpm dlx shadcn@latest add https://better-auth-ui.desishub.com/r/auth-components.json`}
                </CodeBlock>
                <CodeBlock title="Install zustand-cart">
                  {`pnpm dlx shadcn@latest add https://jb.desishub.com/r/zustand-cart.json`}
                </CodeBlock>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-md">
                  2
                </span>
                Install the Stripe UI Component
              </h3>
              <div className="ml-11">
                <CodeBlock title="Install">
                  {`pnpm dlx shadcn@latest add ${registryUrl}`}
                </CodeBlock>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-md">
                  3
                </span>
                Add Prisma Models
              </h3>
              <p className="text-sm text-muted-foreground mb-4 ml-11">
                Add the following models to your <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">prisma/schema.prisma</code> file.
                Also add <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">orders Order[]</code> to your User model.
              </p>
              <div className="ml-11">
                <CodeBlock title="prisma/schema.prisma">
{`model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  image       String?
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  products    Product[]
}

model Product {
  id              String      @id @default(cuid())
  name            String
  description     String?
  price           Float
  image           String
  stripeProductId String?
  stripePriceId   String?
  categoryId      String?
  category        Category?   @relation(fields: [categoryId], references: [id])
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  orderItems      OrderItem[]
}

model Order {
  id              String      @id @default(cuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  status          String      @default("pending")
  paymentStatus   String      @default("unpaid")
  paymentIntentId String?     @unique
  totalAmount     Float
  shippingAddress String?
  items           OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Float
}`}
                </CodeBlock>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-md">
                  4
                </span>
                Environment Variables
              </h3>
              <p className="text-sm text-muted-foreground mb-4 ml-11">
                Add your Stripe keys to <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">.env</code>.
                Get your keys from the{" "}
                <a
                  href="https://dashboard.stripe.com/apikeys"
                  target="_blank"
                  className="text-violet-600 dark:text-violet-400 hover:underline font-medium"
                >
                  Stripe Dashboard
                </a>.
              </p>
              <div className="ml-11">
                <CodeBlock title=".env">
{`STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`}
                </CodeBlock>
              </div>
            </div>

            {/* Step 5 */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-md">
                  5
                </span>
                Run Migration & Seed
              </h3>
              <div className="ml-11 space-y-3">
                <CodeBlock title="Generate & Migrate">
{`npx prisma generate
npx prisma migrate dev --name add_stripe_models`}
                </CodeBlock>
                <p className="text-sm text-muted-foreground">
                  Optionally, seed your database with sample products using the included seed file.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-md">
                  6
                </span>
                Configure Image Domains
              </h3>
              <p className="text-sm text-muted-foreground mb-4 ml-11">
                Add your product image domains to <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">next.config.ts</code>.
              </p>
              <div className="ml-11">
                <CodeBlock title="next.config.ts">
{`const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Add your image domains here
    ],
  },
};`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Usage</h2>
            <p className="text-muted-foreground text-lg">
              After installation, these components and pages are ready to use.
            </p>
          </div>

          <div className="space-y-6">
            <CodeBlock title="Using the ProductGrid component">
{`import { ProductGrid } from "@/components/stripe/product-grid";

// Fetch products from your database
const products = await db.product.findMany({
  include: { category: true },
});

<ProductGrid products={products} />`}
            </CodeBlock>

            <CodeBlock title="Using the CheckoutPage component">
{`import { CheckoutPage } from "@/components/stripe/checkout-page";

// The checkout page handles everything:
// - Cart items display with images
// - Shipping address form
// - Stripe Payment Element
// - Payment confirmation & redirect
<CheckoutPage />`}
            </CodeBlock>

            <CodeBlock title="Using the OrderHistory component">
{`import { OrderHistory } from "@/components/stripe/order-history";

const orders = await db.order.findMany({
  where: { userId: session.user.id },
  include: { items: { include: { product: true } } },
  orderBy: { createdAt: "desc" },
});

<OrderHistory orders={orders} />`}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* Directory Structure */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Directory Structure</h2>
            <p className="text-muted-foreground text-lg">
              Files added to your project after installation.
            </p>
          </div>

          <CodeBlock title="Installed files">
{`components/stripe/
├── stripe-provider.tsx     # Stripe Elements wrapper
├── checkout-form.tsx       # Payment Element form
├── checkout-page.tsx       # Full checkout layout
├── address-form.tsx        # Shipping address inputs
├── order-summary.tsx       # Cart items display
├── order-confirmation.tsx  # Post-payment verification
├── order-history.tsx       # Orders table
├── product-grid.tsx        # Product cards with cart
└── index.ts                # Barrel export

lib/
└── stripe.ts               # Server-side Stripe instance

app/api/stripe/
├── create-payment-intent/
│   └── route.ts            # Create PaymentIntent + Order
└── verify-payment/
    └── route.ts            # Verify payment & update order

app/
├── products/page.tsx       # Product listing page
├── checkout/page.tsx       # Checkout page (protected)
├── order-confirmation/
│   └── page.tsx            # Payment confirmation
└── dashboard/orders/
    ├── page.tsx            # My Orders list
    └── [id]/page.tsx       # Order detail view`}
          </CodeBlock>
        </div>
      </section>

      {/* Example Pages */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Example Pages</h2>
            <p className="text-muted-foreground text-lg">
              Try out the demo pages included with the component.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShoppingBag,
                title: "Products Page",
                href: "/products",
                features: [
                  "Product grid with images & prices",
                  "Add to cart functionality",
                  "Category filtering",
                ],
              },
              {
                icon: CreditCard,
                title: "Checkout Page",
                href: "/checkout",
                features: [
                  "Stripe Payment Element",
                  "Shipping address form",
                  "Order summary with totals",
                ],
              },
              {
                icon: LayoutDashboard,
                title: "Dashboard",
                href: "/dashboard",
                features: [
                  "Revenue & order stats",
                  "Order history & details",
                  "Payment status tracking",
                ],
              },
            ].map((page) => (
              <Card
                key={page.title}
                className="group hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-500/30 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-500/10 to-indigo-500/10 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 transition-colors mb-3">
                    <page.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <CardTitle>{page.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {page.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={page.href}>
                    <Button
                      variant="outline"
                      className="w-full mt-2 group-hover:border-violet-500/30 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
                    >
                      {page.title === "Dashboard" ? "View Dashboard" : `View ${page.title.split(" ")[0]}`}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
              <CreditCard className="h-4 w-4" />
            </div>
            <span className="font-bold">Stripe UI Component</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.youtube.com/@JBWEBDEVELOPER"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/muke-johnbaptist-95bb82198/"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://jb.desishub.com"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://jb.desishub.com"
              target="_blank"
              className="text-violet-600 dark:text-violet-400 hover:underline font-medium"
            >
              JB DesisHub
            </a>
            {" "}&middot;{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              className="text-violet-600 dark:text-violet-400 hover:underline font-medium"
            >
              shadcn/ui
            </a>{" "}
            ecosystem
          </p>
        </div>
      </footer>
    </div>
  );
}
