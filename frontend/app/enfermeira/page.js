'use client';

import { useState, useEffect } from 'react';
import withAuth from '@/lib/withAuth';

function EnfermeiraDashboardPage({ user }) {
  const [stats, setStats] = useState({
    pacientesInternados: 0,
    pacientesTriagem: 0,
    medicamentosAdministrar: 0,
    leitosDisponiveis: 0,
  });

  const [pacientesUrgentes, setPacientesUrgentes] = useState([]);

  useEffect(() => {
    // Em uma implementação real, esses dados viriam da API
    // Por enquanto, vamos usar dados fictícios
    setStats({
      pacientesInternados: 32,
      pacientesTriagem: 8,
      medicamentosAdministrar: 15,
      leitosDisponiveis: 18,
    });

    setPacientesUrgentes([
      { id: 1, nome: 'Roberto Almeida', leito: '12A', status: 'Crítico', sinaisVitais: 'PA: 160/100, FC: 110' },
      { id: 2, nome: 'Mariana Costa', leito: '08B', status: 'Instável', sinaisVitais: 'PA: 90/60, FC: 120' },
      { id: 3, nome: 'Paulo Ferreira', leito: '15C', status: 'Em observação', sinaisVitais: 'PA: 140/90, FC: 95' },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard de Enfermagem</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Pacientes Internados</h2>
          <p className="text-3xl font-bold text-teal-600">{stats.pacientesInternados}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Aguardando Triagem</h2>
          <p className="text-3xl font-bold text-orange-600">{stats.pacientesTriagem}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Medicamentos a Administrar</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.medicamentosAdministrar}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Leitos Disponíveis</h2>
          <p className="text-3xl font-bold text-green-600">{stats.leitosDisponiveis}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Pacientes que Requerem Atenção</h2>
          
          {pacientesUrgentes.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {pacientesUrgentes.map((paciente) => (
                <div key={paciente.id} className="py-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{paciente.nome}</p>
                      <p className="text-sm text-gray-500">Leito: {paciente.leito}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      paciente.status === 'Crítico' ? 'bg-red-100 text-red-800' :
                      paciente.status === 'Instável' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {paciente.status}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{paciente.sinaisVitais}</p>
                  <div className="mt-2 flex space-x-2">
                    <button className="text-xs bg-teal-600 hover:bg-teal-700 text-white px-2 py-1 rounded">
                      Ver detalhes
                    </button>
                    <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">
                      Registrar sinais
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum paciente requer atenção imediata.</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ações Rápidas</h2>
          
          <div className="space-y-3">
            <a href="/enfermeira/triagem" className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Iniciar Triagem
            </a>
            <a href="/enfermeira/medicamentos" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Administrar Medicamentos
            </a>
            <a href="/enfermeira/sinais-vitais" className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              Registrar Sinais Vitais
            </a>
            <a href="/enfermeira/leitos" className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Gerenciar Leitos
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Medicamentos a Administrar</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leito
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosagem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Roberto Almeida</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">12A</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Dipirona</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">500mg</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-600 font-medium">12:30</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-xs">
                    Administrar
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Mariana Costa</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">08B</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Amoxicilina</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">500mg</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-600 font-medium">12:45</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-xs">
                    Administrar
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Paulo Ferreira</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">15C</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Paracetamol</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">750mg</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">13:15</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-xs">
                    Administrar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <a href="/enfermeira/medicamentos" className="text-teal-600 hover:underline text-sm font-medium">
            Ver todos os medicamentos →
          </a>
        </div>
      </div>
    </div>
  );
}

export default withAuth(EnfermeiraDashboardPage, ['enfermeira']);
