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
  FiMapPin,
  FiUpload
} from 'react-icons/fi';
import { FaLeaf, FaHandsHelping, FaChartLine } from 'react-icons/fa';
import { motion, type Variants } from 'framer-motion';
import BiofactorFooter from '../components/BiofactorFooter';
import { useTranslation } from '../i18n';

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.7, 0.2, 1] } }
};

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

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
  is_demo?: boolean;
}

const DEMO_JOBS: JobOpening[] = [
  {
    id: "demo-1",
    title: "Research Associate — Microbiology",
    department: "Research & Development",
    job_type: "Full Time",
    experience: "1–3 Years",
    salary: "",
    location: "Hyderabad, Telangana",
    description: "Support microbial research, laboratory studies and biological product development.",
    responsibilities: "Conduct strain isolation, culture maintenance, and laboratory assays under supervisor guidance.",
    skills: ["Microbiology", "Aseptic Technique", "Lab Assays"],
    status: "OPEN",
    is_demo: true,
  },
  {
    id: "demo-2",
    title: "Field Agronomist",
    department: "Agronomy & Field Operations",
    job_type: "Full Time",
    experience: "2–4 Years",
    salary: "",
    location: "Hyderabad, Telangana",
    description: "Work with field teams to support product trials, crop programs and farmer engagement.",
    responsibilities: "Design field trial plots, monitor crop performance metrics, and deliver agronomic support.",
    skills: ["Crop Protection", "Field Trials", "Farmer Advisory"],
    status: "OPEN",
    is_demo: true,
  },
  {
    id: "demo-3",
    title: "Quality Control Executive",
    department: "Quality Assurance",
    job_type: "Full Time",
    experience: "1–3 Years",
    salary: "",
    location: "Hyderabad, Telangana",
    description: "Support quality testing, documentation and consistency across biological product workflows.",
    responsibilities: "Perform batch sample testing, maintain QA records, and ensure regulatory compliance.",
    skills: ["Quality Control", "QA Documentation", "Batch Analysis"],
    status: "OPEN",
    is_demo: true,
  },
];

