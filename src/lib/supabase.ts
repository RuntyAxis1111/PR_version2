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
      .select('*'); // Select all columns to see what's available

    // Apply date range filter if provided
    if (filters.dateRange.startDate && filters.dateRange.endDate) {
      query = query.gte('Date', filters.dateRange.startDate.toISOString().split('T')[0])
                  .lte('Date', filters.dateRange.endDate.toISOString().split('T')[0]);
    }

    // Apply country filter if provided
    if (filters.countries.length > 0) {
      query = query.in('Country', filters.countries);
    }

    // Apply sentiment filter if provided
    if (filters.sentiment.length > 0) {
      query = query.in('Sentiment', filters.sentiment);
    }

    // Apply sorting
    if (filters.sortBy) {
      const sortColumn = filters.sortBy === 'reach' ? 'Reach' : 
                        filters.sortBy === 'post_date' ? 'Date' : 
                        'Reach';

      query = query.order(sortColumn, { ascending: filters.sortDirection === 'asc' });
    } else {
      query = query.order('Reach', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Raw data from Supabase:', data); // Debug log

    // Transform the data to match our expected format
    return (data || []).map((item, index) => ({
      id: item.URL || `item-${index}`,
      platform: 'PR',
      username: item.Source || item.Influencer || 'Unknown',
      post_date: item.Date || new Date().toISOString(),
      content: item.Headline || item['Hit Sentence'] || item['Opening Text'] || '',
      reach: parseInt(String(item.Reach || '0').replace(/,/g, ''), 10),
      country: item.Country || 'Unknown',
      sentiment: (item.Sentiment === 'Positive' || item.Sentiment === 'Neutral' || item.Sentiment === 'Negative') 
        ? item.Sentiment as 'Positive' | 'Neutral' | 'Negative'
        : 'Neutral',
      project: 'PALF',
      url: item.URL || '',
      language: item.Language || 'Unknown',
      ave: item.AVE || '0'
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

    const uniqueCountries = [...new Set(data?.map(item => item.Country).filter(Boolean))];
    return uniqueCountries as string[];
  } catch (error) {
    console.error('Error fetching unique countries:', error);
    return [];
  }
}