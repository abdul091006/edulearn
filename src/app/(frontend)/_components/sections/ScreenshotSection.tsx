import Image from 'next/image'

export function ScreenshotSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 to-blue-800 text-white overflow-hidden relative">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for the modern classroom</h2>
          <p className="text-lg text-purple-100">
            Our intuitive interface makes it easy for teachers and students to focus on what matters
            most: learning.
          </p>
        </div>

        <div className="relative mt-20 rounded-xl overflow-hidden shadow-2xl border border-white/10 mx-auto max-w-5xl">
          <Image
            src="/placeholder.svg?height=800&width=1400"
            alt="eDULearn Platform Interface"
            width={1400}
            height={800}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10" />
        </div>
      </div>
    </section>
  )
}
