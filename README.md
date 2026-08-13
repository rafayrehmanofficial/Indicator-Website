# Billion $ Code — landing site

Vite + React + Tailwind. Static build, deploys to Vercel with no configuration.

---

## 1. Run it locally

```bash
npm install
npm run dev
```

Opens on http://localhost:5173

## 2. Make it yours

**Everything you need to change is in `src/config.js`.**

| What | Where |
| --- | --- |
| WhatsApp number | `WHATSAPP_NUMBER` — full international format, digits only. `923001234567` |
| Pre-filled WhatsApp message | `WHATSAPP_MESSAGE` |
| Exness / XM referral links | `BROKERS` |
| Telegram, Instagram, email | `SOCIALS` — leave a link empty and it disappears from the footer |
| Price | `PRICE` |
| The four big numbers | `STATS` |
| Version tag in the nav | `VERSION` |

**Screenshots** live in `public/shots/`. Replace the four PNGs with your own using the
same filenames and they swap automatically. Captions and the pip tags on each one are in
`src/components/Proof.jsx` (the `SHOTS` array at the top).

**Copy** is in the component files, each one named after its section:
`Hero`, `Tape`, `Stats`, `Proof`, `Method`, `Qualify`, `Seat`, `Faq`, `Footer`.

**Colors** are in `tailwind.config.js` under `theme.extend.colors`. The accent is `phos`.

## 3. Deploy to Vercel

**Option A — Git (recommended)**

1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import the repo.
3. Vercel detects Vite on its own. Framework: Vite. Build: `npm run build`. Output: `dist`.
4. Deploy.

**Option B — CLI**

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # live
```

Add your domain under Project → Settings → Domains.

---

## Notes

- The live tape is illustrative output generated in the browser, and it says so in its own
  footer. Keep that label — it's the honest version and it costs you nothing.
- The risk notice and affiliate disclosure in the footer are there deliberately. Payment
  processors and broker compliance teams both look for them, and removing them creates a
  problem you don't want.
- Make sure the 500 pips figure is something you can show if someone asks.
