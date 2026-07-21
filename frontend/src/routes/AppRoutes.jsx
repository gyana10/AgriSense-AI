import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import CropRecommendation from '../pages/CropRecommendation/CropRecommendation';
import Fertilizer from '../pages/Fertilizer/Fertilizer';
import SoilFertility from '../pages/SoilFertility/SoilFertility';
import YieldPrediction from '../pages/YieldPrediction/YieldPrediction';
import DiseaseDetection from '../pages/DiseaseDetection/DiseaseDetection';
import PestDetection from '../pages/PestDetection/PestDetection';
import Weather from '../pages/Weather/Weather';
import Assistant from '../pages/Assistant/Assistant';
import Schemes from '../pages/Schemes/Schemes';
import LiveMap from '../pages/Map/LiveMap';
import Market from '../pages/Market/Market';
import KnowledgeHub from '../pages/Knowledge/KnowledgeHub';
import Reports from '../pages/Reports/Reports';
import AdminPanel from '../pages/Admin/AdminPanel';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crop-recommendation" element={<CropRecommendation />} />
      <Route path="/fertilizer" element={<Fertilizer />} />
      <Route path="/soil-fertility" element={<SoilFertility />} />
      <Route path="/yield-prediction" element={<YieldPrediction />} />
      <Route path="/disease-detection" element={<DiseaseDetection />} />
      <Route path="/pest-detection" element={<PestDetection />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/assistant" element={<Assistant />} />
      <Route path="/schemes" element={<Schemes />} />
      <Route path="/map" element={<LiveMap />} />
      <Route path="/market" element={<Market />} />
      <Route path="/knowledge" element={<KnowledgeHub />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
