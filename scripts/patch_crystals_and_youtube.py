import os

script_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(script_dir)

files_to_patch = [
    os.path.join(root_dir, 'public', 'App3D-d68cb154.js'),
    os.path.join(root_dir, 'public', 'assets', 'App3D-d68cb154.js')
]

cubes_content = """cubes:[
  {
    title:"FOUNDATION_01 Who We Are",
    hash:"who-we-are",
    date:"09/2026",
    temp:0,
    obj:"cube3",
    innerobject:"pudgy",
    interior:{
      enabled:!0,
      title:"////// WHO WE ARE & WHAT WE ARE DOING",
      content:`"The next generation of intelligence has to be learned with humanity."

Cognisee is a Delaware Public Benefit Corporation building Superintelligence for Human Dignity through Artificial Collective Intelligence.

Societies have tied dignity to economic output, and most AI today chases productivity, measuring its progress by how much human work it can replace. Cognisee is betting on human wisdom and on extending human potential, with cognition infrastructure that amplifies human judgment by default and delivers trusted autonomy where it is required.

Through our cognitive architecture, AI learns with the practitioners who hold expertise—under their governance—ensuring many specialist intelligences grow more capable together with humanity.`,
      socialTitle:"/// Focus Areas",
      social:[{name:"TREATISE",link:"https://www.cognisee.ai"},{name:"PBC MISSION",link:"https://www.cognisee.ai"}],
      linkTitle:"/// Founding Position",
      links:[{name:"Read Treatise",link:"https://www.cognisee.ai"}],
      obj:"cube3",
      objScale:1.1
    }
  },
  {
    title:"FOUNDATION_02 What We Are Solving",
    hash:"what-we-are-solving",
    date:"09/2026",
    temp:-3,
    obj:"cube1",
    innerobject:"overpass_logo",
    interior:{
      enabled:!0,
      title:"////// WHAT WE ARE SOLVING: KNOWLEDGE COLLAPSE",
      content:`The knowledge that matters most was never written down.

It forms through years of practice, near misses, clinical touch, and consequence—in pediatric surgery, flight hangars, energy grids, and laboratories. It lives mostly in how specialists practice, and intelligence that learns only from recorded artifacts will keep missing it.

When AI replaces human judgment rather than amplifying it, it produces rapid cognitive deskilling. As modeled by Acemoglu, Kong, and Ozdaglar (2026), societies risk "knowledge collapse": general human knowledge eventually vanishes while shallow automated advice remains.

Cognisee solves this existential challenge by capturing, preserving, and operationalizing tacit expertise so human judgment expands alongside machine capability.`,
      socialTitle:"/// The Crisis",
      social:[{name:"TACIT KNOWLEDGE",link:"https://www.cognisee.ai"},{name:"NBER RESEARCH",link:"https://www.cognisee.ai"}],
      linkTitle:"/// Explore Thesis",
      links:[{name:"Read Treatise Section 1 & 3",link:"https://www.cognisee.ai"}],
      obj:"overpass_logo",
      objScale:1.2
    }
  },
  {
    title:"FOUNDATION_03 How We Are Solving",
    hash:"how-we-are-solving",
    date:"09/2026",
    temp:2,
    obj:"cube3",
    innerobject:"pudgy",
    interior:{
      enabled:!0,
      title:"////// HOW WE ARE SOLVING: ARTIFICIAL COLLECTIVE INTELLIGENCE",
      content:`Plural Cognition, Upstream Alignment, and Wisdom Vaults.

Intelligence develops in community, never in isolated monoculture. A single omniscient AI model inevitably amplifies its own systemic blindspots. True epistemic resilience emerges from Artificial Collective Intelligence: diverse specialist agents that reason independently, test hypotheses, and disagree productively under open trust architectures.

Alignment is rebalanced upstream into how intelligence forms—inheriting the norms, provenance, and cautions of practitioners.

Through globally distributed Wisdom Vaults, communities and institutions preserve and govern intergenerational tacit knowledge in cryptographically sovereign enclaves without data exfiltration.`,
      socialTitle:"/// Architecture",
      social:[{name:"WISDOM VAULTS",link:"https://www.cognisee.ai"},{name:"COLLECTIVE AI",link:"https://www.cognisee.ai"}],
      linkTitle:"/// Governance Protocols",
      links:[{name:"Explore Trust Architecture",link:"https://www.cognisee.ai"}],
      obj:"pudgy",
      objScale:1.1
    }
  },
  {
    title:"FOUNDATION_04 Our Team",
    hash:"our-team",
    date:"09/2026",
    temp:-1,
    obj:"cube1",
    innerobject:"overpass_logo",
    interior:{
      enabled:!0,
      title:"////// OUR TEAM: LEADERSHIP, RESEARCH & GOVERNANCE",
      content:`Ahmer Inam — Founder and CEO, Cognisee, PBC.

Our team brings together world-class researchers and engineers in Artificial Collective Intelligence, cognitive architectures, domain-proximal compute, distributed consensus, and institutional governance.

We collaborate closely with veteran pediatric specialists, aerospace engineers, industrial operators, and public benefit stewards across mission-critical disciplines.

Structured as a Delaware Public Benefit Corporation, Cognisee is governed by a legally binding charter to advance superintelligence that elevates human dignity, agency, and accountability above pure automation.`,
      socialTitle:"/// Leadership & Governance",
      social:[{name:"AHMER INAM (CEO)",link:"https://www.cognisee.ai"},{name:"DELAWARE PBC",link:"https://www.cognisee.ai"}],
      linkTitle:"/// Dialogue & Inquiries",
      links:[{name:"Initiate Dialogue",link:"https://www.cognisee.ai"}],
      obj:"overpass_logo",
      objScale:1.2
    }
  }
],links:["""

import re

for filepath in files_to_patch:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Replace cubes block
    c = re.sub(r'cubes:\s*\[[\s\S]*?\],\s*links:\s*\[', cubes_content, c, count=1)

    # 2. Fix inverted UV for youtube card
    c = c.replace('vec2 uv = vec2(1.0 - vUv.x, vUv.y);', 'vec2 uv = vUv;')

    # 3. Size of youtube card
    c = c.replace('new kt(0.85, 0.478)', 'new kt(0.70, 0.394)')
    c = c.replace('new kt(0.85, 0.48)', 'new kt(0.70, 0.394)')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(c)

    print(f"Successfully patched {filepath}")
