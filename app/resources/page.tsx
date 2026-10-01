"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  FiDownload, FiVideo, FiSearch, 
  FiFilter, FiArrowRight, FiX, FiPlay, FiShare2,
  FiBookOpen, FiBarChart2, FiTrendingUp
} from 'react-icons/fi';
import { 
  FaLeaf, FaFish, FaEgg, FaMicroscope, FaCertificate, 
  FaGlobeAmericas, FaUniversity, FaIndustry
} from 'react-icons/fa';
import { GiCow, GiWheat, GiWaterDrop, GiChicken, GiDna2, GiPlantRoots } from 'react-icons/gi';
import { MdScience, MdAgriculture, MdWaterDrop } from 'react-icons/md';
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
      image: "https://images.unsplash.com/photo-1574943322596-3d4c18025950?auto=format&fit=crop&q=80&w=1000", 
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
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129fc?auto=format&fit=crop&q=80&w=1000", 
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
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=1000", 
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
      image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=1000", 
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
      image: "https://images.unsplash.com/photo-1534324403061-08197771746f?auto=format&fit=crop&q=80&w=1000", 
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
      image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=1000", 
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
      image: "https://images.unsplash.com/photo-1511211756783-653133887d26?auto=format&fit=crop&q=80&w=1000", 
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
    },
    { 
      id: 16, 
      title: "Genomics in Crop Improvement", 
      category: "Agriculture", 
      type: "Research Paper", 
      size: "3.4 MB", 
      image: "https://images.unsplash.com/photo-1530026405189-8be2d47d2a68?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Latest advancements in agricultural genomics.",
      author: "Genetics Research Center",
      date: "2024-03-03",
      downloads: 1890
    },
    { 
      id: 17, 
      title: "Aquaponics Integration Systems", 
      category: "Aquaculture", 
      type: "Research Paper", 
      size: "4.5 MB", 
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Combining fish farming with hydroponics.",
      author: "Sustainable Systems Lab",
      date: "2024-02-18",
      downloads: 1678
    },
    { 
      id: 18, 
      title: "Regenerative Farm Transformation", 
      category: "Agriculture", 
      type: "Case Study", 
      size: "2.3 MB", 
      image: "https://images.unsplash.com/photo-1591382386627-349b692688ff?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "5-year case study of farm regeneration.",
      author: "Regeneration Network",
      date: "2024-01-30",
      downloads: 2345
    },
    { 
      id: 19, 
      title: "Dairy Farm Efficiency Analysis", 
      category: "Large Animals", 
      type: "Case Study", 
      size: "3.1 MB", 
      image: "https://images.unsplash.com/photo-1527151977613-a0b9e10c6c6a?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Implementing precision feeding technology.",
      author: "Dairy Innovation Center",
      date: "2024-02-22",
      downloads: 1789
    },
    { 
      id: 20, 
      title: "Organic Certification Process", 
      category: "Agriculture", 
      type: "Technical Guide", 
      size: "2.6 MB", 
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1000", 
      videoUrl: null,
      description: "Complete guide to organic certification.",
      author: "Organic Standards Board",
      date: "2024-03-12",
      downloads: 2100
    },
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

  const getTypeColor = (type: string) => {
    const typeObj = resourceTypes.find(t => t.id === type);
    return typeObj ? typeObj.color : 'gray';
  };

  return (
    <div className={`min-h-screen bg-[#FDFDFD] flex flex-col justify-between transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div>
        {/* Header Hero Section */}
        <section className="relative h-[60vh] flex flex-col justify-center items-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0 opacity-40">
             <img src={biofactor_resource} alt="Background" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-6">
              <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <GiDna2 /> Biofactor Intelligence
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Scientific <span className="text-emerald-400">Resource Hub</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Explore our curated library of whitepapers, webinars, and technical guides designed to improve agricultural efficiency.
            </p>

            <div className="mt-8 relative max-w-xl mx-auto">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:bg-white/20 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="sticky top-[64px] md:top-[72px] z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                      activeTab === cat.id 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 transform scale-105' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-emerald-600'
                    }`}
                  >
                    {cat.icon} 
                    <span>{cat.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === cat.id 
                      ? 'bg-white/30' 
                      : 'bg-slate-200 group-hover:bg-emerald-50'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                {filteredResources.length} resources found
              </div>
            </div>
          </div>
        </section>

        {/* Main Resource Sections */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          {resourceTypes.map((type) => {
            const resources = groupedResources[type.id] || [];
            if (resources.length === 0) return null;
            
            const isExpanded = expandedSections[type.id] !== undefined ? expandedSections[type.id] : true;
            
            return (
              <div key={type.id} className="mb-12">
                <div 
                  className="flex items-center justify-between p-6 bg-white rounded-xl border border-slate-100 shadow-sm mb-6 cursor-pointer hover:shadow-md transition-shadow group"
                  onClick={() => toggleSection(type.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{type.name}</h3>
                      <p className="text-slate-500 text-sm">{resources.length} resources available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((item) => (
                      <div 
                        key={item.id} 
                        className="group bg-white rounded-xl border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-xs font-bold text-emerald-700">
                              {item.category}
                            </span>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                              {item.type}
                            </span>
                          </div>

                          {item.type === 'Webinar' && (
                            <button 
                              onClick={() => setSelectedVideo(item.videoUrl)}
                              className="absolute inset-0 flex items-center justify-center group/play"
                            >
                              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover/play:scale-110 transition-transform duration-300">
                                <FiPlay className="ml-1 text-2xl" />
                              </div>
                            </button>
                          )}
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </h3>
                          
                          <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
                            {item.description}
                          </p>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <FiBookOpen className="text-slate-400" />
                              <span className="font-medium">{item.author}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              <span>{item.downloads.toLocaleString()} downloads</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                            {item.type === 'Webinar' ? (
                              <button 
                                onClick={() => setSelectedVideo(item.videoUrl)}
                                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm transition-colors cursor-pointer"
                              >
                                Watch Now <FiArrowRight />
                              </button>
                            ) : (
                              <button className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 font-bold text-sm transition-colors cursor-pointer">
                                Read More <FiArrowRight />
                              </button>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer">
                                <FiShare2 size={16} />
                              </button>
                              {item.type !== 'Webinar' && (
                                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer">
                                  <FiDownload size={16} />
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
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 mb-6">
                <FaMicroscope className="text-4xl text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No resources found</h3>
              <p className="text-slate-600 max-w-md mx-auto mb-8">
                Try adjusting your search terms or browse a different category.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-colors cursor-pointer"
              >
                View All Resources
              </button>
            </div>
          )}
        </main>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 flex justify-between items-start z-10">
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
