'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if (!isLoggedIn) {
      router.push('/login')
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                City<span className="text-green-600">Windows</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-700">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-green-100">Here's your business overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stats Card 1 */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                <span className="text-3xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
                <p className="text-xs text-green-600 mt-1">+3 this week</p>
              </div>
            </div>
          </div>

          {/* Stats Card 2 */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                <span className="text-3xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-xs text-blue-600 mt-1">Need response</p>
              </div>
            </div>
          </div>

          {/* Stats Card 3 */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                <span className="text-3xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">16</p>
                <p className="text-xs text-purple-600 mt-1">This month</p>
              </div>
            </div>
          </div>
        </div>


        {/* Quote Requests Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Quote Requests</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              MVP Version
            </span>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quote Management Coming in v1
              </h3>
              <p className="text-gray-600 mb-6">
                For now, all quote requests are sent directly to your email.<br />
                Database integration and quote management features will be added in the next version.
              </p>
              <div className="inline-flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Email notifications working
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  Database coming soon
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Images Management */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">📸</span>
              Product Images Management
            </h2>
            <p className="text-sm text-gray-600 mt-1">每个子页面的产品图片可以在这里上传</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Vinyl Windows */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Vinyl Windows - Homepage Image</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-3">Current Image Preview</p>
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <span className="text-6xl mb-2 block">🪟</span>
                      <p className="text-sm text-gray-500">Vinyl Window Preview</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-3">
                  <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Upload New Image
                  </button>
                  <button className="w-full py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium">
                    Remove Image
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: 800x600px, JPG or PNG
                  </p>
                </div>
              </div>
            </div>

            {/* Aluminum Windows */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Aluminum Windows - Homepage Image</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-3">Current Image Preview</p>
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <span className="text-6xl mb-2 block">🏢</span>
                      <p className="text-sm text-gray-500">Aluminum Window Preview</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-3">
                  <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Upload New Image
                  </button>
                  <button className="w-full py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium">
                    Remove Image
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: 800x600px, JPG or PNG
                  </p>
                </div>
              </div>
            </div>

            {/* Commercial Windows */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Commercial Windows - Homepage Image</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-3">Current Image Preview</p>
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <span className="text-6xl mb-2 block">🏗️</span>
                      <p className="text-sm text-gray-500">Commercial Window Preview</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-3">
                  <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Upload New Image
                  </button>
                  <button className="w-full py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium">
                    Remove Image
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: 800x600px, JPG or PNG
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-xl mr-2">ℹ️</span>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Image Upload Feature</p>
                  <p>Upload and replace product images for the homepage. Changes will be reflected immediately after upload.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <span className="text-2xl mr-3">💡</span>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">MVP Features</h3>
              <p className="text-sm text-blue-800">
                This is the MVP (Minimum Viable Product) version. Full features including:
                database storage, quote management, CSV export, and media management
                will be implemented in v1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}