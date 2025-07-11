[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/jeremy-step/next-cms)

# Next.js practice project

## Getting Started

Install dependencies

```bash
pnpm i
```

Copy the `.env.local.example` file and rename it to `.env.local`

Change the prisma database url.

Setup database:

```bash
pnpm prisma:generate
pnpm prisma:db:push
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
