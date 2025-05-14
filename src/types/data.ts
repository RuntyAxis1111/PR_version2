export interface SocialMediaMention {
  id: string;
  platform: string;
  username: string;
  post_date: string;
  content: string;
  // Removed estimated_views, likes, shares, comments
  desktop_reach: number; // Added Desktop Reach
  mobile_reach: number; // Added Mobile Reach
  reach: number; // Added total Reach for sorting/display
  country: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  project: string;
  url: string;
}

export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  countries: string[];
  sentiment: ('Positive' | 'Neutral' | 'Negative')[];
  sortBy: string; // Will now include 'reach'
  sortDirection: SortDirection;
}
