import { useState, useEffect } from 'react';
import { X, Wheat, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | null>(null);

  const handleContinue = () => {
    if (selectedRole === 'farmer') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSf-ShtguJNPsTChicd6KYPiTauLpkWXqaLgnY-IcNPBifzzkg/viewform?usp=publish-editor', '_blank', 'noopener,noreferrer');
    } else if (selectedRole === 'buyer') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSc5UvDgummera1QcQQUfKoj-D4Nw-3vyu7zRQsXo7mhi4sOfw/viewform?usp=publish-editor', '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="w-full max-w-lg bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-6 sm:p-8 pointer-events-auto relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-black/60 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1d] tracking-tight mb-2">Join the Waitlist</h2>
                <p className="text-[#4b5b47] text-sm sm:text-base">How would you like to use Kisan Ka Dukan?</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Farmer Option */}
                <button
                  onClick={() => setSelectedRole('farmer')}
                  className={`relative flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedRole === 'farmer' 
                      ? 'border-[#7ab88a] bg-[#7ab88a]/5 shadow-sm' 
                      : 'border-black/5 bg-white hover:border-[#7ab88a]/30 hover:bg-black/[0.02]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
                    selectedRole === 'farmer' ? 'bg-[#7ab88a] text-white' : 'bg-[#7ab88a]/10 text-[#2a5a3a]'
                  }`}>
                    <Wheat className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-bold text-[#1f2a1d] mb-1">I'm a Farmer</h3>
                  <p className="text-xs text-[#4b5b47]">I want to sell my produce directly to buyers.</p>
                </button>

                {/* Buyer Option */}
                <button
                  onClick={() => setSelectedRole('buyer')}
                  className={`relative flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedRole === 'buyer' 
                      ? 'border-[#ECB65F] bg-[#ECB65F]/5 shadow-sm' 
                      : 'border-black/5 bg-white hover:border-[#ECB65F]/40 hover:bg-black/[0.02]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
                    selectedRole === 'buyer' ? 'bg-[#ECB65F] text-white' : 'bg-amber-400/15 text-amber-600'
                  }`}>
                    <ShoppingCart className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-bold text-[#1f2a1d] mb-1">I'm a Buyer</h3>
                  <p className="text-xs text-[#4b5b47]">I want to source fresh produce transparently.</p>
                </button>
              </div>

              {/* Action */}
              <button
                disabled={!selectedRole}
                onClick={handleContinue}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold transition-all duration-300 ${
                  selectedRole 
                    ? 'bg-[#1f2a1d] hover:bg-[#2a3827] text-white shadow-md' 
                    : 'bg-black/5 text-black/40 cursor-not-allowed'
                }`}
              >
                Continue to Register
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
