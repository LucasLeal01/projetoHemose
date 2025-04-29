import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use this for App Router
import { useAuth } from '@/lib/api';

export default function withAuth(Component, allowedRoles = []) {
  return function AuthenticatedComponent(props) {
    const { user, loading, isAuthenticated, hasRole } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated()) {
          router.push('/login');
        } else if (allowedRoles.length > 0) {
          const hasAllowedRole = allowedRoles.some(role => hasRole(role));
          if (!hasAllowedRole) {
            if (hasRole('admin')) {
              router.push('/admin');
            } else if (hasRole('medico')) {
              router.push('/medico');
            } else if (hasRole('enfermeira')) {
              router.push('/enfermeira');
            } else if (hasRole('recepcionista')) {
              router.push('/recepcionista');
            } else {
              router.push('/login');
            }
          } else {
            setAuthorized(true);
          }
        } else {
          setAuthorized(true);
        }
      }
    }, [loading, isAuthenticated, router, hasRole, user]);

    if (loading || !authorized) {
      return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
    }

    return <Component {...props} user={user} />;
  };
}