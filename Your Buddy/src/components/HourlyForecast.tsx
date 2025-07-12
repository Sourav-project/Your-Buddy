import React from 'react';
import { HourlyForecast as HourlyForecastType } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  hourlyData: HourlyForecastType[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Hourly Forecast</h3>
      
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {hourlyData.map((hour, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <p className="text-sm font-medium text-gray-600 mb-2">{hour.time}</p>
            <WeatherIcon condition={hour.condition} size={32} className="mb-2" />
            <p className="text-lg font-bold text-gray-800 mb-1">{hour.temperature}°</p>
            <p className="text-xs text-gray-500">{hour.condition}</p>
            {hour.precipitation > 0 && (
              <p className="text-xs text-blue-500 mt-1">{hour.precipitation}%</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;