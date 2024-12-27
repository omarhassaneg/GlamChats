import { Button } from '@/components/ui/button'
import Footer from '@/components/global/footer'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ChatVisualization = dynamic(() => import('@/components/global/chat-visualization'), {
  ssr: false,
  loading: () => (
    <div className="w-[300px] h-[600px] bg-[#222] rounded-[3rem] animate-pulse" />
  )
})

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0E0E0E]">
      {/* Navbar */}
      <nav className="container px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center justify-center">
              <span className="text-xl font-bold text-white">GC</span>
            </div>
            <span className="text-xl font-semibold text-white">GlamChats</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm text-neutral-400">
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#about">About</Link>
          </div>
          <Button asChild className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white hover:opacity-90">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left min-h-[400px] flex flex-col justify-center py-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
                Automate Your Instagram Engagement with AI
              </h1>
              <p className="text-lg md:text-xl text-neutral-400 mb-8">
                Transform your Instagram presence with intelligent automation. Respond to comments and DMs instantly using AI, keeping your audience engaged 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                <Button size="lg" className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white hover:opacity-90">
                  Get It For Free
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#3352CC]/20 to-[#1C2D70]/20 blur-3xl rounded-full" />
              <ChatVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#0A0A0A]">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "https://api.iconify.design/ri:instagram-line.svg?color=white",
                title: "Smart Response System",
                description: "Automatically respond to comments and DMs with contextually relevant messages"
              },
              {
                icon: "https://api.iconify.design/ri:robot-line.svg?color=white",
                title: "Custom Automation Rules",
                description: "Create personalized triggers and responses based on your specific needs"
              },
              {
                icon: "https://api.iconify.design/ri:brain-line.svg?color=white",
                title: "AI-Powered Engagement",
                description: "Leverage advanced AI to maintain natural, engaging conversations"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-[#111111] border border-neutral-800 hover:border-[#3352CC] transition-colors">
                <img 
                  src={feature.icon}
                  alt={feature.title}
                  className="w-12 h-12 mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "GlamChats has completely transformed how I manage my Instagram engagement. The AI responses are incredibly natural.",
                author: "Sarah Johnson",
                role: "Content Creator"
              },
              {
                quote: "The automation features have saved me countless hours. Now I can focus on creating content while maintaining engagement.",
                author: "Michael Chen",
                role: "Digital Marketer"
              },
              {
                quote: "Best investment for my business. The smart responses have helped me convert more followers into customers.",
                author: "Emma Davis",
                role: "Business Owner"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 rounded-xl bg-[#111111] border border-neutral-800">
                <img 
                  src="https://api.iconify.design/ri:double-quotes-l.svg?color=%233352CC"
                  alt="Quotes"
                  className="w-8 h-8 mb-4"
                />
                <p className="text-neutral-300 mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-sm text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">Simple, Transparent Pricing</h2>
          <p className="text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core features with different usage limits.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for getting started",
                features: [
                  "Up to 100 automated responses/month",
                  "Basic response templates",
                  "Standard support",
                  "1 Instagram account"
                ]
              },
              {
                name: "Pro",
                price: "$29",
                description: "Best for growing creators",
                features: [
                  "Unlimited automated responses",
                  "AI-powered smart replies",
                  "Priority support",
                  "Up to 3 Instagram accounts"
                ],
                popular: true
              },
              {
                name: "Business",
                price: "$99",
                description: "For serious businesses",
                features: [
                  "Everything in Pro",
                  "Custom AI training",
                  "Dedicated account manager",
                  "Unlimited Instagram accounts"
                ]
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl border ${
                  plan.popular 
                    ? 'border-[#3352CC] bg-[#111111]' 
                    : 'border-neutral-800 bg-[#0A0A0A]'
                }`}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#3352CC]/20 text-[#3352CC] mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-neutral-400">/month</span>}
                </div>
                <p className="text-neutral-400 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-neutral-300">
                      <img 
                        src="https://api.iconify.design/ri:check-line.svg?color=%233352CC"
                        className="w-5 h-5 flex-shrink-0"
                        alt=""
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={
                    plan.popular
                      ? "w-full bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white hover:opacity-90"
                      : "w-full bg-[#111111] text-white hover:bg-[#191919]"
                  }
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Instagram Engagement?</h2>
            <p className="text-neutral-400 mb-8">
              Join thousands of creators who have automated their Instagram engagement and grown their presence.
            </p>
            <Button size="lg" className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white hover:opacity-90">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}