# DSB Law Group — Full-stack Next.js (PRD complete)

All phases from the **Upgrade.pdf** PRD are implemented in this project.

## Stack

- Next.js 16 App Router + TypeScript + Tailwind
- MySQL 8 + Prisma 7
- Auth.js (credentials, roles, email verification, password reset)
- Redis + BullMQ newsletter worker
- Resend email (optional; console fallback in dev)
- Docker Compose (dev + production)

## Quick start (local)

```powershell
cd D:\Bhupinder\nextjs
docker compose up -d
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

In a second terminal (newsletters):

```powershell
npm run worker:newsletter
```

| URL | Purpose |
|-----|---------|
| `/` | Public site |
| `/admin` | CMS dashboard |
| `/login` | Sign in |
| `/register` | User registration |
| `/account` | Preferences & deactivate |
| `/forgot-password` | Password reset |

**Admin:** `admin@dsblaw.local` / `Admin@12345`

## PRD feature checklist

### Phase 1 — Content & CMS
- Static pages CMS (`/admin/pages`) — About, HR/Labour, Privacy, Terms, Careers, etc.
- Team directory CMS + headshots (`/admin/team`)
- FAQ CMS with searchable accordion (`/admin/faq`, `/faq`)
- Offices CMS with map links (`/admin/offices`)
- Blog categories (`/admin/categories`) + filtered blog index
- Social share buttons on blog posts
- Contact form → leads inbox (`/admin/leads`)

### Phase 2 — Users & subscriptions
- Registration + email verification
- Password reset flow
- Account preferences (categories + frequency)
- Account deactivation
- Guest subscription popup (disabled when logged in)
- Guest email verification (`/verify-subscriber`)

### Phase 3 — Newsletters
- Subscriber management (`/admin/subscribers`)
- Newsletter composer + queue (`/admin/newsletters`)
- BullMQ worker (`npm run worker:newsletter`)
- Open-rate tracking pixel (`/api/newsletter/open`)
- Analytics dashboard (`/admin/analytics`)

### Phase 4 — Migration & deploy
- WordPress WXR import (`npm run migrate:wordpress`)
- 301 redirects via `src/config/redirects.json` + `next.config.ts`
- `robots.txt` + dynamic sitemap
- Meta title / description / keywords in admin
- Production: `Dockerfile`, `docker-compose.prod.yml`, `deploy/nginx.conf`

## WordPress migration

```powershell
npm run migrate:wordpress -- path\to\export.xml --dry-run
npm run migrate:wordpress -- path\to\export.xml
```

Merge output into `src/config/redirects.json` for legacy URL 301s.

## Resend email (dummy domain)

This project uses a **placeholder domain** so you can develop without buying email infrastructure yet.

| Setting | Dummy value |
|---------|-------------|
| Domain | `dsblawgroup.com` |
| From | `DSB Law Group <noreply@dsblawgroup.com>` |
| Reply-to | `info@dsblawgroup.com` |
| Site URL (production) | `https://www.dsblawgroup.com` |

**Local dev:** leave `RESEND_API_KEY` empty in `.env` — emails print to the terminal when users register, reset password, or subscribe.

**Full setup guide:** see `deploy/resend.env.example` (DNS checklist, Resend dashboard steps, and what to change when you get a real domain).

```env
# Already in .env.example — copy to .env
RESEND_API_KEY=
RESEND_FROM_DOMAIN=dsblawgroup.com
EMAIL_FROM="DSB Law Group <noreply@dsblawgroup.com>"
EMAIL_REPLY_TO=info@dsblawgroup.com
```

## Service practice pages

After `npm run db:seed`, each of the 10 PRD service categories has a CMS page at `/pages/[slug]`:

| Slug | Practice area |
|------|----------------|
| `/pages/intellectual-property` | Intellectual Property Rights |
| `/pages/labour-law` | Labor & Industrial Law |
| `/pages/joint-ventures` | Joint Ventures |
| `/pages/taxation` | Taxation |
| `/pages/business-advisory` | Business Advisory |
| `/pages/banking-finance` | Banking & Finance |
| `/pages/private-equity` | Private Equity |
| `/pages/audit` | Audit |
| `/pages/mergers-acquisitions` | Mergers & Acquisitions |
| `/pages/corporate-advisory` | Corporate Advisory |

The `/services` index links to each page. Edit content in `/admin/pages`.

## Production deploy (VPS)

```bash
cp .env.example .env   # set AUTH_SECRET, NEXT_PUBLIC_SITE_URL, MYSQL_PASSWORD, RESEND_API_KEY
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec web npx prisma migrate deploy
docker compose -f docker-compose.prod.yml exec web npx prisma db seed
```

## GitHub repository

- **Repository:** [github.com/bhupimahey/dsbgroup-app](https://github.com/bhupimahey/dsbgroup-app)
- **Database schema:** `prisma/schema.prisma` + migrations in `prisma/migrations/`
- **GitHub Pages:** [bhupimahey.github.io/dsbgroup-app](https://bhupimahey.github.io/dsbgroup-app/) — static project docs only (`docs/`). The full Next.js app requires Docker + MySQL hosting.

### Enable GitHub Pages (required once)

**Do not use “GitHub Actions” as the Pages source** — `actions/deploy-pages` often hangs forever on `deployment_queued` (a GitHub platform bug).

Use branch deployment instead:

1. Open [github.com/bhupimahey/dsbgroup-app/settings/pages](https://github.com/bhupimahey/dsbgroup-app/settings/pages)
2. **Source:** Deploy from a branch *(not GitHub Actions)*
3. **Branch:** `gh-pages` · **Folder:** `/ (root)`
4. Save

The `Publish docs to gh-pages` workflow copies `docs/` to the `gh-pages` branch on each push. After the first workflow run completes (check [Actions](https://github.com/bhupimahey/dsbgroup-app/actions)), the site is live at [bhupimahey.github.io/dsbgroup-app](https://bhupimahey.github.io/dsbgroup-app/).

If you previously selected **GitHub Actions** as the source, switch to **Deploy from a branch** as above and cancel any stuck deploy workflows.

### Push updates

```powershell
git add .
git commit -m "Your message"
git push origin main
```

GitHub Actions runs on every push to `main`:

| Workflow | Purpose |
|----------|---------|
| `CI` | Install, migrate, seed, lint, and production build |
| `Publish docs to gh-pages` | Copy `docs/` to `gh-pages` branch for GitHub Pages |

GitHub Pages reads the `gh-pages` branch (not `deploy-pages`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:migrate` | Apply schema migrations |
| `npm run db:seed` | Seed admin + sample content |
| `npm run worker:newsletter` | BullMQ email worker |
| `npm run migrate:wordpress` | Import WXR export |

## Future scope (PRD §8B — not in scope)

Paid paywalls, AI recommendations, mobile REST/GraphQL API — architecture is ready to extend.
