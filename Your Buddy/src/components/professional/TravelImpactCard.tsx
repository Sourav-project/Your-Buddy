import React from 'react';
import { TravelImpact } from '../../types/professional';
import { Plane, Car, Train, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface TravelImpactCardProps {
  travelImpact: TravelImpact;
}

const TravelImpactCard: React.FC<TravelImpactCardProps> = ({ travelImpact }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': case 'minimal': case 'excellent': case 'good':
        return 'text-green-600 bg-green-50';
      case 'moderate': case 'fair':
        return 'text-yellow-600 bg-yellow-50';
      case 'high': case 'significant': case 'poor':
        return 'text-orange-600 bg-orange-50';
      case 'severe': case 'hazardous':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': case 'minimal': case 'excellent': case 'good':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'moderate': case 'fair':
        return <AlertCircle size={16} className="text-yellow-600" />;
      case 'high': case 'significant': case 'poor':
      case 'severe': case 'hazardous':
        return <AlertTriangle size={16} className="text-red-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Plane className="text-purple-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Travel Impact Assessment</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div className={`p-4 rounded-xl ${getRiskColor(travelImpact.flightDelayRisk)}`}>
          <div className="flex items-center space-x-3 mb-2">
            <Plane size={20} />
            <span className="font-semibold">Flight Delay Risk</span>
            {getRiskIcon(travelImpact.flightDelayRisk)}
          </div>
          <div className="text-sm opacity-90 capitalize">{travelImpact.flightDelayRisk} risk of delays</div>
        </div>

        <div className={`p-4 rounded-xl ${getRiskColor(travelImpact.roadConditions)}`}>
          <div className="flex items-center space-x-3 mb-2">
            <Car size={20} />
            <span className="font-semibold">Road Conditions</span>
            {getRiskIcon(travelImpact.roadConditions)}
          </div>
          <div className="text-sm opacity-90 capitalize">{travelImpact.roadConditions} driving conditions</div>
        </div>

        <div className={`p-4 rounded-xl ${getRiskColor(travelImpact.publicTransportImpact)}`}>
          <div className="flex items-center space-x-3 mb-2">
            <Train size={20} />
            <span className="font-semibold">Public Transport</span>
            {getRiskIcon(travelImpact.publicTransportImpact)}
          </div>
          <div className="text-sm opacity-90 capitalize">{travelImpact.publicTransportImpact} impact expected</div>
        </div>
      </div>

      {travelImpact.recommendations.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Travel Recommendations:</h4>
          <ul className="space-y-2">
            {travelImpact.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TravelImpactCard;