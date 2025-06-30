import { CheckCircle, Globe, Shield, Star } from 'lucide-react'
import Image from 'next/image'

export function TrustedBySection() {
  return (
    <section className="min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-10 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-base font-medium text-gray-600 mb-8">
            Trusted by leading educational institutions worldwide
          </p>

          {/* Simple Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="font-semibold text-gray-900">10,000+</span>
              <span className="ml-1">institutions</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-900">2M+</span>
              <span className="ml-1">students</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-900">150+</span>
              <span className="ml-1">countries</span>
            </div>
          </div>
        </div>

        {/* University Logos - Simple Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center mb-16">
          {[
            { name: 'Harvard University', logo: 'H' },
            { name: 'Stanford', logo: 'S' },
            { name: 'MIT', logo: 'MIT' },
            { name: 'Oxford', logo: 'O' },
            { name: 'Cambridge', logo: 'C' },
            { name: 'Yale', logo: 'Y' },
          ].map((university, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors duration-300">
                <span className="text-gray-600 font-bold text-lg group-hover:text-gray-800 transition-colors duration-300">
                  {university.logo}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {university.name}
              </p>
            </div>
          ))}
        </div>

        {/* Simple Testimonial */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-xl lg:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
              "eDULearn has transformed how we deliver education at scale. The platform's
              reliability and innovative features have enabled us to reach students globally."
            </blockquote>

            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                <span className="text-gray-600 font-bold">DR</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">Dr. Maria Rodriguez</div>
                <div className="text-gray-600 text-sm">
                  Dean of Digital Learning, Harvard Medical School
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges - Simple */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
          {[
            { icon: <Shield className="w-4 h-4" />, text: 'FERPA Compliant' },
            { icon: <Globe className="w-4 h-4" />, text: 'ISO 27001 Certified' },
            { icon: <CheckCircle className="w-4 h-4" />, text: 'SOC 2 Type II' },
            { icon: <Star className="w-4 h-4" />, text: 'G2 Leader 2024' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center space-x-2 text-gray-600">
              {badge.icon}
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
