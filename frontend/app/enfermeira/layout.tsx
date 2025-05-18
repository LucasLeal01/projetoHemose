'use client';

import EnfermeiraLayout from '@/components/layout/EnfermeiraLayout';

// Função de layout principal para enfermeira
export default function EnfermeiraRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Renderiza o layout da enfermeira com os filhos
  return <EnfermeiraLayout>{children}</EnfermeiraLayout>; 
            
            
}

/*
            
            
  __  ____ ____ _  _ 
 / _\/ ___) ___) )( \
/    \___ \___ ) \/ (
\_/\_(____(____|____/

 */