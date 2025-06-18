import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import DataTable from './components/DataTable';
import VideoBackground from './components/VideoBackground';
import { fetchSocialMediaData } from './lib/supabase';
import type { SocialMediaMention, FilterState } from './types/data';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SocialMediaMention[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { startDate: null, endDate: null },
    countries: [],
    sentiment: [],
    sortBy: 'reach',
    sortDirection: 'desc'
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Loading data with filters:', filters);
        const result = await fetchSocialMediaData(filters);
        console.log('Loaded data:', result);
        setData(result);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load PR data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <VideoBackground src="/background-video.mp4" />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex">
                <div className="text-red-800">
                  <strong>Error:</strong> {error}
                </div>
              </div>
            </motion.div>
          )}
          
          <DataTable data={data} loading={loading} />
        </motion.div>
      </main>
    </div>
  );
}

export default App;