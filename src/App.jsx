import { useState, useEffect, useRef } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Globe3D from './components/Globe3D';
import Truck3D from './components/Truck3D';
import AnimatedCounter from './components/AnimatedCounter';
import FadeUp from './components/FadeUp';

const ERP_URL = 'https://taurus-logistics-production-0a15.up.railway.app/login';

/* ─────────────────────────────────────────
   Typewriter hook
───────────────────────────────────────── */
function useTypewriter(words, speed = 90, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ─────────────────────────────────────────
   Navbar
───────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['services', 'about', 'network', 'technology', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Network', href: '#network' },
    { label: 'Technology', href: '#technology' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <style>{`
        .navbar{position:fixed;top:0;left:0;right:0;z-index:1000;padding:20px 0;transition:all 0.3s ease;}
        .navbar.scrolled{background:rgba(10,22,40,0.9);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);}
        .nav-inner{display:flex;align-items:center;justify-content:space-between;}
        .nav-logo{display:flex;align-items:center;gap:12px;text-decoration:none;}
        .nav-logo-icon{width:40px;height:40px;background:linear-gradient(135deg,#1E3A8A,#2563EB);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#fff;box-shadow:0 0 24px rgba(37,99,235,0.6);font-family:'Space Grotesk',sans-serif;transition:transform 0.3s,box-shadow 0.3s;}
        .nav-logo:hover .nav-logo-icon{transform:scale(1.1) rotate(-5deg);box-shadow:0 0 36px rgba(37,99,235,0.8);}
        .nav-logo-name{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;color:#fff;line-height:1;}
        .nav-logo-sub{font-size:10px;font-weight:500;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.12em;margin-top:2px;}
        .nav-links{display:flex;align-items:center;gap:4px;list-style:none;}
        .nav-links a{color:rgba(255,255,255,0.65);text-decoration:none;font-size:14px;font-weight:500;padding:7px 14px;border-radius:8px;transition:all 0.2s;position:relative;}
        .nav-links a:hover,.nav-links a.active{color:#fff;background:rgba(255,255,255,0.08);}
        .nav-links a.active::after{content:'';position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:16px;height:2px;background:#3B82F6;border-radius:2px;}
        .nav-cta{background:linear-gradient(135deg,#1E3A8A,#2563EB)!important;color:#fff!important;border-radius:10px!important;font-weight:600!important;padding:8px 18px!important;box-shadow:0 4px 16px rgba(37,99,235,0.4);transition:all 0.3s!important;border:1px solid rgba(255,255,255,0.15)!important;}
        .nav-cta:hover{transform:translateY(-2px)!important;box-shadow:0 8px 28px rgba(37,99,235,0.6)!important;background:rgba(255,255,255,0.08)!important;}
        .nav-mobile-btn{display:none;background:none;border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:7px;cursor:pointer;color:#fff;}
        .mobile-nav{position:fixed;inset:0;z-index:2000;background:rgba(10,22,40,0.98);backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;transform:translateY(-100%);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);pointer-events:none;}
        .mobile-nav.open{transform:translateY(0);pointer-events:all;}
        .mobile-nav a{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:rgba(255,255,255,0.7);text-decoration:none;padding:12px 32px;border-radius:12px;transition:all 0.2s;}
        .mobile-nav a:hover{color:#fff;background:rgba(255,255,255,0.08);}
        @media(max-width:768px){.nav-links{display:none!important;}.nav-mobile-btn{display:flex!important;}}
      `}</style>

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="nav-logo">
              <div className="nav-logo-icon">T</div>
              <div>
                <div className="nav-logo-name">Taurus</div>
                <div className="nav-logo-sub">Trade & Logistics</div>
              </div>
            </a>
            <ul className="nav-links">
              {links.map(l => (
                <li key={l.label}>
                  <a href={l.href} className={activeSection === l.href.slice(1) ? 'active' : ''}>{l.label}</a>
                </li>
              ))}
              <li>
                <a href={ERP_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
                  Login to ERP →
                </a>
              </li>
            </ul>
            <button className="nav-mobile-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <button onClick={() => setMobileOpen(false)} style={{ position:'absolute',top:24,right:24,background:'none',border:'none',color:'#fff',cursor:'pointer',fontSize:28 }}>✕</button>
        {links.map(l => (
          <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href={ERP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} style={{ color:'#3B82F6',fontWeight:800 }}>Login to ERP →</a>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Hero
───────────────────────────────────────── */
function Hero() {
  const typed = useTypewriter(['Economy Forward', 'Trade Smarter', 'Africa Connected', 'Future of Freight']);

  return (
    <section className="hero" id="hero" style={{ minHeight:'100vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',paddingTop:100 }}>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes glow-pulse{0%,100%{opacity:0.15}50%{opacity:0.35}}
        @keyframes truck-move{0%{transform:translateX(-120px)}100%{transform:translateX(calc(100vw + 120px))}}
        @keyframes badge-shine{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes cursor-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes slide-in-left{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slide-in-right{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fade-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes counter-pop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}}
        @keyframes orb-drift{0%,100%{transform:translate(0,0)}33%{transform:translate(30px,-20px)}66%{transform:translate(-20px,15px)}}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(37,99,235,0.12);border:1px solid rgba(37,99,235,0.35);border-radius:100px;padding:8px 18px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#60A5FA;margin-bottom:32px;animation:slide-in-left 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;}
        .hero-badge-dot{width:7px;height:7px;border-radius:50%;background:#3B82F6;box-shadow:0 0 8px #3B82F6;animation:glow-pulse 2s infinite;}
        .hero-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(44px,6vw,82px);font-weight:800;line-height:1.05;letter-spacing:-0.03em;margin-bottom:24px;animation:slide-in-left 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both;}
        .hero-title .typed-line{display:block;background:linear-gradient(135deg,#3B82F6,#F97316,#60A5FA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;min-height:1.1em;}
        .hero-cursor{display:inline-block;width:3px;background:linear-gradient(180deg,#3B82F6,#F97316);border-radius:2px;margin-left:2px;animation:cursor-blink 0.9s step-end infinite;vertical-align:middle;height:0.85em;}
        .hero-sub{font-size:18px;color:rgba(255,255,255,0.65);line-height:1.75;max-width:560px;margin-bottom:40px;animation:slide-in-left 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;}
        .hero-actions{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:64px;animation:slide-in-left 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s both;}
        .btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#1E3A8A,#2563EB);color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:15px;font-family:'Space Grotesk',sans-serif;box-shadow:0 8px 32px rgba(37,99,235,0.4);transition:all 0.3s;border:1px solid rgba(255,255,255,0.15);}
        .btn-primary:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(37,99,235,0.6);}
        .btn-secondary{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:600;font-size:15px;border:1px solid rgba(255,255,255,0.15);transition:all 0.3s;}
        .btn-secondary:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.25);transform:translateY(-2px);}
        .hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);animation:fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 1s both;}
        .hero-stat{padding:20px 16px;background:rgba(10,22,40,0.8);text-align:center;transition:background 0.2s;}
        .hero-stat:hover{background:rgba(255,255,255,0.05);}
        .hero-stat-num{font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:800;background:linear-gradient(135deg,#fff,#60A5FA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .hero-stat-label{font-size:11px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.08em;margin-top:4px;}
        .truck-track{position:absolute;bottom:0;left:0;right:0;height:40px;overflow:hidden;pointer-events:none;}
        .truck-anim{font-size:28px;animation:truck-move 14s linear infinite;white-space:nowrap;filter:drop-shadow(0 0 8px rgba(249,115,22,0.6));}
        @media(max-width:640px){.hero-stats{grid-template-columns:repeat(2,1fr);}.hero-actions{flex-direction:column;}.btn-primary,.btn-secondary{justify-content:center;}}
      `}</style>

      <ParticleBackground />
      <div className="orb orb-blue" style={{ width:600,height:600,top:'-150px',right:'-150px',opacity:0.2,animation:'orb-drift 12s ease-in-out infinite',position:'absolute',borderRadius:'50%',background:'radial-gradient(circle,rgba(37,99,235,0.6),transparent 70%)',pointerEvents:'none' }} />
      <div className="orb orb-orange" style={{ width:350,height:350,bottom:'10%',left:'5%',opacity:0.12,animation:'orb-drift 16s ease-in-out infinite reverse',position:'absolute',borderRadius:'50%',background:'radial-gradient(circle,rgba(249,115,22,0.7),transparent 70%)',pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative',zIndex:1,width:'100%' }}>
        <div style={{ maxWidth:700 }}>
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Pan-African Freight Excellence
          </div>

          <h1 className="hero-title">
            Moving Africa's
            <span className="typed-line">
              {typed}<span className="hero-cursor" />
            </span>
          </h1>

          <p className="hero-sub">
            Taurus Trade & Logistics delivers end-to-end supply chain solutions
            across West Africa and beyond — powered by cutting-edge ERP technology,
            a trusted fleet, and a relentless commitment to on-time delivery.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Get a Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href={ERP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Login to ERP →
            </a>
          </div>

          <div className="hero-stats">
            {[
              { num: '500+', label: 'Trucks Managed' },
              { num: '15+', label: 'Years Experience' },
              { num: '99%', label: 'On-Time Delivery' },
              { num: '12', label: 'Countries Served' },
            ].map(s => (
              <div className="hero-stat" key={s.label}>
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="truck-track">
        <div className="truck-anim">🚛</div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Services
───────────────────────────────────────── */
const SERVICES = [
  { icon:'🚛', title:'Road Freight', desc:'Pan-African road transport covering 12+ countries with our modern, GPS-tracked fleet of 500+ trucks.', accent:'#2563EB', iconBg:'rgba(37,99,235,0.12)', iconBorder:'rgba(37,99,235,0.3)' },
  { icon:'⛽', title:'Fuel & Fleet Management', desc:'Real-time fuel monitoring, driver tracking, and preventive maintenance scheduling via our integrated ERP.', accent:'#F97316', iconBg:'rgba(249,115,22,0.12)', iconBorder:'rgba(249,115,22,0.3)' },
  { icon:'📦', title:'Inventory & Warehousing', desc:'Smart inventory management with stock ledger, purchase tracking, and automated low-stock alerts.', accent:'#8B5CF6', iconBg:'rgba(139,92,246,0.12)', iconBorder:'rgba(139,92,246,0.3)' },
  { icon:'📊', title:'Logistics Analytics', desc:'Executive dashboards with real-time KPIs — revenue, expenditure, trip analytics, and financial reports.', accent:'#06B6D4', iconBg:'rgba(6,182,212,0.12)', iconBorder:'rgba(6,182,212,0.3)' },
  { icon:'🔧', title:'Fleet Maintenance', desc:'Proactive maintenance scheduling, tyre management, and full audit logs for every vehicle in your fleet.', accent:'#10B981', iconBg:'rgba(16,185,129,0.12)', iconBorder:'rgba(16,185,129,0.3)' },
  { icon:'💳', title:'Invoicing & Finance', desc:'Automated invoicing, multi-currency support, and comprehensive financial reporting across all branches.', accent:'#F59E0B', iconBg:'rgba(245,158,11,0.12)', iconBorder:'rgba(245,158,11,0.3)' },
];

function Services() {
  return (
    <section className="section" id="services" style={{ padding:'120px 0' }}>
      <style>{`
        .section-badge{display:inline-block;background:rgba(37,99,235,0.12);border:1px solid rgba(37,99,235,0.3);border-radius:100px;padding:5px 16px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#60A5FA;margin-bottom:16px;}
        .section-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(32px,4vw,52px);font-weight:800;letter-spacing:-0.02em;line-height:1.1;margin-bottom:16px;}
        .section-sub{font-size:16px;color:rgba(255,255,255,0.55);line-height:1.75;max-width:560px;}
        .section-header{margin-bottom:64px;}
        .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;}
        .service-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;cursor:default;transition:all 0.35s cubic-bezier(0.16,1,0.3,1);position:relative;overflow:hidden;}
        .service-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--card-accent,#2563EB) 0%,transparent 60%);opacity:0;transition:opacity 0.35s;border-radius:inherit;}
        .service-card:hover{transform:translateY(-6px);border-color:var(--card-accent,#2563EB);box-shadow:0 24px 64px rgba(0,0,0,0.4),0 0 0 1px var(--card-accent,#2563EB);}
        .service-card:hover::before{opacity:0.07;}
        .service-icon{width:54px;height:54px;border-radius:14px;background:var(--icon-bg);border:1px solid var(--icon-border);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:20px;transition:transform 0.3s;}
        .service-card:hover .service-icon{transform:scale(1.1) rotate(-5deg);}
        .service-title{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;margin-bottom:10px;}
        .service-desc{font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7;}
        .service-arrow{position:absolute;top:28px;right:28px;opacity:0;transform:translateX(-8px);transition:all 0.3s;color:var(--card-accent);}
        .service-card:hover .service-arrow{opacity:1;transform:translateX(0);}
      `}</style>
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-badge">What We Do</div>
            <h2 className="section-title">Complete Logistics Solutions</h2>
            <p className="section-sub">From fleet management to financial reporting — every tool your logistics business needs, unified in one powerful platform.</p>
          </div>
        </FadeUp>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={Math.min(i + 1, 5)}>
              <div className="service-card" style={{ '--card-accent': s.accent }}>
                <div className="service-icon" style={{ '--icon-bg': s.iconBg, '--icon-border': s.iconBorder }}>{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-arrow">→</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Stats Band
───────────────────────────────────────── */
function StatsBand() {
  return (
    <div style={{ background:'linear-gradient(135deg,rgba(14,28,60,0.9),rgba(18,36,72,0.9))',borderTop:'1px solid rgba(255,255,255,0.08)',borderBottom:'1px solid rgba(255,255,255,0.08)',padding:'60px 0' }} id="about">
      <style>{`
        .stats-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:rgba(255,255,255,0.06);border-radius:20px;overflow:hidden;}
        .stat-item{padding:32px 20px;background:rgba(10,22,40,0.6);text-align:center;transition:background 0.25s;position:relative;}
        .stat-item:hover{background:rgba(255,255,255,0.04);}
        .stat-num{font-family:'Space Grotesk',sans-serif;font-size:36px;font-weight:800;background:linear-gradient(135deg,#fff 40%,#60A5FA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .stat-label{font-size:12px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.08em;margin-top:6px;}
        @media(max-width:768px){.stats-grid{grid-template-columns:repeat(2,1fr);}.stat-item:last-child{grid-column:span 2;}}
      `}</style>
      <div className="container">
        <div className="stats-grid">
          {[
            { num: 500, suffix: '+', label: 'Active Trucks' },
            { num: 12, suffix: '', label: 'Countries Served' },
            { num: 15, suffix: '+', label: 'Years of Excellence' },
            { num: 10000, suffix: '+', label: 'Trips Completed' },
            { num: 99, suffix: '%', label: 'On-Time Rate' },
          ].map(s => (
            <div className="stat-item" key={s.label}>
              <div className="stat-num"><AnimatedCounter target={s.num} suffix={s.suffix} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Network
───────────────────────────────────────── */
function Network() {
  return (
    <section style={{ padding:'120px 0',background:'linear-gradient(180deg,transparent,rgba(14,28,60,0.5),transparent)' }} id="network">
      <div className="container">
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center' }}>
          <FadeUp>
            <div>
              <div className="section-badge">Our Network</div>
              <h2 className="section-title">Connecting Africa<br />to the World</h2>
              <p className="section-sub" style={{ marginBottom:36 }}>
                Our logistics network spans 12+ countries across West Africa, with international connections to Europe, Asia, and the Americas. Every node is tracked in real-time through our ERP platform.
              </p>
              <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                {[
                  { flag:'🇬🇭', country:'Ghana (HQ)', desc:'Accra & Kumasi hubs', color:'#F97316' },
                  { flag:'🇳🇬', country:'Nigeria', desc:'Lagos operations', color:'#3B82F6' },
                  { flag:'🇨🇮', country:"Côte d'Ivoire", desc:'Abidjan corridor', color:'#10B981' },
                  { flag:'🌍', country:'West Africa+', desc:'9 more countries', color:'#8B5CF6' },
                ].map(c => (
                  <div key={c.country} style={{ display:'flex',alignItems:'center',gap:14,padding:'14px 18px',background:'rgba(255,255,255,0.04)',borderRadius:14,border:'1px solid rgba(255,255,255,0.08)',transition:'all 0.25s',cursor:'default' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    <span style={{ fontSize:24 }}>{c.flag}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700,fontSize:14 }}>{c.country}</div>
                      <div style={{ fontSize:12,color:'rgba(255,255,255,0.45)' }}>{c.desc}</div>
                    </div>
                    <div style={{ width:8,height:8,borderRadius:'50%',background:c.color,boxShadow:`0 0 8px ${c.color}` }} />
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div style={{ width:'100%',aspectRatio:'1/1',position:'relative' }}>
              <div style={{ position:'absolute',width:320,height:320,top:'50%',left:'50%',transform:'translate(-50%,-50%)',borderRadius:'50%',background:'radial-gradient(circle,rgba(37,99,235,0.3),transparent 70%)',animation:'glow-pulse 4s ease-in-out infinite',pointerEvents:'none' }} />
              <Globe3D />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Technology (ERP Preview)
───────────────────────────────────────── */
function Technology() {
  return (
    <section style={{ padding:'120px 0',background:'linear-gradient(180deg,transparent,rgba(14,28,60,0.6),transparent)' }} id="technology">
      <style>{`
        .dashboard-preview{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:20px;overflow:hidden;height:100%;}
        .dashboard-preview-bar{display:flex;align-items:center;gap:6px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);}
        .db-dot{width:10px;height:10px;border-radius:50%;}
        .db-dot-r{background:#FF5F57;}
        .db-dot-y{background:#FEBC2E;}
        .db-dot-g{background:#28C840;}
        .db-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);}
        .db-card{padding:14px 12px;background:rgba(10,22,40,0.8);}
        .db-card-num{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:800;}
        .db-card-label{font-size:10px;color:rgba(255,255,255,0.4);font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-top:3px;}
        .db-chart{display:flex;align-items:flex-end;gap:3px;height:90px;padding:12px 16px 0;background:rgba(10,22,40,0.5);}
        .db-bar{flex:1;border-radius:3px 3px 0 0;transition:opacity 0.2s;}
        .db-chart-row{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,0.04);}
        .db-list{padding:12px 14px;background:rgba(10,22,40,0.7);}
        .db-list-item{display:flex;align-items:center;justify-content:space-between;padding:5px 0;font-size:11px;color:rgba(255,255,255,0.7);border-bottom:1px solid rgba(255,255,255,0.04);}
        .db-badge{padding:2px 7px;border-radius:100px;font-size:9px;font-weight:700;letter-spacing:0.05em;}
        .db-badge-green{background:rgba(16,185,129,0.2);color:#4ADE80;}
        .db-badge-orange{background:rgba(249,115,22,0.2);color:#FB923C;}
        .db-badge-blue{background:rgba(37,99,235,0.2);color:#60A5FA;}
        .float-card{position:absolute;background:rgba(13,31,60,0.95);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:14px 18px;backdrop-filter:blur(12px);min-width:160px;box-shadow:0 20px 60px rgba(0,0,0,0.5);}
        .float-card-title{font-size:10px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;}
        .float-card-value{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:800;}
        .float-card-delta{font-size:11px;margin-top:3px;}
        .delta-up{color:#4ADE80;}
        .features-layout{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .features-visual{position:relative;height:480px;}
        .features-list{display:flex;flex-direction:column;gap:20px;}
        .feature-item{display:flex;gap:16px;align-items:flex-start;padding:16px;border-radius:14px;border:1px solid transparent;transition:all 0.25s;}
        .feature-item:hover{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.08);}
        .feature-item-icon{width:42px;height:42px;border-radius:12px;background:rgba(37,99,235,0.12);border:1px solid rgba(37,99,235,0.25);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;transition:transform 0.25s;}
        .feature-item:hover .feature-item-icon{transform:scale(1.1) rotate(-5deg);}
        .feature-item-title{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;margin-bottom:4px;}
        .feature-item-desc{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.65;}
        @media(max-width:900px){.features-layout{grid-template-columns:1fr;}.features-visual{height:360px;}}
      `}</style>
      <div className="container">
        <div className="features-layout">
          <FadeUp delay={1}>
            <div className="features-visual">
              <div className="dashboard-preview" style={{ height:'100%' }}>
                <div className="dashboard-preview-bar">
                  <div className="db-dot db-dot-r" /><div className="db-dot db-dot-y" /><div className="db-dot db-dot-g" />
                  <span style={{ fontSize:11,color:'rgba(255,255,255,0.35)',marginLeft:8,fontFamily:'monospace' }}>Taurus ERP — Live Dashboard</span>
                  <div style={{ marginLeft:'auto',display:'flex',alignItems:'center',gap:6 }}>
                    <div style={{ width:7,height:7,borderRadius:'50%',background:'#4ADE80',boxShadow:'0 0 6px #4ADE80',animation:'glow-pulse 2s infinite' }} />
                    <span style={{ fontSize:10,color:'#4ADE80' }}>Live</span>
                  </div>
                </div>
                <div className="db-cards">
                  {[
                    { num:'247', label:'Active Trips', color:'#60A5FA' },
                    { num:'GHS 4.2M', label:'Revenue MTD', color:'#4ADE80' },
                    { num:'18', label:'Maintenance Due', color:'#FB923C' },
                    { num:'98.7%', label:'Fleet Uptime', color:'#A78BFA' },
                  ].map(c => (
                    <div className="db-card" key={c.label}>
                      <div className="db-card-num" style={{ color:c.color }}>{c.num}</div>
                      <div className="db-card-label">{c.label}</div>
                    </div>
                  ))}
                </div>
                <div className="db-chart">
                  {[55,70,45,80,65,90,75,85,60,95,80,88].map((h, i) => (
                    <div key={i} className="db-bar" style={{ height:`${h}%`, background: i===11 ? 'linear-gradient(180deg,#F97316,#FB923C)' : 'linear-gradient(180deg,#2563EB,#3B82F6)', opacity: i===11 ? 1 : 0.55 }} />
                  ))}
                </div>
                <div className="db-chart-row">
                  <div className="db-list">
                    <div style={{ fontSize:10,color:'rgba(255,255,255,0.35)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8 }}>Recent Trips</div>
                    {[
                      { id:'T-2847', route:'ACC→LOS', badge:'db-badge-green', label:'Active' },
                      { id:'T-2846', route:'KSI→ABJ', badge:'db-badge-orange', label:'In Transit' },
                      { id:'T-2845', route:'ACC→DKR', badge:'db-badge-blue', label:'Scheduled' },
                    ].map(t => (
                      <div className="db-list-item" key={t.id}>
                        <span>{t.id}</span><span style={{ opacity:0.5 }}>{t.route}</span>
                        <span className={`db-badge ${t.badge}`}>{t.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="db-list">
                    <div style={{ fontSize:10,color:'rgba(255,255,255,0.35)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8 }}>Fuel Alerts</div>
                    {[
                      { truck:'GR-2841 TC', pct:18 },
                      { truck:'GR-1923 TC', pct:12 },
                      { truck:'GR-3047 TC', pct:8 },
                    ].map(f => (
                      <div className="db-list-item" key={f.truck}>
                        <span>{f.truck}</span>
                        <span style={{ color:'#FB923C',fontWeight:700 }}>{f.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="float-card" style={{ top:'-16px',right:'-24px',animation:'float 4s ease-in-out infinite' }}>
                <div className="float-card-title">Today's Revenue</div>
                <div className="float-card-value" style={{ color:'#4ADE80' }}>GHS 142,800</div>
                <div className="float-card-delta delta-up">▲ 12.4% vs yesterday</div>
              </div>
              <div className="float-card" style={{ bottom:'28px',right:'-16px',animation:'float2 5s ease-in-out infinite' }}>
                <div className="float-card-title">Active Drivers</div>
                <div className="float-card-value" style={{ color:'#60A5FA' }}>184 / 210</div>
                <div className="float-card-delta" style={{ color:'rgba(255,255,255,0.4)' }}>87.6% utilization</div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div>
              <div className="section-badge">ERP Technology</div>
              <h2 className="section-title">Enterprise Software Built for Logistics</h2>
              <p className="section-sub" style={{ marginBottom:36 }}>Our custom-built ERP system manages everything — from a single dashboard to deep analytics across all branches.</p>
              <div className="features-list">
                {[
                  { icon:'🗺️', title:'Real-Time Trip Tracking', desc:'Monitor every truck, every route, with live GPS integration and instant status updates.' },
                  { icon:'⛽', title:'Fuel Intelligence', desc:'Track consumption per trip, detect inefficiencies, and eliminate fuel theft with real-time alerts.' },
                  { icon:'📋', title:'Multi-Branch Management', desc:'Super admin controls for managing multiple branches, currencies, and users from one dashboard.' },
                  { icon:'📈', title:'Financial Reports', desc:'Automated revenue, expenditure, and profitability reports with multi-currency invoicing.' },
                  { icon:'🔔', title:'Smart Alerts', desc:'Maintenance due, low stock, fuel alerts — proactive notifications before problems occur.' },
                ].map(f => (
                  <div className="feature-item" key={f.title}>
                    <div className="feature-item-icon">{f.icon}</div>
                    <div>
                      <div className="feature-item-title">{f.title}</div>
                      <div className="feature-item-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:36 }}>
                <a href={ERP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display:'inline-flex' }}>
                  Access ERP Platform →
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Fleet Showcase
───────────────────────────────────────── */
function FleetShowcase() {
  return (
    <section style={{ background:'rgba(0,0,0,0.25)',padding:'100px 0' }}>
      <div className="container">
        <FadeUp>
          <div style={{ textAlign:'center',marginBottom:48 }}>
            <div className="section-badge">Our Fleet</div>
            <h2 className="section-title">500+ Modern Vehicles</h2>
            <p className="section-sub" style={{ margin:'0 auto' }}>GPS-tracked, maintained, and always ready for the long haul.</p>
          </div>
        </FadeUp>
        <FadeUp delay={2}>
          <div style={{ position:'relative',height:320,borderRadius:24,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',background:'linear-gradient(180deg,#0A1628 0%,#0D1F3C 100%)' }}>
            <Truck3D style={{ position:'absolute',inset:0,width:'100%',height:'100%' }} />
            <div style={{ position:'absolute',bottom:0,left:0,right:0,padding:'0 32px 28px',background:'linear-gradient(0deg,rgba(10,22,40,0.95) 0%,transparent 100%)' }}>
              <div style={{ display:'flex',gap:40 }}>
                {[
                  { label:'Tractor-Trailers', count:'180+', color:'#F97316' },
                  { label:'Cargo Trucks', count:'220+', color:'#3B82F6' },
                  { label:'Light Commercial', count:'100+', color:'#10B981' },
                ].map(v => (
                  <div key={v.label}>
                    <div style={{ fontFamily:'Space Grotesk',fontWeight:800,fontSize:24,color:v.color }}>{v.count}</div>
                    <div style={{ fontSize:12,color:'rgba(255,255,255,0.45)',fontWeight:600,marginTop:2 }}>{v.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Testimonials
───────────────────────────────────────── */
function Testimonials() {
  const testimonials = [
    { name:'Kwame Asante', role:'Supply Chain Director', company:'GoldFields Ghana', quote:'Taurus transformed our logistics operations. The ERP dashboard gives us complete visibility across 40 trucks — fuel, trips, maintenance — all in one place.' },
    { name:'Fatima Diallo', role:'Operations Manager', company:'Dangote Industries', quote:'Reliability is everything in logistics. Taurus has delivered 99%+ on-time across our Abidjan-Lagos corridor for over 3 years. Exceptional partners.' },
    { name:'Emmanuel Boateng', role:'CEO', company:'Accra Cold Chain', quote:'The multi-branch ERP with real-time fuel tracking saved us 18% on operational costs in the first year. The ROI was faster than we expected.' },
  ];

  return (
    <section style={{ padding:'120px 0' }} id="testimonials">
      <div className="container">
        <FadeUp>
          <div style={{ textAlign:'center',marginBottom:64 }}>
            <div className="section-badge">Client Stories</div>
            <h2 className="section-title">Trusted by Industry Leaders</h2>
          </div>
        </FadeUp>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24 }}>
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i + 1}>
              <div style={{ background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:'28px 28px 24px',display:'flex',flexDirection:'column',gap:20,transition:'all 0.3s',cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize:36,color:'#2563EB',fontFamily:'serif',lineHeight:1 }}>"</div>
                <p style={{ fontSize:14.5,color:'rgba(255,255,255,0.72)',lineHeight:1.8,flex:1 }}>{t.quote}</p>
                <div style={{ display:'flex',alignItems:'center',gap:12,paddingTop:16,borderTop:'1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,#1E3A8A,#2563EB)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:16,flexShrink:0 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:14 }}>{t.name}</div>
                    <div style={{ fontSize:12,color:'rgba(255,255,255,0.4)' }}>{t.role}, {t.company}</div>
                  </div>
                  <div style={{ marginLeft:'auto',display:'flex',gap:1 }}>{'★★★★★'.split('').map((s, j) => <span key={j} style={{ color:'#F97316',fontSize:13 }}>{s}</span>)}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Contact
───────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name:'', email:'', company:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  return (
    <section style={{ padding:'120px 0',background:'linear-gradient(180deg,transparent,rgba(14,28,60,0.4),transparent)' }} id="contact">
      <style>{`
        .contact-layout{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;}
        .contact-form{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:40px;}
        .form-group{margin-bottom:20px;}
        .form-label{display:block;font-size:13px;font-weight:600;color:rgba(255,255,255,0.6);margin-bottom:8px;letter-spacing:0.03em;}
        .form-input,.form-textarea{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;color:#fff;font-size:14px;font-family:inherit;outline:none;transition:all 0.2s;}
        .form-input:focus,.form-textarea:focus{border-color:rgba(37,99,235,0.6);background:rgba(37,99,235,0.08);box-shadow:0 0 0 3px rgba(37,99,235,0.15);}
        .form-textarea{min-height:120px;resize:vertical;}
        .contact-info{display:flex;flex-direction:column;gap:28px;padding-top:8px;}
        .contact-info-item{display:flex;gap:16px;align-items:flex-start;padding:18px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);transition:all 0.25s;}
        .contact-info-item:hover{background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.12);}
        .contact-info-icon{width:42px;height:42px;border-radius:12px;background:rgba(37,99,235,0.12);border:1px solid rgba(37,99,235,0.25);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
        .contact-info-title{font-weight:700;font-size:14px;margin-bottom:4px;}
        .contact-info-text{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.65;}
        @media(max-width:768px){.contact-layout{grid-template-columns:1fr;}}
      `}</style>
      <div className="container">
        <FadeUp>
          <div style={{ textAlign:'center',marginBottom:64 }}>
            <div className="section-badge">Get In Touch</div>
            <h2 className="section-title">Ready to Move Your Cargo?</h2>
            <p className="section-sub" style={{ margin:'0 auto' }}>Get a quote in under 24 hours. Our logistics experts are standing by.</p>
          </div>
        </FadeUp>
        <div className="contact-layout">
          <FadeUp delay={1}>
            <div className="contact-form">
              {sent ? (
                <div style={{ textAlign:'center',padding:'40px 0' }}>
                  <div style={{ fontSize:52,marginBottom:16 }}>✅</div>
                  <div style={{ fontFamily:'Space Grotesk',fontSize:22,fontWeight:800,marginBottom:8 }}>Message Sent!</div>
                  <div style={{ color:'rgba(255,255,255,0.5)',fontSize:14 }}>We'll get back to you within 24 hours.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" placeholder="John Mensah" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" placeholder="john@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input className="form-input" placeholder="Your Company Ltd." value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tell us about your logistics needs</label>
                    <textarea className="form-textarea" placeholder="Origin, destination, cargo type, frequency..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width:'100%',justifyContent:'center',border:'none',cursor:'pointer',fontSize:15 }} disabled={loading}>
                    {loading ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="contact-info">
              <div>
                <h3 style={{ fontFamily:'Space Grotesk',fontWeight:800,fontSize:22,marginBottom:8 }}>Our Offices</h3>
                <p style={{ color:'rgba(255,255,255,0.5)',fontSize:14,lineHeight:1.7 }}>Headquartered in Accra, Ghana with operational hubs across West Africa.</p>
              </div>
              {[
                { icon:'📍', title:'Headquarters', text:'Accra, Ghana — Main Hub\nKumasi, Ghana — Regional Office' },
                { icon:'📞', title:'Phone', text:'+233 (0) 30 000 0000\nAvailable 24/7 for emergencies' },
                { icon:'✉️', title:'Email', text:'logistics@taurusgh.com\nops@taurusgh.com' },
                { icon:'🕐', title:'Operating Hours', text:'Mon–Fri: 6:00 AM – 10:00 PM\nWeekends: 7:00 AM – 8:00 PM' },
              ].map(c => (
                <div className="contact-info-item" key={c.title}>
                  <div className="contact-info-icon">{c.icon}</div>
                  <div>
                    <div className="contact-info-title">{c.title}</div>
                    <div className="contact-info-text" style={{ whiteSpace:'pre-line' }}>{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Footer
───────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:'rgba(0,0,0,0.4)',borderTop:'1px solid rgba(255,255,255,0.08)',padding:'80px 0 40px' }}>
      <style>{`
        .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:56px;}
        .footer-brand-desc{font-size:13.5px;color:rgba(255,255,255,0.4);line-height:1.75;max-width:280px;margin-top:16px;}
        .footer-col-title{font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.5);margin-bottom:18px;}
        .footer-links{list-style:none;display:flex;flex-direction:column;gap:10px;}
        .footer-links a{font-size:14px;color:rgba(255,255,255,0.4);text-decoration:none;transition:color 0.2s;}
        .footer-links a:hover{color:#fff;}
        .footer-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:32px;border-top:1px solid rgba(255,255,255,0.07);}
        .footer-bottom-text{font-size:13px;color:rgba(255,255,255,0.3);}
        @media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr;}.footer-bottom{flex-direction:column;gap:8px;text-align:center;}}
      `}</style>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:12 }}>
              <div style={{ width:36,height:36,background:'linear-gradient(135deg,#1E3A8A,#2563EB)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:16,color:'#fff',fontFamily:'Space Grotesk' }}>T</div>
              <div style={{ fontFamily:'Space Grotesk',fontWeight:800,fontSize:16 }}>Taurus Trade & Logistics</div>
            </div>
            <p className="footer-brand-desc">Pan-African logistics excellence. Moving cargo across 12+ countries with integrity, technology, and speed since 2010.</p>
            <div style={{ display:'flex',gap:10,marginTop:20 }}>
              {['Li','Tw','Fb'].map(s => (
                <a key={s} href="#" style={{ width:34,height:34,borderRadius:8,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.4)',fontSize:11,fontWeight:700,textDecoration:'none',transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(37,99,235,0.2)'; e.currentTarget.style.color='#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,255,255,0.4)'; }}
                >{s}</a>
              ))}
            </div>
          </div>
          {[
            { title:'Services', links:['Road Freight','Fleet Management','Warehousing','Analytics','Maintenance','Invoicing'] },
            { title:'Company', links:['About Us','Our Fleet','Network','Careers','News','Contact'] },
            { title:'Technology', links:['ERP Platform','GPS Tracking','Fuel Monitoring','Mobile App','API Access','Login'] },
          ].map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map(l => (
                  <li key={l}>
                    <a href={l === 'Login' ? ERP_URL : '#'} target={l === 'Login' ? '_blank' : undefined} rel={l === 'Login' ? 'noopener noreferrer' : undefined}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-text">© {new Date().getFullYear()} Taurus Trade & Logistics. All rights reserved.</div>
          <div className="footer-bottom-text">Built with ❤️ in Accra, Ghana</div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   App
───────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <StatsBand />
      <Network />
      <Technology />
      <FleetShowcase />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
