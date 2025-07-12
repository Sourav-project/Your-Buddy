import React, { useState, useEffect } from 'react';
import { WeatherData } from './types/weather';
import { BusinessLocation, CustomAlert, ProfessionalWeatherData } from './types/professional';
import { getWeatherData, getWeatherRecommendations } from './services/weatherService';
import { getProfessionalWeatherData } from './services/professionalWeatherService';
import HomePage from './components/HomePage';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherRecommendations from './components/WeatherRecommendations';
import LoadingSpinner from './components/LoadingSpinner';
import ProfessionalDashboard from './components/professional/ProfessionalDashboard';
import BusinessLocationsManager from './components/professional/BusinessLocationsManager';
import CustomAlertsManager from './components/professional/CustomAlertsManager';
import AIAssistant from './components/ai-assistant/AIAssistant';
import Footer from './components/Footer';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [professionalData, setProfessionalData] = useState<ProfessionalWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [showHomePage, setShowHomePage] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'professional' | 'locations' | 'alerts'>('overview');
  
  // Professional features state
  const [businessLocations, setBusinessLocations] = useState<BusinessLocation[]>([]);
  const [customAlerts, setCustomAlerts] = useState<CustomAlert[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>();

  const fetchWeatherData = async (location?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(location);
      setWeatherData(data);
      
      // Generate professional weather data
      const profData = getProfessionalWeatherData(data);
      setProfessionalData(profData);
      
      setCurrentLocation(location || null);
      setShowHomePage(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationAccess = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setGettingLocation(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding to get location name
          const locationName = await reverseGeocode(latitude, longitude);
          
          // Fetch weather data using coordinates
          const data = await getWeatherDataByCoords(latitude, longitude, locationName);
          setWeatherData(data);
          
          // Generate professional weather data
          const profData = getProfessionalWeatherData(data);
          setProfessionalData(profData);
          
          setCurrentLocation(locationName);
          setShowHomePage(false);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather data for your location.');
          console.error('Error fetching location weather:', err);
        } finally {
          setGettingLocation(false);
        }
      },
      (error) => {
        setGettingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. Please enable location permissions and try again.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable. Please try searching for your city manually.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out. Please try again or search manually.');
            break;
          default:
            setError('An unknown error occurred while getting your location.');
            break;
        }
      },
      options
    );
  };

  const handleLocationSearch = async (location: string) => {
    try {
      setSearching(true);
      setError(null);
      const data = await getWeatherData(location);
      setWeatherData(data);
      
      // Generate professional weather data
      const profData = getProfessionalWeatherData(data);
      setProfessionalData(profData);
      
      setCurrentLocation(location);
      setShowHomePage(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.');
      console.error('Error searching location:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleBackToHome = () => {
    setShowHomePage(true);
    setWeatherData(null);
    setProfessionalData(null);
    setCurrentLocation(null);
    setError(null);
    setActiveTab('overview');
  };

  // Business locations management
  const handleAddLocation = (location: Omit<BusinessLocation, 'id'>) => {
    const newLocation: BusinessLocation = {
      ...location,
      id: Date.now().toString()
    };
    setBusinessLocations(prev => [...prev, newLocation]);
  };

  const handleEditLocation = (id: string, updates: Partial<BusinessLocation>) => {
    setBusinessLocations(prev => 
      prev.map(loc => loc.id === id ? { ...loc, ...updates } : loc)
    );
  };

  const handleDeleteLocation = (id: string) => {
    setBusinessLocations(prev => prev.filter(loc => loc.id !== id));
    if (selectedLocationId === id) {
      setSelectedLocationId(undefined);
    }
  };

  const handleSelectLocation = (location: BusinessLocation) => {
    setSelectedLocationId(location.id);
    // In a real app, fetch weather for this specific location
    handleLocationSearch(location.address);
  };

  // Custom alerts management
  const handleAddAlert = (alert: Omit<CustomAlert, 'id'>) => {
    const newAlert: CustomAlert = {
      ...alert,
      id: Date.now().toString()
    };
    setCustomAlerts(prev => [...prev, newAlert]);
  };

  const handleEditAlert = (id: string, updates: Partial<CustomAlert>) => {
    setCustomAlerts(prev => 
      prev.map(alert => alert.id === id ? { ...alert, ...updates } : alert)
    );
  };

  const handleDeleteAlert = (id: string) => {
    setCustomAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleToggleAlert = (id: string) => {
    setCustomAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  // Show home page initially
  if (showHomePage) {
    return (
      <>
        <HomePage 
          onLocationSearch={handleLocationSearch} 
          isSearching={searching}
          onLocationAccess={handleLocationAccess}
          isGettingLocation={gettingLocation}
        />
        <AIAssistant weatherData={weatherData} professionalData={professionalData} />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <LoadingSpinner />
        <AIAssistant weatherData={weatherData} professionalData={professionalData} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Weather</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-y-2">
              <button
                onClick={() => fetchWeatherData(currentLocation || undefined)}
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Try Again
              </button>
              <button
                onClick={handleBackToHome}
                className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <AIAssistant weatherData={weatherData} professionalData={professionalData} />
      </>
    );
  }

  if (!weatherData || !professionalData) {
    return (
      <>
        <div>Loading...</div>
        <AIAssistant weatherData={weatherData} professionalData={professionalData} />
      </>
    );
  }

  const recommendations = getWeatherRecommendations(weatherData);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header 
          onRefresh={() => fetchWeatherData(currentLocation || undefined)} 
          onBackToHome={handleBackToHome}
          isLoading={loading} 
          currentLocation={weatherData.location}
        />
        
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
            <div className="flex space-x-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Weather Overview', icon: '🌤️' },
                { id: 'professional', label: 'Professional Insights', icon: '💼' },
                { id: 'locations', label: 'Business Locations', icon: '📍' },
                { id: 'alerts', label: 'Custom Alerts', icon: '🔔' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <CurrentWeather weatherData={weatherData} />
                <HourlyForecast hourlyData={weatherData.hourly} />
                <DailyForecast dailyData={weatherData.daily} />
              </div>
              
              <div className="lg:col-span-1">
                <WeatherRecommendations recommendations={recommendations} />
                
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Today's High</span>
                      <span className="font-semibold text-gray-800">{weatherData.daily[0].high}°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Today's Low</span>
                      <span className="font-semibold text-gray-800">{weatherData.daily[0].low}°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rain Chance</span>
                      <span className="font-semibold text-gray-800">{weatherData.daily[0].precipitation}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Visibility</span>
                      <span className="font-semibold text-gray-800">{weatherData.current.visibility} km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'professional' && (
            <ProfessionalDashboard professionalData={professionalData} />
          )}

          {activeTab === 'locations' && (
            <BusinessLocationsManager
              locations={businessLocations}
              onAddLocation={handleAddLocation}
              onEditLocation={handleEditLocation}
              onDeleteLocation={handleDeleteLocation}
              onSelectLocation={handleSelectLocation}
              selectedLocationId={selectedLocationId}
            />
          )}

          {activeTab === 'alerts' && (
            <CustomAlertsManager
              alerts={customAlerts}
              onAddAlert={handleAddAlert}
              onEditAlert={handleEditAlert}
              onDeleteAlert={handleDeleteAlert}
              onToggleAlert={handleToggleAlert}
            />
          )}
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* AI Assistant - Always Available */}
      <AIAssistant weatherData={weatherData} professionalData={professionalData} />
    </>
  );
}

export default App;