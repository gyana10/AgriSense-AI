import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';
import { Sprout, Lock, Mail, User, Shield, Loader2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'farmer',
    state: 'Odisha',
    district: 'Khordha'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('agrisense_access_token', res.data.access_token);
      localStorage.setItem('agrisense_refresh_token', res.data.refresh_token);
      localStorage.setItem('agrisense_role', res.data.role);
      localStorage.setItem('agrisense_name', res.data.full_name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/20">
          <Sprout className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Create AgriSense Account</h1>
        <p className="text-xs text-slate-500">Register as a Farmer, Agronomist, Researcher, or Admin</p>
      </div>

      {error && <div className="p-3 rounded-xl bg-rose-50 text-xs text-rose-600 font-bold">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">Full Name</label>
          <input
            type="text" value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">Email Address</label>
          <input
            type="email" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">Password</label>
          <input
            type="password" value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">User Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white capitalize"
          >
            <option value="farmer">Farmer</option>
            <option value="agronomist">Agronomist</option>
            <option value="researcher">Researcher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Register Account'}
        </button>
      </form>
    </div>
  );
};

export default Register;
