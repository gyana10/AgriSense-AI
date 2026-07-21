import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedRole = localStorage.getItem('agrisense_role') || 'farmer';
    const savedName = localStorage.getItem('agrisense_name') || 'Demo Farmer';
    return { name: savedName, role: savedRole };
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      const { access_token, refresh_token, role, full_name } = res.data;
      localStorage.setItem('agrisense_access_token', access_token);
      localStorage.setItem('agrisense_refresh_token', refresh_token);
      localStorage.setItem('agrisense_role', role);
      localStorage.setItem('agrisense_name', full_name);
      setUser({ name: full_name, role });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.detail || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('agrisense_access_token');
    localStorage.removeItem('agrisense_refresh_token');
    localStorage.removeItem('agrisense_role');
    localStorage.removeItem('agrisense_name');
    setUser(null);
  };

  const setRole = (newRole) => {
    localStorage.setItem('agrisense_role', newRole);
    setUser(prev => ({ ...prev, role: newRole }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
