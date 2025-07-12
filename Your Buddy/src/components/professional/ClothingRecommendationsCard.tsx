import React, { useState } from 'react';
import { ClothingRecommendation } from '../../types/professional';
import { Shirt, Briefcase, HardHat, Plane } from 'lucide-react';

interface ClothingRecommendationsCardProps {
  recommendations: ClothingRecommendation[];
}

const ClothingRecommendationsCard: React.FC<ClothingRecommendationsCardProps> = ({ recommendations }) => {
  const [activeCategory, setActiveCategory] = useState<ClothingRecommendation['category']>('formal');

  const getCategoryIcon = (category: ClothingRecommendation['category']) => {
    switch (category) {
      case 'formal': return <Briefcase size={20} />;
      case 'business-casual': return <Shirt size={20} />;
      case 'outdoor-work': return <HardHat size={20} />;
      case 'travel': return <Plane size={20} />;
    }
  };

  const getCategoryLabel = (category: ClothingRecommendation['category']) => {
    switch (category) {
      case 'formal': return 'Formal/Business';
      case 'business-casual': return 'Business Casual';
      case 'outdoor-work': return 'Outdoor Work';
      case 'travel': return 'Travel';
    }
  };

  const activeRecommendation = recommendations.find(r => r.category === activeCategory) || recommendations[0];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Shirt className="text-indigo-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Clothing Recommendations</h3>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {recommendations.map((rec) => (
          <button
            key={rec.category}
            onClick={() => setActiveCategory(rec.category)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors duration-200 ${
              activeCategory === rec.category
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {getCategoryIcon(rec.category)}
            <span className="text-sm font-medium">{getCategoryLabel(rec.category)}</span>
          </button>
        ))}
      </div>

      {activeRecommendation && (
        <div className="space-y-4">
          {activeRecommendation.items.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Clothing Items:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeRecommendation.items.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeRecommendation.accessories.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Accessories:</h4>
              <div className="flex flex-wrap gap-2">
                {activeRecommendation.accessories.map((accessory, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {accessory}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeRecommendation.footwear.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Footwear:</h4>
              <div className="flex flex-wrap gap-2">
                {activeRecommendation.footwear.map((shoe, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {shoe}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeRecommendation.notes.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Special Notes:</h4>
              <ul className="space-y-1">
                {activeRecommendation.notes.map((note, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="text-indigo-500 mt-1">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClothingRecommendationsCard;