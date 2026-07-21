import React, { useState } from 'react';
import API from '../../services/api';
import { Scan, Upload, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

const DiseaseDetection = () => {
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
      const res = await API.post('/disease/detect', formData, {
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
        <div className="p-3 rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-500/20">
          <Scan className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">YOLOv11 Leaf Disease Vision Scanner</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Upload plant leaf photo for real-time bounding box diagnosis & organic treatment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Upload Dropzone */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Leaf Image Drag & Drop
          </h3>

          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors relative">
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Leaf Preview" className="max-h-64 mx-auto rounded-xl shadow-md" />
                {result && result.bounding_boxes && result.bounding_boxes.length > 0 && (
                  <div className="absolute inset-0 border-4 border-rose-500 rounded-xl pointer-events-none animate-pulse" />
                )}
              </div>
            ) : (
              <div className="space-y-2 py-8">
                <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Click to upload or drag leaf image</p>
                <p className="text-[10px] text-slate-400">Supports JPG, PNG (Max 10MB)</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <button
            onClick={handleScan}
            disabled={!file || loading}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scan className="w-4 h-4" />}
            Run YOLOv11 Disease Diagnosis
          </button>
        </div>

        {/* Diagnostic Output */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Diagnosis & Agronomic Prescription
          </h3>

          {result ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-600 text-white shadow-xl shadow-rose-600/20">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-200">Detected Condition</span>
                <h2 className="text-2xl font-black mt-0.5">{result.disease_name}</h2>
                <div className="flex items-center gap-4 text-xs text-rose-100 mt-2">
                  <span>Confidence: <b>{result.confidence}%</b></span>
                  <span>Severity: <b>{result.severity}</b></span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                  <p className="font-bold text-emerald-800 dark:text-emerald-300">Organic Treatment:</p>
                  <p className="text-emerald-700 dark:text-emerald-400 mt-0.5">{result.treatment_plan.organic_treatment}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-slate-800 dark:text-slate-200">Chemical Treatment:</p>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">{result.treatment_plan.chemical_treatment}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs">
              <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-40" />
              Upload a plant leaf photo and run vision scan to view diagnostic output
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DiseaseDetection;
