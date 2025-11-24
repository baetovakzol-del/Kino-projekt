import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/pages/Profile.scss'

const ProfilePage = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [joinDate, setJoinDate] = useState('')

  useEffect(() => {
    if (user?.created_at) {
      const date = new Date(user.created_at)
      setJoinDate(date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }))
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <h1>Профиль</h1>
          <p>Вы не вошли в систему. <a href="/login">Войти</a></p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Профиль пользователя</h1>
        <div className="profile-card">
          <div className="profile-info">
            <h2>Информация о пользователе</h2>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="label">ID:</span>
              <span className="value">{user.id}</span>
            </div>
            {joinDate && (
              <div className="info-item">
                <span className="label">Дата регистрации:</span>
                <span className="value">{joinDate}</span>
              </div>
            )}
            <div className="info-item">
              <span className="label">Статус:</span>
              <span className="value">Активен</span>
            </div>
          </div>
          <div className="profile-actions">
            <button onClick={handleLogout} className="logout-button">
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage