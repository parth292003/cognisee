import React from 'react';
import { Lock, Key, FileCheck } from 'lucide-react';

export const SovereigntySection: React.FC = () => {
  return (
    <section id="sovereignty" className="relative py-28 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1C2922]/8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-mono tracking-widest text-[#286F61] font-semibold">04 //</span>
        <span className="text-xs font-mono tracking-widest text-[#1C2922]/60 uppercase">SOVEREIGN ARCHITECTURE</span>
      </div>

      {/* Main Narrative Headline */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl sm:text-5xl font-display font-normal tracking-tight text-[#142019] leading-[1.12] mb-6">
          Wisdom Vaults: <br />
          <span className="italic font-normal text-[#286F61]">
            Intelligence that remains sovereign to its creators.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#1C2922]/75 leading-relaxed font-sans">
          Frontier AI cannot require institutions to surrender their hardest-won institutional knowledge to centralized cloud monopolies. Cognisee introduces <strong className="text-[#142019] font-medium">Wisdom Vaults</strong>—cryptographically sovereign cognitive enclaves that allow specialist communities to train and operate collective models without data exfiltration.
        </p>
      </div>

      {/* Sovereign Module Showcase & Three Pillars */}
      <div className="glass-panel rounded-2xl p-6 sm:p-12 mb-16 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 rounded-xl overflow-hidden glass-panel p-2 shadow-sm">
            <div className="rounded-lg overflow-hidden aspect-[4/3] group">
              <img
                src="/assets/visuals/sovereign-core.jpg"
                alt="Cognisee precision-machined solid optical quartz and brushed aerospace titanium cognitive core module"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="p-3 flex items-center justify-between text-xs font-mono text-[#1C2922]/75">
              <span className="font-medium text-[#142019]">COGNITIVE CORE MODULE // SPEC 04</span>
              <span className="text-[#286F61]">AIR-GAP CERTIFIED</span>
            </div>
          </div>

          {/* Three Architectural Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#286F61]/10 text-[#286F61] flex items-center justify-center shrink-0">
                <Lock size={18} />
              </div>
              <div>
                <h4 className="text-base font-sans font-semibold text-[#142019] mb-1">
                  Zero-Exfiltration Cryptographic Enclaves
                </h4>
                <p className="text-xs sm:text-sm text-[#1C2922]/70 leading-relaxed font-sans">
                  Raw clinical, engineering, and institutional records never leave local sovereign infrastructure. Only zero-knowledge parameter updates and epistemic proofs cross the network boundary.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#286F61]/10 text-[#286F61] flex items-center justify-center shrink-0">
                <FileCheck size={18} />
              </div>
              <div>
                <h4 className="text-base font-sans font-semibold text-[#142019] mb-1">
                  Immutable Attribution of Tacit Contribution
                </h4>
                <p className="text-xs sm:text-sm text-[#1C2922]/70 leading-relaxed font-sans">
                  Every human correction, clinical insight, and diagnostic critique is cryptographically watermarked, guaranteeing that institutional creators receive permanent attribution and economic governance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#286F61]/10 text-[#286F61] flex items-center justify-center shrink-0">
                <Key size={18} />
              </div>
              <div>
                <h4 className="text-base font-sans font-semibold text-[#142019] mb-1">
                  Air-Gapped Autonomous Operation
                </h4>
                <p className="text-xs sm:text-sm text-[#1C2922]/70 leading-relaxed font-sans">
                  Wisdom Vaults maintain mission-critical cognition during global telecommunication blackouts, sovereign conflict, and cloud provider outages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
