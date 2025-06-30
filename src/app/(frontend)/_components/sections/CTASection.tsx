import { ArrowRight, Calendar, CheckCircle, Rocket } from 'lucide-react'
import { Button } from '../ui/button'

export function CTASection() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -mr-36 -mt-36"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full -ml-36 -mb-36"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full opacity-5"></div>
      </div>

      <div className="container mx-auto px-10 lg:px-16 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          <span className="bg-white/20 text-white border-0 mb-6 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center">
            <Rocket className="w-3 h-3 mr-2" />
            Ready to Get Started?
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight mt-6">
            Transform Your Classroom
            <br />
            <span className="text-blue-200">Starting Today</span>
          </h2>

          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Join over 50,000 educators who are already using eDULearn to create engaging, effective
            learning experiences. Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl transform hover:scale-105 inline-flex items-center">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>

            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-base font-bold rounded-xl backdrop-blur-sm inline-flex items-center transition-all duration-300">
              Schedule a Demo
              <Calendar className="ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
              Setup in under 5 minutes
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
