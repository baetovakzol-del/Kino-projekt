# Online Cinema

A fully responsive movie discovery website built with React, Vite, and TMDB API.

## Features

- Browse popular and top-rated movies
- Search for movies by title
- View detailed movie information including cast, ratings, and trailers
- Add movies to favorites (saved in localStorage)
- Filter movies by genre, year, and rating
- Fully responsive design that works on all device sizes (320px and up)

## Technologies Used

- React.js
- Vite
- JavaScript (no TypeScript)
- SCSS
- TMDB API
- React Router
- LocalStorage for favorites

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd online-cinema
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Get your TMDB API key:
   - Visit [The Movie Database (TMDB)](https://www.themoviedb.org/)
   - Create an account or sign in
   - Go to Settings > API > Create API key
   - Copy your API key

5. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your TMDB API key:
     ```
     VITE_TMDB_API_KEY=your_api_key_here
     ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

### Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
  api/           # TMDB API functions
  components/     # Reusable UI components
  pages/          # Page components
  hooks/          # Custom React hooks
  styles/         # SCSS stylesheets
  utils/          # Utility functions
  App.jsx         # Main App component
  main.jsx        # Entry point
```

## Responsive Design

The application is fully responsive and adapts to different screen sizes:
- 1440px and above: 5 columns
- 1200px: 4 columns
- 1024px: 3 columns
- 768px: 2 columns
- 480px and below: 1 column

## License

This project is for educational purposes only.