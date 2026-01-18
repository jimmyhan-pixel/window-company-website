'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <span className="text-2xl font-bold text-[#2d2d2d]">
                            Premier<span className="text-[#738751]">Windows</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-[#738751] font-medium transition-colors relative group"
                        >
                            Products
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#738751] group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/quotation"
                            className="text-gray-700 hover:text-[#738751] font-medium transition-colors relative group"
                        >
                            Get Quote
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#738751] group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-[#738751] font-medium transition-colors relative group"
                        >
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#738751] group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/login"
                            className="px-5 py-2.5 bg-[#738751] text-white rounded-lg hover:bg-[#5a6a42] transition-all font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#738751] hover:bg-[#f7f8f3] transition-colors"
                    >
                        <svg
                            className="h-6 w-6"
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
                    <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
                        <Link
                            href="/"
                            className="block px-4 py-2.5 text-gray-700 hover:bg-[#f7f8f3] hover:text-[#738751] rounded-lg transition-colors font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            href="/quotation"
                            className="block px-4 py-2.5 text-gray-700 hover:bg-[#f7f8f3] hover:text-[#738751] rounded-lg transition-colors font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Get Quote
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-4 py-2.5 text-gray-700 hover:bg-[#f7f8f3] hover:text-[#738751] rounded-lg transition-colors font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/login"
                            className="block px-4 py-2.5 bg-[#738751] text-white rounded-lg hover:bg-[#5a6a42] text-center font-medium shadow-md transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}