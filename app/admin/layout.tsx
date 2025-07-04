import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminLayout from '@/components/admin/AdminLayout';

export const metadata: Metadata = {
  title: 'Admin Dashboard - UDT Store',
  description: 'UDT Store administration panel',
};

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Check if user is authenticated and has admin/manager access
  if (!session?.user) {
    redirect('/auth/login?callbackUrl=/admin/dashboard');
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER') {
    redirect('/');
  }

  return <AdminLayout>{children}</AdminLayout>;
}
