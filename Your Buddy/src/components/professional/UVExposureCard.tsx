import React from 'react';
import { ProfessionalWeatherData } from '../../types/professional';
import { Sun, Clock, Shield, AlertTriangle } from 'lucide-react';

interface UVExposureCardProps {
  uvExposure: ProfessionalWeatherData['uvExposure'];
}

const UVExposureCard: React.FC<UVExposureCardProps> = ({ uvExposure }) => {
  const getUVColor = (index: number) => {
    if (index <= 2) return 'text-green-600 bg-green-50 border-green-200';
    if (index <= 5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (index <= 7) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (index <= 10) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-purple-600 bg-purple-50 border-purple-200';
  };

  const getUVIcon = (index: number) => {
    if (index <= 2) return <Sun size={20} className="text-green-600" />;
    if (index <= 5) return <Sun size={20} className="text-yellow-600" />;
    if (index <= 7) return <Sun size={20} className="text-orange-600" />;
    return <AlertTriangle size={20} className="text-red-600" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Sun className="text-yellow-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">UV Exposure & Sun Safety</h3>
      </div>

      <div className={`p-4 rounded-xl border ${getUVColor(uvExposure.index)} mb-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            {getUVIcon(uvExposure.index)}
            <span className="font-semibold">{uvExposure.category}</span>
          </div>
          <div className="text-2xl font-bold">{uvExposure.index}</div>
        </div>
        <div className="text-sm opacity-90">UV Index Level</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Safe Exposure Time</span>
          </div>
          <div className="text-lg font-bold text-gray-800">{uvExposure.safeExposureTime} minutes</div>
          <div className="text-xs text-gray-600">Without protection</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield size={16} className="text-green-600" />
            <span className="text-sm font-medium text-gray-700">Protection Level</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {uvExposure.index > 6 ? 'High' : uvExposure.index > 3 ? 'Moderate' : 'Low'}
          </div>
          <div className="text-xs text-gray-600">Required protection</div>
        </div>
      </div>

      {uvExposure.recommendations.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Sun Protection Recommendations:</h4>
          <ul className="space-y-1">
            {uvExposure.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UVExposureCard;