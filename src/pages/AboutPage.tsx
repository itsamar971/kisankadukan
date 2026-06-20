import { Users, ShieldCheck, Zap, Handshake, Heart } from 'lucide-react';
import IconContainer from '../IconContainer';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section data-bg="light" className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#7ab88a]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <IconContainer icon={Users} tint="green" isDark={false} className="mx-auto mb-6 scale-125" />
          <h1 className="viewport-title font-bold text-[#1f2a1d] mb-6 leading-tight">
            About Kisan Ka Dukan
          </h1>
          <p className="text-[#4b5b47] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            We were built to empower the people who grow our food and the people who consume it. We believe in transparency, fairness, and the power of technology to bridge the gap.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-[#1f2a1d]/10 pt-10">
            {/* TODO: replace with real stats if available */}
            <div>
              <p className="text-3xl font-bold text-[#1f2a1d] mb-1">50k+</p>
              <p className="text-sm font-medium text-[#4b5b47]/80 uppercase tracking-wider">Farmers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#1f2a1d] mb-1">100+</p>
              <p className="text-sm font-medium text-[#4b5b47]/80 uppercase tracking-wider">Cities</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#1f2a1d] mb-1">Zero</p>
              <p className="text-sm font-medium text-[#4b5b47]/80 uppercase tracking-wider">Middlemen</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#1f2a1d] mb-1">100%</p>
              <p className="text-sm font-medium text-[#4b5b47]/80 uppercase tracking-wider">Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section data-bg="light" className="py-24 px-4 sm:px-6 bg-[#fbfaf8] border-y border-[#1f2a1d]/05">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold text-[#1f2a1d] mb-4">Our Story</h2>
              <div className="w-12 h-1 bg-[#7ab88a] rounded-full" />
            </div>
            <div className="md:w-2/3 space-y-6 text-[#4b5b47] text-lg leading-relaxed">
              <p>
                Traditional agricultural supply chains are broken. For decades, farmers have borne the highest risks—battling weather, pests, and market volatility—only to capture a fraction of the final retail price. 
              </p>
              <p>
                Meanwhile, buyers pay premium prices for produce that has passed through five to seven intermediaries, losing freshness and traceability along the way. The system was designed for extraction, not connection.
              </p>
              <p>
                <strong>Kisan Ka Dukan</strong> was born from a simple realization: technology can remove the friction. By connecting farmers directly to buyers, we eliminate the unnecessary nodes in the supply chain. This means farmers earn what they truly deserve, and buyers get fresher, traceable produce at fair prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section data-bg="light" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2a1d] mb-4">Our Values</h2>
            <p className="text-[#4b5b47] text-lg max-w-2xl mx-auto">The core principles that guide every decision we make.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-[#1f2a1d]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#7ab88a]/10 rounded-xl flex items-center justify-center mb-6">
                <Handshake className="w-6 h-6 text-[#7ab88a]" />
              </div>
              <h3 className="text-xl font-bold text-[#1f2a1d] mb-3">Fairness</h3>
              <p className="text-[#4b5b47] leading-relaxed">
                We believe value should go to the creators. We ensure farmers get the lion's share of the transaction, creating sustainable livelihoods.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#1f2a1d]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#dfb15b]/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#dfb15b]" />
              </div>
              <h3 className="text-xl font-bold text-[#1f2a1d] mb-3">Transparency</h3>
              <p className="text-[#4b5b47] leading-relaxed">
                No hidden fees, no opaque pricing models. Buyers know exactly who grew their food, and farmers know exactly what buyers paid.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#1f2a1d]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#4b5b47]/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-[#4b5b47]" />
              </div>
              <h3 className="text-xl font-bold text-[#1f2a1d] mb-3">Direct Access</h3>
              <p className="text-[#4b5b47] leading-relaxed">
                We break down geographical barriers, giving local farmers national reach and giving buyers access to hyper-local, fresh produce.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#1f2a1d]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#1f2a1d]/5 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#1f2a1d]" />
              </div>
              <h3 className="text-xl font-bold text-[#1f2a1d] mb-3">Tech for Good</h3>
              <p className="text-[#4b5b47] leading-relaxed">
                We build tools that are intuitive and powerful, leveraging AI and real-time logistics to solve real-world agricultural problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Voices from the Field Section */}
      <section data-bg="light" className="py-24 px-4 sm:px-6 bg-[#fbfaf8] border-t border-[#1f2a1d]/05">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2a1d] mb-4">Voices from the Field</h2>
            <p className="text-[#4b5b47] text-lg max-w-2xl mx-auto">Hear from the people who use Kisan Ka Dukan every day.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#1f2a1d]/10 relative shadow-sm">
              <div className="absolute top-8 right-8 text-[#7ab88a]/20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L16.439 14.9726H11.439V3H21.439V11.2383L17.702 21H14.017ZM3.017 21L5.439 14.9726H0.439V3H10.439V11.2383L6.702 21H3.017Z" />
                </svg>
              </div>
              <p className="text-[#4b5b47] text-lg leading-relaxed mb-8 relative z-10">
                "Before joining the platform, I was forced to accept whatever price the local commission agent offered. Now, I list my wheat directly and negotiate with buyers across the state. My income has gone up by 30% this season."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#7ab88a]/20 rounded-full flex items-center justify-center text-[#7ab88a] font-bold">
                  S
                </div>
                <div>
                  <p className="font-bold text-[#1f2a1d]">Surya</p>
                  <p className="text-sm text-[#7ab88a]">Wheat Farmer, Telangana</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#1f2a1d]/10 relative shadow-sm">
              <div className="absolute top-8 right-8 text-[#dfb15b]/20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L16.439 14.9726H11.439V3H21.439V11.2383L17.702 21H14.017ZM3.017 21L5.439 14.9726H0.439V3H10.439V11.2383L6.702 21H3.017Z" />
                </svg>
              </div>
              <p className="text-[#4b5b47] text-lg leading-relaxed mb-8 relative z-10">
                "As a wholesale buyer, quality and consistency are everything. Kisan Ka Dukan gives me full visibility into where the produce is coming from. The delivery is fast, the grading is accurate, and the pricing is completely transparent."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#dfb15b]/20 rounded-full flex items-center justify-center text-[#dfb15b] font-bold">
                  SN
                </div>
                <div>
                  <p className="font-bold text-[#1f2a1d]">Sri Naidu</p>
                  <p className="text-sm text-[#dfb15b]">Buyer, Telangana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA */}
      <section data-bg="dark" className="py-24 px-4 sm:px-6 bg-[#1f2a1d] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Join the Movement</h2>
          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Whether you're growing food or buying it, there's a better way. Be part of the change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/farmers" className="inline-flex items-center justify-center gap-2 bg-[#7ab88a] hover:bg-[#66a076] text-white font-medium px-8 py-4 rounded-full transition-colors">
              I am a Farmer
            </Link>
            <Link to="/buyers" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full transition-colors backdrop-blur-sm border border-white/10">
              I am a Buyer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
