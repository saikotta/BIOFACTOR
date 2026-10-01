"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin,
  Send,
  Users,
  MessageSquare,
  CheckCircle,
  Shield,
  Trophy,
  Target,
  MapPin as MapPinIcon
} from 'lucide-react';
import { FiArrowRight } from "react-icons/fi";
import { motion, type Variants } from 'framer-motion';
import BiofactorFooter from '../components/BiofactorFooter';

const contactPhoto = "/images/contactus.png";

// Shared animation variants
const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', area: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(''), 5000);
    }, 1200);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-[#2D6A4F]" />,
      title: "Call Us",
      details: "7013074400",
      subtitle: "Visiting hours: 9:30 AM – 6:30 PM",
      border: "border-[#2D6A4F]/20"
    },
    {
      icon: <Mail className="w-6 h-6 text-[#2D6A4F]" />,
      title: "Email Us",
      details: "info@biofactor.in",
      subtitle: "General Inquiries",
      border: "border-[#2D6A4F]/20"
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#2D6A4F]" />,
      title: "Visit Us",
      details: "Head Office",
      subtitle: "4 & 5 Floors, Sai Medha Infra, Arca Satya Residency, Kousalya Colony, Bachupally, Hyderabad, Telangana 500090",
      border: "border-[#2D6A4F]/20"
    }
  ];

  const expertiseAreas = [
    { icon: "🌱", title: "Crop Protection", desc: "Pesticides & Herbicides" },
    { icon: "💧", title: "Irrigation", desc: "Smart Systems" },
    { icon: "🌾", title: "Seeds", desc: "High Yield Varieties" },
    { icon: "🧪", title: "Fertilizers", desc: "Organic & Chemical" },
    { icon: "🏭", title: "Processing", desc: "Post-Harvest Tech" },
    { icon: "📊", title: "Consulting", desc: "Farm Management" }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-[#2D6A4F]" />,
      title: "Trusted Solutions",
      description: "FCO Supported agricultural products"
    },
    {
      icon: <Trophy className="w-8 h-8 text-[#2D6A4F]" />,
      title: "Award Winning",
      description: "Recognized for innovation in agri-tech"
    },
    {
      icon: <Users className="w-8 h-8 text-[#2D6A4F]" />,
      title: "Expert Team",
      description: "100+ agricultural specialists"
    },
    {
      icon: <Target className="w-8 h-8 text-[#2D6A4F]" />,
      title: "Proven Results",
      description: "Increased yields for 10,000+ farmers"
    }
  ];

  return (
    <div className="min-h-screen bg-[#EAF3EA] text-[#173522] flex flex-col justify-between selection:bg-[#2D6A4F] selection:text-[#EAF3EA]">
      <div>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden py-16 bg-white border-b border-[#2D6A4F]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-left"
              >
                <div className="inline-block mb-3">
                  <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">Get In Touch</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#173522] mb-6 leading-tight font-display tracking-tight">
                  Grow With <span className="text-[#2D6A4F]">Expert</span> Agricultural Support
                </h1>
                <p className="text-base sm:text-lg text-[#173522]/90 mb-8 max-w-2xl font-sans leading-relaxed">
                  Get personalized solutions for your farming needs. Our team of agricultural experts is ready to help you increase yield and maximize profits.
                </p>
                {/* Only Explore Science & Tech button — Call Now removed */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/science-technology"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2D6A4F] text-white font-bold rounded-xl hover:bg-[#173522] transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                  >
                    Explore Science &amp; Tech
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#2D6A4F]/20">
                  <img
                    src={contactPhoto}
                    alt="Agricultural Expert Consultation"
                    className="w-full h-72 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173522]/40 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3 Contact Info Cards — Zoom-in on load, hover zoom-out effect */}
        <section className="py-10 px-4 max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                variants={zoomIn}
                whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(45,106,79,0.13)" }}
                whileTap={{ scale: 0.97 }}
                className={`p-6 rounded-2xl bg-white border ${info.border} shadow-sm flex items-start gap-4 cursor-pointer transition-colors hover:border-[#2D6A4F]/40`}
              >
                <div className="p-3 bg-[#EAF3EA] rounded-xl flex-shrink-0 group-hover:bg-[#2D6A4F]/10 transition-colors">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#173522] text-lg">{info.title}</h3>
                  <p className="font-bold text-[#2D6A4F] text-base">{info.details}</p>
                  <p className="text-xs text-[#173522]/70 mt-1 font-sans">{info.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Main Content: Form + Sidebar aligned at top */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-start">

              {/* Contact Form — zoom-in on scroll */}
              <motion.div
                className="lg:col-span-2 bg-white rounded-3xl shadow-md p-6 md:p-8 border border-[#2D6A4F]/15"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={zoomIn}
              >
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EAF3EA] text-[#2D6A4F] rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3">
                    <MessageSquare className="w-4 h-4" /> Send Message
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#173522] mb-2">
                    Get in Touch With Our Experts
                  </h2>
                  <p className="text-[#173522]/80 font-sans text-sm">
                    Fill out the form below and our agricultural specialists will get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[#173522] font-semibold text-sm" htmlFor="name">Full Name *</label>
                      <input
                        type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-white text-[#173522] text-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[#173522] font-semibold text-sm" htmlFor="email">Email Address *</label>
                      <input
                        type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-white text-[#173522] text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[#173522] font-semibold text-sm" htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-white text-[#173522] text-sm"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[#173522] font-semibold text-sm" htmlFor="area">Area (State &amp; District) *</label>
                      <input
                        type="text" id="area" name="area" value={formData.area} onChange={handleChange} required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-white text-[#173522] text-sm"
                        placeholder="e.g., Telangana, Hyderabad"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[#173522] font-semibold text-sm" htmlFor="subject">Subject *</label>
                    <select
                      id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-white text-[#173522] text-sm"
                    >
                      <option value="">Select a topic</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Information">Product Information</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Partnership">Partnership Opportunity</option>
                      <option value="Distributor">Become a Distributor</option>
                      <option value="Dealer Inquiry">Dealer Inquiry</option>
                      <option value="Farmer Support">Farmer Support</option>
                      <option value="Training Program">Training Program</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[#173522] font-semibold text-sm" htmlFor="message">Your Message *</label>
                    <textarea
                      id="message" name="message" value={formData.message} onChange={handleChange} required rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] transition-all bg-white text-[#173522] resize-none text-sm"
                      placeholder="Tell us about your agricultural needs, farm size, crops grown, etc..."
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#173522]/70 font-sans">
                    <MapPinIcon className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
                    <span>We use your area information to connect you with our nearest distributor or support team.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-3.5 bg-[#2D6A4F] hover:bg-[#173522] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm cursor-pointer ${formStatus === 'sending' ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {formStatus === 'success' && (
                    <div className="p-4 bg-[#EAF3EA] border border-[#2D6A4F]/30 rounded-xl">
                      <p className="text-[#2D6A4F] font-bold text-sm flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        Thank you! Your message has been sent successfully. Our regional team will contact you soon.
                      </p>
                    </div>
                  )}
                </form>
              </motion.div>

              {/* Sidebar — aligned at top with items-start, zoom-in cards */}
              <motion.div
                className="flex flex-col gap-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={staggerContainer}
              >
                {/* Our Areas of Expertise card */}
                <motion.div
                  variants={zoomIn}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(45,106,79,0.12)" }}
                  className="bg-white rounded-2xl p-5 border border-[#2D6A4F]/15 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-[#173522] mb-3">Our Areas of Expertise</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {expertiseAreas.map((area, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(45,106,79,0.08)" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 p-2.5 bg-[#EAF3EA] rounded-xl cursor-pointer transition-colors"
                      >
                        <span className="text-xl">{area.icon}</span>
                        <div>
                          <p className="font-bold text-[#173522] text-xs">{area.title}</p>
                          <p className="text-[10px] text-[#173522]/70 font-sans">{area.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Business Hours card */}
                <motion.div
                  variants={zoomIn}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(45,106,79,0.12)" }}
                  className="bg-white rounded-2xl p-5 border border-[#2D6A4F]/15 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-[#173522] mb-3">Visiting &amp; Business Hours</h3>
                  <div className="space-y-2.5 font-sans text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-[#2D6A4F]/10">
                      <span className="text-[#173522]/80">Visiting Hours</span>
                      <span className="font-bold text-[#173522]">9:30 AM – 6:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-[#2D6A4F]/10">
                      <span className="text-[#173522]/80">Monday – Saturday</span>
                      <span className="font-bold text-[#173522]">9:30 AM – 6:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#173522]/80">Sunday</span>
                      <span className="font-bold text-red-600">Closed</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Why Choose Us — agricultural cards with zoom-in on load */}
        <section className="py-16 px-4 bg-white border-t border-[#2D6A4F]/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-block mb-3">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">Why Choose Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173522] mb-4 font-display">
                Why Choose Our Agricultural Solutions
              </h2>
              <p className="text-[#173522]/80 max-w-2xl mx-auto font-sans">
                We combine decades of farming expertise with cutting-edge technology to deliver results that matter.
              </p>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={zoomIn}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(45,106,79,0.14)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#EAF3EA] rounded-2xl p-6 border border-[#2D6A4F]/15 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="p-3 bg-white rounded-xl inline-flex justify-center items-center mb-4 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#173522] mb-2">{feature.title}</h3>
                  <p className="text-[#173522]/80 text-sm font-sans">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      <BiofactorFooter />
    </div>
  );
}
