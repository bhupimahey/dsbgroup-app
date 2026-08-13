import type { UserRole } from '@/generated/prisma/client';

export function isStaffRole(role: UserRole | string | null | undefined): boolean {
  return role === 'ADMIN' || role === 'EDITOR';
}
