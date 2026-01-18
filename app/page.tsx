import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Home with
            <span className="text-green-600"> Premium Windows</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Quality vinyl and aluminum windows for residential and commercial projects in New York. 
            Custom sizes, professional installation, competitive pricing.
          </p>
          <Link
            href="/quotation"
            className="inline-block px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Get Free Quote
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Our Window Collections
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vinyl Windows */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🪟</div>
                <h3 className="text-2xl font-bold text-gray-800">Vinyl Windows</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Energy efficient & low maintenance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>9 window styles available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Perfect for residential projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Cost-effective solution</span>
                </li>
              </ul>
              <Link
                href="/quotation"
                className="block text-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Configure Vinyl Window
              </Link>
            </div>
          </div>

          {/* Aluminum Windows */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold text-gray-800">Aluminum Windows</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Durable & modern design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Residential & commercial options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>3 color choices available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Slim frames, maximum light</span>
                </li>
              </ul>
              <Link
                href="/quotation"
                className="block text-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
              >
                Configure Aluminum Window
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Upgrade Your Windows?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Get a custom quote in minutes. No commitment required.
          </p>
          <Link
            href="/quotation"
            className="inline-block px-8 py-4 bg-white text-green-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Your Quote Now
          </Link>
        </div>
      </section>
    </div>
  )
}