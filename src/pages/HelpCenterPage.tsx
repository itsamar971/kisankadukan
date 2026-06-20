import { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import IconContainer from '../IconContainer';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'Launch',
  'Farmers',
  'Buyers',
  'Delivery',
  'Pricing',
  'Premium',
];

const FAQS = {
  Launch: [
    { q: 'When is Kisan Ka Dukan officially launching?', a: 'We are currently in a closed beta with select farmers and buyers. Our public launch is scheduled for Q3 of this year.' },
    { q: 'How can I get early access?', a: 'You can join our waitlist by clicking "Join Waitlist" in the navigation bar. We are admitting users on a rolling basis.' },
    { q: 'Which regions will you operate in at launch?', a: 'Our initial launch will focus on the northern agricultural belt, specifically Punjab, Haryana, and western UP, before expanding nationwide.' },
    { q: 'Will the app be available on iOS and Android?', a: 'Yes, both iOS and Android applications will be available on launch day.' }
  ],
  Farmers: [
    { q: 'How do I list my produce?', a: 'Once registered, you can upload photos, specify the crop variety, set your minimum acceptable price, and indicate the total volume available.' },
    { q: 'How is the quality of my crop verified?', a: 'We use a mix of AI image analysis and on-ground field agents to verify the grade of the produce before it is listed as "Verified".' },
    { q: 'What happens if a buyer rejects my shipment?', a: 'If the produce matches the verified grade, the buyer cannot reject it without penalty. If there is a genuine quality discrepancy, our dispute resolution team will intervene.' },
    { q: 'Can I sell part of my harvest?', a: 'Yes, you can specify minimum order quantities, allowing you to split your harvest among multiple buyers.' }
  ],
  Buyers: [
    { q: 'How do I know I am getting the right grade?', a: 'All "Verified" listings have been checked by our quality assurance team. If the delivered product does not match the listing, you are protected by our refund guarantee.' },
    { q: 'Can I negotiate prices?', a: 'Yes. While farmers list an asking price, you can submit counter-offers. The farmer can choose to accept, reject, or counter your offer.' },
    { q: 'What payment methods are supported?', a: 'We support all major payment methods including UPI, bank transfers (NEFT/RTGS), and corporate credit accounts for verified bulk buyers.' },
    { q: 'Can I schedule recurring orders?', a: 'Yes, our platform supports contract farming agreements and recurring delivery schedules for institutional buyers.' }
  ],
  Delivery: [
    { q: 'Who handles the transportation?', a: 'We partner with vetted logistics providers. Once a deal is struck, a truck is automatically dispatched to the farm.' },
    { q: 'How long does delivery take?', a: 'Most deliveries within a 500km radius are completed within 24-36 hours of the deal closing to ensure maximum freshness.' },
    { q: 'Can I track my shipment?', a: 'Yes, real-time GPS tracking is available in the app from the moment the produce is loaded at the farm until it reaches your facility.' },
    { q: 'Is the produce insured during transit?', a: 'Yes, all shipments booked through our integrated logistics partners are fully insured against transit damage or loss.' }
  ],
  Pricing: [
    { q: 'How does Kisan Ka Dukan make money?', a: 'We charge a transparent, flat platform fee of 2-3% on successful transactions. There are no hidden charges or subscription fees for basic access.' },
    { q: 'Are there any listing fees for farmers?', a: 'No, listing produce is completely free for farmers.' },
    { q: 'Who pays for the transportation?', a: 'Transportation costs are calculated dynamically based on distance and volume, and are typically borne by the buyer, clearly displayed before the deal is finalized.' },
    { q: 'Are there cancellation fees?', a: 'Yes, to prevent market manipulation, late cancellations by either party after a deal is confirmed may incur a penalty fee.' }
  ],
  Premium: [
    { q: 'What is Kisan Ka Dukan Premium?', a: 'Premium is a subscription tier for institutional buyers that offers advanced market analytics, dedicated account managers, and priority logistics support.' },
    { q: 'Do farmers need Premium?', a: 'No, the core platform and all selling features remain free for farmers. We do offer optional premium advisory services for crop planning.' },
    { q: 'What analytics are included in Premium?', a: 'Premium buyers get access to historical price trends, predictive yield models, and regional supply forecasts.' }
  ]
};

function FaqAccordion({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#1f2a1d]/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-6 flex items-center justify-between focus:outline-none group"
      >
        <span className="text-lg font-semibold text-[#1f2a1d] group-hover:text-[#7ab88a] transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#4b5b47] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#4b5b47] leading-relaxed pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  return (
    <div className="bg-[#fbfaf8] min-h-screen">
      {/* 1. Hero Section */}
      <section data-bg="light" className="pt-32 pb-16 px-4 sm:px-6 bg-white border-b border-[#1f2a1d]/05">
        <div className="max-w-4xl mx-auto w-full text-center">
          <IconContainer icon={HelpCircle} tint="green" isDark={false} className="mx-auto mb-6 scale-125" />
          <h1 className="viewport-title font-bold text-[#1f2a1d] mb-6">How can we help?</h1>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4b5b47]/50" />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className="w-full bg-[#fbfaf8] border border-[#1f2a1d]/10 rounded-full py-4 pl-12 pr-6 text-[#1f2a1d] placeholder:text-[#4b5b47]/50 focus:outline-none focus:border-[#7ab88a] focus:ring-1 focus:ring-[#7ab88a] transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 2. FAQ Section */}
      <section data-bg="light" className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          
          {/* Categories Sidebar */}
          <div className="md:w-1/4 flex-shrink-0">
            <div className="sticky top-32 space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeCategory === cat 
                      ? 'bg-[#1f2a1d] text-white shadow-md' 
                      : 'text-[#4b5b47] hover:bg-[#1f2a1d]/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="md:w-3/4">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#1f2a1d]/05 shadow-sm min-h-[500px]">
              <h2 className="text-2xl font-bold text-[#1f2a1d] mb-8">{activeCategory} FAQs</h2>
              
              <div className="divide-y divide-[#1f2a1d]/10 border-t border-[#1f2a1d]/10">
                {FAQS[activeCategory as keyof typeof FAQS].map((faq, idx) => (
                  <FaqAccordion key={idx} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Still Need Help CTA */}
      <section data-bg="light" className="py-20 px-4 sm:px-6 text-center border-t border-[#1f2a1d]/05 bg-white">
        <h2 className="text-2xl font-bold text-[#1f2a1d] mb-4">Still need help?</h2>
        <p className="text-[#4b5b47] mb-8">Our support team is always ready to assist you.</p>
        <a href="/contact" className="inline-flex bg-[#1f2a1d] hover:bg-[#2a3827] text-white font-medium px-8 py-3 rounded-full transition-colors">
          Contact Support
        </a>
      </section>
    </div>
  );
}
