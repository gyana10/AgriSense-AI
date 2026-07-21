import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Sprout, Sun, Moon, LogIn, User, Menu, X, ChevronDown, 
  Map, CloudSun, Landmark, TrendingUp, MessageSquare, LineChart, Shield
} from 'lucide-react';

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modelsDropdownOpen, setModelsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Schemes', path: '/schemes' },
    { name: 'Market Prices', path: '/market' },
    { name: 'Weather', path: '/weather' },
    { name: 'Live Map', path: '/map' },
    { name: 'AI Assistant', path: '/assistant' },
  ];

  const aiModels = [
    { name: 'Crop Recommendation', path: '/crop-recommendation', icon: Sprout },
    { name: 'Soil Fertility & SHAP', path: '/soil-fertility', icon: Shield },
    { name: 'Yield & Production', path: '/yield-prediction', icon: LineChart },
    { name: 'Disease Vision Scanner', path: '/disease-detection', icon: Sprout },
    { name: 'Pest Detection', path: '/pest-detection', icon: Sprout },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-nav shadow-lg border-b border-emerald-500/10 py-3' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              AgriSense <span className="text-emerald-500 font-black">AI</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-slate-500 block -mt-1">
              Precision Agriculture
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-white/40 dark:bg-slate-900/40 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname === link.path
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* AI Models Dropdown */}
          <div className="relative">
            <button
              onClick={() => setModelsDropdownOpen(!modelsDropdownOpen)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-all"
            >
              AI Models <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {modelsDropdownOpen && (
              <div 
                onMouseLeave={() => setModelsDropdownOpen(false)}
                className="absolute top-full right-0 mt-2 w-56 p-2 rounded-2xl glass-panel shadow-2xl border border-emerald-500/20 space-y-1 animate-in fade-in slide-in-from-top-2"
              >
                {aiModels.map((m, idx) => (
                  <Link
                    key={idx}
                    to={m.path}
                    onClick={() => setModelsDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <m.icon className="w-4 h-4 text-emerald-500" />
                    <span>{m.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-3">
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 transition-transform"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-emerald-500" />
                <span className="capitalize">{user.role}</span>
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-emerald-500/20 p-4 space-y-2">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;