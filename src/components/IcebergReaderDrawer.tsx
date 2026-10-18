import React, { useEffect, useState } from 'react';

interface ProjectData {
  title: string;
  category: string;
  summary: string;
  fullAnalysis: string[];
  principles: string[];
  links: { name: string; url: string }[];
}

const FOUNDATIONS: Record<number, ProjectData> = {
  0: {
    title: 'FOUNDATION_01: The Polanyi Paradox & Tacit Knowledge',
    category: '////// Epistemology & Tacit Cognition',
    summary: '"We can know more than we can tell." Michael Polanyi formulated in 1966 that the bedrock of human civilization is governed by unwritten judgment and embodied practice.',
    fullAnalysis: [
      'Contemporary frontier models operate almost exclusively on recorded data—what has already been stated, serialized, and codified. But the most critical decisions—from pediatric surgery to aerospace turbine diagnostics—depend on consequences, tactile feedback, and human correction.',
      'Cognisee builds the cognition infrastructure to capture, preserve, and amplify tacit expertise without flattening it into synthetic text tokens. By bridging the gap between articulated data and embodied practice, we enable frontier artificial intelligence to operate with genuine clinical and industrial judgment.'
    ],
    principles: ['MICHAEL POLANYI (1966)', 'EMBODIED COGNITION', 'DELAWARE PBC'],
    links: [
      { name: 'READ FOUNDING TREATISE', url: '#treatise' },
      { name: 'INITIATE DIALOGUE', url: '#contact' }
    ]
  },
  1: {
    title: 'FOUNDATION_02: Agency by Design (Amplification, Not Automation)',
    category: '////// Cognitive Sovereignty & Autonomy',
    summary: 'Amplification, not automation. When AI replaces human judgment rather than amplifying it, it produces rapid cognitive deskilling.',
    fullAnalysis: [
      'Over time, human professionals lose the very instincts and dialectical sharpness required to catch catastrophic system failures. The Pediatrician\'s Dilemma illustrates this paradox: an automated 96% confidence score strips the clinician of critical diagnostic reasoning and situational skepticism.',
      'Cognisee builds systems that keep the human mind in its sharpest state of critical engagement, continuously surfacing counter-hypotheses, stress-testing edge cases, and preserving human moral and clinical accountability.'
    ],
    principles: ['ANTI-DESKILLING', 'DIALECTIC INTERACTION', 'HUMAN AGENCY'],
    links: [
      { name: 'EXPLORE TREATISE', url: '#treatise' },
      { name: 'INSTITUTIONAL INQUIRY', url: '#contact' }
    ]
  },
  2: {
    title: 'FOUNDATION_03: Plural Cognition & Collective Intelligence',
    category: '////// Multi-Agent Architecture',
    summary: 'Intelligence develops in community, never in isolated monoculture. A single omniscient AI model inevitably amplifies its own systemic blindspots.',
    fullAnalysis: [
      'True epistemic resilience emerges from Artificial Collective Intelligence: diverse specialist agents (Aerospace Turbines, Pediatric Oncology, Macro-Finance, Energy Grids) reasoning independently and disagreeing productively under governed consensus protocols.',
      'Rather than relying on one gargantuan monolith with opaque failure modes, Cognisee orchestrates ensembles of sovereign cognitive nodes that cross-examine findings, verify assumptions against physical telemetry, and produce antifragile collective decisions.'
    ],
    principles: ['COLLECTIVE REASONING', 'SPECIALIST CONSENSUS', 'EPISTEMIC DIVERSITY'],
    links: [
      { name: 'AEROSPACE TELEMETRY', url: '#domains' },
      { name: 'READ TREATISE', url: '#treatise' }
    ]
  },
  3: {
    title: 'FOUNDATION_04: Cryptographically Sovereign Wisdom Vaults',
    category: '////// Institutional Knowledge Sovereignty',
    summary: 'Wisdom Vaults: Intelligence that remains sovereign to its creators. Frontier AI cannot require institutions to surrender their hardest-won tacit knowledge to centralized cloud monopolies.',
    fullAnalysis: [
      'Cognisee introduces cryptographically sovereign cognitive enclaves that allow specialist communities—hospitals, aerospace manufacturers, scientific laboratories—to train and operate collective models without data exfiltration.',
      'Through secure local attestation and privacy-preserving weight synthesis, institutions preserve absolute ownership over their institutional memory while contributing to and benefiting from the global collective intelligence frontier.'
    ],
    principles: ['SOVEREIGN ENCLAVES', 'ZERO DATA EXFILTRATION', 'VERIFIED CONSENSUS'],
    links: [
      { name: 'PUBLIC BENEFIT CHARTER', url: 'https://www.cognisee.ai' },
      { name: 'CONTACT RESEARCH TEAM', url: '#contact' }
    ]
  }
};

