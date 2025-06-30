import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-10 lg:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">eDULearn</span>
                <div className="text-xs text-gray-400">Education Platform</div>
              </div>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed max-w-md text-sm">
              Transforming education through innovative digital tools designed for modern
              classrooms. Empowering teachers, engaging students, and improving learning outcomes
              worldwide.
            </p>

            <div className="flex space-x-3">
              {['twitter', 'facebook', 'instagram', 'linkedin', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110"
                >
                  <img
                    src={`/placeholder.svg?height=16&width=16&text=${social}`}
                    alt={social}
                    className="w-4 h-4"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {[
            {
              title: 'Product',
              links: ['Features', 'Pricing', 'Integrations', 'API', 'Mobile Apps', 'Security'],
            },
            {
              title: 'Resources',
              links: [
                'Documentation',
                'Tutorials',
                'Blog',
                'Webinars',
                'Case Studies',
                'Templates',
              ],
            },
            {
              title: 'Support',
              links: [
                'Help Center',
                'Contact Us',
                'Community',
                'Status Page',
                'Report Bug',
                'Feature Request',
              ],
            },
          ].map((column, index) => (
            <div key={index}>
              <h3 className="text-base font-semibold mb-4 text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-xs mb-4 md:mb-0">
              © 2024 eDULearn. All rights reserved. Made with ❤️ for educators worldwide.
            </div>

            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
