'use client';

import MedicoLayout from '@/components/layout/MedicoLayout';
import withAuth from '@/lib/withAuth';

function MedicoRootLayout({ children }) {
  return <MedicoLayout>{children}</MedicoLayout>;
}

export default withAuth(MedicoRootLayout, ['medico']);
