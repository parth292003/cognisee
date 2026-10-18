import React, { useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';

export const TacitSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tacit' | 'explicit'>('tacit');

  return (
    <section id="tacit" className="relative py-28 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1C2922]/8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-mono tracking-widest text-[#286F61] font-semibold">01 //</span>
        <span className="text-xs font-mono tracking-widest text-[#1C2922]/60 uppercase">THE TACIT GAP</span>
      </div>

      {/* Main Narrative Headline */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl sm:text-5xl font-display font-normal tracking-tight text-[#142019] leading-[1.12] mb-6">
          The most valuable intelligence does not live in text. <br />
          <span className="italic font-normal text-[#286F61]">
            It lives in judgment.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#1C2922]/75 leading-relaxed font-sans">
          Contemporary AI operates almost exclusively on recorded data—what has already been stated, codified, and scraped from the public web. But the foundation of human mastery is governed by what Michael Polanyi formulated in 1966:
        </p>

        <blockquote className="border-l-2 border-[#286F61] pl-6 py-2 my-8">
          <p className="text-xl sm:text-2xl font-editorial-serif italic text-[#142019] leading-snug">
            &ldquo;We can know more than we can tell.&rdquo;
          </p>
          <cite className="block mt-2 text-xs font-mono text-[#1C2922]/60 not-italic">
            — Michael Polanyi, The Tacit Dimension (1966)
          </cite>
        </blockquote>

        <p className="text-sm sm:text-base text-[#1C2922]/70 leading-relaxed font-sans">
          The surgeon&apos;s tactile perception of tissue compliance under stress, the aerospace engineer&apos;s instinctive ear for turbine vibration harmonics, the pediatrician&apos;s holistic assessment of an infant&apos;s subtle pallor—these cannot be synthesized from next-token prediction. Cognisee builds the cognition infrastructure to capture, preserve, and amplify tacit expertise without reducing it to synthetic text.
        </p>
      </div>

      {/* Story Visual & Clean Glassmorphic Comparator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-12">
        {/* Left: Studio Visual Study */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden glass-panel p-2 shadow-sm">
          <div className="rounded-xl overflow-hidden relative group aspect-[16/10]">
            <img
              src="/assets/visuals/optical-prism-macro.jpg"
              alt="Precision optical crystal prism assembly representing the tacit dimension"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg glass-pill flex items-center justify-between text-[11px] font-mono text-[#142019]">
              <span>FIG 1.0 — THE PRISMATIC CORE</span>
              <span className="text-[#286F61]">DECONSTRUCTING TACIT JUDGMENT</span>
            </div>
          </div>
        </div>

        {/* Right: Glassmorphic Epistemic Comparator */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#286F61] uppercase mb-4 font-semibold">
              EPISTEMIC COMPARATOR // ARCHITECTURE
            </div>

            {/* Subtle Tab Switcher */}
            <div className="grid grid-cols-2 p-1 bg-[#1C2922]/5 rounded-lg mb-6">
              <button
                onClick={() => setActiveTab('tacit')}
                className={`py-2 text-xs font-mono tracking-wider rounded-md transition-all ${
                  activeTab === 'tacit'
                    ? 'bg-white text-[#142019] font-medium shadow-sm'
                    : 'text-[#1C2922]/60 hover:text-[#142019]'
                }`}
              >
                TACIT JUDGMENT
              </button>
              <button
                onClick={() => setActiveTab('explicit')}
                className={`py-2 text-xs font-mono tracking-wider rounded-md transition-all ${
                  activeTab === 'explicit'
                    ? 'bg-white text-[#142019] font-medium shadow-sm'
                    : 'text-[#1C2922]/60 hover:text-[#142019]'
                }`}
              >
                CODIFIED DATA
              </button>
            </div>

            {activeTab === 'tacit' ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#286F61]/10 flex items-center justify-center text-[#286F61]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-semibold text-[#142019]">Embodied Human Expertise</h4>
                    <p className="text-xs text-[#1C2922]/60">Lived practice, somatic correction, consequences</p>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#1C2922]/70 space-y-2 border-t border-[#1C2922]/8 pt-4">
                  <div className="flex justify-between py-1 border-b border-[#1C2922]/4">
                    <span className="text-[#1C2922]/50">TRANSFER MEDIUM</span>
                    <span className="text-[#142019]">Apprenticeship & Dialectic</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C2922]/4">
                    <span className="text-[#1C2922]/50">REPRESENTATION</span>
                    <span className="text-[#142019]">High-Dimensional Manifold</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C2922]/4">
                    <span className="text-[#1C2922]/50">VERIFICATION</span>
                    <span className="text-[#142019]">Real-World Competence</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#1C2922]/50">VULNERABILITY</span>
                    <span className="text-[#286F61] font-semibold">Irreplaceable if Lost</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C2922]/10 flex items-center justify-center text-[#1C2922]">
                    <Layers size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-semibold text-[#142019]">Tokenized Public Corpora</h4>
                    <p className="text-xs text-[#1C2922]/60">Web-scraped documents, static books, synthetics</p>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#1C2922]/70 space-y-2 border-t border-[#1C2922]/8 pt-4">
                  <div className="flex justify-between py-1 border-b border-[#1C2922]/4">
                    <span className="text-[#1C2922]/50">TRANSFER MEDIUM</span>
                    <span className="text-[#142019]">Next-Token Prediction</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C2922]/4">
                    <span className="text-[#1C2922]/50">REPRESENTATION</span>
                    <span className="text-[#142019]">1D Sequential Strings</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C2922]/4">
                    <span className="text-[#1C2922]/50">VERIFICATION</span>
                    <span className="text-[#142019]">Heuristic Benchmarks</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#1C2922]/50">VULNERABILITY</span>
                    <span className="text-[#9D6619] font-semibold">Model Collapse & Hallucination</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] font-sans text-[#1C2922]/60 mt-6 pt-4 border-t border-[#1C2922]/8">
            Cognisee maps implicit human decision pathways into structured cognitive infrastructure that models can learn from without deskilling human experts.
          </p>
        </div>
      </div>
    </section>
  );
};
