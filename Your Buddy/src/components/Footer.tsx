import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 opacity-90 animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
      </div>
      
      {/* Shimmer overlay */}
      <div className="absolute inset-0 footer-shimmer"></div>
      
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main footer content */}
          <div className="group cursor-pointer inline-block">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="text-yellow-300 animate-pulse" size={24} />
              <div className="text-white text-lg font-medium tracking-wide">
                Created with
                <Heart 
                  className="inline-block mx-2 text-red-400 fill-red-400 animate-heartbeat transform group-hover:scale-125 transition-transform duration-300" 
                  size={20} 
                />
                by
                <span className="ml-2 font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-gradient-text">
                  Sourav
                </span>
              </div>
              <Sparkles className="text-yellow-300 animate-pulse" size={24} />
            </div>
            
            {/* Animated underline */}
            <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Additional decorative elements */}
          <div className="mt-6 flex justify-center space-x-8">
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          
          {/* Copyright text */}
          <div className="mt-4 text-white/80 text-sm">
            © 2025 Your Buddy Weather App. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-pulse"></div>
    </footer>
  );
};

export default Footer;