import { cache } from 'react';
import { auth } from '@/lib/auth';

/** Dedupe session lookups within a single request (layout + page). */
export const getSession = cache(() => auth());
