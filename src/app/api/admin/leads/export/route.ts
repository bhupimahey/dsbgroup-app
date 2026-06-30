import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth/session';
import { isStaffRole } from '@/lib/auth-utils';
import { leadListWhere } from '@/lib/admin/list-filters';

function csvEscape(value: string) {
  if (value.includes('"') || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session?.user || !isStaffRole(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const filters = {
    q: url.searchParams.get('q')?.trim() ?? '',
    handled: url.searchParams.get('handled')?.trim() ?? '',
  };

  const leads = await prisma.contactLead.findMany({
    where: leadListWhere(filters),
    orderBy: { createdAt: 'desc' },
  });

  const header = ['Date', 'Name', 'Email', 'Phone', 'Status', 'Message'];
  const rows = leads.map((lead) =>
    [
      lead.createdAt.toISOString(),
      lead.name,
      lead.email,
      lead.phone ?? '',
      lead.handled ? 'Handled' : 'Open',
      lead.message,
    ]
      .map(csvEscape)
      .join(','),
  );

  const csv = [header.join(','), ...rows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="dsb-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
