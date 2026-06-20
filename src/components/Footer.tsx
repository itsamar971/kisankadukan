import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'How it Works', href: '/#how' },
        { label: 'For Farmers', href: '/farmers' },
        { label: 'For Buyers', href: '/buyers' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Mission', href: '/mission' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press Kit', href: '/press' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/#community' },
        { label: 'Contact', href: '/contact' },
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
                  kisan ka dukan<sup className="text-[10px] font-semibold text-[#dfb15b]/60 ml-1 relative -top-1.5 select-none">TM</sup>
                </h3>
                <p className="mt-1 text-[#dfb15b] text-xs font-bold tracking-[0.2em] uppercase">Farm to Fork</p>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8">
                Empowering growers with direct market access and connecting buyers directly with verified, fresh produce.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              <a href="mailto:kisankadhukan2026@gmail.com" className="flex items-center gap-3 text-white/40 hover:text-[#dfb15b] transition-all duration-300 text-sm group">
                <Mail className="w-4 h-4 text-white/40 group-hover:text-[#dfb15b] transition-colors" strokeWidth={1.95} />
                kisankadhukan2026@gmail.com
              </a>
              <a href="tel:+919866531592" className="flex items-center gap-3 text-white/40 hover:text-[#dfb15b] transition-all duration-300 text-sm group">
                <Phone className="w-4 h-4 text-white/40 group-hover:text-[#dfb15b] transition-colors" strokeWidth={1.95} />
                +91 98665 31592
              </a>
              <div className="flex items-center gap-3 text-white/40 text-sm group">
                <MapPin className="w-4 h-4 text-white/40" strokeWidth={1.95} />
                16-22 Gajwel, Telangana
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#dfb15b] mb-6">{col.title}</h4>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith('http') || link.href.includes('#');
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          className="text-white/40 hover:text-white text-sm transition-all duration-300 flex items-center gap-1 group"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-[#dfb15b]" strokeWidth={1.95} />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-white/40 hover:text-white text-sm transition-all duration-300 flex items-center gap-1 group"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-[#dfb15b]" strokeWidth={1.95} />
                        </Link>
                      )}
                    </li>
                  );
                })}
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
            <Link to="/#privacy" className="text-white/30 hover:text-[#dfb15b] text-xs transition-colors">Privacy</Link>
            <Link to="/#terms" className="text-white/30 hover:text-[#dfb15b] text-xs transition-colors">Terms</Link>
            <Link to="/#cookies" className="text-white/30 hover:text-[#dfb15b] text-xs transition-colors">Cookies</Link>
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase flex items-center gap-1.5">
            Made with <span className="text-[#dfb15b] animate-pulse">🌾</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
