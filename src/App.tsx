import { useEffect, useRef, useState, useCallback } from 'react';
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
const LINKEDIN_URL = 'https://www.linkedin.com/company/shakeelpandarise/';
const INSTAGRAM_URL = 'https://www.instagram.com/genpandax_?igsh=MTBxZnV3Z25tandlZA==';
const FORM_PROJECT = 'xdapebda';
const FORM_CAREER  = 'xreopjkn';

// ─── SERVICE DETAIL DATA ──────────────────────────────────────────────────────
const SERVICE_DETAILS = [
  {
    num: '01', title: 'Web Development', color: '#00ffcc',
    tagline: 'Blazing-fast, conversion-optimised websites',
    overview: 'We engineer custom web experiences from the ground up — no templates, no shortcuts. Every pixel is intentional, every interaction is smooth, and every page loads in under a second. Companies with high-performing websites generate significantly more inbound leads and recover their full investment within 12–18 months.',
    problems: [
      { icon: '🐌', title: 'Slow Load Times', desc: '53% of visitors abandon a site that takes over 3 seconds to load. Every 0.1s delay costs you 8.4% in conversions.' },
      { icon: '📉', title: 'Low Conversions', desc: 'Template sites convert at 1–2%. Custom-built experiences with clear CTAs and fast UX convert at 5–12%.' },
      { icon: '📱', title: 'Not Mobile-Ready', desc: '60%+ of traffic is mobile. A non-responsive site loses more than half your audience before they even read a word.' },
      { icon: '🔍', title: 'Invisible on Google', desc: 'Without technical SEO baked in from day one, your site won\'t rank — no matter how good it looks.' },
    ],
    solutions: [
      { title: 'React / Next.js Architecture', desc: 'Server-side rendering, static generation, and edge caching for sub-second load times globally.' },
      { title: 'Conversion-First Design', desc: 'Every layout decision is driven by user psychology — where eyes go, what drives clicks, what builds trust.' },
      { title: 'Mobile-First Development', desc: 'Built for phones first, then scaled up. Fluid layouts, touch-optimised interactions, fast on 4G.' },
      { title: 'SEO-Ready from Day 1', desc: 'Semantic HTML, structured data, meta strategy, and Core Web Vitals baked into every build.' },
    ],
    metrics: [
      { label: 'Avg Load Time', value: '0.8s', sub: 'vs 3.2s industry avg' },
      { label: 'Lighthouse Score', value: '98/100', sub: 'Performance' },
      { label: 'Conversion Lift', value: '+340%', sub: 'vs old site' },
      { label: 'Bounce Rate Drop', value: '-62%', sub: 'after redesign' },
    ],
    dashboard: [
      { label: 'Page Speed', value: 98, unit: '/100', color: '#00ffcc' },
      { label: 'SEO Score', value: 96, unit: '/100', color: '#7c3aed' },
      { label: 'Accessibility', value: 94, unit: '/100', color: '#00ffcc' },
      { label: 'Best Practices', value: 100, unit: '/100', color: '#7c3aed' },
    ],
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel', 'Cloudflare'],
    timeline: [
      { week: 'Week 1–2', task: 'Discovery, wireframes & tech planning' },
      { week: 'Week 3–5', task: 'UI design & component development' },
      { week: 'Week 6–7', task: 'Integration, testing & performance tuning' },
      { week: 'Week 8', task: 'Launch, monitoring & handover' },
    ],
    process: [
      { step: '01', title: 'Discovery', desc: 'Deep-dive into your business goals, audience, and competitors. We map user journeys before writing a single line of code.' },
      { step: '02', title: 'Architecture', desc: 'Plan tech stack, routing, CMS, and performance strategy. We choose tools that scale with your business.' },
      { step: '03', title: 'Design & Build', desc: 'Pixel-perfect UI built in React/Next.js with animations, accessibility, and mobile-first responsiveness.' },
      { step: '04', title: 'Launch & Optimise', desc: 'Deploy to edge CDN, monitor real user metrics, and iterate based on data — not guesses.' },
    ],
    caseStudy: {
      client: 'E-Commerce Brand',
      challenge: 'Their Shopify template was slow (4.2s load), had a 78% bounce rate, and converted at 0.9%.',
      result: 'Rebuilt as a custom Next.js app with optimised checkout flow and product pages. Revenue increased 3.4× in 90 days.',
      stats: [{ k: 'Revenue Growth', v: '340%' }, { k: 'Page Speed', v: '0.6s' }, { k: 'Conversion Rate', v: '4.8%' }, { k: 'Bounce Rate', v: '-62%' }],
    },
    faqs: [
      { q: 'How long does a website take?', a: 'A standard business site takes 4–6 weeks. Complex web apps take 8–16 weeks depending on features.' },
      { q: 'Do you work with existing brands?', a: 'Yes. We can work within your existing brand guidelines or help you evolve them.' },
      { q: 'Will I be able to update content myself?', a: 'Absolutely. We integrate headless CMS options like Sanity or Contentful so your team can update without touching code.' },
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  },
  {
    num: '02', title: 'Business Systems', color: '#7c3aed',
    tagline: 'Intelligent systems that run your operations',
    overview: 'From CRM to inventory to analytics dashboards — we build the internal tools that give your team superpowers. Businesses earn an average of $8.71 for every $1 spent on CRM, and companies using automation save 5–10 hours per week per employee. We build systems that pay for themselves.',
    problems: [
      { icon: '📊', title: 'Data Scattered Everywhere', desc: 'Your team uses 6 different tools that don\'t talk to each other. Decisions are made on gut feel, not data.' },
      { icon: '🔁', title: 'Manual Repetitive Work', desc: 'Hours wasted on copy-pasting, manual reports, and chasing updates. Automation can reclaim 18+ hours/week.' },
      { icon: '📦', title: 'Inventory Chaos', desc: 'Overselling, stockouts, and no real-time visibility. Every mistake costs money and customer trust.' },
      { icon: '👥', title: 'No Customer Intelligence', desc: 'You don\'t know who your best customers are, when they\'re likely to churn, or what they actually want.' },
    ],
    solutions: [
      { title: 'Unified CRM Dashboard', desc: 'One place for all customer data — interactions, deals, support tickets, and revenue history. 29% avg revenue increase after CRM adoption.' },
      { title: 'Workflow Automation', desc: 'Automate follow-ups, invoicing, inventory alerts, and reporting. AI-powered CRM tools cut 2 hours of manual work per day per rep.' },
      { title: 'Real-Time Analytics', desc: 'Live dashboards showing revenue, pipeline, inventory levels, and team performance. Make decisions in seconds, not days.' },
      { title: 'System Integrations', desc: 'Connect everything — WhatsApp, Slack, Google Sheets, Razorpay, Shiprocket, Tally — into one intelligent hub.' },
    ],
    metrics: [
      { label: 'Time Saved', value: '18hrs/wk', sub: 'per team member' },
      { label: 'CRM ROI', value: '$8.71', sub: 'per $1 invested' },
      { label: 'Revenue Lift', value: '+29%', sub: 'avg after CRM' },
      { label: 'Error Reduction', value: '-94%', sub: 'vs manual process' },
    ],
    dashboard: [
      { label: 'Revenue Growth', value: 87, unit: '%', color: '#7c3aed' },
      { label: 'Automation Rate', value: 94, unit: '%', color: '#00ffcc' },
      { label: 'Data Accuracy', value: 99, unit: '%', color: '#7c3aed' },
      { label: 'Team Efficiency', value: 78, unit: '%', color: '#00ffcc' },
    ],
    tools: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Razorpay', 'WhatsApp API', 'Google Sheets API', 'AWS'],
    timeline: [
      { week: 'Week 1', task: 'Workflow audit & requirements mapping' },
      { week: 'Week 2–3', task: 'Database design & API architecture' },
      { week: 'Week 4–6', task: 'Dashboard build & integrations' },
      { week: 'Week 7–8', task: 'Testing, training & go-live' },
    ],
    process: [
      { step: '01', title: 'Workflow Audit', desc: 'We map every process your team does manually. We find the bottlenecks, the duplications, and the money leaks.' },
      { step: '02', title: 'System Design', desc: 'Design data models, APIs, and automation logic. We architect for scale — not just today\'s needs.' },
      { step: '03', title: 'Build & Integrate', desc: 'Connect with your existing tools — Slack, Sheets, WhatsApp, payment gateways, and logistics APIs.' },
      { step: '04', title: 'Train & Scale', desc: 'Onboard your team with documentation and training. Then scale features as your business grows.' },
    ],
    caseStudy: {
      client: 'Logistics Company (50 employees)',
      challenge: 'Managing 200+ daily shipments across 4 spreadsheets. 3 hours/day lost to manual status updates and customer calls.',
      result: 'Built a real-time operations dashboard with automated WhatsApp notifications. Team saves 18 hours/week. Customer complaints dropped 71%.',
      stats: [{ k: 'Hours Saved/Wk', v: '18hrs' }, { k: 'ROI', v: '8.2×' }, { k: 'Complaints', v: '-71%' }, { k: 'Payback Period', v: '6 weeks' }],
    },
    faqs: [
      { q: 'Can you integrate with our existing software?', a: 'Yes. We integrate with Tally, Zoho, Razorpay, Shiprocket, WhatsApp Business, Google Workspace, and most REST APIs.' },
      { q: 'Is our data secure?', a: 'All systems are built with role-based access control, encrypted storage, and regular automated backups.' },
      { q: 'What if our needs change?', a: 'We build modular systems. Adding new features or workflows is straightforward — no rebuilding from scratch.' },
    ],
    tags: ['CRM', 'Analytics', 'Automation', 'Cloud'],
  },
  {
    num: '03', title: 'UI/UX Design', color: '#00ffcc',
    tagline: 'Interfaces that convert visitors into customers',
    overview: 'Great design is invisible — users just feel it. Every $1 invested in UX returns up to $100 in revenue (Forrester Research). A well-executed UI can boost conversion rates by 200%, while superior UX can push that to 400%. We design experiences that guide users naturally toward action.',
    problems: [
      { icon: '😤', title: 'Users Get Confused', desc: '86% of consumers abandon a brand after just two bad experiences. Confusing navigation is the #1 reason.' },
      { icon: '🛒', title: 'Cart Abandonment', desc: '44% of shoppers abandon purchases because the site is hard to navigate or unattractive. Design is revenue.' },
      { icon: '📞', title: 'Too Many Support Tickets', desc: 'Poor UX generates 3× more support requests. Better design means fewer questions and lower support costs.' },
      { icon: '🎨', title: 'Inconsistent Brand', desc: 'No design system means every page looks different. Users lose trust when the experience feels disjointed.' },
    ],
    solutions: [
      { title: 'User Research & Testing', desc: 'We interview real users, run heatmap analysis, and conduct usability tests before designing a single screen.' },
      { title: 'Conversion-Optimised Flows', desc: 'Every user journey is mapped and optimised — from landing to checkout, signup to activation.' },
      { title: 'Design System Creation', desc: 'A complete component library that keeps your product consistent, speeds up development, and scales with your team.' },
      { title: 'Motion & Micro-interactions', desc: 'Subtle animations that guide attention, confirm actions, and make your product feel premium and alive.' },
    ],
    metrics: [
      { label: 'UX ROI', value: '$100', sub: 'per $1 invested (Forrester)' },
      { label: 'Conversion Lift', value: '+400%', sub: 'superior UX impact' },
      { label: 'Support Tickets', value: '-71%', sub: 'clearer UX' },
      { label: 'User Retention', value: '+210%', sub: 'after redesign' },
    ],
    dashboard: [
      { label: 'Task Completion', value: 94, unit: '%', color: '#00ffcc' },
      { label: 'User Satisfaction', value: 91, unit: '%', color: '#7c3aed' },
      { label: 'Conversion Rate', value: 76, unit: '%↑', color: '#00ffcc' },
      { label: 'Error Rate Drop', value: 88, unit: '%', color: '#7c3aed' },
    ],
    tools: ['Figma', 'FigJam', 'Framer', 'Lottie', 'Hotjar', 'Maze', 'Storybook', 'Zeroheight'],
    timeline: [
      { week: 'Week 1', task: 'User research, interviews & competitor audit' },
      { week: 'Week 2', task: 'Information architecture & wireframes' },
      { week: 'Week 3–4', task: 'High-fidelity designs & design system' },
      { week: 'Week 5', task: 'Prototype testing, iteration & dev handoff' },
    ],
    process: [
      { step: '01', title: 'Research', desc: 'User interviews, heatmaps, session recordings, and competitor analysis. We design from evidence, not assumptions.' },
      { step: '02', title: 'Wireframes', desc: 'Low-fidelity flows to validate structure and user journeys before investing in visual design.' },
      { step: '03', title: 'High-Fidelity Design', desc: 'Full Figma designs with motion specs, design tokens, and a complete component library.' },
      { step: '04', title: 'Handoff & QA', desc: 'Developer handoff with annotated specs, assets, and a pixel-perfect implementation review.' },
    ],
    caseStudy: {
      client: 'SaaS Startup (B2B)',
      challenge: 'Onboarding took 14 steps. 73% of trial users dropped off before completing setup. Support was overwhelmed.',
      result: 'Redesigned onboarding to 5 steps with contextual tooltips and progress indicators. Trial-to-paid conversion jumped from 8% to 31%.',
      stats: [{ k: 'Conversion', v: '8%→31%' }, { k: 'Onboarding Steps', v: '14→5' }, { k: 'Support Tickets', v: '-71%' }, { k: 'NPS Score', v: '+67' }],
    },
    faqs: [
      { q: 'Do you do design only, or development too?', a: 'Both. We can deliver Figma files for your dev team, or handle the full design-to-code pipeline ourselves.' },
      { q: 'How do you measure design success?', a: 'We set KPIs before we start — conversion rate, task completion, NPS — and measure against them post-launch.' },
      { q: 'Can you redesign an existing product?', a: 'Yes. We do full redesigns, partial UX improvements, and design system creation for existing products.' },
    ],
    tags: ['Figma', 'Motion', 'Prototyping', 'Design Systems'],
  },
  {
    num: '04', title: 'Performance & SEO', color: '#7c3aed',
    tagline: 'Rank higher, load faster, earn more',
    overview: 'Speed is a feature. SEO delivers an average ROI of 22:1 — significantly outperforming paid ads (2:1). Organic search drives 53% of all website traffic and 43% of e-commerce revenue. The top organic result captures 28% of all clicks. Page 2 gets 0.67%. We get you to page 1.',
    problems: [
      { icon: '🐢', title: 'Site is Too Slow', desc: 'A 1-second delay reduces conversions by 7%. 53% of mobile users leave if a page takes over 3 seconds. Speed = money.' },
      { icon: '👻', title: 'Invisible on Google', desc: 'Only 0.67% of users click to page 2. If you\'re not in the top 3 results, you\'re essentially invisible to your customers.' },
      { icon: '🔧', title: 'Technical SEO Debt', desc: 'Broken links, missing schema, duplicate content, slow Core Web Vitals — these silently kill your rankings every day.' },
      { icon: '💸', title: 'Over-Relying on Paid Ads', desc: 'Paid ads stop the moment you stop paying. SEO compounds over time — businesses report 700% ROI over 3 years.' },
    ],
    solutions: [
      { title: 'Core Web Vitals Optimisation', desc: 'LCP under 2.5s, FID under 100ms, CLS under 0.1. We make your site pass Google\'s performance benchmarks.' },
      { title: 'Technical SEO Audit & Fix', desc: 'Full crawl of your site — fixing indexing issues, broken links, duplicate content, and schema markup.' },
      { title: 'Keyword & Content Strategy', desc: 'Research high-intent keywords your customers actually search. Build content that ranks and converts.' },
      { title: 'Monthly Reporting', desc: 'Transparent monthly reports showing rankings, traffic, conversions, and revenue attributed to organic search.' },
    ],
    metrics: [
      { label: 'SEO ROI', value: '22:1', sub: 'avg return (vs 2:1 paid)' },
      { label: 'Organic Traffic', value: '+520%', sub: 'avg in 6 months' },
      { label: 'Top Position', value: '28%', sub: 'of all clicks go here' },
      { label: 'Long-term ROI', value: '700%', sub: 'over 3 years' },
    ],
    dashboard: [
      { label: 'LCP Score', value: 96, unit: '/100', color: '#7c3aed' },
      { label: 'Keyword Rankings', value: 89, unit: '%↑', color: '#00ffcc' },
      { label: 'Organic Traffic', value: 82, unit: '%↑', color: '#7c3aed' },
      { label: 'Page Speed', value: 98, unit: '/100', color: '#00ffcc' },
    ],
    tools: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'PageSpeed Insights', 'Cloudflare', 'Next.js', 'Schema.org', 'GTM'],
    timeline: [
      { week: 'Week 1', task: 'Full technical audit & keyword research' },
      { week: 'Week 2–3', task: 'On-page fixes, speed optimisation & schema' },
      { week: 'Week 4–6', task: 'Content strategy & link building' },
      { week: 'Month 2+', task: 'Monthly monitoring, reporting & iteration' },
    ],
    process: [
      { step: '01', title: 'Technical Audit', desc: 'Full site crawl — broken links, slow assets, indexing issues, duplicate content, and Core Web Vitals analysis.' },
      { step: '02', title: 'Keyword Strategy', desc: 'Research high-intent keywords your customers actually search. Map them to pages and content gaps.' },
      { step: '03', title: 'On-Page & Speed', desc: 'Optimise meta tags, schema markup, image compression, font loading, and JavaScript bundles.' },
      { step: '04', title: 'Monitor & Report', desc: 'Monthly reports with rankings, traffic, and revenue attribution. You always know exactly what\'s working.' },
    ],
    caseStudy: {
      client: 'D2C Fashion Brand',
      challenge: 'Site loaded in 5.8s. Ranking on page 4 for their main keywords. Spending ₹2L/month on Google Ads with poor ROAS.',
      result: 'Reduced load time to 1.1s, fixed 340 technical SEO issues, and built a content strategy. Organic revenue up ₹40L in 6 months. Ads budget cut by 60%.',
      stats: [{ k: 'Traffic Growth', v: '+520%' }, { k: 'Keywords #1', v: '12' }, { k: 'Organic Revenue', v: '+₹40L' }, { k: 'Ads Spend Cut', v: '-60%' }],
    },
    faqs: [
      { q: 'How long before we see SEO results?', a: 'Technical fixes show impact in 4–8 weeks. Keyword rankings typically improve significantly in 3–6 months. SEO compounds over time.' },
      { q: 'Do you guarantee rankings?', a: 'No one can guarantee specific rankings — Google\'s algorithm changes. We guarantee transparent work, measurable traffic growth, and honest reporting.' },
      { q: 'Can you work on a site built by someone else?', a: 'Yes. We audit and optimise any site regardless of who built it — WordPress, Shopify, custom code, or anything else.' },
    ],
    tags: ['Core Web Vitals', 'SEO', 'CDN', 'Optimization'],
  },
];

