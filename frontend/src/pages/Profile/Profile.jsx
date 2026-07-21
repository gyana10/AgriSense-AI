import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Shield, MapPin, Mail, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">User Profile & Account</h1>
          <p className="text-xs text-slate-500">AgriSense Precision Platform Credentials</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            {user?.name ? user.name[0] : 'A'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name || 'Farmer User'}</h2>
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold capitalize">
              Role: {user?.role || 'Farmer'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <p className="text-slate-400 font-bold">State / Location</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">Odisha, India</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <p className="text-slate-400 font-bold">District</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">Khordha</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
