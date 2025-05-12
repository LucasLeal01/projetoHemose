'use client';

import { useState, useEffect } from 'react';
import withAuth from '@/lib/withAuth';

function PacienteDashboardPage({ user }) {
  const [pacientes, setPacientes] = useState([]);
  const [novoPaciente, setNovoPaciente] = useState({
    nome: '',
    idade: '',
    leito: '',
    status: '',
    sinaisVitais: '',
  });

  useEffect(() => {
    // Dados fictícios para inicializar o estado
    setPacientes([
      { id: 1, nome: 'Roberto Almeida', idade: 45, leito: '12A', status: 'Internado', sinaisVitais: 'PA: 160/100, FC: 110' },
      { id: 2, nome: 'Mariana Costa', idade: 30, leito: '08B', status: 'Em Triagem', sinaisVitais: 'PA: 90/60, FC: 120' },
      { id: 3, nome: 'Paulo Ferreira', idade: 60, leito: '15C', status: 'Em observação', sinaisVitais: 'PA: 140/90, FC: 95' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoPaciente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCadastroPaciente = () => {
    setPacientes([...pacientes, { id: pacientes.length + 1, ...novoPaciente }]);
    setNovoPaciente({ nome: '', idade: '', leito: '', status: '', sinaisVitais: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">Dashboard de Pacientes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Cadastro de Paciente</h2>
          <input
            type="text"
            name="nome"
            value={novoPaciente.nome}
            onChange={handleInputChange}
            placeholder="Nome"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="idade"
            value={novoPaciente.idade}
            onChange={handleInputChange}
            placeholder="Idade"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="leito"
            value={novoPaciente.leito}
            onChange={handleInputChange}
            placeholder="Leito"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="status"
            value={novoPaciente.status}
            onChange={handleInputChange}
            placeholder="Status"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="sinaisVitais"
            value={novoPaciente.sinaisVitais}
            onChange={handleInputChange}
            placeholder="Sinais Vitais"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCadastroPaciente}
            className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar Paciente
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black">Pacientes Cadastrados</h2>
          <div className="divide-y divide-green-200">
            {pacientes.map((paciente) => (
              <div key={paciente.id} className="py-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-black">{paciente.nome}</p>
                    <p className="text-sm text-black">Idade: {paciente.idade}</p>
                    <p className="text-sm text-black">Leito: {paciente.leito}</p>
                    <p className="text-sm text-black">Status: {paciente.status}</p>
                  </div>
                </div>
                <p className="text-sm mt-1 text-black">Sinais Vitais: {paciente.sinaisVitais}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(PacienteDashboardPage, ['admin', 'enfermeira']);
