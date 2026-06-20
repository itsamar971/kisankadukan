import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, Globe } from 'lucide-react';
import IconContainer from '../IconContainer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-[#fbfaf8] min-h-screen text-[#1f2a1d]">
      {/* 1. Hero Section */}
      <section data-bg="light" className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden bg-white border-b border-[#1f2a1d]/05">
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <IconContainer icon={MessageSquare} tint="gold" isDark={false} className="mx-auto mb-6 scale-125" />
          <h1 className="viewport-title font-bold mb-6">Get in Touch</h1>
          <p className="text-[#4b5b47] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have a question, feedback, or want to partner with us? Fill out the form below or reach out directly.
          </p>
        </div>
      </section>

      {/* 2. Contact Content */}
      <section data-bg="light" className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info Sidebar */}
            <div className="lg:w-1/3 space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-[#4b5b47] mb-8">
                  We aim to respond to all inquiries within 24 hours during business days.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#dfb15b]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#dfb15b]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1f2a1d]">Email Us</p>
                      <a href="mailto:kisankadhukan2026@gmail.com" className="text-[#4b5b47] hover:text-[#7ab88a] transition-colors">kisankadhukan2026@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#7ab88a]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#7ab88a]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1f2a1d]">Call Us</p>
                      <a href="tel:+919866531592" className="text-[#4b5b47] hover:text-[#7ab88a] transition-colors">+91 98665 31592</a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#1f2a1d]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#1f2a1d]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1f2a1d]">Office</p>
                      <p className="text-[#4b5b47]">16-22 Gajwel<br />Telangana, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {/* TODO: replace with real social links */}
                  <a href="#" className="w-10 h-10 rounded-full border border-[#1f2a1d]/10 flex items-center justify-center text-[#4b5b47] hover:bg-[#1f2a1d] hover:text-white transition-all">
                    <Globe className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-[#1f2a1d]/10 flex items-center justify-center text-[#4b5b47] hover:bg-[#1f2a1d] hover:text-white transition-all">
                    <Globe className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-[#1f2a1d]/10 flex items-center justify-center text-[#4b5b47] hover:bg-[#1f2a1d] hover:text-white transition-all">
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:w-2/3">
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#1f2a1d]/05 shadow-sm">
                <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
                
                {isSubmitted ? (
                  <div className="bg-[#7ab88a]/10 border border-[#7ab88a]/20 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-[#7ab88a] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1f2a1d] mb-2">Message Sent!</h3>
                    <p className="text-[#4b5b47]">Thank you for reaching out. We will get back to you shortly.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-[#7ab88a] font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-[#1f2a1d]">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-[#fbfaf8] border border-[#1f2a1d]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7ab88a] focus:ring-1 focus:ring-[#7ab88a] transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-[#1f2a1d]">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-[#fbfaf8] border border-[#1f2a1d]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7ab88a] focus:ring-1 focus:ring-[#7ab88a] transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-semibold text-[#1f2a1d]">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-[#fbfaf8] border border-[#1f2a1d]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7ab88a] focus:ring-1 focus:ring-[#7ab88a] transition-all"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold text-[#1f2a1d]">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-[#fbfaf8] border border-[#1f2a1d]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7ab88a] focus:ring-1 focus:ring-[#7ab88a] transition-all resize-none"
                        placeholder="Type your message here..."
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-[#1f2a1d] hover:bg-[#2a3827] text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Map Placeholder */}
      <section data-bg="light" className="h-96 w-full bg-[#e2e8e0] relative">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-[#4b5b47]">
          <MapPin className="w-12 h-12 mb-4 opacity-50" />
          <p className="font-medium">Map Component Placeholder</p>
          <p className="text-sm opacity-70">{`{/* TODO: Integrate Google Maps or similar here */}`}</p>
        </div>
      </section>
    </div>
  );
}
