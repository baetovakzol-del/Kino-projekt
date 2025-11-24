# Database Setup Instructions

This document provides instructions for setting up the required database tables for the watch history and reviews features.

## Prerequisites

1. A Supabase project (create one at https://supabase.io if you don't have one)
2. Supabase project URL and anon key
3. Properly configured `.env` file with your Supabase credentials

## Setting Up the Tables

### Method 1: Using Supabase SQL Editor (Recommended)

1. Log in to your Supabase dashboard
2. Select your project
3. Go to the SQL Editor (left sidebar)
4. Run the following SQL scripts in order:

#### Script 1: Create Watch History Table

```sql
-- Create watch_history table
CREATE TABLE IF NOT EXISTS watch_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  movie_id TEXT NOT NULL,
  movie_title TEXT NOT NULL,
  movie_poster TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_watch_history_user_id ON watch_history(user_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_movie_id ON watch_history(movie_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_viewed_at ON watch_history(viewed_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own watch history" 
  ON watch_history FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own watch history" 
  ON watch_history FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own watch history" 
  ON watch_history FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own watch history" 
  ON watch_history FOR DELETE 
  USING (auth.uid() = user_id);
```

#### Script 2: Create Reviews Table

```sql
-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  movie_id TEXT NOT NULL,
  username TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_movie_id ON reviews(movie_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Enable RLS (Row Level Security)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all reviews" 
  ON reviews FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own reviews" 
  ON reviews FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
  ON reviews FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" 
  ON reviews FOR DELETE 
  USING (auth.uid() = user_id);
```

### Method 2: Using Migration Files

If you prefer to use the migration files provided in this project:

1. Copy the SQL from `migrations/01_create_watch_history_table.sql` and run it in the Supabase SQL Editor
2. Copy the SQL from `migrations/02_create_reviews_table.sql` and run it in the Supabase SQL Editor

## Enabling Realtime for Reviews

To enable real-time updates for reviews:

1. In your Supabase dashboard, go to "Database" → "Realtime" → "Tables"
2. Enable Realtime for the `reviews` table
3. This will allow the reviews to update in real-time when new ones are added

## Testing the Setup

After setting up the tables:

1. Make sure your `.env` file contains the correct Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

2. Restart your development server:
   ```bash
   npm run dev
   ```

3. Test the features:
   - Visit a movie page to test watch history tracking
   - Navigate to `/history` to view your watch history
   - Leave a review on a movie page to test the reviews feature
   - Check that reviews appear in real-time

## Troubleshooting

If you encounter issues:

1. **Check environment variables**: Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correctly set in your `.env` file
2. **Verify table creation**: Check that both tables were created successfully in the Supabase table editor
3. **Check RLS policies**: Ensure Row Level Security policies are properly configured
4. **Restart the development server**: Sometimes changes require a server restart to take effect

If you continue to experience issues, check the browser console for error messages and verify your Supabase project settings.