import React, { useState } from 'react';
import API from '../../services/api';
import { Thermometer, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';

const SoilFertility = () => {
  const [formData, setFormData] = useState({
    nitrogen: 140,
    phosphorus: 30,
    potassium: 150,
    ph: 6.8,
    ec: 1.2,
    organic_carbon: 0.65
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/soil/predict', {
        nitrogen: Number(formData.nitrogen),
        phosphorus: Number(formData.phosphorus),
        potassium: Number(formData.potassium),
        ph: Number(formData.ph),
        ec: Number(formData.ec),
        organic_carbon: Number(formData.organic_carbon)
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
        <div className="p-3 rounded-2xl bg-teal-500 text-white shadow-lg shadow-teal-500/20">
          <Thermometer className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Soil Fertility & SHAP Explainability</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Classifies High/Medium/Low fertility with feature importance breakdown</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Chemical Soil Parameters
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">N (kg/ha)</label>
              <input
                type="number" value={formData.nitrogen}
                onChange={(e) => setFormData({ ...formData, nitrogen: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">P (kg/ha)</label>
              <input
                type="number" value={formData.phosphorus}
                onChange={(e) => setFormData({ ...formData, phosphorus: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">K (kg/ha)</label>
              <input
                type="number" value={formData.potassium}
                onChange={(e) => setFormData({ ...formData, potassium: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">pH Level</label>
              <input
                type="number" step="0.1" value={formData.ph}
                onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">EC (dS/m)</label>
              <input
                type="number" step="0.1" value={formData.ec}
                onChange={(e) => setFormData({ ...formData, ec: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Organic C (%)</label>
              <input
                type="number" step="0.01" value={formData.organic_carbon}
                onChange={(e) => setFormData({ ...formData, organic_carbon: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Analyze Soil Fertility & SHAP Impact
          </button>
        </form>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            SHAP Explainable AI Breakdown
          </h3>
          
          {result ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-teal-600 text-white shadow-xl shadow-teal-600/20">
                <span className="text-[10px] uppercase font-bold tracking-widest text-teal-200">Soil Fertility Rating</span>
                <h2 className="text-3xl font-black mt-1">{result.fertility_level} Fertility</h2>
                <p className="text-xs text-teal-100 mt-1">Health Index Score: <b>{result.index_score} / 100</b></p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">SHAP Feature Impact Weights:</h4>
                <div className="space-y-2">
                  {result.shap_explanation.top_features.map((feat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span>{feat.feature} (Val: {feat.value})</span>
                        <span className="text-teal-600 dark:text-teal-400">{(feat.importance * 100).toFixed(1)}% Impact</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${feat.importance * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs">
              <Thermometer className="w-10 h-10 mx-auto mb-2 opacity-40" />
              Run analysis to generate SHAP feature impact visualization
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilFertility;
