import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f8f3] to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-[#eef0e6] text-[#5a6a42] text-sm font-medium rounded-full">
              Premium Window Solutions
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#2d2d2d] mb-6 leading-tight">
            Transform Your Home with
            <br />
            <span className="text-[#738751]">Exceptional Windows</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Quality vinyl and aluminum windows for residential and commercial projects in New York.
            Custom sizes, professional installation, competitive pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/quotation"
              className="group px-8 py-4 bg-[#738751] text-white text-lg font-semibold rounded-xl hover:bg-[#5a6a42] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Free Quote
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-[#738751] text-lg font-semibold rounded-xl border-2 border-[#738751] hover:bg-[#f7f8f3] transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-4">
            Our Window Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our premium selection of vinyl and aluminum windows
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vinyl Windows */}
          <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="h-72 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMTUsIDEzNSwgODEsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>
              <div className="text-center relative z-10">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">🪟</div>
                <h3 className="text-3xl font-bold text-[#2d2d2d]">Vinyl Windows</h3>
              </div>
            </div>
            <div className="p-8">
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#738751] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">Energy efficient & low maintenance</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#738751] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">9 window styles available</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#738751] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">Perfect for residential projects</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#738751] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">Cost-effective solution</span>
                </li>
              </ul>
              <Link
                href="/quotation"
                className="block text-center px-6 py-4 bg-[#738751] text-white font-semibold rounded-xl hover:bg-[#5a6a42] transition-all shadow-md hover:shadow-lg"
              >
                Configure Vinyl Window
              </Link>
            </div>
          </div>

          {/* Aluminum Windows */}
          <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="h-72 bg-gradient-to-br from-[#e5e7eb] to-[#d1d5db] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg0NSwgNDUsIDQ1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
              <div className="text-center relative z-10">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">🏢</div>
                <h3 className="text-3xl font-bold text-[#2d2d2d]">Aluminum Windows</h3>
              </div>
            </div>
            <div className="p-8">
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#738751] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">Durable & modern design</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#738751] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">Residential & commercial options</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#738751] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">3 color choices available</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#738751] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">Slim frames, maximum light</span>
                </li>
              </ul>
              <Link
                href="/quotation"
                className="block text-center px-6 py-4 bg-[#2d2d2d] text-white font-semibold rounded-xl hover:bg-[#1a1a1a] transition-all shadow-md hover:shadow-lg"
              >
                Configure Aluminum Window
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#738751] to-[#5a6a42] text-white py-20 mt-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Upgrade Your Windows?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-[#eef0e6] leading-relaxed">
            Get a custom quote in minutes. No commitment required.
          </p>
          <Link
            href="/quotation"
            className="inline-block px-10 py-5 bg-white text-[#738751] text-lg font-semibold rounded-xl hover:bg-[#f7f8f3] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Start Your Quote Now
          </Link>
        </div>
      </section>
    </div>
  )
}