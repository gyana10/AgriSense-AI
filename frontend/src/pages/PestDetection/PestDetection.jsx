import React, { useState } from 'react';
import API from '../../services/api';
import { Bug, Upload, ShieldCheck, Loader2 } from 'lucide-react';

const PestDetection = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.post('/pest/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/20">
          <Bug className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">YOLOv11 Pest Identification & Count</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Detects pest species, counts instances, and assesses severity rating</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Pest Image Upload
          </h3>

          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-amber-500 transition-colors relative">
            {preview ? (
              <img src={preview} alt="Pest Preview" className="max-h-64 mx-auto rounded-xl shadow-md" />
            ) : (
              <div className="space-y-2 py-8">
                <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Click to upload pest image</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>

          <button
            onClick={handleScan}
            disabled={!file || loading}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bug className="w-4 h-4" />}
            Run YOLOv11 Pest Detection
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Pest Count & Control Plan
          </h3>

          {result ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-600 text-white shadow-xl shadow-amber-600/20">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Pest Species</span>
                <h2 className="text-2xl font-black mt-0.5">{result.pest_name}</h2>
                <div className="flex items-center gap-4 text-xs text-amber-100 mt-2">
                  <span>Pest Count: <b>{result.pest_count} Insects</b></span>
                  <span>Severity: <b>{result.severity}</b></span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs">
                <p className="font-bold text-emerald-800 dark:text-emerald-300">Bio-Pesticide Control:</p>
                <p className="text-emerald-700 dark:text-emerald-400 mt-0.5">{result.treatment_plan.organic_treatment}</p>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs">
              <Bug className="w-10 h-10 mx-auto mb-2 opacity-40" />
              Upload an image to inspect pest counts and severity level
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PestDetection;
