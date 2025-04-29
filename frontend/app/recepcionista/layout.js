'use client';

import RecepcionistaLayout from '@/components/layout/RecepcionistaLayout';
import withAuth from '@/lib/withAuth';

function RecepcionistaRootLayout({ children }) {
  return <RecepcionistaLayout>{children}</RecepcionistaLayout>;
}

export default withAuth(RecepcionistaRootLayout, ['recepcionista']);
