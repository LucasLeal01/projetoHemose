'use client';

import { useState, useEffect } from 'react';
import withAuth from '@/lib/withAuth';

function AdminDashboardPage({ user }) {
  const [stats, setStats] = useState({
    totalMedicos: 0,
    totalEnfermeiras: 0,
    totalRecepcionistas: 0,
    totalPacientes: 0,
    totalLeitos: 0,
    leitosOcupados: 0,
    atendimentosHoje: 0,
  });

  useEffect(() => {
    // Em uma implementação real, esses dados viriam da API
    // Por enquanto, vamos usar dados fictícios
    setStats({
      totalMedicos: 12,
      totalEnfermeiras: 25,
      totalRecepcionistas: 8,
      totalPacientes: 450,
      totalLeitos: 50,
      leitosOcupados: 32,
      atendimentosHoje: 45,
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total de Médicos</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalMedicos}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total de Enfermeiras</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalEnfermeiras}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total de Recepcionistas</h2>
          <p className="text-3xl font-bold text-yellow-600">{stats.totalRecepcionistas}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total de Pacientes</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.totalPacientes}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Status dos Leitos</h2>
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span>Ocupados</span>
              <span className="font-semibold">{stats.leitosOcupados} de {stats.totalLeitos}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(stats.leitosOcupados / stats.totalLeitos) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Atendimentos Hoje</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.atendimentosHoje}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Ações Rápidas</h2>
          <div className="mt-4 space-y-2">
            <a href="/admin/users" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Gerenciar Usuários
            </a>
            <a href="/admin/pacientes" className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Cadastrar Paciente
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {/* Em uma implementação real, esses dados viriam da API */}
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-sm text-gray-600">Hoje, 10:45</p>
            <p className="font-medium">Novo médico cadastrado: Dr. Carlos Silva</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <p className="text-sm text-gray-600">Hoje, 09:30</p>
            <p className="font-medium">Paciente Maria Santos recebeu alta</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <p className="text-sm text-gray-600">Ontem, 16:20</p>
            <p className="font-medium">Medicamento Dipirona atualizado no estoque</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <p className="text-sm text-gray-600">Ontem, 14:15</p>
            <p className="font-medium">Nova internação: João Pereira (Leito 12)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboardPage, ['admin']);
