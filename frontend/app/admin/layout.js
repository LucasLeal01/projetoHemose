'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import withAuth from '@/lib/withAuth';

function AdminRootLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}

export default withAuth(AdminRootLayout, ['admin']);
