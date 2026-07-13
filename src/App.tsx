import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  Shield,
  Users,
  ShoppingBag,
  Home,
  FileText,
  PenTool,
  Briefcase,
  Key,
  HelpCircle,
  MessageSquare,
  Gavel,
  FileEdit,
  BookOpen,
  Files,
  Compass,
  TrendingUp,
  FileCheck,
  MapPin,
  Phone,
  Mail,
  Award,
  Calendar,
  Clock,
  Check,
  Menu,
  X,
  ChevronUp,
  Send,
  ExternalLink,
  Lock,
  MessageCircle,
  AlertTriangle,
} from 'lucide-react';

import {
  navItems,
  practiceAreas,
  whyChooseMe,
  services,
  educationTimeline,
  contactDetails,
} from './data';
import { ConsultationFormInput } from './types';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  Scale, Shield, Users, ShoppingBag, Home, FileText, PenTool, Briefcase, Key, HelpCircle,
  MessageSquare, Gavel, FileEdit, BookOpen, Files, Compass, TrendingUp, FileCheck,
};

// Profile Photo and Hero Background Image paths
// @ts-ignore
import profilePhoto from './assets/images/adv-akash-kumar.jpg';
// @ts-ignore
import heroBg from './assets/images/hero_bg_1783928882063.jpg';

