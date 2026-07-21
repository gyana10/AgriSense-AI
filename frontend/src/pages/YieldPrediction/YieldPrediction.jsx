import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useFarm } from '../../context/FarmContext';
import { LineChart, DollarSign, Scale, Loader2, ArrowRight, CloudSun } from 'lucide-react';

const YieldPrediction = () => {
  const { farmState, updateYieldEstimate } = useFarm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    state: 'Odisha',
    district: 'Khordha',
    crop: farmState.crop || 'Rice',
    season: 'Kharif',
    area_hectares: 2.5,
    rainfall: farmState.rainfall || 1250.0
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (farmState.crop) {
      setFormData(prev => ({
        ...prev,
        crop: farmState.crop,
        rainfall: farmState.rainfall || 1250.0
      }));
    }
  }, [farmState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/yield/predict', {
        state: formData.state,
        district: formData.district,
        crop: formData.crop,
        season: formData.season,
        area_hectares: Number(formData.area_hectares),
        rainfall: Number(formData.rainfall)
      });
      setResult(res.data);
      updateYieldEstimate(res.data.total_production_tons, res.data.estimated_revenue_inr);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
          <LineChart className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Crop Yield & Production Regressor</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connected Pipeline ({farmState.crop ? `Active Crop: ${farmState.crop}` : 'Select Crop'})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Farm Location & Crop Metadata
            </h3>
            {farmState.crop && (
              <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full">
                Auto-Filled from Crop ML
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">State</label>
              <input
                type="text" value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">District</label>
              <input
                type="text" value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Target Crop</label>
              <input
                type="text" value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Season</label>
              <input
                type="text" value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Area (Hectares)</label>
              <input
                type="number" step="0.1" value={formData.area_hectares}
                onChange={(e) => setFormData({ ...formData, area_hectares: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Annual Rainfall (mm)</label>
              <input
                type="number" step="1" value={formData.rainfall}
                onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LineChart className="w-4 h-4" />}
            Calculate Yield & Harvest Tonnage for {formData.crop}
          </button>
        </form>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Harvest & Revenue Summary
          </h3>

          {result ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20">
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-200">Predicted Yield</span>
                <h2 className="text-3xl font-black mt-1">{result.yield_tons_per_ha} Tons / Ha</h2>
                <p className="text-xs text-indigo-100 mt-1">Total Harvest Production: <b>{result.total_production_tons} Tons</b></p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Estimated Market Revenue</p>
                    <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mt-0.5">
                      ₹{result.estimated_revenue_inr.toLocaleString()}
                    </h3>
                  </div>
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
              </div>

              {/* Action Trigger to Weather & Irrigation Plan */}
              <button
                onClick={() => navigate('/weather')}
                className="w-full p-2.5 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 rounded-xl text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center justify-between transition-colors mt-4"
              >
                <span className="flex items-center gap-2">
                  <CloudSun className="w-4 h-4 text-sky-600" />
                  Proceed to Smart Irrigation Plan for {formData.crop}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs">
              <Scale className="w-10 h-10 mx-auto mb-2 opacity-40" />
              Input land area and crop metadata to calculate yield metrics
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
