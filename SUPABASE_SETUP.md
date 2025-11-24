# Supabase Integration Setup

## How to Set Up Supabase Authentication

### 1. Create a Supabase Project
1. Go to [https://supabase.io](https://supabase.io)
2. Sign up or log in to your account
3. Create a new project
4. Note down your Project URL and anon key from the project settings

### 2. Configure Environment Variables
1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and replace the placeholder values:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 3. Restart the Development Server
After updating the environment variables, restart your development server:
```bash
npm run dev
```

## How Authentication Works

### User Registration
- Users can register with email and password
- Supabase sends a confirmation email
- Users must confirm their email before logging in

### User Login
- Users can log in with their email and password
- Session is maintained until user logs out or session expires

### Protected Routes
- The `/movies`, `/movie/:id`, `/favorites`, `/search`, `/profile` routes are protected
- Unauthenticated users are redirected to `/login`

## Using User State in Components

To access the current user state in any component:

```jsx
import { useAuth } from './contexts/AuthContext'

const MyComponent = () => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    return <div>User not logged in</div>
  }
  
  return (
    <div>
      <p>Привет, {user.email}!</p>
      {/* Your component content */}
    </div>
  )
}
```

## Available Auth Functions

The AuthContext provides the following functions:
- `signIn(email, password)` - Log in with email and password
- `signUp(email, password)` - Register with email and password
- `signOut()` - Log out the current user

Example usage:
```jsx
import { useAuth } from './contexts/AuthContext'

const AuthComponent = () => {
  const { signIn, signUp, signOut } = useAuth()
  
  const handleLogin = async () => {
    try {
      await signIn('user@example.com', 'password123')
      // Redirect or update UI on success
    } catch (error) {
      // Handle error
    }
  }
  
  return (
    <button onClick={handleLogin}>Login</button>
  )
}
```