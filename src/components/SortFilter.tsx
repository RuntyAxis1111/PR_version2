import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { SortDirection } from '../types/data';

interface SortFilterProps {
  sortBy: string;
  sortDirection: SortDirection;
  onChange: (field: string, direction: SortDirection) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ 
  sortBy, 
  sortDirection, 
  onChange 
}) => {
  const handleSortChange = (field: string) => {
    const newDirection = field === sortBy && sortDirection === 'desc' ? 'asc' : 'desc';
    onChange(field, newDirection);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4" />
        Sort by
      </label>
      <div className="flex gap-2">
        <button
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors 
            ${sortBy === 'reach' // Changed from 'estimated_views' to 'reach'
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          onClick={() => handleSortChange('reach')} // Changed to 'reach'
        >
          Relevance
          {sortBy === 'reach' && ( // Changed to 'reach'
            <span className="ml-1">
              {sortDirection === 'desc' ? '↓' : '↑'}
            </span>
          )}
        </button>
        <button
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors 
            ${sortBy === 'post_date' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          onClick={() => handleSortChange('post_date')}
        >
          Date
          {sortBy === 'post_date' && (
            <span className="ml-1">
              {sortDirection === 'desc' ? '↓' : '↑'}
            </span>
          )}
        </button>
        {/* Removed Likes button */}
      </div>
    </div>
  );
};

export default SortFilter;
