'use client';

import { useState, useEffect } from 'react';
import withAuth from '@/lib/withAuth';

function MedicoDashboardPage({ user }) {
  const [stats, setStats] = useState({
    totalPacientes: 0,
    pacientesHoje: 0,
    prescricoesAtivas: 0,
    internacoesAtivas: 0,
  });

  const [proximosAtendimentos, setProximosAtendimentos] = useState([]);

  useEffect(() => {
    // Em uma implementação real, esses dados viriam da API
    // Por enquanto, vamos usar dados fictícios
    setStats({
      totalPacientes: 48,
      pacientesHoje: 12,
      prescricoesAtivas: 35,
      internacoesAtivas: 8,
    });

    setProximosAtendimentos([
      { id: 1, nome: 'Maria Silva', horario: '13:30', tipo: 'Consulta' },
      { id: 2, nome: 'João Santos', horario: '14:15', tipo: 'Retorno' },
      { id: 3, nome: 'Ana Oliveira', horario: '15:00', tipo: 'Exame' },
      { id: 4, nome: 'Carlos Pereira', horario: '16:30', tipo: 'Consulta' },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">Dashboard Médico</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Total de Pacientes</h2>
          <p className="text-3xl font-bold text-black">{stats.totalPacientes}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Pacientes Hoje</h2>
          <p className="text-3xl font-bold text-black">{stats.pacientesHoje}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Prescrições Ativas</h2>
          <p className="text-3xl font-bold text-black">{stats.prescricoesAtivas}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Internações Ativas</h2>
          <p className="text-3xl font-bold text-black">{stats.internacoesAtivas}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black mb-4">Próximos Atendimentos</h2>
          
          {proximosAtendimentos.length > 0 ? (
            <div className="divide-y divide-blue-200">
              {proximosAtendimentos.map((atendimento) => (
                <div key={atendimento.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-black">{atendimento.nome}</p>
                    <p className="text-sm text-black">{atendimento.tipo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-black">{atendimento.horario}</p>
                    <button className="text-sm text-black hover:underline">Ver detalhes</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black">Nenhum atendimento agendado para hoje.</p>
          )}
          
          <div className="mt-4">
            <a href="/medico/agenda" className="text-black hover:underline text-sm font-medium">
              Ver agenda completa →
            </a>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black mb-4">Ações Rápidas</h2>
          
          <div className="space-y-3">
            <a href="/medico/prontuarios/novo" className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
              Novo Prontuário
            </a>
            <a href="/medico/prescricoes/nova" className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
              Nova Prescrição
            </a>
            <a href="/medico/pacientes" className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
              Buscar Paciente
            </a>
            <a href="/medico/internacoes" className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
              Gerenciar Internações
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-black mb-4">Atividades Recentes</h2>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-700 pl-4 py-2">
            <p className="text-sm text-black">Hoje, 10:15</p>
            <p className="font-medium text-black">Prontuário atualizado: Maria Silva</p>
          </div>
          <div className="border-l-4 border-blue-700 pl-4 py-2">
            <p className="text-sm text-black">Hoje, 09:30</p>
            <p className="font-medium text-black">Nova prescrição: João Santos - Dipirona 500mg</p>
          </div>
          <div className="border-l-4 border-blue-700 pl-4 py-2">
            <p className="text-sm text-black">Ontem, 16:45</p>
            <p className="font-medium text-black">Alta concedida: Ana Oliveira</p>
          </div>
          <div className="border-l-4 border-blue-700 pl-4 py-2">
            <p className="text-sm text-black">Ontem, 14:20</p>
            <p className="font-medium text-black">Nova internação: Carlos Pereira - Leito 08</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(MedicoDashboardPage, ['medico']);