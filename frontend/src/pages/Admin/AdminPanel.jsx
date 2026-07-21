import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Settings, Users, Cpu, ShieldCheck, Activity } from 'lucide-react';

const AdminPanel = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await API.get('/admin/analytics');
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdminData();
  }, []);

  if (!data) return <div className="p-8 text-center text-xs text-slate-400">Loading Admin Metrics...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/20">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Management Hub</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">User management, model registry, performance metrics, and system logs</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Total Registered Users</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{data.total_users}</p>
          </div>
          <Users className="w-8 h-8 text-purple-500" />
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Active AI Pipelines</p>
            <p className="text-3xl font-black text-emerald-500 mt-1">{data.active_models.length}</p>
          </div>
          <Cpu className="w-8 h-8 text-emerald-500" />
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Backend Server Status</p>
            <p className="text-lg font-black text-emerald-500 mt-1 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" /> {data.server_status}
            </p>
          </div>
          <Activity className="w-8 h-8 text-sky-500" />
        </div>
      </div>

      {/* Model Registry Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
          Model Registry & Version Information
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold">
                <th className="pb-3">Model Name</th>
                <th className="pb-3">Version</th>
                <th className="pb-3 text-right">Accuracy / Metric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.active_models.map((m, idx) => (
                <tr key={idx}>
                  <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{m.name}</td>
                  <td className="py-3 text-slate-500">{m.version}</td>
                  <td className="py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">{m.accuracy || m.r2 || m.mAP50}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminPanel;
