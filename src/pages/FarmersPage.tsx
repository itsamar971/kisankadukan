import { Wheat, DollarSign, Clock, ShieldCheck, Smartphone, CheckCircle2 } from 'lucide-react';
import IconContainer from '../IconContainer';

export default function FarmersPage() {
  const steps = [
    {
      title: 'List Your Harvest',
      desc: 'Upload details of your produce directly from your phone. Set your own fair price.',
      icon: <Smartphone className="w-6 h-6 text-[#dfb15b]" />,
    },
    {
      title: 'Get Verified Offers',
      desc: 'Buyers see your listing instantly. Accept offers without haggling with agents.',
      icon: <ShieldCheck className="w-6 h-6 text-[#dfb15b]" />,
    },
    {
      title: 'We Handle Logistics',
      desc: 'Our network picks up the produce right from your farm. No transport headaches.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#dfb15b]" />,
    },
  ];

  const faqs = [
    {
      q: 'How much does it cost to join?',
      a: 'Joining is completely free. We only take a small, transparent platform fee when a successful sale is made.',
    },
    {
      q: 'When do I get paid?',
      a: 'Payments are processed directly to your bank account within 24 hours of the buyer confirming receipt of the produce.',
    },
    {
      q: 'Do I need to arrange transport?',
      a: 'No. Once a deal is struck, our logistics partners will pick up the goods directly from your farm location.',
    },
    {
      q: 'Who decides the price of my produce?',
      a: 'You do. You set the asking price based on current market trends, and buyers choose to accept or negotiate within fair bounds.',
    },
  ];

  return (
    <div className="bg-[#1f2a1d] min-h-screen text-white">
      {/* 1. Hero Section */}
      <section data-bg="dark" className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#dfb15b]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <IconContainer icon={Wheat} tint="gold" isDark={true} className="mx-auto mb-6 scale-125" />
          <p className="text-[#dfb15b] font-bold tracking-[0.2em] uppercase mb-4 text-sm">For Farmers</p>
          <h1 className="viewport-title font-bold text-white mb-6">Take Control of Your Harvest</h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Sell directly to verified buyers, cut out the middlemen, and keep up to 90% of the sale price. It's time your hard work paid off.
          </p>
          <button className="bg-[#dfb15b] hover:bg-[#cda04a] text-[#1f2a1d] font-bold px-8 py-4 rounded-full transition-transform hover:scale-105 active:scale-95">
            Join as a Farmer
          </button>
        </div>
      </section>

      {/* 2. Benefits Section */}
      <section data-bg="dark" className="py-24 px-4 sm:px-6 border-y border-white/5 bg-[#1a2518]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Sell on Kisan Ka Dukan?</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">We've removed the hurdles so you can focus on growing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#dfb15b]/20 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-[#dfb15b]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Earn Up to 90%</h3>
              <p className="text-white/60 leading-relaxed">
                By removing up to 5 layers of middlemen, you keep the vast majority of the final sale price.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#7ab88a]/20 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-[#7ab88a]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Faster Payments</h3>
              <p className="text-white/60 leading-relaxed">
                No more waiting weeks for commission agents to pay you. Get secure, direct bank transfers fast.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Buyers</h3>
              <p className="text-white/60 leading-relaxed">
                Every buyer on our platform is strictly vetted. No more dealing with bad credit or defaulted payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How to Get Started */}
      <section data-bg="dark" className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works for You</h2>
              <p className="text-white/60 text-lg mb-10 leading-relaxed">
                We've made selling your crop as easy as sending a message on your smartphone.
              </p>
              
              <div className="space-y-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-white/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              {/* Visual representation of the app */}
              <div className="aspect-[4/3] bg-gradient-to-tr from-white/5 to-white/10 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <Smartphone className="w-32 h-32 text-white/20" strokeWidth={1} />
                <div className="absolute bottom-8 left-8 right-8 bg-[#1f2a1d] border border-white/10 p-4 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="text-green-500 w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Listing Approved</p>
                    <p className="text-sm text-white/60">Your 500kg Wheat is now live.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Farmer FAQs */}
      <section data-bg="dark" className="py-24 px-4 sm:px-6 bg-[#1a2518] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#1f2a1d] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-2 text-[#dfb15b]">{faq.q}</h3>
                <p className="text-white/70 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section data-bg="dark" className="py-24 px-4 sm:px-6 text-center border-t border-white/5">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to grow your income?</h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of farmers who have already taken control of their sales.
        </p>
        <button className="bg-[#dfb15b] hover:bg-[#cda04a] text-[#1f2a1d] font-bold px-10 py-4 rounded-full transition-transform hover:scale-105 active:scale-95 text-lg shadow-[0_0_40px_rgba(223,177,91,0.3)]">
          Download the App
        </button>
      </section>
    </div>
  );
}
