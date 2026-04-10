'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/components/i18n/LanguageProvider'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { language, setLanguage } = useLanguage()
    const isZh = language === 'zh'

    const navLabels = isZh
        ? {
            products: '产品',
            quote: '在线报价',
            contact: '联系我们',
            dashboard: '后台',
            switchTo: 'EN',
        }
        : {
            products: 'Products',
            quote: 'Get Quote',
            contact: 'Contact',
            dashboard: 'Dashboard',
            switchTo: '中文',
        }

    return (
        <nav className="bg-white/98 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <span className="text-2xl font-bold text-[#2d2d2d] tracking-tight">
                            City <span className="text-[#738751] transition-all duration-300 group-hover:text-[#5a6a42]">Windows</span>
                            <span className="text-lg text-gray-500 ml-2">/ 华美门窗</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/"
                            className="px-4 py-2 text-gray-700 hover:text-[#738751] font-medium transition-all duration-300 relative group rounded-lg hover:bg-[#f7f8f3]/50"
                        >
                            {navLabels.products}
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#738751] group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                        </Link>
                        <Link
                            href="/quotation"
                            className="px-4 py-2 text-gray-700 hover:text-[#738751] font-medium transition-all duration-300 relative group rounded-lg hover:bg-[#f7f8f3]/50"
                        >
                            {navLabels.quote}
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#738751] group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                        </Link>
                        <Link
                            href="/contact"
                            className="px-4 py-2 text-gray-700 hover:text-[#738751] font-medium transition-all duration-300 relative group rounded-lg hover:bg-[#f7f8f3]/50"
                        >
                            {navLabels.contact}
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#738751] group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                        </Link>
                        <div className="ml-2 flex items-center rounded-lg border border-gray-200 bg-white p-1">
                            <button
                                type="button"
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${language === 'en'
                                    ? 'bg-[#738751] text-white'
                                    : 'text-gray-600 hover:text-[#738751]'
                                    }`}
                            >
                                EN
                            </button>
                            <button
                                type="button"
                                onClick={() => setLanguage('zh')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${language === 'zh'
                                    ? 'bg-[#738751] text-white'
                                    : 'text-gray-600 hover:text-[#738751]'
                                    }`}
                            >
                                中文
                            </button>
                        </div>
                        <Link
                            href="/dashboard/login"
                            className="ml-3 px-6 py-2.5 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium hover:-translate-y-0.5 hover:shadow-[#738751]/30"
                        >
                            {navLabels.dashboard}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:text-[#738751] hover:bg-[#f7f8f3] transition-all duration-300"
                    >
                        <svg
                            className="h-6 w-6 transition-transform duration-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-1 border-t border-gray-100 animate-fade-in">
                        <Link
                            href="/"
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f7f8f3] hover:to-transparent hover:text-[#738751] rounded-lg transition-all duration-300 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {navLabels.products}
                        </Link>
                        <Link
                            href="/quotation"
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f7f8f3] hover:to-transparent hover:text-[#738751] rounded-lg transition-all duration-300 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {navLabels.quote}
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f7f8f3] hover:to-transparent hover:text-[#738751] rounded-lg transition-all duration-300 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {navLabels.contact}
                        </Link>
                        <button
                            type="button"
                            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                            className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-[#f7f8f3] hover:to-transparent hover:text-[#738751] rounded-lg transition-all duration-300 font-medium"
                        >
                            {navLabels.switchTo}
                        </button>
                        <Link
                            href="/dashboard/login"
                            className="block px-4 py-3 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white rounded-lg text-center font-medium shadow-md transition-all duration-300 hover:shadow-lg mt-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {navLabels.dashboard}
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}
