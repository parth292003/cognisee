import React, { useState, useEffect, useRef } from 'react';

export interface TeamMember {
  name: string;
  role: string;
  photoUrl: string;
  highlight?: string;
}

export const TEAM_ROSTER: TeamMember[] = [
  {
    name: 'Ahmer Inam',
    role: 'Founder & CEO',
    photoUrl: '/team/ahmer-inam.webp',
    highlight: 'Turns frontier AI into enterprise value, product pipelines, and responsible governance across mission-critical systems.'
  },
  {
    name: 'Dr. Olaf Witkowski',
    role: 'Co-Founder & Chief Scientist',
    photoUrl: '/team/olaf-witkowski.webp',
    highlight: 'President of the International Society for Artificial Life; pioneer in collective intelligence and multi-agent knowledge representation.'
  },
  {
    name: 'Alex Giannou',
    role: 'Co-Founder & Chief Strategy Officer',
    photoUrl: '/team/alex-giannou.webp',
    highlight: 'Cross-disciplinary architect scaling global venture strategy, institutional governance, and ecosystem adoption.'
  },
  {
    name: 'Mark Madsen',
    role: 'Head of Applied Research',
    photoUrl: '/team/mark-madsen.webp',
    highlight: 'Veteran systems architect operationalizing enterprise knowledge graphs and distributed semantic infrastructure.'
  },
  {
    name: 'Dr. Joshua Shinavier',
    role: 'Knowledge Graphs + Semantic AI',
    photoUrl: '/team/joshua-shinavier.webp',
    highlight: 'Creator of TinkerPop/Blueprints; pioneer in graph data models, algebraic type systems, and semantic knowledge stores.'
  },
  {
    name: 'Dr. Reza Farivar-Mohseni',
    role: 'Neuroscience + Neurotech',
    photoUrl: '/team/reza-farivar-mohseni.jpg',
    highlight: 'Computational neuroscientist researching cortical visual processing, cognitive models, and biological grounding.'
  },
  {
    name: 'Dr. Zakareya Hussein',
    role: 'Robotics + Sensing',
    photoUrl: '/team/zakareya-hussein.webp',
    highlight: 'Frontier researcher bridging embodied robotic cognition, multimodal sensor fusion, and spatial reasoning.'
  },
  {
    name: 'Dr. Jeremy Barton',
    role: 'Embodied Intelligence',
    photoUrl: '/team/jeremy-barton.webp',
    highlight: 'Advancing interactive cognitive architectures, causal reasoning, and local grounded intelligence.'
  },
  {
    name: 'Dr. Atif Farid Mohammad',
    role: 'AI and Quantum Researcher',
    photoUrl: '/team/atif-farid-mohammad.webp',
    highlight: 'Focusing on high-performance quantum computing algorithms, distributed consensus, and cryptographically sovereign AI.'
  },
  {
    name: 'Dr. Joseph Cazier',
    role: 'Data Monetization Researcher',
    photoUrl: '/team/joseph-cazier.webp',
    highlight: 'Specialist in data valuation, economic governance of tacit knowledge, and incentive design for collective systems.'
  },
  {
    name: 'Dr. Divya Chander',
    role: 'Neuroscience + Neurotech',
    photoUrl: '/team/divya-chander.webp',
    highlight: 'Physician-neuroscientist examining neural interfaces, consciousness markers, and cognitive integrity ethics.'
  },
  {
    name: 'Dr. Elena Kavanagh',
    role: 'Indigenous IP and Data Governance',
    photoUrl: '/team/elena-kavanagh.webp',
    highlight: 'Pioneering intergenerational cultural knowledge preservation, community sovereign data rights, and consent frameworks.'
  },
  {
    name: 'Ujjwal Kumar',
    role: 'Strategic Advisor',
    photoUrl: '/team/ujjwal-kumar.webp',
    highlight: 'Executive advisor aligning deep tech capabilities with industrial manufacturing and energy sectors.'
  },
  {
    name: 'Andrew Tauhert',
    role: 'Strategic Operations',
    photoUrl: '/team/andrew-tauhert.webp',
    highlight: 'Operational leader driving organizational scale, institutional partnerships, and execution discipline.'
  },
  {
    name: 'Yawar Sayeed',
    role: 'AI Engineer',
    photoUrl: '/team/yawar-sayeed.webp',
    highlight: 'Building robust pipelines for multi-agent coordination, graph traversal, and real-time reasoning.'
  },
  {
    name: 'Mohammed Soliman',
    role: 'AI Engineer',
    photoUrl: '/team/mohammed-soliman.webp',
    highlight: 'Deploying high-throughput neural inference engines, distributed agent communication, and verifiable compute.'
  },
  {
    name: 'Florian Fournier',
    role: 'Strategic Advisor',
    photoUrl: '/team/florian-fournier.webp',
    highlight: 'Advising on global technology commercialization, enterprise adoption, and ecosystem development.'
  },
  {
    name: 'Latif Nathani',
    role: 'Strategic Operations',
    photoUrl: '/team/latif-nathani.webp',
    highlight: 'Former eBay India Managing Director; scaling cross-border operational frameworks.'
  },
  {
    name: 'Tommy Mike',
    role: 'Strategic Advisor',
    photoUrl: '/team/tommy-mike.webp',
    highlight: 'Senior advisor guiding institutional alignment and global public sector deployment.'
  },
  {
    name: 'Andrew Grealy',
    role: 'Strategic Operations',
    photoUrl: '/team/andrew-grealy.webp',
    highlight: 'Execution lead orchestrating programmatic rollouts and operational excellence.'
  },
  {
    name: 'Shauny Ullman',
    role: 'Neuroscience + Neurotech',
    photoUrl: '/team/shauny-ullman.webp',
    highlight: 'Neurotechnology researcher investigating human cognitive augmentation and neural interface safety.'
  },
  {
    name: 'Stuart Green',
    role: 'Strategic Operations',
    photoUrl: '/team/stuart-green.webp',
    highlight: 'Directing strategic initiatives and institutional partnerships across global markets.'
  },
  {
    name: 'Sarabeth Brockley',
    role: 'Strategic Operations',
    photoUrl: '/team/sarabeth-brockley.webp',
    highlight: 'Leading multilateral collaborations, global sustainability frameworks, and ecosystem alliances.'
  },
  {
    name: 'Alben Sigamani',
    role: 'BioTech Advisor',
    photoUrl: '/team/alben-sigamani.webp',
    highlight: 'Advising on biological system modeling, healthcare applications, and translational science.'
  },
  {
    name: 'Alex Ok',
    role: 'Design & Visual Strategy',
    photoUrl: '/team/alex-ok.webp',
    highlight: 'Directing visual identity and interface paradigms for cognitive systems.'
  },
  {
    name: 'Thomas Baker',
    role: 'Senior AI Engineer',
    photoUrl: '/team/thomas-baker.webp',
    highlight: 'Designing distributed neural graph architectures and low-latency collective synchronization.'
  },
  {
    name: 'James Reed',
    role: 'Lead Architect',
    photoUrl: '/team/james-reed.webp',
    highlight: 'Full-stack systems architect guiding core platform infrastructure and distributed state.'
  },
  {
    name: 'Jun Suto',
    role: 'Cognitive Science Lead',
    photoUrl: '/team/jun-suto.webp',
    highlight: 'Investigating human-in-the-loop decision topologies and collective consensus.'
  },
  {
    name: 'Sam Nathans',
    role: 'Research Engineer',
    photoUrl: '/team/sam-nathans.webp',
    highlight: 'Developing novel benchmark suites for collective intelligence evaluation.'
  },
  {
    name: 'Rishi Kumar',
    role: 'Infrastructure Engineer',
    photoUrl: '/team/rishi-kumar.webp',
    highlight: 'Optimizing high-scale decentralized compute and secure enclave environments.'
  },
  {
    name: 'Matthew Schutte',
    role: 'Decentralized Architecture',
    photoUrl: '/team/matthew-schutte.webp',
    highlight: 'Specialist in agent-centric architectures and cryptographic provenance.'
  },
  {
    name: 'Matthew Buk',
    role: 'Systems Engineer',
    photoUrl: '/team/matthew-buk.jpeg',
    highlight: 'Building verifiable execution protocols and resilient data pipelines.'
  }
];

