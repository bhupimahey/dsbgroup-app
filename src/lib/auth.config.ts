import type { NextAuthConfig } from 'next-auth';
import type { UserRole } from '@/generated/prisma/client';
import { isStaffRole } from '@/lib/auth-utils';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;

      if (pathname.startsWith('/admin/login')) {
        return true;
      }

      if (pathname.startsWith('/admin')) {
        if (!auth?.user) {
          const loginUrl = new URL('/admin/login', request.nextUrl);
          loginUrl.searchParams.set('callbackUrl', pathname);
          return Response.redirect(loginUrl);
        }
        if (!isStaffRole(auth.user.role as UserRole)) {
          return Response.redirect(new URL('/admin/login?error=NotStaff', request.nextUrl));
        }
        return true;
      }

      if (pathname.startsWith('/account')) {
        if (!auth?.user) {
          const loginUrl = new URL('/login', request.nextUrl);
          loginUrl.searchParams.set('callbackUrl', pathname);
          return Response.redirect(loginUrl);
        }
        if (isStaffRole(auth.user.role as UserRole)) {
          return Response.redirect(new URL('/admin', request.nextUrl));
        }
        return true;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as UserRole) ?? 'USER';
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
