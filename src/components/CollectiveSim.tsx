import React, { useState } from 'react';
import { GitBranch, Shield, AlertCircle } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  domain: string;
  perspective: string;
  confidence: number;
  agreement: boolean;
}

export const CollectiveSim: React.FC = () => {
  const [mode, setMode] = useState<'collective' | 'monoculture'>('collective');

  const nodes: Node[] = [
    {
      id: 'pediatric',
      name: 'Pediatric Rare Disease Care',
      domain: 'Clinical Judgment',
      perspective: 'Recommends conservative observation due to subtle vascular resistance.',
      confidence: 88,
      agreement: true,
    },
    {
      id: 'pharmacology',
      name: 'Pharmacogenomics Intelligence',
      domain: 'Biochemical Evidence',
      perspective: 'Flags potential cytochrome interaction in liver clearance pathway.',
      confidence: 94,
      agreement: true,
    },
    {
      id: 'patient-stewards',
      name: 'Family & Ethics Governance',
      domain: 'Institutional Sovereignty',
      perspective: 'Upholds patient care goals; restricts exploratory trial data extraction.',
      confidence: 99,
      agreement: false, // Productive disagreement!
    },
    {
      id: 'diagnostic',
      name: 'Imaging Physics Reasoner',
      domain: 'Diagnostic Physics',
      perspective: 'Resolves contrast boundary at 0.1mm micro-calcification margin.',
      confidence: 91,
      agreement: true,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 sm:p-8 rounded-2xl bg-[#07140E]/80 border border-[#F4EDE1]/15 backdrop-blur-md">
      
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F4EDE1]/10 pb-5 mb-6">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#B7DE9D] uppercase block mb-1">
            Interactive Architecture Sim
          </span>
          <h4 className="text-xl font-display text-[#F6EFE5]">
            Monoculture vs. Collective Intelligence
          </h4>
        </div>

        <div className="flex items-center p-1 rounded-full bg-[#091A11] border border-[#F4EDE1]/15 text-xs font-mono">
          <button
            onClick={() => setMode('collective')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              mode === 'collective'
                ? 'bg-[#B7DE9D] text-[#091A11] font-medium'
                : 'text-[#F4EDE1]/60 hover:text-[#F4EDE1]'
            }`}
          >
            Collective Plurality
          </button>
          <button
            onClick={() => setMode('monoculture')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              mode === 'monoculture'
                ? 'bg-[#F4EDE1]/20 text-[#F4EDE1] font-medium'
                : 'text-[#F4EDE1]/60 hover:text-[#F4EDE1]'
            }`}
          >
            Single Monoculture
          </button>
        </div>
      </div>

      {mode === 'collective' ? (
        <div className="space-y-6">
          <p className="text-sm text-[#F4EDE1]/75 leading-relaxed">
            In Artificial Collective Intelligence, multiple specialist human and machine intelligences cooperate while preserving their own domain boundaries, local norms, and productive disagreement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nodes.map((node, i) => (
              <div
                key={node.id}
                className="p-4 rounded-xl bg-[#091A11] border border-[#F4EDE1]/10 hover:border-[#B7DE9D]/40 transition-all relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#B7DE9D]">
                    Node 0{i + 1} · {node.domain}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      node.agreement
                        ? 'bg-[#B7DE9D]/15 text-[#B7DE9D]'
                        : 'bg-[#F1BE73]/15 text-[#F1BE73]'
                    }`}
                  >
                    {node.agreement ? 'Consensus Alignment' : 'Productive Disagreement'}
                  </span>
                </div>
                <h5 className="text-sm font-medium text-[#F6EFE5] mb-1">
                  {node.name}
                </h5>
                <p className="text-xs text-[#F4EDE1]/70 mb-3">
                  {node.perspective}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#F4EDE1]/50 border-t border-[#F4EDE1]/10 pt-2">
                  <span>Confidence: {node.confidence}%</span>
                  <span className="flex items-center gap-1 text-[#A6D4BD]">
                    <Shield size={12} /> Governed Standing
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-[#13231A]/60 border border-[#B7DE9D]/20 text-xs text-[#A6D4BD] flex items-center gap-3">
            <GitBranch size={18} className="shrink-0 text-[#B7DE9D]" />
            <span>
              <strong>Hong-Page Theorem Applied:</strong> Diverse specialized problem solvers with visible uncertainty avoid the catastrophic blindspots inherent in single large foundation models.
            </span>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-[#091A11] border border-red-500/25 space-y-4 text-center">
          <div className="inline-flex p-3 rounded-full bg-red-500/15 text-red-400 mb-1">
            <AlertCircle size={28} />
          </div>
          <h5 className="text-base font-medium text-[#F6EFE5]">
            Centralized Model Monoculture (The Fragility Trap)
          </h5>
          <p className="text-sm text-[#F4EDE1]/75 max-w-lg mx-auto leading-relaxed">
            A single monolithic model absorbs knowledge indiscriminately, flattens conflicting specialist judgments into an opaque statistical average, and strips local institutions of their governing authority.
          </p>
          <div className="pt-2 text-xs font-mono text-red-400/80">
            Risk: Knowledge collapse, unstated uncertainty, and total institutional dependency.
          </div>
        </div>
      )}
    </div>
  );
};
