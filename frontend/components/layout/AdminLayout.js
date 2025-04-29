'use client';

import { useAuth } from '@/lib/api';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const isActive = (path) => {
    return pathname === path ? 'bg-blue-800' : '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">HEMOSE</h1>
            <span className="text-sm bg-blue-900 px-2 py-1 rounded">Administração</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Olá, {user?.nome || 'Administrador'}</span>
            <button 
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-blue-700 text-white">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/admin" 
                  className={`block px-4 py-2 rounded hover:bg-blue-800 ${isActive('/admin')}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/users" 
                  className={`block px-4 py-2 rounded hover:bg-blue-800 ${isActive('/admin/users')}`}
                >
                  Gerenciar Usuários
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/pacientes" 
                  className={`block px-4 py-2 rounded hover:bg-blue-800 ${isActive('/admin/pacientes')}`}
                >
                  Pacientes
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/medicamentos" 
                  className={`block px-4 py-2 rounded hover:bg-blue-800 ${isActive('/admin/medicamentos')}`}
                >
                  Medicamentos
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/leitos" 
                  className={`block px-4 py-2 rounded hover:bg-blue-800 ${isActive('/admin/leitos')}`}
                >
                  Leitos
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/relatorios" 
                  className={`block px-4 py-2 rounded hover:bg-blue-800 ${isActive('/admin/relatorios')}`}
                >
                  Relatórios
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
