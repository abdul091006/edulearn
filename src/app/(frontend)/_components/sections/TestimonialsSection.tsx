interface Testimonial {
  name: string
  role: string
  quote: string
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'High School Teacher',
      quote:
        'eDULearn has transformed how I manage my classroom. The assignment tracking and grading tools save me hours each week.',
    },
    {
      name: 'Michael Chen',
      role: 'University Professor',
      quote:
        'The collaborative features have significantly increased student engagement in my courses. The analytics help me identify where students need additional support.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Elementary School Teacher',
      quote:
        "My students love the interactive elements and gamification. It's made learning fun and increased participation dramatically.",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by educators and students</h2>
          <p className="text-lg text-gray-600">
            See what our users have to say about their experience with our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl relative"
            >
              <div className="mb-6 text-purple-600">
                <svg
                  width="45"
                  height="36"
                  viewBox="0 0 45 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-30"
                >
                  <path
                    d="M13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27H18V36H9C4.02944 36 0 31.9706 0 27V13.5C0 6.04416 6.04416 0 13.5 0ZM40.5 0C33.0442 0 27 6.04416 27 13.5C27 20.9558 33.0442 27 40.5 27H45V36H36C31.0294 36 27 31.9706 27 27V13.5C27 6.04416 33.0442 0 40.5 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-gray-700 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 mr-4"></div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
