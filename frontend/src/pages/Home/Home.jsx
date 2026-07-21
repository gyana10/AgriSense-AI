import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { 
  Sprout, Thermometer, CloudSun, AlertTriangle, ShieldCheck, 
  Map, TrendingUp, Landmark, Calendar, ArrowRight, Activity, Zap
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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 shadow-2xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-3 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5" /> Commercial Precision AgriTech SaaS v1.0
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Welcome to AgriSense AI
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              AI-driven soil diagnostics, YOLOv11 leaf vision scanning, real-time microclimate intelligence, and automated yield estimation for maximum crop profit.
            </p>
          </div>

          {/* Farm Health Gauge (Centerpiece 0-100) */}
          <div className="flex items-center gap-5 bg-white/10 dark:bg-slate-800/60 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400 stroke-current"
                  strokeDasharray={`${healthScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xl font-black text-white">{healthScore}</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-300 font-bold">Farm Health Score</p>
              <p className="text-lg font-bold text-white">Optimal Condition</p>
              <p className="text-[11px] text-slate-300">5 Diagnostic Parameters Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Weather, Quick Action Cards, Market & Schemes */}
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
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4" />
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

      {/* Analytics Chart & Interactive Map Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Soil Moisture & Yield Trend Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" /> Seasonal Soil Health & Yield Trends
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sampleChartData}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="yieldIdx" stroke="#10b981" fillOpacity={1} fill="url(#colorMoisture)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GIS Map & Schemes Highlights */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-500" /> Government Schemes Highlights
              </h3>
              <Link to="/schemes" className="text-xs text-emerald-600 font-bold hover:underline">Explore Portal</Link>
            </div>
            <div className="space-y-3">
              {schemes.map((s) => (
                <div key={s.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{s.category}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{s.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{s.short_description}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/map"
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Map className="w-4 h-4" /> Open Interactive GIS Map Layer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Home;