export interface FoundingPrinciple {
  number: string;
  title: string;
  summary: string;
  excerpt: string;
  details: string[];
}

export interface Citation {
  id: number;
  author: string;
  title: string;
  publication: string;
  year: string;
  url?: string;
}

export const FOUNDING_POSITION = {
  organization: "Cognisee, PBC",
  title: "Superintelligence for Human Dignity",
  subtitle: "A Founding Position on Human Agency and Artificial Collective Intelligence",
  author: "Ahmer Inam",
  role: "Founder and CEO, Cognisee, PBC",
  date: "September 2026",
  thesis: "The next generation of intelligence has to be learned with humanity.",
  preamble: "This paper argues that as AI takes on the work of judgment, people and institutions must keep the capacity to develop that judgment, to govern how intelligence learns from them, and to share in what their knowledge helps create.",
  
  positionInBrief: [
    {
      label: "Human purpose is at stake",
      text: "Societies have tied dignity to economic output, and most AI today chases productivity, measuring its progress by how much human work it can replace. Cognisee is betting on human wisdom and on extending human potential, with AI that amplifies human judgment by default and delivers trusted autonomy where it is required."
    },
    {
      label: "Agency means shaping the learning loop",
      text: "A person who approves a conclusion they had no part in framing holds little authority. Machines take on responsibility as evidence and demonstrated competence allow, and today's architectures cannot yet earn that trust where uncertainty and stakes are high."
    },
    {
      label: "The knowledge that matters most was never written down",
      text: "It forms through practice, correction, and consequence, and intelligence that learns only from recorded artifacts will keep missing it."
    },
    {
      label: "Alignment has to be learned, and it has to be local",
      text: "Behavior adjusted after training is fragile. Alignment grounded in how intelligence learns, and in the context where it acts, carries forward as systems grow more capable."
    },
    {
      label: "Institutions and nations need to govern how intelligence learns from them",
      text: "Trust and sovereignty are becoming default requirements, and computing history already shows how to meet them: open standards that everyone can build on, with room for what must stay closed."
    },
    {
      label: "Participation starts at formation",
      text: "The people whose knowledge shapes an intelligence should keep standing in it and share in the value it creates."
    }
  ],

  openingStory: {
    title: "The Pediatrician's Dilemma",
    content: `One of a handful of specialists in the care of children with complex medical needs once told me what keeps him awake at night. He and a few colleagues built their expertise in a field few fund, learning from one another out of commitment to their patients. Most pediatricians who could use that knowledge do not know it exists. When these specialists retire, it will be gone forever.

He asked me whether his group's way of learning could be mapped, expressed in a system, and placed in the hands of pediatricians everywhere as a tool for thinking through their hardest cases. He was describing an intelligence that carries a small community's judgment forward and makes thousands of other doctors better at their work.

His situation is common wherever work carries real consequence. Every hospital, power plant, hangar, laboratory, and public agency depends on people whose judgment formed over years of cases, near misses, and corrections, and whose knowledge lives mostly in how they practice. Much of it has no market price. Some of it exists only because a few people cared enough to build it.

Artificial intelligence is now being built to do the kind of cognitive work those people do: interpreting evidence, weighing options, recommending, and increasingly acting. That makes the design of AI a question about human purpose as much as productivity. AI can carry expertise like his into the world and make the people who use it more capable. It can also absorb whatever was recorded, route around whatever was not, and leave institutions faster and thinner. This paper argues for the first path and for the conditions that make it possible.`
  },

  principles: [
    {
      number: "01",
      title: "Make the human irreplaceable",
      summary: "Most AI today chases productivity, measured by how much work it can replace. Cognisee judges progress by how far AI extends what people and institutions can achieve.",
      excerpt: "When technology automated muscle and routine, people moved toward work that required judgment. AI extends automation into judgment itself. If society has built no other foundation for dignity, it reaches into how people understand their own worth.",
      details: [
        "A dispatcher who once knew which streets flood first now follows the routing screen and stops noticing the water.",
        "A physician who once weighed conflicting evidence receives a single recommendation with unstated uncertainty.",
        "Stanford's 2026 AI Index and Acemoglu et al. warn of 'knowledge collapse' when automated recommendations replace the human learning effort that replenishes shared expertise.",
        "Cognisee builds systems that amplify human judgment by default, treating human wisdom as what makes autonomy trustworthy."
      ]
    },
    {
      number: "02",
      title: "Agency is the power to shape the loop",
      summary: "Human-in-the-loop is too thin. Real agency means shaping how a system learns, challenging its conclusions, and deciding when authority moves between people and machines.",
      excerpt: "A person who approves a conclusion they had no part in framing holds little authority. We call for AI-in-the-loop: when expertise is elicited, the expert leads, and the AI observes, asks questions, and structures tacit experience.",
      details: [
        "Epistemic Foraging: where uncertainty is high, AI acts as a mentor—surfacing missing evidence, locating disagreements, and proposing the next measurement.",
        "Responsibility moves with the situation: when evidence is thin or stakes are high, AI deepens human reasoning. In familiar, verified domains, it takes bounded autonomous action.",
        "Responsibility returns to the human the moment conditions change. Trusted autonomy is earned one bounded domain at a time."
      ]
    },
    {
      number: "03",
      title: "What recorded data cannot teach",
      summary: "The knowledge that matters most forms through practice, correction, and consequence. Michael Polanyi: 'we can know more than we can tell.'",
      excerpt: "Recorded knowledge, however vast, is the visible layer. A manual explains a procedure and leaves out the cases that taught an expert when to depart from it. A published study preserves the experiment that worked, while the quiet corrections live only in practice.",
      details: [
        "Longer context windows and retrieval do not give a model standing inside a practice, or the understanding of who holds legitimate authority.",
        "Cognition infrastructure requires engineering curiosity: recognizing competence edges, inquiring why an expert paused, and preserving disagreements intact.",
        "Superintelligence cannot be predicted into existence. Minds develop through grounding, diversity, and contact with consequence."
      ]
    },
    {
      number: "04",
      title: "Alignment begins in learning",
      summary: "Alignment added after training is fragile. Safety must be built upstream into how expertise is elicited, how uncertainty is represented, and within local institutional norms.",
      excerpt: "Research shows safety behavior added after training can be shallow, concentrated in the first few words of a response. As systems act with more autonomy, correcting behavior after the fact becomes a race the correction is likely to lose.",
      details: [
        "Upstream alignment: when a system learns from governed expertise carrying provenance and context, it inherits the cautions and norms of the practice.",
        "Local alignment: the norms governing a cockpit, a clinic, or community land differ for good reasons. Alignment must be grounded locally.",
        "Institutional alignment: a society of intelligences checks and balances itself through visible disagreement and diverse perspectives (Evans, Bratton, Agüera y Arcas, Science 2026)."
      ]
    },
    {
      number: "05",
      title: "Who governs how intelligence learns",
      summary: "Hosting decides where a model runs. Sovereignty decides who shapes how it learns, who verifies representations, and who holds decision rights.",
      excerpt: "When a few systems become the default interface to knowledge, their omissions become infrastructure. Institutions grow dependent while the expertise that once made them resilient migrates into systems they do not govern.",
      details: [
        "Concentration of compute and frontier development creates epistemic and institutional vulnerability.",
        "Sovereignty means forming and governing intelligence close to home while taking part in wider federations.",
        "Sensitive knowledge, decision rights, and governance stay with the people and institutions they belong to."
      ]
    },
    {
      number: "06",
      title: "We have solved the open and closed question before",
      summary: "Computing solved this with open standards (TCP/IP, Linux, HTML) and proprietary edges. Intelligence needs open trust protocols for provenance, consent, and uncertainty.",
      excerpt: "Openness at the layer of shared protocols let an ecosystem form; closed products at the edges let organizations compete and invest. Nobody had to choose one or the other.",
      details: [
        "Trust Architecture: treats provenance, consent, authority, and revocation as intrinsic properties of knowledge.",
        "Shared protocols allow many intelligences to cooperate while institutions keep patient records, proprietary methods, or security data strictly governed.",
        "Cognisee is publishing these protocols openly to establish global standards for collective intelligence."
      ]
    },
    {
      number: "07",
      title: "Participation begins before value is distributed",
      summary: "Debates about AI wealth begin too late. The people whose tacit knowledge and judgment made intelligence possible must share in standing and value from formation.",
      excerpt: "Today, contributors appear twice: first as raw material, later as supervised users or dividend recipients. Their relationship to intelligence formed from their knowledge should begin at formation.",
      details: [
        "Provenance infrastructure makes attribution, correction, and value sharing technically workable.",
        "Wisdom Vaults: Cognisee is committed as a PBC to helping communities preserve and govern intergenerational knowledge on their own terms."
      ]
    },
    {
      number: "08",
      title: "Artificial Collective Intelligence",
      summary: "Not one monolithic intelligence that knows everything. Many specialist intelligences—human and machine—that cooperate, disagree productively, and grow together.",
      excerpt: "A monoculture of intelligence is brittle for the same reason a monoculture of crops is: when conditions change, it has nothing else to draw on. Research shows groups of diverse problem solvers outperform homogenous high-ability groups.",
      details: [
        "Brings together specialist human and artificial intelligences with visible provenance and uncertainty.",
        "Productive disagreement preserves different perspectives without forcing uniform consensus.",
        "The ultimate test: the pediatrician who spent his life curing complex diseases sees his judgment live on, empowering doctors everywhere."
      ]
    }
  ],

  citations: [
    {
      id: 1,
      author: "David H. Autor",
      title: "Why Are There Still So Many Jobs? The History and Future of Workplace Automation",
      publication: "Journal of Economic Perspectives 29, no. 3",
      year: "2015"
    },
    {
      id: 2,
      author: "Stanford Institute for Human-Centered Artificial Intelligence",
      title: "The 2026 AI Index Report",
      publication: "HAI Stanford",
      year: "2026"
    },
    {
      id: 3,
      author: "Daron Acemoglu, Dingwen Kong, and Asuman Ozdaglar",
      title: "AI, Human Cognition and Knowledge Collapse",
      publication: "NBER Working Paper 34910",
      year: "2026",
      url: "https://doi.org/10.3386/w34910"
    },
    {
      id: 4,
      author: "Michael Polanyi",
      title: "The Tacit Dimension",
      publication: "Routledge & Kegan Paul",
      year: "1966"
    },
    {
      id: 5,
      author: "Xiangyu Qi et al.",
      title: "Safety Alignment Should Be Made More Than Just a Few Tokens Deep",
      publication: "International Conference on Learning Representations (ICLR)",
      year: "2025"
    },
    {
      id: 6,
      author: "Tomasz Korbak et al.",
      title: "Pretraining Language Models with Human Preferences",
      publication: "Proceedings of ICML, PMLR 202",
      year: "2023"
    },
    {
      id: 7,
      author: "Olaf Witkowski and Ahmer Inam",
      title: "Cognitive Infrastructure for Artificial Collective Intelligence: Tacit Reasoners, Domain-Proximal Compute, and Cognitive Economics",
      publication: "Cognisee Research Brief, Version 2.9",
      year: "2026"
    },
    {
      id: 8,
      author: "James Evans, Benjamin Bratton, and Blaise Agüera y Arcas",
      title: "Agentic AI and the Next Intelligence Explosion",
      publication: "Science 391, no. 6791",
      year: "2026"
    },
    {
      id: 9,
      author: "OECD",
      title: "Competition in Artificial Intelligence Infrastructure",
      publication: "OECD Roundtables on Competition Policy Papers, No. 330",
      year: "2025"
    },
    {
      id: 10,
      author: "Amirata Ghorbani and James Zou",
      title: "Data Shapley: Equitable Valuation of Data for Machine Learning",
      publication: "Proceedings of the 36th ICML",
      year: "2019"
    },
    {
      id: 11,
      author: "Lu Hong and Scott E. Page",
      title: "Groups of Diverse Problem Solvers Can Outperform Groups of High-Ability Problem Solvers",
      publication: "PNAS 101, no. 46",
      year: "2004"
    }
  ]
};
