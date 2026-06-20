import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Wrench, Rocket, Star, Heart, Zap, Coffee } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  message?: string;
}

export default function ComingSoonPage({ title, message }: ComingSoonPageProps) {
  // Floating icons array to create a fun background
  const floatingIcons = [
    { Icon: Rocket, color: 'text-amber-500', size: 48, top: '15%', left: '10%', delay: 0 },
    { Icon: Star, color: 'text-yellow-400', size: 36, top: '25%', left: '80%', delay: 1 },
    { Icon: Zap, color: 'text-blue-400', size: 54, top: '70%', left: '15%', delay: 2 },
    { Icon: Heart, color: 'text-pink-400', size: 42, top: '80%', left: '75%', delay: 1.5 },
    { Icon: Wrench, color: 'text-stone-400', size: 48, top: '40%', left: '5%', delay: 0.5 },
    { Icon: Coffee, color: 'text-orange-400', size: 40, top: '10%', left: '70%', delay: 2.5 },
    { Icon: Sparkles, color: 'text-indigo-400', size: 64, top: '50%', left: '85%', delay: 0.8 },
  ];

  return (
    <section data-bg="light" className="bg-[#fbfaf8] min-h-screen text-[#1f2a1d] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Animated glowing blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-400/20 blur-[100px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-emerald-400/15 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/10 blur-[100px] rounded-full pointer-events-none" 
      />

      {/* Floating Icons Background */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }}
          transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
          className={`absolute ${item.color} opacity-30 hidden lg:block pointer-events-none z-0`}
          style={{ top: item.top, left: item.left }}
        >
          <item.Icon size={item.size} strokeWidth={1.5} />
        </motion.div>
      ))}
      
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-2xl mx-auto mt-16 sm:mt-0">
        
        {/* Main Bouncing Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8 relative"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center border-[3px] border-amber-100 relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-amber-500 fill-amber-500/20" strokeWidth={1.5} />
            </motion.div>
          </div>
          {/* Confetti-like elements around the icon */}
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
            className="absolute inset-[-20px] sm:inset-[-30px] border-[2px] border-dashed border-amber-300/60 rounded-full z-0" 
          />
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-emerald-600 to-indigo-600 py-4 px-4 leading-normal"
          style={{ fontFamily: '"Lobster", sans-serif' }}
        >
          {title}
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-xl border border-white mb-10 w-full relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
          <p className="text-stone-700 text-lg sm:text-2xl font-medium leading-relaxed relative z-10">
            {message || "We're cooking up something amazing. Grab a coffee and stay tuned!"}
          </p>
        </motion.div>

        {/* Interactive Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="group relative flex items-center gap-3 bg-[#1f2a1d] hover:bg-black text-white font-bold px-8 py-4 rounded-full transition-all shadow-[0_10px_40px_rgba(31,42,29,0.3)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-emerald-400/20 to-indigo-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-lg">Take Me Back</span>
            <Rocket className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
