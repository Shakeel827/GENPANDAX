import { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Linkedin, Instagram, ChevronRight, Code, Globe, Database, ExternalLink, Star, Zap, Shield, Rocket, ArrowRight, Play, Sparkles, Brain, Cpu, Network } from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [counters, setCounters] = useState({ projects: 0, clients: 0, experience: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number, opacity: number}>>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const CONNECT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc-erIeSo8JJYRnlxlb3G5_0M8EWHZnTPLrPyhF6U_XvW3Czw/viewform?usp=header';
  const CAREER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScQTWir8AUifF8NB2LF8hBKyJK3lnJ-oTiB-YuEIR25shFOXA/viewform?usp=header';
  const LINKEDIN_URL = 'https://www.linkedin.com/company/shakeelpandarise/';
  const INSTAGRAM_URL = 'https://www.instagram.com/genpandax_?igsh=MTBxZnV3Z25tandlZA==';
  const EMAIL = 'shakeelsk@pandascanpros.in';

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };
    initParticles();
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
        y: particle.y < -10 ? window.innerHeight + 10 : particle.y - particle.speed
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) {
      const animateCounters = () => {
        const duration = 3000;
        const targets = { projects: 50, clients: 100, experience: 3 };
        const startTime = Date.now();
        
        const updateCounters = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          setCounters({
            projects: Math.floor(targets.projects * easeOut),
            clients: Math.floor(targets.clients * easeOut),
            experience: Math.floor(targets.experience * easeOut)
          });
          
          if (progress < 1) {
            requestAnimationFrame(updateCounters);
          }
        };
        
        requestAnimationFrame(updateCounters);
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            if (entry.target.id === 'stats') {
              animateCounters();
              observer.unobserve(entry.target);
            }
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
      const statsElement = document.getElementById('stats');
      if (statsElement) observer.observe(statsElement);
    }
  }, [loading]);

  // World-class futuristic logo
  const FuturisticLogo = () => (
    <div className="relative group cursor-pointer">
      <div className="relative w-12 h-12 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-spin-slow opacity-60"></div>
        
        {/* Middle pulsing ring */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 animate-pulse-ring"></div>
        
        {/* Core hexagon */}
        <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 transform rotate-45 rounded-lg shadow-2xl shadow-cyan-500/50 animate-float-gentle">
          <div className="absolute inset-0.5 bg-black rounded-md transform -rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-sm animate-glow-pulse"></div>
          </div>
        </div>
        
        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-orbit">
          <div className="absolute -top-1 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute inset-0 animate-orbit-reverse">
          <div className="absolute top-1/2 -right-1 w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Energy waves */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping" style={{animationDelay: '0.5s'}}></div>
      </div>
    </div>
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
        {/* Animated background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Floating orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-float-slow-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        {/* Matrix rain effect */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({length: 20}).map((_, i) => (
            <div key={i} className="absolute animate-matrix-rain" style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}>
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Loading content */}
        <div className="text-center space-y-12 relative z-10">
          <div className="relative scale-150">
            <FuturisticLogo />
            <div className="absolute inset-0 animate-ping opacity-25">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              GENPANDAX
            </div>
            <div className="text-gray-300 text-xl font-light tracking-wider animate-fade-in-up">
              Building Tomorrow's Web Today
            </div>
            
            {/* Loading progress */}
            <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-loading-bar"></div>
            </div>
            
            {/* Floating particles */}
            <div className="flex items-center justify-center gap-3">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Scanning lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-horizontal"></div>
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-scan-vertical"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Cursor follower */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mobileMenuOpen ? 1.5 : 1})`
        }}
      ></div>

      {/* Animated particles background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity
            }}
          ></div>
        ))}
      </div>

      {/* Dynamic background layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float-gentle"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-gentle-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-2xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 group animate-slide-in-left">
              <FuturisticLogo />
              <div>
                <div className="text-white font-black text-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                  GENPANDAX
                </div>
                <div className="text-gray-400 text-xs font-medium tracking-wider">Next-Gen Solutions</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              {['Home', 'About', 'Services', 'Projects'].map((item, idx) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())} 
                  className="relative text-gray-300 hover:text-cyan-400 font-medium transition-all duration-300 group animate-fade-in"
                  style={{animationDelay: `${idx * 0.1}s`}}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-500"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </button>
              ))}
              <a
                href={CONNECT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/50 transform hover:-translate-y-1 hover:scale-105 animate-glow-pulse group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 animate-slide-in-right"
            >
              <div className="relative">
                {mobileMenuOpen ? <X size={28} className="animate-spin-in" /> : <Menu size={28} className="animate-fade-in" />}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="bg-black/95 backdrop-blur-2xl border-t border-cyan-500/20">
            <div className="px-4 py-6 space-y-4">
              {['Home', 'About', 'Services', 'Projects'].map((item, idx) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())} 
                  className="block w-full text-left text-gray-300 hover:text-cyan-400 font-medium py-3 transition-all duration-300 hover:translate-x-2 animate-slide-in-left"
                  style={{animationDelay: `${idx * 0.1}s`}}
                >
                  {item}
                </button>
              ))}
              <a
                href={CONNECT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-4 rounded-full font-bold text-center hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 animate-slide-in-left"
                style={{animationDelay: '0.4s'}}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-12 animate-hero-entrance">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full px-6 py-3 text-sm text-cyan-400 backdrop-blur-sm animate-float-gentle group hover:scale-105 transition-transform duration-300">
                <Sparkles size={18} className="animate-spin-slow" />
                <span className="font-medium">Next-Generation Web Solutions</span>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-slide-up" style={{animationDelay: '0.2s'}}>
                  We Build Smart
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-x animate-slide-up" style={{animationDelay: '0.4s'}}>
                  Websites That Run
                </span>
                <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-slide-up" style={{animationDelay: '0.6s'}}>
                  and Grow Your Business
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                Transform your business with cutting-edge websites and intelligent management systems that drive growth, efficiency, and success in the digital age.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '1s'}}>
              <a
                href={CONNECT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 text-xl rounded-full font-bold hover:from-cyan-400 hover:to-purple-500 transition-all duration-500 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/50 transform hover:-translate-y-2 hover:scale-105 flex items-center gap-4 animate-glow-pulse"
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300 animate-bounce-x" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </a>
              
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white px-10 py-5 text-xl rounded-full font-bold hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 flex items-center gap-4 hover:scale-105 transform hover:-translate-y-1"
              >
                <Play size={24} className="group-hover:scale-125 transition-transform duration-300 animate-pulse" />
                <span>View Our Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Animated Stats */}
            <div id="stats" className="grid grid-cols-3 gap-8 pt-20 max-w-3xl mx-auto animate-on-scroll">
              {[
                { value: counters.projects, suffix: '+', label: 'Projects Delivered', gradient: 'from-cyan-400 to-blue-500', delay: '0s' },
                { value: counters.clients, suffix: '%', label: 'Client Satisfaction', gradient: 'from-blue-500 to-purple-600', delay: '0.2s' },
                { value: counters.experience, suffix: '+', label: 'Years Experience', gradient: 'from-purple-600 to-pink-500', delay: '0.4s' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer animate-fade-in-up" style={{animationDelay: stat.delay}}>
                  <div className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500 animate-counter-up`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-gray-400 text-base sm:text-lg font-medium mt-2 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                  <div className={`w-12 h-1 bg-gradient-to-r ${stat.gradient} mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({length: 10}).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-float-random opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 animate-on-scroll">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-full px-6 py-3 text-sm text-purple-400 animate-float-gentle">
                  <Brain size={18} className="animate-pulse" />
                  <span className="font-medium">About GENPANDAX</span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-slide-up">
                    Pioneering the Future of
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                    Digital Innovation
                  </span>
                </h2>
                
                <p className="text-xl text-gray-400 leading-relaxed animate-fade-in-up">
                  We're not just developers – we're digital architects crafting the future of business technology. Our mission is to transform ideas into powerful, scalable solutions that drive real growth and innovation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Rocket, title: 'Innovation First', desc: 'Cutting-edge technology solutions', color: 'cyan' },
                  { icon: Shield, title: 'Reliable & Secure', desc: 'Enterprise-grade security standards', color: 'blue' },
                  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for peak performance', color: 'purple' },
                  { icon: Star, title: 'Premium Quality', desc: 'Exceptional attention to detail', color: 'pink' }
                ].map((item, idx) => (
                  <div key={idx} className={`group p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-${item.color}-500/30 transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in-up hover:shadow-2xl hover:shadow-${item.color}-500/20`} style={{animationDelay: `${idx * 0.1}s`}}>
                    <item.icon className={`text-${item.color}-400 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-float-gentle`} size={28} />
                    <h4 className="font-bold text-white mb-3 text-lg group-hover:text-cyan-400 transition-colors duration-300">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-on-scroll">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-3xl blur-3xl animate-pulse-gentle"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-2xl hover:scale-105 transition-transform duration-500">
                <div className="space-y-8">
                  <h3 className="text-3xl font-black text-white bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    Why Choose GENPANDAX?
                  </h3>
                  <div className="space-y-5">
                    {[
                      'Custom website development with modern frameworks',
                      'Intelligent business management systems',
                      'Scalable cloud-based solutions',
                      'Mobile-first responsive design',
                      'SEO optimization and performance tuning',
                      '24/7 support and maintenance'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 group hover:translate-x-3 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 group-hover:rotate-180 transition-all duration-500">
                          <ChevronRight size={16} className="text-white" />
                        </div>
                        <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full px-6 py-3 text-sm text-blue-400 mb-8 animate-float-gentle">
              <Cpu size={18} className="animate-spin-slow" />
              <span className="font-medium">Our Services</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-slide-up">
                Comprehensive Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Solutions
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              From concept to deployment, we deliver end-to-end solutions that transform your business and drive unprecedented growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Website Development */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 hover:border-cyan-500/50 transition-all duration-700 hover:scale-105 cursor-pointer animate-on-scroll hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-cyan-500/30">
                  <Globe className="text-white animate-float-gentle" size={36} />
                </div>
                
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-cyan-400 transition-colors duration-300">
                  Website Development
                </h3>
                
                <p className="text-gray-400 mb-8 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                  Custom, responsive websites built with cutting-edge technologies. From simple landing pages to complex web applications, we create digital experiences that convert visitors into customers.
                </p>
                
                <div className="space-y-4">
                  {['React & Next.js Development', 'E-commerce Solutions', 'Progressive Web Apps', 'API Integration', 'Performance Optimization'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-2 animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Management Systems */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-700 hover:scale-105 cursor-pointer animate-on-scroll hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-purple-500/30">
                  <Database className="text-white animate-float-gentle" size={36} />
                </div>
                
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-purple-400 transition-colors duration-300">
                  Business Management Systems
                </h3>
                
                <p className="text-gray-400 mb-8 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                  Streamline your operations with intelligent management systems. From inventory tracking to customer relationship management, we build solutions that grow with your business.
                </p>
                
                <div className="space-y-4">
                  {['Inventory Management', 'CRM Systems', 'Analytics Dashboards', 'Workflow Automation', 'Cloud Integration'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-gray-300 hover:text-purple-400 transition-all duration-300 group-hover:translate-x-2 animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-full px-6 py-3 text-sm text-green-400 mb-8 animate-float-gentle">
              <Network size={18} className="animate-pulse" />
              <span className="font-medium">Featured Projects</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-slide-up">
                Our Latest
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Masterpieces
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Explore our portfolio of cutting-edge projects that showcase our expertise, innovation, and commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Inventory Management System */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-700 hover:scale-105 animate-on-scroll hover:shadow-2xl hover:shadow-cyan-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 p-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-cyan-500/30">
                    <Database className="text-white animate-float-gentle" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300">
                      Smart Inventory System
                    </h3>
                    <p className="text-gray-400 text-sm font-medium tracking-wider">Advanced Management Platform</p>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-8 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                  A comprehensive inventory management system with real-time tracking, automated alerts, and intelligent analytics. Built with modern React architecture and cloud integration for maximum scalability.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {['React', 'Node.js', 'MongoDB', 'Real-time Analytics'].map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30 font-medium hover:bg-cyan-500/30 hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a
                  href="https://inventory-mangement-lyart.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold hover:from-cyan-400 hover:to-blue-500 transition-all duration-500 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/50 transform hover:-translate-y-2 group-hover:scale-110 animate-glow-pulse"
                >
                  <ExternalLink size={20} className="animate-bounce-x" />
                  <span>View Live Project</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </div>
              
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">LIVE</span>
              </div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-border-flow"></div>
              </div>
            </div>

            {/* PandaNexus Platform */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-700 hover:scale-105 animate-on-scroll hover:shadow-2xl hover:shadow-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 p-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-purple-500/30">
                    <Globe className="text-white animate-float-gentle" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors duration-300">
                      PandaNexus Platform
                    </h3>
                    <p className="text-gray-400 text-sm font-medium tracking-wider">Business Management Hub</p>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-8 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                  A sophisticated business management platform featuring advanced analytics, workflow automation, and seamless integrations. Designed for scalability, performance, and user experience excellence.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {['Next.js', 'TypeScript', 'PostgreSQL', 'Cloud Infrastructure'].map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30 font-medium hover:bg-purple-500/30 hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a
                  href="https://pandanexus.pandascanpros.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold hover:from-purple-400 hover:to-pink-500 transition-all duration-500 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/50 transform hover:-translate-y-2 group-hover:scale-110 animate-glow-pulse"
                >
                  <ExternalLink size={20} className="animate-bounce-x" />
                  <span>View Live Project</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </div>
              
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">LIVE</span>
              </div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-400 to-pink-500 animate-border-flow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-on-scroll">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full px-6 py-3 text-sm text-cyan-400 mb-8 animate-float-gentle">
              <Rocket size={18} className="animate-bounce" />
              <span className="font-medium">Ready to Start?</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-slide-up">
                Let's Build Something
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Extraordinary Together
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
              Transform your vision into reality with our cutting-edge web solutions and business management systems. The future starts now.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
              <a
                href={CONNECT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 text-xl rounded-full font-bold hover:from-cyan-400 hover:to-purple-500 transition-all duration-500 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/50 transform hover:-translate-y-2 hover:scale-105 flex items-center gap-4 animate-glow-pulse"
              >
                <Mail size={24} className="animate-bounce-x" />
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </a>
              
              <a
                href={CAREER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white px-10 py-5 text-xl rounded-full font-bold hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 flex items-center gap-4 hover:scale-105 transform hover:-translate-y-1"
              >
                <span>Join Our Team</span>
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center space-x-4">
                <FuturisticLogo />
                <div>
                  <div className="font-black text-2xl bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    GENPANDAX
                  </div>
                  <div className="text-gray-400 text-xs font-medium tracking-wider">Next-Gen Solutions</div>
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed text-lg">
                Building the future of web technology with innovative solutions that drive business growth and digital transformation across industries.
              </p>
              
              <div className="flex gap-4">
                {[
                  { href: LINKEDIN_URL, icon: Linkedin, color: 'cyan' },
                  { href: INSTAGRAM_URL, icon: Instagram, color: 'purple' },
                  { href: `mailto:${EMAIL}`, icon: Mail, color: 'blue' }
                ].map((social, idx) => (
                  <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-${social.color}-500/20 hover:border-${social.color}-500/30 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 animate-fade-in-up`} style={{animationDelay: `${idx * 0.1}s`}}>
                    <social.icon size={24} className={`text-gray-400 hover:text-${social.color}-400 transition-colors duration-300`} />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h4 className="font-black text-xl text-white">Quick Links</h4>
              <div className="space-y-4">
                {['Home', 'About', 'Services', 'Projects'].map((item, idx) => (
                  <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 font-medium animate-fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <h4 className="font-black text-xl text-white">Get In Touch</h4>
              <div className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  Email: <a href={`mailto:${EMAIL}`} className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-medium">{EMAIL}</a>
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Ready to transform your business? Let's discuss your project and create something amazing together that will revolutionize your industry.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 text-center animate-fade-in-up">
            <p className="text-gray-400 text-lg">
              &copy; 2025 GENPANDAX. All rights reserved. Built with passion for innovation and excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;