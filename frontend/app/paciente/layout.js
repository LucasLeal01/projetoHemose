'use client';

import withAuth from '@/lib/withAuth';

function PacienteRootLayout({ children }) {
  return {children};
}

export default withAuth(PacienteRootLayout, ['admin', 'enfermeira']);
