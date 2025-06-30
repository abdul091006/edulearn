import type { ReactNode } from 'react'
import {
  BookOpen,
  Users,
  Calendar,
  Award,
  MessageSquare,
  BarChart,
  Lightbulb,
  Video,
  Shield,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Target,
  Rocket,
} from 'lucide-react'

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-10 lg:px-16 py-20">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="bg-blue-100 text-blue-800 border-0 mb-6 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center">
            <Lightbulb className="w-3 h-3 mr-2" />
            Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-gray-900">In One Platform</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Comprehensive tools designed for modern education, powered by AI and built for scale.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <BookOpen className="w-6 h-6" />,
              title: 'Smart Assignment Management',
              description:
                'AI-powered assignment creation, distribution, and grading with instant feedback and plagiarism detection.',
              gradient: 'from-blue-500 to-blue-600',
              bgGradient: 'from-blue-50 to-white',
              features: [
                'Auto-grading',
                'Plagiarism detection',
                'Instant feedback',
                'Analytics dashboard',
              ],
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: 'Collaborative Learning',
              description:
                'Foster teamwork with group projects, peer reviews, and interactive discussion boards.',
              gradient: 'from-purple-500 to-purple-600',
              bgGradient: 'from-purple-50 to-white',
              features: [
                'Group projects',
                'Peer reviews',
                'Discussion boards',
                'Real-time collaboration',
              ],
            },
            {
              icon: <BarChart className="w-6 h-6" />,
              title: 'Advanced Analytics',
              description:
                'Deep insights into student performance with predictive analytics and personalized recommendations.',
              gradient: 'from-green-500 to-green-600',
              bgGradient: 'from-green-50 to-white',
              features: [
                'Performance tracking',
                'Predictive analytics',
                'Custom reports',
                'Learning insights',
              ],
            },
            {
              icon: <Video className="w-6 h-6" />,
              title: 'Virtual Classroom',
              description:
                'Immersive online learning experiences with HD video, screen sharing, and interactive whiteboards.',
              gradient: 'from-red-500 to-red-600',
              bgGradient: 'from-red-50 to-white',
              features: ['HD video calls', 'Screen sharing', 'Interactive whiteboard', 'Recording'],
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Enterprise Security',
              description:
                'Bank-level security with FERPA compliance, SSO integration, and advanced privacy controls.',
              gradient: 'from-indigo-500 to-indigo-600',
              bgGradient: 'from-indigo-50 to-white',
              features: [
                'FERPA compliant',
                'SSO integration',
                'Data encryption',
                'Privacy controls',
              ],
            },
            {
              icon: <Smartphone className="w-6 h-6" />,
              title: 'Mobile-First Design',
              description:
                'Native mobile apps for iOS and Android with offline capabilities and push notifications.',
              gradient: 'from-pink-500 to-pink-600',
              bgGradient: 'from-pink-50 to-white',
              features: [
                'Native mobile apps',
                'Offline access',
                'Push notifications',
                'Responsive design',
              ],
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br overflow-hidden transform hover:-translate-y-1 rounded-xl"
            >
              <div className="p-6 relative">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 text-white`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4 text-sm">{feature.description}</p>

                <div className="space-y-2 mb-4">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center text-xs text-gray-500">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors duration-300 text-sm">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-10">
              <span className="bg-purple-100 text-purple-800 border-0 mb-4 px-4 py-2 text-sm font-medium rounded-full inline-flex items-center">
                <Target className="w-3 h-3 mr-2" />
                AI-Powered
              </span>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 mt-4">
                Intelligent Learning
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}
                  Assistant
                </span>
              </h3>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Our AI assistant helps teachers create personalized learning paths, identifies
                struggling students early, and provides intelligent recommendations for improved
                outcomes.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'Personalized learning recommendations',
                  'Early intervention alerts',
                  'Automated content generation',
                  'Smart scheduling optimization',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 text-sm font-semibold rounded-lg inline-flex items-center transition-all duration-300">
                Try AI Assistant
                <Rocket className="ml-2 w-4 h-4" />
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 lg:p-10 flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-white/10 rounded-2xl backdrop-blur-lg border border-white/20 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">AI Recommendation</div>
                        <div className="text-blue-100 text-xs">Based on student performance</div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="text-white text-xs mb-2">Suggested Action:</div>
                      <div className="text-blue-100 text-xs leading-relaxed">
                        "Consider providing additional practice problems for Chapter 5. 3 students
                        are struggling with quadratic equations."
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-white/20 hover:bg-white/30 text-white border-0 px-4 py-1 text-xs rounded transition-colors duration-300">
                        Apply
                      </button>
                      <button className="text-white hover:bg-white/10 px-4 py-1 text-xs rounded transition-colors duration-300">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
