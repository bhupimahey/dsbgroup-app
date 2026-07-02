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

First-time setup on the server:

```bash
cp .env.example .env   # set AUTH_SECRET, NEXT_PUBLIC_SITE_URL, MYSQL_PASSWORD, RESEND_API_KEY
docker compose -f docker-compose.prod.yml up -d --build
bash deploy/vps-deploy.sh   # pull is skipped on first run; run migrate manually if needed:
docker run --rm -v "$(pwd):/app" -w /app --env-file .env --network checkmockup_dsb \
  node:20-alpine sh -c "npm ci && npx prisma migrate deploy && npx prisma db seed"
```

### Manual VPS deploy (GitHub Actions)

Push your changes to `main` first, then deploy when you are ready:

1. Open [Actions → Deploy to VPS](https://github.com/bhupimahey/dsbgroup-app/actions/workflows/deploy-vps.yml)
2. Click **Run workflow** → **Run workflow**

The workflow SSHs into your server and runs `deploy/vps-deploy.sh` (git pull → rebuild containers → `prisma migrate deploy`). It does **not** run automatically on push.

**Production `.env` is never modified** — the deploy script backs up and restores the server’s existing `.env`. It does not copy `.env.example` or write secrets from GitHub. Create `.env` once on the VPS and edit it only there.

**One-time GitHub secrets** — [Settings → Secrets and variables → Actions](https://github.com/bhupimahey/dsbgroup-app/settings/secrets/actions):

| Secret | Example | Required |
|--------|---------|----------|
| `VPS_HOST` | `66.116.239.195` or `checkmockup.co.in` | Yes |
| `VPS_USER` | `root` | Yes |
| `VPS_SSH_KEY` | Private key (PEM) for SSH | Yes |
| `VPS_SSH_PORT` | `22` | No (default 22) |
| `VPS_APP_DIR` | `/var/www/checkmockup` | No (default shown) |

**One-time VPS SSH key** (on your PC or the server):

```bash
ssh-keygen -t ed25519 -C "github-deploy-dsbgroup" -f ~/.ssh/dsbgroup_deploy -N ""
# Add the PUBLIC key to the VPS:
ssh-copy-id -i ~/.ssh/dsbgroup_deploy.pub root@66.116.239.195
# Paste the PRIVATE key (~/.ssh/dsbgroup_deploy) into GitHub secret VPS_SSH_KEY
```

Ensure the VPS repo is a git clone that can `git fetch origin main` (deploy key or HTTPS credentials).

**Deploy on the VPS directly** (same steps as the workflow):

```bash
cd /var/www/checkmockup
bash deploy/vps-deploy.sh
```

## GitHub repository

- **Repository:** [github.com/bhupimahey/dsbgroup-app](https://github.com/bhupimahey/dsbgroup-app) — full source code + Prisma schema
- **Database schema:** `prisma/schema.prisma` + `prisma/migrations/`
- **GitHub Pages (docs only):** [bhupimahey.github.io/dsbgroup-app](https://bhupimahey.github.io/dsbgroup-app/)
- **Live production site:** Docker + MySQL on a VPS (see Production deploy above). GitHub Pages cannot run API routes, admin, or database pages.

### GitHub Pages setup (one time)

**Use “Deploy from a branch” → `main` → `/docs`** — never “GitHub Actions” (causes `deploy-pages` / `deployment_queued` hangs).

1. [Settings → Pages](https://github.com/bhupimahey/dsbgroup-app/settings/pages)
2. **Source:** Deploy from a branch
3. **Branch:** `main` · **Folder:** `/docs`
4. Save

Docs live in the `docs/` folder on `main`. GitHub publishes them automatically when you push — **no separate deploy workflow** and no `gh-pages` branch.

#### Stuck on `deployment_queued` / `actions/deploy-pages`?

That is GitHub’s internal **“pages build and deployment”** job (or an old workflow re-run). It is **not** required for this repo.

1. **Cancel** all stuck “pages build and deployment” runs (they may never finish).
2. Open [Settings → Pages](https://github.com/bhupimahey/dsbgroup-app/settings/pages) and set source to **`main`** → **`/docs`** (not `gh-pages`, not “GitHub Actions”).
3. Push any change to `docs/` on `main`, or click **Save** again on the Pages settings page to re-trigger.
4. Site URL: [bhupimahey.github.io/dsbgroup-app](https://bhupimahey.github.io/dsbgroup-app/)

### Push updates

```powershell
git add .
git commit -m "Your message"
git push origin main
```

GitHub Actions runs on every push to `main`:

| Workflow | Purpose |
|----------|---------|
| `CI` | Migrate DB, seed, lint, and build the full Next.js app |
| `Deploy to VPS` | Manual — SSH to production, pull, rebuild, migrate (Run workflow button) |

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
