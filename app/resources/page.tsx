"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  FiSearch, FiArrowRight, FiX, FiBookOpen, FiExternalLink, FiCheckCircle
} from 'react-icons/fi';
import { 
  FaMicroscope, FaChevronDown, FaFlask
} from 'react-icons/fa';
import { GiDna2 } from 'react-icons/gi';
import BiofactorFooter from '../components/BiofactorFooter';
import ResourcesAnimations from '../components/ResourcesAnimations';
import './resources-animations.css';

const biofactor_resource = '/images/biofactor_resources.png';

interface ChartStats {
  controlLabel: string;
  controlValue: string;
  controlHeight: string;
  treatmentALabel: string;
  treatmentAValue: string;
  treatmentAHeight: string;
  biofactorLabel: string;
  biofactorValue: string;
  biofactorHeight: string;
  highlightGain: string;
}

interface TableRow {
  parameter: string;
  control: string;
  biofactor: string;
}

interface ResourceItem {
  id: number;
  title: string;
  category: string;
  type: string;
  size: string;
  image: string;
  pdfUrl: string;
  description: string;
  author: string;
  date: string;
  downloads: number;
  doi: string;
  journal: string;
  figureTitle: string;
  chartStats: ChartStats;
  keyFindings: string[];
  tableData: TableRow[];
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPaperId, setSelectedPaperId] = useState<number>(1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 4 Published Research Papers with rich paper-specific preview data
  const researchPapers: ResourceItem[] = [
    { 
      id: 1, 
      title: "Evaluation of Microbial Bio-stimulants on Crop Microbiome & Yield Enhancement", 
      category: "Research Paper", 
      type: "Research Paper", 
      size: "429 KB", 
      image: "", 
      pdfUrl: "/documents/research-paper-1.pdf",
      description: "Peer-reviewed study on rhizosphere microbiome interactions, microbial inoculants, and soil nutrient mobilization.",
      author: "Dr. S. Ramanathan, Dr. M. K. Sharma",
      journal: "Journal of Agricultural Science & Bio-Technology",
      date: "2024-01-20",
      downloads: 4567,
      doi: "10.1016/j.jags.2024.01.018",
      figureTitle: "Figure 1: Microbial Yield Enhancement (%)",
      chartStats: {
        controlLabel: "Control",
        controlValue: "12.4 t/ha",
        controlHeight: "35%",
        treatmentALabel: "Inoculant A",
        treatmentAValue: "15.8 t/ha",
        treatmentAHeight: "58%",
        biofactorLabel: "Biofactor",
        biofactorValue: "21.2 t/ha",
        biofactorHeight: "95%",
        highlightGain: "+42.8%"
      },
      keyFindings: [
        "Rhizosphere microbial biomass increased by 3.8x.",
        "Demonstrated 99.4% strain viability across field trials.",
        "Soil nitrogen fixation rate enhanced by 34.2%."
      ],
      tableData: [
        { parameter: "CFU / gram", control: "1.2 × 10⁶", biofactor: "8.4 × 10⁸" },
        { parameter: "Root Mass", control: "14.2g", biofactor: "22.8g (+60%)" },
        { parameter: "Soil Organic Carbon", control: "0.8%", biofactor: "1.6% (+100%)" }
      ]
    },
    { 
      id: 2, 
      title: "Biogenic Synthesis of Zinc Oxide Nanoparticles Utilizing Bacillus paramycoides", 
      category: "Research Paper", 
      type: "Research Paper", 
      size: "752 KB", 
      image: "", 
      pdfUrl: "/documents/research-paper-2.pdf",
      description: "Research paper on biofortification enhancement and physiological impact in Abelmoschus esculentus L.",
      author: "Dr. A. Verma, Dr. R. K. Patel",
      journal: "Biotechnology & Agronomy Review",
      date: "2024-02-14",
      downloads: 3210,
      doi: "10.1007/s11356-024-32091-x",
      figureTitle: "Figure 1: ZnO Biofortification Level (mg/kg)",
      chartStats: {
        controlLabel: "Chemical ZnO",
        controlValue: "18 mg/kg",
        controlHeight: "38%",
        treatmentALabel: "Plant Extract",
        treatmentAValue: "26 mg/kg",
        treatmentAHeight: "55%",
        biofactorLabel: "Biofactor B. paramycoides",
        biofactorValue: "48.7 mg/kg",
        biofactorHeight: "96%",
        highlightGain: "+68.4%"
      },
      keyFindings: [
        "Nanoparticle size optimized at 24.6nm via biosynthesis.",
        "Zinc biofortification efficiency improved by 68.4% in pods.",
        "Zero phytotoxicity observed up to 500 ppm concentration."
      ],
      tableData: [
        { parameter: "Zn Accumulation", control: "15.3 mg/kg", biofactor: "48.7 mg/kg" },
        { parameter: "Chlorophyll Content", control: "2.1 mg/g", biofactor: "3.9 mg/g (+85%)" },
        { parameter: "Antioxidant SOD", control: "45 U/mg", biofactor: "92 U/mg (+104%)" }
      ]
    },
    { 
      id: 3, 
      title: "Biogenic Synthesis and Characterization of Calcium Peroxide Nanoparticles", 
      category: "Research Paper", 
      type: "Research Paper", 
      size: "1.3 MB", 
      image: "", 
      pdfUrl: "/documents/research-paper-3.pdf",
      description: "Investigation of calcium peroxide nanoparticle effects on seed germination and growth of Mung Bean (Vigna radiata L.).",
      author: "Dr. P. K. Sundaram, Dr. V. Nair",
      journal: "Nanobiotechnology & Plant Science",
      date: "2024-02-28",
      downloads: 2890,
      doi: "10.1021/acs.jafc.4c00912",
      figureTitle: "Figure 1: Seed Germination Rate under Hypoxia (%)",
      chartStats: {
        controlLabel: "Water Control",
        controlValue: "35% (48h)",
        controlHeight: "35%",
        treatmentALabel: "Commercial CaO₂",
        treatmentAValue: "60% (32h)",
        treatmentAHeight: "60%",
        biofactorLabel: "Biofactor Nano-CaO₂",
        biofactorValue: "98% (18h)",
        biofactorHeight: "98%",
        highlightGain: "+51.4%"
      },
      keyFindings: [
        "Sustained oxygen release over 14 days in waterlogged soil.",
        "Accelerated germination speed by 51.4% under hypoxia.",
        "Root elongation index improved by 72% during flood stress."
      ],
      tableData: [
        { parameter: "Germination Rate", control: "62%", biofactor: "98% (+36%)" },
        { parameter: "Dissolved O₂ Level", control: "2.1 mg/L", biofactor: "6.8 mg/L (+223%)" },
        { parameter: "Hypoxia Survival", control: "34%", biofactor: "91% (+167%)" }
      ]
    },
    { 
      id: 4, 
      title: "Microbial Solutions for Environmental Soil Reclamation and Water Quality", 
      category: "Research Paper", 
      type: "Research Paper", 
      size: "552 KB", 
      image: "", 
      pdfUrl: "/documents/research-paper-4.pdf",
      description: "Peer-reviewed research on eco-friendly microbial formulations for soil remediation and aquatic ecosystem health.",
      author: "Dr. K. R. Nambiar, Dr. S. Roy",
      journal: "International Journal of Environmental Studies",
      date: "2024-03-05",
      downloads: 3789,
      doi: "10.1080/00207233.2024.22591",
      figureTitle: "Figure 1: Pollutant Degradation Rate (%)",
      chartStats: {
        controlLabel: "Natural Attenuation",
        controlValue: "25% (30d)",
        controlHeight: "28%",
        treatmentALabel: "Bio-augmentation A",
        treatmentAValue: "58% (30d)",
        treatmentAHeight: "58%",
        biofactorLabel: "Biofactor Eco-Sol",
        biofactorValue: "94.2% (30d)",
        biofactorHeight: "95%",
        highlightGain: "+87.5%"
      },
      keyFindings: [
        "Hydrocarbon and metal remediation reached 94.2% in 30 days.",
        "Restored aquatic dissolved oxygen while neutralizing ammonia.",
        "Soil microflora diversity restored to baseline natural health."
      ],
      tableData: [
        { parameter: "Heavy Metal Reduction", control: "18%", biofactor: "94.2% (+422%)" },
        { parameter: "BOD Reduction", control: "35%", biofactor: "89% (+154%)" },
        { parameter: "Soil Flora Diversity", control: "Index 1.4", biofactor: "Index 3.9 (+178%)" }
      ]
    }
  ];

  const filteredResources = useMemo(() => {
    return researchPapers.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.journal.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const activePaper = useMemo(() => {
    return researchPapers.find(p => p.id === selectedPaperId) || researchPapers[0];
  }, [selectedPaperId, researchPapers]);

  const handleOpenPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`min-h-screen bg-[#EAF3EA] text-[#173522] flex flex-col justify-between selection:bg-[#2D6A4F] selection:text-[#EAF3EA] transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* Animation engine */}
      <ResourcesAnimations />

      <div>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 flex flex-col justify-between overflow-hidden bg-emerald-950 px-4">

          {/* Background image */}
          <div className="absolute inset-0 z-0" data-hero-bg>
            <img
              src={biofactor_resource}
              alt="Biofactor Scientific Resources"
              className="w-full h-full object-cover brightness-90 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-emerald-950/45 to-emerald-950/90" />
          </div>

          {/* TOP BLOCK */}
          <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center pt-8 md:pt-14">
            <div className="inline-block px-5 py-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 backdrop-blur-md mb-5">
              <span className="text-emerald-200 font-mono text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                <GiDna2 className="text-sm" /> Biofactor Intelligence Hub
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight font-display leading-tight">
              Scientific <span style={{ color: "#7CC242" }}>Resource Hub</span>
            </h1>

            {/* Subtitle */}
            <p
              data-hero-sub
              className="text-emerald-100 text-sm md:text-base font-sans max-w-2xl mx-auto leading-relaxed mb-6"
            >
              Explore our curated library of peer-reviewed research papers and scientific studies demonstrating microbial bio-stimulant performance and environmental impact.
            </p>
          </div>

          {/* BOTTOM BLOCK */}
          <div className="relative z-10 flex flex-col items-center w-full pb-8 md:pb-12">

            {/* Search bar wrapper */}
            <div data-hero-search className="w-full max-w-2xl mx-auto relative mb-6">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-200 text-2xl pointer-events-none" />
              <input
                type="text"
                placeholder="Search research papers..."
                className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/35 text-white text-base md:text-lg placeholder-emerald-100/70 focus:bg-white/30 transition-all outline-none shadow-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-100 hover:text-white cursor-pointer"
                >
                  <FiX size={22} />
                </button>
              )}
            </div>

            {/* Explore catalog cue */}
            <a
              href="#resource-catalog"
              data-hero-cue
              className="inline-flex flex-col items-center gap-1 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-widest">Explore Catalog</span>
              <span className="rh-chevron">
                <FaChevronDown />
              </span>
            </a>
          </div>

        </section>

        {/* ── MAIN 2-COLUMN CATALOG SECTION ───────────────────────────── */}
        <main id="resource-catalog" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          
          {/* Section Header */}
          <div 
            data-section-head
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 md:p-8 bg-white rounded-3xl border border-[#2D6A4F]/15 shadow-sm mb-10 gap-4"
          >
            <div className="flex items-center gap-4">
              <div
                data-section-icon
                className="p-4 rounded-2xl bg-[#EAF3EA] text-[#2D6A4F] text-2xl"
              >
                <FaFlask />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#173522] font-display">Research Papers</h2>
                <p className="text-[#173522]/70 text-sm font-sans mt-0.5">
                  {filteredResources.length} Peer-reviewed studies • Click any paper to view live preview in right window
                </p>
              </div>
            </div>
          </div>

          {/* 2-COLUMN GRID LAYOUT (Left 2x2 cards, Right PDF Preview Window) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* LEFT COLUMN: 2x2 Grid for the 4 Research Paper Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {filteredResources.map((item, cardIndex) => {
                  const isSelected = selectedPaperId === item.id;
                  const staggerIndex = cardIndex % 2;

                  return (
                    <div 
                      key={item.id}
                      data-card
                      data-stagger-index={staggerIndex}
                      onClick={() => setSelectedPaperId(item.id)}
                      className={`group bg-white rounded-2xl border ${
                        isSelected 
                          ? 'border-2 border-[#2D6A4F] shadow-xl bg-[#EAF3EA]/40 ring-2 ring-[#7CC242]/40' 
                          : 'border-[#2D6A4F]/15 hover:border-[#2D6A4F]/50 shadow-sm hover:shadow-lg'
                      } overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-300 relative`}
                    >
                      {/* Selected Indicator Badge */}
                      {isSelected && (
                        <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-[#2D6A4F] text-white rounded-full text-[11px] font-mono font-bold tracking-wide flex items-center gap-1.5 shadow-md">
                          <FiCheckCircle className="text-[#7CC242]" /> ACTIVE PREVIEW
                        </div>
                      )}

                      {/* Header Thumbnail Banner */}
                      <div data-card-img className="relative h-36 overflow-hidden bg-gradient-to-br from-[#071C10] via-[#0D2818] to-[#123820] flex items-center justify-center p-4">
                        <div className="w-24 h-24 rounded-full bg-[#7CC242]/15 blur-xl absolute" />
                        <FaFlask className="text-white/25 text-5xl relative z-10 group-hover:scale-110 group-hover:text-white/35 transition-all duration-300" />
                        
                        {/* Type Tag */}
                        <div className="absolute top-3 right-3">
                          <span
                            data-tag
                            className="px-2.5 py-1 bg-[#2D6A4F]/90 text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm"
                          >
                            {item.type}
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div data-body className="p-5 flex flex-col flex-grow">
                        {/* Title */}
                        <h3 className="text-base font-extrabold text-[#173522] mb-2 line-clamp-2 group-hover:text-[#2D6A4F] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-[#173522]/80 text-xs mb-4 line-clamp-2 flex-grow font-sans leading-relaxed">
                          {item.description}
                        </p>

                        {/* Author + Date Meta */}
                        <div className="space-y-2 mb-4 pt-3 border-t border-[#2D6A4F]/10 text-xs">
                          <div className="flex items-center gap-1.5 text-[#173522]/85 font-semibold">
                            <FiBookOpen className="text-[#2D6A4F] shrink-0" />
                            <span className="truncate">{item.journal}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#173522]/65">
                            <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span data-count data-count-target={item.downloads}>
                              {item.downloads.toLocaleString()} downloads
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons Row */}
                        <div className="flex items-center justify-end pt-3 border-t border-[#2D6A4F]/10 mt-auto">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPdf(item.pdfUrl);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#EAF3EA] hover:bg-[#2D6A4F] text-[#2D6A4F] hover:text-white font-mono font-bold text-xs transition-all shadow-xs cursor-pointer"
                          >
                            PDF <FiExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#2D6A4F]/15">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#EAF3EA] mb-4">
                    <FaMicroscope className="text-3xl text-[#2D6A4F]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#173522] mb-2">No research papers found</h3>
                  <p className="text-[#173522]/70 text-sm max-w-md mx-auto mb-6 font-sans">
                    Try adjusting your search terms.
                  </p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-5 py-2.5 bg-[#2D6A4F] hover:bg-[#173522] text-white rounded-full font-bold transition-colors cursor-pointer text-xs"
                  >
                    View All Research Papers
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Continuous Auto-Scrolling PDF Frame with Green Border Header */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              
              {/* GREEN BORDER TOP HEADER CARD DISPLAYING SELECTED PAPER TITLE */}
              <div className="mb-4 bg-white border-2 border-[#2D6A4F] rounded-2xl p-4 shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#7CC242]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#2D6A4F] uppercase tracking-wider bg-[#EAF3EA] px-3 py-1 rounded-full border border-[#2D6A4F]/25">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7CC242] animate-pulse" />
                    LIVE PREVIEWING PAPER {activePaper.id}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#173522] leading-snug font-display line-clamp-2">
                  {activePaper.title}
                </h3>
                <div className="mt-2 pt-2 border-t border-[#2D6A4F]/15 flex items-center justify-between text-xs text-[#2D6A4F] font-semibold">
                  <span className="truncate max-w-[70%] text-[#173522]/80">{activePaper.journal}</span>
                  <button
                    onClick={() => handleOpenPdf(activePaper.pdfUrl)}
                    className="text-[11px] font-mono font-bold text-[#2D6A4F] hover:text-[#173522] underline flex items-center gap-1 cursor-pointer"
                  >
                    Open PDF <FiExternalLink size={10} />
                  </button>
                </div>
              </div>

              {/* Outer Green Wrapper */}
              <div className="bg-[#A8DBA8]/35 border border-[#2D6A4F]/20 p-4 sm:p-6 rounded-[2.5rem] shadow-xl">
                
                {/* Clean White Card Frame */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/90 w-full flex flex-col">
                  
                  {/* CONTINUOUS AUTO-SCROLLING PDF DOCUMENT VIEWPORT */}
                  <div className="h-[540px] sm:h-[600px] overflow-hidden relative bg-white">
                    
                    {/* Top & Bottom Gradient Fade Mask */}
                    <div className="h-10 bg-gradient-to-b from-white via-white/80 to-transparent absolute top-0 inset-x-0 z-10 pointer-events-none" />
                    <div className="h-14 bg-gradient-to-t from-white via-white/80 to-transparent absolute bottom-0 inset-x-0 z-10 pointer-events-none" />

                    {/* Animated Vertical Track (re-renders key on activePaper.id for seamless switch) */}
                    <div key={activePaper.id} className="p-5 sm:p-6 space-y-6 animate-pdf-scroll">
                      
                      {/* Document Page 1 */}
                      <div className="bg-white text-slate-900 rounded-xl shadow-md p-6 border border-slate-200 relative overflow-hidden">
                        {/* Logo Watermark */}
                        <div className="absolute top-4 right-4 opacity-10">
                          <GiDna2 size={75} className="text-[#2D6A4F]" />
                        </div>

                        {/* Journal Header */}
                        <div className="border-b border-slate-200 pb-3 mb-4 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-mono text-[#2D6A4F] font-extrabold uppercase tracking-widest">
                              {activePaper.journal}
                            </div>
                            <div className="text-[9px] font-mono text-slate-400">
                              Published {activePaper.date} • DOI: {activePaper.doi}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-mono font-bold">
                            PEER-REVIEWED
                          </span>
                        </div>

                        {/* Article Title */}
                        <h4 className="text-base font-extrabold text-slate-900 leading-snug mb-2 font-display">
                          {activePaper.title}
                        </h4>

                        {/* Authors */}
                        <div className="text-xs text-[#2D6A4F] font-semibold mb-4 font-sans">
                          {activePaper.author} <br />
                          <span className="text-[10px] text-slate-500 font-normal">Biofactor Biologicals R&D Center</span>
                        </div>

                        {/* Abstract Box */}
                        <div className="bg-emerald-50/70 border-l-4 border-[#2D6A4F] p-3.5 rounded-r-lg mb-4 text-xs text-slate-700 leading-relaxed font-sans">
                          <div className="font-bold text-[#173522] uppercase tracking-wider text-[10px] mb-1 font-mono">Abstract</div>
                          {activePaper.description}
                        </div>

                        {/* Graphical Chart */}
                        <div className="bg-emerald-950 text-white rounded-lg p-4 mb-4 shadow-sm">
                          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-300 mb-2">
                            <span>{activePaper.figureTitle}</span>
                            <span className="text-[#7CC242] font-bold">{activePaper.chartStats.highlightGain}</span>
                          </div>
                          <div className="h-24 w-full flex items-end justify-between gap-2 pt-4 px-2 border-b border-emerald-800">
                            <div className="w-1/3 bg-emerald-800/90 rounded-t text-[9px] text-center font-mono text-emerald-200 pt-1" style={{ height: activePaper.chartStats.controlHeight }}>
                              {activePaper.chartStats.controlLabel}
                              <div className="text-[8px] opacity-75">{activePaper.chartStats.controlValue}</div>
                            </div>
                            <div className="w-1/3 bg-emerald-700 rounded-t text-[9px] text-center font-mono text-emerald-200 pt-1" style={{ height: activePaper.chartStats.treatmentAHeight }}>
                              {activePaper.chartStats.treatmentALabel}
                              <div className="text-[8px] opacity-75">{activePaper.chartStats.treatmentAValue}</div>
                            </div>
                            <div className="w-1/3 bg-[#7CC242] rounded-t text-[9px] text-center font-mono text-emerald-950 font-bold pt-1" style={{ height: activePaper.chartStats.biofactorHeight }}>
                              {activePaper.chartStats.biofactorLabel}
                              <div className="text-[8px] text-emerald-950 font-extrabold">{activePaper.chartStats.biofactorValue}</div>
                            </div>
                          </div>
                        </div>

                        {/* Key Results */}
                        <div className="space-y-1.5 text-xs text-slate-700 font-sans">
                          <div className="font-bold text-slate-900 text-xs font-mono">Key Findings:</div>
                          {activePaper.keyFindings.map((finding, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <FiCheckCircle className="text-[#2D6A4F] shrink-0 mt-0.5" />
                              <span>{finding}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Document Page 2 */}
                      <div className="bg-white text-slate-900 rounded-xl shadow-md p-6 border border-slate-200 relative overflow-hidden">
                        <div className="border-b border-slate-200 pb-3 mb-4 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400">Page 2 — Experimental Results</span>
                          <span className="text-[10px] font-mono text-[#2D6A4F] font-bold">Biofactor Research</span>
                        </div>

                        <h5 className="text-xs font-bold text-slate-900 mb-2 font-mono uppercase tracking-wider">Quantitative Assay Table</h5>
                        <div className="overflow-hidden border border-slate-200 rounded-lg mb-4 text-[11px] font-sans">
                          <table className="w-full text-left border-collapse">
                            <thead className="bg-[#173522] text-white font-mono">
                              <tr>
                                <th className="p-2">Parameter</th>
                                <th className="p-2">Control</th>
                                <th className="p-2 text-[#7CC242]">Biofactor</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-slate-700">
                              {activePaper.tableData.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  <td className="p-2 font-medium">{row.parameter}</td>
                                  <td className="p-2 text-slate-500">{row.control}</td>
                                  <td className="p-2 font-bold text-[#2D6A4F]">{row.biofactor}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                          <div className="text-[10px] text-slate-500 font-mono">
                            Approved Publication • Biofactor R&D
                          </div>
                          <span className="px-2 py-0.5 rounded border border-[#2D6A4F] text-[#2D6A4F] text-[10px] font-mono font-bold">
                            ✓ VERIFIED
                          </span>
                        </div>
                      </div>

                      {/* DUPLICATED PAGES FOR CONTINUOUS INFINITE SCROLL */}
                      <div className="bg-white text-slate-900 rounded-xl shadow-md p-6 border border-slate-200 relative overflow-hidden">
                        <div className="border-b border-slate-200 pb-3 mb-4 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-mono text-[#2D6A4F] font-extrabold uppercase tracking-widest">
                              {activePaper.journal}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-mono font-bold">
                            PEER-REVIEWED
                          </span>
                        </div>

                        <h4 className="text-base font-extrabold text-slate-900 leading-snug mb-2 font-display">
                          {activePaper.title}
                        </h4>

                        <div className="bg-emerald-50/70 border-l-4 border-[#2D6A4F] p-3.5 rounded-r-lg mb-4 text-xs text-slate-700 leading-relaxed font-sans">
                          <div className="font-bold text-[#173522] uppercase tracking-wider text-[10px] mb-1 font-mono">Abstract Summary</div>
                          {activePaper.description}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* Footer */}
      <BiofactorFooter />
    </div>
  );
}
