import React from 'react';
import { Sprout, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Sprout className="w-4 h-4 text-emerald-500" />
          <span className="font-bold text-slate-800 dark:text-slate-200">AgriSense AI Platform</span>
          <span>© 2026. Empowering Precision Farming worldwide.</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Engineered with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for Sustainable Agriculture</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;