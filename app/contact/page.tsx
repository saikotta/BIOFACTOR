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
import { motion } from 'framer-motion';
import BiofactorFooter from '../components/BiofactorFooter';

const contactPhoto = "/images/contactus.png";

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
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        area: '',
        subject: '',
        message: '',
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setFormStatus(''), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-emerald-600" />,
      title: "Call Us",
      details: "7013074400",
      subtitle: "Visiting hours: 9:30 AM – 6:30 PM",
      color: "from-blue-50 to-indigo-50",
      border: "border-blue-100"
    },
    {
      icon: <Mail className="w-6 h-6 text-emerald-600" />,
      title: "Email Us",
      details: "info@biofactor.in",
      subtitle: "General Inquiries",
      color: "from-emerald-50 to-green-50",
      border: "border-emerald-100"
    },
    {
      icon: <MapPin className="w-6 h-6 text-emerald-600" />,
      title: "Visit Us",
      details: "Head Office",
      subtitle: "4 & 5 Floors, Sai Medha Infra, Arca Satya Residency, Kousalya Colony, Bachupally, Hyderabad, Telangana 500090",
      color: "from-amber-50 to-orange-50",
      border: "border-orange-100"
    }
  ];

  const expertiseAreas = [
    {
      icon: "🌱",
      title: "Crop Protection",
      desc: "Pesticides & Herbicides"
    },
    {
      icon: "💧",
      title: "Irrigation",
      desc: "Smart Systems"
    },
    {
      icon: "🌾",
      title: "Seeds",
      desc: "High Yield Varieties"
    },
    {
      icon: "🧪",
      title: "Fertilizers",
      desc: "Organic & Chemical"
    },
    {
      icon: "🏭",
      title: "Processing",
      desc: "Post-Harvest Tech"
    },
    {
      icon: "📊",
      title: "Consulting",
      desc: "Farm Management"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Trusted Solutions",
      description: "FCO Supported agricultural products"
    },
    {
      icon: <Trophy className="w-8 h-8 text-emerald-600" />,
      title: "Award Winning",
      description: "Recognized for innovation in agri-tech"
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Expert Team",
      description: "100+ agricultural specialists"
    },
    {
      icon: <Target className="w-8 h-8 text-emerald-600" />,
      title: "Proven Results",
      description: "Increased yields for 10,000+ farmers"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col justify-between">
      <div>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-teal-900/10 z-0"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-left"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Grow With <span className="text-emerald-700">Expert</span> Agricultural Support
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                  Get personalized solutions for your farming needs. Our team of agricultural experts is ready to help you increase yield and maximize profits.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/science-technology"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg"
                  >
                    Explore Science & Tech
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:7013074400"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl border border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={contactPhoto} 
                    alt="Agricultural Expert Consultation" 
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-8 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className={`p-6 rounded-2xl bg-gradient-to-br ${info.color} border ${info.border} shadow-sm flex items-start gap-4`}>
                <div className="p-3 bg-white rounded-xl shadow-xs">{info.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{info.title}</h3>
                  <p className="font-semibold text-emerald-800 text-base">{info.details}</p>
                  <p className="text-xs text-gray-600 mt-1">{info.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-green-100">
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                    <MessageSquare className="w-4 h-4" /> Send Message
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Get in Touch With Our Experts
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Fill out the form below and our agricultural specialists will get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white focus:bg-green-50 text-gray-900"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white focus:bg-green-50 text-gray-900"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium" htmlFor="phone">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white focus:bg-green-50 text-gray-900"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium" htmlFor="area">
                        Area (State & District) *
                      </label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white focus:bg-green-50 text-gray-900"
                        placeholder="e.g., Telangana, Hyderabad"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium" htmlFor="subject">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white focus:bg-green-50 text-gray-900"
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

                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium" htmlFor="message">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white focus:bg-green-50 resize-none text-gray-900"
                      placeholder="Tell us about your agricultural needs, farm size, crops grown, etc..."
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPinIcon className="w-4 h-4 text-emerald-600" />
                    <span>We use your area information to connect you with our nearest distributor or support team.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                      formStatus === 'sending' ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
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
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl">
                      <p className="text-emerald-700 font-medium flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        Thank you! Your message has been sent successfully. Our regional team will contact you soon.
                      </p>
                    </div>
                  )}
                </form>
              </div>

              {/* Sidebar Information */}
              <div className="space-y-8 flex flex-col justify-center h-full">
                {/* Our Areas of Expertise */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Areas of Expertise</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {expertiseAreas.map((area, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow duration-300">
                        <span className="text-2xl">{area.icon}</span>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{area.title}</p>
                          <p className="text-xs text-gray-600">{area.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Visiting &amp; Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                      <span className="text-gray-700">Visiting Hours</span>
                      <span className="font-semibold text-gray-900">9:30 AM – 6:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                      <span className="text-gray-700">Monday - Saturday</span>
                      <span className="font-semibold text-gray-900">9:30 AM – 6:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Sunday</span>
                      <span className="font-semibold text-gray-900 text-red-600">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Agricultural Solutions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We combine decades of farming expertise with cutting-edge technology to deliver results that matter.
              </p>
            </div>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="p-3 bg-white rounded-xl inline-flex justify-center items-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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
