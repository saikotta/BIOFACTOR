"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { 
  FiMail, 
  FiBriefcase, 
  FiUsers, 
  FiAward, 
  FiArrowRight,
  FiX,
  FiCheckCircle,
  FiLoader,
  FiMapPin
} from 'react-icons/fi';
import { FaLeaf, FaHandsHelping, FaChartLine } from 'react-icons/fa';
import BiofactorFooter from '../components/BiofactorFooter';

const biofactor_career = '/images/biofactor_career.png';

interface JobOpening {
  id: string | number;
  title: string;
  department: string;
  job_type: string;
  experience: string;
  salary: string;
  location: string;
  description: string;
  responsibilities: string;
  skills: string[];
  status: string;
}

export default function CareersPage() {
  const [isApplying, setIsApplying] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [uploadProgress, setUploadProgress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getApiUrl = (endpoint: string) => {
    const base = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 'http://localhost:8000/api/v1';
    const cleanBase = base.replace(/\/+$/, '');
    const cleanEndpoint = endpoint.replace(/^\/+/, '');
    return `${cleanBase}/${cleanEndpoint}`;
  };

  const fetchJobs = async (isInitial = false) => {
    if (isInitial) setLoadingJobs(true);
    
    if (isInitial && typeof window !== 'undefined') {
      const cachedJobs = localStorage.getItem('biofactor_jobs_cache_v2');
      if (cachedJobs) {
        try {
          const parsed = JSON.parse(cachedJobs);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setJobOpenings(parsed);
            setLoadingJobs(false);
          } else {
            localStorage.removeItem('biofactor_jobs_cache_v2');
          }
        } catch (e) {
          localStorage.removeItem('biofactor_jobs_cache_v2');
        }
      }
    }

    try {
      const primaryUrl = getApiUrl('jobs/public');
      const candidateUrls = [
        primaryUrl,
        'http://localhost:8000/api/v1/jobs/public',
        'http://127.0.0.1:8000/api/v1/jobs/public',
        '/api/v1/jobs/public'
      ].filter((u, i, self) => self.indexOf(u) === i);

      let data: any = null;

      for (const url of candidateUrls) {
        try {
          const res = await fetch(url, { headers: { 'Accept': 'application/json' } }).catch(() => null);
          if (res && res.ok) {
            data = await res.json().catch(() => null);
            if (data) break;
          }
        } catch {
          // Ignore network errors smoothly
        }
      }

      if (data) {
        const rawJobs = Array.isArray(data) ? data : (data?.items || data?.data || []);
        const jobsArray = rawJobs.map((job: any) => {
          let cleanDesc = job.description || '';
          let parsedSkills: string[] = [];
          let parsedResponsibilities = '';
          
          const skillsMatch = cleanDesc.match(/Key Skills:\s*([\s\S]*?)(?=\s*(?:Work Mode:|Internship Period:)|$)/);
          if (skillsMatch && skillsMatch[1]) {
            const extracted = skillsMatch[1].trim();
            if (extracted) {
              parsedSkills = extracted.split(',').map((s: string) => s.trim()).filter(Boolean);
            }
          }

          const focusIndex = cleanDesc.indexOf("What You'll Do:");
          if (focusIndex !== -1) {
            let afterFocus = cleanDesc.substring(focusIndex + "What You'll Do:".length).trim();
            const nextMetaIdx = Math.min(...[
              afterFocus.indexOf("Key Skills:"),
              afterFocus.indexOf("Work Mode:"),
              afterFocus.indexOf("Internship Period:")
            ].filter(idx => idx !== -1));
            
            if (nextMetaIdx !== Infinity && nextMetaIdx !== -1) {
              parsedResponsibilities = afterFocus.substring(0, nextMetaIdx).trim();
            } else {
              parsedResponsibilities = afterFocus;
            }
            cleanDesc = cleanDesc.substring(0, focusIndex).trim();
          } else {
            const skillsIdx = cleanDesc.indexOf("Key Skills:");
            if (skillsIdx !== -1) cleanDesc = cleanDesc.substring(0, skillsIdx).trim();
            const modeIdx = cleanDesc.indexOf("Work Mode:");
            if (modeIdx !== -1) cleanDesc = cleanDesc.substring(0, modeIdx).trim();
          }

          const dedicatedSkills = job.key_skills
            ? job.key_skills.split(',').map((s: string) => s.trim()).filter(Boolean)
            : [];
          const finalSkills = dedicatedSkills.length > 0
            ? dedicatedSkills
            : parsedSkills.length > 0
              ? parsedSkills
              : (Array.isArray(job.skills) ? job.skills : []);

          return {
            id: job.id,
            title: job.title,
            department: job.department_name || job.department || 'General',
            job_type: job.type || job.job_type || 'Full Time',
            experience: job.experience || 'Not Specified',
            salary: job.ctc || job.salary || 'Not Specified',
            location: job.location || 'Not Specified',
            description: cleanDesc,
            responsibilities: job.responsibilities || parsedResponsibilities,
            skills: finalSkills,
            status: job.status || 'OPEN'
          };
        });

        const displayJobs = jobsArray.filter((job: any) => ['open', 'closed', 'filled'].includes(job.status?.toLowerCase() || 'open'));
        setJobOpenings(displayJobs);
        if (typeof window !== 'undefined') {
          localStorage.setItem('biofactor_jobs_cache_v2', JSON.stringify(displayJobs));
        }
      }
    } catch {
      // Graceful fallback
    } finally {
      if (isInitial) setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs(true);
    const pollInterval = setInterval(() => {
      fetchJobs(false);
    }, 30000);
    return () => clearInterval(pollInterval);
  }, []);

  const [applicationForm, setApplicationForm] = useState({
    full_name: '', email: '', phone: '', current_company: '', experience_years: '', linkedin_url: '', cover_letter: '', resume: null as File | null,
    course: '', course_other: '', domain: '', skills: '', languages_known: '', location: '', referred_by: ''
  });
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.message]);

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();

    if (applicationForm.resume) {
      const MAX_SIZE_MB = 5;
      const fileSizeMB = applicationForm.resume.size / (1024 * 1024);
      if (fileSizeMB > MAX_SIZE_MB) {
        setToast({
          message: `Your resume is ${fileSizeMB.toFixed(2)} MB. Please upload a file smaller than ${MAX_SIZE_MB} MB.`,
          type: "error"
        });
        return;
      }
    }

    setIsSubmitting(true);
    setUploadProgress('submitting');
    try {
      const formData = new FormData();
      if (selectedJob) {
        formData.append('job_id', String(selectedJob.id));
        formData.append('job_title', selectedJob.title);
      }
      formData.append('name', applicationForm.full_name);
      formData.append('full_name', applicationForm.full_name);
      formData.append('email', applicationForm.email);
      formData.append('phone', applicationForm.phone);
      formData.append('current_company', applicationForm.current_company);
      formData.append('experience_years', applicationForm.experience_years);
      formData.append('linkedin_url', applicationForm.linkedin_url);
      formData.append('cover_letter', applicationForm.cover_letter);
      formData.append('course', applicationForm.course === 'Other' ? applicationForm.course_other : applicationForm.course);
      formData.append('domain', applicationForm.domain);
      formData.append('skills', applicationForm.skills);
      formData.append('languages_known', applicationForm.languages_known);
      formData.append('location', applicationForm.location);
      formData.append('referred_by', applicationForm.referred_by);
      
      if (applicationForm.resume) {
        formData.append('resume', applicationForm.resume);
      }

      const url = getApiUrl('candidates/public');
      await axios.post(url, formData);
      
      setToast({ message: "Application submitted successfully! You will receive a confirmation email shortly.", type: "success" });
      setTimeout(() => {
        setIsApplying(false);
        setUploadProgress('');
        setApplicationForm({ 
          full_name: '', email: '', phone: '', current_company: '', 
          experience_years: '', linkedin_url: '', cover_letter: '', resume: null,
          course: '', course_other: '', domain: '', skills: '', languages_known: '', location: '', referred_by: ''
        });
        setToast({ message: '', type: '' });
      }, 4000);
    } catch (error: any) {
      let msg;
      if (error.code === 'ERR_NETWORK' || !error.response) {
        msg = "Network issue or VPN blocking. Please check your internet connection.";
      } else {
        const data = error.response?.data;
        msg = data?.error?.message || data?.detail || null;
        if (Array.isArray(msg)) {
          msg = msg.map((err: any) => `${err.loc?.[err.loc.length - 1] ?? 'field'}: ${err.msg}`).join(" | ");
        } else if (typeof msg !== 'string') {
          msg = "An error occurred submitting your application.";
        }
      }

      setToast({ message: msg, type: "error" });
      setTimeout(() => setToast({ message: '', type: '' }), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <FaLeaf className="text-2xl" />,
      title: "Sustainable Mission",
      description: "Make a real impact on sustainable agriculture and environmental conservation"
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Career Growth",
      description: "Clear growth paths with regular promotions and skill development programs"
    },
    {
      icon: <FiUsers className="text-2xl" />,
      title: "Collaborative Culture",
      description: "Work alongside passionate experts in agriculture and biotechnology"
    },
    {
      icon: <FaHandsHelping className="text-2xl" />,
      title: "Work-Life Balance",
      description: "Flexible hours, remote options, and generous leave policies"
    },
    {
      icon: <FiAward className="text-2xl" />,
      title: "Learning Opportunities",
      description: "Sponsored training, workshops, and global conference participation"
    },
    {
      icon: <FiBriefcase className="text-2xl" />,
      title: "Comprehensive Benefits",
      description: "Health insurance, retirement plans, bonuses, and wellness programs"
    }
  ];

  const applicationSteps = [
    {
      number: "01",
      title: "Submit Application",
      description: "Send your resume and personalized cover letter highlighting your passion for sustainable agriculture"
    },
    {
      number: "02",
      title: "Screening Call",
      description: "Initial phone conversation with our HR team to discuss mutual expectations"
    },
    {
      number: "03",
      title: "Technical Interview",
      description: "In-depth discussion with our technical team about your expertise and approach"
    },
    {
      number: "04",
      title: "Final Interview",
      description: "Meeting with leadership to discuss vision alignment and career aspirations"
    },
    {
      number: "05",
      title: "Offer & Onboarding",
      description: "Welcome package and comprehensive onboarding to integrate you smoothly"
    }
  ];

  return (
    <div className="min-h-screen bg-[#EAF3EA] text-[#173522] flex flex-col justify-between selection:bg-[#2D6A4F] selection:text-[#EAF3EA]">
      <div>
        {/* Toast Alert */}
        {toast.message && (
          <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold flex items-center gap-3 transition-all ${
            toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
          }`}>
            {toast.type === 'success' ? <FiCheckCircle className="text-xl" /> : <FiX className="text-xl" />}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Hero Section with Vibrant Background Image */}
        <section className="relative text-white py-24 lg:py-32 overflow-hidden bg-emerald-950">
          <div className="absolute inset-0 z-0">
            <img
              src={biofactor_career}
              alt="Career at Biofactor"
              className="w-full h-full object-cover brightness-95 opacity-85"
            />
            {/* Reduced dark shadow overlay for vibrant image clarity */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-emerald-950/40 to-emerald-950/70" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                <span className="text-emerald-100 font-mono text-xs font-semibold tracking-widest uppercase">We’re hiring!</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-display tracking-tight">
                Grow Your Career at
                <span className="block text-emerald-300 mt-2">Biofactor</span>
              </h1>

              <p className="text-lg lg:text-xl text-emerald-50 mb-12 max-w-3xl mx-auto leading-relaxed font-sans">
                Join us in revolutionizing sustainable agriculture through innovative biological solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <FiMail />
                  Contact HR Department
                </Link>

                <a
                  href="#openings"
                  className="inline-flex items-center justify-center gap-3 border-2 border-white/60 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-xs"
                >
                  View Open Positions
                  <FiArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section id="why-join-us" className="py-20 relative bg-[#EAF3EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-3">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">Why Choose Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173522] mb-4 tracking-tight">Why Join Biofactor?</h2>
              <p className="text-base sm:text-lg text-[#173522]/90 max-w-3xl mx-auto leading-relaxed font-sans">
                Be part of a mission-driven team that's transforming agriculture while building meaningful careers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="group bg-white/90 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#2D6A4F]/15 flex flex-col items-center text-center"
                >
                  <div className="text-[#2D6A4F] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="bg-[#EAF3EA] p-4 rounded-xl inline-flex justify-center items-center">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#173522] mb-3 group-hover:text-[#2D6A4F] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-[#173522]/80 leading-relaxed text-sm font-sans">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section id="openings" className="py-20 bg-white border-y border-[#2D6A4F]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-3">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">Join Our Team</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173522] mb-4 tracking-tight">Current Job Openings</h2>
              <p className="text-base sm:text-lg text-[#173522]/90 max-w-2xl mx-auto font-sans">
                Explore opportunities to contribute to sustainable agriculture
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {loadingJobs ? (
                <div className="lg:col-span-2 flex flex-col items-center justify-center py-20 text-[#173522]/60 gap-4">
                  <FiLoader className="animate-spin text-4xl text-[#2D6A4F]" />
                  <p className="font-mono text-xs font-bold tracking-widest uppercase">Loading open positions...</p>
                </div>
              ) : jobOpenings.length === 0 ? (
                <div className="lg:col-span-2 text-center py-20 bg-[#EAF3EA] rounded-3xl border border-dashed border-[#2D6A4F]/30 flex flex-col items-center justify-center gap-4">
                  <p className="text-[#173522]/80 font-medium italic">No open positions at the moment. Check back later!</p>
                  <button
                    onClick={() => fetchJobs(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D6A4F] hover:bg-[#173522] text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-md hover:scale-105 cursor-pointer"
                  >
                    🔄 Refresh Openings
                  </button>
                </div>
              ) : (
                jobOpenings.map((job) => (
                  <div 
                    key={job.id} 
                    className="group rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-[#2D6A4F]/20 bg-white overflow-hidden h-full flex flex-col"
                  >
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-[#173522] group-hover:text-[#2D6A4F] transition-colors mb-1">
                            {job.title}
                          </h3>
                          <p className="text-sm font-semibold text-[#2D6A4F]">{job.department}</p>
                        </div>
                        <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#EAF3EA] text-[#2D6A4F]">
                          {job.job_type}
                        </span>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-6 text-sm text-[#173522]/80 font-medium">
                          <span className="flex items-center gap-2">
                            <FiMapPin className="text-[#2D6A4F]" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <FiBriefcase className="text-[#2D6A4F]" />
                            {job.experience}
                          </span>
                        </div>
                        <div className="text-[#173522]/90 leading-relaxed text-sm font-sans">
                          {job.description}
                        </div>
                        {job.responsibilities && (
                          <div className="mt-4">
                            <h4 className="font-bold text-[#173522] text-sm mb-2">What You'll Do:</h4>
                            <div className="text-[#173522]/80 text-sm leading-relaxed whitespace-pre-line font-sans">
                              {job.responsibilities}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {job.skills && job.skills.length > 0 && (
                        <div className="mb-8">
                          <h4 className="font-bold text-[#173522] text-xs uppercase tracking-wider mb-3 font-mono">Key Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, idx) => (
                              <span 
                                key={idx} 
                                className="px-3 py-1 rounded-full text-xs font-medium bg-[#EAF3EA] text-[#173522]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-6 border-t border-[#2D6A4F]/10 mt-auto">
                        <div>
                          <span className="text-[#173522]/60 text-xs uppercase tracking-wider font-mono">Expected Salary</span>
                          <p className="font-bold text-[#2D6A4F]">
                            {job.salary && !job.salary.includes('₹') ? `₹${job.salary}` : job.salary}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setIsApplying(true);
                          }}
                          className="px-6 py-3 bg-[#2D6A4F] hover:bg-[#173522] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer text-sm"
                        >
                          Apply Now <FiArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Our Hiring Process Section (Restored & Matched to biofactorbiologicals.com) */}
        <section id="process" className="py-20 bg-[#EAF3EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-3">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">Application Process</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173522] mb-4 tracking-tight">Our Hiring Process</h2>
              <p className="text-base sm:text-lg text-[#173522]/90 max-w-2xl mx-auto font-sans">
                A transparent and engaging journey from application to onboarding
              </p>
            </div>

            <div className="relative">
              {/* Timeline connector line */}
              <div className="absolute left-0 right-0 top-10 h-1 bg-[#2D6A4F]/20 hidden lg:block"></div>
              
              <div className="grid lg:grid-cols-5 gap-8">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="text-center flex flex-col items-center">
                      <div className="relative inline-flex items-center justify-center mb-6">
                        <div className="absolute inset-0 bg-[#2D6A4F]/30 rounded-full animate-ping"></div>
                        <div className="relative bg-gradient-to-br from-[#2D6A4F] to-[#173522] text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-[#EAF3EA]">
                          {step.number}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-[#173522] mb-2">{step.title}</h3>
                      <p className="text-[#173522]/80 text-xs sm:text-sm leading-relaxed font-sans">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Modal */}
        {isApplying && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setIsApplying(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold text-[#173522] mb-2">Apply for {selectedJob.title}</h2>
              <p className="text-[#173522]/70 mb-6 text-sm">Fill in your details to submit your application.</p>

              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#173522] mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={applicationForm.full_name}
                    onChange={(e) => setApplicationForm({...applicationForm, full_name: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] outline-none text-[#173522]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#173522] mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] outline-none text-[#173522]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#173522] mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] outline-none text-[#173522]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#173522] mb-1">Current Company</label>
                    <input 
                      type="text" 
                      value={applicationForm.current_company}
                      onChange={(e) => setApplicationForm({...applicationForm, current_company: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] outline-none text-[#173522]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#173522] mb-1">Years of Experience</label>
                    <input 
                      type="text" 
                      value={applicationForm.experience_years}
                      onChange={(e) => setApplicationForm({...applicationForm, experience_years: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] outline-none text-[#173522]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#173522] mb-1">LinkedIn Profile URL</label>
                  <input 
                    type="url" 
                    value={applicationForm.linkedin_url}
                    onChange={(e) => setApplicationForm({...applicationForm, linkedin_url: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] outline-none text-[#173522]"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#173522] mb-1">Upload Resume (PDF / DOCX, max 5MB)</label>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setApplicationForm({...applicationForm, resume: e.target.files ? e.target.files[0] : null})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm text-[#173522] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#EAF3EA] file:text-[#2D6A4F] hover:file:bg-[#2D6A4F]/20 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#173522] mb-1">Cover Letter / Note</label>
                  <textarea 
                    rows={3}
                    value={applicationForm.cover_letter}
                    onChange={(e) => setApplicationForm({...applicationForm, cover_letter: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] outline-none text-[#173522] resize-none"
                    placeholder="Tell us why you are interested in this position..."
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsApplying(false)}
                    className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#173522] text-white font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin" /> Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <BiofactorFooter />
    </div>
  );
}
