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
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { startDate: null, endDate: null },
    countries: [],
    sentiment: [],
    sortBy: 'estimated_views',
    sortDirection: 'desc'
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchSocialMediaData(filters);
        setData(result);
      } catch (error) {
        console.error('Error loading data:', error);
        // In a real app, we'd show an error notification here
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  // Removed mock data useEffect to rely solely on Supabase fetch

  return (
    <div className="min-h-screen bg-gray-100">
      <VideoBackground src="/background-video.mp4" />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
          <DataTable data={data} loading={loading} />
        </motion.div>
      </main>
    </div>
  );
}

// Mock data removed

export default App;
