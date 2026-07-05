'use server';

import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '@/lib/email/mailer';
import { resetPasswordSchema, resetRequestSchema } from '@/lib/validations/cms';

export async function requestPasswordResetAction(formData: FormData) {
  const parsed = resetRequestSchema.safeParse({
    email: String(formData.get('email') ?? ''),
  });
  if (!parsed.success) {
    redirect('/forgot-password?error=invalid');
  }

  const email = parsed.data.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.verificationToken.deleteMany({ where: { identifier: `reset:${email}` } });
    await prisma.verificationToken.create({
      data: { identifier: `reset:${email}`, token, expires },
    });
    const url = await sendPasswordResetEmail(email, token);
    if (process.env.NODE_ENV === 'development') {
      redirect(`/forgot-password?sent=1&dev=${encodeURIComponent(url)}`);
    }
  }

  redirect('/forgot-password?sent=1');
}

export async function resetPasswordAction(formData: FormData) {
  const parsed = resetPasswordSchema.safeParse({
    token: String(formData.get('token') ?? ''),
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirmPassword') ?? ''),
  });

  if (!parsed.success) {
    redirect('/reset-password?error=invalid');
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token: parsed.data.token },
  });

  if (!record || !record.identifier.startsWith('reset:') || record.expires < new Date()) {
    redirect('/reset-password?error=expired');
  }

  const email = record.identifier.replace(/^reset:/, '');
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.update({ where: { email }, data: { passwordHash } });
  await prisma.verificationToken.delete({ where: { token: parsed.data.token } });

  redirect('/login?reset=1');
}

export async function verifyEmailAction(token: string): Promise<{ ok: boolean; message: string }> {
  const record = await prisma.verificationToken.findUnique({ where: { token } });
  if (!record || record.identifier.startsWith('reset:')) {
    return { ok: false, message: 'Invalid or expired verification link.' };
  }
  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } });
    return { ok: false, message: 'Verification link has expired.' };
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });
  await prisma.verificationToken.delete({ where: { token } });

  return { ok: true, message: 'Your email is verified. You can now log in.' };
}

export async function registerAction(
  _prev: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const { registerSchema } = await import('@/lib/validations/cms');
  const parsed = registerSchema.safeParse({
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirmPassword') ?? ''),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid form data' };
  }

  const email = parsed.data.email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: 'An account with this email already exists.' };

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await prisma.user.create({
    data: { name: parsed.data.name.trim(), email, passwordHash, role: 'USER', active: true },
  });

  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });
  await prisma.verificationToken.create({ data: { identifier: email, token, expires } });

  const url = await sendVerificationEmail(email, token);
  const callbackUrl = String(formData.get('callbackUrl') ?? '').trim();
  const safeCallback =
    callbackUrl.startsWith('/') && !callbackUrl.startsWith('/admin') ? callbackUrl : '';
  const callbackQuery = safeCallback ? `&callbackUrl=${encodeURIComponent(safeCallback)}` : '';
  const callbackOnlyQuery = safeCallback ? `?callbackUrl=${encodeURIComponent(safeCallback)}` : '';

  if (process.env.NODE_ENV === 'development') {
    redirect(`/register/pending?dev=${encodeURIComponent(url)}${callbackQuery}`);
  }
  redirect(`/register/pending${callbackOnlyQuery}`);
}
