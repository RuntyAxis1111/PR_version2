import React from 'react';
import { ArrowUpDown, TrendingUp, Calendar } from 'lucide-react';
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
      <label className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-700">
        <ArrowUpDown className="h-4 w-4 text-blue-500" />
        Sort by
      </label>
      <div className="flex gap-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 
            ${sortBy === 'reach'
              ? 'bg-blue-600 text-white shadow-md transform scale-105' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'}`}
          onClick={() => handleSortChange('reach')}
        >
          <TrendingUp className="h-4 w-4" />
          Reach
          {sortBy === 'reach' && (
            <span className="ml-1 text-xs">
              {sortDirection === 'desc' ? '↓' : '↑'}
            </span>
          )}
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 
            ${sortBy === 'post_date' 
              ? 'bg-blue-600 text-white shadow-md transform scale-105' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'}`}
          onClick={() => handleSortChange('post_date')}
        >
          <Calendar className="h-4 w-4" />
          Date
          {sortBy === 'post_date' && (
            <span className="ml-1 text-xs">
              {sortDirection === 'desc' ? '↓' : '↑'}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SortFilter;