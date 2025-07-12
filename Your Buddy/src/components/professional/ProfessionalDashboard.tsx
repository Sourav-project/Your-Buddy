import React from 'react';
import { ProfessionalWeatherData } from '../../types/professional';
import CommuteImpactCard from './CommuteImpactCard';
import WorkabilityScoreCard from './WorkabilityScoreCard';
import TravelImpactCard from './TravelImpactCard';
import ClothingRecommendationsCard from './ClothingRecommendationsCard';
import AirQualityCard from './AirQualityCard';
import PollenCard from './PollenCard';
import OptimalConditionsCard from './OptimalConditionsCard';
import UVExposureCard from './UVExposureCard';

interface ProfessionalDashboardProps {
  professionalData: ProfessionalWeatherData;
}

const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ professionalData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommuteImpactCard commuteImpact={professionalData.commuteImpact} />
        <WorkabilityScoreCard workabilityScore={professionalData.workabilityScore} />
      </div>
      
      <TravelImpactCard travelImpact={professionalData.travelImpact} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AirQualityCard airQuality={professionalData.airQuality} />
          <PollenCard pollen={professionalData.pollen} />
        </div>
        <div>
          <UVExposureCard uvExposure={professionalData.uvExposure} />
          <OptimalConditionsCard conditions={professionalData.optimalWorkingConditions} />
        </div>
      </div>
      
      <ClothingRecommendationsCard recommendations={professionalData.clothingRecommendations} />
    </div>
  );
};

export default ProfessionalDashboard;