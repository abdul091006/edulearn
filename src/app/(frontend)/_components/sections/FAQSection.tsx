interface FAQ {
  question: string
  answer: string
}

export function FAQSection() {
  const faqs: FAQ[] = [
    {
      question: 'How easy is it to get started with eDULearn?',
      answer:
        'Getting started is simple! Sign up for a free account, create your first classroom, and invite your students. Our intuitive onboarding process will guide you through setting up your profile and exploring key features.',
    },
    {
      question: 'Can I integrate eDULearn with other tools?',
      answer:
        'Yes! eDULearn integrates with popular educational tools and services including Google Workspace for Education, Microsoft Teams, Canvas, and more. Our API also allows for custom integrations for Enterprise customers.',
    },
    {
      question: 'Is eDULearn suitable for all education levels?',
      answer:
        'Absolutely. eDULearn is designed to be flexible and adaptable for all education levels from elementary school to higher education. The interface and features can be customized to suit the needs of different age groups and learning environments.',
    },
    {
      question: 'How secure is student data on eDULearn?',
      answer:
        'We take data security very seriously. eDULearn is FERPA compliant and employs industry-leading security measures to protect all user data. We never sell user data and provide transparent privacy policies.',
    },
    {
      question: 'Do you offer training and support?',
      answer:
        'Yes, we provide comprehensive documentation, video tutorials, and webinars for all users. Pro and Enterprise plans include dedicated support and training sessions to help you make the most of our platform.',
    },
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-purple-100">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
