import React from 'react';
import { DailyForecast as DailyForecastType } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { Droplets, Wind } from 'lucide-react';

interface DailyForecastProps {
  dailyData: DailyForecastType[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ dailyData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {dailyData.map((day, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 text-center">
                <p className="text-sm font-medium text-gray-600">{day.day}</p>
                <p className="text-xs text-gray-500">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
              <WeatherIcon condition={day.condition} size={32} />
              <div>
                <p className="text-sm font-semibold text-gray-800">{day.condition}</p>
                <p className="text-xs text-gray-600">{day.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Droplets size={14} className="text-blue-500" />
                  <span className="text-xs text-gray-600">{day.precipitation}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind size={14} className="text-gray-500" />
                  <span className="text-xs text-gray-600">{day.windSpeed} km/h</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">{day.high}°</p>
                <p className="text-sm text-gray-500">{day.low}°</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;