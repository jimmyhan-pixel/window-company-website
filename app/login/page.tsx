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

    // Simple authentication
    if (username === 'admin' && password === 'admin123') {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white shadow-2xl p-10 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block p-5 bg-gradient-to-br from-[#738751] to-[#5a6a42] rounded-full mb-6">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Admin Login</h2>
            <p className="text-gray-600">Sign in to access the dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 focus:border-[#738751] focus:outline-none transition-all duration-300 hover:border-gray-300 text-lg"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 focus:border-[#738751] focus:outline-none transition-all duration-300 hover:border-gray-300 text-lg"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full py-4 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 uppercase tracking-wider text-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-5 bg-gradient-to-r from-[#f7f8f3] to-[#eef0e6] border-l-4 border-[#738751]">
            <p className="text-xs text-gray-600 font-bold mb-2 uppercase tracking-wider">Demo Credentials:</p>
            <p className="text-sm text-gray-700">Username: <span className="font-bold text-[#738751]">admin</span></p>
            <p className="text-sm text-gray-700">Password: <span className="font-bold text-[#738751]">admin123</span></p>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <a href="/" className="text-[#738751] hover:text-[#5a6a42] font-semibold transition-colors uppercase tracking-wider text-sm">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}