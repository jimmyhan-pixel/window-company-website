'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simple authentication (you'll improve this later)
    // For MVP, hardcode credentials
    if (username === 'admin' && password === 'admin123') {
      // Store login state (for now, just redirect)
      localStorage.setItem('isLoggedIn', 'true')

      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } else {
      setError('Invalid username or password')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f8f3] via-white to-[#eef0e6] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-2xl mb-4">
              <svg className="w-12 h-12 text-[#738751]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Login</h2>
            <p className="text-gray-600 mt-2">Sign in to access the admin panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-fade-in">
              <p className="text-red-600 text-sm font-medium">⚠️ {error}</p>
            </div>
          )}

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#738751] focus:outline-none transition-all duration-300 hover:border-gray-300"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#738751] focus:outline-none transition-all duration-300 hover:border-gray-300"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading || !username || !password}
              className="w-full py-3 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
            >
              {isLoading ? '🔄 Signing in...' : '🔐 Sign In'}
            </button>
          </div>

          {/* Demo Credentials (remove in production) */}
          <div className="mt-6 p-4 bg-gradient-to-r from-[#f7f8f3] to-[#eef0e6] rounded-xl border border-[#dce2cd]">
            <p className="text-xs text-gray-600 font-semibold mb-2">💡 Demo Credentials:</p>
            <p className="text-xs text-gray-500">Username: <span className="font-medium text-[#738751]">admin</span></p>
            <p className="text-xs text-gray-500">Password: <span className="font-medium text-[#738751]">admin123</span></p>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a href="/" className="text-[#738751] hover:text-[#5a6a42] text-sm font-medium transition-colors hover:underline">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}