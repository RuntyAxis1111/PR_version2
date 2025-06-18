import React from 'react';
import { motion } from 'framer-motion';
import { Filter, RotateCcw } from 'lucide-react';
import DateRangeFilter from './DateRangeFilter';
import CountryFilter from './CountryFilter';
import SentimentFilter from './SentimentFilter';
import SortFilter from './SortFilter';
import type { FilterState, SortDirection } from '../types/data';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    onFiltersChange({
      ...filters,
      dateRange: { startDate, endDate }
    });
  };

  const handleCountryChange = (countries: string[]) => {
    onFiltersChange({
      ...filters,
      countries
    });
  };

  const handleSentimentChange = (sentiment: ('Positive' | 'Neutral' | 'Negative')[]) => {
    onFiltersChange({
      ...filters,
      sentiment
    });
  };

  const handleSortChange = (sortBy: string, sortDirection: SortDirection) => {
    onFiltersChange({
      ...filters,
      sortBy,
      sortDirection
    });
  };

  const handleResetFilters = () => {
    onFiltersChange({
      dateRange: { startDate: null, endDate: null },
      countries: [],
      sentiment: [],
      sortBy: 'reach',
      sortDirection: 'desc'
    });
  };

  const hasActiveFilters = 
    filters.dateRange.startDate || 
    filters.dateRange.endDate || 
    filters.countries.length > 0 || 
    filters.sentiment.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Filter className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Filter & Sort</h2>
            <p className="text-sm text-gray-500">Refine your PR mentions search</p>
          </div>
        </div>
        
        {hasActiveFilters && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </motion.button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <DateRangeFilter
            startDate={filters.dateRange.startDate}
            endDate={filters.dateRange.endDate}
            onChange={handleDateRangeChange}
          />
        </div>
        
        <div className="space-y-2">
          <SortFilter
            sortBy={filters.sortBy}
            sortDirection={filters.sortDirection}
            onChange={handleSortChange}
          />
        </div>
        
        <div className="space-y-2">
          <CountryFilter
            selectedCountries={filters.countries}
            onChange={handleCountryChange}
          />
        </div>
        
        <div className="space-y-2">
          <SentimentFilter
            selectedSentiments={filters.sentiment}
            onChange={handleSentimentChange}
          />
        </div>
      </div>
      
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex flex-wrap gap-2">
            {filters.dateRange.startDate && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                From: {filters.dateRange.startDate.toLocaleDateString()}
              </span>
            )}
            {filters.dateRange.endDate && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                To: {filters.dateRange.endDate.toLocaleDateString()}
              </span>
            )}
            {filters.countries.map(country => (
              <span key={country} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {country}
              </span>
            ))}
            {filters.sentiment.map(sentiment => (
              <span key={sentiment} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {sentiment}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterPanel;