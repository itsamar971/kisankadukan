import { useState, useEffect, useRef } from 'react';
import { LogIn, Play, Sparkles, Menu, X, User, List, Clock, ShieldCheck, Star, BookOpen, Smartphone, Shield, Wheat, ShoppingCart, Sprout, Package, UploadCloud, Search, Handshake, CheckCircle2, Truck, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import BoomerangVideoBg from './BoomerangVideoBg';
import Grainient from './Grainient';
import FAQSection from './FAQSection';


function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Farmer Lists Crop',
      desc: 'Farmers upload crop details, images, and expected yield right from their phone.',
      icon: UploadCloud,
      spanClass: 'lg:col-span-2'
    },
    {
      num: '02',
      title: 'Buyer Browses',
      desc: 'Buyers search and filter verified produce based on quality, location, and price.',
      icon: Search,
      spanClass: 'lg:col-span-2'
    },
    {
      num: '03',
      title: 'Place Request',
      desc: 'Submit an intent to purchase directly to the farmer with no hidden fees.',
      icon: Handshake,
      spanClass: 'lg:col-span-2'
    },
    {
      num: '04',
      title: 'Farmer Accepts',
      desc: 'The farmer reviews the request, confirms availability, and locks in the deal.',
      icon: CheckCircle2,
      spanClass: 'lg:col-span-3'
    },
    {
      num: '05',
      title: 'Transaction Complete',
      desc: 'Payment is secured, and fresh produce is delivered directly from the farm.',
      icon: Truck,
      spanClass: 'lg:col-span-3'
    }
  ];

  return (
    <section data-bg="light" className="relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6 min-h-screen flex flex-col justify-center">
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
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-[#5480a8] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-[11px] mb-2 block">Simple & Transparent</span>
          <h2
            className="text-[2rem] sm:text-4xl md:text-[3rem] font-bold text-[#111827] leading-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            How it Works
          </h2>
          <p className="mt-3 text-[#374151] max-w-xl mx-auto text-sm sm:text-base">
            A seamless bridge connecting the farm to your table in five simple steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className={`relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 rounded-[1.5rem] p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/50 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-500 group ${step.spanClass}`}
              >
                {/* Large Background Number */}
                <div className="absolute -bottom-4 -right-4 text-[7rem] sm:text-[8rem] font-black text-[#5480a8]/[0.07] leading-none group-hover:scale-105 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-700 pointer-events-none">
                  {step.num}
                </div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/70 border border-white shadow-sm flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-5 h-5 text-[#25394f]" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#374151] text-xs sm:text-sm leading-relaxed max-w-[90%]">
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
    <section data-bg="dark" className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6">
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

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-[#7ab88a] text-[11px] font-bold tracking-[0.22em] uppercase mb-4">The Direct Model</p>
          <h2
            className="text-[2.1rem] sm:text-5xl md:text-[3.5rem] font-bold leading-tight mb-4 text-[#f0ede6]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Connecting Farmers
            <br className="hidden sm:block" />
            <span className="text-[#7ab88a]"> Directly to Buyers</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-sm mx-auto leading-relaxed">
            One platform. Zero middlemen.{' '}
            <br className="hidden sm:block" />
            Maximum value for everyone.
          </p>
        </motion.div>

        {/* Three-column bridge layout */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">

          {/* FARMER — left */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[30%] flex-shrink-0"
          >
            <div className="relative overflow-hidden rounded-[28px] bg-white/[0.055] backdrop-blur-2xl border border-white/10 p-6 sm:p-8 h-full group hover:bg-white/[0.085] transition-all duration-500">
              <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#7ab88a]/15 blur-3xl group-hover:bg-[#7ab88a]/20 transition-colors duration-700" />
              <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7ab88a]/35 to-transparent" />

              <div className="relative z-10">
                <div className="mb-4 w-[48px] h-[48px] rounded-2xl bg-[#7ab88a]/10 border border-[#7ab88a]/20 flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-[#7ab88a]" strokeWidth={1.4} />
                </div>
                <p className="text-[#7ab88a] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">The Farmer</p>
                <h3 className="text-white text-[1.5rem] sm:text-[1.7rem] font-bold mb-6 leading-snug" style={{ letterSpacing: '-0.02em' }}>
                  Grows More.<br />Earns More.
                </h3>
                <div className="flex flex-col gap-3.5">
                  {[
                    { label: 'Higher Earnings', sub: 'Keep up to 90% of sale price' },
                    { label: 'Instant Payments', sub: 'Direct transfer on order' },
                    { label: 'Wider Market Reach', sub: 'Buyers across the country' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
                      className="flex items-start gap-3.5"
                    >
                      <span className="flex-shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full bg-[#7ab88a]" />
                      <div>
                        <p className="text-white/90 text-sm font-semibold leading-none mb-1">{item.label}</p>
                        <p className="text-white/35 text-xs leading-snug">{item.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector left — desktop */}
          <div className="hidden md:flex items-center justify-center flex-1 min-w-[28px] px-0.5">
            <div className="w-full flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-[#7ab88a]/20 to-[#7ab88a]/50" />
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#7ab88a]/50 mx-1" />
              <div className="flex-1 h-px bg-gradient-to-r from-[#7ab88a]/50 to-[#7ab88a]/20" />
            </div>
          </div>

          {/* Connector left — mobile */}
          <div className="flex md:hidden justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-gradient-to-b from-[#7ab88a]/40 to-[#7ab88a]/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#7ab88a]/50" />
              <div className="w-px h-6 bg-gradient-to-b from-[#7ab88a]/20 to-transparent" />
            </div>
          </div>

          {/* KISAN KA DUKAN — center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[28%] flex-shrink-0 md:-my-4"
          >
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#233b2a] to-[#141f14] border border-[#7ab88a]/25 p-6 sm:p-8 h-full shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-[#7ab88a]/15 blur-3xl" />
              <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7ab88a]/55 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7ab88a]/30 to-transparent" />
              <div className="pointer-events-none absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-[#7ab88a]/25 to-transparent" />
              <div className="pointer-events-none absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-[#7ab88a]/25 to-transparent" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-3 w-12 h-12 rounded-full bg-[#7ab88a]/15 border border-[#7ab88a]/30 flex items-center justify-center">
                  <Wheat className="w-8 h-8 text-[#7ab88a]" strokeWidth={1.2} />
                </div>
                <p className="text-[#7ab88a] text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5">The Bridge</p>
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-1.5" style={{ letterSpacing: '-0.025em' }}>
                  kisan ka dukan
                </h3>
                <p className="text-white/30 text-xs mb-6">Where farm meets fork</p>

                <div className="flex flex-col gap-2 w-full">
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
                      className="rounded-xl bg-[#7ab88a]/10 border border-[#7ab88a]/20 px-4 py-2"
                    >
                      <p className="text-[#7ab88a] text-xs font-semibold">{label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector right — desktop */}
          <div className="hidden md:flex items-center justify-center flex-1 min-w-[28px] px-0.5">
            <div className="w-full flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-amber-400/20 to-amber-400/50" />
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400/50 mx-1" />
              <div className="flex-1 h-px bg-gradient-to-r from-amber-400/50 to-amber-400/20" />
            </div>
          </div>

          {/* Connector right — mobile */}
          <div className="flex md:hidden justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-gradient-to-b from-amber-400/40 to-amber-400/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
              <div className="w-px h-6 bg-gradient-to-b from-amber-400/20 to-transparent" />
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
            <div className="relative overflow-hidden rounded-[28px] bg-white/[0.055] backdrop-blur-2xl border border-white/10 p-6 sm:p-8 h-full group hover:bg-white/[0.085] transition-all duration-500">
              <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl group-hover:bg-amber-400/15 transition-colors duration-700" />
              <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/35 to-transparent" />

              <div className="relative z-10">
                <div className="mb-4 w-[48px] h-[48px] rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-amber-400" strokeWidth={1.4} />
                </div>
                <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">The Buyer</p>
                <h3 className="text-white text-[1.5rem] sm:text-[1.7rem] font-bold mb-6 leading-snug" style={{ letterSpacing: '-0.02em' }}>
                  Pays Less.<br />Gets More.
                </h3>
                <div className="flex flex-col gap-3.5">
                  {[
                    { label: 'Lower Prices', sub: 'No middlemen markup' },
                    { label: 'Farm Fresh Produce', sub: 'Harvested before delivery' },
                    { label: 'Full Traceability', sub: 'Know your farmer, know your food' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
                      className="flex items-start gap-3.5"
                    >
                      <span className="flex-shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <div>
                        <p className="text-white/90 text-sm font-semibold leading-none mb-1">{item.label}</p>
                        <p className="text-white/35 text-xs leading-snug">{item.sub}</p>
                      </div>
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
          className="mt-10 sm:mt-12 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#7ab88a]/40" />
            <span className="text-[#7ab88a] text-[10px] font-bold tracking-[0.22em] uppercase">Zero Middlemen</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#7ab88a]/40" />
          </div>
          <p className="text-white/30 text-xs text-center max-w-xs leading-relaxed">
            The shortest path from farm to table — built for trust, transparency, and real value.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [navOnLight, setNavOnLight] = useState(true);
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const update = () => {
      const sections = document.querySelectorAll('section[data-bg]');
      const navbarCheckPointY = 50;
      
      let activeSection = null;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= navbarCheckPointY && rect.bottom >= navbarCheckPointY) {
          activeSection = sections[i];
          break;
        }
      }

      if (activeSection) {
        const bg = activeSection.getAttribute('data-bg');
        setNavOnLight(bg === 'light');
        
        const shouldHide = activeSection.getAttribute('data-hide-nav') === 'true';
        setHideNav(shouldHide);
      } else {
        setNavOnLight(true);
        setHideNav(false);
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    return () => window.removeEventListener('scroll', update);
  }, []);

  const navLinks = [
    { href: '#mission', label: 'Purpose' },
    { href: '#how', label: 'The Process' },
    { href: '#pricing', label: 'Locations' },
    { href: '#about', label: 'About Us' },
  ];

  return (
    <>
    <section data-bg="light" className="relative w-full min-h-screen sm:h-screen overflow-hidden">
      <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 w-full h-full" />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-5 md:px-8 py-3 sm:py-4 pt-[max(env(safe-area-inset-top),0.75rem)] transition-all duration-500 ${
        hideNav ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 pointer-events-auto translate-y-0'
      }`}>
        <div className={`flex items-center gap-2 transition-colors duration-500 ${navOnLight ? 'text-black' : 'text-white'}`}>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
            kisan ka dukan<sup className="text-[10px] sm:text-xs font-medium">TM</sup>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`relative text-sm px-3 py-2 font-medium transition-colors group ${
                activeLink === link.href ? 'text-[#1f2a1d]' : 'text-[#4b5b47] hover:text-[#1f2a1d]'
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0.5 left-3 right-3 h-px bg-[#1f2a1d] transition-all duration-300 origin-left ${
                activeLink === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </a>
          ))}
          <button className="ml-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
            Join Waitlist
          </button>
        </div>

        <div className={`flex items-center gap-3 sm:gap-6 transition-colors duration-500 ${navOnLight ? 'text-black' : 'text-white/90'}`}>
          <a href="#login" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
            <LogIn className="w-4 h-4" />
            Enter
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[#1f2a1d] transition-all duration-300 hover:bg-white/90"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Menu
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-[#1f2a1d]/40 backdrop-blur-sm" />
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold text-[#1f2a1d] py-4 border-b border-[#1f2a1d]/10 transition-all duration-500 ${
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
          >
            <a href="#login" className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden">
              <LogIn className="w-4 h-4" />
              Enter
            </a>
            <button className="mt-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>

      {/* Hero copy */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1
          className="leading-[0.95] text-[1.2rem] sm:text-[1.35rem] md:text-[1.8rem] lg:text-[2.85rem] xl:text-[3.15rem] max-w-5xl"
          style={{
            fontFamily: '"Rubik", sans-serif',
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#1A312C',
            letterSpacing: '-0.04em',
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
          <Sparkles className="w-4 h-4" />
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
      <div className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/90 text-sm">
        <button className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
          <Play className="w-3 h-3 fill-white text-white ml-0.5" />
        </button>
        <span className="font-medium">How we build?</span>
        <span className="text-white/60">1:35</span>
      </div>


    </section>

    {/* Why Traditional Agri Marketplaces Fail */}
    <section data-bg="dark" className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6">
      <div className="absolute inset-0">
        <Grainient
          color1="#3d6b4a"
          color2="#1a2e1a"
          color3="#0c190c"
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
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Heading */}
        <h2
          className="text-center text-[2rem] sm:text-5xl md:text-[3.5rem] font-bold text-white leading-tight mb-5"
          style={{ fontFamily: '"Lobster", sans-serif', letterSpacing: '-0.01em' }}
        >
          Why Traditional Agri Marketplaces Fail
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#85AB8B] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-16">
          The current system is broken. It favors the middleman while squeezing the
          people who actually grow and buy the food.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Farmer card */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] p-8 sm:p-10 group"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[#85AB8B]/20 blur-3xl group-hover:bg-[#85AB8B]/30 transition-colors duration-700" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#85AB8B]/30 to-transparent" />

            <div className="relative z-10 flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-2xl bg-[#85AB8B]/15 border border-[#85AB8B]/25 flex items-center justify-center">
                <Wheat className="w-5 h-5 text-[#85AB8B]" strokeWidth={1.5} />
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">The Farmer's Reality</h3>
            </div>

            <ul className="relative z-10 flex flex-col gap-4">
              {[
                'Earn less than 30% of the retail price',
                'Dependent on 3-5 layers of middlemen',
                'No direct access to real market demand',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center text-red-400 text-[9px] font-black mt-0.5">✘</span>
                  <span className="text-white/75 text-sm sm:text-base leading-snug">{item}</span>
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
            className="relative overflow-hidden rounded-3xl bg-white/[0.07] backdrop-blur-2xl border border-white/[0.13] p-8 sm:p-10 group"
          >
            <div className="pointer-events-none absolute -top-16 -left-16 w-52 h-52 rounded-full bg-amber-400/15 blur-3xl group-hover:bg-amber-400/25 transition-colors duration-700" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />

            <div className="relative z-10 flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">The Buyer's Reality</h3>
            </div>

            <ul className="relative z-10 flex flex-col gap-4">
              {[
                'Zero sourcing transparency',
                'Inconsistent quality and seasonal shortages',
                'Inflated prices due to supply chain bloat',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center text-red-400 text-[9px] font-black mt-0.5">✘</span>
                  <span className="text-white/75 text-sm sm:text-base leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>

    {/* A Better Way Forward */}
    <section data-bg="light" className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6">
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
      <div className="relative z-10 max-w-5xl mx-auto">

        <h2
          className="text-center text-[2rem] sm:text-5xl md:text-[3.25rem] font-bold text-[#0f0f0f] leading-tight mb-16"
          style={{ fontFamily: '"Lobster", sans-serif', letterSpacing: '-0.01em' }}
        >
          A Better Way Forward
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* For Farmers — dark glass card */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-[#1f2a1d]/80 backdrop-blur-2xl border border-white/[0.09] p-8 sm:p-10 group shadow-xl"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#85AB8B]/25 blur-3xl group-hover:bg-[#85AB8B]/35 transition-colors duration-700" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#85AB8B]/40 to-transparent" />
            <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10">
              <div className="mb-4 w-12 h-12 rounded-2xl bg-[#85AB8B]/15 border border-[#85AB8B]/25 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-[#85AB8B]" strokeWidth={1.5} />
              </div>
              <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">For Farmers</h3>
              <p className="text-[#85AB8B] text-sm italic mb-8 leading-relaxed">Sell direct, earn more, no agents.</p>
              <ul className="flex flex-col gap-4">
                {[
                  'Higher profit margins',
                  'Direct relationships with buyers',
                  'Real-time market reach',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#85AB8B]/20 border border-[#85AB8B]/40 flex items-center justify-center text-[#85AB8B] text-[9px] font-black">✓</span>
                    <span className="text-white/85 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* For Buyers — light glass card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-white/55 backdrop-blur-2xl border border-white/70 p-8 sm:p-10 group shadow-xl"
          >
            <div className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-amber-300/35 blur-3xl group-hover:bg-amber-300/50 transition-colors duration-700" />
            <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div className="relative z-10">
              <div className="mb-4 w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                <Package className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-[#1f2a1d] text-2xl sm:text-3xl font-bold mb-2">For Buyers</h3>
              <p className="text-[#4b5b47] text-sm italic mb-8 leading-relaxed">Fresh farm produce, fair prices, know your farmer.</p>
              <ul className="flex flex-col gap-4">
                {[
                  'Transparent sourcing',
                  'Consistent fresh quality',
                  'Direct farm connection',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#336443]/15 border border-[#336443]/35 flex items-center justify-center text-[#336443] text-[9px] font-black">✓</span>
                    <span className="text-[#1f2a1d]/80 text-sm sm:text-base">{item}</span>
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
    <section data-bg="light" className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6">
      <div className="absolute inset-0">
        <Grainient
          color1="#f8e090"
          color2="#c87820"
          color3="#6a3800"
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
      <div className="relative z-10 max-w-5xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-bold text-[#0f0f0f] text-[2rem] sm:text-5xl md:text-[3.25rem] leading-tight mb-14"
          style={{ letterSpacing: '-0.03em' }}
        >
          Built for Trust and Efficiency
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: User,         label: 'Farmer profiles'      },
            { icon: List,         label: 'Live listings'         },
            { icon: Clock,        label: 'Real-time availability'},
            { icon: ShieldCheck,  label: 'Secure transactions'   },
            { icon: Star,         label: 'Premium membership'    },
            { icon: BookOpen,     label: 'Learning resources'    },
            { icon: Smartphone,   label: 'Mobile-friendly'       },
            { icon: Shield,       label: 'Trusted marketplace'   },
          ].map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-black/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-5 cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-[#ededed] flex items-center justify-center">
                <Icon className="w-6 h-6 text-[#1f2a1d]" strokeWidth={1.5} />
              </div>
              <span className="text-[#1f2a1d] font-semibold text-sm sm:text-base text-center leading-snug">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
    <DirectConnectionSection />
    <FAQSection />
    <FinalCTASection />
    <Footer />
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
    { title: 'Seed', desc: 'Planted with care', icon: <Sprout className="w-5 h-5" strokeWidth={1.5} /> },
    { title: 'Harvest', desc: 'Picked at peak freshness', icon: <Wheat className="w-5 h-5" strokeWidth={1.5} /> },
    { title: 'Marketplace', desc: 'Listed transparently', icon: <ShoppingCart className="w-5 h-5" strokeWidth={1.5} /> },
    { title: 'Delivery', desc: 'Shipped with care', icon: <Truck className="w-5 h-5" strokeWidth={1.5} /> },
    { title: 'Your Table', desc: 'Fresh & nutritious', icon: <Package className="w-5 h-5" strokeWidth={1.5} /> },
  ];

  return (
    <motion.section
      ref={sectionRef}
      data-bg="light"
      data-hide-nav="true"
      onViewportEnter={() => setAnimateActive(true)}
      viewport={{ once: true, amount: 0.15 }}
      className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 sm:px-6"
    >
      {/* Warm cream background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #FFFDF8 0%, #FAF3E8 35%, #F5ECD8 70%, #EFE2CC 100%)' }} />

      {/* Ambient golden glow orbs */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#d4a020]/[0.08] blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#c08818]/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#d4a020]/[0.05] blur-[100px]" />

      {/* Particle Canvas */}
      <ParticleCanvas />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center py-16 sm:py-20">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animateActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#b8860b]/40" />
            <p className="text-[#b8860b] text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase">The Simplicity Promise</p>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#b8860b]/40" />
          </div>
          <h2 className="text-[2rem] sm:text-[3rem] md:text-[3.5rem] font-bold tracking-tight text-[#1a0f02] leading-[1.08] mb-4" style={{ letterSpacing: '-0.03em' }}>
            The Future of Agriculture<br />
            <span className="bg-gradient-to-r from-[#b8860b] via-[#d4a020] to-[#b8860b] bg-clip-text text-transparent italic font-serif font-normal">Should Be This Simple.</span>
          </h2>
          <p className="text-[#5a4a30]/60 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            From seed to table — one transparent, trusted marketplace.
          </p>
        </motion.div>

        {/* Timeline Journey */}
        <div className="relative w-full max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* The golden connecting line */}
          <div className="absolute top-[28px] sm:top-[32px] left-[10%] right-[10%] h-[2px] pointer-events-none">
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
                  <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-700 ${
                    isActive
                      ? 'bg-white border-2 border-[#d4a020] shadow-[0_0_24px_rgba(212,160,32,0.3)] text-[#b8860b]'
                      : 'bg-white/60 border border-[#d4a020]/15 text-[#b8860b]/25'
                  }`}>
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-[#d4a020]/10 animate-pulse" />
                    )}
                    <div className="relative z-10">{step.icon}</div>
                  </div>
                  {/* Label */}
                  <div className={`mt-3 sm:mt-4 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
                    <h4 className={`font-bold text-[11px] sm:text-xs leading-tight transition-colors duration-700 ${isActive ? 'text-[#1a0f02]' : 'text-[#1a0f02]/30'}`}>
                      {step.title}
                    </h4>
                    <p className={`text-[9px] sm:text-[10px] mt-1 leading-snug transition-colors duration-700 ${isActive ? 'text-[#5a4a30]/70' : 'text-[#5a4a30]/20'}`}>
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
          <button className="relative group overflow-hidden bg-gradient-to-r from-[#b8860b] to-[#9a6f08] hover:from-[#d4a020] hover:to-[#b8860b] text-white font-bold px-12 py-4 rounded-full shadow-[0_0_40px_rgba(184,134,11,0.25)] border border-[#d4a020]/30 transition-all duration-500 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base tracking-wide">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            Join The Waitlist
          </button>
          <p className="mt-4 text-[#5a4a30]/40 text-[10px] sm:text-xs tracking-wide">
            Early access · No commitment · Free forever
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EFE2CC] to-transparent pointer-events-none z-0" />
    </motion.section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'How it Works', href: '#how' },
        { label: 'For Farmers', href: '#farmers' },
        { label: 'For Buyers', href: '#buyers' },
        { label: 'Pricing', href: '#pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Our Mission', href: '#mission' },
        { label: 'Careers', href: '#careers' },
        { label: 'Press Kit', href: '#press' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '#blog' },
        { label: 'Help Center', href: '#help' },
        { label: 'Community', href: '#community' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#050505] text-white overflow-hidden border-t border-white/[0.05]">
      {/* Subtle top golden gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dfb15b]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#dfb15b]/20 to-transparent blur-sm" />

      {/* Premium Ambient Golden Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-[#dfb15b]/[0.025] blur-[130px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Main footer grid */}
        <div className="py-16 sm:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-[#f3e8d2] to-[#dfb15b] bg-clip-text text-transparent">
                  kisan ka dukan<sup className="text-[9px] font-semibold text-[#dfb15b]/60 ml-1 relative -top-1.5 select-none">TM</sup>
                </h3>
                <p className="mt-1 text-[#dfb15b] text-[10px] font-bold tracking-[0.2em] uppercase">Farm to Fork</p>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8">
                Empowering growers with direct market access and connecting buyers directly with verified, fresh produce.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@kisankadukan.com" className="flex items-center gap-3 text-white/40 hover:text-[#dfb15b] transition-all duration-300 text-sm group">
                <Mail className="w-4 h-4 text-white/40 group-hover:text-[#dfb15b] transition-colors" strokeWidth={1.5} />
                hello@kisankadukan.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-3 text-white/40 hover:text-[#dfb15b] transition-all duration-300 text-sm group">
                <Phone className="w-4 h-4 text-white/40 group-hover:text-[#dfb15b] transition-colors" strokeWidth={1.5} />
                +91 123 456 7890
              </a>
              <div className="flex items-center gap-3 text-white/40 text-sm group">
                <MapPin className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                Bharat, India
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#dfb15b] mb-6">{col.title}</h4>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-white text-sm transition-all duration-300 flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-[#dfb15b]" strokeWidth={2} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {currentYear} Kisan Ka Dukan. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="text-white/30 hover:text-[#dfb15b] text-xs transition-colors">Privacy</a>
            <a href="#terms" className="text-white/30 hover:text-[#dfb15b] text-xs transition-colors">Terms</a>
            <a href="#cookies" className="text-white/30 hover:text-[#dfb15b] text-xs transition-colors">Cookies</a>
          </div>
          <p className="text-white/20 text-[10px] tracking-widest uppercase flex items-center gap-1.5">
            Made with <span className="text-[#dfb15b] animate-pulse">🌾</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}

export default App;