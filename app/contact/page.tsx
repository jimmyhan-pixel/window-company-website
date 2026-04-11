'use client'

import { useLanguage } from '@/components/i18n/LanguageProvider'

export default function ContactPage() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const companyAddress = '67 Seabring St, Brooklyn, NY 11231'
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(companyAddress)}&z=16&output=embed`
  const t = isZh
    ? {
      heroTitle: '联系我们',
      heroSubtitle: '无论是住宅还是商用门窗需求，我们都愿意为你提供建议与报价。',
      infoTitle: '联系信息',
      infoDescription: '欢迎随时联系我们获取免费咨询与报价，我们会尽快回复你的问题。',
      address: '地址',
      phone: '电话',
      email: '邮箱',
      hours: '营业时间',
      weekdays: '周一至周五：',
      saturday: '周六：',
      sunday: '周日：',
      closed: '休息',
      quote: '免费获取报价',
    }
    : {
      heroTitle: 'Get In Touch',
      heroSubtitle: "We're here to help with all your window and door needs",
      infoTitle: 'Contact Information',
      infoDescription: "Reach out to us for a free consultation or quote. We're available to answer all your questions.",
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Business Hours',
      weekdays: 'Monday - Friday:',
      saturday: 'Saturday:',
      sunday: 'Sunday:',
      closed: 'Closed',
      quote: 'Get Free Quote',
    }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">{t.heroTitle}</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-gradient-to-b from-white to-[#f7f8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">{t.infoTitle}</h2>
                <p className="text-lg text-gray-600 mb-12">
                  {t.infoDescription}
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#738751] to-[#5a6a42] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t.address}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      67 Seabring St<br />
                      Brooklyn, NY 11231
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#738751] to-[#5a6a42] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t.phone}</h3>
                    <a
                      href="tel:+12125551234"
                      className="text-[#738751] hover:text-[#5a6a42] font-semibold text-lg transition-colors"
                    >
                      (212) 555-1234
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#738751] to-[#5a6a42] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t.email}</h3>
                    <a
                      href="mailto:info@citywindows.com"
                      className="text-[#738751] hover:text-[#5a6a42] font-semibold text-lg transition-colors"
                    >
                      info@citywindows.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#738751] to-[#5a6a42] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t.hours}</h3>
                    <div className="text-gray-600 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t.weekdays}</span>
                        <span className="ml-4">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t.saturday}</span>
                        <span className="ml-4">9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t.sunday}</span>
                        <span className="ml-4 text-red-500 font-semibold">{t.closed}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <button
                  onClick={() => window.location.href = '/quotation'}
                  className="w-full py-5 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 uppercase tracking-wider"
                >
                  {t.quote}
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="bg-white shadow-2xl overflow-hidden h-[600px] border-4 border-gray-100">
                  <iframe
                    src={googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
