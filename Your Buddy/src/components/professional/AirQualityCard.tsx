import React from 'react';
import { AirQualityData } from '../../types/professional';
import { Wind, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface AirQualityCardProps {
  airQuality: AirQualityData;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality }) => {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-600 bg-green-50 border-green-200';
    if (aqi <= 100) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (aqi <= 150) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (aqi <= 200) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-purple-600 bg-purple-50 border-purple-200';
  };

  const getAQIIcon = (category: AirQualityData['category']) => {
    switch (category) {
      case 'good':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'moderate':
        return <AlertCircle size={20} className="text-yellow-600" />;
      default:
        return <AlertTriangle size={20} className="text-red-600" />;
    }
  };

  const getCategoryLabel = (category: AirQualityData['category']) => {
    switch (category) {
      case 'good': return 'Good';
      case 'moderate': return 'Moderate';
      case 'unhealthy-sensitive': return 'Unhealthy for Sensitive Groups';
      case 'unhealthy': return 'Unhealthy';
      case 'very-unhealthy': return 'Very Unhealthy';
      case 'hazardous': return 'Hazardous';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Wind className="text-cyan-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Air Quality Index</h3>
      </div>

      <div className={`p-4 rounded-xl border ${getAQIColor(airQuality.aqi)} mb-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            {getAQIIcon(airQuality.category)}
            <span className="font-semibold">{getCategoryLabel(airQuality.category)}</span>
          </div>
          <div className="text-2xl font-bold">{airQuality.aqi}</div>
        </div>
        <div className="text-sm opacity-90">AQI Level</div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">PM2.5</div>
          <div className="font-semibold">{airQuality.pollutants.pm25} μg/m³</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">PM10</div>
          <div className="font-semibold">{airQuality.pollutants.pm10} μg/m³</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">O₃</div>
          <div className="font-semibold">{airQuality.pollutants.o3} μg/m³</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">NO₂</div>
          <div className="font-semibold">{airQuality.pollutants.no2} μg/m³</div>
        </div>
      </div>

      {airQuality.healthRecommendations.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Health Recommendations:</h4>
          <ul className="space-y-1">
            {airQuality.healthRecommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="text-cyan-500 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AirQualityCard;