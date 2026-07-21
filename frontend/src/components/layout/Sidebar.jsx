import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Sprout, TestTube2, Thermometer, LineChart, 
  Scan, Bug, CloudSun, MessageSquare, Landmark, Map, TrendingUp, BookOpen, FileText, Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard Hero', path: '/', icon: LayoutDashboard },
  { name: 'Crop Recommendation', path: '/crop-recommendation', icon: Sprout },
  { name: 'Fertilizer Advisor', path: '/fertilizer', icon: TestTube2 },
  { name: 'Soil Fertility & SHAP', path: '/soil-fertility', icon: Thermometer },
  { name: 'Yield Predictor', path: '/yield-prediction', icon: LineChart },
  { name: 'Disease Scanner', path: '/disease-detection', icon: Scan },
  { name: 'Pest Scanner', path: '/pest-detection', icon: Bug },
  { name: 'Weather Intelligence', path: '/weather', icon: CloudSun },
  { name: 'AI Assistant', path: '/assistant', icon: MessageSquare },
  { name: 'Government Schemes', path: '/schemes', icon: Landmark },
  { name: 'Live GIS Map', path: '/map', icon: Map },
  { name: 'Market Intelligence', path: '/market', icon: TrendingUp },
  { name: 'Knowledge Hub', path: '/knowledge', icon: BookOpen },
  { name: 'PDF Reports', path: '/reports', icon: FileText },
  { name: 'Admin Panel', path: '/admin', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 hidden lg:block bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 min-h-[calc(100vh-4rem)] p-4 transition-colors">
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Precision Toolkit
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
