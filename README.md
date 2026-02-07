# Stripe UI Component

A complete, production-ready Stripe checkout solution for Next.js — built as a [shadcn/ui](https://ui.shadcn.com) registry component.

Add e-commerce checkout to your Next.js app in minutes. Products, cart, checkout, payments, and order management — all wired up.

## Features

- **Stripe Payment Element** — Embedded payment form with automatic card detection, 3D Secure, and multi-payment method support
- **Full Checkout Flow** — Order summary with images, shipping address form, and payment in one page
- **Order Management** — Order history, order details, payment verification, and status tracking
- **Server-Side API Routes** — Secure payment intent creation, automatic Stripe product sync, and payment verification
- **Product Grid** — Responsive product cards with add-to-cart integration
- **Cart Integration** — Built on Zustand with localStorage persistence
- **Authentication** — All checkout and order pages are protected via better-auth
- **Database Models** — Product, Order, OrderItem, and Category Prisma models included

## Tech Stack

- [Next.js 16](https://nextjs.org) with App Router
- [Stripe Payment Element](https://stripe.com/payments/elements)
- [Prisma 7](https://www.prisma.io) with PostgreSQL
- [shadcn/ui](https://ui.shadcn.com) components
- [Zustand](https://zustand.docs.pmnd.rs) for cart state
- [Better Auth](https://better-auth.com) for authentication
- TypeScript & Tailwind CSS v4

## Prerequisites

Before installing this component, you need:

1. **shadcn/ui** initialized in your project
2. **better-auth-ui** component installed (provides authentication + Prisma setup)
3. **zustand-cart** component installed (provides cart state management)
4. A **PostgreSQL** database (e.g., Neon, Supabase, or local)
5. **Stripe** test or live API keys

```bash
# 1. Initialize shadcn/ui (if not done)
pnpm dlx shadcn@latest init

# 2. Install better-auth-ui
pnpm dlx shadcn@latest add https://better-auth-ui.desishub.com/r/auth-components.json

# 3. Install zustand-cart
pnpm dlx shadcn@latest add https://jb.desishub.com/r/zustand-cart.json
```

## Installation

```bash
pnpm dlx shadcn@latest add https://stripe-ui-component.desishub.com/r/stripe-ui-component.json
```

### Add Prisma Models

Add these models to your `prisma/schema.prisma` and add `orders Order[]` to your existing `User` model:

```prisma
model Category {
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
}
```

### Environment Variables

Add to your `.env`:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Run Migration

```bash
npx prisma generate
npx prisma migrate dev --name add_stripe_models
```

### Configure Image Domains

In `next.config.ts`:

```ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Add your product image domains
    ],
  },
};
```

## Installed Files

```
components/stripe/
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
├── create-payment-intent/route.ts   # Create PaymentIntent + Order
└── verify-payment/route.ts          # Verify payment & update order

app/
├── products/page.tsx                # Product listing
├── checkout/page.tsx                # Checkout (protected)
├── order-confirmation/page.tsx      # Payment confirmation
└── dashboard/orders/
    ├── page.tsx                     # My Orders list
    └── [id]/page.tsx                # Order detail view
```

## Usage

### Product Grid

```tsx
import { ProductGrid } from "@/components/stripe/product-grid";

const products = await db.product.findMany({
  include: { category: true },
});

<ProductGrid products={products} />
```

### Checkout Page

```tsx
import { CheckoutPage } from "@/components/stripe/checkout-page";

// Handles everything: cart display, address, payment, redirect
<CheckoutPage />
```

### Order History

```tsx
import { OrderHistory } from "@/components/stripe/order-history";

const orders = await db.order.findMany({
  where: { userId: session.user.id },
  include: { items: { include: { product: true } } },
  orderBy: { createdAt: "desc" },
});

<OrderHistory orders={orders} />
```

## How It Works

1. **Browse Products** — Users view products from your database at `/products`
2. **Add to Cart** — Products are added to a Zustand-powered cart with localStorage persistence
3. **Checkout** — At `/checkout`, users fill in their shipping address and see an order summary
4. **Payment** — Stripe Payment Element handles card input, 3D Secure, and payment confirmation
5. **Order Created** — The API creates the order in your database and a PaymentIntent in Stripe
6. **Verification** — After payment, the user is redirected to `/order-confirmation` where the payment is verified via the PaymentIntent ID (no webhooks needed)
7. **Order History** — Users can view their orders at `/dashboard/orders`

## Testing

Use Stripe test card numbers:

| Card Number | Description |
|---|---|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0025 0000 3155` | Requires 3D Secure |
| `4000 0000 0000 9995` | Declined |

Use any future expiry date, any 3-digit CVC, and any 5-digit ZIP.

## Related Components

- [Better Auth UI](https://jb.desishub.com/blog/jb-better-auth-ui-components) — Authentication system
- [File Storage UI](https://jb.desishub.com/blog/file-storage-ui) — File upload & management
- [Zustand Cart](https://jb.desishub.com/blog/zustand-cart-component) — Cart state management
- [Multi-Step Form](https://jb.desishub.com/blog/multi-step-form-component) — Multi-step form wizard

## License

MIT

## Author

[JB DesisHub](https://jb.desishub.com)
