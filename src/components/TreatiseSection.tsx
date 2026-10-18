import React from 'react';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { FOUNDING_POSITION } from '../data/foundingPosition';

interface TreatiseSectionProps {
  onOpenFoundingPosition: () => void;
  onOpenContact: () => void;
}

export const TreatiseSection: React.FC<TreatiseSectionProps> = ({
  onOpenFoundingPosition,
  onOpenContact,
}) => {
  return (
    <section id="treatise" className="relative py-28 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1C2922]/8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-mono tracking-widest text-[#286F61] font-semibold">05 //</span>
        <span className="text-xs font-mono tracking-widest text-[#1C2922]/60 uppercase">THE FOUNDING TREATISE</span>
      </div>

      {/* Main Narrative Headline */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl sm:text-5xl font-display font-normal tracking-tight text-[#142019] leading-[1.12] mb-6">
          A founding position on human agency <br />
          <span className="italic font-normal text-[#286F61]">
            and artificial collective intelligence.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#1C2922]/75 leading-relaxed font-sans mb-8">
          Authored by Ahmer Inam, Founder &amp; CEO (September 2026). This treatise establishes Cognisee&apos;s philosophical mandate, mathematical principles, and institutional governance as a Delaware Public Benefit Corporation.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenFoundingPosition}
            className="px-6 py-3 rounded-full bg-[#1C2922] text-[#FBF9EF] text-xs font-mono tracking-wider hover:bg-[#142019] transition-all flex items-center gap-2 shadow-sm"
          >
            <BookOpen size={14} className="text-[#A6D4BD]" />
            <span>READ FULL TREATISE & CITATIONS</span>
            <ArrowUpRight size={13} />
          </button>

          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-full glass-pill text-[#1C2922] text-xs font-mono tracking-wider hover:bg-white/80 transition-all flex items-center gap-2"
          >
            <span>INITIATE INSTITUTIONAL DIALOGUE</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Tenets Architectural Grid */}
      <div className="glass-panel rounded-2xl p-6 sm:p-10 mb-20 shadow-sm">
        <div className="pb-6 border-b border-[#1C2922]/8 mb-8">
          <div className="text-[10px] font-mono tracking-widest text-[#286F61] uppercase mb-1 font-semibold">
            THE EIGHT FOUNDATIONAL COMMITMENTS
          </div>
          <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#142019]">
            Structural Axioms of Artificial Collective Intelligence
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUNDING_POSITION.principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white/50 border border-[#1C2922]/8 hover:border-[#286F61]/40 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#1C2922]/50">
                <span>TENET 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C2922]/20 group-hover:bg-[#286F61] transition-colors" />
              </div>
              <h4 className="text-sm font-sans font-medium text-[#142019] leading-snug">
                {pr.title}
              </h4>
              <p className="text-xs text-[#1C2922]/70 leading-relaxed font-sans line-clamp-3">
                {pr.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Dignified Footer */}
      <footer className="pt-10 border-t border-[#1C2922]/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#1C2922]/60">
        <div className="flex items-center gap-4">
          <img
            src="/assets/logos/cognisee-logo-horizontal-black-transparent-3000w.png"
            alt="Cognisee"
            className="h-5 w-auto object-contain opacity-80"
          />
          <span className="border-l border-[#1C2922]/15 pl-4">
            © 2026 COGNISEE PBC. ALL RIGHTS RESERVED.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span>DELAWARE PBC CHARTER NO. 7481920</span>
          <button
            onClick={onOpenContact}
            className="text-[#286F61] hover:underline"
          >
            INSTITUTIONAL ENQUIRIES
          </button>
        </div>
      </footer>
    </section>
  );
};
