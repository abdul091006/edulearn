import { CheckCircle } from "lucide-react"
import { Button } from "../ui/button"

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export function PricingSection() {
  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for individual teachers",
      features: ["Up to 30 students", "Basic assignment tools", "Limited file storage", "Email support"],
    },
    {
      name: "Pro",
      price: "$12",
      description: "Ideal for small schools",
      features: [
        "Up to 500 students",
        "Advanced assignment tools",
        "50GB file storage",
        "Priority support",
        "Analytics dashboard",
        "Custom branding",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large institutions",
      features: [
        "Unlimited students",
        "All Pro features",
        "Unlimited storage",
        "24/7 dedicated support",
        "API access",
        "Custom integrations",
        "On-premise option",
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-gray-600">Choose the plan that's right for your educational needs.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl scale-105 border-0"
                  : "bg-white border border-purple-100"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Free" && plan.price !== "Custom" && (
                  <span className={plan.highlighted ? "text-purple-100" : "text-gray-600"}>/month</span>
                )}
              </div>
              <p className={`mb-6 ${plan.highlighted ? "text-purple-100" : "text-gray-600"}`}>{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle
                      className={`h-5 w-5 mr-2 flex-shrink-0 ${
                        plan.highlighted ? "text-purple-200" : "text-purple-600"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-white text-purple-600 hover:bg-purple-50"
                    : "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
