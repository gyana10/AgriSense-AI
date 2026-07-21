import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useFarm } from '../../context/FarmContext';
import { TestTube2, Leaf, Calendar, Loader2, ArrowRight, LineChart, CheckCircle2 } from 'lucide-react';

const Fertilizer = () => {
  const { farmState, updateFertilizerPlan } = useFarm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    crop: farmState.crop || 'Rice',
    nitrogen: farmState.nitrogen || 20,
    phosphorus: farmState.phosphorus || 10,
    potassium: farmState.potassium || 10,
    soil_type: 'Loamy'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (farmState.crop) {
      setFormData(prev => ({
        ...prev,
        crop: farmState.crop,
        nitrogen: farmState.nitrogen,
        phosphorus: farmState.phosphorus,
        potassium: farmState.potassium
      }));
    }
  }, [farmState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/fertilizer/recommend', {
        crop: formData.crop,
        nitrogen: Number(formData.nitrogen),
        phosphorus: Number(formData.phosphorus),
        potassium: Number(formData.potassium),
        soil_type: formData.soil_type
      });
      setResult(res.data);
      updateFertilizerPlan(res.data.recommended_fertilizer, res.data.organic_alternative, res.data.application_schedule);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
          <TestTube2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Fertilizer & Organic Alternative Recommender</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connected to Crop Recommendation pipeline ({farmState.crop ? `Active Crop: ${farmState.crop}` : 'Select Crop'})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Target Crop & Soil Nutrients
            </h3>
            {farmState.crop && (
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                Auto-Filled from Crop ML
              </span>
            )}
          </div>
          
          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Crop Name</label>
            <input
              type="text" value={formData.crop}
              onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
              className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Current N</label>
              <input
                type="number" value={formData.nitrogen}
                onChange={(e) => setFormData({ ...formData, nitrogen: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Current P</label>
              <input
                type="number" value={formData.phosphorus}
                onChange={(e) => setFormData({ ...formData, phosphorus: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Current K</label>
              <input
                type="number" value={formData.potassium}
                onChange={(e) => setFormData({ ...formData, potassium: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TestTube2 className="w-4 h-4" />}
            Calculate Fertilizer Plan for {formData.crop}
          </button>
        </form>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Recommended Fertilizer & Organic Substitute
          </h3>

          {result ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/20">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">Chemical Fertilizer</span>
                <h2 className="text-2xl font-black mt-0.5">{result.recommended_fertilizer}</h2>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50">
                <p className="text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-500" /> Organic Alternative:
                </p>
                <p className="text-xs text-teal-700 dark:text-teal-400 mt-1">{result.organic_alternative}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-500" /> Application Schedule:
                </h4>
                <div className="space-y-2 text-xs">
                  {result.application_schedule.map((stage, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white">{stage.stage}</p>
                      <p className="text-slate-500">{stage.dose} • {stage.method}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger to Yield Prediction */}
              <button
                onClick={() => navigate('/yield-prediction')}
                className="w-full p-2.5 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-between transition-colors mt-4"
              >
                <span className="flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-indigo-600" />
                  Proceed to Yield Prediction for {formData.crop}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs">
              <TestTube2 className="w-10 h-10 mx-auto mb-2 opacity-40" />
              Enter crop & soil parameters to calculate fertilizer schedule
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fertilizer;
