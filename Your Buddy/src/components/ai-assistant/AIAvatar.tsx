import React from 'react';

interface AIAvatarProps {
  isTyping?: boolean;
  isSpeaking?: boolean;
  size?: number;
}

const AIAvatar: React.FC<AIAvatarProps> = ({ isTyping = false, isSpeaking = false, size = 40 }) => {
  return (
    <div className="relative">
      {/* Main Avatar Container */}
      <div 
        className={`relative rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 p-1 ${
          isTyping || isSpeaking ? 'animate-pulse' : ''
        }`}
        style={{ width: size, height: size }}
      >
        {/* Inner Avatar */}
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
          {/* Face Structure */}
          <div className="relative w-full h-full">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-purple-100 rounded-full"></div>
            
            {/* Face Features */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Hair */}
              <div 
                className="absolute top-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                style={{ 
                  width: size * 0.8, 
                  height: size * 0.4,
                  borderRadius: `${size * 0.4}px ${size * 0.4}px 0 0`
                }}
              ></div>
              
              {/* Face */}
              <div 
                className="bg-gradient-to-b from-pink-200 to-pink-100 rounded-full relative"
                style={{ 
                  width: size * 0.7, 
                  height: size * 0.6,
                  marginTop: size * 0.15
                }}
              >
                {/* Eyes */}
                <div className="absolute flex space-x-1" style={{ 
                  top: size * 0.15, 
                  left: '50%', 
                  transform: 'translateX(-50%)' 
                }}>
                  <div 
                    className={`bg-blue-600 rounded-full ${isTyping ? 'animate-blink' : ''}`}
                    style={{ width: size * 0.08, height: size * 0.08 }}
                  ></div>
                  <div 
                    className={`bg-blue-600 rounded-full ${isTyping ? 'animate-blink' : ''}`}
                    style={{ width: size * 0.08, height: size * 0.08 }}
                  ></div>
                </div>
                
                {/* Nose */}
                <div 
                  className="absolute bg-pink-300 rounded-full"
                  style={{ 
                    width: size * 0.04, 
                    height: size * 0.04,
                    top: size * 0.25,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                ></div>
                
                {/* Mouth */}
                <div 
                  className={`absolute border-b-2 border-pink-600 rounded-full ${
                    isSpeaking ? 'animate-bounce' : ''
                  }`}
                  style={{ 
                    width: size * 0.12, 
                    height: size * 0.06,
                    top: size * 0.35,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Indicators */}
      {isTyping && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
        </div>
      )}
      
      {isSpeaking && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
        </div>
      )}
      
      {/* Breathing Animation */}
      {!isTyping && !isSpeaking && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/20 via-purple-500/20 to-blue-500/20 animate-pulse"></div>
      )}
    </div>
  );
};

export default AIAvatar;