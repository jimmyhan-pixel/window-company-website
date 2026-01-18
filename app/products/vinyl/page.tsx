import Link from 'next/link'

export default function VinylWindowsPage() {
    const windowStyles = [
        {
            name: 'Double Hung',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
            description: 'Classic design with two operable sashes that slide vertically. Perfect for traditional and contemporary homes.',
            features: ['Easy to clean', 'Excellent ventilation', 'Energy efficient', 'Timeless style']
        },
        {
            name: 'Two Lites Slider',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
            description: 'Horizontal sliding windows with smooth operation. Ideal for wide openings and modern aesthetics.',
            features: ['Space-saving design', 'Easy operation', 'Wide viewing area', 'Low maintenance']
        },
        {
            name: 'Three Lites Slider',
            image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
            description: 'Triple-panel sliding window offering maximum flexibility and natural light.',
            features: ['Multiple opening options', 'Enhanced ventilation', 'Panoramic views', 'Modern appeal']
        },
        {
            name: 'Picture Window',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
            description: 'Fixed window designed to frame your view and maximize natural light without ventilation.',
            features: ['Unobstructed views', 'Maximum light', 'Energy efficient', 'Architectural focal point']
        },
        {
            name: 'Casement',
            image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
            description: 'Side-hinged windows that open outward, providing excellent ventilation and unobstructed views.',
            features: ['Superior ventilation', 'Easy to operate', 'Tight seal', 'Contemporary look']
        },
        {
            name: 'Hopper',
            image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
            description: 'Top-hinged window that opens inward from the bottom, perfect for basements and bathrooms.',
            features: ['Space-efficient', 'Secure ventilation', 'Easy to clean', 'Weather-resistant']
        },
        {
            name: 'Awning',
            image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop',
            description: 'Bottom-hinged window that opens outward from the top, allowing ventilation even during rain.',
            features: ['Rain protection', 'Excellent airflow', 'Energy efficient', 'Versatile placement']
        },
        {
            name: 'Bow Window',
            image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
            description: 'Curved window configuration creating a panoramic view and additional interior space.',
            features: ['Elegant curves', 'Panoramic views', 'Extra space', 'Architectural beauty']
        },
        {
            name: 'Bay Window',
            image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop',
            description: 'Angular projection window that extends outward, creating a cozy nook and enhanced views.',
            features: ['Creates space', 'Multiple angles', 'Natural light', 'Classic elegance']
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-[#738751] via-[#5a6a42] to-[#4a5737] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">Vinyl Windows</h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
                            Energy-efficient, low-maintenance windows for residential projects
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <span className="px-4 py-2 bg-white/20 rounded-full">9 Styles Available</span>
                            <span className="px-4 py-2 bg-white/20 rounded-full">Energy Efficient</span>
                            <span className="px-4 py-2 bg-white/20 rounded-full">Low Maintenance</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Window Styles Grid */}
            <section className="py-24 bg-gradient-to-b from-white to-[#f7f8f3]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Available Styles
                        </h2>
                        <p className="text-xl text-gray-600">
                            Choose from our comprehensive collection of vinyl window styles
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {windowStyles.map((style, index) => (
                            <div key={index} className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <img
                                        src={style.image}
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
                                        Get Quote
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
                            Back to All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#738751] via-[#5a6a42] to-[#4a5737] text-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Upgrade Your Windows?
                    </h2>
                    <p className="text-xl mb-8 text-gray-200">
                        Get a custom quote for your vinyl window project today
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/quotation"
                            className="px-10 py-4 bg-white text-[#738751] font-bold hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider"
                        >
                            Start Your Quote
                        </Link>
                        <Link
                            href="/contact"
                            className="px-10 py-4 bg-transparent text-white font-bold border-2 border-white hover:bg-white hover:text-[#738751] transition-all duration-300 uppercase tracking-wider"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
