import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
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
              Premium Quality Windows & Doors for Your Home and Business
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/quotation"
                className="group px-10 py-5 bg-[#738751] text-white text-lg font-semibold rounded-none hover:bg-[#5a6a42] transition-all duration-300 shadow-2xl hover:shadow-[#738751]/50 hover:scale-105 uppercase tracking-wider"
              >
                Get Free Quote
                <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 bg-transparent text-white text-lg font-semibold rounded-none border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-wider"
              >
                Contact Us
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">High-quality materials and expert craftsmanship in every window</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-[#738751]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Energy Efficient</h3>
              <p className="text-gray-600 leading-relaxed">Save on energy costs with our advanced window technology</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-[#738751]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Installation</h3>
              <p className="text-gray-600 leading-relaxed">Professional installation with minimal disruption to your home</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Modern Grid */}
      <section id="products" className="py-24 bg-gradient-to-b from-white to-[#f7f8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our premium selection of windows for every need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Vinyl Windows */}
            <div className="group relative overflow-hidden bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-lg">
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* 替换为你自己的图片：将 src 改为 "/images/products/vinyl-windows.jpg" */}
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                  alt="Vinyl Windows"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">Vinyl Windows</h3>
                  <p className="text-sm text-gray-200">Residential · Energy Efficient</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Energy efficient & low maintenance</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>9 window styles available</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Cost-effective solution</span>
                  </li>
                </ul>
                <Link
                  href="/products/vinyl"
                  className="block text-center px-6 py-3 bg-[#738751] text-white font-semibold hover:bg-[#5a6a42] transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Aluminum Residential Windows */}
            <div className="group relative overflow-hidden bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-lg">
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* 替换为你自己的图片：将 src 改为 "/images/products/aluminum-windows.jpg" */}
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop"
                  alt="Aluminum Windows"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">Aluminum Windows</h3>
                  <p className="text-sm text-gray-200">Residential · Premium Quality</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Durable & modern design</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>3 color choices available</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Slim frames, maximum light</span>
                  </li>
                </ul>
                <Link
                  href="/products/aluminum"
                  className="block text-center px-6 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Commercial Aluminum Windows */}
            <div className="group relative overflow-hidden bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-lg">
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* 替换为你自己的图片：将 src 改为 "/images/products/commercial-windows.jpg" */}
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="Commercial Windows"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">Commercial Windows</h3>
                  <p className="text-sm text-gray-200">Office Buildings · Large Scale</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Large-scale curtain walls</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Professional grade soundproofing</span>
                  </li>
                  <li className="flex items-center text-gray-700 text-sm">
                    <svg className="w-5 h-5 text-[#738751] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Meets commercial standards</span>
                  </li>
                </ul>
                <Link
                  href="/products/commercial"
                  className="block text-center px-6 py-3 bg-[#6b2d5c] text-white font-semibold hover:bg-[#5a2550] transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  Learn More
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
            Ready to Transform Your Space?
          </h2>
          <p className="text-2xl mb-12 text-gray-200 leading-relaxed">
            Get a custom quote in minutes. Professional service, competitive pricing.
          </p>
          <Link
            href="/quotation"
            className="inline-block px-12 py-6 bg-white text-[#738751] text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 uppercase tracking-wider"
          >
            Start Your Quote Now
          </Link>
        </div>
      </section>
    </div>
  )
}