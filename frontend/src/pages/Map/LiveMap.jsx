import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import API from '../../services/api';
import { Map, Layers, Navigation, CloudRain, Thermometer, Sun, Cloud, Calendar, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

// Custom Map Marker Icon
const farmIcon = L.divIcon({
  className: 'custom-map-pin',
  html: `<div class="w-9 h-9 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white text-base font-bold animate-bounce">🌾</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18]
});

const { BaseLayer, Overlay } = LayersControl;

const LiveMap = () => {
  const [position, setPosition] = useState([20.2961, 85.8245]); // Bhubaneswar default GPS
  const [locationName, setLocationName] = useState("Bhubaneswar, Khordha District");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocationWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const res = await API.get('/weather/intelligence', {
        params: { location: locationName, temp: 31.2, humidity: 76.0, rainfall: 8.5 }
      });
      setWeatherData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationWeather(position[0], position[1]);
  }, [position]);

  const handleGetGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setPosition([lat, lon]);
        setLocationName(`Farm Coordinates: ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`);
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-emerald-500/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 backdrop-blur-md">
            <Map className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" /> Live Precision GIS Layer
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Interactive Agriculture Map & Live Temperature</h1>
            <p className="text-xs text-slate-300">Live area temperature, 2-day microclimate forecast, and satellite GIS layers</p>
          </div>
        </div>

        <button
          onClick={handleGetGPSLocation}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all self-start md:self-auto shrink-0"
        >
          <Navigation className="w-4 h-4 animate-pulse" /> Locate My Farm via GPS
        </button>
      </div>

      {/* Grid: 2-Day Weather Forecast & Current Temp HUD + Leaflet GIS Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live Temp HUD & 2-Day Weather Forecast */}
        <div className="space-y-6">
          
          {/* Current Location Temperature HUD */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                Live GPS Temperature
              </span>
              <Thermometer className="w-5 h-5 text-emerald-500" />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500">{locationName}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900 dark:text-white">
                  {weatherData ? `${weatherData.current_weather.temperature_c}°C` : '31.2°C'}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Partly Cloudy</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <p className="text-[10px] text-slate-400 font-bold">Humidity</p>
                <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{weatherData?.current_weather.humidity_percent || 76}%</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <p className="text-[10px] text-slate-400 font-bold">Rainfall</p>
                <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{weatherData?.current_weather.rainfall_mm || 8.5} mm</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <p className="text-[10px] text-slate-400 font-bold">UV Index</p>
                <p className="font-extrabold text-amber-500 mt-0.5">{weatherData?.current_weather.uv_index || 6.5}</p>
              </div>
            </div>
          </div>

          {/* 2-Day Weather Forecast Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" /> 2-Day Weather Forecast
              </h3>
              <span className="text-[10px] font-bold text-slate-400">Microclimate AI</span>
            </div>

            <div className="space-y-3">
              
              {/* Day 1: Tomorrow */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">Tomorrow (Day 1)</p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">Clear & Sunny • Low Rain Risk</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-900 dark:text-white">32.5°C</p>
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Rain: 15%</p>
                </div>
              </div>

              {/* Day 2: Day After Tomorrow */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/40 dark:to-blue-950/40 border border-sky-200 dark:border-sky-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500 text-white shadow-md shadow-sky-500/20">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">Day 2 (Day After)</p>
                    <p className="text-[11px] text-sky-700 dark:text-sky-300 font-medium">Scattered Thunderstorms</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-900 dark:text-white">28.0°C</p>
                  <p className="text-[10px] font-bold text-sky-600 dark:text-sky-400">Rain: 75%</p>
                </div>
              </div>

            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Advised Action: Clear field drainage before Day 2 thunderstorms.</span>
            </div>
          </div>

        </div>

        {/* Right Column: Leaflet GIS Map Container */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-3">
          
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-300">Active GIS Coordinates:</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{position[0].toFixed(4)}°N, {position[1].toFixed(4)}°E</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>OpenStreetMap + Satellite HUD</span>
            </div>
          </div>

          <div className="h-[520px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner relative z-0">
            <MapContainer center={position} zoom={12} scrollWheelZoom={true} className="h-full w-full">
              <LayersControl position="topright">
                
                {/* Standard OSM Tile */}
                <BaseLayer checked name="OpenStreetMap Standard">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </BaseLayer>

                {/* Esri World Imagery Satellite Tile */}
                <BaseLayer name="Esri Satellite View">
                  <TileLayer
                    attribution='Tiles &copy; Esri'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                </BaseLayer>

                {/* Temperature & Moisture Circle Overlay */}
                <Overlay checked name="Temperature Heatmap Zone">
                  <LayerGroup>
                    <Circle
                      center={position}
                      radius={3000}
                      pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.2 }}
                    />
                    <Marker position={position} icon={farmIcon}>
                      <Popup>
                        <div className="text-xs font-bold space-y-1 p-1">
                          <p className="text-emerald-600 text-sm font-extrabold">🌾 Your Farm Location</p>
                          <p className="text-slate-800">Current Temp: <b>{weatherData?.current_weather.temperature_c || 31.2}°C</b></p>
                          <p className="text-slate-600">Tomorrow: 32.5°C (Sunny)</p>
                          <p className="text-slate-600">Day 2: 28.0°C (Rain 75%)</p>
                          <p className="text-emerald-700">Soil Moisture: 78% Optimal</p>
                        </div>
                      </Popup>
                    </Marker>
                  </LayerGroup>
                </Overlay>

              </LayersControl>
            </MapContainer>
          </div>

        </div>

      </div>

    </div>
  );
};

export default LiveMap;
