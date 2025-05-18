import { useState } from 'react';
import api from './api'; // Reutiliza a instância Axios com interceptor

export const usePacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPacientes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/paciente');
      setPacientes(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao buscar pacientes';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaciente = async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/paciente/${id}`);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao buscar paciente';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const createPaciente = async (pacienteData) => {
    try {
      setLoading(true);
      const response = await api.post('/paciente', pacienteData);
      setPacientes([...pacientes, response.data]);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao criar paciente';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const updatePaciente = async (id, pacienteData) => {
    try {
      setLoading(true);
      const response = await api.patch(`/paciente/${id}`, pacienteData);
      setPacientes(pacientes.map(p => p.id === id ? response.data : p));
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao atualizar paciente';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const deletePaciente = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/paciente/${id}`);
      setPacientes(pacientes.filter(p => p.id !== id));
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao excluir paciente';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    pacientes,
    loading,
    error,
    fetchPacientes,
    fetchPaciente,
    createPaciente,
    updatePaciente,
    deletePaciente,
  };
};
