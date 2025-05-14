import { createClient } from '@supabase/supabase-js';
import type { SocialMediaMention, FilterState } from '../types/data';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchSocialMediaData(filters: FilterState): Promise<SocialMediaMention[]> {
  try {
    let query = supabase
      .from('DATA_PALF_PR')
      .select('"URL", "Date", "Source", "Headline", "Reach", "Desktop Reach", "Mobile Reach", "Country", "Sentiment"'); // Explicitly select necessary columns

    // Apply date range filter if provided
    if (filters.dateRange.startDate && filters.dateRange.endDate) {
      // Supabase expects ISO 8601 format for date/timestamp filtering
      query = query.gte('Date', filters.dateRange.startDate.toISOString())
                  .lte('Date', filters.dateRange.endDate.toISOString());
    }

    // Apply country filter if provided
    if (filters.countries.length > 0) {
      query = query.in('Country', filters.countries);
    }

    // Apply sentiment filter if provided
    if (filters.sentiment.length > 0) {
      // Convert frontend sentiment values to lowercase to match database
      const lowercaseSentiments = filters.sentiment.map(s => s.toLowerCase());
      query = query.in('Sentiment', lowercaseSentiments);
    }

    // Apply sorting
    if (filters.sortBy) {
      // Map frontend sort keys to database column names
      const sortColumn = filters.sortBy === 'reach' ? 'Reach' : // Changed to sort by 'Reach'
                        filters.sortBy === 'post_date' ? 'Date' : 
                        'Reach'; // Default sort column changed to 'Reach'

      query = query.order(sortColumn, { ascending: filters.sortDirection === 'asc' });
    } else {
      // Default sort by Reach
      query = query.order('Reach', { ascending: false });
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform the data to match our expected format
    return (data || []).map(item => ({
      id: item.URL, // Using URL as a unique identifier since there's no id column
      platform: 'Unknown', // Platform info not available in the data
      username: item.Source || 'Unknown',
      post_date: item.Date,
      content: item.Headline || '',
      // Map new reach columns
      desktop_reach: parseInt(item['Desktop Reach'] || '0', 10),
      mobile_reach: parseInt(item['Mobile Reach'] || '0', 10),
      reach: parseInt(item.Reach || '0', 10), // Map total Reach
      // Removed estimated_views, likes, shares, comments
      country: item.Country || 'Unknown',
      sentiment: item.Sentiment as 'Positive' | 'Neutral' | 'Negative' || 'Unknown',
      project: 'PALF',
      url: item.URL || ''
    }));

  } catch (error) {
    console.error('Error fetching social media data:', error);
    return [];
  }
}

export async function fetchUniqueCountries(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('DATA_PALF_PR')
      .select('Country');

    if (error) throw error;

    // Manually filter for unique values and remove null/undefined
    const uniqueCountries = [...new Set(data?.map(item => item.Country).filter(Boolean))];
    return uniqueCountries as string[]; // Cast to string[] after filtering
  } catch (error) {
    console.error('Error fetching unique countries:', error);
    return [];
  }
}
