import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL environment variable')
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable')
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Validate that the URL is a proper HTTPS URL
if (!supabaseUrl.startsWith('https://')) {
  console.error('Invalid Supabase URL: must be a valid HTTPS URL')
  throw new Error('Invalid Supabase URL: must be a valid HTTPS URL')
}

// Validate that the anon key is not empty
if (!supabaseAnonKey.trim()) {
  console.error('Invalid Supabase anon key: cannot be empty')
  throw new Error('Invalid Supabase anon key: cannot be empty')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)