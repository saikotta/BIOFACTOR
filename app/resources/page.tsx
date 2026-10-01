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
      downloads: 1890
    },
    { 
      id: 5, 
      title: "Microbial Inoculants Guide 2025", 
      category: "Agriculture", 
      type: "Technical Guide", 
      size: "2.1 MB", 
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Step-by-step implementation guide for microbial products.",
      author: "Biofactor R&D Team",
      date: "2024-03-01",
      downloads: 2567
    },
    { 
      id: 6, 
      title: "Cover Crop Selection Matrix", 
      category: "Agriculture", 
      type: "Technical Guide", 
      size: "1.8 MB", 
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Interactive guide to selecting optimal cover crops.",
      author: "Agronomy Division",
      date: "2024-02-10",
      downloads: 1789
    },
    { 
      id: 7, 
      title: "Understanding Ruminant Digestion", 
      category: "Large Animals", 
      type: "Webinar", 
      size: "12:45", 
      image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: "https://www.youtube.com/embed/sc4hC3y4fNw",
      description: "Deep dive into rumen microbiology and fermentation.",
      author: "Dr. Robert Thompson",
      date: "2024-03-10",
      downloads: 1567
    },
    { 
      id: 8, 
      title: "Methane Reduction Strategies", 
      category: "Large Animals", 
      type: "Whitepaper", 
      size: "8.4 MB", 
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Innovative approaches to reduce livestock methane emissions.",
      author: "Climate & Livestock Institute",
      date: "2024-01-20",
      downloads: 2345
    },
    { 
      id: 9, 
      title: "Dairy Nutrition Optimization", 
      category: "Large Animals", 
      type: "Whitepaper", 
      size: "6.2 MB", 
      image: "https://images.unsplash.com/photo-1570042707221-5a415ff68051?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Advanced feeding strategies for dairy cattle.",
      author: "Nutrition Research Center",
      date: "2024-02-05",
      downloads: 1890
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
      <div>
        {/* Full-Screen Hero Section — top content above laptop, search+arrow pinned to bottom */}
        <section className="relative min-h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-emerald-950 px-4">
          <div className="absolute inset-0 z-0">
             <img src={biofactor_resource} alt="Biofactor Scientific Resources" className="w-full h-full object-cover brightness-95 opacity-85" />
             {/* Gentle transparent gradient overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-emerald-950/40 to-emerald-950/80"></div>
          </div>

          {/* TOP BLOCK: Badge + Heading + Description — pushed to upper portion of hero */}
          <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center pt-6 md:pt-10">
            <div className="inline-block px-5 py-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 backdrop-blur-md mb-5">
              <span className="text-emerald-200 font-mono text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                <GiDna2 className="text-sm" /> Biofactor Intelligence Hub
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 tracking-tight font-display leading-tight">
              Scientific <span className="text-emerald-300">Resource Hub</span>
            </h1>

            {/* Description close to heading, original text restored */}
            <p className="text-emerald-100 text-sm md:text-base font-sans max-w-2xl mx-auto leading-relaxed">
              Explore our curated library of whitepapers, webinars, and technical guides designed to improve agricultural efficiency and biological soil health.
            </p>
          </div>

          {/* BOTTOM BLOCK: Search bar + Explore Catalog arrow — pushed further down below laptop */}
          <div className="relative z-10 flex flex-col items-center w-full mt-auto pb-14 md:pb-20">
            <div className="w-full max-w-2xl mx-auto relative">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-200 text-2xl" />
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

            {/* Explore Catalog arrow — directly below search bar, no gap */}
            <a href="#resource-catalog" className="inline-flex flex-col items-center gap-1 text-emerald-200 hover:text-white transition-colors cursor-pointer animate-bounce mt-3">
              <span className="font-mono text-xs uppercase tracking-widest">Explore Catalog</span>
              <FaChevronDown />
            </a>
          </div>
        </section>

        {/* Category Filters (Sticky Navigation Bar) */}
        <section id="resource-catalog" className="sticky top-[64px] md:top-[72px] z-40 bg-[#EAF3EA]/95 backdrop-blur-xl border-b border-[#2D6A4F]/15 shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
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

        {/* Main Resource Sections (Expanded Vertical Height & Spacing) */}
        <main className="max-w-7xl mx-auto px-4 py-16 space-y-16">
          {resourceTypes.map((type) => {
            const resources = groupedResources[type.id] || [];
            if (resources.length === 0) return null;
            
            const isExpanded = expandedSections[type.id] !== undefined ? expandedSections[type.id] : true;
            
            return (
              <div key={type.id} className="space-y-8">
                <div 
                  className="flex items-center justify-between p-6 md:p-8 bg-white rounded-3xl border border-[#2D6A4F]/15 shadow-sm cursor-pointer hover:shadow-md transition-all group"
                  onClick={() => toggleSection(type.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-[#EAF3EA] text-[#2D6A4F] text-xl">
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
                    {resources.map((item) => (
                      <div 
                        key={item.id} 
                        className="group bg-white rounded-3xl border border-[#2D6A4F]/15 hover:border-[#2D6A4F]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
                      >
                        {/* High-Definition Image Container */}
                        <div className="relative h-60 overflow-hidden bg-emerald-950">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-xs font-bold text-[#2D6A4F] shadow-sm">
                              {item.category}
                            </span>
                            <span className="px-3.5 py-1.5 bg-[#2D6A4F] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                              {item.type}
                            </span>
                          </div>

                          {item.type === 'Webinar' && (
                            <button 
                              onClick={() => setSelectedVideo(item.videoUrl)}
                              className="absolute inset-0 flex items-center justify-center group/play cursor-pointer"
                            >
                              <div className="w-16 h-16 bg-[#2D6A4F] hover:bg-[#173522] rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover/play:scale-110 transition-all duration-300">
                                <FiPlay className="ml-1 text-2xl" />
                              </div>
                            </button>
                          )}
                        </div>

                        <div className="p-7 flex flex-col flex-grow">
                          <h3 className="text-xl font-extrabold text-[#173522] mb-3 line-clamp-2 group-hover:text-[#2D6A4F] transition-colors leading-snug">
                            {item.title}
                          </h3>
                          
                          <p className="text-[#173522]/85 text-sm mb-6 line-clamp-3 flex-grow font-sans leading-relaxed">
                            {item.description}
                          </p>

                          <div className="space-y-3 mb-6 pt-4 border-t border-[#2D6A4F]/10">
                            <div className="flex items-center gap-2 text-sm text-[#173522]/80">
                              <FiBookOpen className="text-[#2D6A4F]" />
                              <span className="font-semibold">{item.author}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-mono text-[#173522]/60">
                              <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              <span>{item.downloads.toLocaleString()} downloads</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-[#2D6A4F]/10 mt-auto">
                            {item.type === 'Webinar' ? (
                              <button 
                                onClick={() => setSelectedVideo(item.videoUrl)}
                                className="flex items-center gap-2 text-[#2D6A4F] hover:text-[#173522] font-bold text-sm transition-colors cursor-pointer"
                              >
                                Watch Now <FiArrowRight />
                              </button>
                            ) : (
                              <button className="flex items-center gap-2 text-[#173522] hover:text-[#2D6A4F] font-bold text-sm transition-colors cursor-pointer">
                                Read More <FiArrowRight />
                              </button>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-[#173522]/50 hover:text-[#2D6A4F] transition-colors cursor-pointer">
                                <FiShare2 size={18} />
                              </button>
                              {item.type !== 'Webinar' && (
                                <button className="p-2 text-[#173522]/50 hover:text-[#2D6A4F] transition-colors cursor-pointer">
                                  <FiDownload size={18} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

      <BiofactorFooter />
    </div>
  );
}
