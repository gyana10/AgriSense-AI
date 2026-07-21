import React from 'react';
import API from '../../services/api';
import { FileText, Download, ShieldCheck } from 'lucide-react';

const Reports = () => {
  const handleDownloadPDF = () => {
    window.open(`${API.defaults.baseURL}/reports/pdf?user_name=Farmer_User&health_score=88`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">PDF Diagnostic Report Generator</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Generate and download official PDF reports with ReportLab formatting</p>
        </div>
      </div>

      {/* Action Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Comprehensive Farm Diagnostic Report</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Includes crop recommendations, soil SHAP breakdown, disease vision scans, weather risks, and official agronomic action items.
          </p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 inline-flex items-center gap-2 transition-all"
        >
          <Download className="w-4 h-4" /> Download PDF Report (ReportLab)
        </button>
      </div>

    </div>
  );
};

export default Reports;
