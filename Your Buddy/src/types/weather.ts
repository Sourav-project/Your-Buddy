export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    visibility: number;
    uvIndex: number;
    feelsLike: number;
    icon: string;
  };
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
  icon: string;
}

export interface DailyForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  description: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface WeatherRecommendation {
  type: 'meeting' | 'commute' | 'lunch' | 'outdoor' | 'attire';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}