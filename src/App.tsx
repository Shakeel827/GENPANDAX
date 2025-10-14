import { useState, useEffect } from 'react';
import { Menu, X, Mail, Linkedin, Instagram, ChevronRight, Code, Megaphone, Headphones, Users, Target, Zap } from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const CONNECT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc-erIeSo8JJYRnlxlb3G5_0M8EWHZnTPLrPyhF6U_XvW3Czw/viewform?usp=header';
  const CAREER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScQTWir8AUifF8NB2LF8hBKyJK3lnJ-oTiB-YuEIR25shFOXA/viewform?usp=header';
  const LINKEDIN_URL = 'https://www.linkedin.com/company/shakeelpandarise/';
  const INSTAGRAM_URL = 'https://www.instagram.com/genpandax_?igsh=MTBxZnV3Z25tandlZA==';
  const EMAIL = 'shakeelsk@pandascanpros.in';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const LogoComponent = () => (
    <div className="flex items-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-white rounded-full border-2 border-[#F57C00] flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-10 h-10">
            <circle cx="50" cy="45" r="15" fill="#1A2E46" />
            <circle cx="43" cy="42" r="3" fill="white" />
            <circle cx="57" cy="42" r="3" fill="white" />
            <path d="M 35 50 Q 50 58 65 50" stroke="#1A2E46" strokeWidth="2" fill="none" />
            <circle cx="50" cy="35" r="20" fill="none" stroke="#F57C00" strokeWidth="2" />
            <path d="M 45 25 L 50 20 L 55 25" fill="#F57C00" />
            <circle cx="50" cy="70" r="18" fill="#1A2E46" opacity="0.3" />
            <ellipse cx="50" cy="75" rx="12" ry="8" fill="#1A2E46" opacity="0.4" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#F57C00] rounded transform rotate-12 flex items-center justify-center">
          <div className="w-4 h-3 bg-[#1A2E46] rounded-sm"></div>
        </div>
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
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center space-y-8">
          <div className="relative">
            <LogoComponent />
            <div className="absolute inset-0 animate-ping opacity-25">
              <div className="w-12 h-12 bg-[#F57C00] rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-2xl font-bold text-[#1A2E46] animate-fade-in">GENPANDAX</div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-[#F57C00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#F57C00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#F57C00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <LogoComponent />
              <div>
                <div className="text-[#1A2E46] font-bold text-xl">GENPANDAX</div>
                <div className="text-[#F57C00] text-xs font-semibold">Next-Gen Jobs, With GENPANDAX.</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-[#1A2E46] hover:text-[#F57C00] font-medium transition">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-[#1A2E46] hover:text-[#F57C00] font-medium transition">About</button>
              <button onClick={() => scrollToSection('services')} className="text-[#1A2E46] hover:text-[#F57C00] font-medium transition">Services</button>
              <button onClick={() => scrollToSection('team')} className="text-[#1A2E46] hover:text-[#F57C00] font-medium transition">Team</button>
              <a
                href={CONNECT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F57C00] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#E65100] transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Connect
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#1A2E46]"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-[#1A2E46] hover:text-[#F57C00] font-medium py-2">Home</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-[#1A2E46] hover:text-[#F57C00] font-medium py-2">About</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-[#1A2E46] hover:text-[#F57C00] font-medium py-2">Services</button>
              <button onClick={() => scrollToSection('team')} className="block w-full text-left text-[#1A2E46] hover:text-[#F57C00] font-medium py-2">Team</button>
              <a
                href={CONNECT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#F57C00] text-white px-6 py-2.5 rounded-full font-semibold text-center hover:bg-[#E65100] transition"
              >
                Connect
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A2E46] via-[#243B55] to-[#1A2E46] overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#F57C00] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F57C00] rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white space-y-4 sm:space-y-6 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Empowering Business with <span className="text-[#F57C00]">Digital, IT & Outsourcing</span> Solutions
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300">
                Next-generation consulting services powered by 15+ professionals in BPO delivering innovation, reliability, and client success.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href={CONNECT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F57C00] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full font-semibold hover:bg-[#E65100] transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-2 animate-glow"
                >
                  Get Started <ChevronRight size={20} />
                </a>
                <button
                  onClick={() => scrollToSection('services')}
                  className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full font-semibold hover:bg-white/20 transition border border-white/30 transform hover:scale-105"
                >
                  Our Services
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-[#F57C00] rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl animate-slide-up">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div className="bg-white/20 p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer">
                      <Code className="text-[#F57C00] mb-1 sm:mb-2" size={24} />
                      <div className="text-white font-bold text-xl sm:text-2xl">15+</div>
                      <div className="text-gray-300 text-xs sm:text-sm">in BPO</div>
                    </div>
                    <div className="bg-white/20 p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer">
                      <Target className="text-[#F57C00] mb-1 sm:mb-2" size={24} />
                      <div className="text-white font-bold text-xl sm:text-2xl">100%</div>
                      <div className="text-gray-300 text-xs sm:text-sm">Dedication</div>
                    </div>
                    <div className="bg-white/20 p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer">
                      <Zap className="text-[#F57C00] mb-1 sm:mb-2" size={24} />
                      <div className="text-white font-bold text-xl sm:text-2xl">Fast</div>
                      <div className="text-gray-300 text-xs sm:text-sm">Delivery</div>
                    </div>
                    <div className="bg-white/20 p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer">
                      <Users className="text-[#F57C00] mb-1 sm:mb-2" size={24} />
                      <div className="text-white font-bold text-xl sm:text-2xl">24/7</div>
                      <div className="text-gray-300 text-xs sm:text-sm">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2E46] mb-4">About GENPANDAX</h2>
            <div className="w-24 h-1 bg-[#F57C00] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A2E46]">Innovating the Future of Business</h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                GENPANDAX Consulting is a fast-growing startup revolutionizing how businesses approach technology, marketing, and operations. With a talented team of over <span className="font-bold text-[#F57C00]">15+ professionals in BPO</span>, we bring innovation, reliability, and expertise to every project.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Our mission is simple: <span className="font-semibold">empower businesses to thrive in the digital age</span>. We combine cutting-edge technology with creative strategies to deliver measurable results. From building powerful software solutions to crafting compelling digital campaigns, we're your partner in growth.
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
                <div className="text-center p-2 sm:p-4 hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-2xl sm:text-3xl font-bold text-[#F57C00]">15+</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Professionals</div>
                </div>
                <div className="text-center p-2 sm:p-4 hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-2xl sm:text-3xl font-bold text-[#F57C00]">3</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Core Services</div>
                </div>
                <div className="text-center p-2 sm:p-4 hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-2xl sm:text-3xl font-bold text-[#F57C00]">100%</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Client Focus</div>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="bg-gradient-to-br from-[#1A2E46] to-[#243B55] p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow">
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Why Choose Us?</h4>
                <div className="space-y-4">
                  {[
                    'Experienced team of 15+ professionals in BPO',
                    'End-to-end solutions for IT, Marketing & BPO',
                    'Innovation-driven approach',
                    'Reliable and timely delivery',
                    'Client success as our priority',
                    '24/7 support and maintenance'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3 hover:translate-x-2 transition-transform">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#F57C00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <ChevronRight size={14} className="text-white" />
                      </div>
                      <p className="text-gray-200 text-sm sm:text-base">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2E46] mb-4">Our Services</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">Comprehensive solutions tailored to your business needs</p>
            <div className="w-24 h-1 bg-[#F57C00] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Digital Marketing */}
            <div className="group bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#F57C00] hover:-translate-y-2 animate-fade-in">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F57C00] to-[#FF9800] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
                <Megaphone className="text-white" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A2E46] mb-3 sm:mb-4">Digital Marketing</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Creative strategies that amplify your brand and drive growth through powerful digital campaigns.</p>
              <ul className="space-y-2 sm:space-y-3">
                {['SEO Optimization', 'Social Media Marketing', 'Google & Facebook Ads', 'Content Marketing', 'Brand Strategy', 'Analytics & Reporting'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base hover:text-[#F57C00] transition-colors">
                    <div className="w-1.5 h-1.5 bg-[#F57C00] rounded-full flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* IT Services */}
            <div className="group bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#F57C00] hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#1A2E46] to-[#243B55] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
                <Code className="text-white" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A2E46] mb-3 sm:mb-4">IT Services</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Cutting-edge technology solutions built by expert engineers to power your digital transformation.</p>
              <ul className="space-y-2 sm:space-y-3">
                {['Web Development', 'Mobile App Development', 'Software Development', 'Cloud Solutions', 'IT Infrastructure', 'Technical Support'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base hover:text-[#1A2E46] transition-colors">
                    <div className="w-1.5 h-1.5 bg-[#1A2E46] rounded-full flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* BPO Services */}
            <div className="group bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#F57C00] hover:-translate-y-2 animate-fade-in sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F57C00] to-[#FF9800] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
                <Headphones className="text-white" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A2E46] mb-3 sm:mb-4">BPO Services</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Efficient outsourcing solutions that streamline operations and enhance customer experience.</p>
              <ul className="space-y-2 sm:space-y-3">
                {['Customer Support', 'Technical Help Desk', 'Data Entry Services', 'Tele-calling', 'Back Office Support', 'Virtual Assistance'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base hover:text-[#F57C00] transition-colors">
                    <div className="w-1.5 h-1.5 bg-[#F57C00] rounded-full flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A2E46] to-[#243B55] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#F57C00] rounded-full blur-3xl animate-float"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Our Expert Team</h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">Meet the talented professionals driving innovation at GENPANDAX</p>
            <div className="w-24 h-1 bg-[#F57C00] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {[
              { role: 'Full-Stack Developers', count: '5+', icon: Code, skills: ['React, Node.js, Python'] },
              { role: 'Mobile App Developers', count: '3+', icon: Code, skills: ['iOS, Android, React Native'] },
              { role: 'Digital Marketers', count: '3+', icon: Megaphone, skills: ['SEO, SEM, Social Media'] },
              { role: 'Cloud Engineers', count: '2+', icon: Code, skills: ['AWS, Azure, DevOps'] },
              { role: 'BPO Specialists', count: '2+', icon: Headphones, skills: ['Customer Support, Data Entry'] },
              { role: 'UI/UX Designers', count: '2+', icon: Code, skills: ['Figma, Adobe XD, Prototyping'] }
            ].map((team, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer animate-fade-in">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F57C00] rounded-lg sm:rounded-xl flex items-center justify-center">
                    <team.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{team.count}</div>
                    <div className="text-[#F57C00] font-semibold text-sm sm:text-base">{team.role}</div>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm">{team.skills.join(', ')}</div>
              </div>
            ))}
          </div>

          <div className="text-center bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/20 animate-slide-up">
            <Users className="text-[#F57C00] mx-auto mb-3 sm:mb-4" size={40} />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Join Our Growing Team</h3>
            <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 max-w-2xl mx-auto">
              We're always looking for talented professionals to join our mission of empowering businesses with innovative solutions.
            </p>
            <a
              href={CAREER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F57C00] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full font-semibold hover:bg-[#E65100] transition shadow-lg hover:scale-105 transform animate-glow"
            >
              <Mail size={20} />
              Career Inquiries
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2E46] mb-4 sm:mb-6">Ready to Transform Your Business?</h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's discuss how GENPANDAX can help you achieve your goals with our IT, Digital Marketing, and BPO solutions.
          </p>
          <a
            href={CONNECT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 bg-[#F57C00] text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-full font-bold hover:bg-[#E65100] transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1 animate-glow"
          >
            <Mail size={24} />
            Connect with Us
            <ChevronRight size={24} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A2E46] text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <LogoComponent />
                <div>
                  <div className="font-bold text-lg">GENPANDAX</div>
                  <div className="text-[#F57C00] text-xs">Next-Gen Jobs, With GENPANDAX.</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering businesses with innovative IT, Digital Marketing, and BPO solutions.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-[#F57C00] transition">Home</button>
                <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-[#F57C00] transition">About Us</button>
                <button onClick={() => scrollToSection('services')} className="block text-gray-400 hover:text-[#F57C00] transition">Services</button>
                <button onClick={() => scrollToSection('team')} className="block text-gray-400 hover:text-[#F57C00] transition">Our Team</button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
              <p className="text-gray-400 text-sm mb-4">
                Email: <a href={`mailto:${EMAIL}`} className="text-[#F57C00] hover:underline">{EMAIL}</a>
              </p>
              <div className="flex gap-4">
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F57C00] transition transform hover:scale-110 hover:rotate-12">
                  <Linkedin size={20} />
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F57C00] transition transform hover:scale-110 hover:rotate-12">
                  <Instagram size={20} />
                </a>
                <a href={`mailto:${EMAIL}`} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F57C00] transition transform hover:scale-110 hover:rotate-12">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 GENPANDAX Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
