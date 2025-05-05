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
          <h1 className="text-3xl font-bold text-black">Gerenciamento de Usuários</h1>
          <div className="flex items-center space-x-4">
            <span className="text-black">Olá, {user?.nome}</span>
            <button 
              onClick={() => window.location.href = '/logout'} 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-purple-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => handleTabChange('todos')}
                className={`${
                  activeTab === 'todos'
                    ? 'border-purple-500 text-black'
                    : 'border-transparent text-black hover:text-gray-700 hover:border-purple-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Todos
              </button>
              <button
                onClick={() => handleTabChange('medico')}
                className={`${
                  activeTab === 'medico'
                    ? 'border-purple-500 text-black'
                    : 'border-transparent text-black hover:text-gray-700 hover:border-purple-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Médicos
              </button>
              <button
                onClick={() => handleTabChange('enfermeira')}
                className={`${
                  activeTab === 'enfermeira'
                    ? 'border-purple-500 text-black'
                    : 'border-transparent text-black hover:text-gray-700 hover:border-purple-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Enfermeiras
              </button>
              <button
                onClick={() => handleTabChange('recepcionista')}
                className={`${
                  activeTab === 'recepcionista'
                    ? 'border-purple-500 text-black'
                    : 'border-transparent text-black hover:text-gray-700 hover:border-purple-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Recepcionistas
              </button>
            </nav>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Adicionar Usuário
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center mt-8">
              <p className="text-black">Carregando...</p>
            </div>
          ) : error ? (
            <div className="bg-purple-100 p-4 mt-6 rounded-md">
              <p className="text-black">{error}</p>
            </div>
          ) : (
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-purple-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <li key={user.id}>
                      <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-black">{user.nome}</h3>
                          <p className="text-sm text-black">{user.email}</p>
                          <div className="mt-1 flex items-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.tipo === 'admin' ? 'bg-purple-100 text-black' :
                              user.tipo === 'medico' ? 'bg-blue-100 text-black' :
                              user.tipo === 'enfermeira' ? 'bg-green-100 text-black' :
                              'bg-yellow-100 text-black'
                            }`}>
                              {user.tipo === 'admin' ? 'Administrador' :
                               user.tipo === 'medico' ? 'Médico' :
                               user.tipo === 'enfermeira' ? 'Enfermeira' :
                               'Recepcionista'}
                            </span>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                              user.ativo ? 'bg-purple-100 text-black' : 'bg-purple-200 text-black'
                            }`}>
                              {user.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(user)}
                            className="px-3 py-1 bg-red-400 text-white rounded-md hover:bg-red-500"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-4 sm:px-6">
                    <p className="text-black">Nenhum usuário encontrado.</p>
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
            <h2 className="text-xl font-semibold text-black mb-4">
              {editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="nome">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="senha">
                  Senha {editingUser && "(deixe em branco para manter a atual)"}
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-600"
                  required={!editingUser}
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="tipo">
                  Tipo de Usuário
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-purple-500 focus:border-purple-500"
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
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                />
                <label className="ml-2 block text-black text-sm font-bold" htmlFor="ativo">
                  Ativo
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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