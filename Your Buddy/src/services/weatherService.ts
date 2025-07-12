import axios from 'axios';
import { WeatherData, WeatherRecommendation } from '../types/weather';

// OpenWeatherMap API configuration
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Check if API key is available and valid
const isApiKeyValid = API_KEY && API_KEY !== 'your_api_key_here' && API_KEY.length > 10;

// Reverse geocoding function
export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  if (!isApiKeyValid) {
    return `Location (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
  }

  try {
    const response = await axios.get(`${GEO_URL}/reverse`, {
      params: {
        lat,
        lon,
        limit: 1,
        appid: API_KEY
      }
    });

    if (response.data.length > 0) {
      const data = response.data[0];
      return `${data.name}${data.state ? `, ${data.state}` : ''}${data.country ? `, ${data.country}` : ''}`;
    }
    
    return `Location (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return `Location (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
  }
};

// Fetch weather data using coordinates
export const getWeatherDataByCoords = async (lat: number, lon: number, locationName?: string): Promise<WeatherData> => {
  // If no valid API key, return mock data immediately
  if (!isApiKeyValid) {
    console.warn('OpenWeatherMap API key not configured. Using demo data. Get your free API key at: https://openweathermap.org/api');
    const fallbackData = { ...mockWeatherData };
    if (locationName) {
      fallbackData.location = locationName;
    }
    return fallbackData;
  }

  try {
    // Fetch current weather and forecast using coordinates
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      })
    ]);

    const current = currentResponse.data;
    const forecast = forecastResponse.data;

    // Use provided location name or get from API response
    const finalLocationName = locationName || 
      `${current.name}${current.sys.state ? `, ${current.sys.state}` : ''}${current.sys.country ? `, ${current.sys.country}` : ''}`;

    // Process current weather
    const currentWeather = {
      temperature: Math.round(current.main.temp),
      condition: mapWeatherCondition(current.weather[0].main, current.weather[0].description),
      description: current.weather[0].description.charAt(0).toUpperCase() + current.weather[0].description.slice(1),
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: getWindDirection(current.wind.deg || 0),
      pressure: current.main.pressure,
      visibility: Math.round((current.visibility || 10000) / 1000), // Convert m to km
      uvIndex: 0, // UV index not available in free tier
      feelsLike: Math.round(current.main.feels_like),
      icon: mapWeatherCondition(current.weather[0].main, current.weather[0].description).toLowerCase().replace(' ', '-')
    };

    // Process hourly forecast (next 10 hours)
    const hourlyData = forecast.list.slice(0, 10).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      temperature: Math.round(item.main.temp),
      condition: mapWeatherCondition(item.weather[0].main, item.weather[0].description),
      precipitation: Math.round((item.pop || 0) * 100),
      windSpeed: Math.round(item.wind.speed * 3.6),
      icon: mapWeatherCondition(item.weather[0].main, item.weather[0].description).toLowerCase().replace(' ', '-')
    }));

    // Process daily forecast (next 5 days)
    const dailyData = [];
    const processedDates = new Set();
    
    for (const item of forecast.list) {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      if (!processedDates.has(dateStr) && dailyData.length < 5) {
        processedDates.add(dateStr);
        
        // Get all forecasts for this date to calculate high/low
        const dayForecasts = forecast.list.filter((f: any) => {
          const fDate = new Date(f.dt * 1000).toISOString().split('T')[0];
          return fDate === dateStr;
        });
        
        const temps = dayForecasts.map((f: any) => f.main.temp);
        const high = Math.round(Math.max(...temps));
        const low = Math.round(Math.min(...temps));
        
        const dayName = dailyData.length === 0 ? 'Today' : 
                       dailyData.length === 1 ? 'Tomorrow' : 
                       date.toLocaleDateString('en-US', { weekday: 'long' });

        dailyData.push({
          date: dateStr,
          day: dayName,
          high,
          low,
          condition: mapWeatherCondition(item.weather[0].main, item.weather[0].description),
          description: item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1),
          precipitation: Math.round((item.pop || 0) * 100),
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6),
          icon: mapWeatherCondition(item.weather[0].main, item.weather[0].description).toLowerCase().replace(' ', '-')
        });
      }
    }

    return {
      location: finalLocationName,
      current: currentWeather,
      hourly: hourlyData,
      daily: dailyData
    };

  } catch (error) {
    console.error('Error fetching weather data by coordinates:', error);
    
    // Handle specific API errors
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.warn('Invalid API key. Using demo data. Get your free API key at: https://openweathermap.org/api');
      } else {
        console.warn('API request failed. Using demo data.');
      }
    }
    
    // Return mock data with the location name if API fails
    const fallbackData = { ...mockWeatherData };
    if (locationName) {
      fallbackData.location = locationName;
    }
    return fallbackData;
  }
};

// Mock weather data fallback
export const mockWeatherData: WeatherData = {
  location: 'New York, NY',
  current: {
    temperature: 22,
    condition: 'Partly Cloudy',
    description: 'Pleasant with some clouds',
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NW',
    pressure: 1013,
    visibility: 16,
    uvIndex: 4,
    feelsLike: 24,
    icon: 'partly-cloudy'
  },
  hourly: [
    { time: '09:00', temperature: 20, condition: 'Cloudy', precipitation: 0, windSpeed: 10, icon: 'cloudy' },
    { time: '10:00', temperature: 21, condition: 'Partly Cloudy', precipitation: 0, windSpeed: 12, icon: 'partly-cloudy' },
    { time: '11:00', temperature: 23, condition: 'Sunny', precipitation: 0, windSpeed: 15, icon: 'sunny' },
    { time: '12:00', temperature: 25, condition: 'Sunny', precipitation: 0, windSpeed: 18, icon: 'sunny' },
    { time: '13:00', temperature: 26, condition: 'Sunny', precipitation: 0, windSpeed: 20, icon: 'sunny' },
    { time: '14:00', temperature: 27, condition: 'Partly Cloudy', precipitation: 5, windSpeed: 22, icon: 'partly-cloudy' },
    { time: '15:00', temperature: 26, condition: 'Cloudy', precipitation: 10, windSpeed: 20, icon: 'cloudy' },
    { time: '16:00', temperature: 24, condition: 'Light Rain', precipitation: 15, windSpeed: 18, icon: 'rain' },
    { time: '17:00', temperature: 22, condition: 'Light Rain', precipitation: 20, windSpeed: 16, icon: 'rain' },
    { time: '18:00', temperature: 20, condition: 'Cloudy', precipitation: 5, windSpeed: 14, icon: 'cloudy' }
  ],
  daily: [
    { date: '2025-01-27', day: 'Today', high: 27, low: 18, condition: 'Partly Cloudy', description: 'Pleasant with afternoon showers', precipitation: 20, humidity: 65, windSpeed: 18, icon: 'partly-cloudy' },
    { date: '2025-01-28', day: 'Tomorrow', high: 24, low: 16, condition: 'Rainy', description: 'Steady rain throughout the day', precipitation: 80, humidity: 85, windSpeed: 25, icon: 'rain' },
    { date: '2025-01-29', day: 'Wednesday', high: 19, low: 12, condition: 'Cloudy', description: 'Overcast with cool temperatures', precipitation: 10, humidity: 70, windSpeed: 15, icon: 'cloudy' },
    { date: '2025-01-30', day: 'Thursday', high: 23, low: 14, condition: 'Sunny', description: 'Clear skies and pleasant weather', precipitation: 0, humidity: 45, windSpeed: 12, icon: 'sunny' },
    { date: '2025-01-31', day: 'Friday', high: 26, low: 17, condition: 'Partly Cloudy', description: 'Mix of sun and clouds', precipitation: 5, humidity: 55, windSpeed: 14, icon: 'partly-cloudy' }
  ]
};

// Convert OpenWeatherMap weather codes to our condition names
const mapWeatherCondition = (weatherCode: string, description: string): string => {
  const code = weatherCode.toLowerCase();
  if (code.includes('clear')) return 'Sunny';
  if (code.includes('cloud')) {
    if (description.includes('few') || description.includes('scattered')) return 'Partly Cloudy';
    return 'Cloudy';
  }
  if (code.includes('rain')) {
    if (description.includes('light')) return 'Light Rain';
    return 'Rain';
  }
  if (code.includes('snow')) return 'Snow';
  if (code.includes('thunder')) return 'Thunderstorm';
  if (code.includes('mist') || code.includes('fog')) return 'Cloudy';
  return 'Partly Cloudy';
};

// Convert wind direction from degrees to cardinal direction
const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Get coordinates for a location
export const getLocationCoordinates = async (location: string): Promise<{ lat: number; lon: number; name: string }> => {
  if (!isApiKeyValid) {
    throw new Error('API key not configured. Using demo data.');
  }

  try {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: location,
        limit: 1,
        appid: API_KEY
      }
    });

    if (response.data.length === 0) {
      throw new Error('Location not found');
    }

    const data = response.data[0];
    return {
      lat: data.lat,
      lon: data.lon,
      name: `${data.name}${data.state ? `, ${data.state}` : ''}${data.country ? `, ${data.country}` : ''}`
    };
  } catch (error) {
    console.error('Error getting location coordinates:', error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('API key not configured. Using demo data.');
    }
    throw new Error('Unable to find location. Please check the spelling and try again.');
  }
};

// Fetch weather data from OpenWeatherMap API
export const getWeatherData = async (location?: string): Promise<WeatherData> => {
  // If no valid API key, return mock data immediately
  if (!isApiKeyValid) {
    console.warn('OpenWeatherMap API key not configured. Using demo data. Get your free API key at: https://openweathermap.org/api');
    const fallbackData = { ...mockWeatherData };
    if (location) {
      fallbackData.location = location;
    }
    return fallbackData;
  }

  try {
    let lat: number, lon: number, locationName: string;

    if (location) {
      const coords = await getLocationCoordinates(location);
      lat = coords.lat;
      lon = coords.lon;
      locationName = coords.name;
    } else {
      // Default to New York if no location provided
      lat = 40.7128;
      lon = -74.0060;
      locationName = 'New York, NY, US';
    }

    // Fetch current weather and forecast
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      })
    ]);

    const current = currentResponse.data;
    const forecast = forecastResponse.data;

    // Process current weather
    const currentWeather = {
      temperature: Math.round(current.main.temp),
      condition: mapWeatherCondition(current.weather[0].main, current.weather[0].description),
      description: current.weather[0].description.charAt(0).toUpperCase() + current.weather[0].description.slice(1),
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: getWindDirection(current.wind.deg || 0),
      pressure: current.main.pressure,
      visibility: Math.round((current.visibility || 10000) / 1000), // Convert m to km
      uvIndex: 0, // UV index not available in free tier
      feelsLike: Math.round(current.main.feels_like),
      icon: mapWeatherCondition(current.weather[0].main, current.weather[0].description).toLowerCase().replace(' ', '-')
    };

    // Process hourly forecast (next 10 hours)
    const hourlyData = forecast.list.slice(0, 10).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      temperature: Math.round(item.main.temp),
      condition: mapWeatherCondition(item.weather[0].main, item.weather[0].description),
      precipitation: Math.round((item.pop || 0) * 100),
      windSpeed: Math.round(item.wind.speed * 3.6),
      icon: mapWeatherCondition(item.weather[0].main, item.weather[0].description).toLowerCase().replace(' ', '-')
    }));

    // Process daily forecast (next 5 days)
    const dailyData = [];
    const processedDates = new Set();
    
    for (const item of forecast.list) {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      if (!processedDates.has(dateStr) && dailyData.length < 5) {
        processedDates.add(dateStr);
        
        // Get all forecasts for this date to calculate high/low
        const dayForecasts = forecast.list.filter((f: any) => {
          const fDate = new Date(f.dt * 1000).toISOString().split('T')[0];
          return fDate === dateStr;
        });
        
        const temps = dayForecasts.map((f: any) => f.main.temp);
        const high = Math.round(Math.max(...temps));
        const low = Math.round(Math.min(...temps));
        
        const dayName = dailyData.length === 0 ? 'Today' : 
                       dailyData.length === 1 ? 'Tomorrow' : 
                       date.toLocaleDateString('en-US', { weekday: 'long' });

        dailyData.push({
          date: dateStr,
          day: dayName,
          high,
          low,
          condition: mapWeatherCondition(item.weather[0].main, item.weather[0].description),
          description: item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1),
          precipitation: Math.round((item.pop || 0) * 100),
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6),
          icon: mapWeatherCondition(item.weather[0].main, item.weather[0].description).toLowerCase().replace(' ', '-')
        });
      }
    }

    return {
      location: locationName,
      current: currentWeather,
      hourly: hourlyData,
      daily: dailyData
    };

  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Handle specific API errors
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.warn('Invalid API key. Using demo data. Get your free API key at: https://openweathermap.org/api');
      } else if (error.response?.status === 404) {
        console.warn('Location not found. Using demo data.');
      } else {
        console.warn('API request failed. Using demo data.');
      }
    }
    
    // Return mock data with the requested location name if API fails
    const fallbackData = { ...mockWeatherData };
    if (location) {
      fallbackData.location = location;
    }
    return fallbackData;
  }
};

export const getWeatherRecommendations = (weatherData: WeatherData): WeatherRecommendation[] => {
  const recommendations: WeatherRecommendation[] = [];
  const current = weatherData.current;
  const todayForecast = weatherData.daily[0];

  // Attire recommendations
  if (current.temperature < 15) {
    recommendations.push({
      type: 'attire',
      title: 'Dress Warmly',
      description: 'Consider wearing a coat or jacket. Temperature is quite cool today.',
      priority: 'medium',
      icon: 'jacket'
    });
  } else if (current.temperature > 30) {
    recommendations.push({
      type: 'attire',
      title: 'Light Clothing',
      description: 'Wear breathable fabrics. It will be quite warm today.',
      priority: 'medium',
      icon: 'shirt'
    });
  }

  // Commute recommendations
  if (todayForecast.precipitation > 50) {
    recommendations.push({
      type: 'commute',
      title: 'Plan for Rain',
      description: 'Bring an umbrella and allow extra time for commute.',
      priority: 'high',
      icon: 'umbrella'
    });
  }

  // Wind recommendations
  if (current.windSpeed > 25) {
    recommendations.push({
      type: 'commute',
      title: 'Windy Conditions',
      description: 'Strong winds expected. Secure loose items and be cautious outdoors.',
      priority: 'medium',
      icon: 'car'
    });
  }

  // Meeting recommendations
  if (current.condition.includes('Sunny') && current.temperature > 20 && current.temperature < 28) {
    recommendations.push({
      type: 'meeting',
      title: 'Consider Outdoor Meeting',
      description: 'Perfect weather for an outdoor meeting or walking discussion.',
      priority: 'low',
      icon: 'users'
    });
  }

  // Lunch recommendations
  if (current.temperature > 18 && todayForecast.precipitation < 20) {
    recommendations.push({
      type: 'lunch',
      title: 'Great for Outdoor Lunch',
      description: 'Weather is perfect for eating outside or taking a lunch walk.',
      priority: 'low',
      icon: 'coffee'
    });
  }

  // UV recommendations
  if (current.uvIndex > 6) {
    recommendations.push({
      type: 'outdoor',
      title: 'UV Protection Needed',
      description: 'High UV levels. Wear sunscreen and consider sunglasses.',
      priority: 'medium',
      icon: 'shirt'
    });
  }

  return recommendations;
};