interface FoundingTeamCarouselProps {
  isVisible: boolean;
}

export const FoundingTeamCarousel: React.FC<FoundingTeamCarouselProps> = ({ isVisible }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef<number | null>(null);
  const isWheeling = useRef(false);

  useEffect(() => {
    if (isVisible) {
      setCurrentIndex(0);
    }
  }, [isVisible]);

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1 < TEAM_ROSTER.length ? prev + 1 : 0));
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : TEAM_ROSTER.length - 1));
  };

  useEffect(() => {
    if (!isVisible) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isWheeling.current) return;
      if (Math.abs(e.deltaY) > 25) {
        isWheeling.current = true;
        if (e.deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
        setTimeout(() => {
          isWheeling.current = false;
        }, 320);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(deltaY) > 35) {
        if (deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const currentMember = TEAM_ROSTER[currentIndex];

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col items-center justify-center select-none font-mono">
      {/* Center Hovering Team Member View (No boxes, No backgrounds, No outline) */}
      <div className="pointer-events-auto flex flex-col items-center text-center max-w-xl px-6 transition-all duration-500 animate-in fade-in duration-500">
        
        {/* Subtitle Header */}
        <p className="text-[11px] md:text-[13px] text-white/50 tracking-widest uppercase mb-6">
          ////// Founding Team &amp; Research Collective
        </p>

        {/* Member Photo (Clean, floating, no border, no outline, no box) */}
        <div className="mb-6">
          <img
            key={currentMember.photoUrl}
            src={currentMember.photoUrl.startsWith('http') ? currentMember.photoUrl : `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}${currentMember.photoUrl}`}
            alt={currentMember.name}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-[0_12px_40px_rgba(0,0,0,0.85)] filter grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Member Name */}
        <h2 className="text-xl md:text-2xl font-bold tracking-wider text-white mb-1.5">
          {currentMember.name}
        </h2>

        {/* Member Role */}
        <p className="text-xs md:text-sm text-white/80 tracking-wide mb-4">
          {currentMember.role}
        </p>

        {/* Member Highlight / Description */}
        {currentMember.highlight && (
          <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-lg mb-8 font-light">
            {currentMember.highlight}
          </p>
        )}

        {/* Minimalist Navigation Indicator */}
        <div className="flex items-center gap-6 text-xs text-white/50 tracking-widest mt-2">
          <button
            onClick={goToPrev}
            className="hover:text-white transition-colors cursor-pointer py-1 px-2"
            title="Previous member (↑)"
          >
            [ ↑ Prev ]
          </button>
          
          <span className="text-white/70">
            [ {String(currentIndex + 1).padStart(2, '0')} / {String(TEAM_ROSTER.length).padStart(2, '0')} ]
          </span>

          <button
            onClick={goToNext}
            className="hover:text-white transition-colors cursor-pointer py-1 px-2"
            title="Next member (↓)"
          >
            [ Next ↓ ]
          </button>
        </div>

        <p className="text-[10px] text-white/30 tracking-widest mt-4">
          Swipe up / scroll to explore team
        </p>
      </div>
    </div>
  );
};
