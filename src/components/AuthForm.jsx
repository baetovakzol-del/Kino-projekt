import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/components/AuthForm.scss'

const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password)
        if (error) throw error
        alert('Регистрация успешна! Проверьте вашу почту для подтверждения.')
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
        // Redirect to movies page after successful login
        navigate('/movies')
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка. Попробуйте еще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form-container">
      <h2>{isSignUp ? 'Регистрация' : 'Вход'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="your@email.com"
            autoComplete="email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="Минимум 6 символов"
            autoComplete="current-password"
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Обработка...' : (isSignUp ? 'Зарегистрироваться' : 'Войти')}
        </button>
      </form>
      
      <div className="auth-toggle">
        <p>
          {isSignUp ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="toggle-button"
            disabled={loading}
          >
            {isSignUp ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthForm