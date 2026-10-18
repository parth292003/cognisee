import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenFoundingPosition: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenFoundingPosition,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'THE THESIS' },
    { id: 'tacit', label: 'THE TACIT GAP' },
    { id: 'agency', label: 'AGENCY BY DESIGN' },
    { id: 'collective', label: 'SPECIALIST DOMAINS' },
    { id: 'sovereignty', label: 'WISDOM VAULTS' },
    { id: 'treatise', label: 'TREATISE', action: onOpenFoundingPosition },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-[0_2px_20px_rgba(28,41,34,0.03)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Official Brand Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <img
            src="/assets/logos/cognisee-logo-horizontal-black-transparent-3000w.png"
            alt="Cognisee"
            className="h-6 sm:h-7 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
          />
          <span className="hidden sm:inline text-[10px] font-mono tracking-widest text-[#286F61] border-l border-[#1C2922]/15 pl-3 font-medium">
            DELAWARE PBC
          </span>
        </button>

        {/* Minimal Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-wider">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  if (link.action) {
                    link.action();
                  } else {
                    onNavigate(link.id);
                  }
                }}
                className={`transition-colors py-1 relative focus:outline-none ${
                  isActive
                    ? 'text-[#142019] font-medium'
                    : 'text-[#1C2922]/60 hover:text-[#142019]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#286F61]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Minimal Action Buttons with Glassmorphism */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenFoundingPosition}
            className="px-3.5 py-1.5 rounded-full glass-pill text-[11px] font-mono tracking-wide text-[#1C2922] hover:bg-white/80 transition-all flex items-center gap-1.5"
          >
            <BookOpen size={12} className="text-[#286F61]" />
            <span>TREATISE</span>
          </button>

          <button
            onClick={onOpenContact}
            className="px-4 py-1.5 rounded-full bg-[#1C2922] text-[#FBF9EF] text-[11px] font-mono tracking-wide hover:bg-[#142019] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>INITIATE DIALOGUE</span>
            <ArrowUpRight size={12} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-[#1C2922]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-6 glass-nav bg-[#FBF9EF]/98 border-b border-[#1C2922]/10 text-[#1C2922] shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4 text-xs font-mono tracking-wider">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.action) {
                    link.action();
                  } else {
                    onNavigate(link.id);
                  }
                }}
                className="text-left py-2 border-b border-[#1C2922]/6 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#286F61]" />
                )}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFoundingPosition();
                }}
                className="w-full py-2.5 rounded-full glass-pill text-center font-mono text-xs flex items-center justify-center gap-2"
              >
                <BookOpen size={13} className="text-[#286F61]" />
                READ FOUNDING TREATISE
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 rounded-full bg-[#1C2922] text-[#FBF9EF] text-center font-mono text-xs"
              >
                INITIATE DIALOGUE
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
