import { useState, useEffect, useRef } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Play, Sparkles, X, Check, User, List, Clock, ShieldCheck, Star, BookOpen, Smartphone, Shield, Wheat, ShoppingCart, Sprout, Package, UploadCloud, Search, Handshake, CheckCircle2, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import BoomerangVideoBg from '../BoomerangVideoBg';
import RadialTimelineDemo from '../components/RadialTimelineDemo';
import Grainient from '../Grainient';
import FAQSection from '../FAQSection';
import IconContainer from '../IconContainer';


function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Farmer Lists Crop',
      desc: 'Farmers upload crop details, images, and expected yield right from their phone.',
      icon: UploadCloud,
      spanClass: 'col-span-1 md:col-span-2'
    },
    {
      num: '02',
      title: 'Buyer Browses',
      desc: 'Buyers search and filter verified produce based on quality, location, and price.',
      icon: Search,
      spanClass: 'col-span-1 md:col-span-2'
    },
    {
      num: '03',
      title: 'Place Request',
      desc: 'Submit an intent to purchase directly to the farmer with no hidden fees.',
      icon: Handshake,
      spanClass: 'col-span-1 md:col-span-2'
    },
    {
      num: '04',
      title: 'Farmer Accepts',
      desc: 'The farmer reviews the request, confirms availability, and locks in the deal.',
      icon: CheckCircle2,
      spanClass: 'col-span-1 md:col-span-3'
    },
    {
      num: '05',
      title: 'Transaction Complete',
      desc: 'Payment is secured, and fresh produce is delivered directly from the farm.',
      icon: Truck,
      spanClass: 'col-span-1 md:col-span-3'
    }
  ];

  return (
    <section data-bg="light" className="viewport-section px-4 sm:px-6">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #dce8f5 40%, #8aaed4 75%, #5480a8 100%)' }}
      />
      
      {/* Decorative ambient blobs for premium feel */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/30 rounded-full blur-[100px] pointer-events-none mix-blend-overlay" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#5480a8]/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-4 sm:mb-6"
        >
          <span className="text-[#5480a8] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-1 block">Simple & Transparent</span>
          <h2
            className="viewport-title font-bold text-[#111827]"
            style={{ letterSpacing: '-0.03em' }}
          >
            How it Works
          </h2>
          <p className="mt-1.5 text-[#374151] max-w-xl mx-auto viewport-subtitle">
            A seamless bridge connecting the farm to your table in five simple steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 standard-grid gap-4 sm:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className={`relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 standard-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-500 group ${step.spanClass}`}
              >
                {/* Large Background Number */}
                <div className="absolute -bottom-4 -right-4 text-[4rem] sm:text-[6rem] lg:text-[8rem] font-black text-[#5480a8]/[0.07] leading-none group-hover:scale-105 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-700 pointer-events-none">
                  {step.num}
                </div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <IconContainer
                    icon={Icon}
                    tint={i % 2 === 0 ? 'green' : 'gold'}
                    isDark={false}
                    className="mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-1 sm:mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed max-w-[95%]">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DirectConnectionSection() {
  return (
    <section id="how" data-bg="dark" className="viewport-section px-4 sm:px-6">
      <div className="absolute inset-0">
        <Grainient
          color1="#16251a"
          color2="#0a1209"
          color3="#050806"
          timeSpeed={0.09}
          warpStrength={0.75}
          warpFrequency={3.2}
          warpAmplitude={110.0}
          grainAmount={0.038}
          grainScale={1.55}
          contrast={1.18}
          saturation={0.72}
          rotationAmount={260.0}
          zoom={0.91}
        />
      </div>

      {/* Ambient glow layers */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#2d5c3a]/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[280px] h-[280px] rounded-full bg-[#f0d878]/[0.04] blur-[90px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[280px] h-[280px] rounded-full bg-[#f0d878]/[0.04] blur-[90px]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 sm:mb-8"
        >
          <p className="text-[#7ab88a] text-xs font-bold tracking-[0.22em] uppercase mb-1 sm:mb-2">The Direct Model</p>
          <h2
            className="viewport-title font-bold leading-tight mb-2 text-[#f0ede6]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Connecting Farmers
            <br className="hidden sm:block" />
            <span className="text-[#7ab88a]"> Directly to Buyers</span>
          </h2>
          <p className="text-white/50 viewport-subtitle max-w-sm mx-auto leading-relaxed">
            One platform. Zero middlemen.{' '}
            <br className="hidden sm:block" />
            Maximum value for everyone.
          </p>
        </motion.div>

        {/* Three-column bridge layout: flex-col on mobile, flex row on desktop */}
        <div className="flex flex-col gap-4 md:flex-row items-stretch md:gap-0">

          {/* FARMER — left */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[30%] flex-shrink-0"
          >
            <div className="relative overflow-hidden bg-white/[0.055] backdrop-blur-2xl border border-white/10 standard-card h-full group hover:bg-white/[0.085] transition-all duration-500">
              <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7ab88a]/35 to-transparent" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <IconContainer
                  icon={Sprout}
                  tint="green"
                  isDark={true}
                  className="mb-3 sm:mb-4 scale-90 sm:scale-100"
                />
                <p className="text-[#7ab88a] text-xs font-bold tracking-[0.2em] uppercase mb-1 sm:mb-2">The Farmer</p>
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 leading-snug" style={{ letterSpacing: '-0.02em' }}>
                  Grows More.<br />Earns More.
                </h3>
                <div className="flex flex-col gap-3 sm:gap-4 items-center w-full">
                  {[
                    { label: 'Higher Earnings', sub: 'Keep up to 90%' },
                    { label: 'Instant Payments', sub: 'Direct bank transfer' },
                    { label: 'Wider Market Reach', sub: 'Country-wide buyers' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
                      className="flex flex-col items-center gap-0.5 w-full max-w-[240px] rounded-xl bg-white/5 border border-white/10 px-4 py-2.5"
                    >
                      <p className="text-[#7ab88a] text-sm sm:text-base font-semibold leading-none">{item.label}</p>
                      <p className="text-white/50 text-xs sm:text-sm leading-snug">{item.sub}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector left — desktop only */}
          <div className="hidden md:flex items-center justify-center flex-1 min-w-[28px] px-0.5">
            <div className="w-full flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-[#7ab88a]/20 to-[#7ab88a]/50" />
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#7ab88a]/50 mx-1" />
              <div className="flex-1 h-px bg-gradient-to-r from-[#7ab88a]/50 to-[#7ab88a]/20" />
            </div>
          </div>

          {/* KISAN KA DUKAN — center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[28%] flex-shrink-0 my-0 md:-my-4"
          >
            <div className="relative overflow-hidden bg-gradient-to-b from-[#233b2a] to-[#141f14] border border-[#7ab88a]/25 standard-card h-full shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-[#7ab88a]/15 blur-3xl" />
              <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7ab88a]/55 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7ab88a]/30 to-transparent" />
              <div className="pointer-events-none absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-[#7ab88a]/25 to-transparent" />
              <div className="pointer-events-none absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-[#7ab88a]/25 to-transparent" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <IconContainer
                  icon={Wheat}
                  tint="green"
                  isDark={true}
                  className="mb-2 sm:mb-3 scale-90 sm:scale-100"
                />
                <p className="text-[#7ab88a] text-xs font-bold tracking-[0.2em] uppercase mb-1 sm:mb-1.5">The Bridge</p>
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-1.5" style={{ letterSpacing: '-0.025em' }}>
                  kisan ka dukan
                </h3>
                <p className="text-white/40 text-sm mb-3 sm:mb-6">Where farm meets fork</p>

                <div className="flex flex-row md:flex-col gap-2 w-full justify-center">
                  {[
                    'Direct Marketplace',
                    'Transparent Trading',
                    'Verified Supply Chain',
                  ].map((label, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.93 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.38, delay: 0.38 + i * 0.1 }}
                      className="rounded-xl bg-[#7ab88a]/10 border border-[#7ab88a]/20 px-2 sm:px-4 py-1.5 sm:py-2 flex-1 md:flex-initial"
                    >
                      <p className="text-[#7ab88a] text-xs font-semibold">{label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector right — desktop only */}
          <div className="hidden md:flex items-center justify-center flex-1 min-w-[28px] px-0.5">
            <div className="w-full flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-amber-400/20 to-amber-400/50" />
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400/50 mx-1" />
              <div className="flex-1 h-px bg-gradient-to-r from-amber-400/50 to-amber-400/20" />
            </div>
          </div>

          {/* BUYER — right */}
          <motion.div
            initial={{ opacity: 0, x: 44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[30%] flex-shrink-0"
          >
            <div className="relative overflow-hidden bg-white/[0.055] backdrop-blur-2xl border border-white/10 standard-card h-full group hover:bg-white/[0.085] transition-all duration-500">
              <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/35 to-transparent" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <IconContainer
                  icon={Package}
                  tint="gold"
                  isDark={true}
                  className="mb-3 sm:mb-4 scale-90 sm:scale-100"
                />
                <p className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-1 sm:mb-2">The Buyer</p>
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 leading-snug" style={{ letterSpacing: '-0.02em' }}>
                  Pays Less.<br />Gets More.
                </h3>
                <div className="flex flex-col gap-3 sm:gap-4 items-center w-full">
                  {[
                    { label: 'Lower Prices', sub: 'No middlemen markup' },
                    { label: 'Farm Fresh Produce', sub: 'Harvested before delivery' },
                    { label: 'Full Traceability', sub: 'Know your farmer' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
                      className="flex flex-col items-center gap-0.5 w-full max-w-[240px] rounded-xl bg-white/5 border border-white/10 px-4 py-2.5"
                    >
                      <p className="text-amber-400 text-sm sm:text-base font-semibold leading-none">{item.label}</p>
                      <p className="text-white/50 text-xs sm:text-sm leading-snug">{item.sub}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 sm:mt-8 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#7ab88a]/40" />
            <span className="text-[#7ab88a] text-xs font-bold tracking-[0.22em] uppercase">Zero Middlemen</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#7ab88a]/40" />
          </div>
          <p className="text-white/40 text-sm text-center max-w-xs leading-relaxed">
            The shortest path from farm to table — built for trust, transparency, and real value.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';
const INTRO_VIDEO = '/it_realstic_like_this_image_so.mp4';

function HeroVideoSequence() {
  const [introEnded, setIntroEnded] = useState(false);
  return (
    <div className="absolute inset-0 w-full h-full bg-[#111827]">
      <BoomerangVideoBg 
        src={BG_VIDEO} 
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${introEnded ? 'opacity-100' : 'opacity-0'}`} 
      />
      <video 
        src={INTRO_VIDEO}
        autoPlay
        muted
        playsInline
        onEnded={() => setIntroEnded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${introEnded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
    <section data-bg="light" className="relative w-full min-h-[100svh] h-[100svh] lg:min-h-screen lg:h-screen overflow-hidden snap-start snap-always">
      <HeroVideoSequence />

      {/* Hero copy */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1
          className="leading-[0.95] max-w-5xl"
          style={{
            fontFamily: '"Rubik", sans-serif',
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#1A312C',
            letterSpacing: '-0.04em',
            fontSize: 'clamp(1.5rem, 6.5vh, 3.5rem)',
          }}
        >
          Fresh Produce{' '}
          <span>
            Directly From
            <br className="hidden sm:block" /> Farmers
          </span>
        </h1>
        <p className="mt-6 sm:mt-8 text-black text-sm sm:text-base md:text-lg leading-relaxed max-w-md px-2">
          No middlemen. Better prices. Straight from the field to your table.
        </p>
      </div>

      {/* Bottom-left CTA block */}
      <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
        <div className="flex items-center gap-2 text-[#3d5638] sm:text-white/95 mb-3">
          <Sparkles className="w-4 h-4" strokeWidth={1.95} />
          <span className="text-sm font-semibold sm:font-medium">
            dukan<sup className="text-[10px]">TM</sup>
          </span>
        </div>
        <p className="text-[#3d5638]/90 sm:text-white/85 text-xs leading-relaxed mb-6 max-w-xs font-medium sm:font-normal">
          A marketplace built for you — where every purchase costs nothing but your health and happy living.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <button className="bg-[#3d5638] sm:bg-white hover:bg-[#2d4228] sm:hover:bg-white/90 text-white sm:text-[#1f2a1d] text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors shadow-sm">
            Try it Live
          </button>
        </div>
      </div>

      {/* Bottom-right video link */}
      <Link to="/how-we-build" className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/90 text-sm hover:text-white transition-colors group">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
          <Play className="w-3 h-3 fill-white text-white ml-0.5" strokeWidth={1.95} />
        </div>
        <span className="font-medium">How we build?</span>
        <span className="text-white/60">1:35</span>
      </Link>


    </section>

    {/* Why Traditional Agri Marketplaces Fail */}
    <section data-bg="light" className="viewport-section px-4 sm:px-6">
      <div className="absolute inset-0">
        <Grainient
          color1="#ECB65F"
          color2="#F5D08B"
          color3="#FAE0A6"
          timeSpeed={0.12}
          warpStrength={0.9}
          warpFrequency={3.5}
          warpAmplitude={100.0}
          grainAmount={0.04}
          grainScale={1.6}
          contrast={1.25}
          saturation={0.85}
          rotationAmount={280.0}
          zoom={0.92}
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-8">

        {/* Heading */}
        <h2
          className="text-center viewport-title text-[#1f2a1d] mb-3 sm:mb-4"
          style={{ fontFamily: '"Lobster", sans-serif' }}
        >
          Why Traditional Agri Marketplaces Fail
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#4b5b47] viewport-subtitle max-w-xl mx-auto mb-6 sm:mb-8">
          The current system is broken. It favors the middleman while squeezing the
          people who actually grow and buy the food.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 standard-grid">

          {/* Farmer card */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 standard-card group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all"
          >
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7ab88a]/30 to-transparent" />

            <div className="relative z-10 flex items-center gap-3 mb-4 sm:mb-6">
              <IconContainer
                icon={Wheat}
                tint="green"
                isDark={false}
              />
              <h3 className="text-[#1f2a1d] text-lg sm:text-xl font-bold tracking-tight">The Farmer's Reality</h3>
            </div>

            <ul className="relative z-10 flex flex-col gap-2.5 sm:gap-4">
              {[
                'Earn less than 30% of the retail price',
                'Dependent on 3-5 layers of middlemen',
                'No direct access to real market demand',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-600 mt-0.5">
                    <X className="w-3 h-3" strokeWidth={1.95} />
                  </span>
                  <span className="text-[#4b5b47] viewport-text leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Buyer card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 standard-card group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all"
          >
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />

            <div className="relative z-10 flex items-center gap-3 mb-4 sm:mb-6">
              <IconContainer
                icon={ShoppingCart}
                tint="gold"
                isDark={false}
              />
              <h3 className="text-[#1f2a1d] text-lg sm:text-xl font-bold tracking-tight">The Buyer's Reality</h3>
            </div>

            <ul className="relative z-10 flex flex-col gap-2.5 sm:gap-4">
              {[
                'Zero sourcing transparency',
                'Inconsistent quality and seasonal shortages',
                'Inflated prices due to supply chain bloat',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-600 mt-0.5">
                    <X className="w-3 h-3" strokeWidth={1.95} />
                  </span>
                  <span className="text-[#4b5b47] viewport-text leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>

    {/* A Better Way Forward */}
    <section data-bg="light" className="viewport-section px-4 sm:px-6">
      <div className="absolute inset-0">
        <Grainient
          color1="#dff0df"
          color2="#7ab88a"
          color3="#2a5a3a"
          timeSpeed={0.16}
          warpStrength={1.0}
          warpFrequency={4.0}
          warpAmplitude={80.0}
          grainAmount={0.055}
          grainScale={1.9}
          contrast={1.4}
          saturation={1.0}
          rotationAmount={320.0}
          zoom={0.93}
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-8">

        <h2
          className="text-center viewport-title text-[#0f0f0f] mb-6 sm:mb-8"
          style={{ fontFamily: '"Lobster", sans-serif' }}
        >
          A Better Way Forward
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 standard-grid">

          {/* For Farmers — light glass card (Standardized) */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative overflow-hidden bg-white/55 backdrop-blur-2xl border border-white/70 standard-card group shadow-xl"
          >
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#85AB8B]/40 to-transparent" />
            <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div className="relative z-10">
              <IconContainer
                icon={Sprout}
                tint="green"
                isDark={false}
                className="mb-4"
              />
              <h3 className="text-[#1f2a1d] text-2xl sm:text-3xl font-bold mb-2">For Farmers</h3>
              <p className="text-[#4b5b47] text-sm italic mb-4 sm:mb-6 leading-relaxed">Sell direct, earn more, no agents.</p>
              <ul className="flex flex-col gap-2.5 sm:gap-4">
                {[
                  'Higher profit margins',
                  'Direct relationships with buyers',
                  'Real-time market reach',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#85AB8B]/20 border border-[#85AB8B]/40 flex items-center justify-center text-[#85AB8B]">
                      <Check className="w-3 h-3" strokeWidth={1.95} />
                    </span>
                    <span className="text-[#1f2a1d]/80 viewport-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative overflow-hidden bg-white/55 backdrop-blur-2xl border border-white/70 standard-card group shadow-xl"
          >
            <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div className="relative z-10">
              <IconContainer
                icon={Package}
                tint="gold"
                isDark={false}
                className="mb-4"
              />
              <h3 className="text-[#1f2a1d] text-2xl sm:text-3xl font-bold mb-2">For Buyers</h3>
              <p className="text-[#4b5b47] text-sm italic mb-4 sm:mb-6 leading-relaxed">Fresh farm produce, fair prices, know your farmer.</p>
              <ul className="flex flex-col gap-2.5 sm:gap-4">
                {[
                  'Transparent sourcing',
                  'Consistent fresh quality',
                  'Direct farm connection',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#336443]/15 border border-[#336443]/35 flex items-center justify-center text-[#336443]">
                      <Check className="w-3 h-3" strokeWidth={1.95} />
                    </span>
                    <span className="text-[#1f2a1d]/80 viewport-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
    {/* How it Works */}
    <HowItWorksSection />

    {/* Built for Trust and Efficiency */}
    <section data-bg="light" className="viewport-section px-4 sm:px-6">
      <div className="absolute inset-0">
        <Grainient
          color1="#f8e090"
          color2="#dfa855"
          color3="#9c7030"
          timeSpeed={0.14}
          warpStrength={1.2}
          warpFrequency={4.2}
          warpAmplitude={72.0}
          grainAmount={0.06}
          grainScale={1.8}
          contrast={1.5}
          saturation={1.2}
          rotationAmount={310.0}
          zoom={0.94}
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto w-full">

        <RadialTimelineDemo />

      </div>
    </section>
    <DirectConnectionSection />
    <FAQSection />
    <FinalCTASection />
    </>
  );
}

// Helper components and FinalCTASection for agricultural golden hour CTA
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      angle: number;
      spin: number;
    }[] = [];

    const createParticle = (initY = false) => {
      return {
        x: Math.random() * width,
        y: initY ? Math.random() * height : height + 10,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.3 + 0.1),
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        fadeSpeed: Math.random() * 0.004 + 0.001,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.015 - 0.007,
      };
    };

    for (let i = 0; i < 35; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.angle += p.spin;
        p.x += p.speedX + Math.sin(p.angle) * 0.12;

        ctx.beginPath();
        const fillGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        fillGradient.addColorStop(0, `rgba(212, 140, 32, ${p.opacity})`);
        fillGradient.addColorStop(1, `rgba(212, 140, 32, 0)`);
        ctx.fillStyle = fillGradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[i] = createParticle(false);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

function FinalCTASection() {
  const { openWaitlist } = useOutletContext<any>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animateActive, setAnimateActive] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!animateActive) { setActiveStep(-1); return; }
    setActiveStep(0);
    const timers = [
      setTimeout(() => setActiveStep(1), 350),
      setTimeout(() => setActiveStep(2), 700),
      setTimeout(() => setActiveStep(3), 1050),
      setTimeout(() => setActiveStep(4), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [animateActive]);

  const milestones = [
    { title: 'Seed', desc: 'Planted with care', icon: Sprout },
    { title: 'Harvest', desc: 'Picked at peak freshness', icon: Wheat },
    { title: 'Marketplace', desc: 'Listed transparently', icon: ShoppingCart },
    { title: 'Delivery', desc: 'Shipped with care', icon: Truck },
    { title: 'Your Table', desc: 'Fresh & nutritious', icon: Package },
  ];

  return (
    <motion.section
      ref={sectionRef}
      data-bg="light"
      onViewportEnter={() => setAnimateActive(true)}
      viewport={{ once: true, amount: 0.15 }}
      className="viewport-section flex-col items-center justify-center px-4 sm:px-6"
      style={{ scrollSnapAlign: 'none' }}
    >
      {/* Warm cream background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #FFFDF8 0%, #FAF3E8 35%, #F5ECD8 70%, #EFE2CC 100%)' }} />

      {/* Ambient golden glow orbs */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#d4a020]/[0.08] blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#c08818]/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#d4a020]/[0.05] blur-[100px]" />

      {/* Particle Canvas */}
      <ParticleCanvas />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animateActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#b8860b]/40" />
            <p className="text-[#b8860b] text-xs font-bold tracking-[0.25em] uppercase">The Simplicity Promise</p>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#b8860b]/40" />
          </div>
          <h2 className="viewport-title font-bold tracking-tight text-[#1a0f02] leading-[1.08] mb-2" style={{ letterSpacing: '-0.03em' }}>
            The Future of Agriculture<br />
            <span className="bg-gradient-to-r from-[#b8860b] via-[#d4a020] to-[#b8860b] bg-clip-text text-transparent italic font-serif font-normal">Should Be This Simple.</span>
          </h2>
          <p className="text-[#5a4a30]/60 viewport-subtitle max-w-md mx-auto leading-relaxed">
            From seed to table — one transparent, trusted marketplace.
          </p>
        </motion.div>

        {/* Timeline Journey */}
        <div className="relative w-full max-w-3xl mx-auto mb-6 sm:mb-8">
          {/* The golden connecting line */}
          <div className="absolute top-[18px] sm:top-[26px] lg:top-[32px] left-[10%] right-[10%] h-[2px] pointer-events-none">
            {/* Background track */}
            <div className="absolute inset-0 bg-[#d4a020]/[0.15] rounded-full" />
            {/* Animated golden line */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4a020] to-[#f0c850] rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={animateActive ? { scaleX: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(212,160,32,0.5))' }}
            />
            {/* Intermediate checkpoint dots */}
            {[25, 50, 75].map((pct, i) => (
              <div
                key={i}
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-700 ${activeStep >= i + 1 ? 'bg-[#d4a020] shadow-[0_0_8px_rgba(212,160,32,0.6)] scale-100' : 'bg-[#d4a020]/20 scale-75'}`}
                style={{ left: `${pct}%`, transitionDelay: `${i * 150}ms` }}
              />
            ))}
          </div>

          {/* Milestone nodes */}
          <div className="relative flex items-start justify-between px-0">
            {milestones.map((step, idx) => {
              const isActive = idx <= activeStep;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={animateActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center w-[18%] min-w-0"
                >
                  {/* Circle */}
                  <IconContainer
                    icon={step.icon}
                    tint="gold"
                    isDark={false}
                    className={`relative transition-all duration-700 scale-75 sm:scale-90 lg:scale-100 ${
                      isActive
                        ? 'bg-white border-2 border-[#d4a020] shadow-[0_0_24px_rgba(212,160,32,0.3)]'
                        : 'bg-white/60 border border-[#d4a020]/15 opacity-40'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-[#d4a020]/10 animate-pulse" />
                    )}
                  </IconContainer>
                  {/* Label */}
                  <div className={`mt-2 sm:mt-3 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
                    <h4 className={`font-bold text-sm leading-tight transition-colors duration-700 ${isActive ? 'text-[#1a0f02]' : 'text-[#1a0f02]/30'}`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs mt-0.5 leading-snug transition-colors duration-700 ${isActive ? 'text-[#5a4a30]/70' : 'text-[#5a4a30]/20'}`}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={animateActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="text-center z-10 relative"
        >
          <button onClick={openWaitlist} className="relative group overflow-hidden bg-gradient-to-r from-[#b8860b] to-[#9a6f08] hover:from-[#d4a020] hover:to-[#b8860b] text-white font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-[0_0_40px_rgba(184,134,11,0.25)] border border-[#d4a020]/30 transition-all duration-500 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base tracking-wide">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            Join The Waitlist
          </button>
          <p className="mt-2.5 text-[#5a4a30]/60 text-xs sm:text-sm tracking-wide">
            Early access · No commitment · Free forever
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EFE2CC] to-transparent pointer-events-none z-0" />
    </motion.section>
  );
}