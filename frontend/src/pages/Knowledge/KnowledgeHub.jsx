import React from 'react';
import { BookOpen, Video, FileText, HelpCircle, CheckCircle } from 'lucide-react';

const KnowledgeHub = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Farmer Knowledge Hub</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Best farming practices, crop calendars, video guides, FAQs & advisories</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Guides */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Seasonal Guides</h3>
          <p className="text-xs text-slate-500">Comprehensive sowing, fertigation, and harvesting schedules for Kharif, Rabi, and Zaid seasons.</p>
        </div>

        {/* Video Tutorials */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Video Tutorials</h3>
          <p className="text-xs text-slate-500">Watch step-by-step demonstrations on organic pest management and drip irrigation installation.</p>
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Agronomic FAQs</h3>
          <p className="text-xs text-slate-500">Verified answers to common farming queries reviewed by senior extension officers.</p>
        </div>

      </div>

    </div>
  );
};

export default KnowledgeHub;