const getMinExperience = (expStr?: string) => {
  if (!expStr) return 0;
  const match = expStr.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

export default function CareersPage() {
  const { t, language } = useTranslation();
  const [isApplying, setIsApplying] = useState(false);
  const [isHrModalOpen, setIsHrModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(DEMO_JOBS);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayJobs = jobOpenings.length > 0 ? jobOpenings : DEMO_JOBS;
  const jobText = (job: JobOpening, field: string, fallback: string) =>
    job.is_demo ? t(`careers_${job.id}_${field}`, fallback) : fallback;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsHrModalOpen(false);
        setIsApplying(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        if (displayJobs.length > 0) {
          setJobOpenings(displayJobs);
          if (typeof window !== 'undefined') {
            localStorage.setItem('biofactor_jobs_cache_v2', JSON.stringify(displayJobs));
          }
        } else {
          setJobOpenings(DEMO_JOBS);
        }
      } else {
        setJobOpenings((prev) => (prev.length > 0 && !prev[0].is_demo ? prev : DEMO_JOBS));
      }
    } catch {
      setJobOpenings((prev) => (prev.length > 0 && !prev[0].is_demo ? prev : DEMO_JOBS));
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

  const [emailVerified, setEmailVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

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

    const handleSendOtp = async () => {
    if (!applicationForm.email) {
      setToast({ message: t("careers_enter_email_first", "Please enter your email first."), type: "error" });
      return;
    }
    setIsSendingOtp(true);
    try {
      await axios.post(getApiUrl('applications/send-otp'), { email: applicationForm.email });
      setToast({ message: t("careers_otp_sent", "OTP sent to your email!"), type: "success" });
      setShowOtpInput(true);
    } catch (error: any) {
      let msg = error.response?.data?.detail;
      if (Array.isArray(msg)) {
        msg = msg.map((err: any) => err.msg || JSON.stringify(err)).join(", ");
      } else if (typeof msg === 'object') {
        msg = JSON.stringify(msg);
      }
      setToast({ message: msg || t("careers_otp_failed", "Failed to send OTP. Please check your internet connection."), type: "error" });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    setIsVerifyingOtp(true);
    try {
      await axios.post(getApiUrl('applications/verify-otp'), { email: applicationForm.email, otp });
      setToast({ message: t("careers_email_verified", "Email verified successfully!"), type: "success" });
      setEmailVerified(true);
      setShowOtpInput(false);
    } catch (error: any) {
      let msg = error.response?.data?.detail;
      if (Array.isArray(msg)) {
        msg = msg.map((err: any) => err.msg || JSON.stringify(err)).join(", ");
      }
      setToast({ message: msg || t("careers_invalid_otp", "Invalid or expired OTP"), type: "error" });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!emailVerified) {
      setToast({
        message: t("careers_verify_email_prompt", "Please verify your email with OTP before submitting."),
        type: "error"
      });
      return;
    }

    if (selectedJob?.is_demo) {
      setToast({
        message: "Demo opening — application submission is disabled.",
        type: "error"
      });
      return;
    }

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
        setEmailVerified(false);
        setShowOtpInput(false);
        setOtp('');
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
      title: t("careers_benefit_1_title", "Sustainable Mission"),
      description: t("careers_benefit_1_desc", "Make a real impact on sustainable agriculture and environmental conservation")
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: t("careers_benefit_2_title", "Career Growth"),
      description: t("careers_benefit_2_desc", "Clear growth paths with regular promotions and skill development programs")
    },
    {
      icon: <FiUsers className="text-2xl" />,
      title: t("careers_benefit_3_title", "Collaborative Culture"),
      description: t("careers_benefit_3_desc", "Work alongside passionate experts in agriculture and biotechnology")
    },
    {
      icon: <FaHandsHelping className="text-2xl" />,
      title: t("careers_benefit_4_title", "Work-Life Balance"),
      description: t("careers_benefit_4_desc", "Flexible hours, remote options, and generous leave policies")
    },
    {
      icon: <FiAward className="text-2xl" />,
      title: t("careers_benefit_5_title", "Learning Opportunities"),
      description: t("careers_benefit_5_desc", "Sponsored training, workshops, and global conference participation")
    },
    {
      icon: <FiBriefcase className="text-2xl" />,
      title: t("careers_benefit_6_title", "Comprehensive Benefits"),
      description: t("careers_benefit_6_desc", "Health insurance, retirement plans, bonuses, and wellness programs")
    }
  ];

  const applicationSteps = [
    {
      number: "01",
      title: t("careers_step_1_title", "Submit Application"),
      description: t("careers_step_1_desc", "Send your resume and personalized cover letter highlighting your passion for sustainable agriculture")
    },
    {
      number: "02",
      title: t("careers_step_2_title", "Screening Call"),
      description: t("careers_step_2_desc", "Initial phone conversation with our HR team to discuss mutual expectations")
    },
    {
      number: "03",
      title: t("careers_step_3_title", "Technical Interview"),
      description: t("careers_step_3_desc", "In-depth discussion with our technical team about your expertise and approach")
    },
    {
      number: "04",
      title: t("careers_step_4_title", "Final Interview"),
      description: t("careers_step_4_desc", "Meeting with leadership to discuss vision alignment and career aspirations")
    },
    {
      number: "05",
      title: t("careers_step_5_title", "Offer & Onboarding"),
      description: t("careers_step_5_desc", "Welcome package and comprehensive onboarding to integrate you smoothly")
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
        <section className="relative text-white min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 flex items-center overflow-hidden bg-emerald-950">
          <div className="absolute inset-0 z-0">
            <img
              src={biofactor_career}
              alt="Career at Biofactor"
              className="w-full h-full object-cover brightness-95 opacity-85"
            />
            {/* Reduced dark shadow overlay for vibrant image clarity */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-emerald-950/45 to-emerald-950/75" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md px-4 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                <span className="text-emerald-100 font-mono text-xs font-semibold tracking-widest uppercase">{t("careers_hiring_pill", "We’re hiring!")}</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight font-display tracking-tight">
                {t("careers_hero_h1", "Grow Your Career at")}
                <span className="block text-emerald-300 mt-1">Biofactor</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-base sm:text-lg lg:text-xl text-emerald-50 mb-8 max-w-2xl mx-auto leading-relaxed font-sans">
                {t("careers_hero_sub", "Join us in revolutionizing sustainable agriculture through innovative biological solutions.")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  type="button"
                  onClick={() => setIsHrModalOpen(true)}
                  className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <FiMail />
                  {t("careers_contact_hr", "Contact HR Department")}
                </button>

                <a
                  href="#openings"
                  className="inline-flex items-center justify-center gap-3 border-2 border-white/70 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xs"
                >
                  {t("careers_view_positions", "View Open Positions")}
                  <FiArrowRight />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        <section id="why-join-us" className="py-20 relative bg-[#EAF3EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="inline-block mb-3">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">{t("careers_why_choose_tag", "Why Choose Us")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173522] mb-4 tracking-tight">{t("careers_why_join_title", "Why Join Biofactor?")}</h2>
              <p className="text-base sm:text-lg text-[#173522]/90 max-w-3xl mx-auto leading-relaxed font-sans">
                {t("careers_why_join_desc", "Be part of a mission-driven team that's transforming agriculture while building meaningful careers")}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  variants={zoomIn}
                  whileHover={{ scale: 1.05, y: -6, boxShadow: "0 16px 36px rgba(45,106,79,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white/90 rounded-2xl p-8 shadow-md border border-[#2D6A4F]/15 flex flex-col items-center text-center cursor-pointer transition-all duration-300"
                >
                  <div className="text-[#2D6A4F] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="bg-[#EAF3EA] p-4 rounded-xl inline-flex justify-center items-center group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors duration-300">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#173522] mb-3 group-hover:text-[#2D6A4F] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-[#173522]/80 leading-relaxed text-sm font-sans">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Current Openings */}
        <section id="openings" className="py-20 bg-white border-y border-[#2D6A4F]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="inline-block mb-3">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">{t("careers_openings_tag", "Join Our Team")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173522] mb-4 tracking-tight">{t("careers_openings_title", "Current Job Openings")}</h2>
              <p className="text-base sm:text-lg text-[#173522]/90 max-w-2xl mx-auto font-sans">
                {t("careers_openings_desc", "Explore opportunities to contribute to sustainable agriculture")}
              </p>
            </motion.div>

            <div
              className={`grid md:grid-cols-2 ${displayJobs.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8 opacity-100`}
            >
              {loadingJobs ? (
                <div className="lg:col-span-3 flex flex-col items-center justify-center py-20 text-[#173522]/60 gap-4">
                  <FiLoader className="animate-spin text-4xl text-[#2D6A4F]" />
                  <p className="font-mono text-xs font-bold tracking-widest uppercase">{t("careers_loading_positions", "Loading open positions...")}</p>
                </div>
              ) : displayJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="group rounded-2xl shadow-md border border-[#2D6A4F]/20 bg-white overflow-hidden h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl opacity-100"
                >
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start gap-3 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#173522] group-hover:text-[#2D6A4F] transition-colors mb-1">
                          {jobText(job, "title", job.title)}
                        </h3>
                        <p className="text-sm font-semibold text-[#2D6A4F]">{jobText(job, "department", job.department)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {job.is_demo && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                            {t("careers_demo_opening", "DEMO OPENING")}
                          </span>
                        )}
                        <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#EAF3EA] text-[#2D6A4F]">
                          {jobText(job, "job_type", job.job_type)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-6 text-sm text-[#173522]/80 font-medium">
                        <span className="flex items-center gap-2">
                          <FiMapPin className="text-[#2D6A4F]" />
                          {job.is_demo ? t("careers_hyderabad_location", job.location) : job.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <FiBriefcase className="text-[#2D6A4F]" />
                          {jobText(job, "experience", job.experience)}
                        </span>
                      </div>
                      <div className="text-[#173522]/90 leading-relaxed text-sm font-sans">
                        {jobText(job, "description", job.description)}
                      </div>
                      {job.responsibilities && (
                        <div className="mt-4">
                          <h4 className="font-bold text-[#173522] text-sm mb-2">{t("careers_what_you_will_do", "What You'll Do:")}</h4>
                          <div className="text-[#173522]/80 text-sm leading-relaxed whitespace-pre-line font-sans">
                            {jobText(job, "responsibilities", job.responsibilities)}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {job.skills && job.skills.length > 0 && (
                      <div className="mb-8">
                        <h4 className="font-bold text-[#173522] text-xs uppercase tracking-wider mb-3 font-mono">{t("careers_key_skills", "Key Skills:")}</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 rounded-full text-xs font-medium bg-[#EAF3EA] text-[#173522]"
                            >
                              {jobText(job, `skill_${idx + 1}`, skill)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className={`flex items-center pt-6 border-t border-[#2D6A4F]/10 mt-auto ${job.salary && job.salary.trim() !== '' && job.salary !== 'Competitive' && job.salary !== 'Not Specified' ? 'justify-between' : 'justify-end'}`}>
                      {job.salary && job.salary.trim() !== '' && job.salary !== 'Competitive' && job.salary !== 'Not Specified' && (
                        <div>
                          <span className="text-[#173522]/60 text-xs uppercase tracking-wider font-mono">{t("careers_expected_salary", "Expected Salary")}</span>
                          <p className="font-bold text-[#2D6A4F]">
                            {job.salary && !job.salary.includes('₹') ? `₹${job.salary}` : job.salary}
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setIsApplying(true);
                        }}
                        className="px-6 py-3 bg-[#2D6A4F] hover:bg-[#173522] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer text-sm"
                      >
                        {t("careers_apply_now", "Apply Now")} <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Hiring Process Section */}
        <section id="process" className="py-20 bg-[#EAF3EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="inline-block mb-3">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">{t("careers_process_tag", "Application Process")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173522] mb-4 tracking-tight">{t("careers_process_title", "Our Hiring Process")}</h2>
              <p className="text-base sm:text-lg text-[#173522]/90 max-w-2xl mx-auto font-sans">
                {t("careers_process_desc", "A transparent and engaging journey from application to onboarding")}
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline connector line */}
              <div className="absolute left-0 right-0 top-10 h-1 bg-[#2D6A4F]/20 hidden lg:block"></div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid lg:grid-cols-5 gap-8"
              >
                {applicationSteps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    variants={zoomIn}
                    whileHover={{ scale: 1.06, y: -4 }}
                    className="relative cursor-pointer"
                  >
                    <div className="text-center flex flex-col items-center">
                      <div className="relative inline-flex items-center justify-center mb-6">
                        <div className="absolute inset-0 bg-[#2D6A4F]/30 rounded-full animate-ping"></div>
                        <div className="relative bg-gradient-to-br from-[#2D6A4F] to-[#173522] text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-[#EAF3EA] transition-transform duration-300 hover:scale-110">
                          {step.number}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-[#173522] mb-2">{step.title}</h3>
                      <p className="text-[#173522]/80 text-xs sm:text-sm leading-relaxed font-sans">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Application Modal */}
        {isApplying && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full my-8 p-6 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setIsApplying(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <FiX />
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono font-bold tracking-widest text-[#2D6A4F] uppercase">{t("careers_apply_for", "Apply For")}</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#173522] mt-1">{jobText(selectedJob, "title", selectedJob.title)}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#173522]/70 mt-2 font-medium">
                  <span className="flex items-center gap-1.5"><FiMapPin className="text-[#2D6A4F]" /> {selectedJob.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5"><FiBriefcase className="text-[#2D6A4F]" /> {selectedJob.job_type || selectedJob.department}</span>
                </div>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_full_name", "Full Name")} *</label>
                    <input 
                      type="text" 
                      required
                      value={applicationForm.full_name}
                      onChange={(e) => setApplicationForm({...applicationForm, full_name: e.target.value})}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                  </div>

                  {/* Email Address with OTP Verification */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_email_address", "Email Address")} *</label>
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        required
                        disabled={emailVerified}
                        value={applicationForm.email}
                        onChange={(e) => {
                          setApplicationForm({...applicationForm, email: e.target.value});
                          if (emailVerified) {
                            setEmailVerified(false);
                            setShowOtpInput(false);
                            setOtp('');
                          }
                        }}
                        placeholder="your@email.com"
                        className={`flex-1 px-4 py-2.5 text-sm border rounded-xl outline-none transition-all ${
                          emailVerified 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                            : 'border-gray-200 bg-[#EAF3EA]/40 focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white text-[#173522]'
                        }`}
                      />
                      {emailVerified ? (
                        <div className="flex items-center gap-1 px-3.5 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-300 whitespace-nowrap">
                          <FiCheckCircle className="text-emerald-600" />
                          {t("careers_verified", "Verified")}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isSendingOtp || !applicationForm.email}
                          className="px-4 py-2 bg-[#2D6A4F] hover:bg-[#173522] text-white text-xs font-bold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5 whitespace-nowrap shadow-sm cursor-pointer"
                        >
                          {isSendingOtp ? (
                            <><FiLoader className="animate-spin text-xs" /> {t("careers_sending_otp", "Sending...")}</>
                          ) : (
                            <><FiMail /> {t("careers_verify_email", "Verify Mail")}</>
                          )}
                        </button>
                      )}
                    </div>

                    {/* OTP Input Card */}
                    {showOtpInput && !emailVerified && (
                      <div className="mt-2.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <p className="text-xs text-emerald-900 font-medium mb-2">
                          📧 {t("careers_otp_sent_to", "OTP sent to")} <strong>{applicationForm.email}</strong>. Check your inbox.
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="6-digit OTP"
                            className="flex-1 px-3 py-1.5 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] bg-white text-center text-base font-bold tracking-[0.3em] text-gray-800"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={isVerifyingOtp || otp.length !== 6}
                            className="px-4 py-1.5 bg-[#2D6A4F] hover:bg-[#173522] text-white text-xs font-bold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1 whitespace-nowrap cursor-pointer"
                          >
                            {isVerifyingOtp ? (
                              <><FiLoader className="animate-spin text-xs" /> {t("careers_verifying", "Verifying...")}</>
                            ) : (
                              t("careers_verify_otp", "Verify OTP")
                            )}
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-1.5">
                          <p className="text-[11px] text-gray-500">{t("careers_otp_hint", "Valid for 10 minutes.")}</p>
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={isSendingOtp}
                            className="text-[11px] text-[#2D6A4F] hover:underline font-semibold disabled:opacity-60 cursor-pointer"
                          >
                            {isSendingOtp ? t("careers_sending_otp", "Sending...") : t("careers_resend_otp", "Resend OTP")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_phone_number", "Phone Number")} *</label>
                    <input 
                      type="tel" 
                      required
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                  </div>

                  {/* Current Company */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_current_company", "Current Company")}</label>
                    <input 
                      type="text" 
                      value={applicationForm.current_company}
                      onChange={(e) => setApplicationForm({...applicationForm, current_company: e.target.value})}
                      placeholder="e.g. Current Employer"
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_years_experience", "Years of Experience")} *</label>
                    <input 
                      type="number" 
                      required
                      min={0}
                      step={0.5}
                      value={applicationForm.experience_years}
                      onChange={(e) => setApplicationForm({...applicationForm, experience_years: e.target.value})}
                      placeholder="e.g. 3"
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                    <p className="text-[11px] text-[#173522]/60 mt-1 italic">
                      {t("careers_min_exp_note", "Minimum requirement for this job is")} {getMinExperience(selectedJob.experience)} {t("careers_years", "years")}
                    </p>
                    {applicationForm.experience_years && parseInt(applicationForm.experience_years) < getMinExperience(selectedJob.experience) && (
                      <p className="text-[11px] text-red-600 mt-0.5 font-medium">
                        {t("careers_less_exp_warn", "You have less than the required minimum experience.")}
                      </p>
                    )}
                  </div>

                  {/* LinkedIn URL */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_linkedin_url", "LinkedIn Profile URL")}</label>
                    <input 
                      type="url" 
                      value={applicationForm.linkedin_url}
                      onChange={(e) => setApplicationForm({...applicationForm, linkedin_url: e.target.value})}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                  </div>

                  {/* Highest Course / Degree */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_highest_course", "Highest Course / Degree")}</label>
                    <select 
                      value={applicationForm.course} 
                      onChange={(e) => setApplicationForm({...applicationForm, course: e.target.value})}
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    >
                      <option value="">{t("careers_select_course", "Select Course")}</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="M.Sc">M.Sc</option>
                      <option value="MBA">MBA</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                    </select>
                    {applicationForm.course === 'Other' && (
                      <textarea
                        rows={2}
                        value={applicationForm.course_other}
                        onChange={(e) => setApplicationForm({...applicationForm, course_other: e.target.value})}
                        placeholder={t("careers_other_course_placeholder", "Enter your course details...")}
                        className="w-full mt-2 px-4 py-2 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] resize-none"
                      />
                    )}
                  </div>

                  {/* Professional Domain */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_domain", "Professional Domain")}</label>
                    <input 
                      type="text" 
                      value={applicationForm.domain}
                      onChange={(e) => setApplicationForm({...applicationForm, domain: e.target.value})}
                      placeholder={t("careers_domain_placeholder", "e.g. Research, Agronomy, Quality Control")}
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                  </div>

                  {/* Languages Known */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_languages", "Languages Known")} *</label>
                    <input 
                      type="text" 
                      required
                      value={applicationForm.languages_known}
                      onChange={(e) => setApplicationForm({...applicationForm, languages_known: e.target.value})}
                      placeholder={t("careers_languages_placeholder", "e.g. English, Telugu, Hindi")}
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                  </div>

                  {/* Your Location */}
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_location_label", "Your Location")} *</label>
                    <input 
                      type="text" 
                      required
                      value={applicationForm.location}
                      onChange={(e) => setApplicationForm({...applicationForm, location: e.target.value})}
                      placeholder={t("careers_location_placeholder", "City, State")}
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                  </div>

                  {/* Resume / CV */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_upload_resume", "Resume / CV (PDF / DOC / DOCX, max 5MB)")} *</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        required
                        id="resume-file-input"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setApplicationForm({...applicationForm, resume: e.target.files ? e.target.files[0] : null})}
                        className="hidden"
                      />
                      <label 
                        htmlFor="resume-file-input"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-dashed border-[#2D6A4F]/40 hover:border-[#2D6A4F] bg-[#EAF3EA]/30 hover:bg-[#EAF3EA]/60 cursor-pointer transition-all text-[#173522]"
                      >
                        <FiUpload className="text-[#2D6A4F] text-lg shrink-0" />
                        <span className="truncate text-sm font-medium">
                          {applicationForm.resume ? applicationForm.resume.name : t("careers_upload_placeholder", "Click to browse and upload resume (PDF, DOC, DOCX)")}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_key_skills_label", "Key Skills")} *</label>
                    <input 
                      type="text" 
                      required
                      value={applicationForm.skills}
                      onChange={(e) => setApplicationForm({...applicationForm, skills: e.target.value})}
                      placeholder={t("careers_key_skills_placeholder", "e.g. Microbiology, Lab Assays, Quality Assurance")}
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                  </div>

                  {/* Referred By */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_referred_by", "Referred By")}</label>
                    <input 
                      type="text" 
                      value={applicationForm.referred_by}
                      onChange={(e) => setApplicationForm({...applicationForm, referred_by: e.target.value})}
                      placeholder={t("careers_referred_by_placeholder", "Name of person who referred you (if any)...")}
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] transition-all"
                    />
                  </div>

                  {/* Cover Letter */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-mono uppercase tracking-wider text-[#173522] mb-1.5">{t("careers_cover_letter", "Cover Letter / Note")}</label>
                    <textarea 
                      rows={3}
                      value={applicationForm.cover_letter}
                      onChange={(e) => setApplicationForm({...applicationForm, cover_letter: e.target.value})}
                      placeholder={t("careers_cover_letter_placeholder", "Tell us why you are a great fit for Biofactor...")}
                      className="w-full px-4 py-2.5 text-sm bg-[#EAF3EA]/40 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#173522] resize-none transition-all"
                    />
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row justify-end items-center gap-3 border-t border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => setIsApplying(false)}
                    className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                  >
                    {t("careers_cancel", "Cancel")}
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !emailVerified}
                    className="w-full sm:w-auto px-8 py-2.5 bg-[#2D6A4F] hover:bg-[#173522] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin text-base" /> {t("careers_upload_and_submit", "Uploading & Submitting...")}
                      </>
                    ) : !emailVerified ? (
                      t("careers_verify_first", "Verify Email First")
                    ) : (
                      t("careers_submit_application", "Submit Application")
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* HR Contact Modal */}
        {isHrModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsHrModalOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="hr-dialog-title"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-[420px] w-full p-6 sm:p-7 shadow-2xl border border-[#2D6A4F]/20 relative transform transition-all duration-200 ease-out text-[#173522]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsHrModalOpen(false)}
                aria-label="Close HR Contact Dialog"
                className="absolute top-5 right-5 text-gray-400 hover:text-[#173522] text-xl transition-colors cursor-pointer p-1 rounded-lg hover:bg-gray-100"
              >
                <FiX />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EAF3EA] text-[#2D6A4F] flex items-center justify-center text-lg shrink-0">
                  <FiMail />
                </div>
                <div>
                  <h2 id="hr-dialog-title" className="text-lg font-bold text-[#173522] leading-snug">
                    {t("careers_contact_hr", "Contact HR Department")}
                  </h2>
                  <p className="text-xs text-[#173522]/65 font-medium">Biofactor Global</p>
                </div>
              </div>

              <div className="h-px bg-[#2D6A4F]/10 w-full mb-5" />

              {/* Contact Information Details (Reused existing project content) */}
              <div className="space-y-4 text-sm font-sans mb-6">
                <div className="flex items-start gap-3">
                  <FiMail className="text-[#2D6A4F] text-base mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-[#173522]/50 uppercase tracking-wider block">{t("careers_email", "Email")}</span>
                    <a href="mailto:info@biofactor.in" className="font-semibold text-[#173522] hover:text-[#2D6A4F] transition-colors">
                      info@biofactor.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="text-[#2D6A4F] text-base mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-[#173522]/50 uppercase tracking-wider block">{t("careers_phone", "Phone")}</span>
                    <a href="tel:7013074400" className="font-semibold text-[#173522] hover:text-[#2D6A4F] transition-colors">
                      +91 7013074400
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiBriefcase className="text-[#2D6A4F] text-base mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-[#173522]/50 uppercase tracking-wider block">{t("careers_visiting_hours", "Visiting Hours")}</span>
                    <p className="text-[#173522]/80 text-xs leading-relaxed font-medium">
                      9:30 AM – 6:30 PM, Monday to Saturday
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="text-[#2D6A4F] text-base mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-[#173522]/50 uppercase tracking-wider block">{t("careers_head_office", "Head Office")}</span>
                    <p className="text-[#173522]/80 text-xs leading-relaxed font-medium">
                      Hyderabad, Telangana 500090
                    </p>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-2">
                <Link
                  href="/contact/"
                  onClick={() => {
                    setTimeout(() => setIsHrModalOpen(false), 80);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#2D6A4F] hover:bg-[#173522] text-white font-bold text-xs font-mono uppercase py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Go to Contact Page <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <BiofactorFooter />
    </div>
  );
}
