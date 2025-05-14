import React, { useState } from 'react';
import { SmilePlus, Meh, Frown, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SentimentFilterProps {
  selectedSentiments: ('Positive' | 'Neutral' | 'Negative')[];
  onChange: (sentiments: ('Positive' | 'Neutral' | 'Negative')[]) => void;
}

const SentimentFilter: React.FC<SentimentFilterProps> = ({ 
  selectedSentiments, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sentiments: ('Positive' | 'Neutral' | 'Negative')[] = ['Positive', 'Neutral', 'Negative'];

  const handleToggle = (sentiment: 'Positive' | 'Neutral' | 'Negative') => {
    if (selectedSentiments.includes(sentiment)) {
      onChange(selectedSentiments.filter(s => s !== sentiment));
    } else {
      onChange([...selectedSentiments, sentiment]);
    }
  };

  const getSentimentIcon = (sentiment: 'Positive' | 'Neutral' | 'Negative') => {
    switch (sentiment) {
      case 'Positive': return <SmilePlus className="h-4 w-4 text-green-600" />;
      case 'Neutral': return <Meh className="h-4 w-4 text-yellow-600" />;
      case 'Negative': return <Frown className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="relative">
      <label className="text-sm font-medium mb-2">Sentiment Filter</label>
      <button
        className="flex items-center justify-between w-full p-2 bg-white border border-gray-200 rounded-md shadow-sm text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedSentiments.length === 0 
            ? 'All Sentiments' 
            : `${selectedSentiments.length} Selected`}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
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
              {sentiments.map(sentiment => (
                <div key={sentiment} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`sentiment-${sentiment}`}
                    checked={selectedSentiments.includes(sentiment)}
                    onChange={() => handleToggle(sentiment)}
                    className="mr-2 h-4 w-4"
                  />
                  <label htmlFor={`sentiment-${sentiment}`} className="text-sm flex items-center gap-1">
                    {getSentimentIcon(sentiment)}
                    {sentiment}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SentimentFilter;
