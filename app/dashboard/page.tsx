'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import StatCard from '@/components/dashboard/StatCard'
import ImageManager from '@/components/dashboard/ImageManager'

interface Quote {
  id: string
  quote_number: string
  created_at: string
  material: string
  aluminum_category?: string
  window_type: string
  grids?: string
  color: string
  width: number
  height: number
  quantity: number
}

interface Stats {
  totalViews: number
  monthlyViews: number
  todayQuotes: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [stats, setStats] = useState<Stats>({ totalViews: 0, monthlyViews: 0, todayQuotes: 0 })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'quotes' | 'images'>('quotes')

  // Check authentication
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check')
      const data = await response.json()

      if (!data.isLoggedIn) {
        router.push('/dashboard/login')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/dashboard/login')
    }
  }

  // Fetch data
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch stats
      const statsResponse = await fetch('/api/dashboard/stats')
      const statsData = await statsResponse.json()
      if (statsResponse.ok) {
        setStats(statsData)
      }

      // Fetch quotes
      const quotesResponse = await fetch('/api/dashboard/quotes')
      const quotesData = await quotesResponse.json()
      if (quotesResponse.ok) {
        setQuotes(quotesData.quotes || [])
      }
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/dashboard/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Format relative time
  const formatRelativeTime = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: zhCN })
    } catch {
      return date
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8F3]">
        <div className="text-center">
          <div className="text-4xl mb-4">🪟</div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F8F3]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🪟</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">管理系统</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon="📊"
            title="历史访问量"
            value={stats.totalViews.toLocaleString()}
            subtitle="总计"
            color="blue"
          />
          <StatCard
            icon="📅"
            title="本月访问量"
            value={stats.monthlyViews.toLocaleString()}
            subtitle="本月"
            color="green"
          />
          <StatCard
            icon="📩"
            title="今日新询价"
            value={stats.todayQuotes}
            subtitle="今天"
            color="amber"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('quotes')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${activeTab === 'quotes'
                  ? 'border-[#738751] text-[#738751]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                📋 询价列表
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${activeTab === 'images'
                  ? 'border-[#738751] text-[#738751]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                🖼️ 图片管理
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'quotes' ? (
          /* Quotes Table */
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      询价 ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      窗户配置
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      提交时间
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotes.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                        暂无询价记录
                      </td>
                    </tr>
                  ) : (
                    quotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#738751] font-medium">
                          #{quote.quote_number || quote.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {quote.window_type} ({quote.material})
                          </div>
                          <div className="text-sm text-gray-500">
                            {quote.width}" × {quote.height}" × {quote.quantity} · {quote.color}
                            {quote.grids && ` · ${quote.grids}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatRelativeTime(quote.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Image Manager */
          <ImageManager />
        )}
      </main>
    </div>
  )
}