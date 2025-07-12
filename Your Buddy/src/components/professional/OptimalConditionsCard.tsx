import React from 'react';
import { ProfessionalWeatherData } from '../../types/professional';
import { Home, Sun, Thermometer, Droplets, TrendingUp } from 'lucide-react';

interface OptimalConditionsCardProps {
  conditions: ProfessionalWeatherData['optimalWorkingConditions'];
}

const OptimalConditionsCard: React.FC<OptimalConditionsCardProps> = ({ conditions }) => {
  const getComfortColor = (comfort: string) => {
    switch (comfort) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 80) return 'text-green-600';
    if (productivity >= 60) return 'text-yellow-600';
    if (productivity >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <TrendingUp className="text-emerald-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Optimal Working Conditions</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Indoor Conditions */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <Home size={20} className="text-blue-600" />
            <h4 className="font-semibold text-gray-800">Indoor Environment</h4>
          </div>

          <div className={`p-4 rounded-xl border ${getComfortColor(conditions.indoor.comfort)}`}>
            <div className="text-center mb-3">
              <div className="text-lg font-bold capitalize">{conditions.indoor.comfort}</div>
              <div className="text-sm opacity-90">Comfort Level</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Thermometer size={16} className="text-red-500" />
                <span className="text-xs text-gray-600">Temperature</span>
              </div>
              <div className="font-semibold">{conditions.indoor.temperature}°C</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Droplets size={16} className="text-blue-500" />
                <span className="text-xs text-gray-600">Humidity</span>
              </div>
              <div className="font-semibold">{conditions.indoor.humidity}%</div>
            </div>
          </div>

          {conditions.indoor.recommendations.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Indoor Recommendations:</h5>
              <ul className="space-y-1">
                {conditions.indoor.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Outdoor Conditions */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <Sun size={20} className="text-orange-600" />
            <h4 className="font-semibold text-gray-800">Outdoor Environment</h4>
          </div>

          <div className={`p-4 rounded-xl border ${getComfortColor(conditions.outdoor.comfort)}`}>
            <div className="text-center mb-3">
              <div className="text-lg font-bold capitalize">{conditions.outdoor.comfort}</div>
              <div className="text-sm opacity-90">Comfort Level</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getProductivityColor(conditions.outdoor.productivity)}`}>
                {conditions.outdoor.productivity}%
              </div>
              <div className="text-sm text-gray-600">Productivity Index</div>
            </div>
          </div>

          {conditions.outdoor.recommendations.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Outdoor Recommendations:</h5>
              <ul className="space-y-1">
                {conditions.outdoor.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimalConditionsCard;