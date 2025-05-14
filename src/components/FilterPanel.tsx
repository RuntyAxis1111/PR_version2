import React from 'react';
import { motion } from 'framer-motion';
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
      sortBy: 'estimated_views',
      sortDirection: 'desc'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 rounded-lg shadow-md p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filter Data</h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Reset All Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DateRangeFilter
          startDate={filters.dateRange.startDate}
          endDate={filters.dateRange.endDate}
          onChange={handleDateRangeChange}
        />
        
        <SortFilter
          sortBy={filters.sortBy}
          sortDirection={filters.sortDirection}
          onChange={handleSortChange}
        />
        
        <CountryFilter
          selectedCountries={filters.countries}
          onChange={handleCountryChange}
        />
        
        <SentimentFilter
          selectedSentiments={filters.sentiment}
          onChange={handleSentimentChange}
        />
      </div>
    </motion.div>
  );
};

export default FilterPanel;
