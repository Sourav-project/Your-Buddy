import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-gray-700">Your Buddy is preparing...</p>
        <p className="text-sm text-gray-500">Getting your personalized weather insights</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;