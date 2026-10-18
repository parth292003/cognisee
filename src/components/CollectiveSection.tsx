import React, { useState } from 'react';
import { DOMAINS, DomainItem } from '../data/content';
import { ArrowRight, Shield, Network, Zap } from 'lucide-react';

export const CollectiveSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<DomainItem>(DOMAINS[0]);

  return (
    <section id="collective" className="relative py-28 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1C2922]/8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-mono tracking-widest text-[#286F61] font-semibold">03 //</span>
        <span className="text-xs font-mono tracking-widest text-[#1C2922]/60 uppercase">SPECIALIST DOMAINS</span>
      </div>

      {/* Main Narrative Headline */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl sm:text-5xl font-display font-normal tracking-tight text-[#142019] leading-[1.12] mb-6">
          Intelligence develops in community, <br />
          <span className="italic font-normal text-[#286F61]">
            never in isolated monoculture.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#1C2922]/75 leading-relaxed font-sans">
          A single omniscient AI model inevitably amplifies its own systemic blindspots. True epistemic resilience emerges from <strong className="text-[#142019] font-medium">Artificial Collective Intelligence (ACI)</strong>: an architecture where diverse, specialized intelligences (both human and artificial) can reason independently, disagree productively, and establish verifiable consensus.
        </p>
      </div>

      {/* Domain Matrix with Glassmorphic Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Domain Selection Tabs */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-[10px] font-mono tracking-widest text-[#286F61] uppercase mb-3 font-semibold">
            SPECIALIST COGNITION DOMAINS
          </div>

          {DOMAINS.map((domain) => {
            const isSelected = selectedDomain.id === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? 'glass-panel border-[#286F61] shadow-sm'
                    : 'bg-white/40 border-[#1C2922]/8 hover:border-[#1C2922]/20 hover:bg-white/70'
                }`}
              >
                <div>
                  <h4 className="text-sm font-sans font-medium text-[#142019]">
                    {domain.name}
                  </h4>
                  <p className="text-xs text-[#1C2922]/60 mt-0.5 line-clamp-1">
                    {domain.tagline}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className={`transition-all ${
                    isSelected
                      ? 'text-[#286F61] translate-x-1'
                      : 'text-[#1C2922]/40 opacity-40 group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Domain Panel with Visual Image */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1C2922]/8">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#286F61] uppercase mb-1 font-semibold">
                DOMAIN ARCHITECTURE // {selectedDomain.id.toUpperCase()}
              </div>
              <h3 className="text-2xl font-display text-[#142019]">
                {selectedDomain.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 glass-pill rounded-full text-[10px] font-mono text-[#142019]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#577F67]" />
              <span>COLLECTIVE PROTOCOL ACTIVE</span>
            </div>
          </div>

          <p className="text-sm text-[#1C2922]/75 leading-relaxed font-sans">
            {selectedDomain.description}
          </p>

          {/* Tacit Insight Callout */}
          <div className="p-4 rounded-xl bg-[#1C2922]/5 border border-[#1C2922]/6">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#286F61] font-semibold mb-1">
              THE TACIT EXPERTISE FACTOR
            </div>
            <p className="text-xs font-editorial-serif text-[#142019] italic leading-relaxed">
              &ldquo;{selectedDomain.tacitExpertise}&rdquo;
            </p>
          </div>

          {/* Optional Domain Visual if available */}
          {selectedDomain.image && (
            <div className="rounded-xl overflow-hidden aspect-[16/9] border border-[#1C2922]/8">
              <img
                src={selectedDomain.image}
                alt={selectedDomain.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#1C2922]/8 pt-6">
            <div>
              <span className="text-[10px] font-mono text-[#1C2922]/60 block mb-1">COGNITIVE LATENCY</span>
              <span className="text-xs font-mono font-medium text-[#142019]">14.2 MS (SUB-THRESHOLD)</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#1C2922]/60 block mb-1">AUDIT VERIFIABILITY</span>
              <span className="text-xs font-mono font-medium text-[#142019]">100% CRYPTOGRAPHIC</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#1C2922]/60 block mb-1">HUMAN GOVERNANCE</span>
              <span className="text-xs font-mono font-medium text-[#286F61]">CONTINUOUS AUDIT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Epistemic Principles in Minimal Trio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        <div className="glass-panel p-6 rounded-xl space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#286F61]/10 flex items-center justify-center text-[#286F61] mb-3">
            <Network size={16} />
          </div>
          <h4 className="text-base font-sans font-semibold text-[#142019]">
            Epistemic Foraging
          </h4>
          <p className="text-xs text-[#1C2922]/70 leading-relaxed font-sans">
            Specialist agents proactively explore boundary anomalies and diagnostic outliers rather than collapsing prematurely into average consensus.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#286F61]/10 flex items-center justify-center text-[#286F61] mb-3">
            <Zap size={16} />
          </div>
          <h4 className="text-base font-sans font-semibold text-[#142019]">
            Productive Disagreement
          </h4>
          <p className="text-xs text-[#1C2922]/70 leading-relaxed font-sans">
            When models and human experts disagree, the divergence is preserved as critical signal rather than smoothed away.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#286F61]/10 flex items-center justify-center text-[#286F61] mb-3">
            <Shield size={16} />
          </div>
          <h4 className="text-base font-sans font-semibold text-[#142019]">
            Governed Autonomy
          </h4>
          <p className="text-xs text-[#1C2922]/70 leading-relaxed font-sans">
            Autonomy is not assumed by default; it is calibrated and earned dynamically based on empirical track records and human oversight.
          </p>
        </div>
      </div>
    </section>
  );
};
