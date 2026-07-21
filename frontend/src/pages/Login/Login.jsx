import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout, Lock, Mail, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('farmer@agrisense.ai');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/20">
          <Sprout className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Log In to AgriSense</h1>
        <p className="text-xs text-slate-500">Enter your credentials to access your precision farm dashboard</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">Email Address</label>
          <div className="relative mt-1">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">Password</label>
          <div className="relative mt-1">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-xs text-slate-500">
        Don't have an account? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
