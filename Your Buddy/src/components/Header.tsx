import React from 'react';
import { Heart, MapPin, RefreshCw, Home, Sparkles } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  onBackToHome?: () => void;
  isLoading: boolean;
  currentLocation?: string;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, onBackToHome, isLoading, currentLocation }) => {
  return (
    <header className="glass-morphism shadow-lg border-b border-white/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-0 left-1/4 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="rotating-gradient-glow rounded-2xl p-2">
              <div className="flex items-center space-x-3 bg-white rounded-xl p-2">
                <div className="relative">
                  <Heart size={28} className="text-blue-600 fill-blue-600 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Your Buddy
                  </h1>
                  <p className="text-xs text-gray-600">Weather Companion</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentLocation && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <MapPin size={16} className="text-blue-500" />
                <span className="hidden sm:inline font-medium">{currentLocation}</span>
                <Sparkles size={12} className="text-yellow-500 animate-pulse" />
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover-glow transform hover:scale-105"
                >
                  <Home size={16} />
                  <span className="hidden sm:inline font-medium">Home</span>
                </button>
              )}
              
              <button
                onClick={onRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-glow transform hover:scale-105"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline font-medium">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;