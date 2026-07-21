import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { 
  Sprout, Thermometer, CloudSun, AlertTriangle, ShieldCheck, 
  Map, TrendingUp, Landmark, Calendar, ArrowRight, Activity, Zap, CheckCircle2, Award, Users, ChevronDown, TestTube2, LineChart
} from 'lucide-react';

const Home = () => {
  const [healthScore, setHealthScore] = useState(88);
  const [weather, setWeather] = useState(null);
  const [marketPrices, setMarketPrices] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [videoError, setVideoError] = useState(false);

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

  const scrollToFeatures = () => {
    const el = document.getElementById('features-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="-mt-20 space-y-16 pb-12">
      
      {/* 1. CINEMATIC AUTOPLAY VIDEO HERO SECTION */}
      <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
        
        {/* Background Video */}
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-90 transition-transform duration-1000"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-green-farm-41584-large.mp4"
              type="video/mp4"
            />
            {/* Fallback Backup Stream */}
            <source
              src="https://cdn.coverr.co/videos/coverr-drone-shot-over-a-green-field-5346/1080p.mp4"
              type="video/mp4"
            />
          </video>
        ) : null}

        {/* High-Resolution Backup Image Overlay if Video Fails */}
        <div 
          className={`absolute inset-0 bg-cover bg-center ${videoError ? 'block' : 'hidden'}`}
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop')` }}
        />

        {/* 40-50% Dark Green Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 hero-gradient-overlay pointer-events-none" />

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 text-white pt-16">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-widest backdrop-blur-md animate-pulse">
            <Zap className="w-4 h-4 text-amber-400" /> Commercial AI Precision Agriculture Platform
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white drop-shadow-2xl">
            AI-Powered Precision Agriculture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-200">
              for Smarter Farming
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow">
            Predict. Protect. Optimize. Empower Every Harvest.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/crop-recommendation"
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-600/40 flex items-center gap-2.5 transition-all transform hover:scale-105"
            >
              <Sprout className="w-5 h-5" /> Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={scrollToFeatures}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all"
            >
              Explore Features
            </button>
          </div>

        </div>

        {/* Animated Scroll Indicator */}
        <div 
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white cursor-pointer animate-bounce-slow flex flex-col items-center gap-1 z-10"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest">Scroll Down</span>
          <ChevronDown className="w-5 h-5" />
        </div>

      </section>

      {/* 2. KEY METRICS COUNTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl glass-panel shadow-2xl border border-emerald-500/20">
          
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">99.77%</p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">CatBoost ML Accuracy</p>
          </div>

          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">323</p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Verified Precision Farms</p>
          </div>

          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">10,000+</p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Farmers Served</p>
          </div>

          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">470+</p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Agronomic Advisories</p>
          </div>

        </div>
      </section>

      {/* 3. FEATURE MODULES GRID SECTION */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
            Enterprise Feature Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            End-to-End Precision Agriculture Tools
          </h2>
          <p className="text-xs text-slate-500">
            Powered by CatBoost, YOLOv11 Computer Vision, SHAP Explainable AI, and LangChain RAG
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Crop Recommendation */}
          <Link
            to="/crop-recommendation"
            className="p-6 rounded-3xl glass-panel shadow-md border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/50 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                Crop Recommendation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                CatBoost classification model matching soil N, P, K, pH, and climate parameters to top 3 crops.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 gap-1">
              Explore Engine <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 2: Fertilizer Recommender */}
          <Link
            to="/fertilizer"
            className="p-6 rounded-3xl glass-panel shadow-md border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/50 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:scale-110 transition-transform">
              <TestTube2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                Fertilizer Recommender
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Calculates chemical NPK deficits, organic alternatives, and 3-stage application schedules.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 gap-1">
              Calculate Schedule <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 3: Soil Fertility & SHAP */}
          <Link
            to="/soil-fertility"
            className="p-6 rounded-3xl glass-panel shadow-md border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/50 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-600/30 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                Soil Fertility & SHAP
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                0-100 Soil Health Index classification with real-time SHAP feature importance impact weighting.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 gap-1">
              Inspect SHAP <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 4: Yield Prediction */}
          <Link
            to="/yield-prediction"
            className="p-6 rounded-3xl glass-panel shadow-md border border-slate-200 dark:border-slate-800 space-y-4 hover:border-indigo-500/50 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
              <LineChart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                Yield & Revenue Prediction
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Random Forest Regressor estimating harvest tonnage and market revenue in INR.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 gap-1">
              Estimate Production <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 5: Disease Vision Scanner */}
          <Link
            to="/disease-detection"
            className="p-6 rounded-3xl glass-panel shadow-md border border-slate-200 dark:border-slate-800 space-y-4 hover:border-rose-500/50 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 group-hover:scale-110 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                YOLOv11 Disease Scanner
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Computer vision leaf photo scanner returning bounding box diagnosis & organic remedies.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-rose-600 dark:text-rose-400 gap-1">
              Run Vision Scan <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 6: Weather & Live GIS Map */}
          <Link
            to="/map"
            className="p-6 rounded-3xl glass-panel shadow-md border border-slate-200 dark:border-slate-800 space-y-4 hover:border-sky-500/50 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-110 transition-transform">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                Live GIS Map & Area Weather
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Leaflet OpenStreetMap HUD showing area temperature, satellite view, and 2-day forecast.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-sky-600 dark:text-sky-400 gap-1">
              Open Satellite Map <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Home;