export const IcebergReaderDrawer: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    // Listen to WebGL events from window.Q
    const handleProjectShow = (idx: number) => {
      if (typeof idx === 'number' && FOUNDATIONS[idx]) {
        setActiveProjectIndex(idx);
      }
    };

    const handleProjectHide = () => {
      setActiveProjectIndex(null);
    };

    // Attach to window.Q when ready
    const attachListeners = () => {
      const Q = (window as any).Q;
      if (Q && Q.on) {
        Q.on('webgl_project_show', handleProjectShow);
        Q.on('webgl_project_hide', handleProjectHide);
        return true;
      }
      return false;
    };

    if (!attachListeners()) {
      const interval = setInterval(() => {
        if (attachListeners()) clearInterval(interval);
      }, 250);
      return () => clearInterval(interval);
    }

    return () => {
      const Q = (window as any).Q;
      if (Q && Q.off) {
        Q.off('webgl_project_show', handleProjectShow);
        Q.off('webgl_project_hide', handleProjectHide);
      }
    };
  }, []);

  const closeDrawer = () => {
    setActiveProjectIndex(null);
    const Q = (window as any).Q;
    if (Q && Q.emit) {
      Q.emit('webgl_switch_scene', '');
    }
  };

  if (activeProjectIndex === null) return null;

  const data = FOUNDATIONS[activeProjectIndex] || FOUNDATIONS[0];

  return (
    <aside 
      aria-label="Scholarly Research Drawer"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] md:w-[600px] bg-[#030708]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.85)] flex flex-col justify-between transition-transform duration-500 ease-out"
    >
      {/* Header bar */}
      <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#A6D4BD] animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest text-[#A6D4BD] uppercase font-semibold">
            {data.category}
          </span>
        </div>
        <button
          onClick={closeDrawer}
          className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-widest transition-colors flex items-center gap-1.5"
          title="Close Reader [ESC]"
        >
          <span>[ ESC ]</span>
          <span className="text-white/60">✕</span>
        </button>
      </div>

      {/* Main Reading Body */}
      <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left select-text">
        <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide leading-snug">
          {data.title}
        </h2>

        {/* Lead Summary Callout */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 font-mono text-[13px] leading-relaxed text-[#EAE7E1] italic">
          {data.summary}
        </div>

        {/* Scholarly Body */}
        <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-white/80 font-normal">
          {data.fullAnalysis.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Principles Tag Grid */}
        <div className="pt-4 border-t border-white/10">
          <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase mb-2.5">
            /// Epistemic Pillars
          </span>
          <div className="flex flex-wrap gap-2">
            {data.principles.map((p, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-black/40 border border-white/15 font-mono text-[10px] tracking-wider text-[#A6D4BD]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 sm:p-8 border-t border-white/10 bg-black/40 flex flex-wrap items-center gap-3 justify-end">
        {data.links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            onClick={() => {
              if (link.url === '#treatise' && (window as any).openFoundingPosition) {
                closeDrawer();
                (window as any).openFoundingPosition();
              } else if (link.url === '#contact' && (window as any).openContact) {
                closeDrawer();
                (window as any).openContact();
              }
            }}
            className="px-4 py-2 rounded bg-white hover:bg-white/90 text-black font-mono text-xs font-semibold tracking-wider transition-all shadow-md"
          >
            {link.name} →
          </a>
        ))}
      </div>
    </aside>
  );
};
