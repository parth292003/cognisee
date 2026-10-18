import React from 'react';
import { ArrowDown, ArrowUpRight, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onOpenFoundingPosition: () => void;
  onOpenContact: () => void;
  onScrollDown: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenFoundingPosition,
  onOpenContact,
  onScrollDown,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-20 px-6 sm:px-10 max-w-7xl mx-auto"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2922]/8 pb-6">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#286F61]" />
          <span className="text-[11px] font-mono tracking-widest text-[#142019] uppercase font-medium">
            Cognisee Research Laboratories
          </span>
        </div>

        <div className="flex items-center gap-6 text-[11px] font-mono tracking-wider text-[#1C2922]/60">
          <span>EST. SEPTEMBER 2026</span>
          <span className="hidden md:inline">ARTIFICIAL COLLECTIVE INTELLIGENCE</span>
          <span className="text-[#286F61] font-medium">DELAWARE PBC</span>
        </div>
      </div>

      {/* Main Narrative Headline */}
      <div className="my-auto py-12 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[10px] font-mono tracking-widest text-[#286F61] uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#286F61]" />
          <span>THE FOUNDING THESIS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-normal tracking-tight text-[#142019] leading-[1.08] mb-8">
          AI should make people and institutions <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#286F61]">
            more capable, not less.
          </span>
        </h1>

        <p className="text-lg sm:text-2xl text-[#1C2922]/75 font-sans font-normal leading-relaxed max-w-2xl mb-10">
          Cognisee is building <strong className="text-[#142019] font-medium">Artificial Collective Intelligence</strong> and the cognition infrastructure required for intelligence to develop alongside human judgment, specialist communities, and governed institutions.
        </p>

        {/* Minimal Action Controls with Glassmorphism */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenFoundingPosition}
            className="px-6 py-3 rounded-full bg-[#1C2922] text-[#FBF9EF] text-xs font-mono tracking-wider hover:bg-[#142019] transition-all flex items-center gap-2 shadow-sm group"
          >
            <BookOpen size={14} className="text-[#A6D4BD]" />
            <span>READ THE FOUNDING TREATISE</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-full glass-pill text-[#1C2922] text-xs font-mono tracking-wider hover:bg-white/90 transition-all flex items-center gap-2"
          >
            <span>INITIATE DIALOGUE</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Bottom Pacing & Scroll Affordance */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-[#1C2922]/8">
        <div className="max-w-lg">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#286F61] mb-1 font-medium">
            FOUNDING ESSAY // AHMER INAM, CEO
          </div>
          <p className="text-xs font-editorial-serif italic text-[#1C2922]/70 leading-relaxed">
            &ldquo;The defining test of superintelligence is not whether it eclipses humanity, but whether it elevates human dignity, agency, and flourishing.&rdquo;
          </p>
        </div>

        <button
          onClick={onScrollDown}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-8 h-8 rounded-full border border-[#1C2922]/15 flex items-center justify-center group-hover:border-[#286F61] group-hover:bg-[#286F61]/5 transition-all">
            <ArrowDown size={13} className="text-[#1C2922] group-hover:translate-y-0.5 transition-transform" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono tracking-widest text-[#1C2922]/50 uppercase">
              NEXT CHAPTER
            </div>
            <div className="text-xs font-mono font-medium text-[#142019]">
              01 // THE TACIT GAP
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};
