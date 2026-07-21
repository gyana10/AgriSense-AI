import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Layers, Navigation, CloudRain, Thermometer, ShieldAlert } from 'lucide-react';

const { BaseLayer, Overlay } = LayersControl;

const LiveMap = () => {
  const [position, setPosition] = useState([20.2961, 85.8245]); // Bhubaneswar GPS coords
  const [selectedLocation, setSelectedLocation] = useState("Bhubaneswar, Khordha District, Odisha");

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setSelectedLocation(`GPS Coordinates: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Live Agricultural Intelligence Map</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">GIS OpenStreetMap dashboard with weather overlays & GPS positioning</p>
          </div>
        </div>

        <button
          onClick={handleGetLocation}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Navigation className="w-4 h-4" /> Locate My Farm via GPS
        </button>
      </div>

      {/* Map Control Bar & Future Provider Abstractions */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">Selected Location:</span>
          <span className="text-emerald-600 font-extrabold">{selectedLocation}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>Future Integration Ready:</span>
          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">Google Earth Engine</span>
          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">ISRO Bhuvan</span>
          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">Sentinel Hub</span>
        </div>
      </div>

      {/* Leaflet OpenStreetMap Container */}
      <div className="h-[500px] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl relative z-0">
        <MapContainer center={position} zoom={11} scrollWheelZoom={true} className="h-full w-full">
          <LayersControl position="topright">
            
            {/* OpenStreetMap Base Tile Layer */}
            <BaseLayer checked name="OpenStreetMap Standard">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>

            {/* Satellite Base Layer */}
            <BaseLayer name="Esri World Imagery (Satellite)">
              <TileLayer
                attribution='Tiles &copy; Esri'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </BaseLayer>

            {/* Weather & Rainfall Overlay Layer */}
            <Overlay checked name="Rainfall & Moisture Layer">
              <LayerGroup>
                <Marker position={position}>
                  <Popup>
                    <div className="text-xs font-bold space-y-1">
                      <p className="text-emerald-600">🌾 Farm Location Marker</p>
                      <p>Temp: 29.5°C | Rain: 5.0mm</p>
                      <p>Soil Moisture Index: 78% (Optimal)</p>
                    </div>
                  </Popup>
                </Marker>
              </LayerGroup>
            </Overlay>

          </LayersControl>
        </MapContainer>
      </div>

    </div>
  );
};

export default LiveMap;
