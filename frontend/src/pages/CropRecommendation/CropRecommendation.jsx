import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useFarm } from '../../context/FarmContext';
import { Sprout, BarChart2, Lightbulb, Loader2, ArrowRight, TestTube2, LineChart, CloudSun } from 'lucide-react';

const CropRecommendation = () => {
  const { farmState, updateCropRecommendation } = useFarm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nitrogen: farmState.nitrogen || 90,
    phosphorus: farmState.phosphorus || 42,
    potassium: farmState.potassium || 43,
    temperature: farmState.temperature || 20.8,
    humidity: farmState.humidity || 82.0,
    ph: farmState.ph || 6.5,
    rainfall: farmState.rainfall || 202.9
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const numericData = {
        nitrogen: Number(formData.nitrogen),
        phosphorus: Number(formData.phosphorus),
        potassium: Number(formData.potassium),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall)
      };

      const res = await API.post('/crop/predict', numericData);
      setResult(res.data);
      
      // Update global cross-module pipeline state
      updateCropRecommendation(res.data.recommended_crop, numericData);
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

        {/* Prediction Results & Connected Next Steps */}
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
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Top Candidates:</h4>
                  <div className="space-y-2">
                    {result.top_recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <span className="font-bold capitalize text-slate-800 dark:text-slate-200">{rec.crop}</span>
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{rec.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seamless Pipeline Action Triggers */}
                <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Connected Next Steps:</p>
                  
                  <button
                    onClick={() => navigate('/fertilizer')}
                    className="w-full p-2.5 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <TestTube2 className="w-4 h-4 text-emerald-600" />
                      Get Fertilizer Plan for {result.recommended_crop}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate('/yield-prediction')}
                    className="w-full p-2.5 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <LineChart className="w-4 h-4 text-indigo-600" />
                      Estimate Yield & Revenue for {result.recommended_crop}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
            <span>Recommended crop will automatically flow to Fertilizer, Yield & Irrigation plans.</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CropRecommendation;
