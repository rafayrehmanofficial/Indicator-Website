# Billion $ Code — Vercel deployment

This is a static React/Vite landing page. It does not require a database, server secrets, or an API key for the included WhatsApp and email CTAs.

## Deploy from GitHub

Push the project directory to a GitHub repository, import that repository in Vercel, and keep the project root at the repository root. Vercel will use the included `vercel.json`, run `pnpm build`, and publish `dist/public`.

## Deploy with the Vercel CLI

From the project root, run:

```bash
pnpm install
pnpm build
npx vercel
```

The included production check is:

```bash
pnpm check && pnpm build
```

## Before going live

Confirm that the WhatsApp number in `client/src/pages/Home.tsx` is the correct business destination, review the membership and refund wording with the business owner, and verify the supplied chart screenshots are approved for public marketing use. The page deliberately avoids guaranteed-return language; any performance figures are labelled as selected examples and should be supported or removed before publication.

The live address used by every request-access button is currently `https://wa.me/923144481259` with a prefilled Billion $ Code inquiry message. Support email links point to `support@billiondollarcode.com`.
