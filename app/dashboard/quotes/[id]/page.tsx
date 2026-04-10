'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useLanguage } from '@/components/i18n/LanguageProvider'
import { WINDOW_COMPONENTS } from '@/components/window-preview'
import type { ParsedQuoteItem, QuotationDetail } from '@/lib/dashboard-quotations'

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 border-b border-gray-200 py-2">
      <dt className="text-[13px] font-semibold text-gray-700">{label}</dt>
      <dd className="text-[13px] leading-5 text-gray-900">{value || '-'}</dd>
    </div>
  )
}

function ItemPreview({ item }: { item: ParsedQuoteItem }) {
  const WindowComponent = WINDOW_COMPONENTS[item.previewWindowType]

  if (!WindowComponent) {
    return (
      <div className="text-sm text-gray-500">
        {item.displayWindowType}
      </div>
    )
  }

  return (
    <WindowComponent
      frameColor={item.frameColor}
      grids={item.parsedGrids}
      showGlass={true}
      className="h-full w-full max-h-[180px] max-w-[180px]"
      casementDesign={item.casementDesign}
      casementOpenDirection={item.casementOpenDirection}
    />
  )
}

function ItemSection({
  item,
  index,
  labels,
}: {
  item: ParsedQuoteItem
  index: number
  labels: {
    item: string
    material: string
    category: string
    windowType: string
    size: string
    color: string
    grids: string
    quantity: string
  }
}) {
  return (
    <section className="print-item py-5 border-b border-gray-200 last:border-b-0">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{labels.item} {index + 1}</h3>
      <div className="print-item-layout grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] items-start">
        <div className="print-preview min-h-[180px] flex items-center justify-center rounded-lg border border-gray-200 bg-white p-4">
          <ItemPreview item={item} />
        </div>
        <dl className="print-detail-list">
          <DetailRow label={labels.material} value={item.material} />
          <DetailRow label={labels.category} value={item.aluminum_category || '-'} />
          <DetailRow label={labels.windowType} value={item.displayWindowType} />
          <DetailRow label={labels.grids} value={item.grids || '-'} />
          <DetailRow label={labels.color} value={item.color} />
          <DetailRow label={labels.size} value={`${item.width}" × ${item.height}"`} />
          <DetailRow label={labels.quantity} value={String(item.quantity)} />
        </dl>
      </div>
    </section>
  )
}

export default function DashboardQuoteDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const [quotation, setQuotation] = useState<QuotationDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const t = isZh
    ? {
      loading: '加载中...',
      notFound: '未找到该询价记录',
      back: '返回 Dashboard',
      print: '打印',
      quoteDetails: 'Quotation Detail',
      customerInfo: 'Customer Info',
      customerName: 'Customer Name',
      customerEmail: 'Customer Email',
      customerPhone: 'Customer Phone',
      projectAddress: 'Project Address',
      submittedAt: 'Submitted',
      item: 'Item',
      material: 'Material',
      category: 'Category',
      windowType: 'Window Type',
      size: 'Size',
      color: 'Color',
      grids: 'Grids',
      quantity: 'Quantity',
      ungrouped: 'Ungrouped Windows',
    }
    : {
      loading: 'Loading...',
      notFound: 'Quote not found',
      back: 'Back to Dashboard',
      print: 'Print',
      quoteDetails: 'Quotation Detail',
      customerInfo: 'Customer Info',
      customerName: 'Customer Name',
      customerEmail: 'Customer Email',
      customerPhone: 'Customer Phone',
      projectAddress: 'Project Address',
      submittedAt: 'Submitted',
      item: 'Item',
      material: 'Material',
      category: 'Category',
      windowType: 'Window Type',
      size: 'Size',
      color: 'Color',
      grids: 'Grids',
      quantity: 'Quantity',
      ungrouped: 'Ungrouped Windows',
    }

  useEffect(() => {
    const loadQuotation = async () => {
      try {
        const authResponse = await fetch('/api/auth/check', { cache: 'no-store' })
        const authData = await authResponse.json()

        if (!authData.isLoggedIn) {
          router.push('/dashboard/login')
          return
        }

        const response = await fetch(`/api/dashboard/quotes/${params.id}`, { cache: 'no-store' })
        const data = await response.json()

        if (!response.ok) {
          setQuotation(null)
          return
        }

        setQuotation(data.quotation || null)
      } catch (error) {
        console.error('Quote detail page error:', error)
        setQuotation(null)
      } finally {
        setLoading(false)
      }
    }

    void loadQuotation()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8F3]">
        <p className="text-gray-600">{t.loading}</p>
      </div>
    )
  }

  if (!quotation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8F3]">
        <div className="text-center">
          <p className="text-gray-700 mb-4">{t.notFound}</p>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 rounded-lg bg-[#738751] text-white"
          >
            {t.back}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F8F3] print:bg-white">
      <style jsx global>{`
        @page {
          size: auto;
          margin: 8mm;
        }

        @media print {
          .print-hidden {
            display: none !important;
          }

          body {
            background: #ffffff !important;
          }

          .print-shell {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .print-page {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
          }

          .print-section,
          .print-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .print-item {
            margin-bottom: 12px;
          }

          .print-item-layout {
            display: grid !important;
            grid-template-columns: 180px minmax(0, 1fr) !important;
            gap: 16px !important;
            align-items: start !important;
          }

          .print-preview {
            min-height: 180px !important;
            height: 180px !important;
            background: #ffffff !important;
            border-color: #d1d5db !important;
          }

          .print-detail-list {
            margin-top: 0 !important;
          }
        }
      `}</style>

      <header className="bg-white border-b border-gray-200 print-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.quoteDetails}</h1>
            <p className="text-sm text-gray-600">#{quotation.quoteNumber}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              {t.back}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 text-sm rounded-lg bg-[#738751] text-white hover:bg-[#5f7241] transition"
            >
              {t.print}
            </button>
          </div>
        </div>
      </header>

      <main className="print-shell max-w-[8.2in] mx-auto px-4 sm:px-6 lg:px-8 py-6 print:px-0 print:py-0">
        <div className="print-page bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="mb-8 print-section">
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[30px] font-bold text-gray-900 leading-none">#{quotation.quoteNumber}</h2>
                <p className="text-xs text-gray-500 mt-2">
                  {t.submittedAt}: {new Date(quotation.createdAt).toLocaleString(isZh ? 'zh-CN' : 'en-US')}
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-[28px] font-semibold text-gray-900 mb-4">{t.customerInfo}</h2>
              <dl>
                <DetailRow label={t.customerName} value={quotation.customerName || '-'} />
                <DetailRow label={t.customerEmail} value={quotation.customerEmail || '-'} />
                <DetailRow label={t.customerPhone} value={quotation.customerPhone || '-'} />
                <DetailRow label={t.projectAddress} value={quotation.projectAddress || '-'} />
              </dl>
            </section>
          </div>

          {quotation.groups.map((group) => (
            <section key={group.name} className="mb-8 print-section">
              <h2 className="text-[28px] font-semibold text-gray-900 mb-2">{group.name}</h2>
              {group.items.map((item, index) => (
                <ItemSection
                  key={item.id}
                  item={item}
                  index={index}
                  labels={t}
                />
              ))}
            </section>
          ))}

          {quotation.ungroupedItems.length > 0 && (
            <section className="mb-8 print-section">
              <h2 className="text-[28px] font-semibold text-gray-900 mb-2">{t.ungrouped}</h2>
              {quotation.ungroupedItems.map((item, index) => (
                <ItemSection
                  key={item.id}
                  item={item}
                  index={index}
                  labels={t}
                />
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
