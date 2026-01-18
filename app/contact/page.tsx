'use client'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f8f3] via-white to-[#f7f8f3] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with our team for any questions or support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-scale-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-3xl">📍</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Window Street<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-3xl">📞</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                  <a
                    href="tel:+12125551234"
                    className="text-[#738751] hover:text-[#5a6a42] font-medium transition-colors hover:underline"
                  >
                    (212) 555-1234
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-3xl">✉️</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:info@citywindows.com"
                    className="text-[#738751] hover:text-[#5a6a42] font-medium transition-colors hover:underline"
                  >
                    info@citywindows.com
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eef0e6] to-[#dce2cd] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-3xl">🕐</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <p className="flex justify-between"><span className="font-medium">Monday - Friday:</span> <span>8:00 AM - 6:00 PM</span></p>
                    <p className="flex justify-between"><span className="font-medium">Saturday:</span> <span>9:00 AM - 4:00 PM</span></p>
                    <p className="flex justify-between"><span className="font-medium">Sunday:</span> <span className="text-red-500">Closed</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={() => window.location.href = '/quotation'}
                className="block w-full py-4 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white text-center font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                ✨ Get Free Quote
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-scale-in">
            <div className="h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976379575477!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-3xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}