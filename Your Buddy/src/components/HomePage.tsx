import React, { useState } from 'react';
import { Search, MapPin, Heart, TrendingUp, Users, Clock, Sparkles, Zap, Shield, Navigation } from 'lucide-react';
import Footer from './Footer';

interface HomePageProps {
  onLocationSearch: (location: string) => void;
  isSearching: boolean;
  onLocationAccess?: () => void;
  isGettingLocation?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onLocationSearch, isSearching, onLocationAccess, isGettingLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onLocationSearch(searchQuery.trim());
    }
  };

  const popularLocations = [
    'Mumbai, Maharashtra',
    'Delhi, India',
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu',
    'Hyderabad, Telangana',
    'Pune, Maharashtra',
    'Kolkata, West Bengal'
  ];

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: 'Smart Forecasting',
      description: 'Get accurate weather predictions with hourly and 5-day forecasts',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Professional Insights',
      description: 'Tailored recommendations for meetings, commutes, and business activities',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: 'Time Management',
      description: 'Plan your day better with weather-aware scheduling suggestions',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Rain Effect */}
      <div className="rain-container rain-medium">
        {/* Rain drops */}
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="rain-drop"></div>
        ))}
        {/* Puddle effects */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={`puddle-${i}`} className="rain-puddle"></div>
        ))}
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 opacity-90 animate-pulse"></div>
        
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 glass-morphism"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="header-particle"></div>
          <div className="header-particle"></div>
          <div className="header-particle"></div>
          <div className="header-particle"></div>
          <div className="header-particle"></div>
          <div className="header-particle"></div>
        </div>
        
        {/* Shimmer overlay */}
        <div className="absolute inset-0 header-shimmer"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-20 relative z-10">
            <div className="group cursor-pointer">
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse opacity-75"></div>
                  <Heart size={40} className="relative text-white fill-white animate-heartbeat drop-shadow-lg" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce">
                    <div className="w-full h-full bg-white rounded-full animate-ping opacity-60"></div>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-1 tracking-wide drop-shadow-lg">
                    <span className="bg-gradient-to-r from-yellow-200 via-white to-blue-200 bg-clip-text text-transparent animate-gradient-text">
                      Your Buddy
                    </span>
                  </h1>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent flex-1"></div>
                    <p className="text-white/90 text-sm font-medium tracking-wider px-3">
                      Your Professional Weather Companion
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent flex-1"></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              {/* Animated underline */}
              <div className="mt-2 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="animate-float mb-6">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Weather Intelligence for
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Professionals
              </span>
            </h2>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Get personalized weather insights, smart recommendations, and professional-grade forecasts 
            to optimize your business day and personal schedule.
          </p>

          {/* Enhanced Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative rotating-gradient-glow rounded-2xl p-1">
              <div className="relative bg-white rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center space-x-2">
                  <MapPin className="h-6 w-6 text-gray-400 pointer-events-none" />
                  <button
                    type="button"
                    onClick={onLocationAccess}
                    disabled={isGettingLocation || isSearching}
                    className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed -ml-3"
                    title="Use my current location"
                  >
                    <MapPin 
                      size={20} 
                      className={`${isGettingLocation ? 'animate-pulse text-blue-700' : 'text-blue-600'}`} 
                    />
                  </button>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter city name or location (e.g., Mumbai, Delhi, Bangalore)"
                  className="w-full pl-16 pr-32 py-4 text-lg border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-lg"
                  disabled={isSearching}
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute inset-y-0 right-0 px-6 py-2 m-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 hover-glow"
                >
                  <Search className={`h-5 w-5 ${isSearching ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline font-medium">
                    {isSearching ? 'Searching...' : 'Get Weather'}
                  </span>
                </button>
              </div>
            </div>
          </form>

          {/* Popular Locations */}
          <div className="mb-12">
            <p className="text-sm text-gray-600 mb-4 flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Popular locations:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => onLocationSearch(location)}
                  disabled={isSearching}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full border border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300 text-sm disabled:opacity-50 hover-glow transform hover:scale-105"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center card-hover border border-white/20 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 weather-icon-glow">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Benefits Section */}
        <div className="rotating-gradient-glow rounded-3xl p-1 mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  Why Choose 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Your Buddy?</span>
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Zap className="w-6 h-6 text-blue-600" />,
                      title: 'Real-time Updates',
                      description: 'Get the most current weather data from reliable sources',
                      color: 'blue'
                    },
                    {
                      icon: <Sparkles className="w-6 h-6 text-green-600" />,
                      title: 'Smart Recommendations',
                      description: 'AI-powered suggestions for your daily activities and attire',
                      color: 'green'
                    },
                    {
                      icon: <Shield className="w-6 h-6 text-purple-600" />,
                      title: 'Professional Focus',
                      description: 'Designed specifically for business professionals and office workers',
                      color: 'purple'
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className={`p-3 bg-gradient-to-br from-${benefit.color}-50 to-${benefit.color}-100 rounded-xl group-hover:shadow-lg transition-shadow duration-300`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden animate-pulse-glow">
                  {/* Animated shimmer overlay */}
                  <div className="absolute inset-0 shimmer"></div>
                  
                  <div className="text-center relative z-10">
                    <div className="animate-float">
                      <Heart size={64} className="mx-auto mb-6 fill-white" />
                    </div>
                    <h4 className="text-3xl font-bold mb-4">Your Weather Companion</h4>
                    <p className="text-blue-100 mb-8 leading-relaxed">
                      More than just weather data - we're your intelligent assistant for weather-informed decision making.
                    </p>
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div className="group">
                        <div className="text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300">24/7</div>
                        <div className="text-sm text-blue-100">Always Available</div>
                      </div>
                      <div className="group">
                        <div className="text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300">Global</div>
                        <div className="text-sm text-blue-100">Worldwide Coverage</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;