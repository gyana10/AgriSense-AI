import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Bell, Sprout, User, Shield, ChevronDown, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout, setRole } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const roles = ['farmer', 'agronomist', 'researcher', 'admin'];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Sprout className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                AgriSense AI
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                Precision Agriculture
              </span>
            </div>
          </Link>

          {/* Controls: Role Selector, Notifications, Theme Toggle, Profile */}
          <div className="flex items-center gap-4">
            
            {/* Role Switcher */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <Shield className="w-4 h-4 text-emerald-500 ml-2" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Role:</span>
              <select
                value={user?.role || 'farmer'}
                onChange={(e) => setRole(e.target.value)}
                className="bg-transparent text-xs font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none cursor-pointer capitalize pr-2"
              >
                {roles.map(r => (
                  <option key={r} value={r} className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                title="Alerts & Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                    <span>Active Alerts</span>
                    <span className="text-xs font-normal text-emerald-500">2 New</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-200">
                      <strong>Weather Alert:</strong> High rain forecast in Khordha district tomorrow.
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-200">
                      <strong>Scheme Update:</strong> PM-KISAN 17th installment disbursement started.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-sm">
                  {user?.name ? user.name[0] : 'A'}
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.name || 'Farmer User'}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{user?.role || 'Farmer'}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <User className="w-4 h-4" /> My Profile
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;