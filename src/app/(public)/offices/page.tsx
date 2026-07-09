import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { getCachedOfficesIndexData } from '@/lib/db/public-cache';
import { DEFAULT_PAGE_SIZE, parsePageParam } from '@/lib/pagination';

export const revalidate = 300;

export const metadata = { title: 'Offices' };

export default async function OfficesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const { pagination, offices } = await getCachedOfficesIndexData(
    parsePageParam(pageParam),
    DEFAULT_PAGE_SIZE,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-slate-900">Office locations</h1>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {offices.map((office) => (
          <li key={office.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-slate-900">{office.name}</h2>
            <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{office.address}</p>
            {office.phone ? <p className="mt-2 text-sm">Tel: {office.phone}</p> : null}
            {office.email ? (
              <p className="text-sm">
                <a href={`mailto:${office.email}`} className="text-blue-800">
                  {office.email}
                </a>
              </p>
            ) : null}
            {office.mapUrl ? (
              <Link
                href={office.mapUrl}
                target="_blank"
                className="mt-3 inline-block text-sm text-blue-800 underline"
              >
                View on map
              </Link>
            ) : null}
          </li>
        ))}
      </ul>

      <Pagination basePath="/offices" {...pagination} />
    </div>
  );
}
