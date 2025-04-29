'use client';

import { useState, useEffect } from 'react';
import { useUsers } from '@/lib/api';
import withAuth from '@/lib/withAuth';

function AdminUsersPage({ user }) {
  const [activeTab, setActiveTab] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'medico',
    ativo: true
  });
  
  const { 
    users, 
    loading, 
    error, 
    fetchUsers, 
    createUser, 
    updateUser, 
    deleteUser 
  } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    if (tab === 'todos') {
      await fetchUsers();
    } else {
      await fetchUsers(tab);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({
      nome: '',
      email: '',
      senha: '',
      tipo: 'medico',
      ativo: true
    });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      nome: user.nome,
      email: user.email,
      senha: '', // Não preencher senha ao editar
      tipo: user.tipo,
      ativo: user.ativo
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Se senha estiver vazia, remova do objeto para não atualizar
        const dataToUpdate = {...formData};
        if (!dataToUpdate.senha) {
          delete dataToUpdate.senha;
        }
        await updateUser(editingUser.id, dataToUpdate);
      } else {
        await createUser(formData);
      }
      setShowModal(false);
      await fetchUsers(activeTab !== 'todos' ? activeTab : null);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(userId);
        await fetchUsers(activeTab !== 'todos' ? activeTab : null);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  const filteredUsers = activeTab === 'todos' 
    ? users 
    : users.filter(user => user.tipo === activeTab);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Olá, {user?.nome}</span>
            <button 
              onClick={() => window.location.href = '/logout'} 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => handleTabChange('todos')}
                className={`${
                  activeTab === 'todos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Todos
              </button>
              <button
                onClick={() => handleTabChange('medico')}
                className={`${
                  activeTab === 'medico'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Médicos
              </button>
              <button
                onClick={() => handleTabChange('enfermeira')}
                className={`${
                  activeTab === 'enfermeira'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Enfermeiras
              </button>
              <button
                onClick={() => handleTabChange('recepcionista')}
                className={`${
                  activeTab === 'recepcionista'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Recepcionistas
              </button>
            </nav>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Adicionar Usuário
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center mt-8">
              <p>Carregando...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 p-4 mt-6 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <li key={user.id}>
                      <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{user.nome}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <div className="mt-1 flex items-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.tipo === 'admin' ? 'bg-purple-100 text-purple-800' :
                              user.tipo === 'medico' ? 'bg-blue-100 text-blue-800' :
                              user.tipo === 'enfermeira' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.tipo === 'admin' ? 'Administrador' :
                               user.tipo === 'medico' ? 'Médico' :
                               user.tipo === 'enfermeira' ? 'Enfermeira' :
                               'Recepcionista'}
                            </span>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                              user.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(user)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-4 sm:px-6">
                    <p className="text-gray-500">Nenhum usuário encontrado.</p>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Modal para criar/editar usuário */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                  Senha {editingUser && "(deixe em branco para manter a atual)"}
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required={!editingUser}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo">
                  Tipo de Usuário
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="medico">Médico</option>
                  <option value="enfermeira">Enfermeira</option>
                  <option value="recepcionista">Recepcionista</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="ativo"
                  name="ativo"
                  checked={formData.ativo}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-gray-700 text-sm font-bold" htmlFor="ativo">
                  Ativo
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(AdminUsersPage, ['admin']);
