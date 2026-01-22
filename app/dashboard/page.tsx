'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import StatCard from '@/components/dashboard/StatCard'
import StatusBadge from '@/components/dashboard/StatusBadge'

interface Quote {
  id: string
  created_at: string
  updated_at: string
  material: string
  aluminum_category?: string
  window_type: string
  grids?: string
  color: string
  width: number
  height: number
  quantity: number
  customer_email: string
  customer_phone: string
  status: 'new' | 'quoted' | 'closed'
  quote_amount?: number
  notes?: string
  customer_name?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'quoted' | 'closed'>('all')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updateStatus, setUpdateStatus] = useState<'new' | 'quoted' | 'closed'>('new')
  const [updateNotes, setUpdateNotes] = useState('')

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

  // Fetch quotes
  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard/quotes')
      const data = await response.json()

      if (response.ok) {
        setQuotes(data.quotes || [])
        setFilteredQuotes(data.quotes || [])
      } else {
        console.error('Failed to fetch quotes:', data.error)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter quotes
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredQuotes(quotes)
    } else {
      setFilteredQuotes(quotes.filter(q => q.status === statusFilter))
    }
  }, [statusFilter, quotes])

  // Calculate stats
  const stats = {
    new: quotes.filter(q => q.status === 'new').length,
    quoted: quotes.filter(q => q.status === 'quoted').length,
    closed: quotes.filter(q => q.status === 'closed').length,
    total: quotes.length,
  }

  const conversionRate = stats.total > 0
    ? ((stats.closed / stats.total) * 100).toFixed(1)
    : '0.0'

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

  // Update quote status
  const handleUpdateStatus = async () => {
    if (!selectedQuote) return

    try {
      const response = await fetch(`/api/dashboard/quotes/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: updateStatus,
          notes: updateNotes,
        }),
      })

      if (response.ok) {
        await fetchQuotes()
        setShowUpdateModal(false)
        setSelectedQuote(null)
      } else {
        console.error('Failed to update quote')
      }
    } catch (error) {
      console.error('Update error:', error)
    }
  }

  // Open update modal
  const openUpdateModal = (quote: Quote) => {
    setSelectedQuote(quote)
    setUpdateStatus(quote.status)
    setUpdateNotes(quote.notes || '')
    setShowUpdateModal(true)
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
                <p className="text-sm text-gray-600">询价管理系统</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon="📩"
            title="新询价"
            value={stats.new}
            subtitle="待处理"
            color="amber"
            onClick={() => setStatusFilter('new')}
          />
          <StatCard
            icon="📧"
            title="已报价"
            value={stats.quoted}
            subtitle="待跟进"
            color="blue"
            onClick={() => setStatusFilter('quoted')}
          />
          <StatCard
            icon="✅"
            title="已关闭"
            value={stats.closed}
            subtitle="本月"
            color="green"
            onClick={() => setStatusFilter('closed')}
          />
          <StatCard
            icon="📈"
            title="转化率"
            value={`${conversionRate}%`}
            subtitle="总计"
            color="purple"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${statusFilter === 'all'
                  ? 'bg-[#738751] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              全部 ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter('new')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${statusFilter === 'new'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              🟡 新询价 ({stats.new})
            </button>
            <button
              onClick={() => setStatusFilter('quoted')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${statusFilter === 'quoted'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              🔵 已报价 ({stats.quoted})
            </button>
            <button
              onClick={() => setStatusFilter('closed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${statusFilter === 'closed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              🟢 已关闭 ({stats.closed})
            </button>
          </div>
        </div>

        {/* Quotes Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    窗户配置
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      {statusFilter === 'all' ? '暂无询价记录' : `暂无${statusFilter === 'new' ? '新' : statusFilter === 'quoted' ? '已报价的' : '已关闭的'}询价`}
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        #{quote.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{quote.customer_email}</div>
                        <div className="text-sm text-gray-500">📞 {quote.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {quote.window_type} ({quote.material})
                        </div>
                        <div className="text-sm text-gray-500">
                          {quote.width}" × {quote.height}" × {quote.quantity} · {quote.color}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={quote.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatRelativeTime(quote.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => openUpdateModal(quote)}
                          className="text-[#738751] hover:text-[#5f6f42] font-medium"
                        >
                          更新
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Update Modal */}
      {showUpdateModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              更新询价状态
            </h2>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">询价 ID: #{selectedQuote.id.slice(0, 8)}</p>
              <p className="text-sm text-gray-600">客户: {selectedQuote.customer_email}</p>
            </div>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  状态
                </label>
                <div className="space-y-2">
                  {(['new', 'quoted', 'closed'] as const).map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={updateStatus === status}
                        onChange={(e) => setUpdateStatus(e.target.value as any)}
                        className="text-[#738751] focus:ring-[#738751]"
                      />
                      <StatusBadge status={status} />
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  备注（可选）
                </label>
                <textarea
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#738751] focus:border-transparent outline-none"
                  placeholder="添加备注信息..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowUpdateModal(false)
                  setSelectedQuote(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                取消
              </button>
              <button
                onClick={handleUpdateStatus}
                className="flex-1 px-4 py-2 bg-[#738751] text-white rounded-lg hover:bg-[#5f6f42] transition"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}