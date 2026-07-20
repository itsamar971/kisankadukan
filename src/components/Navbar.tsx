import { useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  navOnLight: boolean;
  hideNav: boolean;
  onOpenWaitlist: () => void;
}

export default function Navbar({ navOnLight, hideNav, onOpenWaitlist }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/mission', label: 'Purpose' },
    { href: '/#how', label: 'The Process' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-5 md:px-8 py-3 sm:py-4 pt-[max(env(safe-area-inset-top),0.75rem)] transition-all duration-500 ${
        hideNav ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 pointer-events-auto translate-y-0'
      }`}>
        <Link to="/" className={`flex items-center gap-2 lg:justify-self-start transition-colors duration-500 ${navOnLight ? 'text-black' : 'text-white'}`}>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
            kisan ka dukan<sup className="text-[10px] sm:text-xs font-medium">TM</sup>
          </span>
        </Link>

        <div className="hidden lg:flex items-center justify-self-center gap-1 bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (location.pathname === '/' && link.href.includes('#') && location.hash === link.href.replace('/', ''));
            const isExternal = link.href.includes('#');

            const content = (
              <>
                {link.label}
                <span className={`absolute bottom-0.5 left-3 right-3 h-px bg-[#1f2a1d] transition-all duration-300 origin-left ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </>
            );

            const className = `relative text-sm px-3 py-2 font-medium transition-colors group ${
              isActive ? 'text-[#1f2a1d]' : 'text-[#4b5b47] hover:text-[#1f2a1d]'
            }`;

            if (isExternal) {
              return (
                <a key={link.href} href={link.href} className={className}>
                  {content}
                </a>
              );
            }

            return (
              <Link key={link.href} to={link.href} className={className}>
                {content}
              </Link>
            );
          })}
          <button onClick={onOpenWaitlist} className="ml-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
            Join Waitlist
          </button>
        </div>

        <div className={`flex items-center gap-3 sm:gap-6 lg:justify-self-end transition-colors duration-500 ${navOnLight ? 'text-black' : 'text-white/90'}`}>
          <Link to="/login" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
            <LogIn className="w-4 h-4" strokeWidth={1.95} />
            Sign In
          </Link>
          <Link to="/register" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
            Register
          </Link>
          <button onClick={onOpenWaitlist} className="lg:hidden bg-white/70 backdrop-blur-md border border-white/60 hover:bg-white/90 text-[#1f2a1d] text-sm font-medium px-4 py-2 rounded-full transition-colors">
            Join Waitlist
          </button>
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
              strokeWidth={1.95}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
              strokeWidth={1.95}
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
            {navLinks.map((link, i) => {
              const isExternal = link.href.includes('#');
              const className = `text-2xl font-semibold text-[#1f2a1d] py-4 border-b border-[#1f2a1d]/10 transition-all duration-500 ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`;
              const style = { transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' };

              if (isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={className}
                    style={style}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={className}
                  style={style}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
          >
            <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a]" onClick={() => setMenuOpen(false)}>
              <LogIn className="w-4 h-4" strokeWidth={1.95} />
              Sign In
            </Link>
            <Link to="/register" className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a]" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
            <button onClick={() => { setMenuOpen(false); onOpenWaitlist(); }} className="mt-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
