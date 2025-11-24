import { useAuth } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Show nothing while loading
  if (loading) {
    return null
  }

  // If no user, redirect to login with current location
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If user exists, render children
  return children
}

export default ProtectedRoute