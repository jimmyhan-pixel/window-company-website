'use client'

import Link from 'next/link'
import ManagedProductImage from '@/components/products/ManagedProductImage'
import { useLanguage } from '@/components/i18n/LanguageProvider'

export default function Home() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const t = isZh
    ? {
      heroTitle: '高品质门窗解决方案',
      heroSubtitle: '住宅与商业空间的高品质门窗与入户系统',
      quote: '免费获取报价',
      contact: '联系我们',
      features: [
        {
          title: '品质出众',
          description: '精选材料与专业工艺，打造每一扇值得长期使用的门窗。',
        },
        {
          title: '节能高效',
          description: '升级隔热与密封性能，帮助你降低能耗并提升舒适度。',
        },
        {
          title: '安装高效',
          description: '经验丰富的安装团队，尽量减少对家庭和工地的打扰。',
        },
      ],
      collectionsTitle: '产品系列',
      collectionsSubtitle: '探索适合住宅与商业项目的精选门窗方案',
      homeProducts: [
        {
          title: '塑钢窗',
          description: '住宅用 · 节能耐用',
          bullets: ['保温节能，维护省心', '提供 9 种窗型选择', '性价比高'],
          cta: '了解更多',
        },
        {
          title: '铝合金窗',
          description: '住宅用 · 现代质感',
          bullets: ['结构稳固，外观简洁', '支持 3 种颜色', '窄边框采光更佳'],
          cta: '了解更多',
        },
        {
          title: '商用窗',
          description: '办公建筑 · 大型项目',
          bullets: ['适合幕墙和大型开口', '专业级隔音表现', '满足商用标准'],
          cta: '了解更多',
        },
      ],
      ctaTitle: '准备升级你的空间了吗？',
      ctaSubtitle: '几分钟内获取定制报价，专业服务，价格透明。',
      ctaButton: '立即开始报价',
    }
    : {
      heroTitle: 'Premium Quality Windows & Doors',
      heroSubtitle: 'Premium quality windows and entry systems for homes and businesses',
      quote: 'Get Free Quote',
      contact: 'Contact Us',
      features: [
        {
          title: 'Premium Quality',
          description: 'High-quality materials and expert craftsmanship in every window',
        },
        {
          title: 'Energy Efficient',
          description: 'Save on energy costs with our advanced window technology',
        },
        {
          title: 'Fast Installation',
          description: 'Professional installation with minimal disruption to your home',
        },
      ],
      collectionsTitle: 'Our Collections',
      collectionsSubtitle: 'Explore our premium selection of windows for every need',
      homeProducts: [
        {
          title: 'Vinyl Windows',
          description: 'Residential · Energy Efficient',
          bullets: ['Energy efficient & low maintenance', '9 window styles available', 'Cost-effective solution'],
          cta: 'Learn More',
        },
        {
          title: 'Aluminum Windows',
          description: 'Residential · Premium Quality',
          bullets: ['Durable & modern design', '3 color choices available', 'Slim frames, maximum light'],
          cta: 'Learn More',
        },
        {
          title: 'Commercial Windows',
          description: 'Office Buildings · Large Scale',
          bullets: ['Large-scale curtain walls', 'Professional grade soundproofing', 'Meets commercial standards'],
          cta: 'Learn More',
        },
      ],
      ctaTitle: 'Ready to Transform Your Space?',
      ctaSubtitle: 'Get a custom quote in minutes. Professional service, competitive pricing.',
      ctaButton: 'Start Your Quote Now',
    }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen with Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
              City <span className="text-[#a8b887]">Windows</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">华美门窗</p>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.heroTitle}
              <span className="block mt-3 text-lg md:text-xl text-gray-400 font-normal">
                {t.heroSubtitle}
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/quotation"
                className="group px-10 py-5 bg-[#738751] text-white text-lg font-semibold rounded-none hover:bg-[#5a6a42] transition-all duration-300 shadow-2xl hover:shadow-[#738751]/50 hover:scale-105 uppercase tracking-wider"
              >
                {t.quote}
                <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 bg-transparent text-white text-lg font-semibold rounded-none border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-wider"
              >
                {t.contact}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-[#738751]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.features[0].title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.features[0].description}</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-[#738751]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.features[1].title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.features[1].description}</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-[#738751]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.features[2].title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.features[2].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Modern Grid */}
      <section id="products" className="py-24 bg-gradient-to-b from-white to-[#f7f8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.collectionsTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.collectionsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Vinyl Windows */}
            <div className="group relative overflow-hidden bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-lg">
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* 替换为你自己的图片：将 src 改为 "/images/products/vinyl-windows.jpg" */}
                <ManagedProductImage
                  productId="home-vinyl"
                  fallbackSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                  alt="Vinyl Windows"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{t.homeProducts[0].title}</h3>
                  <p className="text-sm text-gray-200">{t.homeProducts[0].description}</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homeProducts[0].bullets[0]}</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homeProducts[0].bullets[1]}</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homeProducts[0].bullets[2]}</span>
                  </li>
                </ul>
                <Link
                  href="/products/vinyl"
                  className="block text-center px-6 py-3 bg-[#738751] text-white font-semibold hover:bg-[#5a6a42] transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  {t.homeProducts[0].cta}
                </Link>
              </div>
            </div>

            {/* Aluminum Residential Windows */}
            <div className="group relative overflow-hidden bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-lg">
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* 替换为你自己的图片：将 src 改为 "/images/products/aluminum-windows.jpg" */}
                <ManagedProductImage
                  productId="home-aluminum"
                  fallbackSrc="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop"
                  alt="Aluminum Windows"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{t.homeProducts[1].title}</h3>
                  <p className="text-sm text-gray-200">{t.homeProducts[1].description}</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homeProducts[1].bullets[0]}</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homeProducts[1].bullets[1]}</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homeProducts[1].bullets[2]}</span>
                  </li>
                </ul>
                <Link
                  href="/products/aluminum"
                  className="block text-center px-6 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  {t.homeProducts[1].cta}
                </Link>
              </div>
            </div>

            {/* Commercial Aluminum Windows */}
            <div className="group relative overflow-hidden bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-lg">
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* 替换为你自己的图片：将 src 改为 "/images/products/commercial-windows.jpg" */}
                <ManagedProductImage
                  productId="home-commercial"
                  fallbackSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="Commercial Windows"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{t.homeProducts[2].title}</h3>
                  <p className="text-sm text-gray-200">{t.homeProducts[2].description}</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homeProducts[2].bullets[0]}</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homeProducts[2].bullets[1]}</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homeProducts[2].bullets[2]}</span>
                  </li>
                </ul>
                <Link
                  href="/products/commercial"
                  className="block text-center px-6 py-3 bg-[#6b2d5c] text-white font-semibold hover:bg-[#5a2550] transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  {t.homeProducts[2].cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#738751] via-[#5a6a42] to-[#4a5737] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            {t.ctaTitle}
          </h2>
          <p className="text-2xl mb-12 text-gray-200 leading-relaxed">
            {t.ctaSubtitle}
          </p>
          <Link
            href="/quotation"
            className="inline-block px-12 py-6 bg-white text-[#738751] text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 uppercase tracking-wider"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  )
}
