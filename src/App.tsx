import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// ─── SOUND ENGINE ─────────────────────────────────────────────────────────────
const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

function playTone(freq: number, type: OscillatorType = 'sine', duration = 0.08, vol = 0.04) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.start(); osc.stop(audioCtx.currentTime + duration);
  } catch {}
}

function resumeAudio() { audioCtx?.resume(); }

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const SUPPORT_EMAIL = 'support@pandascanpros.in';
const BUSINESS_EMAIL = 'business@pandascanpros.in';
const CONNECT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc-erIeSo8JJYRnlxlb3G5_0M8EWHZnTPLrPyhF6U_XvW3Czw/viewform?usp=header';
const CAREER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScQTWir8AUifF8NB2LF8hBKyJK3lnJ-oTiB-YuEIR25shFOXA/viewform?usp=header';
const LINKEDIN_URL = 'https://www.linkedin.com/company/shakeelpandarise/';
const INSTAGRAM_URL = 'https://www.instagram.com/genpandax_?igsh=MTBxZnV3Z25tandlZA==';

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => { setDone(true); onComplete(); }, 300);
      }
      setProgress(Math.min(p, 100));
    }, 120);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated logo mark */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-12 relative"
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              <defs>
                <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffcc" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              {/* Panda face */}
              <circle cx="40" cy="44" r="26" fill="#111" stroke="url(#lg1)" strokeWidth="1.5" />
              <circle cx="22" cy="22" r="11" fill="#1a1a1a" stroke="url(#lg1)" strokeWidth="1" />
              <circle cx="58" cy="22" r="11" fill="#1a1a1a" stroke="url(#lg1)" strokeWidth="1" />
              <ellipse cx="30" cy="40" rx="9" ry="10" fill="#222" />
              <ellipse cx="50" cy="40" rx="9" ry="10" fill="#222" />
              <circle cx="30" cy="40" r="5" fill="#00ffcc" opacity="0.9" />
              <circle cx="50" cy="40" r="5" fill="#7c3aed" opacity="0.9" />
              <circle cx="32" cy="38" r="2" fill="#000" />
              <circle cx="52" cy="38" r="2" fill="#000" />
              <ellipse cx="40" cy="52" rx="4" ry="2.5" fill="#333" />
              <path d="M 33 57 Q 40 63 47 57" stroke="#444" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ boxShadow: ['0 0 0px #00ffcc00', '0 0 40px #00ffcc66', '0 0 0px #00ffcc00'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-white font-black text-3xl tracking-[0.2em] mb-2">GENPANDAX AI LABS</div>
            <div className="text-[#00ffcc] text-xs font-mono tracking-[0.4em] opacity-60">NEXT-GEN DIGITAL</div>
          </motion.div>

          {/* Progress */}
          <div className="w-64 space-y-3">
            <div className="h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00ffcc] to-[#7c3aed]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-white/30">
              <span>{Math.floor(progress)}%</span>
              <span>LOADING</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener('mousemove', move);

    let raf: number;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Hover effects
    const addHover = () => { ringRef.current?.classList.add('cursor-hover'); };
    const removeHover = () => { ringRef.current?.classList.remove('cursor-hover'); };
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-[#00ffcc] rounded-full pointer-events-none z-[9998] mix-blend-difference" />
      <div ref={ringRef} className="cursor-ring fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[9997] transition-[width,height,border-color] duration-300" />
    </>
  );
}

