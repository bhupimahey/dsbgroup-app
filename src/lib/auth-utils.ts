import type { UserRole } from '@/generated/prisma/client';

export function isStaffRole(role: UserRole): boolean {
  return role === 'ADMIN' || role === 'EDITOR';
}
