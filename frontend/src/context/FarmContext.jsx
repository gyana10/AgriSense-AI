import React, { createContext, useContext, useState, useEffect } from 'react';

const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  const [activeFarmState, setActiveFarmState] = useState(() => {
    const saved = localStorage.getItem('agrisense_farm_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      crop: 'Rice',
      nitrogen: 90,
      phosphorus: 42,
      potassium: 43,
      temperature: 20.8,
      humidity: 82.0,
      ph: 6.5,
      rainfall: 202.9,
      recommendedFertilizer: null,
      yieldTons: null,
      diseaseAlert: null
    };
  });

  useEffect(() => {
    localStorage.setItem('agrisense_farm_state', JSON.stringify(activeFarmState));
  }, [activeFarmState]);

  const updateCropRecommendation = (cropName, soilInputs) => {
    setActiveFarmState(prev => ({
      ...prev,
      crop: cropName,
      nitrogen: soilInputs.nitrogen,
      phosphorus: soilInputs.phosphorus,
      potassium: soilInputs.potassium,
      temperature: soilInputs.temperature,
      humidity: soilInputs.humidity,
      ph: soilInputs.ph,
      rainfall: soilInputs.rainfall
    }));
  };

  const updateFertilizerPlan = (fertName, altName, schedule) => {
    setActiveFarmState(prev => ({
      ...prev,
      recommendedFertilizer: { fertName, altName, schedule }
    }));
  };

  const updateYieldEstimate = (yieldTons, revenueInr) => {
    setActiveFarmState(prev => ({
      ...prev,
      yieldTons,
      revenueInr
    }));
  };

  const updateDiseaseAlert = (diseaseName, severity) => {
    setActiveFarmState(prev => ({
      ...prev,
      diseaseAlert: { diseaseName, severity }
    }));
  };

  return (
    <FarmContext.Provider value={{
      farmState: activeFarmState,
      updateCropRecommendation,
      updateFertilizerPlan,
      updateYieldEstimate,
      updateDiseaseAlert
    }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => useContext(FarmContext);
