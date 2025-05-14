import React from 'react';
import { Database } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white py-6 px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold">PALF PR <span className="opacity-50">(alpha)</span></h1>
          </div>
          {/* Removed ADD DATA button as requested */}
        </div>
      </div>
      <div className="container mx-auto flex justify-center mt-4">
        <div className="bg-yellow-400 text-black py-2 px-16 font-bold text-lg flex items-center justify-center w-full max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rotate-45 bg-yellow-400"></div>
            <span>PUBLIC DATA</span>
            <div className="w-4 h-4 rotate-45 bg-yellow-400"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
