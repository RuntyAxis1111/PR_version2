import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from 'lucide-react';

interface DateRangeFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ 
  startDate, 
  endDate, 
  onChange 
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        <CalendarIcon className="h-4 w-4" />
        Date Range
      </label>
      <div className="flex items-center gap-2 bg-white rounded-md shadow-sm p-1">
        <DatePicker
          selected={startDate}
          onChange={(date) => onChange(date, endDate)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="p-2 rounded-md border border-gray-200 text-sm w-32"
          dateFormat="MMM d, yyyy"
        />
        <span className="text-gray-500">to</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => onChange(startDate, date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="p-2 rounded-md border border-gray-200 text-sm w-32"
          dateFormat="MMM d, yyyy"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
