import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Wind,
  Eye,
  Thermometer
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: number;
  className?: string;
  animated?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 24, className = '', animated = true }) => {
  const getIcon = () => {
    const baseClasses = animated ? 'transition-all duration-300 hover:scale-110' : '';
    
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return (
          <div className={`relative ${baseClasses}`}>
            <Sun 
              size={size} 
              className={`text-yellow-500 ${animated ? 'animate-pulse' : ''} ${className}`} 
            />
            {animated && (
              <div className="absolute inset-0 animate-ping">
                <Sun size={size} className="text-yellow-300 opacity-30" />
              </div>
            )}
          </div>
        );
      case 'partly-cloudy':
      case 'partly cloudy':
        return (
          <div className={`relative ${baseClasses}`}>
            <Cloud 
              size={size} 
              className={`text-gray-500 ${animated ? 'animate-bounce' : ''} ${className}`} 
            />
            {animated && (
              <Sun 
                size={size * 0.6} 
                className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" 
              />
            )}
          </div>
        );
      case 'cloudy':
      case 'overcast':
        return (
          <div className={`relative ${baseClasses}`}>
            <Cloud 
              size={size} 
              className={`text-gray-600 ${animated ? 'animate-pulse' : ''} ${className}`} 
            />
            {animated && (
              <Cloud 
                size={size * 0.7} 
                className="absolute -top-1 -left-1 text-gray-400 opacity-50 animate-pulse" 
                style={{ animationDelay: '0.5s' }}
              />
            )}
          </div>
        );
      case 'rain':
      case 'light rain':
      case 'rainy':
        return (
          <div className={`relative ${baseClasses}`}>
            <CloudRain 
              size={size} 
              className={`text-blue-500 ${animated ? 'animate-bounce' : ''} ${className}`} 
            />
            {animated && (
              <>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-2 bg-blue-400 animate-pulse opacity-70"></div>
                </div>
                <div className="absolute top-full left-1/3 transform -translate-x-1/2">
                  <div className="w-0.5 h-1.5 bg-blue-300 animate-pulse opacity-50" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <div className="absolute top-full left-2/3 transform -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-blue-200 animate-pulse opacity-40" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </>
            )}
          </div>
        );
      case 'snow':
      case 'snowy':
        return (
          <div className={`relative ${baseClasses}`}>
            <CloudSnow 
              size={size} 
              className={`text-blue-300 ${animated ? 'animate-pulse' : ''} ${className}`} 
            />
            {animated && (
              <>
                <div className="absolute top-full left-1/4 w-1 h-1 bg-white rounded-full animate-bounce opacity-80"></div>
                <div className="absolute top-full left-1/2 w-1 h-1 bg-white rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute top-full left-3/4 w-1 h-1 bg-white rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.4s' }}></div>
              </>
            )}
          </div>
        );
      case 'thunderstorm':
        return (
          <div className={`relative ${baseClasses}`}>
            <CloudLightning 
              size={size} 
              className={`text-purple-500 ${animated ? 'animate-pulse' : ''} ${className}`} 
            />
            {animated && (
              <div className="absolute inset-0 animate-ping opacity-30">
                <CloudLightning size={size} className="text-yellow-300" />
              </div>
            )}
          </div>
        );
      case 'windy':
        return (
          <div className={`relative ${baseClasses}`}>
            <Wind 
              size={size} 
              className={`text-gray-500 ${animated ? 'animate-pulse' : ''} ${className}`} 
            />
            {animated && (
              <>
                <div className="absolute -right-2 top-1/4 w-3 h-0.5 bg-gray-300 animate-pulse opacity-60"></div>
                <div className="absolute -right-3 top-1/2 w-4 h-0.5 bg-gray-200 animate-pulse opacity-40" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute -right-2 top-3/4 w-2 h-0.5 bg-gray-400 animate-pulse opacity-50" style={{ animationDelay: '0.6s' }}></div>
              </>
            )}
          </div>
        );
      default:
        return (
          <div className={baseClasses}>
            <Sun size={size} className={`text-yellow-500 ${className}`} />
          </div>
        );
    }
  };

  return <div className="inline-flex items-center justify-center">{getIcon()}</div>;
};

export default WeatherIcon;