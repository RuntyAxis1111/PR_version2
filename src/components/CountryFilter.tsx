import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchUniqueCountries } from '../lib/supabase';

interface CountryFilterProps {
  selectedCountries: string[];
  onChange: (countries: string[]) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = ({ selectedCountries, onChange }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      const countriesList = await fetchUniqueCountries();
      setCountries(countriesList);
    };
    
    getCountries();
  }, []);

  const handleCountryToggle = (country: string) => {
    if (selectedCountries.includes(country)) {
      onChange(selectedCountries.filter(c => c !== country));
    } else {
      onChange([...selectedCountries, country]);
    }
  };

  return (
    <div className="relative">
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        <Globe className="h-4 w-4" />
        Filter by Country
      </label>
      <button
        className="flex items-center justify-between w-full p-2 bg-white border border-gray-200 rounded-md shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">
          {selectedCountries.length === 0 
            ? 'All Countries' 
            : `${selectedCountries.length} Selected`}
        </span>
        <span className="text-gray-500">▼</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg"
        >
          <div className="p-2 border-b border-gray-200">
            <button
              className="text-xs text-blue-600 hover:text-blue-800"
              onClick={() => onChange([])}
            >
              Clear All
            </button>
          </div>
          <div className="p-2">
            {countries.map(country => (
              <div key={country} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`country-${country}`}
                  checked={selectedCountries.includes(country)}
                  onChange={() => handleCountryToggle(country)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor={`country-${country}`} className="text-sm">
                  {country}
                </label>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CountryFilter;
