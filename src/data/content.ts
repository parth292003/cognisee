export interface DomainItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  threadCharacteristics: string;
  tacitExpertise: string;
  iconName: string;
  image?: string;
}

export const DOMAINS: DomainItem[] = [
  {
    id: "aviation",
    name: "Aviation & Aerospace",
    tagline: "High-consequence flight operations & turbine safety",
    description: "From cockpit judgment under sudden turbulence to jet turbine acoustic harmonic diagnostics, safety depends on decades of unwritten practice.",
    threadCharacteristics: "High-tension, aerodynamic trajectory with precision harmonics and boundary-layer damping.",
    tacitExpertise: "An experienced airframe mechanic hears an engine vibration anomaly three hours before digital telemetry flags a threshold error.",
    iconName: "Plane",
    image: "/assets/visuals/aviation-turbine.png"
  },
  {
    id: "medicine",
    name: "Medicine & Healthcare",
    tagline: "Complex rare pediatric care & clinical intuition",
    description: "Pediatric specialists caring for children with multi-system conditions formulate clinical hypotheses by observing minute physiological subtleties.",
    threadCharacteristics: "Organic, delicate diagnostic pulse carrying contextual markers and treatment tolerance feedback.",
    tacitExpertise: "Knowing when to withhold an aggressive intervention because the patient's subtle vascular response suggests underlying instability.",
    iconName: "HeartPulse"
  },
  {
    id: "science",
    name: "Scientific Discovery",
    tagline: "Empirical breakthroughs & experimental anomalies",
    description: "Translating laboratory anomalies and failed experiments into new physical models, where published papers record only the final triumph.",
    threadCharacteristics: "Crystalline lattices, molecular resonance paths, and quantum state topological bonds.",
    tacitExpertise: "A physical chemist notices an unexpected crystallization pattern and recognizes a new reaction pathway rather than discarding it as contamination.",
    iconName: "Atom"
  },
  {
    id: "industry",
    name: "Industrial & Energy",
    tagline: "Power grids, process plants & critical infrastructure",
    description: "Interconnected electrical grids and cryogenic distillation facilities where operators balance fluid dynamics, thermal inertia, and safety margins.",
    threadCharacteristics: "Resilient geometric grid lines with distributed load balancing and fail-safe feedback loops.",
    tacitExpertise: "The grid dispatcher who intuitively senses weather-induced impedance shifts before automated line relays trip.",
    iconName: "Cpu"
  },
  {
    id: "computing",
    name: "Semiconductors & Systems",
    tagline: "Silicon fabrication, lithography & distributed architecture",
    description: "Nanometer semiconductor etching and distributed compute nodes where timing margins, parasitic capacitance, and yield optimization converge.",
    threadCharacteristics: "Ultra-fine rectilinear traces, optical wave guides, and nanosecond clock distribution.",
    tacitExpertise: "Yield engineering teams detecting wafer defect patterns that correlate with micro-variations in cleanroom airflow.",
    iconName: "Layers"
  }
];

export const WORK_PILLARS = [
  {
    number: "01",
    title: "Research & Analysis",
    subtitle: "Tacit reasoning models & cognitive exploration",
    description: "Developing learning architectures that discover unspoken human knowledge and map the structure of expert judgment."
  },
  {
    number: "02",
    title: "Intelligence Infrastructure",
    subtitle: "Artificial Collective Intelligence protocols",
    description: "Building the cognition infrastructure and open trust architecture that allow specialized intelligences to federate without centralizing authority."
  },
  {
    number: "03",
    title: "Human-AI Collaboration",
    subtitle: "AI-in-the-loop & epistemic foraging",
    description: "Creating systems where humans lead problem framing while AI deepens reasoning, clarifies missing evidence, and makes uncertainty legible."
  },
  {
    number: "04",
    title: "Real-World Impact",
    subtitle: "Demonstrated competence & trusted autonomy",
    description: "Translating collective cognition into high-stakes environments—from rare medical diagnostics to mission-critical infrastructure safety."
  }
];

export const SITE_METADATA = {
  name: "Cognisee",
  tagline: "A new kind of intelligence for a more human future.",
  legalStatus: "A Public Benefit Corporation",
  mission: "Superintelligence for Human Dignity",
  copyright: "© 2026 Cognisee, PBC. All rights reserved."
};
