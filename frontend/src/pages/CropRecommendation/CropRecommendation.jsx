import React, { useState } from 'react';
import API from '../../services/api';
import { Sprout, CheckCircle2, BarChart2, Lightbulb, Loader2 } from 'lucide-react';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: 90,
    phosphorus: 42,
    potassium: 43,
    temperature: 20.8,
    humidity: 82.0,
    ph: 6.5,
    rainfall: 202.9
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/crop/predict', {
        nitrogen: Number(formData.nitrogen),
        phosphorus: Number(formData.phosphorus),
        potassium: Number(formData.potassium),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall)
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
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
          <Sprout className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Crop Recommendation Engine</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">ML classification trained on CatBoost & XGBoost models</p>
        </div>
      </div>

      {/* Form & Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Soil & Microclimate Parameters
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Nitrogen (N)</label>
              <input
                type="number"
                value={formData.nitrogen}
                onChange={(e) => setFormData({ ...formData, nitrogen: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Phosphorus (P)</label>
              <input
                type="number"
                value={formData.phosphorus}
                onChange={(e) => setFormData({ ...formData, phosphorus: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Potassium (K)</label>
              <input
                type="number"
                value={formData.potassium}
                onChange={(e) => setFormData({ ...formData, potassium: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Temp (°C)</label>
              <input
                type="number" step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Humidity (%)</label>
              <input
                type="number" step="0.1"
                value={formData.humidity}
                onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Soil pH</label>
              <input
                type="number" step="0.1"
                value={formData.ph}
                onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Rainfall (mm)</label>
              <input
                type="number" step="0.1"
                value={formData.rainfall}
                onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sprout className="w-4 h-4" />}
            Run ML Crop Recommendation
          </button>
        </form>

        {/* Prediction Results */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Model Diagnostic Output
            </h3>
            
            {result ? (
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">Recommended Crop</span>
                  <h2 className="text-3xl font-black capitalize mt-1">{result.recommended_crop}</h2>
                  <p className="text-xs text-emerald-100 mt-1">Confidence Score: <b>{result.confidence}%</b></p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Top 3 Candidates:</h4>
                  <div className="space-y-2">
                    {result.top_recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <span className="font-bold capitalize text-slate-800 dark:text-slate-200">{rec.crop}</span>
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{rec.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 text-xs">
                <BarChart2 className="w-10 h-10 mx-auto mb-2 opacity-40" />
                Fill soil parameters and click 'Run ML Crop Recommendation'
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>High rainfall (&gt;200mm) strongly favors rice cultivation.</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CropRecommendation;
