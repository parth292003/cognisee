import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    inquiryType: 'specialist',
    domain: 'Aviation & Critical Infrastructure',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex justify-center items-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#F6F5EB] border border-[#1C2922]/15 text-[#1C2922] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#1C2922]/60 hover:text-[#142019] hover:bg-[#1C2922]/5 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="inline-flex p-3 rounded-full bg-[#286F61]/15 text-[#286F61] mb-2">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-display text-[#142019]">
              Dialogue Initiated
            </h3>
            <p className="text-xs sm:text-sm text-[#1C2922]/70 max-w-md mx-auto leading-relaxed font-sans">
              Thank you for contacting Cognisee Research Laboratories. A member of our research directorate or institutional partnership team will review your inquiry under strict governance and confidentiality protocols.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#1C2922] text-[#FBF9EF] font-mono text-xs hover:bg-[#142019] transition-colors"
              >
                RETURN TO WEBSITE
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#286F61]" />
              <p className="text-[10px] font-mono tracking-widest text-[#286F61] uppercase font-semibold">
                INSTITUTIONAL DIALOGUE // GOVERNED INQUIRY
              </p>
            </div>
            <h2 className="text-2xl font-display tracking-tight text-[#142019] mb-2">
              Initiate Research Dialogue
            </h2>
            <p className="text-xs text-[#1C2922]/70 mb-6 leading-relaxed font-sans">
              Cognisee engages with specialist communities, hospital groups, aerospace engineering teams, and institutional researchers exploring collective intelligence.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#1C2922]/70 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Eleanor Vance"
                    className="w-full px-3.5 py-2 rounded-lg bg-white/70 border border-[#1C2922]/15 text-xs text-[#1C2922] focus:outline-none focus:border-[#286F61]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#1C2922]/70 mb-1">
                    Institution / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="St. Jude / MIT / Lockheed"
                    className="w-full px-3.5 py-2 rounded-lg bg-white/70 border border-[#1C2922]/15 text-xs text-[#1C2922] focus:outline-none focus:border-[#286F61]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#1C2922]/70 mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="evance@institution.edu"
                  className="w-full px-3.5 py-2 rounded-lg bg-white/70 border border-[#1C2922]/15 text-xs text-[#1C2922] focus:outline-none focus:border-[#286F61]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#1C2922]/70 mb-1">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-white/70 border border-[#1C2922]/15 text-xs text-[#1C2922] focus:outline-none focus:border-[#286F61]"
                  >
                    <option value="specialist">Tacit Expertise Integration</option>
                    <option value="research">Academic Research Fellowship</option>
                    <option value="institutional">Wisdom Vault Deployment</option>
                    <option value="media">Governance & Policy Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#1C2922]/70 mb-1">
                    Primary Domain
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-white/70 border border-[#1C2922]/15 text-xs text-[#1C2922] focus:outline-none focus:border-[#286F61]"
                  >
                    <option value="Aviation">Aviation & Aerospace</option>
                    <option value="Medicine">Pediatric Medicine & Surgery</option>
                    <option value="Science">Fundamental Physical Science</option>
                    <option value="Industry">Critical Energy Grids</option>
                    <option value="Computing">Semiconductors & Systems</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#1C2922]/70 mb-1">
                  Scope of Inquiry
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline the domain problem, tacit expertise challenges, or sovereign architecture requirements..."
                  className="w-full px-3.5 py-2 rounded-lg bg-white/70 border border-[#1C2922]/15 text-xs text-[#1C2922] focus:outline-none focus:border-[#286F61] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#1C2922]/60">
                  <ShieldCheck size={14} className="text-[#286F61]" />
                  <span>Delaware PBC Governance · Confidentiality Preserved</span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#1C2922] text-[#FBF9EF] text-xs font-mono tracking-wider hover:bg-[#142019] transition-all flex items-center gap-2"
                >
                  <span>SUBMIT INQUIRY</span>
                  <Send size={12} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
