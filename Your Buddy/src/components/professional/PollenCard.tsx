import React from 'react';
import { PollenData } from '../../types/professional';
import { Flower, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface PollenCardProps {
  pollen: PollenData;
}

const PollenCard: React.FC<PollenCardProps> = ({ pollen }) => {
  const getPollenColor = (level: number) => {
    if (level <= 2) return 'text-green-600 bg-green-50';
    if (level <= 5) return 'text-yellow-600 bg-yellow-50';
    if (level <= 8) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getCategoryColor = (category: PollenData['category']) => {
    switch (category) {
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      case 'moderate': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'very-high': return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const getCategoryIcon = (category: PollenData['category']) => {
    switch (category) {
      case 'low':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'moderate':
        return <AlertCircle size={20} className="text-yellow-600" />;
      case 'high':
      case 'very-high':
        return <AlertTriangle size={20} className="text-red-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Flower className="text-pink-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Pollen Forecast</h3>
      </div>

      <div className={`p-4 rounded-xl border ${getCategoryColor(pollen.category)} mb-4`}>
        <div className="flex items-center space-x-3 mb-2">
          {getCategoryIcon(pollen.category)}
          <span className="font-semibold capitalize">{pollen.category.replace('-', ' ')} Levels</span>
        </div>
        <div className="text-2xl font-bold mb-1">{pollen.overall}/10</div>
        <div className="text-sm opacity-90">Overall Pollen Index</div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className={`p-3 rounded-lg ${getPollenColor(pollen.tree)}`}>
          <div className="text-xs font-medium mb-1">Tree</div>
          <div className="font-bold">{pollen.tree}/10</div>
        </div>
        <div className={`p-3 rounded-lg ${getPollenColor(pollen.grass)}`}>
          <div className="text-xs font-medium mb-1">Grass</div>
          <div className="font-bold">{pollen.grass}/10</div>
        </div>
        <div className={`p-3 rounded-lg ${getPollenColor(pollen.weed)}`}>
          <div className="text-xs font-medium mb-1">Weed</div>
          <div className="font-bold">{pollen.weed}/10</div>
        </div>
      </div>

      {pollen.recommendations.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Allergy Recommendations:</h4>
          <ul className="space-y-1">
            {pollen.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="text-pink-500 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PollenCard;