'use client';

import EnfermeiraLayout from '@/components/layout/EnfermeiraLayout';
import withAuth from '@/lib/withAuth';

function EnfermeiraRootLayout({ children }) {
  return <EnfermeiraLayout>{children}</EnfermeiraLayout>;
}

export default withAuth(EnfermeiraRootLayout, ['enfermeira']);
