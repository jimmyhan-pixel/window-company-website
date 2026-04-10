'use client'

import Link from 'next/link'
import ManagedProductImage from '@/components/products/ManagedProductImage'
import { useLanguage } from '@/components/i18n/LanguageProvider'

export default function VinylWindowsPage() {
    const { language } = useLanguage()
    const isZh = language === 'zh'
    const windowStyles = isZh ? [
        {
            id: 'vinyl-double-hung',
            name: '双悬窗',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
            description: '经典双扇上下开启设计，适合传统与现代住宅。',
            features: ['便于清洁', '通风表现好', '节能保温', '风格经典']
        },
        {
            id: 'vinyl-two-lites-slider',
            name: '双扇推拉窗',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
            description: '横向顺滑推拉，适合较宽开口和现代空间。',
            features: ['节省空间', '开启轻松', '视野开阔', '维护简单']
        },
        {
            id: 'vinyl-three-lites-slider',
            name: '三扇推拉窗',
            image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
            description: '三联扇布局，兼顾采光、通风和大视野。',
            features: ['开启更灵活', '通风更强', '视野更宽', '现代感强']
        },
        {
            id: 'vinyl-picture',
            name: '固定窗',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
            description: '以最大化采光与景观为重点的固定窗型。',
            features: ['视野无遮挡', '采光极佳', '保温节能', '立面更出彩']
        },
        {
            id: 'vinyl-casement',
            name: '平开窗',
            image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
            description: '侧开式窗扇，通风好，视野完整。',
            features: ['通风效果强', '操作顺手', '闭合更严密', '造型现代']
        },
        {
            id: 'vinyl-hopper',
            name: '上悬窗',
            image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
            description: '常用于地下室和卫浴空间，结构紧凑实用。',
            features: ['节省空间', '安全通风', '便于清洁', '耐候性好']
        },
        {
            id: 'vinyl-awning',
            name: '下悬窗',
            image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop',
            description: '向外上掀式开启，下雨时也可保持一定通风。',
            features: ['挡雨通风', '空气流通好', '节能性佳', '安装灵活']
        },
        {
            id: 'vinyl-bow',
            name: '弓形窗',
            image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
            description: '弧形组合增强空间层次，打造更柔和的外立面。',
            features: ['曲线优雅', '视野宽广', '增加空间感', '立面辨识度高']
        },
        {
            id: 'vinyl-bay',
            name: '凸窗',
            image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop',
            description: '向外凸出的窗体设计，兼顾采光与空间延展。',
            features: ['增加室内空间', '多角度采光', '自然光丰富', '经典耐看']
        }
    ] : [
        {
            id: 'vinyl-double-hung',
            name: 'Double Hung',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
            description: 'Classic design with two operable sashes that slide vertically. Perfect for traditional and contemporary homes.',
            features: ['Easy to clean', 'Excellent ventilation', 'Energy efficient', 'Timeless style']
        },
        {
            id: 'vinyl-two-lites-slider',
            name: 'Two Lites Slider',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
            description: 'Horizontal sliding windows with smooth operation. Ideal for wide openings and modern aesthetics.',
            features: ['Space-saving design', 'Easy operation', 'Wide viewing area', 'Low maintenance']
        },
        {
            id: 'vinyl-three-lites-slider',
            name: 'Three Lites Slider',
            image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
            description: 'Triple-panel sliding window offering maximum flexibility and natural light.',
            features: ['Multiple opening options', 'Enhanced ventilation', 'Panoramic views', 'Modern appeal']
        },
        {
            id: 'vinyl-picture',
            name: 'Picture Window',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
            description: 'Fixed window designed to frame your view and maximize natural light without ventilation.',
            features: ['Unobstructed views', 'Maximum light', 'Energy efficient', 'Architectural focal point']
        },
        {
            id: 'vinyl-casement',
            name: 'Casement',
            image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
            description: 'Side-hinged windows that open outward, providing excellent ventilation and unobstructed views.',
            features: ['Superior ventilation', 'Easy to operate', 'Tight seal', 'Contemporary look']
        },
        {
            id: 'vinyl-hopper',
            name: 'Hopper',
            image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
            description: 'Top-hinged window that opens inward from the bottom, perfect for basements and bathrooms.',
            features: ['Space-efficient', 'Secure ventilation', 'Easy to clean', 'Weather-resistant']
        },
        {
            id: 'vinyl-awning',
            name: 'Awning',
            image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop',
            description: 'Bottom-hinged window that opens outward from the top, allowing ventilation even during rain.',
            features: ['Rain protection', 'Excellent airflow', 'Energy efficient', 'Versatile placement']
        },
        {
            id: 'vinyl-bow',
            name: 'Bow Window',
            image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
            description: 'Curved window configuration creating a panoramic view and additional interior space.',
            features: ['Elegant curves', 'Panoramic views', 'Extra space', 'Architectural beauty']
        },
        {
            id: 'vinyl-bay',
            name: 'Bay Window',
            image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop',
            description: 'Angular projection window that extends outward, creating a cozy nook and enhanced views.',
            features: ['Creates space', 'Multiple angles', 'Natural light', 'Classic elegance']
        }
    ]

    const t = isZh
        ? {
            heroTitle: '塑钢窗',
            heroSubtitle: '适合住宅项目的节能、耐用、易维护门窗解决方案',
            badges: ['9 种窗型可选', '节能高效', '维护省心'],
            sectionTitle: '可选窗型',
            sectionSubtitle: '从常规窗型到特色窗型，满足不同住宅空间需求',
            quote: '获取报价',
            back: '返回全部产品',
            ctaTitle: '准备升级你的窗户了吗？',
            ctaSubtitle: '现在就为你的塑钢窗项目获取定制报价',
            ctaPrimary: '开始报价',
            ctaSecondary: '联系我们',
        }
        : {
            heroTitle: 'Vinyl Windows',
            heroSubtitle: 'Energy-efficient, low-maintenance windows for residential projects',
            badges: ['9 Styles Available', 'Energy Efficient', 'Low Maintenance'],
            sectionTitle: 'Available Styles',
            sectionSubtitle: 'Choose from our comprehensive collection of vinyl window styles',
            quote: 'Get Quote',
            back: 'Back to All Products',
            ctaTitle: 'Ready to Upgrade Your Windows?',
            ctaSubtitle: 'Get a custom quote for your vinyl window project today',
            ctaPrimary: 'Start Your Quote',
            ctaSecondary: 'Contact Us',
        }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-[#738751] via-[#5a6a42] to-[#4a5737] text-white overflow-hidden">
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
                                        className="block text-center px-6 py-3 bg-[#738751] text-white font-semibold hover:bg-[#5a6a42] transition-all duration-300 uppercase tracking-wider text-sm"
                                    >
                                        {t.quote}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Back Button */}
                    <div className="text-center mt-16">
                        <Link
                            href="/#products"
                            className="inline-flex items-center px-8 py-4 bg-white text-[#738751] font-semibold border-2 border-[#738751] hover:bg-[#738751] hover:text-white transition-all duration-300 uppercase tracking-wider shadow-lg"
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
            <section className="py-20 bg-gradient-to-br from-[#738751] via-[#5a6a42] to-[#4a5737] text-white">
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
                            className="px-10 py-4 bg-white text-[#738751] font-bold hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider"
                        >
                            {t.ctaPrimary}
                        </Link>
                        <Link
                            href="/contact"
                            className="px-10 py-4 bg-transparent text-white font-bold border-2 border-white hover:bg-white hover:text-[#738751] transition-all duration-300 uppercase tracking-wider"
                        >
                            {t.ctaSecondary}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
