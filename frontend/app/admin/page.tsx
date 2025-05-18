'use client';

import { useState, useEffect } from 'react';
import withAuth from '@/lib/withAuth';
import { User, Stats } from '@/types';
import { useUsers } from '@/lib/apiUser';
import { usePacientes } from '@/lib/apiPaciente';

// Interface para as props do componente
interface AdminDashboardPageProps {
  user: User;
}

// Interface para atividades recentes
interface Atividade {
  id: number;
  data: string;
  descricao: string;
}

function AdminDashboardPage({ user }: AdminDashboardPageProps) {
  // Estados para armazenar dados dinâmicos
  const [stats, setStats] = useState<Stats>({
    totalMedicos: 0,
    totalEnfermeiras: 0,
    totalRecepcionistas: 0,
    totalPacientes: 0,
    totalLeitos: 0,
    leitosOcupados: 0,
    atendimentosHoje: 0,
  });
  
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const { fetchUsers, loading: loadingUsers } = useUsers();
  const { fetchPacientes, loading: loadingPacientes } = usePacientes();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Função para carregar todos os dados
    const carregarDados = async () => {
      try {
        setIsLoading(true);
        
        // Buscar usuários por tipo para calcular estatísticas
        const medicos = await fetchUsers('medico');
        const enfermeiras = await fetchUsers('enfermeira');
        const recepcionistas = await fetchUsers('recepcionista');
        
        // Buscar pacientes
        const pacientes = await fetchPacientes();
        
        // Em uma aplicação real, estes dados viriam de endpoints específicos
        // Por enquanto, vamos calcular baseado nos dados que temos
        setStats({
          totalMedicos: medicos.length,
          totalEnfermeiras: enfermeiras.length,
          totalRecepcionistas: recepcionistas.length,
          totalPacientes: pacientes.length,
          totalLeitos: 50, // Simulado, viria da API
          leitosOcupados: 32, // Simulado, viria da API
          atendimentosHoje: 45, // Simulado, viria da API
        });
        
        // Atividades simuladas, em uma app real viriam da API
        setAtividades([
          { id: 1, data: 'Hoje, 10:45', descricao: `Novo médico cadastrado: Dr. ${medicos[0]?.nome || 'Carlos Silva'}` },
          { id: 2, data: 'Hoje, 09:30', descricao: `Paciente ${pacientes[0]?.nome || 'Maria Santos'} recebeu alta` },
          { id: 3, data: 'Ontem, 16:20', descricao: 'Medicamento Dipirona atualizado no estoque' },
          { id: 4, data: 'Ontem, 14:15', descricao: `Nova internação: ${pacientes[1]?.nome || 'João Pereira'} (Leito 12)` }
        ]);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarDados();
  }, []); // Array de dependências vazio para executar apenas na montagem do componente

  // Renderização condicional de loader durante o carregamento
  if (isLoading || loadingUsers || loadingPacientes) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-600"></div>
        <p className="ml-2 text-rose-700">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Total de Médicos</h2>
          <p className="text-3xl font-bold text-black">{stats.totalMedicos}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Total de Enfermeiras</h2>
          <p className="text-3xl font-bold text-black">{stats.totalEnfermeiras}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Total de Recepcionistas</h2>
          <p className="text-3xl font-bold text-black">{stats.totalRecepcionistas}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Total de Pacientes</h2>
          <p className="text-3xl font-bold text-black">{stats.totalPacientes}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Status dos Leitos</h2>
          <div className="mt-4">
            <div className="flex justify-between mb-2 text-black">
              <span>Ocupados</span>
              <span className="font-semibold">{stats.leitosOcupados} de {stats.totalLeitos}</span>
            </div>
            <div className="w-full bg-rose-200 rounded-full h-2.5">
              <div 
                className="bg-rose-700 h-2.5 rounded-full" 
                style={{ width: `${stats.leitosOcupados !== undefined && stats.totalLeitos ? (stats.leitosOcupados / stats.totalLeitos) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Atendimentos Hoje</h2>
          <p className="text-3xl font-bold text-black">{stats.atendimentosHoje}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Ações Rápidas</h2>
          <div className="mt-4 space-y-2">
            <a href="/admin/users" className="block w-full text-center bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 px-4 rounded">
              Gerenciar Usuários
            </a>
            <a href="/admin/pacientes" className="block w-full text-center bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 px-4 rounded">
              Cadastrar Paciente
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-black mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {atividades.length > 0 ? (
            atividades.map((atividade) => (
              <div key={atividade.id} className="border-l-4 border-rose-600 pl-4 py-2">
                <p className="text-sm text-black">{atividade.data}</p>
                <p className="font-medium text-black">{atividade.descricao}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma atividade recente encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboardPage, ['admin']); // Protege a rota apenas para administradores
            
            
/*
   __  ____ ____ _  _ 
 / _\/ ___) ___) )( \
/    \___ \___ ) \/ (
\_/\_(____(____|____/

   */