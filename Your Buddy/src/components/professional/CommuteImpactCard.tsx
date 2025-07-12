import React from 'react';
import { CommuteImpact } from '../../types/professional';
import { Car, Clock, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface CommuteImpactCardProps {
  commuteImpact: CommuteImpact;
}

const CommuteImpactCard: React.FC<CommuteImpactCardProps> = ({ commuteImpact }) => {
  const getSeverityColor = (severity: CommuteImpact['severity']) => {
    switch (severity) {
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      case 'moderate': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'severe': return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const getSeverityIcon = (severity: CommuteImpact['severity']) => {
    switch (severity) {
      case 'low': return <CheckCircle size={20} className="text-green-600" />;
      case 'moderate': return <AlertCircle size={20} className="text-yellow-600" />;
      case 'high': return <AlertTriangle size={20} className="text-orange-600" />;
      case 'severe': return <AlertTriangle size={20} className="text-red-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Car className="text-blue-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Commute Impact</h3>
      </div>

      <div className={`p-4 rounded-xl border ${getSeverityColor(commuteImpact.severity)} mb-4`}>
        <div className="flex items-center space-x-3 mb-2">
          {getSeverityIcon(commuteImpact.severity)}
          <span className="font-semibold capitalize">{commuteImpact.severity} Impact</span>
        </div>
        <p className="text-sm opacity-90 mb-3">{commuteImpact.description}</p>
        
        {commuteImpact.delayMinutes > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            <Clock size={16} />
            <span className="text-sm font-medium">Expected delay: {commuteImpact.delayMinutes} minutes</span>
          </div>
        )}
      </div>

      {commuteImpact.recommendations.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Recommendations:</h4>
          <ul className="space-y-1">
            {commuteImpact.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {commuteImpact.affectedRoutes.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Affected Routes:</h4>
          <div className="flex flex-wrap gap-2">
            {commuteImpact.affectedRoutes.map((route, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {route}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommuteImpactCard;