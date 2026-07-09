'use server';

import { randomBytes } from 'crypto';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { sendSubscriberVerifyEmail } from '@/lib/email/mailer';
import { subscribeSchema } from '@/lib/validations/cms';
import {
  sameIdSet,
  subscribeStatusMessage,
  type SubscribeResult,
  type SubscriberCheckResult,
} from '@/lib/subscription/subscribe-response';
import { z } from 'zod';

async function guestAccountMessage(email: string): Promise<SubscriberCheckResult> {
  return {
    ok: true,
    action: 'done',
    message:
      'This email has a client account. Sign in to manage newsletter preferences from your profile.',
    accountUrl: `/login?callbackUrl=${encodeURIComponent('/account')}`,
  };
}

async function syncPreferences(
  subscriberId: string,
  serviceCategoryIds: string[],
  frequency: 'WEEKLY' | 'TWICE_WEEKLY' | 'MONTHLY',
) {
  await prisma.subscriptionPreference.deleteMany({ where: { subscriberId } });
  await prisma.subscriptionPreference.createMany({
    data: serviceCategoryIds.map((serviceCategoryId) => ({
      subscriberId,
      serviceCategoryId,
      frequency,
    })),
  });
}

export async function checkSubscriberEmailAction(email: string): Promise<SubscriberCheckResult> {
  const normalized = email.trim().toLowerCase();
  const parsed = z.string().email().safeParse(normalized);
  if (!parsed.success) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  const session = await auth();
  if (session?.user) {
    return {
      ok: true,
      action: 'done',
      message: 'You are signed in. Manage newsletter preferences from your account profile.',
      accountUrl: '/account',
    };
  }

  const existingUser = await prisma.user.findUnique({ where: { email: normalized } });
  if (existingUser) {
    return guestAccountMessage(normalized);
  }

  const existing = await prisma.subscriber.findUnique({ where: { email: normalized } });
  if (!existing) {
    return { ok: true, action: 'pick_services' };
  }

  if (existing.verified && existing.active) {
    return {
      ok: true,
      action: 'done',
      message:
        'This email is already subscribed. You will continue receiving our legal updates.',
    };
  }

  if (existing.verified && !existing.active) {
    await prisma.subscriber.update({
      where: { id: existing.id },
      data: { active: true },
    });
    return {
      ok: true,
      action: 'done',
      message: subscribeStatusMessage('reactivated'),
    };
  }

  const token = randomBytes(32).toString('hex');
  const verifyExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await prisma.subscriber.update({
    where: { id: existing.id },
    data: { verifyToken: token, verifyExpiresAt, active: true },
  });

  const verifyUrl = await sendSubscriberVerifyEmail(normalized, token);
  if (process.env.NODE_ENV === 'development') {
    console.info('[subscribe] verification link:', verifyUrl);
  }

  return {
    ok: true,
    action: 'done',
    message: subscribeStatusMessage('verification_resent'),
  };
}

export async function subscribeGuestAction(formData: FormData): Promise<SubscribeResult> {
  const parsed = subscribeSchema.safeParse({
    email: String(formData.get('email') ?? ''),
    frequency: String(formData.get('frequency') ?? 'WEEKLY'),
    serviceCategoryIds: formData.getAll('serviceCategoryIds').map(String),
  });

  if (!parsed.success) {
    return { ok: false, error: 'Please select at least one category and enter a valid email.' };
  }

  const email = parsed.data.email.trim().toLowerCase();
  const { frequency, serviceCategoryIds } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      ok: false,
      error:
        'This email has a client account. Sign in and manage newsletter preferences from your account page.',
    };
  }

  const existing = await prisma.subscriber.findUnique({
    where: { email },
    include: { preferences: true },
  });

  const existingCategoryIds = existing?.preferences.map((item) => item.serviceCategoryId) ?? [];
  const samePreferences =
    existing?.frequency === frequency && sameIdSet(serviceCategoryIds, existingCategoryIds);

  if (existing?.verified && existing.active && samePreferences) {
    return {
      ok: true,
      status: 'already_subscribed',
      message: subscribeStatusMessage('already_subscribed'),
    };
  }

  if (existing?.verified && existing.active) {
    await prisma.subscriber.update({
      where: { id: existing.id },
      data: { frequency, active: true },
    });
    await syncPreferences(existing.id, serviceCategoryIds, frequency);

    return {
      ok: true,
      status: 'preferences_updated',
      message: subscribeStatusMessage('preferences_updated'),
    };
  }

  if (existing?.verified && !existing.active) {
    await prisma.subscriber.update({
      where: { id: existing.id },
      data: { frequency, active: true },
    });
    await syncPreferences(existing.id, serviceCategoryIds, frequency);

    return {
      ok: true,
      status: 'reactivated',
      message: subscribeStatusMessage('reactivated'),
    };
  }

  const token = randomBytes(32).toString('hex');
  const verifyExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const subscriber = await prisma.subscriber.upsert({
    where: { email },
    update: {
      frequency,
      verifyToken: token,
      verifyExpiresAt,
      verified: false,
      active: true,
    },
    create: {
      email,
      frequency,
      verifyToken: token,
      verifyExpiresAt,
      verified: false,
      active: true,
    },
  });

  await syncPreferences(subscriber.id, serviceCategoryIds, frequency);

  const verifyUrl = await sendSubscriberVerifyEmail(email, token);
  if (process.env.NODE_ENV === 'development') {
    console.info('[subscribe] verification link:', verifyUrl);
  }

  return {
    ok: true,
    status: 'confirmation_sent',
    message: subscribeStatusMessage('confirmation_sent'),
  };
}

export async function verifySubscriberAction(token: string) {
  const subscriber = await prisma.subscriber.findFirst({
    where: { verifyToken: token },
    include: {
      preferences: {
        include: { serviceCategory: { select: { name: true } } },
      },
    },
  });
  if (!subscriber || !subscriber.verifyExpiresAt || subscriber.verifyExpiresAt < new Date()) {
    return { ok: false as const, message: 'Invalid or expired subscription link.' };
  }

  await prisma.subscriber.update({
    where: { id: subscriber.id },
    data: { verified: true, verifyToken: null, verifyExpiresAt: null },
  });

  const categories = subscriber.preferences.map((pref) => pref.serviceCategory.name);

  return {
    ok: true as const,
    message: 'Your subscription is confirmed. Thank you!',
    email: subscriber.email,
    frequency: subscriber.frequency,
    categories,
  };
}

export async function unsubscribeAction(email: string) {
  const normalized = email.trim().toLowerCase();
  await prisma.subscriber.updateMany({
    where: { email: normalized },
    data: { active: false },
  });
  return { ok: true };
}
