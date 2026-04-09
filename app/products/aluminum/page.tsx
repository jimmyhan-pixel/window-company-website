'use client'

import Link from 'next/link'
import ManagedProductImage from '@/components/products/ManagedProductImage'
import { useLanguage } from '@/components/i18n/LanguageProvider'

export default function AluminumWindowsPage() {
    const { language } = useLanguage()
    const isZh = language === 'zh'
    const windowStyles = isZh ? [
        {
            id: 'aluminum-double-hung',
            name: '双悬窗',
            image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
            description: '高端住宅适用的铝合金双悬窗，兼具耐久与现代感。',
            features: ['窄边框设计', '采光更充足', '耐候耐用', '外观简洁']
        },
        {
            id: 'aluminum-two-lites-slider',
            name: '双扇推拉窗',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
            description: '推拉顺滑、线条简洁，适合现代住宅项目。',
            features: ['开启轻便', '视线更通透', '结构耐用', '维护方便']
        },
        {
            id: 'aluminum-three-lites-slider',
            name: '三扇推拉窗',
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
            description: '三联布局兼顾采光与通风，适合大开口空间。',
            features: ['通风灵活', '玻璃视野大', '型材稳固', '风格现代']
        },
        {
            id: 'aluminum-picture',
            name: '固定窗',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
            description: '超窄边框固定窗，适合强调景观和采光的区域。',
            features: ['边框更细', '视野无遮挡', '性能稳定', '立面简洁']
        }
    ] : [
        {
            id: 'aluminum-double-hung',
            name: 'Double Hung',
            image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
            description: 'Premium aluminum double hung windows with sleek frames and superior durability for modern homes.',
            features: ['Slim aluminum frames', 'Maximum light transmission', 'Weather-resistant', 'Modern aesthetics']
        },
        {
            id: 'aluminum-two-lites-slider',
            name: 'Two Lites Slider',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
            description: 'Smooth-operating aluminum sliding windows with minimal frame obstruction and contemporary design.',
            features: ['Effortless operation', 'Narrow sightlines', 'Durable construction', 'Easy maintenance']
        },
        {
            id: 'aluminum-three-lites-slider',
            name: 'Three Lites Slider',
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
            description: 'Triple-panel aluminum slider offering versatile opening configurations and expansive views.',
            features: ['Flexible ventilation', 'Panoramic glazing', 'Robust aluminum', 'Contemporary style']
        },
        {
            id: 'aluminum-picture',
            name: 'Picture Window',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
            description: 'Fixed aluminum picture window with ultra-slim frames for uninterrupted views and maximum daylight.',
            features: ['Minimal frame profile', 'Unobstructed views', 'High performance', 'Architectural elegance']
        }
    ]

    const t = isZh
        ? {
            heroTitle: '铝合金窗',
            heroSubtitle: '面向住宅项目的高品质铝合金门窗方案',
            badges: ['4 种窗型可选', '窄边框设计', '3 种颜色'],
            sectionTitle: '可选窗型',
            sectionSubtitle: '适合现代住宅空间的铝合金窗型组合',
            colorsTitle: '可选颜色',
            colors: [
                { name: '白色', desc: '经典耐看' },
                { name: '古铜色', desc: '温润沉稳' },
                { name: '黑色', desc: '现代利落' },
            ],
            quote: '获取报价',
            back: '返回全部产品',
            ctaTitle: '用铝合金窗提升住宅质感',
            ctaSubtitle: '现在就为你的铝合金窗项目获取定制报价',
            ctaPrimary: '开始报价',
            ctaSecondary: '联系我们',
        }
        : {
            heroTitle: 'Aluminum Windows',
            heroSubtitle: 'Premium quality aluminum windows for residential applications',
            badges: ['4 Styles Available', 'Slim Frames', '3 Colors'],
            sectionTitle: 'Available Styles',
            sectionSubtitle: 'Modern aluminum windows designed for residential excellence',
            colorsTitle: 'Available Colors',
            colors: [
                { name: 'White', desc: 'Classic and timeless' },
                { name: 'Bronze', desc: 'Warm and elegant' },
                { name: 'Black', desc: 'Modern and bold' },
            ],
            quote: 'Get Quote',
            back: 'Back to All Products',
            ctaTitle: 'Elevate Your Home with Aluminum',
            ctaSubtitle: 'Get a custom quote for your aluminum window project today',
            ctaPrimary: 'Start Your Quote',
            ctaSecondary: 'Contact Us',
        }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXRoZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
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
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 mb-4 leading-relaxed">{style.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {style.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-gray-700">
                                                <svg className="w-4 h-4 text-[#738751] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/quotation"
                                        className="block text-center px-6 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-sm"
                                    >
                                        {t.quote}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Color Options */}
                    <div className="mt-20 bg-white rounded-lg shadow-xl p-8">
                        <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">{t.colorsTitle}</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                                <div className="w-20 h-20 bg-white border-4 border-gray-300 rounded-full mx-auto mb-4 shadow-lg"></div>
                                <h4 className="text-xl font-bold text-gray-900">{t.colors[0].name}</h4>
                                <p className="text-gray-600 text-sm mt-2">{t.colors[0].desc}</p>
                            </div>
                            <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                                <div className="w-20 h-20 bg-[#8B4513] rounded-full mx-auto mb-4 shadow-lg"></div>
                                <h4 className="text-xl font-bold text-gray-900">{t.colors[1].name}</h4>
                                <p className="text-gray-600 text-sm mt-2">{t.colors[1].desc}</p>
                            </div>
                            <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                                <div className="w-20 h-20 bg-black rounded-full mx-auto mb-4 shadow-lg"></div>
                                <h4 className="text-xl font-bold text-gray-900">{t.colors[2].name}</h4>
                                <p className="text-gray-600 text-sm mt-2">{t.colors[2].desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="text-center mt-16">
                        <Link
                            href="/#products"
                            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider shadow-lg"
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
            <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
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
                            className="px-10 py-4 bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider"
                        >
                            {t.ctaPrimary}
                        </Link>
                        <Link
                            href="/contact"
                            className="px-10 py-4 bg-transparent text-white font-bold border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-wider"
                        >
                            {t.ctaSecondary}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
