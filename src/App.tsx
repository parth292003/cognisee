import React, { useEffect, useState } from 'react';
import { FoundingPositionModal } from './components/FoundingPositionModal';
import { ContactModal } from './components/ContactModal';

import { FoundingTeamCarousel } from './components/FoundingTeamCarousel';

let iglooEngineLoaded = false;

export const App: React.FC = () => {
  const [isFoundingOpen, setIsFoundingOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [detailState, setDetailState] = useState<{ isOpen: boolean; index: number; hash?: string }>({ isOpen: false, index: -1 });

  useEffect(() => {
    const handleDetail = (ev: any) => {
      if (ev.detail) {
        setDetailState({ isOpen: !!ev.detail.isOpen, index: ev.detail.index ?? -1, hash: ev.detail.hash });
      }
    };
    window.addEventListener('cognisee_detail_state', handleDetail);

    // Polling fallback to keep React in sync with WebGL mainController
    const interval = setInterval(() => {
      const mc = (window as any).__mainController;
      if (mc) {
        const isFullyOpen = !!(mc.isDetailFullyOpen && mc.isDetailOpen && mc.currentSection === 'project');
        const currentIdx = mc.detailIndex ?? -1;
        if (isFullyOpen !== detailState.isOpen || (isFullyOpen && currentIdx !== detailState.index)) {
          setDetailState({ isOpen: isFullyOpen, index: isFullyOpen ? currentIdx : -1, hash: (isFullyOpen && currentIdx === 3) ? 'our-team' : undefined });
        }
      }
    }, 100);

    // Expose global modal triggers for interactive 3D links
    (window as any).openFoundingPosition = () => {
      setIsFoundingOpen(true);
    };
    (window as any).openContact = () => {
      setIsContactOpen(true);
    };

    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#treatise' || hash === '#founding-position' || hash === '#paper') {
        setIsFoundingOpen(true);
      } else if (hash === '#contact' || hash === '#dialogue') {
        setIsContactOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    // Dynamically load the reverse-engineered Igloo engine exactly once
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const scriptSrc = `${base}/igloo_index.js`;
    if (!iglooEngineLoaded && !document.querySelector(`script[src="${scriptSrc}"]`)) {
      iglooEngineLoaded = true;
      const script = document.createElement('script');
      script.type = 'module';
      script.src = scriptSrc;
      document.body.appendChild(script);
    }

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('cognisee_detail_state', handleDetail);
      clearInterval(interval);
    };
  }, [detailState.isOpen, detailState.index]);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  return (
    <div className="relative w-full h-full select-none">
      {/* Top Left: Official Cognisee Logo Lockup */}
      <header className="fixed top-6 left-6 sm:left-12 z-40 flex items-center gap-4 pointer-events-auto">
        <button
          onClick={() => {
            window.location.hash = '';
            window.dispatchEvent(new Event('webgl_hover_logo'));
          }}
          className="flex items-center gap-3.5 focus:outline-none group text-left"
          title="Cognisee — Artificial Collective Intelligence"
        >
          <img
            src={`${base}/assets/logos/cognisee-logo-horizontal-white-transparent-3000w.png`}
            alt="Cognisee"
            className="h-9 sm:h-10 md:h-11 w-auto object-contain drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] group-hover:opacity-85 transition-opacity"
          />
        </button>
      </header>



      {/* Founding Team horizontal scroll carousel (Crystal 4: Our Team) */}
      <FoundingTeamCarousel isVisible={detailState.isOpen && (detailState.index === 3 || detailState.hash === 'our-team')} />

      {/* Scholarly Position Paper Reader Modal */}
      <FoundingPositionModal
        isOpen={isFoundingOpen}
        onClose={() => {
          setIsFoundingOpen(false);
          if (window.location.hash) {
            window.history.pushState(null, '', window.location.pathname);
          }
        }}
      />

      {/* Institutional Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => {
          setIsContactOpen(false);
          if (window.location.hash) {
            window.history.pushState(null, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
};

export default App;
