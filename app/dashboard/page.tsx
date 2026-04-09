'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import StatCard from '@/components/dashboard/StatCard'
import ImageManager from '@/components/dashboard/ImageManager'
import { useLanguage } from '@/components/i18n/LanguageProvider'

interface Quote {
  id: string
  quoteNumber: string
  createdAt: string
  customerName: string
  itemCount: number
  materials: string[]
  groupNames: string[]
  title: string
  description: string
}

interface Stats {
  totalViews: number
  todayViews: number
  todayQuotes: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [stats, setStats] = useState<Stats>({ totalViews: 0, todayViews: 0, todayQuotes: 0 })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'quotes' | 'images'>('quotes')

  const t = isZh
    ? {
      title: 'Dashboard',
      subtitle: '管理系统',
      logout: '登出',
      loading: '加载中...',
      totalViews: '历史访问量',
      totalViewsSub: '总计',
      todayViews: '今日访问量',
      todayViewsSub: '今天',
      todayQuotes: '今日新询价',
      todayQuotesSub: '今天',
      quotesTab: '📋 今日询价',
      imagesTab: '🖼️ 图片管理',
      quoteId: '询价 ID',
      config: '窗户配置',
      submittedAt: '提交时间',
      empty: '今日暂无询价记录',
      clickToView: '点击打开详情页',
    }
    : {
      title: 'Dashboard',
      subtitle: 'Management',
      logout: 'Logout',
      loading: 'Loading...',
      totalViews: 'Total Visits',
      totalViewsSub: 'All time',
      todayViews: 'Visits Today',
      todayViewsSub: 'Today',
      todayQuotes: 'Quotes Today',
      todayQuotesSub: 'Today',
      quotesTab: '📋 Today Quotes',
      imagesTab: '🖼️ Image Manager',
      quoteId: 'Quote ID',
      config: 'Window Config',
      submittedAt: 'Submitted',
      empty: 'No quotes submitted today',
      clickToView: 'Click to open detail page',
    }

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', { cache: 'no-store' })
        const data = await response.json()

        if (!data.isLoggedIn) {
          router.push('/dashboard/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/dashboard/login')
      }
    }

    void checkAuth()
  }, [router])

  // Fetch data
  useEffect(() => {
    let isMounted = true

    const fetchData = async (showLoader = true) => {
      try {
        if (showLoader) {
          setLoading(true)
        }

        // Fetch stats
        const statsResponse = await fetch('/api/dashboard/stats', { cache: 'no-store' })
        const statsData = await statsResponse.json()
        if (statsResponse.ok && isMounted) {
          setStats(statsData)
        }

        // Fetch today's quotes
        const quotesResponse = await fetch('/api/dashboard/quotes?scope=today', { cache: 'no-store' })
        const quotesData = await quotesResponse.json()
        if (quotesResponse.ok && isMounted) {
          setQuotes(quotesData.quotes || [])
        }
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        if (showLoader && isMounted) {
          setLoading(false)
        }
      }
    }

    void fetchData()

    const intervalId = window.setInterval(() => {
      void fetchData(false)
    }, 30000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [])

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
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: isZh ? zhCN : undefined })
    } catch {
      return date
    }
  }

  const handleQuoteClick = (quoteId: string) => {
    router.push(`/dashboard/quotes/${quoteId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8F3]">
        <div className="text-center">
          <div className="text-4xl mb-4">🪟</div>
          <p className="text-gray-600">{t.loading}</p>
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
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon="📊"
            title={t.totalViews}
            value={stats.totalViews.toLocaleString()}
            subtitle={t.totalViewsSub}
            color="blue"
          />
          <StatCard
            icon="📅"
            title={t.todayViews}
            value={stats.todayViews.toLocaleString()}
            subtitle={t.todayViewsSub}
            color="green"
          />
          <StatCard
            icon="📩"
            title={t.todayQuotes}
            value={stats.todayQuotes}
            subtitle={t.todayQuotesSub}
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
                {t.quotesTab}
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${activeTab === 'images'
                  ? 'border-[#738751] text-[#738751]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {t.imagesTab}
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
                      {t.quoteId}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.config}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.submittedAt}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotes.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                        {t.empty}
                      </td>
                    </tr>
                  ) : (
                    quotes.map((quote) => (
                      <tr
                        key={quote.id}
                        className="hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => handleQuoteClick(quote.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#738751] font-medium">
                          #{quote.quoteNumber || quote.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {quote.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {quote.description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {quote.itemCount} item{quote.itemCount === 1 ? '' : 's'}
                            {quote.customerName ? ` · ${quote.customerName}` : ''}
                          </div>
                          <div className="text-xs text-[#738751] mt-1">
                            {t.clickToView}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatRelativeTime(quote.createdAt)}
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
