import React, { useState } from 'react';
import { DOMAINS } from '../data/content';
import { Plane, HeartPulse, Atom, Cpu, Layers, Shield } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane size={18} />,
  HeartPulse: <HeartPulse size={18} />,
  Atom: <Atom size={18} />,
  Cpu: <Cpu size={18} />,
  Layers: <Layers size={18} />,
};

export const DomainExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(DOMAINS[0].id);
  const activeDomain = DOMAINS.find((d) => d.id === selectedId) || DOMAINS[0];

  return (
    <div className="w-full max-w-6xl mx-auto my-12">
      {/* Domain Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {DOMAINS.map((domain) => {
          const isSelected = domain.id === selectedId;
          return (
            <button
              key={domain.id}
              onClick={() => setSelectedId(domain.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 focus:outline-none ${
                isSelected
                  ? 'bg-[#B7DE9D] text-[#091A11] font-medium shadow-md shadow-[#B7DE9D]/20'
                  : 'bg-[#13231A]/60 text-[#F4EDE1]/70 hover:text-[#F4EDE1] hover:bg-[#13231A] border border-[#F4EDE1]/10'
              }`}
            >
              <span>{iconMap[domain.iconName]}</span>
              <span>{domain.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl bg-[#091A11]/90 border border-[#F4EDE1]/15 backdrop-blur-md relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#B7DE9D]/10 blur-3xl pointer-events-none" />

        {/* Left Column: Domain Narrative & Tacit Knowledge */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B7DE9D] uppercase tracking-widest mb-2">
              <span>Domain {DOMAINS.findIndex(d => d.id === selectedId) + 1} of 5</span>
              <span>·</span>
              <span>Specialist Intelligence</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-display text-[#F6EFE5] mb-2">
              {activeDomain.name}
            </h3>
            
            <p className="text-sm font-medium text-[#A6D4BD] mb-4">
              {activeDomain.tagline}
            </p>

            <p className="text-sm text-[#F4EDE1]/80 leading-relaxed">
              {activeDomain.description}
            </p>
          </div>

          {/* Tacit Knowledge Callout */}
          <div className="p-4 rounded-xl bg-[#07140E]/80 border border-[#B7DE9D]/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#B7DE9D]">
              <Shield size={14} />
              <span className="uppercase tracking-wider">Unwritten Tacit Knowledge</span>
            </div>
            <p className="text-xs sm:text-sm italic text-[#F4EDE1]/85 leading-relaxed">
              "{activeDomain.tacitExpertise}"
            </p>
          </div>

          {/* Thread characteristics */}
          <div className="pt-2 text-xs font-mono text-[#F4EDE1]/60">
            <span className="text-[#B7DE9D]">Thread Dynamics:</span> {activeDomain.threadCharacteristics}
          </div>
        </div>

        {/* Right Column: Visual Schematic / Deconstructed System */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[260px] rounded-xl overflow-hidden bg-[#07140E]/90 border border-[#F4EDE1]/10 p-4">
          {activeDomain.id === 'aviation' ? (
            <div className="w-full h-full flex flex-col items-center justify-center relative group">
              <img
                src="/assets/visuals/aviation-turbine.png"
                alt="Aviation Turbine Inspection"
                className="w-full h-auto max-h-[240px] object-cover rounded-lg opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07140E] via-transparent to-transparent opacity-60 pointer-events-none" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono text-[#B7DE9D]/80">
                Figure 3.1: Harmonic acoustic telemetry in turbofan bypass
              </span>
            </div>
          ) : (
            /* Abstract fine-line SVG diagram for other domains */
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <svg viewBox="0 0 300 200" className="w-full h-44 text-[#B7DE9D]/70 stroke-current fill-none">
                {activeDomain.id === 'medicine' && (
                  <g strokeWidth="1.2">
                    <path d="M 20 100 Q 80 40 150 100 T 280 100" strokeDasharray="3 3" opacity="0.6" />
                    <circle cx="150" cy="100" r="35" strokeWidth="1.5" stroke="#B7DE9D" />
                    <circle cx="150" cy="100" r="18" strokeDasharray="2 2" />
                    <path d="M 115 100 L 185 100 M 150 65 L 150 135" strokeWidth="0.8" opacity="0.4" />
                    <path d="M 50 120 C 90 70, 120 140, 150 100 C 180 60, 210 130, 250 80" stroke="#A6D4BD" strokeWidth="1.5" />
                    <circle cx="75" cy="85" r="4" fill="#B7DE9D" />
                    <circle cx="225" cy="115" r="4" fill="#B7DE9D" />
                  </g>
                )}
                {activeDomain.id === 'science' && (
                  <g strokeWidth="1.2">
                    <polygon points="150,30 220,70 220,150 150,190 80,150 80,70" stroke="#A6D4BD" strokeDasharray="4 2" />
                    <circle cx="150" cy="110" r="28" stroke="#B7DE9D" />
                    <line x1="80" y1="70" x2="220" y2="150" strokeWidth="0.8" opacity="0.4" />
                    <line x1="220" y1="70" x2="80" y2="150" strokeWidth="0.8" opacity="0.4" />
                    <circle cx="150" cy="30" r="5" fill="#B7DE9D" />
                    <circle cx="220" cy="70" r="5" fill="#B7DE9D" />
                    <circle cx="220" cy="150" r="5" fill="#B7DE9D" />
                    <circle cx="150" cy="190" r="5" fill="#B7DE9D" />
                    <circle cx="80" cy="150" r="5" fill="#B7DE9D" />
                    <circle cx="80" cy="70" r="5" fill="#B7DE9D" />
                  </g>
                )}
                {activeDomain.id === 'industry' && (
                  <g strokeWidth="1.2">
                    <rect x="50" y="40" width="200" height="120" rx="4" strokeDasharray="2 4" opacity="0.5" />
                    <line x1="50" y1="100" x2="250" y2="100" strokeWidth="1" />
                    <line x1="150" y1="40" x2="150" y2="160" strokeWidth="1" />
                    <circle cx="100" cy="70" r="14" stroke="#B7DE9D" />
                    <circle cx="200" cy="130" r="14" stroke="#B7DE9D" />
                    <path d="M 100 70 L 150 100 L 200 130" stroke="#B7DE9D" strokeWidth="1.8" />
                  </g>
                )}
                {activeDomain.id === 'computing' && (
                  <g strokeWidth="1">
                    <rect x="90" y="50" width="120" height="100" rx="2" stroke="#A6D4BD" />
                    <path d="M 90 70 H 40 M 90 90 H 40 M 90 110 H 40 M 90 130 H 40" />
                    <path d="M 210 70 H 260 M 210 90 H 260 M 210 110 H 260 M 210 130 H 260" />
                    <circle cx="150" cy="100" r="22" stroke="#B7DE9D" strokeWidth="1.5" />
                    <circle cx="150" cy="100" r="6" fill="#B7DE9D" />
                  </g>
                )}
              </svg>
              <span className="text-[10px] font-mono text-[#F4EDE1]/50 mt-2">
                Schematic: Topology of domain-proximal verification
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