// ─── THREE.JS HERO SCENE ──────────────────────────────────────────────────────
function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // antialias off on low-end, alpha true for transparent bg
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); // cap at 1x — biggest perf win
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Round particle sprite
    const c2d = document.createElement('canvas');
    c2d.width = 16; c2d.height = 16;
    const cx = c2d.getContext('2d')!;
    const g = cx.createRadialGradient(8, 8, 0, 8, 8, 8);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    cx.fillStyle = g; cx.fillRect(0, 0, 16, 16);
    const sprite = new THREE.CanvasTexture(c2d);

    // 800 particles — enough to look great, low enough to be fast
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color('#00ffcc');
    const c2 = new THREE.Color('#7c3aed');
    const c3 = new THREE.Color('#ffffff');
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 2.5;
      positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.cos(phi);
      const col = Math.random() < 0.4 ? c1 : Math.random() < 0.7 ? c2 : c3;
      colors[i*3] = col.r; colors[i*3+1] = col.g; colors[i*3+2] = col.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.07, map: sprite, vertexColors: true,
      transparent: true, opacity: 0.8, sizeAttenuation: true,
      alphaTest: 0.01, depthWrite: false,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Lower-poly torus knot
    const torusGeo = new THREE.TorusKnotGeometry(1, 0.3, 80, 12);
    const torusMat = new THREE.MeshStandardMaterial({ color: 0x00ffcc, metalness: 0.9, roughness: 0.1 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.12 });
    const wire = new THREE.Mesh(torusGeo, wireMat);
    scene.add(wire);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const point1 = new THREE.PointLight(0x00ffcc, 3, 10);
    point1.position.set(3, 3, 3); scene.add(point1);
    const point2 = new THREE.PointLight(0x7c3aed, 3, 10);
    point2.position.set(-3, -3, 2); scene.add(point2);

    // Mouse — update only on move, no per-frame division
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    gsap.from(torus.scale, { x: 0, y: 0, z: 0, duration: 2, ease: 'elastic.out(1,0.5)', delay: 0.5 });

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Frame-rate cap: render at max 40fps to save GPU
    const timer = new THREE.Timer();
    let raf: number;
    let lastFrame = 0;
    const FPS_CAP = 1000 / 40; // 40fps cap

    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);
      if (now - lastFrame < FPS_CAP) return; // skip frame
      lastFrame = now;

      // Pause rendering when tab hidden
      if (document.hidden) return;

      timer.update();
      const t = timer.getElapsed();

      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;

      torus.rotation.x = t * 0.3 + target.y * 0.5;
      torus.rotation.y = t * 0.4 + target.x * 0.5;
      wire.rotation.copy(torus.rotation);
      particles.rotation.y = t * 0.04;
      particles.rotation.x = target.y * 0.1;

      point1.intensity = 3 + Math.sin(t * 2);
      point2.intensity = 3 + Math.cos(t * 2);

      camera.position.x += (target.x * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (target.y * 0.25 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose(); mat.dispose(); torusGeo.dispose(); torusMat.dispose(); wireMat.dispose(); sprite.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    resumeAudio();
    playTone(440, 'sine', 0.12, 0.05);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
          <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="relative w-8 h-8">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <defs>
                <linearGradient id="navlg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffcc" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <circle cx="40" cy="44" r="26" fill="#111" stroke="url(#navlg)" strokeWidth="2" />
              <circle cx="22" cy="22" r="11" fill="#1a1a1a" stroke="url(#navlg)" strokeWidth="1.5" />
              <circle cx="58" cy="22" r="11" fill="#1a1a1a" stroke="url(#navlg)" strokeWidth="1.5" />
              <ellipse cx="30" cy="40" rx="9" ry="10" fill="#222" />
              <ellipse cx="50" cy="40" rx="9" ry="10" fill="#222" />
              <circle cx="30" cy="40" r="5" fill="#00ffcc" />
              <circle cx="50" cy="40" r="5" fill="#7c3aed" />
              <circle cx="32" cy="38" r="2" fill="#000" />
              <circle cx="52" cy="38" r="2" fill="#000" />
            </svg>
          </motion.div>
          <span className="text-white font-black text-sm tracking-[0.15em] group-hover:text-[#00ffcc] transition-colors duration-300">GENPANDAX AI LABS</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {['about', 'services', 'projects', 'contact'].map((item, i) => (
            <motion.button key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
              onClick={() => scrollTo(item)}
              onMouseEnter={() => { resumeAudio(); playTone(600 + i * 80, 'sine', 0.06, 0.03); }}
              className="text-white/70 hover:text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00ffcc] group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
          <motion.a
            href={CONNECT_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onMouseEnter={() => { resumeAudio(); playTone(880, 'sine', 0.1, 0.04); }}
            onClick={() => { resumeAudio(); playTone(660, 'triangle', 0.15, 0.06); }}
            className="text-xs tracking-[0.2em] uppercase font-bold px-5 py-2.5 border border-white/20 text-white hover:border-[#00ffcc] hover:text-[#00ffcc] transition-all duration-300 rounded-full">
            Get Started
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => { setOpen(o => !o); resumeAudio(); playTone(520, 'sine', 0.08, 0.04); }} className="md:hidden text-white p-2">
          <div className="space-y-1.5">
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="block w-6 h-px bg-white" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="block w-6 h-px bg-white" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="block w-6 h-px bg-white" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
            <div className="px-6 py-8 space-y-6">
              {['about', 'services', 'projects', 'contact'].map((item, i) => (
                <motion.button key={item} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }} onClick={() => scrollTo(item)}
                  className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase font-medium transition-colors duration-300">
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.char');
    gsap.from(chars, {
      y: 120, opacity: 0, rotateX: -90,
      duration: 1, stagger: 0.04,
      ease: 'power4.out', delay: 1.2,
    });
  }, []);

  const words = ['We Build', 'Smart Websites', 'That Grow', 'Your Business'];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D scene */}
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-white/10 rounded-full text-xs tracking-[0.3em] text-white/40 uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
          Next-Generation Digital Agency
        </motion.div>

        {/* Animated title */}
        <div ref={titleRef} className="mb-8 overflow-hidden">
          {words.map((word, wi) => (
            <div key={wi} className="overflow-hidden">
              <div className="flex justify-center flex-wrap">
                {word.split('').map((char, ci) => (
                  <span key={ci} className="char inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none"
                    style={{
                      color: wi === 1 ? 'transparent' : 'white',
                      WebkitTextStroke: wi === 1 ? '1px rgba(255,255,255,0.8)' : '0',
                      marginRight: char === ' ' ? '0.3em' : '0',
                    }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-white/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Cutting-edge websites and intelligent systems that transform businesses in the digital age.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href={CONNECT_URL} target="_blank" rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-white text-black font-bold text-sm tracking-[0.15em] uppercase rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="relative z-10">Start a Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ffcc] to-[#7c3aed] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Start a Project</span>
          </a>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-medium text-sm tracking-[0.15em] uppercase rounded-full transition-all duration-300">
            Explore Work
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        <span className="text-white/20 text-xs tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        gsap.fromTo({ val: 0 }, { val: to }, {
          duration: 1.8, ease: 'power2.out',
          onUpdate: function () { if (el) el.textContent = Math.round(this.targets()[0].val) + suffix; }
        });
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;
    const lines = textRef.current.querySelectorAll('.reveal-line');
    gsap.fromTo(lines,
      { y: 80, opacity: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out', immediateRender: false }
    );
    gsap.fromTo(sectionRef.current.querySelectorAll('.stat-item'),
      { y: 40, opacity: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }, y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.4, immediateRender: false }
    );
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-40 px-6 bg-black overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ffcc]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div ref={textRef}>
            <div className="reveal-line text-[#00ffcc] text-xs tracking-[0.4em] uppercase font-mono mb-8 opacity-80">About Us</div>
            <div className="overflow-hidden mb-4">
              <div className="reveal-line text-5xl sm:text-6xl font-black text-white leading-none">Digital</div>
            </div>
            <div className="overflow-hidden mb-4">
              <div className="reveal-line text-5xl sm:text-6xl font-black leading-none" style={{
                background: 'linear-gradient(135deg, #00ffcc, #7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>Architects</div>
            </div>
            <div className="overflow-hidden mb-10">
              <div className="reveal-line text-5xl sm:text-6xl font-black text-white/20 leading-none">of Tomorrow</div>
            </div>
            <div className="reveal-line text-white/70 text-lg leading-relaxed max-w-lg">
              We're not just developers — we craft digital experiences that push boundaries. From immersive web apps to intelligent business systems, we build the future.
            </div>
            <div className="reveal-line mt-8 text-white/50 text-base leading-relaxed max-w-lg">
              Based in India, we partner with startups and enterprises worldwide to deliver cutting-edge web solutions, business management systems, and digital transformation strategies that drive real results.
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: 50, suffix: '+', label: 'Projects Delivered', color: '#00ffcc' },
                { num: 100, suffix: '%', label: 'Client Satisfaction', color: '#7c3aed' },
                { num: 3, suffix: '+', label: 'Years Experience', color: '#00ffcc' },
                { num: 24, suffix: '/7', label: 'Support Available', color: '#7c3aed' },
              ].map((s, i) => (
                <div key={i}
                  onMouseEnter={() => { resumeAudio(); playTone(400 + i * 100, 'sine', 0.08, 0.03); }}
                  className="stat-item group p-6 border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:border-white/25 hover:scale-[1.03] cursor-default" style={{ transform: 'translateZ(0)' }}>
                  <div className="text-3xl font-black mb-1" style={{ color: s.color }}>
                    <Counter to={s.num} suffix={s.suffix} />
                  </div>
                  <div className="text-white/60 text-xs tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
            {/* Why choose us */}
            <div className="stat-item p-6 border border-white/10 rounded-2xl space-y-3">
              <div className="text-white/80 text-sm font-bold tracking-wider mb-4">WHY CHOOSE US</div>
              {[
                'Custom-built solutions, no templates',
                'Mobile-first, responsive on all devices',
                'SEO optimized from day one',
                'Scalable cloud infrastructure',
                'Dedicated post-launch support',
                'Transparent pricing, no hidden costs',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] shrink-0" />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────
function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll('.service-card'),
      { y: 60, opacity: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', immediateRender: false }
    );
  }, []);

  const services = [
    {
      num: '01', title: 'Web Development', desc: 'Custom, high-performance websites built with React, Next.js, and modern frameworks. From landing pages to complex web applications.',
      tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
      color: '#00ffcc',
    },
    {
      num: '02', title: 'Business Systems', desc: 'Intelligent management systems — CRM, inventory, analytics dashboards — built to scale with your business.',
      tags: ['CRM', 'Analytics', 'Automation', 'Cloud'],
      color: '#7c3aed',
    },
    {
      num: '03', title: 'UI/UX Design', desc: 'Pixel-perfect interfaces with immersive interactions. We design experiences that convert visitors into loyal customers.',
      tags: ['Figma', 'Motion', 'Prototyping', 'Design Systems'],
      color: '#00ffcc',
    },
    {
      num: '04', title: 'Performance & SEO', desc: 'Blazing-fast load times, Core Web Vitals optimization, and SEO strategies that drive organic growth.',
      tags: ['Core Web Vitals', 'SEO', 'CDN', 'Optimization'],
      color: '#7c3aed',
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="relative py-40 px-6 bg-black">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="text-[#00ffcc] text-xs tracking-[0.4em] uppercase font-mono mb-6 opacity-80">Services</div>
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-none">What We Do</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <div key={i}
              onMouseEnter={() => { resumeAudio(); playTone(300 + i * 60, 'triangle', 0.1, 0.03); }}
              className="service-card group relative bg-black p-10 hover:bg-white/[0.02] transition-all duration-300 cursor-default overflow-hidden hover:scale-[1.01]" style={{ transform: 'translateZ(0)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 0%, ${s.color}08, transparent 60%)` }} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-xs font-mono text-white/20 tracking-widest">{s.num}</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:rotate-45 transition-all duration-300">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[#00ffcc] transition-colors duration-300">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag, j) => (
                    <span key={j}
                      className="text-xs px-3 py-1 border border-white/20 text-white/50 rounded-full group-hover:border-white/30 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────
function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll('.project-card'),
      { y: 80, opacity: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', immediateRender: false }
    );
  }, []);

  const projects = [
    {
      title: 'Smart Inventory System',
      sub: 'Advanced Management Platform',
      desc: 'Real-time inventory tracking with automated alerts, intelligent analytics, and cloud integration.',
      tags: ['React', 'Node.js', 'MongoDB'],
      href: 'https://inventory-mangement-lyart.vercel.app/',
      color: '#00ffcc',
      num: '01',
    },
    {
      title: 'PandaNexus Platform',
      sub: 'Business Management Hub',
      desc: 'Sophisticated business platform with advanced analytics, workflow automation, and seamless integrations.',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
      href: 'https://pandanexus.pandascanpros.in/',
      color: '#7c3aed',
      num: '02',
    },
  ];

  return (
    <section ref={sectionRef} id="projects" className="relative py-40 px-6 bg-black overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00ffcc]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="text-[#00ffcc] text-xs tracking-[0.4em] uppercase font-mono mb-6 opacity-80">Work</div>
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-none">Selected Projects</h2>
        </div>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => { resumeAudio(); playTone(500 + i * 120, 'sine', 0.1, 0.03); }}
              onClick={() => { resumeAudio(); playTone(660, 'triangle', 0.15, 0.05); }}
              className="project-card group block relative border border-white/5 hover:border-white/10 rounded-2xl p-10 transition-all duration-300 hover:bg-white/[0.02] overflow-hidden hover:translate-x-1" style={{ transform: 'translateZ(0)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at 100% 50%, ${p.color}06, transparent 60%)` }} />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                <span className="text-xs font-mono text-white/15 tracking-widest shrink-0">{p.num}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-[#00ffcc] transition-colors duration-300 mb-1">{p.title}</h3>
                      <p className="text-white/50 text-xs tracking-wider font-mono">{p.sub}</p>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00ffcc]/40 group-hover:bg-[#00ffcc]/5 group-hover:rotate-45 transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-2xl">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-3 py-1 border border-white/20 text-white/50 rounded-full">{tag}</span>
                    ))}
                    <span className="text-xs px-3 py-1 flex items-center gap-1.5 text-green-400/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll('.contact-reveal'),
      { y: 60, opacity: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', immediateRender: false }
    );
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-40 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ffcc]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center">
        <div className="contact-reveal text-[#00ffcc] text-xs tracking-[0.4em] uppercase font-mono mb-8 opacity-80">
          Contact
        </div>
        <h2 className="contact-reveal text-5xl sm:text-7xl md:text-8xl font-black text-white leading-none mb-8">
          Let's Build<br />
          <span style={{ background: 'linear-gradient(135deg, #00ffcc, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Something
          </span>
        </h2>
        <p className="contact-reveal text-white/60 text-lg max-w-xl mx-auto mb-16 leading-relaxed">
          Ready to transform your business? Let's discuss your project and create something extraordinary together.
        </p>

        <div className="contact-reveal flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <a href={CONNECT_URL} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => { resumeAudio(); playTone(880, 'sine', 0.1, 0.04); }}
            onClick={() => { resumeAudio(); playTone(660, 'triangle', 0.2, 0.06); }}
            className="group relative px-10 py-5 bg-white text-black font-bold text-sm tracking-[0.15em] uppercase rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ffcc] to-[#7c3aed] translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
          </a>
          <a href={CAREER_URL} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => { resumeAudio(); playTone(550, 'sine', 0.1, 0.04); }}
            className="px-10 py-5 border border-white/15 text-white/50 hover:text-white hover:border-white/30 font-medium text-sm tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105">
            Join Our Team
          </a>
        </div>

        {/* Email links */}
        <div className="contact-reveal grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-20">
          {[
            { label: 'Support', email: SUPPORT_EMAIL },
            { label: 'Business', email: BUSINESS_EMAIL },
          ].map((e, i) => (
            <a key={i} href={`mailto:${e.email}`}
              onMouseEnter={() => { resumeAudio(); playTone(440 + i * 80, 'sine', 0.08, 0.03); }}
              className="group p-6 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 text-left hover:bg-white/[0.04] hover:scale-[1.02]" style={{ display: 'block' }}>
              <div className="text-xs text-white/50 tracking-widest uppercase font-mono mb-2">{e.label}</div>
              <div className="text-white/80 group-hover:text-[#00ffcc] text-sm transition-colors duration-300 break-all">{e.email}</div>
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="contact-reveal flex justify-center gap-6">
          {[
            { label: 'LinkedIn', href: LINKEDIN_URL },
            { label: 'Instagram', href: INSTAGRAM_URL },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => { resumeAudio(); playTone(700 + i * 100, 'sine', 0.07, 0.03); }}
              className="text-white/50 hover:text-white hover:-translate-y-0.5 text-xs tracking-[0.3em] uppercase transition-all duration-300 border-b border-white/10 hover:border-white/40 pb-0.5">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white/40 text-xs font-mono tracking-widest">
          © 2025 GENPANDAX AI LABS
        </div>
        <div className="text-white/25 text-xs font-mono tracking-widest">
          NEXT-GEN DIGITAL
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lenis smooth scroll + ScrollTrigger sync
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: true });

    // Sync Lenis scroll position into ScrollTrigger
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      ScrollTrigger.update();
      setScrolled(scroll > 60);
    });

    // Drive Lenis via GSAP ticker so ScrollTrigger sees correct position
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger to use Lenis scroll values
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    // Refresh after everything mounts
    setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      ScrollTrigger.clearScrollMemory();
    };
  }, [loaded]);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Cursor />
        <Nav scrolled={scrolled} />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
