export interface TechnologyTile {
  id: string;
  number: string;
  labelLines: string[];
  iconSvg: string;
}

export interface TechSectionData {
  id: string;
  number: string;
  label: string;
  title: string;
  body: string;
  icon: string;
  chain?: string[];
}

export const HERO_CONTENT = {
  eyebrow: "Biological Intelligence",
  h1Line1: "The Technology Behind",
  h1Line2: '"Complete, Not Replace"',
  lede: "Biological Intelligence isn't one product or one patent. It's six technologies working together — each one solving a different part of the same problem: how do you make biology reliable enough to trust in a system built on chemistry?",
  hint: "Tap a node, or scroll ↓",
};

export const TILES: TechnologyTile[] = [
  {
    id: "biotech",
    number: "01",
    labelLines: ["MICROBIAL", "BIOTECHNOLOGY"],
    iconSvg: `<rect x="8" y="3" width="8" height="18" rx="4"/><path d="M8 9h8M8 15h8"/>`,
  },
  {
    id: "metabyaum",
    number: "02",
    labelLines: ["METABYAUM"],
    iconSvg: `<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.6 7.4l3.6 3.2M17.4 7.4l-3.6 3.2M6.6 16.6l3.6-3.2M17.4 16.6l-3.6-3.2"/>`,
  },
  {
    id: "mnm",
    number: "03",
    labelLines: ["E=m²", "(MICROBES + MINERAL)"],
    iconSvg: `<path d="M12 2L20 7V17L12 22L4 17V7Z"/><circle cx="12" cy="12" r="3"/>`,
  },
  {
    id: "delivery",
    number: "04",
    labelLines: ["DELIVERY", "TECH"],
    iconSvg: `<rect x="4" y="9" width="16" height="6" rx="3"/><path d="M12 9v6"/>`,
  },
];

export const SECTIONS: TechSectionData[] = [
  {
    id: "biotech",
    number: "01",
    label: "01 — Microbial Biotechnology",
    title: "Where Every Product Starts",
    body: "Every Biofactor product begins with a strain — isolated, characterized, and tested before it ever reaches a formulation. Our microbial biotechnology work maintains a bank of 60+ deposited and elite strains, the raw material every other technology on this page builds on.",
    icon: `<rect x="8" y="3" width="8" height="18" rx="4"/><path d="M8 9h8M8 15h8"/>`,
  },
  {
    id: "metabyaum",
    number: "02",
    label: "02 — METABYAUM",
    title: "Microbes & Metabolites, Working as One",
    body: "MetaByaum brings diverse microbial communities and their metabolites together activating biological performance from day one and sustaining it as the microbes establish.",
    icon: `<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.6 7.4l3.6 3.2M17.4 7.4l-3.6 3.2M6.6 16.6l3.6-3.2M17.4 16.6l-3.6-3.2"/>`,
    chain: ["Engineered synergy.", "Built for real-world performance."],
  },
  {
    id: "mnm",
    number: "03",
    label: "03 — E=m² (Microbes + Mineral)",
    title: "Where Biology Meets Chemistry",
    body: "Life itself emerged through chemistry, and it never stopped needing it. Our E=m² (Microbes + Mineral) approach is what happens when a product is engineered against microbiology, mineral science, and delivery technology from the start.",
    icon: `<path d="M12 2L20 7V17L12 22L4 17V7Z"/><circle cx="12" cy="12" r="3"/>`,
  },
  {
    id: "mineral",
    number: "04",
    label: "04 — Mineral Technology",
    title: "Biology, Designed to Work With Minerals",
    body: "Biological systems operate within mineral environments in soil, water and the gut.\n\nOur mineral technology is designed to optimize the interaction between biological components and the mineral chemistry of each system, enabling greater compatibility, stability and biological performance.",
    icon: `<path d="M12 2L18 9L15 22H9L6 9Z"/><path d="M6 9h12"/>`,
  },
  {
    id: "delivery",
    number: "05",
    label: "05 — Delivery Technologies",
    title: "Keeping Biology Alive Long Enough to Work",
    body: "Microbes are only valuable if they survive long enough to reach the system they are designed to influence.\n\nBioencapsulation protects microbial viability through manufacturing, storage and field application, helping biological activity remain intact until the product reaches its destination.",
    icon: `<rect x="4" y="9" width="16" height="6" rx="3"/><path d="M12 9v6"/>`,
    chain: [
      "Protect the biology.",
      "Preserve its potential.",
      "Enable performance.",
    ],
  },
];

export const EVIDENCE_CONTENT = {
  eyebrow: "The Evidence",
  title: "Six technologies. 11 patented. Huge microbial strain bank",
  stats: [
    { to: 11, label: "Patents granted" },
    { to: 2, label: "Patented Platforms — Bioencapsulation & MAMSP" },
    { to: 350, suffix: "+", label: "Microbial strain bank" },
  ],
  closing: "BIOFACTOR BIOLOGICALS® — MICROBE · MINERAL · METABIOME · ONE HEALTH",
};
