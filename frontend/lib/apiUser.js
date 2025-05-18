import { useState, useEffect } from 'react';
import api from "./api";


// Hook personalizado para autenticação
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { email, senha });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        setError(null);
        return { success: true, user: response.data.user };
      } else {
        setError(response.data.message || 'Falha na autenticação');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao fazer login';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  const hasRole = (role) => {
    return user?.tipo === role;
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };
};

// Hook para operações CRUD de usuários
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (role = null) => {
    try {
      setLoading(true);
      const url = role ? `/users?role=${role}` : '/users';
      const response = await api.get(url);
      setUsers(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao buscar usuários';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao buscar usuário';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/users', userData);
      setUsers([...users, response.data]);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao criar usuário';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      setLoading(true);
      const response = await api.patch(`/users/${id}`, userData);
      setUsers(users.map(user => user.id === id ? response.data : user));
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao atualizar usuário';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao excluir usuário';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default api;
