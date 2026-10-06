"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  FiSearch, FiArrowRight, FiX, FiBookOpen
} from 'react-icons/fi';
import { 
  FaMicroscope, FaChevronDown
} from 'react-icons/fa';
import { GiDna2 } from 'react-icons/gi';
import { MdScience } from 'react-icons/md';
import BiofactorFooter from '../components/BiofactorFooter';
import ResourcesAnimations from '../components/ResourcesAnimations';
import './resources-animations.css';

const biofactor_resource = '/images/biofactor_resources.png';

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
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Research Paper': true
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleSection = (sectionType: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionType]: !prev[sectionType]
    }));
  };

  // 4 Published Research Papers with real PDFs from downloads
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
      author: "Journal of Agricultural Science",
      date: "2024-01-20",
      downloads: 4567
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
      author: "Biotechnology & Agronomy Review",
      date: "2024-02-14",
      downloads: 3210
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
      author: "Nanobiotechnology & Plant Science",
      date: "2024-02-28",
      downloads: 2890
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
      author: "International Journal of Environmental Studies",
      date: "2024-03-05",
      downloads: 3789
    }
  ];

  const resourceTypes = [
    { id: 'Research Paper', name: 'Research Papers', icon: <MdScience />, color: 'purple' },
  ];

  const filteredResources = useMemo(() => {
    return researchPapers.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const handleOpenPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`min-h-screen bg-[#EAF3EA] text-[#173522] flex flex-col justify-between selection:bg-[#2D6A4F] selection:text-[#EAF3EA] transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* Animation engine — renders scroll bar + wires all observers */}
      <ResourcesAnimations />

      <div>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-emerald-950 px-4">

          {/* Background image — data-hero-bg for zoom-out */}
          <div className="absolute inset-0 z-0" data-hero-bg>
            <img
              src={biofactor_resource}
              alt="Biofactor Scientific Resources"
              className="w-full h-full object-cover brightness-95 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-emerald-950/40 to-emerald-950/80" />
          </div>

          {/* TOP BLOCK */}
          <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center pt-6 md:pt-10">
            <div className="inline-block px-5 py-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 backdrop-blur-md mb-5">
              <span className="text-emerald-200 font-mono text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                <GiDna2 className="text-sm" /> Biofactor Intelligence Hub
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 tracking-tight font-display leading-tight">
              Scientific <span style={{ color: "#7CC242" }}>Resource Hub</span>
            </h1>

            {/* Subtitle */}
            <p
              data-hero-sub
              className="text-emerald-100 text-sm md:text-base font-sans max-w-2xl mx-auto leading-relaxed"
            >
              Explore our curated library of peer-reviewed research papers and scientific studies demonstrating microbial bio-stimulant performance and environmental impact.
            </p>
          </div>

          {/* BOTTOM BLOCK */}
          <div className="relative z-10 flex flex-col items-center w-full mt-auto pb-14 md:pb-20">

            {/* Search bar wrapper — data-hero-search */}
            <div data-hero-search className="w-full max-w-2xl mx-auto relative">
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

            {/* Explore catalog cue — data-hero-cue */}
            <a
              href="#resource-catalog"
              data-hero-cue
              className="inline-flex flex-col items-center gap-1 text-emerald-200 hover:text-white transition-colors cursor-pointer mt-3"
            >
              <span className="font-mono text-xs uppercase tracking-widest">Explore Catalog</span>
              <span className="rh-chevron">
                <FaChevronDown />
              </span>
            </a>
          </div>
        </section>

        {/* ── MAIN RESOURCE SECTIONS ───────────────────────────── */}
        <main id="resource-catalog" className="max-w-7xl mx-auto px-4 py-16 space-y-16">
          {resourceTypes.map((type) => {
            const isExpanded = expandedSections[type.id] !== undefined
              ? expandedSections[type.id]
              : true;
            
            return (
              <div key={type.id} className="space-y-8">

                {/* Section header — data-section-head */}
                <div 
                  data-section-head
                  className="flex items-center justify-between p-6 md:p-8 bg-white rounded-3xl border border-[#2D6A4F]/15 shadow-sm cursor-pointer hover:shadow-md transition-shadow group"
                  onClick={() => toggleSection(type.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      data-section-icon
                      className="p-4 rounded-2xl bg-[#EAF3EA] text-[#2D6A4F] text-xl"
                    >
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-[#173522] font-display">{type.name}</h3>
                      <p className="text-[#173522]/70 text-sm font-sans mt-0.5">{filteredResources.length} high-impact resources available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <FaChevronDown className="text-[#2D6A4F] text-lg" />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map((item, cardIndex) => {
                      const staggerIndex = cardIndex % 3;

                      return (
                        <div 
                          key={item.id}
                          data-card
                          data-stagger-index={staggerIndex}
                          onClick={() => handleOpenPdf(item.pdfUrl)}
                          className="group bg-white rounded-3xl border border-[#2D6A4F]/15 hover:border-[#2D6A4F]/50 shadow-sm overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-300 hover:shadow-xl"
                        >
                          {/* Blank Dark Emerald image container (per user request & SS 3) */}
                          <div data-card-img className="relative h-60 overflow-hidden bg-gradient-to-br from-[#071C10] via-[#0D2818] to-[#123820] flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-[#7CC242]/10 blur-xl absolute" />
                            <MdScience className="text-white/20 text-6xl relative z-10 group-hover:scale-110 group-hover:text-white/30 transition-all duration-300" />
                            
                            {/* Research Paper Tag (No category tag like Large Animals) */}
                            <div className="absolute top-4 right-4">
                              <span
                                data-tag
                                className="px-3.5 py-1.5 bg-[#2D6A4F] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-sm"
                              >
                                {item.type}
                              </span>
                            </div>
                          </div>

                          {/* Text body */}
                          <div data-body className="p-7 flex flex-col flex-grow">
                            {/* Title */}
                            <h3 className="text-xl font-extrabold text-[#173522] mb-3 line-clamp-2 group-hover:text-[#2D6A4F] transition-colors leading-snug">
                              {item.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-[#173522]/85 text-sm mb-6 line-clamp-3 flex-grow font-sans leading-relaxed">
                              {item.description}
                            </p>

                            {/* Author + Date + Downloads meta */}
                            <div className="space-y-3 mb-6 pt-4 border-t border-[#2D6A4F]/10">
                              <div className="flex items-center gap-2 text-sm text-[#173522]/80">
                                <FiBookOpen className="text-[#2D6A4F]" />
                                <span className="font-semibold">{item.author}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs font-mono text-[#173522]/60">
                                <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                <span
                                  data-count
                                  data-count-target={item.downloads}
                                >
                                  {item.downloads.toLocaleString()} downloads
                                </span>
                              </div>
                            </div>

                            {/* CTA row — Only Read More, NO Share or Download icons */}
                            <div className="flex items-center justify-between pt-4 border-t border-[#2D6A4F]/10 mt-auto">
                              <span
                                data-cta
                                className="flex items-center gap-2 text-[#173522] group-hover:text-[#2D6A4F] font-bold text-sm cursor-pointer transition-colors"
                              >
                                Read More <span className="rh-arrow"><FiArrowRight /></span>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {filteredResources.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-[#2D6A4F]/15">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#EAF3EA] mb-6">
                <FaMicroscope className="text-4xl text-[#2D6A4F]" />
              </div>
              <h3 className="text-2xl font-bold text-[#173522] mb-3">No research papers found</h3>
              <p className="text-[#173522]/70 max-w-md mx-auto mb-8 font-sans">
                Try adjusting your search terms.
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-[#2D6A4F] hover:bg-[#173522] text-white rounded-full font-bold transition-colors cursor-pointer text-sm"
              >
                View All Research Papers
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <BiofactorFooter />
    </div>
  );
}
