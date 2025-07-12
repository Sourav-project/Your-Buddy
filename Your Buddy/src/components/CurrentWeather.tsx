import React from 'react';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sun
} from 'lucide-react';

interface CurrentWeatherProps {
  weatherData: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  const { location, current } = weatherData;

  return (
    <div className="rotating-gradient-glow rounded-3xl p-1 mb-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-8 right-12 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {location}
            </h2>
            <p className="text-gray-600 mt-1">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="animate-float">
            <WeatherIcon condition={current.condition} size={64} animated={true} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {current.temperature}°C
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-700">{current.condition}</p>
                <p className="text-sm text-gray-600">{current.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover-glow">
              <Thermometer size={20} className="text-blue-600" />
              <span className="text-sm text-gray-700">Feels like <span className="font-semibold">{current.feelsLike}°C</span></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 card-hover border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <Droplets size={20} className="text-blue-600" />
                <span className="text-sm text-gray-600 font-medium">Humidity</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">{current.humidity}%</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 card-hover border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <Wind size={20} className="text-gray-600" />
                <span className="text-sm text-gray-600 font-medium">Wind</span>
              </div>
              <p className="text-2xl font-bold text-gray-700">{current.windSpeed} km/h</p>
              <p className="text-xs text-gray-500 mt-1">{current.windDirection}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 card-hover border border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                <Gauge size={20} className="text-purple-600" />
                <span className="text-sm text-gray-600 font-medium">Pressure</span>
              </div>
              <p className="text-2xl font-bold text-purple-700">{current.pressure} hPa</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 card-hover border border-orange-200">
              <div className="flex items-center space-x-3 mb-3">
                <Sun size={20} className="text-orange-600" />
                <span className="text-sm text-gray-600 font-medium">UV Index</span>
              </div>
              <p className="text-2xl font-bold text-orange-700">{current.uvIndex}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;