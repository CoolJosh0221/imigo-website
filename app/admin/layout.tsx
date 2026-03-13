import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'iMigo Admin',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  const isAuthenticated = token ? await verifySession(token) : false;

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