export default function App() {
  // Loading & Splash Screen State
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Layout & Interaction States
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Consultation Form States
  const [formInput, setFormInput] = useState<ConsultationFormInput>({
    fullName: '',
    phoneNumber: '',
    email: '',
    practiceArea: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<ConsultationFormInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Local submissions storage for client demo tracking
  const [appointments, setAppointments] = useState<ConsultationFormInput[]>([]);

  // Footer Document Modal state
  const [modalDocument, setModalDocument] = useState<{ title: string; content: string } | null>(null);

  // Simulate loading bar progress
  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setIsLoading(false), 200);
            return 100;
          }
          return prev + 8;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  // Handle active section scrolling and show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button
      setShowScrollTop(window.scrollY > 500);

      // Simple active link tracker based on section positions
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 120; // offset for sticky header

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load local mock appointments on mount
  useEffect(() => {
    const stored = localStorage.getItem('adv_akash_appointments');
    if (stored) {
      try {
        setAppointments(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing stored consultations", e);
      }
    }
  }, []);

  // Smooth scroll helper
  const scrollTo = (href: string) => {
    setShowMobileMenu(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of the sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Consultation Form submission validation
  const validateForm = (): boolean => {
    const errors: Partial<ConsultationFormInput> = {};
    
    if (!formInput.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    } else if (formInput.fullName.trim().length < 3) {
      errors.fullName = 'Please enter a valid full name';
    }

    if (!formInput.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else {
      const cleanPhone = formInput.phoneNumber.replace(/[\s\-()]/g, '');
      if (cleanPhone.length < 10) {
        errors.phoneNumber = 'Please enter a valid 10-digit phone number';
      }
    }

    if (!formInput.email.trim()) {
      errors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formInput.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!formInput.practiceArea) {
      errors.practiceArea = 'Please select a practice area';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate real database write / API call to server
    setTimeout(() => {
      const newAppointment = { ...formInput };
      const updated = [newAppointment, ...appointments];
      setAppointments(updated);
      localStorage.setItem('adv_akash_appointments', JSON.stringify(updated));

      setIsSubmitting(false);
      setShowSuccessModal(true);

      // Reset form
      setFormInput({
        fullName: '',
        phoneNumber: '',
        email: '',
        practiceArea: '',
        message: '',
      });
    }, 1200);
  };

  // Define static legal document contents for the custom modals (No tech larping)
  const openLegalDocument = (docType: 'privacy' | 'terms' | 'disclaimer') => {
    let documentData = { title: '', content: '' };
    
    if (docType === 'privacy') {
      documentData = {
        title: 'Privacy Policy',
        content: `Your privacy is highly valued. This Privacy Policy governs how Adv. Akash Kumar collects, uses, protects, and stores information gathered from visitors of this portfolio website.\n\n1. Information Collection: We only collect personal identification information (such as name, email, and phone number) when you voluntarily submit it through our consultation form.\n\n2. Use of Information: The shared contact details are used strictly to communicate with you regarding your legal inquiry, schedule consultations, and provide legal advice. We do not sell or lease your details to third parties.\n\n3. Data Protection: We implement secure practices to protect your information from unauthorized access, modification, or disclosure.\n\n4. Client-Attorney Privilege: Note that while any information submitted via this public web form is handled with strict confidentiality, the formal establishment of a lawyer-client relationship occurs only after direct contact and formal engagement.`
      };
    } else if (docType === 'terms') {
      documentData = {
        title: 'Terms & Conditions',
        content: `By accessing and navigating this website, you agree to comply with and be bound by the following terms and conditions:\n\n1. No Legal Representation: Accessing this website, utilizing any materials herein, or submitting an inquiry via the consultation form does not create an advocate-client relationship between you and Adv. Akash Kumar.\n\n2. Absolute Information Accuracy: While every effort is made to maintain correct and up-to-date legal information on this portal, it should not be treated as absolute or definitive. Law changes frequently and varies across jurisdictions.\n\n3. Non-Commercial Use: The material on this website is intended solely for personal, non-commercial use. Users may not copy, replicate, or commercialize the layout, design, or textual assets without explicit authorization.`
      };
    } else if (docType === 'disclaimer') {
      documentData = {
        title: 'Bar Council of India Disclaimer',
        content: `This website is built in complete adherence with the regulatory directives of the Bar Council of India (BCI). Under BCI Rules, an advocate is strictly prohibited from soliciting work or advertising their legal services.\n\nBy clicking further or reviewing this website, you explicitly acknowledge that:\n- You are voluntarily seeking information regarding Adv. Akash Kumar's practice, areas of specialization, and academic credentials.\n- There has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever from Adv. Akash Kumar or his associates to solicit work through this website.\n- The information on this portal is provided for general informational purposes only and does not substitute professional legal counsel.`
      };
    }

    setModalDocument(documentData);
  };

  return (
    <div className="relative min-h-screen bg-[#fcfcfd] text-slate-800 font-sans selection:bg-gold-accent selection:text-navy-dark overflow-x-hidden">
      
      {/* 1. PROFESSIONAL SPLASH SCREEN / LOADING SCREEN */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            id="splash-screen"
            className="fixed inset-0 bg-navy-dark z-50 flex flex-col items-center justify-center text-center p-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-md flex flex-col items-center">
              {/* Scale of justice SVG */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-6 p-4 rounded-full bg-navy-dark border border-gold-accent/25 shadow-xl"
              >
                <Scale className="h-16 w-16 text-gold-accent animate-pulse" />
              </motion.div>

              <motion.h1 
                className="text-2xl md:text-3xl font-poppins font-semibold text-white tracking-wider uppercase mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Adv. Akash Kumar
              </motion.h1>
              
              <motion.p 
                className="text-xs md:text-sm font-sans tracking-widest text-gold-accent/80 font-medium uppercase mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                High Court of Delhi & District Courts
              </motion.p>

              {/* Progress Bar Container */}
              <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mb-3">
                <motion.div 
                  className="h-full bg-gold-accent" 
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400">
                INITIALIZING LEGAL PROFILE... {Math.min(Math.round(loadingProgress), 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. STICKY GLASSMORPHIC NAVIGATION BAR */}
      <nav id="navbar" className="sticky top-0 z-40 w-full glass-nav shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo / Brand */}
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center space-x-3 group">
              <div className="p-2 bg-navy-dark rounded-md border border-gold-accent/30 group-hover:border-gold-accent transition-colors">
                <Scale className="h-6 w-6 text-gold-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-poppins font-bold text-white tracking-wide leading-tight group-hover:text-gold-accent transition-colors">
                  Adv. Akash Kumar
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase leading-none font-medium">
                  Delhi High Court Advocate
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className={`nav-link text-sm font-medium tracking-wide font-poppins uppercase transition-colors ${
                      isActive ? 'text-gold-accent nav-link-active' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* CTA Consultation Button */}
            <div className="hidden lg:block">
              <button
                id="nav-consultation-btn"
                onClick={() => scrollTo('#consultation-section')}
                className="px-5 py-2.5 bg-gold-accent hover:bg-gold-hover text-navy-dark font-poppins font-semibold text-xs tracking-wider uppercase rounded-sm border border-gold-accent shadow-md transition-all hover:shadow-gold-accent/10 hover:-translate-y-0.5"
              >
                Book Consultation
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/50 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              id="mobile-menu-drawer"
              className="lg:hidden absolute top-20 left-0 w-full bg-navy-dark/95 border-b border-gold-accent/25 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className={`block px-3 py-3 rounded-md text-base font-poppins font-medium uppercase tracking-wide transition-colors ${
                      isActive 
                        ? 'bg-navy-dark border-l-2 border-gold-accent text-gold-accent' 
                        : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-slate-800 px-3">
                <button
                  onClick={() => scrollTo('#consultation-section')}
                  className="w-full py-3 bg-gold-accent hover:bg-gold-hover text-navy-dark font-poppins font-bold text-sm tracking-wider uppercase rounded-sm transition-colors shadow-lg"
                >
                  Book Consultation Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 3. HERO SECTION WITH IMAGE BACKDROP */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center justify-center py-20 md:py-32 overflow-hidden"
      >
        {/* Background Image with Layered Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Supreme Court Law Library"
            className="w-full h-full object-cover object-center transform scale-105 motion-safe:animate-[pulse_8s_infinite_alternate]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/90 to-navy-dark/85 z-10" />
          {/* Elegant gold geometric divider overlay */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent z-15" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text copy */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center self-center lg:self-start space-x-2 px-3 py-1.5 rounded-full bg-gold-accent/10 border border-gold-accent/30"
              >
                <Award className="h-4 w-4 text-gold-accent" />
                <span className="text-xs font-poppins font-medium uppercase tracking-wider text-gold-accent">
                  Delhi NCR legal counsel
                </span>
              </motion.div>

              <motion.h1
                id="hero-title"
                className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold text-white tracking-tight leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                Adv. <span className="text-gold-accent">Akash Kumar</span>
              </motion.h1>

              <motion.p
                id="hero-subtitle"
                className="text-lg sm:text-xl md:text-2xl font-serif text-slate-200 tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Advocate | High Court of Delhi & District Courts
              </motion.p>

              <motion.p
                className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Professional legal representation with integrity, dedication, and client-focused solutions. Commited to safeguarding constitutional and legal rights before various judicial forums.
              </motion.p>

              {/* Action CTA Group */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <button
                  id="hero-book-btn"
                  onClick={() => scrollTo('#consultation-section')}
                  className="w-full sm:w-auto px-8 py-4 bg-gold-accent hover:bg-gold-hover text-navy-dark font-poppins font-bold text-sm tracking-wider uppercase rounded-sm shadow-xl transition-all hover:shadow-gold-accent/10 hover:-translate-y-0.5"
                >
                  Book Consultation
                </button>
                <button
                  id="hero-contact-btn"
                  onClick={() => scrollTo('#contact')}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white font-poppins font-bold text-sm tracking-wider uppercase rounded-sm border border-slate-500 hover:border-gold-accent transition-all hover:-translate-y-0.5"
                >
                  Contact Now
                </button>
              </motion.div>
            </div>

            {/* Right Column: Visual highlights badge */}
            <div className="hidden lg:col-span-5 lg:flex justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="glass-card-dark p-8 rounded-lg max-w-xs text-left"
              >
                <h3 className="text-gold-accent font-serif text-xl font-bold mb-4 border-b border-gold-accent/25 pb-2">
                  Our Code of Ethics
                </h3>
                <ul className="space-y-3.5 text-xs text-slate-200">
                  <li className="flex items-start space-x-2.5">
                    <Check className="h-4 w-4 text-gold-accent mt-0.5 shrink-0" />
                    <span>Integrity & Absolute Accountability</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="h-4 w-4 text-gold-accent mt-0.5 shrink-0" />
                    <span>Rigorous Statutory Legal Research</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="h-4 w-4 text-gold-accent mt-0.5 shrink-0" />
                    <span>Confidential Advocate-Client Relations</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="h-4 w-4 text-gold-accent mt-0.5 shrink-0" />
                    <span>Transparent Litigation Fee Policy</span>
                  </li>
                </ul>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ABOUT ME SECTION */}
      <section id="about" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Portrait photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative">
                {/* Gold Frame accent */}
                <div className="absolute -inset-4 rounded-lg border-2 border-gold-accent/40 -z-10 transform translate-x-3 translate-y-3" />
                
                {/* Image tag with referrerPolicy */}
                <img
                  id="adv-profile-photo"
                  src={profilePhoto}
                  alt="Advocate Akash Kumar portrait"
                  className="w-full max-w-[360px] h-auto rounded-md shadow-2xl object-cover object-center border-4 border-white aspect-[3/4]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded dynamic Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-navy-dark text-white p-4 rounded-md shadow-xl border border-gold-accent/30 max-w-[200px]">
                  <div className="flex items-center space-x-2 mb-1">
                    <Gavel className="h-4 w-4 text-gold-accent" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-gold-accent">Delhi Courts</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-tight">
                    Active practitioner before Delhi High Court and various District Courts.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Bio details */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-poppins font-bold uppercase tracking-widest text-gold-accent">
                  Professional Profile
                </span>
                <h2 id="about-title" className="text-3xl md:text-4xl font-serif font-bold text-navy-dark tracking-tight">
                  About Advocate
                </h2>
                <div className="h-1 w-20 bg-gold-accent" />
              </div>

              <div id="about-content" className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p className="font-medium text-slate-800">
                  Adv. Akash Kumar is a practicing Advocate representing clients before the prestigious High Court of Delhi and various District Courts.
                </p>
                <p>
                  He is deeply committed to delivering professional legal services with honesty, transparency, and dedication while ensuring every client's legal rights are effectively protected at every step of litigation.
                </p>
                <p>
                  His judicial approach focuses on thorough legal research, practical advice, strategic litigation preparation, and timely legal solutions. He believes that a great legal representative must be a fierce advocate in court and a steady, objective advisor outside of it.
                </p>
              </div>

              {/* Pillars list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-navy-dark/5 rounded-full text-gold-accent">
                    <Scale className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-poppins font-medium text-slate-800">High Court of Delhi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-navy-dark/5 rounded-full text-gold-accent">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-poppins font-medium text-slate-800">District Courts Representative</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-navy-dark/5 rounded-full text-gold-accent">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-poppins font-medium text-slate-800">Thorough Legal Research</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-navy-dark/5 rounded-full text-gold-accent">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-poppins font-medium text-slate-800">Client-First Transparency</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRACTICE AREAS SECTION */}
      <section id="practice-areas" className="py-24 bg-gray-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-poppins font-bold uppercase tracking-widest text-gold-accent">
              Core Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-dark tracking-tight">
              Practice Areas
            </h2>
            <div className="h-1 w-20 bg-gold-accent mx-auto" />
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Advocate Akash Kumar delivers rigorous and specialized legal solutions across key dimensions of civil, criminal, and regulatory matters.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => {
              const DynamicIcon = iconMap[area.iconName] || Scale;
              return (
                <div
                  key={index}
                  className="practice-area-card bg-white p-8 rounded-lg border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Icon frame */}
                    <div className="inline-flex p-3 bg-navy-dark/5 text-gold-accent rounded-md">
                      <DynamicIcon className="h-6 w-6" />
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-navy-dark">
                      {area.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-xs font-poppins font-semibold text-gold-accent uppercase tracking-widest hover:text-navy-dark cursor-pointer group"
                    onClick={() => {
                      setFormInput(prev => ({ ...prev, practiceArea: area.title }));
                      scrollTo('#consultation-section');
                    }}
                  >
                    <span>Request Advice</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform">→</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. WHY CHOOSE ME SECTION */}
      <section id="why-choose" className="py-24 bg-navy-dark text-white relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-dark/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-poppins font-bold uppercase tracking-widest text-gold-accent">
              Professional Value System
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Why Choose Me
            </h2>
            <div className="h-1 w-20 bg-gold-accent mx-auto" />
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              We operate under the highest professional standards, ensuring our legal process protects your interests and respects the nobility of the legal profession.
            </p>
          </div>

          {/* Cards Grid - 4-6 cards responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseMe.map((item, index) => (
              <div
                key={index}
                className="bg-navy-dark/50 p-8 rounded-lg border border-gold-accent/15 hover:border-gold-accent/40 shadow-xl backdrop-blur-sm hover:bg-navy-dark transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  {/* Gold Checked Icon */}
                  <div className="p-1.5 bg-gold-accent/10 rounded-full text-gold-accent shrink-0 mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-poppins font-semibold text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. SERVICES SECTION */}
      <section id="services" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-poppins font-bold uppercase tracking-widest text-gold-accent">
              Advocacy & Counsel
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-dark tracking-tight">
              Services
            </h2>
            <div className="h-1 w-20 bg-gold-accent mx-auto" />
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Comprehensive and professional legal services tailored to the needs of individuals, families, businesses, and organizations.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const DynamicIcon = iconMap[service.iconName] || Gavel;
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="inline-flex p-3 bg-navy-dark/5 text-gold-accent rounded-md group-hover:bg-navy-dark group-hover:text-gold-accent transition-all duration-300">
                      <DynamicIcon className="h-5 w-5" />
                    </div>
                    
                    <h3 className="text-base font-poppins font-bold text-navy-dark tracking-wide">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. EDUCATION TIMELINE SECTION */}
      <section id="education" className="py-24 bg-gray-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-poppins font-bold uppercase tracking-widest text-gold-accent">
              Academic Background
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-dark tracking-tight">
              Education
            </h2>
            <div className="h-1 w-20 bg-gold-accent mx-auto" />
          </div>

          {/* Elegant timeline cards layout */}
          <div className="max-w-3xl mx-auto relative pl-6 border-l border-gold-accent/35 space-y-12">
            {educationTimeline.map((edu, index) => (
              <div key={index} className="relative">
                {/* Timeline Node Point */}
                <div className="absolute -left-[31px] top-1.5 p-1 bg-[#fcfcfd] rounded-full border-2 border-gold-accent text-gold-accent">
                  <Award className="h-3.5 w-3.5" />
                </div>
                
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300">
                  <span className="text-xs font-mono font-bold text-gold-accent tracking-widest uppercase">
                    {edu.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-navy-dark mt-1">
                    {edu.degree}
                  </h3>
                  <h4 className="text-sm font-poppins font-medium text-slate-600 mt-1">
                    {edu.institution}
                  </h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. CONSULTATION FORM SECTION */}
      <section id="consultation-section" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-poppins font-bold uppercase tracking-widest text-gold-accent">
              Secure Appointment Scheduling
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-dark tracking-tight">
              Consultation Form
            </h2>
            <div className="h-1 w-20 bg-gold-accent mx-auto" />
            <p className="text-slate-500 text-sm">
              Submit your preliminary details below. Your submission is protected by client-attorney confidentiality standards.
            </p>
          </div>

          {/* Card Layout for Form */}
          <div className="bg-gray-50 rounded-lg p-6 md:p-10 border border-slate-200/60 shadow-xl">
            
            <form id="consultation-form" onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name field */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-poppins font-semibold text-navy-dark uppercase tracking-wide">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      placeholder="e.g. Adv Akash Kumar"
                      value={formInput.fullName}
                      onChange={(e) => setFormInput({ ...formInput, fullName: e.target.value })}
                      className={`w-full px-4 py-3 bg-white border rounded-sm text-sm focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent transition-colors ${
                        formErrors.fullName ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {formErrors.fullName && (
                    <span className="text-xs text-red-500 flex items-center space-x-1">
                      <span>•</span> <span>{formErrors.fullName}</span>
                    </span>
                  )}
                </div>

                {/* Phone Number field */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="phoneNumber" className="text-xs font-poppins font-semibold text-navy-dark uppercase tracking-wide">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="e.g. +91 9667336929"
                    value={formInput.phoneNumber}
                    onChange={(e) => setFormInput({ ...formInput, phoneNumber: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-sm text-sm focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent transition-colors ${
                      formErrors.phoneNumber ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.phoneNumber && (
                    <span className="text-xs text-red-500 flex items-center space-x-1">
                      <span>•</span> <span>{formErrors.phoneNumber}</span>
                    </span>
                  )}
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Email field */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="email" className="text-xs font-poppins font-semibold text-navy-dark uppercase tracking-wide">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="e.g. kumarakash46823@gmail.com"
                    value={formInput.email}
                    onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-sm text-sm focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent transition-colors ${
                      formErrors.email ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.email && (
                    <span className="text-xs text-red-500 flex items-center space-x-1">
                      <span>•</span> <span>{formErrors.email}</span>
                    </span>
                  )}
                </div>

                {/* Practice Area Selection */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="practiceArea" className="text-xs font-poppins font-semibold text-navy-dark uppercase tracking-wide">
                    Subject / Matter Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="practiceArea"
                    value={formInput.practiceArea}
                    onChange={(e) => setFormInput({ ...formInput, practiceArea: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-sm text-sm text-slate-700 focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent transition-colors ${
                      formErrors.practiceArea ? 'border-red-500' : 'border-slate-300'
                    }`}
                  >
                    <option value="">-- Select Legal Matter Type --</option>
                    {practiceAreas.map((area) => (
                      <option key={area.title} value={area.title}>
                        {area.title}
                      </option>
                    ))}
                    <option value="Other Legal Issue">Other Legal Matter</option>
                  </select>
                  {formErrors.practiceArea && (
                    <span className="text-xs text-red-500 flex items-center space-x-1">
                      <span>•</span> <span>{formErrors.practiceArea}</span>
                    </span>
                  )}
                </div>

              </div>

              {/* Message field (Optional) */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="message" className="text-xs font-poppins font-semibold text-navy-dark uppercase tracking-wide">
                  Brief Case Summary (Optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Describe key points of your dispute, notice received, or representation required..."
                  value={formInput.message}
                  onChange={(e) => setFormInput({ ...formInput, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="request-consultation-btn"
                disabled={isSubmitting}
                className="w-full py-4 bg-navy-dark hover:bg-slate-900 text-white hover:text-gold-accent font-poppins font-bold text-sm tracking-wider uppercase rounded-sm border border-navy-dark hover:border-gold-accent shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gold-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing Secure Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 text-gold-accent" />
                    <span>Request Consultation</span>
                  </>
                )}
              </button>
            </form>

            {/* Simulated Live Bookings Board - extremely neat and professional for UI validation */}
            {appointments.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h4 className="text-xs font-poppins font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Pending Consultation Inquiries ({appointments.length})</span>
                </h4>
                <div className="space-y-3.5 max-h-48 overflow-y-auto pr-2">
                  {appointments.map((appt, i) => (
                    <div key={i} className="bg-white p-3.5 rounded border border-slate-200 shadow-sm text-xs flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800">{appt.fullName}</p>
                        <p className="text-slate-500 flex items-center space-x-2">
                          <span>{appt.phoneNumber}</span>
                          <span className="text-slate-300">|</span>
                          <span>{appt.email}</span>
                        </p>
                        <p className="text-slate-600 font-medium">Matter: <span className="text-navy-dark">{appt.practiceArea}</span></p>
                      </div>
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 font-semibold uppercase tracking-wider rounded text-[9px] border border-amber-200">
                        Awaiting Schedule
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION WITH GOOGLE MAP EMBED */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Details & Social Links */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-poppins font-bold uppercase tracking-widest text-gold-accent">
                  Immediate Reach
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-dark tracking-tight">
                  Contact Section
                </h2>
                <div className="h-1 w-20 bg-gold-accent" />
              </div>

              {/* Direct Card info */}
              <div className="bg-white rounded-lg p-6 md:p-8 border border-slate-200/70 shadow-lg space-y-6">
                <div>
                  <h3 id="contact-name" className="text-2xl font-serif font-bold text-navy-dark">
                    {contactDetails.name}
                  </h3>
                  <p className="text-sm font-poppins font-medium text-gold-accent mt-0.5">
                    {contactDetails.role}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* MapPin Address */}
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 bg-navy-dark/5 text-gold-accent rounded-full mt-1 shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-poppins font-bold text-slate-500 uppercase tracking-wide">Office Address</p>
                      <p id="contact-address" className="text-sm text-slate-700 font-medium mt-0.5 leading-relaxed">
                        {contactDetails.officeAddress}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 bg-navy-dark/5 text-gold-accent rounded-full mt-1 shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-poppins font-bold text-slate-500 uppercase tracking-wide">Phone Number</p>
                      <a href={`tel:${contactDetails.phone}`} className="text-sm text-navy-dark font-bold mt-0.5 hover:text-gold-accent transition-colors block">
                        {contactDetails.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 bg-navy-dark/5 text-gold-accent rounded-full mt-1 shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-poppins font-bold text-slate-500 uppercase tracking-wide">Email Address</p>
                      <a href={`mailto:${contactDetails.email}`} className="text-sm text-navy-dark font-semibold mt-0.5 hover:text-gold-accent transition-colors block">
                        {contactDetails.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Grid of Contact Actions */}
                <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-100">
                  <a
                    href={`tel:${contactDetails.phone}`}
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-navy-dark text-white rounded font-poppins font-semibold text-xs tracking-wide uppercase hover:bg-slate-900 transition-colors shadow"
                  >
                    <Phone className="h-3.5 w-3.5 text-gold-accent" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-100 text-navy-dark border border-slate-200 rounded font-poppins font-semibold text-xs tracking-wide uppercase hover:bg-slate-200/80 transition-colors shadow"
                  >
                    <Mail className="h-3.5 w-3.5 text-gold-accent" />
                    <span>Email</span>
                  </a>
                  <a
                    href={`https://wa.me/${contactDetails.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-600 text-white rounded font-poppins font-semibold text-xs tracking-wide uppercase hover:bg-emerald-700 transition-colors shadow col-span-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Social media icons if links provided */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-center space-x-6">
                  {contactDetails.socialLinks.linkedin && (
                    <a
                      href={contactDetails.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-navy-dark hover:text-gold-accent transition-all duration-300"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {contactDetails.socialLinks.instagram && (
                    <a
                      href={contactDetails.socialLinks.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-navy-dark hover:text-gold-accent transition-all duration-300"
                      aria-label="Instagram Profile"
                    >
                      <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  )}
                  {contactDetails.socialLinks.facebook && (
                    <a
                      href={contactDetails.socialLinks.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-navy-dark hover:text-gold-accent transition-all duration-300"
                      aria-label="Facebook Profile"
                    >
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                  )}
                </div>

              </div>
            </div>

            {/* Right Column: Google Maps Location Embed */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-poppins font-bold text-slate-500 uppercase tracking-widest block">
                  Office Location
                </span>
                <p className="text-slate-600 text-sm">
                  Visit us at B-121, Pandav Nagar, New Delhi for face-to-face legal consultations. Please call ahead to confirm advocate's availability.
                </p>
              </div>

              {/* Map embed frame container */}
              <div className="map-container relative h-[400px] w-full rounded-lg shadow-xl border border-slate-200 overflow-hidden bg-slate-200">
                <iframe
                  title="Adv. Akash Kumar Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1643906471675!2d77.2831206150824!3d28.624816982420455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb5cfc7929ad%3A0xc644b62fcf67f67b!2sPandav%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110092!5e0!3m2!1sen!2sin!4v1652391039012!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FOOTER & COMPREHENSIVE LINKS */}
      <footer className="bg-navy-dark text-white pt-16 pb-8 border-t border-gold-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800/80">
            
            {/* Column 1: Brand & Subtitle */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <Scale className="h-7 w-7 text-gold-accent" />
                <span className="text-xl font-poppins font-bold tracking-wider uppercase text-white">
                  Adv. Akash Kumar
                </span>
              </div>
              <p className="text-sm font-serif text-slate-300">
                Advocate | High Court of Delhi & District Courts
              </p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Providing specialized legal representation with uncompromising standards of judicial integrity, detailed case work, and dedication to justice.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-poppins font-bold uppercase tracking-wider text-gold-accent">
                Navigational Links
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {navItems.slice(1, 6).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                      className="hover:text-gold-accent transition-colors flex items-center space-x-1.5"
                    >
                      <span>•</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Office info */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-poppins font-bold uppercase tracking-wider text-gold-accent">
                Headquarters
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                B-121, Pandav Nagar,<br />
                New Delhi – 110092
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <p>Phone: <span className="text-slate-200 font-medium">{contactDetails.phone}</span></p>
                <p>Email: <span className="text-slate-200 font-medium">{contactDetails.email}</span></p>
              </div>
            </div>

          </div>

          {/* 12. BAR COUNCIL OF INDIA MANDATORY LEGAL DISCLAIMER */}
          <div className="py-8 border-b border-slate-800/80">
            <div className="bg-navy-dark/80 p-5 rounded border border-gold-accent/20 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 max-w-5xl mx-auto">
              <AlertTriangle className="h-6 w-6 text-gold-accent shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-[10px] font-poppins font-bold tracking-widest text-gold-accent uppercase">
                  Mandatory Legal Disclaimer (Bar Council of India Rule)
                </h5>
                <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed italic">
                  "This website is intended solely for informational purposes and does not constitute solicitation or advertisement as prohibited under the Bar Council of India Rules. By accessing this website, users acknowledge that they are seeking information about the advocate voluntarily. Any materials or inputs gathered on this platform do not establish an attorney-client relationship."
                </p>
              </div>
            </div>
          </div>

          {/* Footer Sub-bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 space-y-4 md:space-y-0">
            <p>
              © 2026 Adv. Akash Kumar. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <button onClick={() => openLegalDocument('privacy')} className="hover:text-gold-accent hover:underline transition-colors focus:outline-none">
                Privacy Policy
              </button>
              <span className="text-slate-700">|</span>
              <button onClick={() => openLegalDocument('terms')} className="hover:text-gold-accent hover:underline transition-colors focus:outline-none">
                Terms & Conditions
              </button>
              <span className="text-slate-700">|</span>
              <button onClick={() => openLegalDocument('disclaimer')} className="hover:text-gold-accent hover:underline transition-colors focus:outline-none">
                Disclaimer
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* 13. FLOATING ACTION PILLS */}
      
      {/* Scroll-to-Top trigger */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 p-3 rounded-full bg-gold-accent text-navy-dark shadow-2xl hover:bg-gold-hover transition-all z-30 border border-navy-dark"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        id="whatsapp-floating-btn"
        href={`https://wa.me/${contactDetails.whatsappNumber.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 p-4 rounded-full bg-emerald-600 text-white shadow-2xl hover:bg-emerald-700 transition-all z-30 flex items-center space-x-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out font-poppins text-xs font-bold uppercase tracking-wider leading-none">
          WhatsApp Adv. Akash
        </span>
      </motion.a>

      {/* Mobile-only Quick Sticky Call Bar */}
      <div className="lg:hidden fixed bottom-6 left-6 z-35">
        <motion.a
          id="mobile-call-floating-btn"
          href={`tel:${contactDetails.phone}`}
          className="p-4 rounded-full bg-navy-dark text-gold-accent border border-gold-accent/40 shadow-2xl hover:bg-navy-dark/95 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone className="h-6 w-6" />
        </motion.a>
      </div>


      {/* 14. COMPREHENSIVE ACTION MODALS */}

      {/* Form Submission Success Dialog */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-navy-dark/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              id="success-modal"
              className="bg-white rounded-lg max-w-md w-full p-6 md:p-8 border-2 border-gold-accent shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  <Check className="h-8 w-8 stroke-[2.5]" />
                </div>

                <h3 className="text-xl md:text-2xl font-serif font-bold text-navy-dark">
                  Consultation Submitted
                </h3>

                <p className="text-xs text-slate-500 font-mono tracking-wider uppercase text-gold-accent">
                  Subject: {appointments[0]?.practiceArea}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you, <strong className="text-slate-800">{appointments[0]?.fullName}</strong>. Your consultation request has been successfully routed.
                </p>

                <div className="bg-slate-50 p-4 rounded-md text-xs text-slate-500 leading-relaxed border border-slate-100 text-left w-full space-y-2">
                  <p className="font-semibold text-slate-700 uppercase tracking-wide text-[10px]">What happens next?</p>
                  <p>1. A copy of this inquiry has been logged in your local browser history.</p>
                  <p>2. Adv. Akash Kumar's team will contact you within 24 working hours at <span className="text-navy-dark font-medium">{appointments[0]?.phoneNumber}</span> or <span className="text-navy-dark font-medium">{appointments[0]?.email}</span>.</p>
                  <p className="italic text-[10px] text-amber-600 flex items-center space-x-1 pt-1 border-t border-slate-200">
                    <span>* Privileged attorney-client confidentiality is actively applied.</span>
                  </p>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 bg-gold-accent hover:bg-gold-hover text-navy-dark font-poppins font-bold text-xs tracking-wider uppercase rounded shadow transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Legal Document Modal (Privacy Policy, Terms, BCI Disclaimer) */}
      <AnimatePresence>
        {modalDocument && (
          <div className="fixed inset-0 bg-navy-dark/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              id="legal-doc-modal"
              className="bg-white rounded-lg max-w-lg w-full p-6 md:p-8 border border-gold-accent/40 shadow-2xl relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <button
                onClick={() => setModalDocument(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                  <Scale className="h-5 w-5 text-gold-accent" />
                  <h3 className="text-xl font-serif font-bold text-navy-dark">
                    {modalDocument.title}
                  </h3>
                </div>

                {/* Content with linebreaks preserved */}
                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed max-h-96 overflow-y-auto pr-2 space-y-3 whitespace-pre-wrap font-sans">
                  {modalDocument.content}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setModalDocument(null)}
                    className="px-5 py-2.5 bg-navy-dark hover:bg-slate-900 text-white font-poppins font-semibold text-xs tracking-wider uppercase rounded"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
