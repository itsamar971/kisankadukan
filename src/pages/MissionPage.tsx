import { Target, Leaf, TrendingUp, Globe } from 'lucide-react';
import IconContainer from '../IconContainer';
import { Link } from 'react-router-dom';

export default function MissionPage() {
  return (
    <div className="bg-[#1a2e1a] min-h-screen text-white selection:bg-[#7ab88a] selection:text-white">
      {/* 1. Hero / Mission Statement */}
      <section data-bg="dark" className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#7ab88a]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <IconContainer icon={Target} tint="green" isDark={true} className="mx-auto mb-8 scale-125" />
          <p className="text-[#7ab88a] font-bold tracking-[0.2em] uppercase mb-4 text-sm">Our Purpose</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
            A sustainable, direct <br className="hidden md:block" /> agricultural ecosystem.
          </h1>
          <p className="text-white/70 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            We are building a world where every agricultural transaction is fair, transparent, and direct—benefiting the people who grow our food and the communities they feed.
          </p>
        </div>
      </section>

      {/* 2. Problem / Solution Framing */}
      <section data-bg="dark" className="py-24 px-4 sm:px-6 border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white/90">The Problem</h2>
              <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                <p>
                  Today's agricultural supply chain is highly fragmented. Between the farm and the fork, produce passes through numerous intermediaries—aggregators, commission agents, wholesalers, and retailers. 
                </p>
                <p>
                  This fragmentation leads to extreme inefficiencies. Farmers are squeezed on margins and often forced to sell at distress prices, while buyers pay heavily inflated costs for produce that has lost its freshness.
                </p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7ab88a]/10 blur-[80px] rounded-full" />
              <h2 className="text-3xl font-bold mb-6 text-white relative z-10">Our Solution</h2>
              <div className="space-y-6 text-white/80 text-lg leading-relaxed relative z-10">
                <p>
                  We are rewiring the entire system. By providing a direct digital marketplace, we eliminate the unnecessary nodes in the network.
                </p>
                <p>
                  <strong>Connecting Farmers Directly to Buyers.</strong> We replace exploitation with empowerment, opacity with transparency, and delays with real-time logistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Measurable Goals / Impact */}
      <section data-bg="dark" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-white">Our 2030 Impact Goals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* TODO: Adjust these impact goals with real company metrics */}
            <div className="bg-[#1f2a1d] p-10 rounded-3xl border border-white/5">
              <TrendingUp className="w-10 h-10 text-[#7ab88a] mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-white mb-4">+40%</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Increase average farmer net income by at least 40% compared to traditional mandi rates.
              </p>
            </div>
            
            <div className="bg-[#1f2a1d] p-10 rounded-3xl border border-white/5">
              <Leaf className="w-10 h-10 text-[#7ab88a] mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-white mb-4">&lt; 24h</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Reduce farm-to-buyer transit time to under 24 hours, cutting food wastage by 80%.
              </p>
            </div>

            <div className="bg-[#1f2a1d] p-10 rounded-3xl border border-white/5">
              <Globe className="w-10 h-10 text-[#7ab88a] mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-white mb-4">1M+</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Empower over one million farmers across the nation with direct market access technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Closing CTA */}
      <section data-bg="dark" className="py-24 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1f2a1d] to-[#1a2e1a] border border-[#7ab88a]/20 p-12 md:p-20 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Support Our Mission</h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Every purchase on our platform and every farmer who joins brings us one step closer to a fairer food system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about" className="inline-flex items-center justify-center gap-2 bg-white text-[#1a2e1a] font-bold px-8 py-4 rounded-full transition-transform hover:scale-105 active:scale-95">
                Learn About Our Team
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 hover:bg-white/5 font-medium px-8 py-4 rounded-full transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
