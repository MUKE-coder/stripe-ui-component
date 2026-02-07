import Link from "next/link";
import {
  CreditCard,
  ShoppingBag,
  Shield,
  Package,
  CheckCircle,
  ArrowRight,
  Copy,
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function CodeBlock({
  children,
  title,
}: {
  children: string;
  title?: string;
}) {
  return (
    <div className="rounded-lg border bg-zinc-950 text-zinc-50 overflow-hidden">
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="text-xs text-zinc-400">{title}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const registryUrl = `${baseUrl}/r/stripe-ui-component.json`;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CreditCard className="h-4 w-4" />
            </div>
            <span className="font-semibold">Stripe UI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                Demo
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link
              href="https://github.com/jbdesishub/stripe-ui-component"
              target="_blank"
            >
              <Button variant="outline" size="sm">
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            shadcn/ui Registry Component
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Stripe UI Component
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            A complete, production-ready Stripe checkout solution for Next.js.
            Built with Stripe Payment Element, Prisma, and shadcn/ui.
          </p>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Add e-commerce checkout to your Next.js app in minutes. Products,
            cart, checkout, payments, and order management — all wired up.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link href="/products">
              <Button size="lg" className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                View Demo
              </Button>
            </Link>
            <Link href="#installation">
              <Button size="lg" variant="outline" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                Installation Guide
              </Button>
            </Link>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "Stripe Payment Element",
              "Next.js 16",
              "Prisma 7",
              "shadcn/ui",
              "Zustand",
              "TypeScript",
            ].map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Install */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <CodeBlock title="Quick Install">
            {`pnpm dlx shadcn@latest add ${registryUrl}`}
          </CodeBlock>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What&apos;s Included</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need for a complete Stripe checkout experience in
              your Next.js application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CreditCard className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Payment Element</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Embedded Stripe Payment Element with automatic card detection,
                3D Secure, and multiple payment methods.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShoppingCart className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Cart & Checkout</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Full checkout flow with order summary, shipping address form,
                and cart integration via Zustand.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Package className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Order Management</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Order history, order details, payment verification, and status
                tracking in the dashboard.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">API Routes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Server-side payment intent creation, automatic Stripe product
                sync, and payment verification.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section id="installation" className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Installation Guide</h2>
            <p className="text-muted-foreground">
              Follow these steps to add Stripe checkout to your Next.js project.
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </span>
                Prerequisites
              </h3>
              <p className="text-sm text-muted-foreground mb-3 ml-9">
                This component requires{" "}
                <strong>better-auth-ui</strong> (for authentication & Prisma setup) and{" "}
                <strong>zustand-cart</strong> (for cart state management) to be installed
                first.
              </p>
              <div className="ml-9 space-y-3">
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
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </span>
                Install the Stripe UI Component
              </h3>
              <div className="ml-9">
                <CodeBlock title="Install">
                  {`pnpm dlx shadcn@latest add ${registryUrl}`}
                </CodeBlock>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </span>
                Add Prisma Models
              </h3>
              <p className="text-sm text-muted-foreground mb-3 ml-9">
                Add the following models to your <code className="bg-muted px-1.5 py-0.5 rounded text-xs">prisma/schema.prisma</code> file.
                Also add <code className="bg-muted px-1.5 py-0.5 rounded text-xs">orders Order[]</code> to your User model.
              </p>
              <div className="ml-9">
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
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  4
                </span>
                Environment Variables
              </h3>
              <p className="text-sm text-muted-foreground mb-3 ml-9">
                Add your Stripe keys to <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.env</code>.
                Get your keys from the{" "}
                <a
                  href="https://dashboard.stripe.com/apikeys"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Stripe Dashboard
                </a>.
              </p>
              <div className="ml-9">
                <CodeBlock title=".env">
{`STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`}
                </CodeBlock>
              </div>
            </div>

            {/* Step 5 */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  5
                </span>
                Run Migration & Seed
              </h3>
              <div className="ml-9 space-y-3">
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
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  6
                </span>
                Configure Image Domains
              </h3>
              <p className="text-sm text-muted-foreground mb-3 ml-9">
                Add your product image domains to <code className="bg-muted px-1.5 py-0.5 rounded text-xs">next.config.ts</code>.
              </p>
              <div className="ml-9">
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
            <h2 className="text-3xl font-bold mb-3">Usage</h2>
            <p className="text-muted-foreground">
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
            <h2 className="text-3xl font-bold mb-3">Directory Structure</h2>
            <p className="text-muted-foreground">
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
            <h2 className="text-3xl font-bold mb-3">Example Pages</h2>
            <p className="text-muted-foreground">
              Try out the demo pages included in the component.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Products Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Product grid with images & prices
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Add to cart functionality
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Category filtering
                  </li>
                </ul>
                <Link href="/products">
                  <Button variant="outline" className="w-full mt-2">
                    View Products
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CreditCard className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Checkout Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Stripe Payment Element
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Shipping address form
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Order summary with totals
                  </li>
                </ul>
                <Link href="/checkout">
                  <Button variant="outline" className="w-full mt-2">
                    View Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <LayoutDashboard className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Revenue & order stats
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Order history & details
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Payment status tracking
                  </li>
                </ul>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full mt-2">
                    View Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <CreditCard className="h-3 w-3" />
            </div>
            <span className="text-sm font-medium">Stripe UI Component</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://jb.desishub.com"
              target="_blank"
              className="text-primary hover:underline"
            >
              JB DesisHub
            </a>
            . Part of the{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              className="text-primary hover:underline"
            >
              shadcn/ui
            </a>{" "}
            ecosystem.
          </p>
        </div>
      </footer>
    </div>
  );
}
