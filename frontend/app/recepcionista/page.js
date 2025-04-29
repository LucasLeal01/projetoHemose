'use client';

import { useState, useEffect } from 'react';
import withAuth from '@/lib/withAuth';

function RecepcionistaDashboardPage({ user }) {
  const [stats, setStats] = useState({
    pacientesHoje: 0,
    agendamentosHoje: 0,
    pacientesAguardando: 0,
    proximosAgendamentos: 0,
  });

  const [filaEspera, setFilaEspera] = useState([]);

  useEffect(() => {
    // Em uma implementação real, esses dados viriam da API
    // Por enquanto, vamos usar dados fictícios
    setStats({
      pacientesHoje: 24,
      agendamentosHoje: 35,
      pacientesAguardando: 6,
      proximosAgendamentos: 12,
    });

    setFilaEspera([
      { id: 1, nome: 'José Silva', horario: '11:30', tipo: 'Consulta', medico: 'Dr. Carlos Santos', status: 'Aguardando' },
      { id: 2, nome: 'Fernanda Lima', horario: '11:45', tipo: 'Retorno', medico: 'Dra. Ana Oliveira', status: 'Triagem' },
      { id: 3, nome: 'Ricardo Souza', horario: '12:00', tipo: 'Exame', medico: 'Dr. Paulo Mendes', status: 'Aguardando' },
      { id: 4, nome: 'Camila Ferreira', horario: '12:15', tipo: 'Consulta', medico: 'Dra. Mariana Costa', status: 'Aguardando' },
      { id: 5, nome: 'Eduardo Martins', horario: '12:30', tipo: 'Consulta', medico: 'Dr. Carlos Santos', status: 'Aguardando' },
      { id: 6, nome: 'Luciana Alves', horario: '12:45', tipo: 'Retorno', medico: 'Dra. Ana Oliveira', status: 'Aguardando' },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard de Recepção</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Pacientes Hoje</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.pacientesHoje}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Agendamentos Hoje</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.agendamentosHoje}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Aguardando Atendimento</h2>
          <p className="text-3xl font-bold text-orange-600">{stats.pacientesAguardando}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Próximos Agendamentos</h2>
          <p className="text-3xl font-bold text-green-600">{stats.proximosAgendamentos}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Fila de Espera</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                Atualizar
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                Gerenciar Fila
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Médico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filaEspera.map((paciente) => (
                  <tr key={paciente.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{paciente.nome}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{paciente.horario}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{paciente.tipo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{paciente.medico}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        paciente.status === 'Aguardando' ? 'bg-yellow-100 text-yellow-800' :
                        paciente.status === 'Triagem' ? 'bg-blue-100 text-blue-800' :
                        paciente.status === 'Em Atendimento' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {paciente.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs">
                        Check-in
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ações Rápidas</h2>
          
          <div className="space-y-3">
            <a href="/recepcionista/pacientes/novo" className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Novo Paciente
            </a>
            <a href="/recepcionista/agendamentos/novo" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Novo Agendamento
            </a>
            <a href="/recepcionista/check-in" className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Check-in de Paciente
            </a>
            <a href="/recepcionista/acompanhantes/novo" className="block w-full text-center bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              Cadastrar Acompanhante
            </a>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Busca Rápida</h3>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Nome ou CPF do paciente" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Próximos Agendamentos</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Médico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">29/04/2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">09:00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Antônio Gomes</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Consulta</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Dr. Carlos Santos</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-purple-600 hover:text-purple-900">Editar</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">29/04/2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">10:30</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Juliana Mendes</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Retorno</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Dra. Ana Oliveira</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-purple-600 hover:text-purple-900">Editar</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">29/04/2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">14:15</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Roberto Almeida</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Exame</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Dr. Paulo Mendes</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-purple-600 hover:text-purple-900">Editar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <a href="/recepcionista/agendamentos" className="text-purple-600 hover:underline text-sm font-medium">
            Ver todos os agendamentos →
          </a>
        </div>
      </div>
    </div>
  );
}

export default withAuth(RecepcionistaDashboardPage, ['recepcionista']);
