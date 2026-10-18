import React, { useState } from 'react';
import { X, BookOpen, Check, Copy } from 'lucide-react';
import { FOUNDING_POSITION } from '../data/foundingPosition';

interface FoundingPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoundingPositionModal: React.FC<FoundingPositionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'brief' | 'full' | 'principles' | 'notes'>('brief');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCitation = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex justify-center items-start p-4 sm:p-6 md:p-10 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#F6F5EB] border border-[#1C2922]/15 text-[#1C2922] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1C2922]/8 bg-[#FBF9EF]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="p-1.5 rounded-md bg-[#286F61]/10 text-[#286F61]">
              <BookOpen size={18} />
            </span>
            <div>
              <p className="text-[11px] font-mono tracking-widest text-[#286F61] uppercase font-semibold">
                Frontier Position Paper · Sept 2026
              </p>
              <h2 className="text-base font-medium tracking-tight text-[#142019]">
                {FOUNDING_POSITION.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#1C2922]/60 hover:text-[#142019] hover:bg-[#1C2922]/5 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1C2922]/8 px-6 bg-[#F6F5EB] text-xs font-mono tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab('brief')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'brief'
                ? 'border-[#286F61] text-[#286F61] font-semibold'
                : 'border-transparent text-[#1C2922]/60 hover:text-[#142019]'
            }`}
          >
            01 · The Position in Brief
          </button>
          <button
            onClick={() => setActiveTab('principles')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'principles'
                ? 'border-[#286F61] text-[#286F61] font-semibold'
                : 'border-transparent text-[#1C2922]/60 hover:text-[#142019]'
            }`}
          >
            02 · Eight Core Tenets
          </button>
          <button
            onClick={() => setActiveTab('full')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'full'
                ? 'border-[#286F61] text-[#286F61] font-semibold'
                : 'border-transparent text-[#1C2922]/60 hover:text-[#142019]'
            }`}
          >
            03 · Full Treatise & Opening
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'notes'
                ? 'border-[#286F61] text-[#286F61] font-semibold'
                : 'border-transparent text-[#1C2922]/60 hover:text-[#142019]'
            }`}
          >
            04 · Citations & Notes ({FOUNDING_POSITION.citations.length})
          </button>
        </div>

        {/* Scrollable Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 text-[15px] leading-relaxed text-[#1C2922]/90 font-sans space-y-8 bg-[#F6F5EB]">
          
          {/* Metadata Header */}
          <div className="border-b border-[#1C2922]/8 pb-6">
            <span className="text-xs font-mono text-[#286F61] tracking-wider uppercase block mb-1 font-semibold">
              {FOUNDING_POSITION.organization}
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-normal text-[#142019] mb-2">
              {FOUNDING_POSITION.title}
            </h1>
            <p className="text-base text-[#1C2922]/70 mb-4">
              {FOUNDING_POSITION.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#1C2922]/60">
              <span>Author: <strong className="text-[#142019] font-medium">{FOUNDING_POSITION.author}</strong></span>
              <span>·</span>
              <span>{FOUNDING_POSITION.role}</span>
              <span>·</span>
              <span>{FOUNDING_POSITION.date}</span>
            </div>
          </div>

          {/* TAB 1: THE POSITION IN BRIEF */}
          {activeTab === 'brief' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white/60 border border-[#1C2922]/8">
                <p className="text-xs font-mono text-[#286F61] uppercase tracking-wider mb-2 font-semibold">
                  Central Thesis
                </p>
                <p className="text-xl sm:text-2xl font-editorial-serif italic text-[#142019] leading-snug">
                  &ldquo;{FOUNDING_POSITION.thesis}&rdquo;
                </p>
                <p className="mt-3 text-sm text-[#1C2922]/75 leading-relaxed font-sans">
                  {FOUNDING_POSITION.preamble}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#286F61] font-semibold">
                  The Six Pillars of the Brief
                </h3>
                <div className="grid gap-3">
                  {FOUNDING_POSITION.positionInBrief.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-white/50 border border-[#1C2922]/8 hover:border-[#286F61]/30 transition-all shadow-sm"
                    >
                      <h4 className="text-sm font-semibold text-[#142019] flex items-center gap-2 mb-1.5 font-sans">
                        <span className="text-[#286F61] font-mono text-xs">0{idx + 1}.</span>
                        {item.label}
                      </h4>
                      <p className="text-xs text-[#1C2922]/75 leading-relaxed font-sans">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EIGHT PRINCIPLES */}
          {activeTab === 'principles' && (
            <div className="space-y-6">
              <p className="text-sm text-[#1C2922]/70 font-sans">
                The founding paper outlines eight structural commitments designed to make artificial intelligence an amplifier of human capability rather than a replacement for human judgment.
              </p>

              <div className="space-y-6">
                {FOUNDING_POSITION.principles.map((pr) => (
                  <div
                    key={pr.number}
                    className="p-6 rounded-xl bg-white/60 border border-[#1C2922]/10 space-y-3 shadow-sm"
                  >
                    <div className="flex items-baseline justify-between border-b border-[#1C2922]/8 pb-2">
                      <h3 className="text-lg font-display text-[#142019]">
                        <span className="font-mono text-xs text-[#286F61] mr-2 font-bold">{pr.number}.</span>
                        {pr.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#142019] font-medium font-sans">
                      {pr.summary}
                    </p>
                    <blockquote className="border-l-2 border-[#286F61] pl-4 my-2 text-sm italic text-[#1C2922]/70">
                      &ldquo;{pr.excerpt}&rdquo;
                    </blockquote>
                    <ul className="text-xs text-[#1C2922]/70 space-y-1.5 list-disc pl-4 pt-1 font-sans">
                      {pr.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FULL TREATISE & OPENING */}
          {activeTab === 'full' && (
            <div className="space-y-6 max-w-prose mx-auto">
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#286F61] font-semibold">
                  Section 1 · The Premise
                </h3>
                <p className="font-editorial-serif text-lg text-[#142019] italic leading-relaxed">
                  &ldquo;We stand at a critical juncture in the history of technology. The prevailing narrative of artificial superintelligence assumes an inevitability: that intelligence must concentrate into singular, autonomous systems that eclipse human agency.&rdquo;
                </p>
                <p className="text-sm text-[#1C2922]/75 leading-relaxed font-sans">
                  We reject this thesis. Intelligence is not a monolithic scalar quantity to be maximized in isolation. It is an ecological property developed through community, specialized practice, error correction, and lived consequence.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/60 border border-[#1C2922]/8 my-6">
                <h4 className="text-sm font-mono text-[#286F61] uppercase tracking-wider mb-2 font-semibold">
                  Section 2 · The Tacit Dimension
                </h4>
                <p className="text-xs text-[#1C2922]/75 leading-relaxed font-sans">
                  The most valuable human competencies—from pediatric diagnostics to structural engineering—are largely unwritten. Synthetic language models trained solely on static tokens can mimic the rhetoric of expertise without possessing its underlying judgment.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#286F61] font-semibold">
                  Section 3 · Sovereign Cognition Infrastructure
                </h3>
                <p className="text-sm text-[#1C2922]/75 leading-relaxed font-sans">
                  To ensure that intelligence serves human dignity, Cognisee is engineered around sovereign Wisdom Vaults. Institutions, specialist associations, and sovereign states must maintain verifiable ownership over their knowledge assets without risk of centralized expropriation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: CITATIONS & ACADEMIC NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono text-[#1C2922]/60">
                  FORMAL ACADEMIC REFERENCES ({FOUNDING_POSITION.citations.length})
                </p>
                <span className="text-[11px] font-mono text-[#286F61] font-medium">CLICK TO COPY CITATION</span>
              </div>

              <div className="space-y-3">
                {FOUNDING_POSITION.citations.map((cite) => (
                  <div
                    key={cite.id}
                    onClick={() => copyCitation(cite.id, `${cite.author} (${cite.year}). ${cite.title}. ${cite.publication}.`)}
                    className="p-4 rounded-xl bg-white/60 border border-[#1C2922]/8 hover:border-[#286F61]/40 cursor-pointer transition-all flex items-start justify-between gap-4 group shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#286F61]">[{cite.id}]</span>
                        <span className="text-xs font-mono font-semibold text-[#142019]">{cite.author} ({cite.year})</span>
                      </div>
                      <h4 className="text-sm font-sans font-medium text-[#142019] mb-1">
                        {cite.title}
                      </h4>
                      <p className="text-xs font-mono text-[#1C2922]/60">
                        {cite.publication}
                      </p>
                    </div>

                    <button
                      className="p-2 rounded-md bg-[#1C2922]/5 text-[#1C2922]/60 group-hover:text-[#142019] group-hover:bg-[#1C2922]/10 transition-colors shrink-0"
                      title="Copy citation"
                    >
                      {copiedId === cite.id ? <Check size={14} className="text-[#577F67]" /> : <Copy size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
