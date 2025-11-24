import { useAuth } from '../contexts/AuthContext'

// This is a demonstration component showing how to use the user state
// In a real application, you would integrate this directly into your MovieCatalog component
const UserStateDemo = () => {
  const { user } = useAuth()

  if (!user) {
    return null // Don't show anything if user is not logged in
  }

  return (
    <div className="user-state-demo">
      <p>Привет, {user.email}! Вы успешно вошли в систему.</p>
      <div className="user-actions">
        <button className="profile-button">Профиль</button>
        <button className="logout-button">Выйти</button>
      </div>
    </div>
  )
}

export default UserStateDemo