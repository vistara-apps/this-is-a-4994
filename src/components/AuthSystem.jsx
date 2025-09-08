/**
 * Authentication System for SampleSecure Pro
 * Handles user login, registration, and authentication state
 */

import React, { useState, useEffect, createContext, useContext } from 'react'
import { User, Mail, Lock, Eye, EyeOff, Music, Shield, Zap } from 'lucide-react'

// Auth Context
const AuthContext = createContext()

// Auth Provider Component
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('samplesecure_user')
        if (savedUser) {
          const user = JSON.parse(savedUser)
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setAuthState(prev => ({ ...prev, isLoading: false, error: error.message }))
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (credentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock authentication - in production, this would call a real API
      if (credentials.email && credentials.password) {
        const user = {
          userId: Date.now(),
          email: credentials.email,
          subscriptionTier: 'Pro',
          createdAt: new Date().toISOString(),
          profile: {
            name: credentials.email.split('@')[0],
            avatar: null,
            genres: ['Hip Hop', 'R&B', 'Electronic'],
            location: 'Los Angeles, CA',
          },
          preferences: {
            notifications: true,
            autoSave: true,
            theme: 'dark',
          },
        }
        
        localStorage.setItem('samplesecure_user', JSON.stringify(user))
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
        
        return user
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }))
      throw error
    }
  }

  const register = async (userData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock registration - in production, this would call a real API
      const user = {
        userId: Date.now(),
        email: userData.email,
        subscriptionTier: userData.subscriptionTier || 'Free',
        createdAt: new Date().toISOString(),
        profile: {
          name: userData.name || userData.email.split('@')[0],
          avatar: null,
          genres: userData.genres || [],
          location: userData.location || '',
        },
        preferences: {
          notifications: true,
          autoSave: true,
          theme: 'dark',
        },
      }
      
      localStorage.setItem('samplesecure_user', JSON.stringify(user))
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      
      return user
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }))
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('samplesecure_user')
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  }

  const contextValue = {
    ...authState,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

// Login Component
function LoginForm({ onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(formData)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Music className="w-8 h-8 text-accent mr-2" />
          <h1 className="text-2xl font-bold text-textPrimary">SampleSecure Pro</h1>
        </div>
        <p className="text-textSecondary">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
              placeholder="producer@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-textSecondary mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textSecondary hover:text-textPrimary transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-textSecondary">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-accent hover:text-accent/80 font-medium transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

// Registration Component
function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    subscriptionTier: 'Free',
  })
  const [showPassword, setShowPassword] = useState(false)
  const { register, isLoading, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      return
    }
    
    try {
      await register(formData)
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const subscriptionTiers = [
    {
      value: 'Free',
      name: 'Free',
      description: 'Limited access to basic features',
      icon: Shield,
    },
    {
      value: 'Pro',
      name: 'Pro',
      description: '$29/mo - Full access to all features',
      icon: Zap,
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Music className="w-8 h-8 text-accent mr-2" />
          <h1 className="text-2xl font-bold text-textPrimary">SampleSecure Pro</h1>
        </div>
        <p className="text-textSecondary">Create your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-textSecondary mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
              placeholder="Your full name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
              placeholder="producer@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-textSecondary mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textSecondary hover:text-textPrimary transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-textSecondary mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-primary/20 border border-primary/30 rounded-lg text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none transition-colors"
              placeholder="Confirm your password"
            />
          </div>
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">Passwords do not match</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-textSecondary mb-3">
            Choose Your Plan
          </label>
          <div className="space-y-3">
            {subscriptionTiers.map((tier) => {
              const Icon = tier.icon
              return (
                <label
                  key={tier.value}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.subscriptionTier === tier.value
                      ? 'border-accent bg-accent/10'
                      : 'border-primary/30 bg-primary/10 hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="subscriptionTier"
                    value={tier.value}
                    checked={formData.subscriptionTier === tier.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Icon className="w-5 h-5 text-accent mr-3" />
                  <div className="flex-1">
                    <div className="font-medium text-textPrimary">{tier.name}</div>
                    <div className="text-sm text-textSecondary">{tier.description}</div>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || formData.password !== formData.confirmPassword}
          className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-textSecondary">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-accent hover:text-accent/80 font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}

// Main Auth Component
export function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface/50 backdrop-blur-sm border border-primary/20 rounded-xl p-8 shadow-modal">
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

// Loading Screen Component
export function AuthLoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Music className="w-12 h-12 text-accent animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold text-textPrimary mb-2">SampleSecure Pro</h1>
        <p className="text-textSecondary">Loading your session...</p>
        <div className="mt-4 w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  )
}

export default AuthSystem
