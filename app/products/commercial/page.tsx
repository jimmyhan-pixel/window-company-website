'use client'

import Link from 'next/link'
import ManagedProductImage from '@/components/products/ManagedProductImage'
import { useLanguage } from '@/components/i18n/LanguageProvider'

export default function CommercialWindowsPage() {
    const { language } = useLanguage()
    const isZh = language === 'zh'
    const windowStyles = isZh ? [
        {
            id: 'commercial-casement',
            name: '平开窗',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
            description: '适用于办公楼和机构建筑的商用级平开窗系统。',
            features: ['重型五金', '密封性能更好', '开启面积大', '维护便利'],
            specs: ['最大尺寸: 48" x 96"', 'U 值: 0.30', '隔音等级: STC 35', '抗风压: 150 mph']
        },
        {
            id: 'commercial-hopper',
            name: '上悬窗',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
            description: '适用于高层和商业空间的上悬式通风窗方案。',
            features: ['安全通风', '结构紧凑', '密封可靠', '商用级五金'],
            specs: ['最大尺寸: 60" x 48"', 'U 值: 0.32', '隔音等级: STC 33', '抗风压: 140 mph']
        },
        {
            id: 'commercial-awning',
            name: '下悬窗',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
            description: '向外开启的商用下悬窗，在通风的同时兼顾一定挡雨能力。',
            features: ['挡雨通风', '气流更顺畅', '结构耐久', '商用质保'],
            specs: ['最大尺寸: 72" x 48"', 'U 值: 0.31', '隔音等级: STC 34', '抗风压: 145 mph']
        }
    ] : [
        {
            id: 'commercial-casement',
            name: 'Casement',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
            description: 'Commercial-grade casement windows with robust aluminum frames, ideal for office buildings and institutional facilities.',
            features: ['Heavy-duty hinges', 'Superior air sealing', 'Large opening area', 'Easy maintenance access'],
            specs: ['Max size: 48" x 96"', 'U-Factor: 0.30', 'Sound rating: STC 35', 'Wind load: 150 mph']
        },
        {
            id: 'commercial-hopper',
            name: 'Hopper',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
            description: 'Top-hinged commercial hopper windows designed for controlled ventilation in commercial spaces and high-rise buildings.',
            features: ['Secure ventilation', 'Space-efficient design', 'Weather-tight seal', 'Commercial-grade hardware'],
            specs: ['Max size: 60" x 48"', 'U-Factor: 0.32', 'Sound rating: STC 33', 'Wind load: 140 mph']
        },
        {
            id: 'commercial-awning',
            name: 'Awning',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
            description: 'Commercial awning windows that open outward from the bottom, providing ventilation while protecting against rain.',
            features: ['Rain protection', 'Excellent airflow', 'Durable construction', 'Commercial warranty'],
            specs: ['Max size: 72" x 48"', 'U-Factor: 0.31', 'Sound rating: STC 34', 'Wind load: 145 mph']
        }
    ]

    const t = isZh
        ? {
            heroTitle: '商用窗',
            heroSubtitle: '面向办公楼与商业设施的专业级铝合金门窗系统',
            badges: ['3 种窗型可选', '商用级方案', '高性能配置'],
            sectionTitle: '商用窗系统',
            sectionSubtitle: '为商业项目的性能、规范与维护需求而设计',
            featuresTitle: '主要特点',
            specsTitle: '技术参数',
            grade: '商用级',
            quote: '获取报价',
            extraCards: [
                { title: '商用质保', desc: '为商业安装项目提供更完整的质保支持' },
                { title: '符合规范', desc: '满足商业建筑相关标准与规范要求' },
                { title: '安装高效', desc: '尽量减少对商业运营的影响' },
            ],
            back: '返回全部产品',
            ctaTitle: '准备启动你的商业项目？',
            ctaSubtitle: '欢迎联系我们获取定制报价与专业建议',
            ctaPrimary: '申请报价',
            ctaSecondary: '联系我们',
        }
        : {
            heroTitle: 'Commercial Windows',
            heroSubtitle: 'Professional-grade aluminum windows for office buildings and commercial facilities',
            badges: ['3 Styles Available', 'Commercial Grade', 'High Performance'],
            sectionTitle: 'Commercial Window Systems',
            sectionSubtitle: 'Engineered for commercial applications with superior performance',
            featuresTitle: 'Key Features',
            specsTitle: 'Specifications',
            grade: 'Commercial Grade',
            quote: 'Request Quote',
            extraCards: [
                { title: 'Commercial Warranty', desc: 'Comprehensive coverage for commercial installations' },
                { title: 'Building Code Compliant', desc: 'Meets all commercial building standards' },
                { title: 'Fast Installation', desc: 'Minimal disruption to business operations' },
            ],
            back: 'Back to All Products',
            ctaTitle: 'Ready for Your Commercial Project?',
            ctaSubtitle: 'Contact us for a custom quote and professional consultation',
            ctaPrimary: 'Request Quote',
            ctaSecondary: 'Contact Us',
        }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-[#6b2d5c] via-[#5a2550] to-[#4a1d42] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">{t.heroTitle}</h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
                            {t.heroSubtitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            {t.badges.map((badge) => (
                                <span key={badge} className="px-4 py-2 bg-white/20 rounded-full">{badge}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Window Styles Grid */}
            <section className="py-24 bg-gradient-to-b from-white to-[#f7f8f3]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t.sectionTitle}
                        </h2>
                        <p className="text-xl text-gray-600">
                            {t.sectionSubtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {windowStyles.map((style, index) => (
                            <div key={index} className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <ManagedProductImage
                                        productId={style.id}
                                        fallbackSrc={style.image}
                                        alt={style.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-2xl font-bold text-white">{style.name}</h3>
                                        <span className="inline-block mt-2 px-3 py-1 bg-[#6b2d5c] text-white text-xs font-semibold rounded-full">
                                            {t.grade}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 mb-4 leading-relaxed">{style.description}</p>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-bold text-gray-900 mb-2">{t.featuresTitle}</h4>
                                        <ul className="space-y-2">
                                            {style.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-700">
                                                    <svg className="w-4 h-4 text-[#6b2d5c] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                                        <h4 className="text-xs font-bold text-gray-900 mb-2">{t.specsTitle}</h4>
                                        <div className="space-y-1 text-xs text-gray-600">
                                            {style.specs.map((spec, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <svg className="w-3 h-3 text-[#6b2d5c] mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    {spec}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href="/quotation"
                                        className="block text-center px-6 py-3 bg-[#6b2d5c] text-white font-semibold hover:bg-[#5a2550] transition-all duration-300 uppercase tracking-wider text-sm"
                                    >
                                        {t.quote}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Features */}
                    <div className="mt-20 grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#6b2d5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.extraCards[0].title}</h3>
                            <p className="text-gray-600">{t.extraCards[0].desc}</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#6b2d5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.extraCards[1].title}</h3>
                            <p className="text-gray-600">{t.extraCards[1].desc}</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#6b2d5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.extraCards[2].title}</h3>
                            <p className="text-gray-600">{t.extraCards[2].desc}</p>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="text-center mt-16">
                        <Link
                            href="/#products"
                            className="inline-flex items-center px-8 py-4 bg-white text-[#6b2d5c] font-semibold border-2 border-[#6b2d5c] hover:bg-[#6b2d5c] hover:text-white transition-all duration-300 uppercase tracking-wider shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t.back}
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#6b2d5c] via-[#5a2550] to-[#4a1d42] text-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {t.ctaTitle}
                    </h2>
                    <p className="text-xl mb-8 text-gray-200">
                        {t.ctaSubtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/quotation"
                            className="px-10 py-4 bg-white text-[#6b2d5c] font-bold hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider"
                        >
                            {t.ctaPrimary}
                        </Link>
                        <Link
                            href="/contact"
                            className="px-10 py-4 bg-transparent text-white font-bold border-2 border-white hover:bg-white hover:text-[#6b2d5c] transition-all duration-300 uppercase tracking-wider"
                        >
                            {t.ctaSecondary}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
