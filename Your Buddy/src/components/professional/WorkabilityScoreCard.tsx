import React from 'react';
import { WorkabilityScore } from '../../types/professional';
import { HardHat, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface WorkabilityScoreCardProps {
  workabilityScore: WorkabilityScore;
}

const WorkabilityScoreCard: React.FC<WorkabilityScoreCardProps> = ({ workabilityScore }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getCategoryColor = (category: WorkabilityScore['category']) => {
    switch (category) {
      case 'excellent': return 'bg-green-50 border-green-200 text-green-800';
      case 'good': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'fair': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'poor': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'hazardous': return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const getCategoryIcon = (category: WorkabilityScore['category']) => {
    switch (category) {
      case 'excellent':
      case 'good':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'fair':
        return <TrendingUp size={20} className="text-yellow-600" />;
      case 'poor':
      case 'hazardous':
        return <AlertTriangle size={20} className="text-red-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <HardHat className="text-orange-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Outdoor Work Conditions</h3>
      </div>

      <div className="text-center mb-6">
        <div className={`text-4xl font-bold mb-2 ${getScoreColor(workabilityScore.score)}`}>
          {workabilityScore.score}
        </div>
        <div className="text-sm text-gray-600 mb-4">Workability Score (0-100)</div>
        
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border ${getCategoryColor(workabilityScore.category)}`}>
          {getCategoryIcon(workabilityScore.category)}
          <span className="font-semibold capitalize">{workabilityScore.category}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="text-sm text-gray-600 mb-1">Temperature Impact</div>
          <div className={`font-semibold ${workabilityScore.factors.temperature < -15 ? 'text-red-600' : workabilityScore.factors.temperature < 0 ? 'text-orange-600' : 'text-green-600'}`}>
            {workabilityScore.factors.temperature >= 0 ? '+' : ''}{workabilityScore.factors.temperature}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="text-sm text-gray-600 mb-1">Wind Impact</div>
          <div className={`font-semibold ${workabilityScore.factors.wind < -20 ? 'text-red-600' : workabilityScore.factors.wind < 0 ? 'text-orange-600' : 'text-green-600'}`}>
            {workabilityScore.factors.wind >= 0 ? '+' : ''}{workabilityScore.factors.wind}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="text-sm text-gray-600 mb-1">Precipitation Impact</div>
          <div className={`font-semibold ${workabilityScore.factors.precipitation < -20 ? 'text-red-600' : workabilityScore.factors.precipitation < 0 ? 'text-orange-600' : 'text-green-600'}`}>
            {workabilityScore.factors.precipitation >= 0 ? '+' : ''}{workabilityScore.factors.precipitation}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="text-sm text-gray-600 mb-1">Visibility Impact</div>
          <div className={`font-semibold ${workabilityScore.factors.visibility < -15 ? 'text-red-600' : workabilityScore.factors.visibility < 0 ? 'text-orange-600' : 'text-green-600'}`}>
            {workabilityScore.factors.visibility >= 0 ? '+' : ''}{workabilityScore.factors.visibility}
          </div>
        </div>
      </div>

      {workabilityScore.recommendations.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Safety Recommendations:</h4>
          <ul className="space-y-2">
            {workabilityScore.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkabilityScoreCard;