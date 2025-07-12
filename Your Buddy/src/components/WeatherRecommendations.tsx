import React from 'react';
import { WeatherRecommendation } from '../types/weather';
import { 
  Users, 
  Car, 
  Coffee, 
  Umbrella, 
  Shirt,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface WeatherRecommendationsProps {
  recommendations: WeatherRecommendation[];
}

const WeatherRecommendations: React.FC<WeatherRecommendationsProps> = ({ recommendations }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users size={20} />;
      case 'car':
        return <Car size={20} />;
      case 'coffee':
        return <Coffee size={20} />;
      case 'umbrella':
        return <Umbrella size={20} />;
      case 'shirt':
      case 'jacket':
        return <Shirt size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'medium':
        return <Info size={16} className="text-yellow-500" />;
      case 'low':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Info size={16} className="text-gray-500" />;
    }
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Your Buddy's Recommendations</h3>
      
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className={`flex items-start space-x-3 p-4 rounded-xl border ${getPriorityColor(recommendation.priority)}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(recommendation.icon)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold">{recommendation.title}</h4>
                {getPriorityIcon(recommendation.priority)}
              </div>
              <p className="text-sm opacity-90">{recommendation.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherRecommendations;