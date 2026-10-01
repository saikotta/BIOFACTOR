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
    labelLines: ["Microbial", "Biotech"],
    iconSvg: `<rect x="8" y="3" width="8" height="18" rx="4"/><path d="M8 9h8M8 15h8"/>`,
  },
  {
    id: "metabolite",
    number: "02",
    labelLines: ["Metabolite", "Science"],
    iconSvg: `<circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="7" r="2.5"/><circle cx="12" cy="17" r="2.5"/><path d="M9 8.5l1.3 6.5M15 8.5l-1.3 6.5M9.5 7h5"/>`,
  },
  {
    id: "metabiome",
    number: "03",
    labelLines: ["Metabiome"],
    iconSvg: `<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.6 7.4l3.6 3.2M17.4 7.4l-3.6 3.2M6.6 16.6l3.6-3.2M17.4 16.6l-3.6-3.2"/>`,
  },
  {
    id: "mnm",
    number: "04",
    labelLines: ["Microbe &", "Mineral™"],
    iconSvg: `<path d="M12 2L20 7V17L12 22L4 17V7Z"/><circle cx="12" cy="12" r="3"/>`,
  },
  {
    id: "mineral",
    number: "05",
    labelLines: ["Mineral", "Tech"],
    iconSvg: `<path d="M12 2L18 9L15 22H9L6 9Z"/><path d="M6 9h12"/>`,
  },
  {
    id: "delivery",
    number: "06",
    labelLines: ["Delivery", "Tech"],
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
    id: "metabolite",
    number: "02",
    label: "02 — Metabolite Science",
    title: "The Molecules That Do the Work",
    body: `A microbe doesn't help a plant by being present — it helps by producing something: an enzyme, an acid, a signal molecule. Metabolite science is the study of what our strains actually produce, and why it matters to the system they're placed in. It's the link between "we have a good microbe" and "we know what it does."`,
    icon: `<circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="7" r="2.5"/><circle cx="12" cy="17" r="2.5"/><path d="M9 8.5l1.3 6.5M15 8.5l-1.3 6.5M9.5 7h5"/>`,
  },
  {
    id: "metabiome",
    number: "03",
    label: "03 — Metabiome",
    title: "Communities, Not Single Organisms",
    body: "Nature doesn't work through isolated organisms — it works through communities. Microorganisms interact with minerals, nutrients, plants, animals, and one another to create complex biological systems. Metabiome is our framework for engineering those interactions deliberately, instead of shipping one strain and hoping it behaves the same way in the field as it did in the lab.",
    icon: `<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.6 7.4l3.6 3.2M17.4 7.4l-3.6 3.2M6.6 16.6l3.6-3.2M17.4 16.6l-3.6-3.2"/>`,
    chain: ["Microbe", "Metabolite", "Metabiome", "Biological Intelligence"],
  },
  {
    id: "mnm",
    number: "04",
    label: "04 — Microbe & Mineral™",
    title: "Where Biology Meets Chemistry",
    body: "Life itself emerged through chemistry, and it never stopped needing it. Our Microbe & Mineral™ approach is what happens when a product is engineered against microbiology, mineral science, and delivery technology from the start — not a microbial product with minerals added for the label.",
    icon: `<path d="M12 2L20 7V17L12 22L4 17V7Z"/><circle cx="12" cy="12" r="3"/>`,
  },
  {
    id: "mineral",
    number: "05",
    label: "05 — Mineral Technology",
    title: "The Half of the Story Biology Can't Replace",
    body: "Biology doesn't work in a vacuum — it works in soil, water, and gut systems that are fundamentally mineral environments. Our mineral technology work makes sure the biological side of a product has something real to interact with, instead of competing with the mineral chemistry already present in the system.",
    icon: `<path d="M12 2L18 9L15 22H9L6 9Z"/><path d="M6 9h12"/>`,
  },
  {
    id: "delivery",
    number: "06",
    label: "06 — Delivery Technologies",
    title: "Keeping Biology Alive Long Enough to Work",
    body: "Microbes are alive, and living things die in a bag on a truck in 45°C heat. Delivery technology — anchored by our patented Bioencapsulation process — is what protects a strain through storage, transport, and field application: the difference between a product that performs in a trial and one that performs six months later, in a farmer's actual shed.",
    icon: `<rect x="4" y="9" width="16" height="6" rx="3"/><path d="M12 9v6"/>`,
  },
];

export const EVIDENCE_CONTENT = {
  eyebrow: "The Evidence",
  title: "Six Technologies. Two Patented. One Bank of Strains.",
  stats: [
    { to: 9, label: "Patents Filed" },
    { to: 2, label: "Patented Platforms — Bioencapsulation & MAMSP" },
    { to: 60, suffix: "+", label: "Elite / Deposited Strains" },
  ],
  closing: "BIOFACTOR BIOLOGICALS® — MICROBE · MINERAL · METABIOME · ONE HEALTH",
};
