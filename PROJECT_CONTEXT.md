# DSB Law Group — Project Context (for AI assistants)

Copy-paste the block at the bottom of this file when starting a new chat about this project.

---

## Identity

| Field | Value |
|-------|--------|
| **Project** | DSB Law Group website upgrade |
| **PRD** | `Upgrade.pdf` — WordPress → all-in Next.js |
| **Local path** | `D:\Bhupinder\nextjs` |
| **Package name** | `dsb-law-website` |
| **Status** | PRD phases 1–4 implemented in code (see README.md) |

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind
- MySQL 8 + Prisma 7 (MariaDB driver adapter)
- Auth.js / NextAuth v5 (credentials, roles: USER, EDITOR, ADMIN)
- Redis + BullMQ (`worker/newsletter-worker.ts`)
- Resend email (optional; dev logs to console if no API key)
- Docker Compose (dev + prod)

## Key commands

```powershell
cd D:\Bhupinder\nextjs

# Dev
docker compose up -d
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev

# Newsletter worker (second terminal)
npm run worker:newsletter

# WordPress import
npm run migrate:wordpress -- path\to\export.xml

# Production (VPS)
docker compose -f docker-compose.prod.yml up -d --build
```

## Default credentials (seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@gmail.com` | `Admin@12345` |

## Dummy email domain (no real domain required for dev)

| Setting | Value |
|---------|--------|
| Domain | `dsblawgroup.com` |
| From | `DSB Law Group <noreply@dsblawgroup.com>` |
| Reply-to | `info@dsblawgroup.com` |
| Dev site | `http://localhost:3000` |
| Prod site (dummy) | `https://www.dsblawgroup.com` |

See `deploy/resend.env.example` for full email setup.

## Important paths

```text
D:\Bhupinder\nextjs\
├── src/app/(public)/     Public site
├── src/app/(auth)/       Login, register, verify, reset password
├── src/app/admin/        CMS dashboard (all CRUD modules)
├── src/app/account/      User preferences
├── src/lib/              db, auth, admin actions, email, queue
├── prisma/schema.prisma  MySQL schema
├── prisma/seed.ts        Seed script
├── prisma/seed-content.ts  CMS page content (10 service pages)
├── worker/newsletter-worker.ts
├── scripts/migrate-from-wordpress.ts
├── src/config/redirects.json
├── docker-compose.yml / docker-compose.prod.yml
├── Dockerfile / deploy/nginx.conf
└── README.md
```

## Admin routes

`/admin` — dashboard  
`/admin/pages` `/admin/posts` `/admin/categories`  
`/admin/team` `/admin/faq` `/admin/offices`  
`/admin/newsletters` `/admin/subscribers` `/admin/leads` `/admin/analytics`

## Public routes

`/services` → `/pages/[slug]` (10 practice areas)  
`/blog` `/articles` `/team` `/faq` `/offices` `/contact`  
`/privacy` `/terms` `/careers` `/about`

## PRD scope NOT implemented (future §8B)

Paid paywalls, AI recommendations, mobile REST/GraphQL API, advanced role tiers.

## User-side still pending (not code)

- Docker Desktop installed and running
- `npm run db:migrate` + `npm run db:seed` on their machine
- Real WordPress WXR import when export available
- Real domain + Resend API key for production email
- VPS deploy (client team per PRD)

---

## Copy-paste prompt for new chats

```
Project: DSB Law Group website — D:\Bhupinder\nextjs

Read PROJECT_CONTEXT.md and README.md in that folder before making changes.

Stack: Next.js 16 App Router, MySQL/Prisma 7, Auth.js, Redis/BullMQ, Resend (dummy domain dsblawgroup.com).

PRD Upgrade.pdf scope (phases 1–4) is implemented in code. Admin: admin@gmail.com / Admin@12345.

My request: [DESCRIBE YOUR TASK HERE]
```
