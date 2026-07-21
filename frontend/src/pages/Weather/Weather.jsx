import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { CloudSun, Droplets, Wind, AlertTriangle, ShieldCheck } from 'lucide-react';

const Weather = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await API.get('/weather/intelligence');
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWeather();
  }, []);

  if (!data) return <div className="p-8 text-center text-xs text-slate-400">Loading Weather Intelligence...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
          <CloudSun className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Weather Intelligence & Smart Irrigation</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Disease/Pest risk scoring and automated watering advisor</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Microclimate Metrics
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Temperature</span>
              <span className="font-bold text-slate-900 dark:text-white">{data.current_weather.temperature_c}°C</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Humidity</span>
              <span className="font-bold text-slate-900 dark:text-white">{data.current_weather.humidity_percent}%</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Rainfall</span>
              <span className="font-bold text-slate-900 dark:text-white">{data.current_weather.rainfall_mm} mm</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Disease & Pest Risk Scoring
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
              <p className="font-bold text-amber-800 dark:text-amber-300">Fungal Disease Risk:</p>
              <p className="text-amber-700 dark:text-amber-400 mt-0.5">{data.risk_assessments.disease_risk}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
              <p className="font-bold text-emerald-800 dark:text-emerald-300">Pest Infestation Threat:</p>
              <p className="text-emerald-700 dark:text-emerald-400 mt-0.5">{data.risk_assessments.pest_risk}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Smart Irrigation Advisor
          </h3>
          <div className="p-4 rounded-2xl bg-sky-500 text-white shadow-xl shadow-sky-500/20 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-sky-200">Recommended watering</span>
            <h4 className="text-xl font-black">{data.irrigation_advice.best_time_to_water}</h4>
            <p className="text-xs text-sky-100">Duration: <b>{data.irrigation_advice.recommended_duration_minutes} Minutes</b></p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Weather;
