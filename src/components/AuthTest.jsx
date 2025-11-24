import { useAuth } from '../contexts/AuthContext'

const AuthTest = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Auth Test</h2>
      {user ? (
        <div>
          <p>User is logged in:</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
        </div>
      ) : (
        <p>User is not logged in</p>
      )}
    </div>
  )
}

export default AuthTest