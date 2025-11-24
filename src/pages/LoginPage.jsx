import { useAuth } from '../contexts/AuthContext'
import AuthForm from '../components/AuthForm'

const LoginPage = () => {
  const { user } = useAuth()

  // If user is already logged in, show a welcome message
  if (user) {
    return (
      <div className="login-page">
        <div className="login-container">
          <h1>Вы уже вошли в систему</h1>
          <p>Привет, {user.email}</p>
          <p>Вы будете автоматически перенаправлены на страницу фильмов.</p>
        </div>
      </div>
    )
  }

  // Show the auth form for users who are not logged in
  return (
    <div className="login-page">
      <AuthForm />
    </div>
  )
}

export default LoginPage