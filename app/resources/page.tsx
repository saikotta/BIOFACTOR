"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  FiDownload, FiVideo, FiSearch, 
  FiFilter, FiArrowRight, FiX, FiPlay, FiShare2,
  FiBookOpen, FiBarChart2, FiTrendingUp
} from 'react-icons/fi';
import { 
  FaMicroscope, FaChevronDown
} from 'react-icons/fa';
import { GiCow, GiWheat, GiWaterDrop, GiChicken, GiDna2 } from 'react-icons/gi';
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
  videoUrl: string | null;
  description: string;
  author: string;
  date: string;
  downloads: number;
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleSection = (sectionType: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionType]: !prev[sectionType]
    }));
  };

  const resourceData: ResourceItem[] = [
    { 
      id: 1, 
      title: "The Future of Regenerative Agriculture", 
      category: "Agriculture", 
      type: "Webinar", 
      size: "15:20", 
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: "https://www.youtube.com/embed/QfSJ04d9p20",
      description: "Explore the latest advancements in regenerative farming practices that restore soil health.",
      author: "Dr. Sarah Chen",
      date: "2024-03-15",
      downloads: 1245
    },
    { 
      id: 2, 
      title: "Precision Agriculture Technologies", 
      category: "Agriculture", 
      type: "Webinar", 
      size: "22:40", 
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "How IoT and AI are revolutionizing farm management and crop monitoring.",
      author: "Prof. James Wilson",
      date: "2024-02-28",
      downloads: 987
    },
    { 
      id: 3, 
      title: "Soil Carbon Sequestration Protocol", 
      category: "Agriculture", 
      type: "Whitepaper", 
      size: "4.2 MB", 
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Comprehensive guide to implementing carbon farming practices.",
      author: "Carbon Research Institute",
      date: "2024-01-10",
      downloads: 3210
    },
    { 
      id: 4, 
      title: "Biofertilizers: Science & Application", 
      category: "Agriculture", 
      type: "Whitepaper", 
      size: "5.8 MB", 
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Detailed analysis of microbial inoculants and their benefits.",
      author: "Dr. Maria Rodriguez",
      date: "2024-02-15",
      downloads: 2180
    },
    { 
      id: 5, 
      title: "Crop Microbiome Management", 
      category: "Agriculture", 
      type: "Research Paper", 
      size: "3.1 MB", 
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Peer-reviewed study on rhizosphere microbiome interactions.",
      author: "Journal of Agricultural Science",
      date: "2024-01-20",
      downloads: 4567
    },
    { 
      id: 6, 
      title: "Cover Cropping Best Practices", 
      category: "Agriculture", 
      type: "Technical Guide", 
      size: "2.4 MB", 
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Step-by-step implementation guide for cover cropping systems.",
      author: "Sustainable Ag Extension",
      date: "2024-02-01",
      downloads: 1876
    },
    { 
      id: 7, 
      title: "Bovine Gut Microbiome Insights", 
      category: "Large Animals", 
      type: "Research Paper", 
      size: "4.8 MB", 
      image: "https://images.unsplash.com/photo-1545468000-6e3a8f8d7b9c?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Comprehensive analysis of cattle digestive microflora.",
      author: "Veterinary Science Review",
      date: "2024-01-08",
      downloads: 2345
    },
    { 
      id: 8, 
      title: "Ruminant Nutrition Optimization", 
      category: "Large Animals", 
      type: "Webinar", 
      size: "35:15", 
      image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: "https://www.youtube.com/embed/3X8a2g7x8c8",
      description: "Modern approaches to maximizing feed efficiency in large ruminants.",
      author: "Dr. Michael Torres",
      date: "2024-02-22",
      downloads: 1654
    },
    { 
      id: 9, 
      title: "Antibiotic Resistance in Livestock", 
      category: "Large Animals", 
      type: "Case Study", 
      size: "2.2 MB", 
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Field study on AMR mitigation through probiotic intervention.",
      author: "One Health Initiative",
      date: "2024-03-01",
      downloads: 3102
    },
    { 
      id: 10, 
      title: "Introduction to Biofloc Systems", 
      category: "Aquaculture", 
      type: "Webinar", 
      size: "45:00", 
      image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: "https://www.youtube.com/embed/2zX7L9y6X8c",
      description: "Fundamentals of biofloc technology for sustainable aquaculture.",
      author: "Dr. Wei Zhang",
      date: "2024-03-05",
      downloads: 1345
    },
    { 
      id: 11, 
      title: "Water Quality Management in RAS", 
      category: "Aquaculture", 
      type: "Research Paper", 
      size: "5.1 MB", 
      image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Peer-reviewed research on recirculating aquaculture systems.",
      author: "Aquatic Sciences Journal",
      date: "2024-01-15",
      downloads: 2789
    },
    { 
      id: 12, 
      title: "Sustainable Fish Feed Formulation", 
      category: "Aquaculture", 
      type: "Research Paper", 
      size: "2.8 MB", 
      image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Alternative protein sources for aquaculture feeds.",
      author: "Marine Nutrition Lab",
      date: "2024-02-20",
      downloads: 1567
    },
    { 
      id: 13, 
      title: "Poultry Gut Health Fundamentals", 
      category: "Poultry", 
      type: "Webinar", 
      size: "28:10", 
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: "https://www.youtube.com/embed/7X8a2g7x8c8",
      description: "Comprehensive guide to poultry digestive health.",
      author: "Dr. Lisa Park",
      date: "2024-03-08",
      downloads: 1987
    },
    { 
      id: 14, 
      title: "Broiler Microbiome Optimization", 
      category: "Poultry", 
      type: "Whitepaper", 
      size: "6.7 MB", 
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Strategies for enhancing broiler gut microbiota.",
      author: "Poultry Health Institute",
      date: "2024-01-25",
      downloads: 2100
    },
    { 
      id: 15, 
      title: "Heat Stress Management - Case Study", 
      category: "Poultry", 
      type: "Case Study", 
      size: "1.9 MB", 
      image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Real-world implementation of cooling technologies.",
      author: "Farm Solutions Inc.",
      date: "2024-02-12",
      downloads: 1456
    }
  ];

  const categories = [
    { id: 'All', name: 'All Resources', icon: <FiFilter />, count: resourceData.length },
    { id: 'Agriculture', name: 'Agriculture', icon: <GiWheat />, count: resourceData.filter(r => r.category === 'Agriculture').length },
    { id: 'Large Animals', name: 'Large Animals', icon: <GiCow />, count: resourceData.filter(r => r.category === 'Large Animals').length },
    { id: 'Aquaculture', name: 'Aquaculture', icon: <GiWaterDrop />, count: resourceData.filter(r => r.category === 'Aquaculture').length },
    { id: 'Poultry', name: 'Poultry', icon: <GiChicken />, count: resourceData.filter(r => r.category === 'Poultry').length },
  ];

  const resourceTypes = [
    { id: 'Webinar', name: 'Webinars', icon: <FiVideo />, color: 'emerald' },
    { id: 'Whitepaper', name: 'Whitepapers', icon: <FiBookOpen />, color: 'blue' },
    { id: 'Research Paper', name: 'Research Papers', icon: <MdScience />, color: 'purple' },
    { id: 'Technical Guide', name: 'Technical Guides', icon: <FiBarChart2 />, color: 'amber' },
    { id: 'Case Study', name: 'Case Studies', icon: <FiTrendingUp />, color: 'rose' },
  ];

  const filteredResources = useMemo(() => {
    return resourceData.filter(item => {
      const matchesTab = activeTab === 'All' || item.category === activeTab;
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const groupedResources = useMemo(() => {
    const groups: Record<string, ResourceItem[]> = {};
    resourceTypes.forEach(type => {
      groups[type.id] = filteredResources.filter(item => item.type === type.id);
    });
    return groups;
  }, [filteredResources]);

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

            {/* Title — plain, no animation */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 tracking-tight font-display leading-tight">
              Scientific <span style={{ color: "#7CC242" }}>Resource Hub</span>
            </h1>

            {/* Subtitle */}
            <p
              data-hero-sub
              className="text-emerald-100 text-sm md:text-base font-sans max-w-2xl mx-auto leading-relaxed"
            >
              Explore our curated library of whitepapers, webinars, and technical guides designed to improve agricultural efficiency and biological soil health.
            </p>
          </div>

          {/* BOTTOM BLOCK */}
          <div className="relative z-10 flex flex-col items-center w-full mt-auto pb-14 md:pb-20">

            {/* Search bar wrapper — data-hero-search */}
            <div data-hero-search className="w-full max-w-2xl mx-auto relative">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-200 text-2xl pointer-events-none" />
              <input
                type="text"
                placeholder="Search whitepapers, webinars, research papers..."
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

            {/* Explore catalog cue — data-hero-cue, chevron gets rh-chevron class */}
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

        {/* ── FILTER CHIPS ─────────────────────────────────────── */}
        <section id="resource-catalog" className="sticky top-[64px] md:top-[72px] z-40 bg-[#EAF3EA]/95 backdrop-blur-xl border-b border-[#2D6A4F]/15 shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    data-chip
                    onClick={() => setActiveTab(cat.id)}
                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer ${
                      activeTab === cat.id 
                      ? 'bg-[#2D6A4F] text-white shadow-md transform scale-105' 
                      : 'bg-white text-[#173522] hover:bg-[#2D6A4F]/10 hover:text-[#2D6A4F] border border-[#2D6A4F]/15'
                    }`}
                  >
                    {cat.icon} 
                    <span>{cat.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                      activeTab === cat.id 
                      ? 'bg-white/30 text-white' 
                      : 'bg-[#EAF3EA] text-[#173522]'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-[#2D6A4F] font-bold uppercase tracking-wider">
                {filteredResources.length} resources found
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN RESOURCE SECTIONS ───────────────────────────── */}
        <main className="max-w-7xl mx-auto px-4 py-16 space-y-16">
          {resourceTypes.map((type) => {
            const resources = groupedResources[type.id] || [];
            if (resources.length === 0) return null;
            
            const isExpanded = expandedSections[type.id] !== undefined
              ? expandedSections[type.id]
              : true;
            
            return (
              <div key={type.id} className="space-y-8">

                {/* Section header — data-section-head, icon gets data-section-icon */}
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
                      <p className="text-[#173522]/70 text-sm font-sans mt-0.5">{resources.length} high-impact resources available</p>
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
                    {resources.map((item, cardIndex) => {
                      /* stagger index resets per section: 0,1,2,0,1,2,… */
                      const staggerIndex = cardIndex % 3;

                      return (
                        <div 
                          key={item.id}
                          data-card
                          data-stagger-index={staggerIndex}
                          className="group bg-white rounded-3xl border border-[#2D6A4F]/15 hover:border-[#2D6A4F]/40 shadow-sm overflow-hidden flex flex-col h-full"
                        >
                          {/* Image container */}
                          <div data-card-img className="relative h-60 overflow-hidden bg-emerald-950">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            
                            {/* Tags */}
                            <div className="absolute top-4 left-4 flex gap-2">
                              <span
                                data-tag
                                className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-xs font-bold text-[#2D6A4F] shadow-sm"
                              >
                                {item.category}
                              </span>
                              <span
                                data-tag
                                className="px-3.5 py-1.5 bg-[#2D6A4F] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-sm"
                              >
                                {item.type}
                              </span>
                            </div>

                            {/* Play button (Webinar only) */}
                            {item.type === 'Webinar' && (
                              <button 
                                onClick={() => setSelectedVideo(item.videoUrl)}
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                              >
                                <div
                                  data-play
                                  className="w-16 h-16 bg-[#2D6A4F] hover:bg-[#173522] rounded-full flex items-center justify-center text-white shadow-2xl transition-colors duration-300"
                                >
                                  <FiPlay className="ml-1 text-2xl" />
                                </div>
                              </button>
                            )}
                          </div>

                          {/* Text body */}
                          <div data-body className="p-7 flex flex-col flex-grow">
                            {/* child 1 — title */}
                            <h3 className="text-xl font-extrabold text-[#173522] mb-3 line-clamp-2 group-hover:text-[#2D6A4F] transition-colors leading-snug">
                              {item.title}
                            </h3>
                            
                            {/* child 2 — description */}
                            <p className="text-[#173522]/85 text-sm mb-6 line-clamp-3 flex-grow font-sans leading-relaxed">
                              {item.description}
                            </p>

                            {/* child 3 — author + downloads meta */}
                            <div className="space-y-3 mb-6 pt-4 border-t border-[#2D6A4F]/10">
                              <div className="flex items-center gap-2 text-sm text-[#173522]/80">
                                <FiBookOpen className="text-[#2D6A4F]" />
                                <span className="font-semibold">{item.author}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs font-mono text-[#173522]/60">
                                <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                {/* data-count holds the live counter element */}
                                <span
                                  data-count
                                  data-count-target={item.downloads}
                                >
                                  {item.downloads.toLocaleString()} downloads
                                </span>
                              </div>
                            </div>

                            {/* child 4 — CTA row */}
                            <div className="flex items-center justify-between pt-4 border-t border-[#2D6A4F]/10 mt-auto">
                              {item.type === 'Webinar' ? (
                                <button 
                                  data-cta
                                  onClick={() => setSelectedVideo(item.videoUrl)}
                                  className="flex items-center gap-2 text-[#2D6A4F] hover:text-[#173522] font-bold text-sm cursor-pointer"
                                >
                                  Watch Now <span className="rh-arrow"><FiArrowRight /></span>
                                </button>
                              ) : (
                                <button
                                  data-cta
                                  className="flex items-center gap-2 text-[#173522] hover:text-[#2D6A4F] font-bold text-sm cursor-pointer"
                                >
                                  Read More <span className="rh-arrow"><FiArrowRight /></span>
                                </button>
                              )}
                              
                              <div className="flex items-center gap-2">
                                <button
                                  data-icon-btn
                                  className="p-2 text-[#173522]/50 hover:text-[#2D6A4F] cursor-pointer"
                                >
                                  <FiShare2 size={18} />
                                </button>
                                {item.type !== 'Webinar' && (
                                  <button
                                    data-icon-btn
                                    className="p-2 text-[#173522]/50 hover:text-[#2D6A4F] cursor-pointer"
                                  >
                                    <FiDownload size={18} />
                                  </button>
                                )}
                              </div>
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
              <h3 className="text-2xl font-bold text-[#173522] mb-3">No resources found</h3>
              <p className="text-[#173522]/70 max-w-md mx-auto mb-8 font-sans">
                Try adjusting your search terms or browse a different category.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
                className="px-6 py-3 bg-[#2D6A4F] hover:bg-[#173522] text-white rounded-full font-bold transition-colors cursor-pointer text-sm"
              >
                View All Resources
              </button>
            </div>
          )}
        </main>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 flex justify-between items-start z-10">
                <div>
                  <h3 className="text-white text-lg font-bold">Now Playing</h3>
                </div>
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 bg-black/50 hover:bg-white hover:text-black text-white rounded-full transition-all cursor-pointer"
                >
                  <FiX size={24} />
                </button>
              </div>
              <iframe 
                src={`${selectedVideo}?autoplay=1&rel=0`} 
                title="Video Player"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer — links get data-footer-link for hover animation */}
      <BiofactorFooter />
    </div>
  );
}
