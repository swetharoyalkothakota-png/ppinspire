
import { useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'

import './App.css'

import Navbar from './components/NavbarTemp'
import Sidebar from './components/sidebar'
import Home from './pages/HomeTemp'
import Explore from './pages/ExploreTemp'
import Saved from './pages/savedpins.jsx'
import CreatePin from './pages/CreatePinTemp'
import Profile from './pages/ProfileTemp'
import SearchResults from './pages/SearchResults'
import PinDetails from './pages/pinDetails.jsx'

function readStorage(key, fallback = []) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}
 
export default function App() {
  const navigate = useNavigate()

  const [mode, setMode] = useState('login')
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  function handleAuth(event) {
    event.preventDefault()
    setMessage('')

    const users = readStorage('pinterestUsers')
    const cleanEmail = email.trim().toLowerCase()

    if (mode === 'signup') {
      if (!name.trim()) {
        setMessage('Please enter your name.')
        return
      }

      if (password.length < 6) {
        setMessage('Password must contain at least 6 characters.')
        return
      }

      if (users.some(user => user.email === cleanEmail)) {
        setMessage('Account already exists. Please log in.')
        return
      }

      const newUser = {
        name: name.trim(),
        email: cleanEmail,
        password,
      }

      localStorage.setItem(
        'pinterestUsers',
        JSON.stringify([...users, newUser])
      )

      setUserName(newUser.name)
      setUserEmail(newUser.email)
    } else {
      const user = users.find(
        item =>
          item.email === cleanEmail &&
          item.password === password
      )

      if (!user) {
        setMessage('Incorrect email or password.')
        return
      }

      setUserName(user.name)
      setUserEmail(user.email)
    }

    setLoggedIn(true)
    setPassword('')
    navigate('/')
  }

  function logout() {
    setLoggedIn(false)
    setMode('login')
    setName('')
    setEmail('')
    setPassword('')
    setMessage('')
    setUserName('')
    setUserEmail('')
    navigate('/')
  }

  if (!loggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">P</div>

          <h1>
            {mode === 'login'
              ? 'Welcome to Pinspire'
              : 'Create your account'}
          </h1>

          <p className="auth-subtitle">
            Find new ideas and inspiration.
          </p>

          <form onSubmit={handleAuth}>
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={event => setName(event.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />

            <div className="password-box">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (minimum 6 characters)"
                value={password}
                onChange={event => setPassword(event.target.value)}
                minLength={6}
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(value => !value)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {message && (
              <p className="auth-message">{message}</p>
            )}

            <button type="submit" className="auth-submit">
              {mode === 'login' ? 'Log in' : 'Sign up'}
            </button>
          </form>

          <p className="auth-switch">
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}

            <button
              type="button"
              onClick={() => {
                setMode(current =>
                  current === 'login' ? 'signup' : 'login'
                )
                setMessage('')
              }}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>

          <p className="auth-footer">
            Discover ideas. Save inspiration. Create your world.
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="app">
      <Sidebar userName={userName} userEmail={userEmail} />

      <div className="main-content">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/create" element={<CreatePin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/pin/:id" element={<PinDetails />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>

          <footer className="app-footer">
            <p>Made with ♥ for Pinterest inspiration</p>
            <p>
              Logged in as {userName} ({userEmail})
            </p>
            <button className="logout-btn" onClick={logout}>
              Log out
            </button>
          </footer>
        </main>
      </div>
    </div>
  )
}
