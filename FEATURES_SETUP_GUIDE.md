# Features Setup Guide

This guide explains how to set up and test the new watch history and reviews features that have been added to your React + Supabase project.

## New Features Overview

### 1. Watch History
- Automatically tracks movies viewed by authenticated users
- Stores movie details (ID, title, poster) and view timestamp
- Provides a dedicated `/history` page to view and manage watch history
- Updates existing entries when a movie is viewed again

### 2. Reviews System
- Allows authenticated users to leave ratings (1-10) and comments on movies
- Displays all reviews for a movie with real-time updates
- Validates review content (minimum 3 characters)
- Prevents unauthenticated users from submitting reviews

## Files Added/Modified

### New Files Created:
1. `src/api/supabase.js` - Supabase API functions for watch history and reviews
2. `src/pages/History.jsx` - Page component for viewing watch history
3. `src/components/Reviews.jsx` - Component for displaying and submitting reviews
4. `src/styles/pages/History.scss` - Styles for the history page
5. `src/styles/components/Reviews.scss` - Styles for the reviews component
6. `migrations/01_create_watch_history_table.sql` - SQL script for watch history table
7. `migrations/02_create_reviews_table.sql` - SQL script for reviews table
8. `DATABASE_SETUP.md` - Database setup instructions
9. `FEATURES_SETUP_GUIDE.md` - This guide

### Files Modified:
1. `src/pages/MoviePage.jsx` - Added watch history tracking and reviews component
2. `src/App.jsx` - Added route for history page
3. `src/components/Header.jsx` - Added link to history page

## Setup Instructions

### 1. Database Setup

Follow the instructions in `DATABASE_SETUP.md` to create the required tables in your Supabase project:

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Run the SQL scripts from the migration files or copy them from `DATABASE_SETUP.md`
4. Enable Realtime for the `reviews` table

### 2. Environment Variables

Ensure your `.env` file contains the correct Supabase credentials:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_TMDB_API_KEY=your-tmdb-api-key
```

### 3. Restart Development Server

After making changes, restart your development server:

```bash
npm run dev
```

## Testing the Features

### Testing Watch History

1. Log in to your application
2. Navigate to any movie page (`/movie/:id`)
3. Verify that the visit is recorded in the watch history:
   - Check the `watch_history` table in your Supabase dashboard
   - Visit the same movie again and verify that only the `viewed_at` timestamp is updated
4. Navigate to `/history` to view your watch history
5. Test the "Clear History" button

### Testing Reviews

1. Log in to your application
2. Navigate to any movie page
3. Scroll down to the reviews section
4. Try submitting a review:
   - Verify that unauthenticated users see a login prompt
   - Verify that authenticated users can submit reviews
   - Check validation (minimum 3 characters)
   - Verify that ratings are properly handled (1-10)
5. Check that reviews appear in real-time:
   - Open the same movie page in another browser tab
   - Submit a review in one tab
   - Verify it appears immediately in the other tab
6. Check the `reviews` table in your Supabase dashboard

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loaded**
   - Solution: Ensure your `.env` file is in the project root
   - Solution: Restart the development server after changing environment variables

2. **Database Connection Errors**
   - Solution: Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
   - Solution: Check your internet connection

3. **Permission Denied Errors**
   - Solution: Verify RLS policies are correctly configured in Supabase
   - Solution: Ensure you're logged in when performing actions

4. **Real-time Updates Not Working**
   - Solution: Verify Realtime is enabled for the `reviews` table in Supabase
   - Solution: Check browser console for WebSocket errors

5. **Reviews Not Displaying**
   - Solution: Check browser console for JavaScript errors
   - Solution: Verify the movie ID is being passed correctly to the Reviews component

### Debugging Tips

1. Check the browser console for error messages
2. Use the Supabase dashboard to inspect table data
3. Verify network requests in the browser's developer tools
4. Check that all required environment variables are set

## Code Structure

### API Functions (`src/api/supabase.js`)

- `addToHistory(movie, userId)` - Add/update movie in watch history
- `getUserHistory(userId)` - Retrieve user's watch history
- `clearHistory(userId)` - Clear user's watch history
- `addReview(movieId, userId, username, rating, comment)` - Add a new review
- `getReviews(movieId)` - Get all reviews for a movie
- `subscribeReviews(movieId, callback)` - Subscribe to real-time review updates

### Components

- `History` page (`src/pages/History.jsx`) - Displays user's watch history
- `Reviews` component (`src/components/Reviews.jsx`) - Handles review submission and display

### Styling

All new components follow the existing design system with responsive layouts and dark theme styling consistent with the rest of the application.

## Security Considerations

1. All database operations use Row Level Security (RLS) policies
2. Users can only access their own watch history
3. Users can only modify their own reviews
4. All data is validated before being sent to the database
5. Environment variables are properly secured using Vite's environment variable system

## Performance Considerations

1. Database indexes are created for frequently queried columns
2. Pagination is not currently implemented but could be added for large datasets
3. Real-time subscriptions are properly cleaned up to prevent memory leaks
4. Loading states provide feedback during asynchronous operations

## Future Enhancements

Possible improvements that could be made:

1. Add pagination to the history page for users with many watched movies
2. Add sorting and filtering options to the history page
3. Allow users to delete individual reviews
4. Add average ratings display to movie pages
5. Implement review editing functionality