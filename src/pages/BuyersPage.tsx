import { ShoppingCart, LineChart, Search, Truck, Leaf, CheckCircle2 } from 'lucide-react';
import IconContainer from '../IconContainer';

export default function BuyersPage() {
  const steps = [
    {
      title: 'Browse Fresh Listings',
      desc: 'Search for specific crops or browse live listings directly from verified farmers in your region.',
      icon: <Search className="w-6 h-6 text-[#7ab88a]" />,
    },
    {
      title: 'Place Your Order',
      desc: 'Buy instantly at the listed price or negotiate directly through the platform in real-time.',
      icon: <ShoppingCart className="w-6 h-6 text-[#7ab88a]" />,
    },
    {
      title: 'Track Delivery',
      desc: 'Once the deal is confirmed, track your produce as our logistics network delivers it to your doorstep.',
      icon: <Truck className="w-6 h-6 text-[#7ab88a]" />,
    },
  ];

  const faqs = [
    {
      q: 'How do I know the quality is good?',
      a: 'We use a strict grading system and on-ground verification. You can see exact grade parameters, photos, and farmer ratings before buying.',
    },
    {
      q: 'What is the minimum order quantity?',
      a: 'Minimum quantities depend on the specific listing, but generally start at wholesale lot sizes (e.g., 50kg to 1 ton depending on the crop).',
    },
    {
      q: 'Are the prices actually lower?',
      a: 'Yes. By bypassing multiple commission agents and wholesale markets, you pay 15-20% less than traditional mandi rates, while the farmer still earns more.',
    },
    {
      q: 'What if there is an issue with delivery?',
      a: 'Our platform offers buyer protection. If the delivered grade does not match the listed grade, our dispute resolution team handles it immediately.',
    },
  ];

  return (
    <div className="bg-[#fbfaf8] min-h-screen text-[#1f2a1d]">
      {/* 1. Hero Section */}
      <section data-bg="light" className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden bg-white border-b border-[#1f2a1d]/05">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7ab88a]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <IconContainer icon={ShoppingCart} tint="green" isDark={false} className="mx-auto mb-6 scale-125" />
          <p className="text-[#7ab88a] font-bold tracking-[0.2em] uppercase mb-4 text-sm">For Buyers</p>
          <h1 className="viewport-title font-bold mb-6">Source Fresher, Pay Less.</h1>
          <p className="text-[#4b5b47] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Get complete transparency. Source high-quality produce directly from the farm, track it to your door, and enjoy better prices.
          </p>
          <button className="bg-[#1f2a1d] hover:bg-[#2a3827] text-white font-bold px-8 py-4 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-md">
            Join as a Buyer
          </button>
        </div>
      </section>

      {/* 2. Benefits Section */}
      <section data-bg="light" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Smart Way to Source</h2>
            <p className="text-[#4b5b47] text-lg max-w-2xl mx-auto">For retailers, restaurants, and wholesalers who demand quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#1f2a1d]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#7ab88a]/15 rounded-xl flex items-center justify-center mb-6">
                <LineChart className="w-6 h-6 text-[#7ab88a]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Better Pricing</h3>
              <p className="text-[#4b5b47] leading-relaxed">
                By purchasing direct from the source, you avoid the cumulative markups of traditional wholesale markets.
              </p>
            </div>
            <div className="bg-white border border-[#1f2a1d]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#dfb15b]/15 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6 text-[#dfb15b]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Maximum Freshness</h3>
              <p className="text-[#4b5b47] leading-relaxed">
                Produce goes straight from farm to your facility, saving days of transit and storage time in local mandis.
              </p>
            </div>
            <div className="bg-white border border-[#1f2a1d]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#1f2a1d]/5 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-[#1f2a1d]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Full Traceability</h3>
              <p className="text-[#4b5b47] leading-relaxed">
                Know exactly where your food comes from. View farm locations, harvest dates, and farmer profiles before you buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How to Buy */}
      <section data-bg="light" className="py-24 px-4 sm:px-6 bg-white border-y border-[#1f2a1d]/05 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How Buying Works</h2>
              <p className="text-[#4b5b47] text-lg mb-10 leading-relaxed">
                A seamless digital procurement experience designed for modern businesses.
              </p>
              
              <div className="space-y-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#7ab88a]/10 border border-[#7ab88a]/30 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-[#4b5b47] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              {/* Visual representation of the app */}
              <div className="aspect-[4/3] bg-[#fbfaf8] rounded-3xl border border-[#1f2a1d]/10 flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                
                <div className="absolute inset-x-8 top-8 bottom-8 flex flex-col gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-[#1f2a1d]/05 flex gap-4 items-center">
                      <div className="w-16 h-16 bg-[#e2e8e0] rounded-lg" />
                      <div className="flex-1">
                        <div className="h-4 w-1/2 bg-[#1f2a1d]/10 rounded mb-2" />
                        <div className="h-3 w-1/3 bg-[#7ab88a]/30 rounded" />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-[#7ab88a] flex items-center justify-center text-[#7ab88a]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Buyer FAQs */}
      <section data-bg="light" className="py-24 px-4 sm:px-6 bg-[#fbfaf8]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-[#1f2a1d]/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2 text-[#1f2a1d]">{faq.q}</h3>
                <p className="text-[#4b5b47] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section data-bg="light" className="py-24 px-4 sm:px-6 text-center border-t border-[#1f2a1d]/05 bg-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to source smarter?</h2>
        <p className="text-[#4b5b47] text-lg mb-10 max-w-xl mx-auto">
          Register today to browse live inventory and connect with verified farmers in your region.
        </p>
        <button className="bg-[#1f2a1d] hover:bg-[#2a3827] text-white font-bold px-10 py-4 rounded-full transition-transform hover:scale-105 active:scale-95 text-lg shadow-lg">
          Create Buyer Account
        </button>
      </section>
    </div>
  );
}
