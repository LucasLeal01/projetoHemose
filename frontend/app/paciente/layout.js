'use client';

import PacienteLayout from '@/components/layout/PacienteLayout';
import withAuth from '@/lib/withAuth';

function PacienteRootLayout({ children }) {
  return <PacienteLayout>{children}</PacienteLayout>;
}

export default withAuth(PacienteRootLayout, ['admin', 'enfermeira']);
