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