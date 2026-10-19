# Stey Security website

Public website for Stey Security, an independent cybersecurity services agency based in Italy.

Stack: Next.js (App Router), TypeScript, Tailwind CSS v4. No database, no authentication, no admin area.

## Development

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint (Next.js rules) |
| `npm test` | Unit tests (contact validation, rate limiter) |

## Configuration

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical URLs, Open Graph, sitemap. |
| `CONTACT_WEBHOOK_URL` | Yes for the contact form | Server-side only. Receives each validated request as JSON via POST. Without it the form returns an error and does not pretend a request was sent. |

## Contact form

- Fields and inquiry types follow the PDF: free security review, custom assessment quote, general service inquiry.
- The authorization confirmation is required and is recorded in the payload as `authorized: true`.
- Validation runs on the server (`lib/contact-schema.ts`). Client checks are a convenience only.
- Protections: JSON-only, body size limit, same-origin check, honeypot field, per-IP rate limit (5 requests per 15 minutes), safe error messages, delivery timeout, `redirect: "error"` on the webhook call.
- Known limitation: the rate limiter is in memory. For several server instances, back it with a shared store or enforce limits at the edge.
- Nothing is stored by the site itself. Storage and retention depend on the webhook destination you configure.

## Placeholders that must be replaced before launch

- `app/privacy/page.tsx` and `app/terms/page.tsx`: placeholder legal text, not reviewed by a lawyer.
- `app/references/page.tsx`: placeholder entries only. Add real references only with written client permission.
