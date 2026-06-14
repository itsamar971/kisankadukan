import { useState, useRef, useEffect } from 'react';
import { Search, X, Rocket, Wheat, ShoppingCart, Truck, IndianRupee, Star, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  time: string;
}

type Category = { id: string; Icon: LucideIcon; label: string; accent: string };

const CATEGORIES: Category[] = [
  { id: 'launch',   Icon: Rocket,       label: 'Launch',   accent: '#5c9e6e' },
  { id: 'farmers',  Icon: Wheat,        label: 'Farmers',  accent: '#3d7a54' },
  { id: 'buyers',   Icon: ShoppingCart, label: 'Buyers',   accent: '#c8862a' },
  { id: 'delivery', Icon: Truck,        label: 'Delivery', accent: '#2a78c8' },
  { id: 'pricing',  Icon: IndianRupee,  label: 'Pricing',  accent: '#8a52b8' },
  { id: 'premium',  Icon: Star,         label: 'Premium',  accent: '#d4a017' },
];

const FAQ: Record<string, { q: string; a: string }[]> = {
  launch: [
    { q: 'When does the app launch?',    a: "We're in active beta. Full public launch is planned for Q3 2026. Join the waitlist for early access and exclusive launch-day benefits." },
    { q: 'Is registration free?',        a: 'Yes — registration is completely free for both farmers and buyers. Premium plans are optional and unlock advanced features.' },
    { q: 'Which cities are live first?', a: 'Starting with Pune, Nashik, and Kolhapur — major agricultural hubs. More cities roll out in Phase 2.' },
  ],
  farmers: [
    { q: 'How do farmers join?',       a: 'Three steps: Create your account → Complete KYC → Start listing produce. The whole process takes under 10 minutes.' },
    { q: 'What documents are needed?', a: 'Just your Aadhaar card and a photo of your land or crop. No complex paperwork, no agents.' },
    { q: 'How do I get paid?',         a: 'Payments transfer directly to your bank account within 24–48 hours of order confirmation. No waiting, no middlemen.' },
  ],
  buyers: [
    { q: 'How do I find fresh produce?', a: 'Browse by category, filter by location, or search for a specific crop. Every listing shows farm origin, harvest date, and farmer profile.' },
    { q: 'Is quality guaranteed?',       a: "All farmers are verified and produce is rated by the community. We have a freshness promise — if you're not satisfied, we make it right." },
    { q: 'Can I order in bulk?',         a: 'Absolutely. Bulk orders are supported for restaurants, hotels, and retailers. Contact us for custom pricing on large volumes.' },
  ],
  delivery: [
    { q: 'Is delivery available?',       a: 'Yes — farm-to-door delivery in supported cities. You can also pick up directly from the farm for maximum freshness.' },
    { q: 'How long does delivery take?', a: 'Most orders are delivered within 12–24 hours of harvest. Same-day delivery is available in select areas.' },
    { q: 'What are delivery charges?',   a: 'Free delivery on orders above ₹500. A flat ₹40 fee applies to smaller orders. Farm pickups are always free.' },
  ],
  pricing: [
    { q: 'How is pricing decided?',   a: 'Farmers set their own prices based on market rates. By eliminating middlemen, you typically pay 20–40% less than retail.' },
    { q: 'Are there hidden charges?', a: 'None. The price you see is the price you pay — no platform fees, no markup, no surprises at checkout.' },
    { q: 'Do prices change daily?',   a: 'Yes, produce prices reflect real market conditions. Farmers update listings based on availability and seasonal demand.' },
  ],
  premium: [
    { q: 'What are premium benefits?',  a: 'Priority listings for farmers, early access to new produce for buyers, dedicated support, bulk deal alerts, and detailed analytics.' },
    { q: 'How much does premium cost?', a: 'Plans start at ₹299/month for farmers and ₹199/month for buyers. Annual plans come with 2 months free.' },
    { q: 'Can I cancel anytime?',       a: 'Yes — no lock-ins. Cancel at any time from your account settings. Your free account always remains active.' },
  ],
};

