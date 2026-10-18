import React, { useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const AgencySection: React.FC = () => {
  const [focalLength, setFocalLength] = useState<number>(75);

  return (
    <section id="agency" className="relative py-28 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1C2922]/8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-mono tracking-widest text-[#286F61] font-semibold">02 //</span>
        <span className="text-xs font-mono tracking-widest text-[#1C2922]/60 uppercase">AGENCY BY DESIGN</span>
      </div>

      {/* Main Narrative Headline */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl sm:text-5xl font-display font-normal tracking-tight text-[#142019] leading-[1.12] mb-6">
          Amplification, not automation. <br />
          <span className="italic font-normal text-[#286F61]">
            Preserving the human capacity to decide.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#1C2922]/75 leading-relaxed font-sans">
          When AI replaces human judgment rather than amplifying it, it produces rapid cognitive deskilling. Over time, professionals lose the very instincts required to catch system failures. Cognisee builds systems that keep the human mind in its sharpest state of critical engagement.
        </p>
      </div>

      {/* Interactive Calibration Console & Exploded Lens Study */}
      <div className="glass-panel rounded-2xl p-6 sm:p-10 mb-16 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1C2922]/8 mb-8">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#286F61] uppercase mb-1 font-semibold">
              CALIBRATION PROTOCOL // SIMULATION
            </div>
            <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#142019]">
              Cognitive Amplification vs. Passive Delegation
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[#1C2922]/60">COGNITIVE RATIO:</span>
            <span className="text-xs font-mono px-3 py-1 glass-pill rounded-full font-medium text-[#142019]">
              {focalLength}% {focalLength > 50 ? '· AMPLIFIED AGENCY' : '· PASSIVE AUTOMATION'}
            </span>
          </div>
        </div>

        {/* Focal Slider */}
        <div className="mb-10 max-w-3xl">
          <div className="flex justify-between text-xs font-mono text-[#1C2922]/60 mb-3">
            <span>0% (OPAQUE DELEGATION)</span>
            <span className="text-[#286F61] font-semibold">OPTIMAL COGNITIVE FOCUS (75%)</span>
            <span>100% (FULL HUMAN AGENCY)</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={focalLength}
            onChange={(e) => setFocalLength(Number(e.target.value))}
            className="w-full h-1.5 bg-[#1C2922]/15 rounded-lg appearance-none cursor-pointer accent-[#286F61]"
          />
        </div>

        {/* Dynamic Comparison Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: State Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              focalLength < 50
                ? 'bg-[#9D6619]/5 border-[#9D6619]/25'
                : 'glass-panel border-[#286F61]/25'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {focalLength < 50 ? (
                  <AlertCircle size={16} className="text-[#9D6619]" />
                ) : (
                  <ShieldCheck size={16} className="text-[#286F61]" />
                )}
                <h4 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#142019]">
                  {focalLength < 50 ? 'The Deskilling Trap' : 'Calibrated Cognitive Elevation'}
                </h4>
              </div>

              <p className="text-xs text-[#1C2922]/70 leading-relaxed mb-4">
                {focalLength < 50
                  ? 'Passive rubber-stamping. The practitioner receives opaque predictions without dialectic reasoning. Critical cognitive faculties atrophy through lack of challenge.'
                  : 'Active epistemic dialectic. The AI exposes competing hypothesis trees, highlights unmodeled edge risks, and forces the practitioner to substantiate their judgment.'}
              </p>

              <div className="text-[11px] font-mono space-y-1.5 text-[#1C2922]/70">
                <div className="flex justify-between">
                  <span>PRACTITIONER AGENCY:</span>
                  <span className={focalLength < 50 ? 'text-[#9D6619] font-semibold' : 'text-[#286F61] font-semibold'}>
                    {focalLength}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>AUDIT TRACEABILITY:</span>
                  <span className={focalLength < 50 ? 'text-[#9D6619]' : 'text-[#142019]'}>
                    {focalLength < 50 ? 'ZERO (OPAQUE BLACK BOX)' : 'CRYPTOGRAPHICALLY ANCHORED'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Exploded Lens Photography Study */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden relative group aspect-[16/10] shadow-sm">
            <img
              src="/assets/visuals/tactile-lens-array.jpg"
              alt="Apple hardware photography of an exploded sapphire optical lens system"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142019]/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">
                OPTICAL COLLIMATOR // ALIGNING HUMAN AND ARTIFICIAL COGNITION
              </span>
              <span className="text-xs font-mono font-medium">
                PRECISION LENS SYSTEM // FOCAL BEAM CONVERGENCE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The Pediatrician's Dilemma Case Study */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center glass-panel rounded-2xl p-8 sm:p-12">
        <div className="lg:col-span-4">
          <div className="text-[10px] font-mono tracking-widest text-[#286F61] uppercase mb-2 font-semibold">
            CANONICAL CASE STUDY
          </div>
          <h3 className="text-2xl sm:text-3xl font-display text-[#142019] tracking-tight mb-4">
            The Pediatrician&apos;s Dilemma
          </h3>
          <p className="text-xs font-mono text-[#1C2922]/60 leading-relaxed">
            From &ldquo;Cognisee: A Founding Position on Human Agency and Artificial Collective Intelligence&rdquo; by Ahmer Inam (Sept 2026).
          </p>
        </div>

        <div className="lg:col-span-8 border-l border-[#1C2922]/10 pl-6 lg:pl-10 space-y-4">
          <p className="text-sm sm:text-base text-[#1C2922]/75 leading-relaxed font-sans">
            Consider a pediatric oncologist examining a complex scan. A modern frontier model issues a diagnosis with 96% statistical confidence. If the physician simply concurs, agency has been surrendered. If the model is erroneous, the child suffers. If the model is correct, the physician has learned nothing.
          </p>
          <p className="text-sm sm:text-base text-[#142019] leading-relaxed font-medium">
            Cognisee constructs an entirely different cognitive relationship: the system presents the dissenting hypotheses, surfaces boundary anomalies, asks the clinician to test specific somatic responses, and records the physician&apos;s tacit counter-arguments back into the institution&apos;s Wisdom Vault.
          </p>
        </div>
      </div>
    </section>
  );
};