// ─── SERVICE DETAIL OVERLAY ───────────────────────────────────────────────────
function ServiceDetail({ service, onClose }: { service: typeof SERVICE_DETAILS[0]; onClose: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as any },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9990] bg-black overflow-y-auto"
    >
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/30 tracking-widest">{service.num}</span>
          <span className="w-px h-4 bg-white/10" />
          <span className="text-white font-black text-sm tracking-[0.1em]">{service.title}</span>
        </div>
        <button onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">

        {/* ── HERO ── */}
        <motion.div {...fadeUp(0)}>
          <div className="text-xs font-mono tracking-[0.4em] uppercase mb-4 opacity-60" style={{ color: service.color }}>Service Overview</div>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-none mb-5">{service.title}</h1>
          <p className="text-xl text-white/40 mb-6 font-light italic">{service.tagline}</p>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl">{service.overview}</p>
        </motion.div>

        {/* ── IMPACT METRICS DASHBOARD ── */}
        <motion.div {...fadeUp(0.05)}>
          <div className="text-xs font-mono tracking-[0.4em] uppercase mb-8 opacity-60" style={{ color: service.color }}>Impact Dashboard</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {service.metrics.map((m, i) => (
              <motion.div key={i} {...fadeUp(0.05 * i)}
                className="p-6 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 group">
                <div className="text-3xl font-black mb-1 group-hover:scale-105 transition-transform duration-300" style={{ color: service.color }}>{m.value}</div>
                <div className="text-white text-sm font-semibold mb-1">{m.label}</div>
                <div className="text-white/40 text-xs">{m.sub}</div>
              </motion.div>
            ))}
          </div>
          {/* Progress bars dashboard */}
          <div className="grid sm:grid-cols-2 gap-4">
            {service.dashboard.map((d, i) => (
              <motion.div key={i} {...fadeUp(0.08 * i)}
                className="p-5 border border-white/10 rounded-xl bg-white/[0.02]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/70 text-sm font-medium">{d.label}</span>
                  <span className="font-black text-sm" style={{ color: d.color }}>{d.value}{d.unit}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.value}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${d.color}, ${d.color}88)` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PROBLEMS WE SOLVE ── */}
        <motion.div {...fadeUp(0.05)}>
          <div className="text-xs font-mono tracking-[0.4em] uppercase mb-8 opacity-60" style={{ color: service.color }}>Problems We Solve</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.problems.map((p, i) => (
              <motion.div key={i} {...fadeUp(0.07 * i)}
                className="p-6 border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300">
                <div className="text-2xl mb-3">{p.icon}</div>
                <div className="text-white font-black text-base mb-2">{p.title}</div>
                <div className="text-white/50 text-sm leading-relaxed">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── OUR SOLUTIONS ── */}
        <motion.div {...fadeUp(0.05)}>
          <div className="text-xs font-mono tracking-[0.4em] uppercase mb-8 opacity-60" style={{ color: service.color }}>How We Solve It</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.solutions.map((s, i) => (
              <motion.div key={i} {...fadeUp(0.07 * i)}
                className="p-6 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: service.color }} />
                <div className="pl-4">
                  <div className="text-white font-black text-base mb-2">{s.title}</div>
                  <div className="text-white/50 text-sm leading-relaxed">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PROCESS ── */}
        <motion.div {...fadeUp(0.05)}>
          <div className="text-xs font-mono tracking-[0.4em] uppercase mb-8 opacity-60" style={{ color: service.color }}>Our Process</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.process.map((p, i) => (
              <motion.div key={i} {...fadeUp(0.1 * i)}
                className="relative p-6 border border-white/10 rounded-2xl hover:bg-white/[0.02] transition-colors duration-300">
                {i < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-5 h-px bg-white/10 z-10" />
                )}
                <div className="text-xs font-mono mb-4 opacity-50" style={{ color: service.color }}>{p.step}</div>
                <div className="text-white font-black text-base mb-2">{p.title}</div>
                <div className="text-white/50 text-sm leading-relaxed">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── TIMELINE ── */}
        <motion.div {...fadeUp(0.05)}>
          <div className="text-xs font-mono tracking-[0.4em] uppercase mb-8 opacity-60" style={{ color: service.color }}>Project Timeline</div>
          <div className="space-y-3">
            {service.timeline.map((t, i) => (
              <motion.div key={i} {...fadeUp(0.07 * i)}
                className="flex items-center gap-6 p-5 border border-white/10 rounded-xl hover:bg-white/[0.02] transition-colors duration-300">
                <div className="shrink-0 text-xs font-mono font-bold tracking-wider" style={{ color: service.color }}>{t.week}</div>
                <div className="w-px h-6 bg-white/10 shrink-0" />
                <div className="text-white/70 text-sm">{t.task}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── TOOLS ── */}
        <motion.div {...fadeUp(0.05)}>
          <div className="text-xs font-mono tracking-[0.4em] uppercase mb-6 opacity-60" style={{ color: service.color }}>Tools & Technologies</div>
          <div className="flex flex-wrap gap-3">
            {service.tools.map((tool, i) => (
              <motion.span key={i} {...fadeUp(0.04 * i)}
                className="px-4 py-2 border border-white/15 text-white/60 text-sm rounded-full hover:border-white/30 hover:text-white transition-all duration-300">
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── CASE STUDY ── */}
        <motion.div {...fadeUp(0.05)}
          className="p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${service.color}06, transparent 60%)` }}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10" style={{ background: service.color }} />
          <div className="relative z-10">
            <div className="text-xs font-mono tracking-[0.4em] uppercase mb-2 opacity-60" style={{ color: service.color }}>Case Study</div>
            <div className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">{service.caseStudy.client}</div>
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-2 font-mono">The Challenge</div>
                <p className="text-white/70 text-sm leading-relaxed">{service.caseStudy.challenge}</p>
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-2 font-mono">The Result</div>
                <p className="text-white/70 text-sm leading-relaxed">{service.caseStudy.result}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {service.caseStudy.stats.map((s, i) => (
                <div key={i} className="p-4 bg-white/[0.03] rounded-xl border border-white/5">
                  <div className="text-2xl font-black mb-1" style={{ color: service.color }}>{s.v}</div>
                  <div className="text-white/40 text-xs tracking-wider">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── FAQ ── */}
        <motion.div {...fadeUp(0.05)}>
          <div className="text-xs font-mono tracking-[0.4em] uppercase mb-8 opacity-60" style={{ color: service.color }}>Frequently Asked</div>
          <div className="space-y-3">
            {service.faqs.map((f, i) => (
              <motion.div key={i} {...fadeUp(0.07 * i)}
                className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors duration-300">
                  <span className="text-white font-semibold text-sm pr-4">{f.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-lg leading-none">
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden">
                      <div className="px-6 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div {...fadeUp(0.05)} className="text-center pb-8">
          <p className="text-white/40 mb-6 text-base">Ready to get started with {service.title}?</p>
          <button onClick={onClose}
            className="px-12 py-4 rounded-full font-black text-sm tracking-[0.15em] uppercase text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${service.color}, #7c3aed)` }}>
            Start a Project →
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}

// ─── CONTACT FORM MODAL ───────────────────────────────────────────────────────
type FormType = 'project' | 'career';

function ContactModal({ type, onClose }: { type: FormType; onClose: () => void }) {
  const [fields, setFields] = useState({ name: '', email: '', company: '', message: '', role: '', portfolio: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formId = type === 'project' ? FORM_PROJECT : FORM_CAREER;
  const isProject = type === 'project';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) { setStatus('success'); playTone(880, 'sine', 0.3, 0.06); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }, [fields, formId]);

  const inp = 'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00ffcc]/50 transition-colors duration-300';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9991] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.34, 1.1, 0.64, 1] }}
        className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-white/5 flex items-start justify-between">
          <div>
            <div className="text-[#00ffcc] text-xs font-mono tracking-[0.3em] uppercase mb-2">
              {isProject ? 'Start a Project' : 'Join Our Team'}
            </div>
            <h2 className="text-2xl font-black text-white">
              {isProject ? "Let's build something" : "Work with us"}
            </h2>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors duration-300 shrink-0 mt-1">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
          {status === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-white font-black text-xl mb-3">Message Sent!</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {isProject ? "We'll review your project and get back to you within 24 hours." : "We'll review your application and reach out soon."}
              </p>
              <button onClick={onClose}
                className="mt-8 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors duration-300">
                Close
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-xs tracking-wider uppercase mb-2 block">Name *</label>
                  <input required className={inp} placeholder="Your name"
                    value={fields.name} onChange={e => setFields(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-white/40 text-xs tracking-wider uppercase mb-2 block">Email *</label>
                  <input required type="email" className={inp} placeholder="you@email.com"
                    value={fields.email} onChange={e => setFields(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              {isProject ? (
                <>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase mb-2 block">Company</label>
                    <input className={inp} placeholder="Your company name"
                      value={fields.company} onChange={e => setFields(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase mb-2 block">Project Details *</label>
                    <textarea required rows={4} className={inp + ' resize-none'} placeholder="Tell us about your project, goals, and timeline..."
                      value={fields.message} onChange={e => setFields(f => ({ ...f, message: e.target.value }))} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase mb-2 block">Role Applying For *</label>
                    <input required className={inp} placeholder="e.g. Frontend Developer"
                      value={fields.role} onChange={e => setFields(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase mb-2 block">Portfolio / LinkedIn</label>
                    <input className={inp} placeholder="https://"
                      value={fields.portfolio} onChange={e => setFields(f => ({ ...f, portfolio: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase mb-2 block">Why GenPandax? *</label>
                    <textarea required rows={3} className={inp + ' resize-none'} placeholder="Tell us about yourself and why you want to join..."
                      value={fields.message} onChange={e => setFields(f => ({ ...f, message: e.target.value }))} />
                  </div>
                </>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
              )}
              <button type="submit" disabled={status === 'sending'}
                className="w-full py-4 rounded-xl font-bold text-sm tracking-[0.15em] uppercase text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #00ffcc, #7c3aed)' }}>
                {status === 'sending' ? 'Sending...' : isProject ? 'Send Project Brief' : 'Submit Application'}
              </button>
              <p className="text-white/20 text-xs text-center">We respond within 24 hours</p>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

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
            href="https://docs.google.com/forms/d/e/1FAIpQLSc-erIeSo8JJYRnlxlb3G5_0M8EWHZnTPLrPyhF6U_XvW3Czw/viewform?usp=header" target="_blank" rel="noopener noreferrer"
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
function Hero({ onOpenModal }: { onOpenModal: (t: FormType) => void }) {
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
          <button
            onClick={() => { resumeAudio(); playTone(660, 'triangle', 0.2, 0.06); onOpenModal('project'); }}
            className="group relative px-8 py-4 bg-white text-black font-bold text-sm tracking-[0.15em] uppercase rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="relative z-10">Start a Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ffcc] to-[#7c3aed] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Start a Project</span>
          </button>
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
  const [activeService, setActiveService] = useState<typeof SERVICE_DETAILS[0] | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll('.service-card'),
      { y: 60, opacity: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', immediateRender: false }
    );
  }, []);

  const services = SERVICE_DETAILS;

  return (
    <>
      <AnimatePresence>
        {activeService && <ServiceDetail service={activeService} onClose={() => setActiveService(null)} />}
      </AnimatePresence>

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
                  <button
                    onClick={() => { resumeAudio(); playTone(660, 'sine', 0.1, 0.05); setActiveService(s); }}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:bg-white/5 group-hover:rotate-45 transition-all duration-300 cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[#00ffcc] transition-colors duration-300">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">{s.overview}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag, j) => (
                    <span key={j} className="text-xs px-3 py-1 border border-white/20 text-white/50 rounded-full group-hover:border-white/30 transition-colors duration-300">
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
    </>
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
  const [modal, setModal] = useState<FormType | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll('.contact-reveal'),
      { y: 60, opacity: 0 },
      { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', immediateRender: false }
    );
  }, []);

  return (
    <>
      <AnimatePresence>
        {modal && <ContactModal type={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>

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
          <button
            onMouseEnter={() => { resumeAudio(); playTone(880, 'sine', 0.1, 0.04); }}
            onClick={() => { resumeAudio(); playTone(660, 'triangle', 0.2, 0.06); setModal('project'); }}
            className="group relative px-10 py-5 bg-white text-black font-bold text-sm tracking-[0.15em] uppercase rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ffcc] to-[#7c3aed] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button
            onMouseEnter={() => { resumeAudio(); playTone(550, 'sine', 0.1, 0.04); }}
            onClick={() => { resumeAudio(); setModal('career'); }}
            className="px-10 py-5 border border-white/15 text-white/50 hover:text-white hover:border-white/30 font-medium text-sm tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105">
            Join Our Team
          </button>
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
    </>
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
  const [modal, setModal] = useState<FormType | null>(null);

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
          <Hero onOpenModal={setModal} />
          <About />
          <Services />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
      <AnimatePresence>
        {modal && <ContactModal type={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  );
}