function nowTime() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [askedIds, setAskedIds] = useState<Set<string>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleCategoryClick = (id: string) => {
    if (activeCategory !== id) {
      setActiveCategory(id);
      setMessages([]);
      setAskedIds(new Set());
    }
  };

  const handleQuestion = (q: string, a: string, qId: string) => {
    if (askedIds.has(qId)) return;
    setAskedIds(prev => { const s = new Set(prev); s.add(qId); return s; });
    setMessages(prev => [...prev, { id: `u-${qId}`, role: 'user', text: q, time: nowTime() }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: `b-${qId}`, role: 'bot', text: a, time: nowTime() }]);
    }, 900);
  };

  const searchResults = search.trim().length > 1
    ? Object.entries(FAQ).flatMap(([cat, items]) =>
        items
          .filter(item =>
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase())
          )
          .map(item => ({ ...item, cat }))
      )
    : [];

  const activeCat = CATEGORIES.find(c => c.id === activeCategory);
  const activeQuestions = activeCategory ? FAQ[activeCategory] : [];

  return (
    <section
      data-bg="light"
      className="relative overflow-hidden px-4 sm:px-6 pt-6 pb-12 lg:py-16 flex items-center min-h-0"
      style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #f3ede3 55%, #e7dfd1 100%)' }}
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: 'radial-gradient(circle, #1f2a1d 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="relative max-w-5xl mx-auto w-full">

        {/* ── Two-column layout: title+cards LEFT  |  search+chat RIGHT ── */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-start w-full">

          {/* LEFT: title block + category cards */}
          <div className="lg:w-[40%] flex-shrink-0 flex flex-col w-full">

            {/* Compact title */}
            <div className="mb-5">
              <p className="text-[#7ab88a] text-[10px] font-bold tracking-[0.22em] uppercase mb-1">Help Center</p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-[#1f2a1d] leading-tight mb-1"
                style={{ letterSpacing: '-0.04em' }}
              >
                Ask Kisan Ka Dukan
              </h2>
              <p className="text-[#4b5b47]/70 text-sm font-medium">Find answers instantly.</p>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3">
              {CATEGORIES.map((cat, i) => {
                const isActive = activeCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    whileHover={!isActive ? { y: -2, transition: { duration: 0.18 } } : {}}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`relative group flex flex-col items-center justify-center p-3 sm:p-4 min-h-[88px] rounded-[16px] border transition-all duration-300 overflow-hidden cursor-pointer ${
                      isActive
                        ? 'bg-[#1f2a1d] border-[#1f2a1d] shadow-lg shadow-[#1f2a1d]/20 ring-1 ring-[#1f2a1d]/20'
                        : 'bg-white/90 border-[#1f2a1d]/10 hover:bg-white hover:border-[#1f2a1d]/20 hover:shadow-sm'
                    }`}
                  >
                    {isActive && (
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ background: `radial-gradient(ellipse at 50% 50%, ${cat.accent}, transparent 70%)` }}
                      />
                    )}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className={`mb-1.5 transition-colors ${isActive ? 'text-white' : 'text-[#4b5b47]'}`}>
                        <cat.Icon className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" strokeWidth={1.8} />
                      </div>
                      <p className={`text-[12px] sm:text-[13px] font-semibold leading-tight mb-0.5 transition-colors ${isActive ? 'text-white' : 'text-[#1f2a1d]'}`}>
                        {cat.label}
                      </p>
                      <p className={`text-[9px] sm:text-[10px] leading-none transition-colors ${isActive ? 'text-white/50' : 'text-[#4b5b47]/50'}`}>
                        {FAQ[cat.id].length} Qs
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 w-full min-w-0 flex flex-col gap-4">

            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1f2a1d]/50" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white border-2 border-[#1f2a1d]/10 rounded-2xl pl-12 pr-10 py-3.5 text-[#1f2a1d] placeholder-[#1f2a1d]/40 text-base font-medium focus:outline-none focus:border-[#7ab88a]/80 shadow-sm transition-all duration-200"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearch('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1f2a1d]/40 hover:text-[#1f2a1d] p-1 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {search.trim().length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full mt-1.5 w-full bg-white rounded-xl shadow-xl border border-[#1f2a1d]/06 overflow-hidden z-20"
                  >
                    {searchResults.length > 0 ? searchResults.map((item, i) => {
                      const cat = CATEGORIES.find(c => c.id === item.cat);
                      const qId = `${item.cat}-${FAQ[item.cat].findIndex(x => x.q === item.q)}`;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setSearch('');
                            setActiveCategory(item.cat);
                            setTimeout(() => handleQuestion(item.q, item.a, qId), 60);
                          }}
                          className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[#f7f4ef] transition-colors text-left border-b border-[#1f2a1d]/05 last:border-0"
                        >
                          {cat && <cat.Icon className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#4b5b47]/55" strokeWidth={1.5} />}
                          <div>
                            <p className="text-[#1f2a1d] text-sm font-medium leading-snug">{item.q}</p>
                            <p className="text-[#4b5b47]/50 text-xs mt-0.5 line-clamp-1">{item.a}</p>
                          </div>
                        </button>
                      );
                    }) : (
                      <div className="px-4 py-3 text-[#4b5b47]/50 text-sm">
                        No results for "<span className="text-[#1f2a1d]">{search}</span>"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {!activeCategory ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center bg-white/60 rounded-[24px] border border-[#1f2a1d]/10 shadow-sm w-full"
                  style={{ minHeight: 280 }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#f0f7f2] border border-[#7ab88a]/20 flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-[#7ab88a]" strokeWidth={1.4} />
                  </div>
                  <p className="text-[#1f2a1d] font-bold text-lg mb-1.5">Pick a topic</p>
                  <p className="text-[#4b5b47]/60 text-sm font-medium text-center max-w-[220px] leading-relaxed">
                    Select a category to start a conversation with our support team.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col bg-white rounded-[24px] border border-[#1f2a1d]/10 shadow-md overflow-hidden w-full"
                >
                  <div className="flex items-center gap-3 px-5 py-4 bg-[#141f14] border-b border-white/5">
                    <div className="w-10 h-10 rounded-full bg-[#7ab88a]/20 border border-[#7ab88a]/30 flex items-center justify-center flex-shrink-0 shadow-inner">
                      {activeCat && <activeCat.Icon className="w-5 h-5 text-[#7ab88a]" strokeWidth={1.8} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-semibold leading-none mb-1">Kisan Ka Dukan Support</p>
                      <p className="text-[#7ab88a]/90 text-[11px] font-medium truncate">{activeCat?.label} — tap a question below</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-[#7ab88a] block"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-[#7ab88a] text-[11px] font-bold uppercase tracking-widest">Online</span>
                    </div>
                  </div>

                  <div
                    className="overflow-y-auto px-5 py-5 flex flex-col gap-3"
                    style={{ minHeight: (messages.length === 0 && !isTyping) ? 100 : 200, maxHeight: 320, background: '#faf8f4' }}
                  >
                    {messages.length === 0 && !isTyping && (
                      <div className="flex items-center justify-center h-full py-6">
                        <p className="text-[#4b5b47]/30 text-xs text-center">Tap a question below to get an answer</p>
                      </div>
                    )}
                    {messages.map(msg => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex flex-col gap-0.5 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <div
                            className={`px-3.5 py-2.5 text-[13px] leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-[#1f2a1d] text-white rounded-2xl rounded-br-sm'
                                : 'bg-white text-[#1f2a1d] rounded-2xl rounded-bl-sm shadow-sm border border-[#1f2a1d]/06'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[10px] text-[#4b5b47]/30 px-1">{msg.time}</span>
                        </div>
                      </motion.div>
                    ))}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex items-center gap-1.5 shadow-sm border border-[#1f2a1d]/06">
                            {[0, 1, 2].map(i => (
                              <motion.span
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-[#4b5b47]/35 block"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.13 }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={bottomRef} />
                  </div>

                  {/* Question chips */}
                  <div className="px-5 pb-5 pt-6 border-t border-[#1f2a1d]/05 bg-white">
                    <p className="text-[#1f2a1d]/40 text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">
                      Suggested Questions
                    </p>
                    <div className="flex flex-col gap-2">
                      {activeQuestions.map((item, i) => {
                        const qId = `${activeCategory}-${i}`;
                        const asked = askedIds.has(qId);
                        return (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: asked ? 0.4 : 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.04 }}
                            onClick={() => handleQuestion(item.q, item.a, qId)}
                            disabled={asked}
                            className={`text-left text-[14px] px-4 py-3.5 min-h-[44px] rounded-[14px] border transition-all duration-200 shadow-sm ${
                              asked
                                ? 'border-transparent bg-transparent text-[#1f2a1d]/40 cursor-default line-through decoration-[#1f2a1d]/20 shadow-none'
                                : 'border-[#1f2a1d]/10 bg-[#fbfaf8] text-[#1f2a1d] font-medium hover:bg-[#f0f7f2] hover:border-[#7ab88a]/40 active:scale-[0.99]'
                            }`}
                          >
                            {item.q}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}