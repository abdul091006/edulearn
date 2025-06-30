import {
  ArrowRight,
  CheckCircle,
  Play,
  Rocket,
  Star,
  User,
  Zap,
  Users,
  FileText,
  TrendingUp,
} from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Geometric Patterns */}
        <div className="absolute top-20 right-20 w-24 h-24 border border-purple-200 rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border border-blue-200 rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-20 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-[-50px]">
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center">
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 px-4 py-2 text-sm font-medium hover:scale-105 transition-transform duration-300 rounded-full inline-flex items-center">
                <Rocket className="w-3 h-3 mr-2" />
                🎉 New: AI-Powered Learning Assistant
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                <span className="text-gray-900">Education</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Forever
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                The most advanced educational platform that empowers teachers, engages students, and
                transforms learning experiences with cutting-edge technology.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl inline-flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-base font-semibold rounded-xl backdrop-blur-sm inline-flex items-center justify-center transition-all duration-300">
                <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">50K+ Educators</div>
                  <div className="text-gray-500">Already using eDULearn</div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  4.9/5 (2,847 reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="relative px-4 lg:px-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20 transform rotate-6 scale-105"></div>

            {/* Main Dashboard Card */}
            <div className="relative bg-white/80 backdrop-blur-lg p-3 rounded-3xl shadow-xl border border-white/20">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Welcome back, Abdul!</h3>
                      <p className="text-blue-100 text-sm">Mathematics - Grade 10</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Students', value: '156', icon: Users, color: 'text-blue-500' },
                      {
                        label: 'Assignments',
                        value: '24',
                        icon: FileText,
                        color: 'text-purple-500',
                      },
                      {
                        label: 'Avg Score',
                        value: '87%',
                        icon: TrendingUp,
                        color: 'text-green-500',
                      },
                    ].map((stat, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                        <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                        <div className="text-lg font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-base">Recent Activity</h4>
                    {[
                      { name: 'Alex Johnson', action: 'submitted assignment', time: '2 min ago' },
                      { name: 'Emma Davis', action: 'joined discussion', time: '5 min ago' },
                      { name: 'Mike Wilson', action: 'completed quiz', time: '12 min ago' },
                    ].map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                          <div className="text-xs text-gray-500">{activity.action}</div>
                        </div>
                        <div className="text-xs text-gray-400">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-4 shadow-lg animate-float">
              <div className="flex items-center space-x-2 text-white">
                <CheckCircle className="w-4 h-4" />
                <div>
                  <div className="text-xs font-medium">Assignment Graded</div>
                  <div className="text-xs opacity-80">Auto-graded in 2.3s</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 shadow-lg animate-float animation-delay-2000">
              <div className="flex items-center space-x-2 text-white">
                <Zap className="w-4 h-4" />
                <div>
                  <div className="text-xs font-medium">AI Insights</div>
                  <div className="text-xs opacity-80">3 students need help</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
