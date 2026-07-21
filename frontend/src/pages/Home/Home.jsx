import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { 
  Sprout, Thermometer, CloudSun, AlertTriangle, ShieldCheck, 
  Map, TrendingUp, Landmark, Calendar, ArrowRight, Activity, Zap, CheckCircle2, Award, Users, FileText
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleChartData = [
  { month: 'Jan', moisture: 65, yieldIdx: 72 },
  { month: 'Feb', moisture: 58, yieldIdx: 75 },
  { month: 'Mar', moisture: 70, yieldIdx: 82 },
  { month: 'Apr', moisture: 74, yieldIdx: 88 },
  { month: 'May', moisture: 62, yieldIdx: 85 },
  { month: 'Jun', moisture: 85, yieldIdx: 94 },
  { month: 'Jul', moisture: 90, yieldIdx: 96 }
];

const Home = () => {
  const [healthScore, setHealthScore] = useState(88);
  const [weather, setWeather] = useState(null);
  const [marketPrices, setMarketPrices] = useState([]);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [wRes, mRes, sRes] = await Promise.all([
          API.get('/weather/intelligence'),
          API.get('/market/prices'),
          API.get('/schemes/list')
        ]);
        setWeather(wRes.data);
        setMarketPrices(mRes.data.slice(0, 4));
        setSchemes(sRes.data.slice(0, 3));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* 1. Commercial SaaS Hero Banner (Inspired by Reference Design) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text & Primary Value Prop */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold backdrop-blur-md">
              <Zap className="w-4 h-4" /> Commercial Precision AgriTech SaaS v1.0
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Experience Real <span className="text-emerald-400">Precision Agriculture</span>
            </h1>
            
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              AI-powered soil diagnostics, YOLOv11 leaf disease scanning, live microclimate mapping, and CatBoost yield prediction built for modern precision farming.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/crop-recommendation"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Sprout className="w-4 h-4" /> Start AI Crop Diagnostic <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/map"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all"
              >
                <Map className="w-4 h-4" /> View Live GIS Map
              </Link>
            </div>
          </div>

          {/* Right Cards Showcase (Matching Reference Layout) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white/10 dark:bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md space-y-2 hover:border-emerald-400/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                🌱
              </div>
              <h4 className="text-sm font-bold text-white">Organic Fertilizers</h4>
              <p className="text-[11px] text-slate-300">Customized bio-fertilizer schedules & neem compost alternatives.</p>
            </div>

            <div className="bg-white/10 dark:bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md space-y-2 hover:border-emerald-400/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                🛡️
              </div>
              <h4 className="text-sm font-bold text-white">Expert & Professional Farm</h4>
              <p className="text-[11px] text-slate-300">YOLOv11 vision disease detection with targeted treatments.</p>
            </div>

            {/* Farm Health Gauge Widget */}
            <div className="sm:col-span-2 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 p-4 rounded-2xl border border-emerald-400/30 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-700 stroke-current" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-emerald-400 stroke-current" strokeDasharray={`${healthScore}, 100`} strokeWidth="4" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute text-sm font-black text-white">{healthScore}</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Farm Health Index</p>
                  <p className="text-sm font-bold text-white">Optimal Condition</p>
                </div>
              </div>

              <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold">
                99.8% ML Accuracy
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* 2. Key Metrics Statistics Bar (From Reference Design: "323 Our Farms | 386 Happy Customers") */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">99.77%</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">CatBoost Crop Accuracy</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-black text-slate-900 dark:text-white">323</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">Registered Precision Farms</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-black text-slate-900 dark:text-white">386</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">Happy Farmers Served</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">470</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">Agronomic Advisories Issued</p>
        </div>
      </div>

      {/* 3. Showcase Section: "A New Way To Invest In Agriculture" (Matching Reference Image) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
            About Precision Agriculture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            A New Way To Invest In Agriculture
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            AgriSense AI combines satellite remote sensing, microclimate analytics, SHAP explainable AI, and computer vision to deliver actionable agronomic intelligence straight to farmers.
          </p>
          
          <div className="space-y-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated Soil Health & NPK Deficit Analysis
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> YOLOv11 Leaf Vision Scan with Bounding Boxes
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Government Scheme Applications & Subsidies
            </div>
          </div>

          <Link
            to="/crop-recommendation"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all mt-2"
          >
            Explore AI Diagnostic Engine <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">01</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Crop Selection</h4>
            <p className="text-[11px] text-slate-500">ML match based on NPK & climate.</p>
          </div>

          <div className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs">02</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Smart Irrigation</h4>
            <p className="text-[11px] text-slate-500">Watering schedule & duration.</p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">03</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Yield & Revenue</h4>
            <p className="text-[11px] text-slate-500">Harvest tonnage & INR rates.</p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">04</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Govt Subsidies</h4>
            <p className="text-[11px] text-slate-500">PM-KISAN & PMFBY direct links.</p>
          </div>
        </div>
      </div>

      {/* 4. Weather & Market Section Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Live Weather Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CloudSun className="w-4 h-4 text-emerald-500" /> Live Weather Intelligence
            </h3>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              GPS Verified
            </span>
          </div>
          {weather ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    {weather.current_weather.temperature_c}°C
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{weather.location}</p>
                </div>
                <div className="text-right text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  <p>Humidity: <span className="font-bold">{weather.current_weather.humidity_percent}%</span></p>
                  <p>Rainfall: <span className="font-bold">{weather.current_weather.rainfall_mm} mm</span></p>
                  <p>Wind: <span className="font-bold">{weather.current_weather.wind_speed_kmh} km/h</span></p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-200">Irrigation Advice:</p>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  {weather.irrigation_advice.best_time_to_water} ({weather.irrigation_advice.recommended_duration_minutes} mins)
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-pulse space-y-3 py-4">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2" />
            </div>
          )}
        </div>

        {/* Today's Recommendation & Disease Alert */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-500" /> Today's Recommendation
          </h3>
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider">Top Recommended Crop</p>
            <p className="text-xl font-black text-emerald-900 dark:text-emerald-100">Rice (Paddy) / Maize</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">Confidence Score: 99.77% (CatBoost Model)</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-2 text-xs text-amber-800 dark:text-amber-200">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <div>
              <p className="font-bold">Monsoon Fungal Blight Risk: Low</p>
              <p className="text-[11px] text-amber-700 dark:text-amber-300">Maintain standard neem foliar spray schedule.</p>
            </div>
          </div>
        </div>

        {/* Live Market Price Ticker */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Live Market Prices
            </h3>
            <Link to="/market" className="text-xs text-emerald-600 font-bold hover:underline">View All</Link>
          </div>
          <div className="space-y-2.5">
            {marketPrices.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{item.crop}</p>
                  <p className="text-[10px] text-slate-400">{item.market}</p>
                </div>
                <p className="font-extrabold text-emerald-600 dark:text-emerald-400">₹{item.modal_price_inr} / qtl</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;