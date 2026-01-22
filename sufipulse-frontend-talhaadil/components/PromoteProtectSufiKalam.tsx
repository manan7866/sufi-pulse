"use client"
import React from "react"
import {
  PenTool,
  BookOpen,
  Users,
  Search,
  Share2,
  Heart,
  Shield,
  Mic,
  DollarSign,
  ArrowRight,
  Scroll,
  Globe,
} from "lucide-react"

const PromoteProtectSufiKalam = () => {
    const partnershipPathways = [
        {
          id: 1,
          title: "Content Collaboration",
          description: "Publish and share original Sufi verses, qawwalis, and meaningful interpretations with our growing global community.",
          icon: PenTool,
          color: "bg-emerald-50 text-emerald-900",
        },
        {
          id: 2,
          title: "Educational Partnership",
          description: "Introduce Sufi Kalam across schools, universities, and local study circles to preserve timeless wisdom and tradition.",
          icon: BookOpen,
          color: "bg-slate-50 text-slate-900",
        },
        {
          id: 3,
          title: "Cultural Exchange",
          description: "Bridge diverse communities together through inspiring poetry recitals, musical performances, and meaningful cross-border cultural festivals.",
          icon: Users,
          color: "bg-emerald-50 text-emerald-900",
        },
        {
          id: 4,
          title: "Research Collaboration",
          description: "Preserve rare manuscripts, document oral traditions, and explore deeper philosophical meanings within authentic Sufi heritage.",
          icon: Search,
          color: "bg-slate-50 text-slate-900",
        },
        {
          id: 5,
          title: "Distribution Partnership",
          description: "Circulate authentic Sufi works through printed editions, digital libraries, and traditional performance formats across communities.",
          icon: Share2,
          color: "bg-emerald-50 text-emerald-900",
        },
        {
          id: 6,
          title: "Spiritual Community Alliance",
          description: "Strengthen shared practices of zikr, sama, reflection, and mutual learning by building supportive spiritual communities worldwide.",
          icon: Heart,
          color: "bg-slate-50 text-slate-900",
        },
        {
          id: 7,
          title: "Technology Integration",
          description: "Use blockchain verification, digital archives, and open libraries to safeguard authenticity and preserve sacred Sufi texts.",
          icon: Shield,
          color: "bg-emerald-50 text-emerald-900",
        },
        {
          id: 8,
          title: "Media Partnership",
          description: "Amplify the powerful voices of Sufi poets, singers, and artists across multiple cultural and digital platforms globally.",
          icon: Mic,
          color: "bg-slate-50 text-slate-900",
        },
        {
          id: 9,
          title: "Funding & Sponsorship",
          description: "Support long-term initiatives that preserve, nurture, and keep Sufi Kalam alive for future generations worldwide.",
          icon: DollarSign,
          color: "bg-emerald-50 text-emerald-900",
        },
      ]
      
      

  const sufiQuotes = [
    { text: "Love is the bridge between you and everything.", author: "Rumi" },
    { text: "The wound is the place where the Light enters you.", author: "Rumi" },
    { text: "I am not this hair, I am not this skin, I am the soul that lives within.", author: "Rumi" },
    { text: "Even after all this time, the sun never says to the earth, 'You owe me.'", author: "Hafiz" },
  ]

  const [currentQuote, setCurrentQuote] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % sufiQuotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Subtle background dots */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mr-4">
              <Scroll className="w-8 h-8 text-emerald-900" />
            </div>
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-slate-900" />
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            Promote and Protect
            <span className="block text-emerald-900">Sufi Kalam</span>
          </h1>

          <p className="text-xl lg:text-2xl text-slate-800 max-w-4xl mx-auto leading-relaxed">
            Join hands to safeguard the timeless wisdom of Sufi poetry, music, and heritage.
          </p>

          {/* Quote carousel */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <blockquote className="text-lg lg:text-xl italic text-slate-800 leading-relaxed mb-4">
                "{sufiQuotes[currentQuote].text}"
              </blockquote>
              <cite className="text-emerald-900 font-semibold">— {sufiQuotes[currentQuote].author}</cite>
              <div className="flex justify-center space-x-2 mt-6">
                {sufiQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuote ? "bg-emerald-900 w-8" : "bg-slate-300 hover:bg-emerald-900/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Pathways */}
        <div className="mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-slate-900 mb-4">Partnership Pathways</h2>
          <p className="text-lg text-slate-800 text-center mb-12 max-w-3xl mx-auto">
            Discover meaningful ways to contribute to the preservation and promotion of Sufi Kalam
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipPathways.map((pathway) => {
              const Icon = pathway.icon
              return (
                <div
                  key={pathway.id}
                  className="group bg-white hover:bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${pathway.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-900 transition-colors">
                    {pathway.title}
                  </h3>

                  <p className="text-slate-800 leading-relaxed mb-6">{pathway.description}</p>

                  
                </div>
              )
            })}
          </div>
        </div>

        
      </div>
    </section>
  )
}

export default PromoteProtectSufiKalam
