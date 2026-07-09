FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build-time placeholders — runtime env comes from docker-compose.prod.yml
ENV DATABASE_URL="mysql://dsb:dsb@127.0.0.1:3306/dsb_law?allowPublicKeyRetrieval=true"
ENV AUTH_SECRET="docker-build-placeholder-secret-min-32-chars"
ENV AUTH_TRUST_HOST="true"
ENV NEXT_PUBLIC_SITE_URL="https://www.dsblawgroup.com"
ENV REDIS_URL="redis://127.0.0.1:6379"
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]

FROM node:20-alpine AS worker
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY prisma.config.ts tsconfig.json ./
COPY prisma ./prisma
COPY worker ./worker
COPY src/lib ./src/lib
RUN npx prisma generate
ENV NODE_ENV=production
CMD ["npx", "tsx", "worker/newsletter-worker.ts"]
