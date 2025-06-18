import React from 'react';
import { Database, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-8 px-8 shadow-2xl">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Database className="h-8 w-8 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                PALF PR HUB
              </h1>
              <p className="text-sm text-gray-400 mt-1">Public Relations Analytics Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
            <Zap className="h-4 w-4" />
            <span>ALPHA VERSION</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-6">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-8 font-bold text-lg flex items-center justify-center rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
            <span>PUBLIC DATA ANALYTICS</span>
            <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;