import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Globe3D from './components/Globe3D';
import Truck3D from './components/Truck3D';
import AnimatedCounter from './components/AnimatedCounter';
import FadeUp from './components/FadeUp';

const ERP_URL = 'https://taurus-logistics-production-0a15.up.railway.app/login';

/* ═══════════════════════════════════════════
   Navbar
═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [marketsOpen, setMarketsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['markets', 'solutions', 'network', 'fleet', 'about', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Markets', href: '#markets' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Network', href: '#network' },
    { label: 'Fleet', href: '#fleet' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <style>{`
        .navbar{position:fixed;top:0;left:0;right:0;z-index:1000;padding:22px 0;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);}
        .navbar.scrolled{background:rgba(7,13,23,0.88);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);padding:14px 0;border-bottom:1px solid var(--hairline);}
        .nav-inner{display:flex;align-items:center;justify-content:space-between;}
        .nav-logo{display:flex;align-items:center;gap:13px;text-decoration:none;}
        .nav-logo-mark{width:38px;height:38px;border:1px solid var(--brass-dim);border-radius:2px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--brass);position:relative;flex-shrink:0;}
        .nav-logo-mark::before,.nav-logo-mark::after{content:'';position:absolute;width:5px;height:1px;background:var(--brass-dim);}
        .nav-logo-mark::before{top:-1px;left:-1px;}
        .nav-logo-mark::after{bottom:-1px;right:-1px;}
        .nav-logo-name{font-family:var(--font-display);font-size:16.5px;font-weight:600;color:#fff;line-height:1;letter-spacing:0.01em;}
        .nav-logo-sub{font-family:var(--font-mono);font-size:9px;font-weight:500;color:var(--steel);text-transform:uppercase;letter-spacing:0.14em;margin-top:3px;}
        .nav-links{display:flex;align-items:center;gap:2px;list-style:none;}
        .nav-item{position:relative;}
        .nav-links a, .nav-links button.nav-link-btn{color:var(--white-70);text-decoration:none;font-size:13.5px;font-weight:500;padding:9px 15px;border-radius:3px;transition:all 0.2s;position:relative;background:none;border:none;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:5px;}
        .nav-links a:hover,.nav-links a.active,.nav-links button.nav-link-btn:hover{color:#fff;background:rgba(237,239,242,0.05);}
        .nav-links a.active::after{content:'';position:absolute;bottom:3px;left:50%;transform:translateX(-50%);width:14px;height:1.5px;background:var(--brass);}
        .nav-dropdown{position:absolute;top:calc(100% + 8px);left:0;background:rgba(11,22,38,0.98);backdrop-filter:blur(20px);border:1px solid var(--hairline-2);border-radius:6px;padding:8px;min-width:240px;opacity:0;visibility:hidden;transform:translateY(-6px);transition:all 0.2s;box-shadow:0 24px 48px -12px rgba(0,0,0,0.6);}
        .nav-item:hover .nav-dropdown{opacity:1;visibility:visible;transform:translateY(0);}
        .nav-dropdown a{display:block;padding:10px 14px;font-size:13.5px;color:var(--white-70);border-radius:4px;}
        .nav-dropdown a:hover{background:rgba(201,96,26,0.1);color:var(--brass);}
        .nav-cta{background:var(--amber)!important;color:#0B0704!important;border-radius:3px!important;font-weight:600!important;padding:9px 20px!important;margin-left:8px;transition:all 0.3s!important;}
        .nav-cta:hover{background:var(--amber-2)!important;color:#0B0704!important;transform:translateY(-1px);}
        .nav-mobile-btn{display:none;background:none;border:1px solid var(--hairline-2);border-radius:3px;padding:8px;cursor:pointer;color:#fff;}
        .mobile-nav{position:fixed;inset:0;z-index:2000;background:rgba(7,13,23,0.99);backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;transform:translateY(-100%);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);pointer-events:none;overflow-y:auto;padding:80px 0;}
        .mobile-nav.open{transform:translateY(0);pointer-events:all;}
        .mobile-nav a{font-family:var(--font-display);font-size:24px;font-weight:600;color:var(--white-70);text-decoration:none;padding:10px 32px;border-radius:4px;transition:all 0.2s;}
        .mobile-nav a:hover{color:#fff;}
        @media(max-width:880px){.nav-links{display:none!important;}.nav-mobile-btn{display:flex!important;}}
      `}</style>

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo">
              <div className="nav-logo-mark">T</div>
              <div>
                <div className="nav-logo-name">Taurus</div>
                <div className="nav-logo-sub">Trade &amp; Logistics</div>
              </div>
            </a>
            <ul className="nav-links">
              <li className="nav-item">
                <a href="#markets" className={activeSection === 'markets' ? 'active' : ''}>Markets</a>
                <div className="nav-dropdown">
                  <a href="#markets">Automotive</a>
                  <a href="#markets">Consumer &amp; Retail</a>
                  <a href="#markets">Industrial &amp; Mining</a>
                  <a href="#markets">Energy &amp; Agriculture</a>
                </div>
              </li>
              <li className="nav-item">
                <a href="#solutions" className={activeSection === 'solutions' ? 'active' : ''}>Solutions</a>
                <div className="nav-dropdown">
                  <a href="#solutions">Road Freight</a>
                  <a href="#solutions">Distribution &amp; Fulfillment</a>
                  <a href="#solutions">Customs &amp; Trade Compliance</a>
                  <a href="#solutions">Fleet &amp; ERP Technology</a>
                </div>
              </li>
              <li><a href="#network" className={activeSection === 'network' ? 'active' : ''}>Network</a></li>
              <li><a href="#fleet" className={activeSection === 'fleet' ? 'active' : ''}>Fleet</a></li>
              <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
              <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
              <li>
                <a href={ERP_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
                  Track Shipment
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
        <button onClick={() => setMobileOpen(false)} style={{ position:'absolute',top:24,right:24,background:'none',border:'none',color:'#fff',cursor:'pointer',fontSize:26 }}>✕</button>
        {links.map(l => (
          <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href={ERP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} style={{ color:'var(--brass)',fontWeight:700,marginTop:16 }}>Track Shipment →</a>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   Hero
═══════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" style={{ position:'relative', overflow:'hidden', paddingTop:160, paddingBottom:90, minHeight:'100vh', display:'flex', alignItems:'center' }}>
      <style>{`
        .hero-grid{display:grid;grid-template-columns:1.05fr 0.95fr;gap:24px;align-items:center;position:relative;z-index:2;}
        .hero-eyebrow-row{display:flex;align-items:center;gap:16px;margin-bottom:28px;flex-wrap:wrap;}
        .hero-title{font-family:var(--font-display);font-size:clamp(42px,5.4vw,72px);font-weight:600;line-height:1.04;letter-spacing:-0.015em;margin-bottom:26px;color:#fff;}
        .hero-title em{font-style:italic;color:var(--brass);font-weight:500;}
        .hero-sub{font-size:17px;color:var(--white-70);line-height:1.75;max-width:520px;margin-bottom:40px;}
        .hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:56px;}
        .hero-stats-row{display:grid;grid-template-columns:repeat(4,auto);gap:36px;}
        .hero-stat-num{font-family:var(--font-display);font-size:30px;font-weight:600;color:#fff;line-height:1;}
        .hero-stat-label{font-family:var(--font-mono);font-size:10px;font-weight:500;color:var(--steel);text-transform:uppercase;letter-spacing:0.08em;margin-top:6px;}
        .hero-globe-wrap{position:relative;height:560px;}
        .hero-globe-caption{position:absolute;bottom:6px;left:50%;transform:translateX(-50%);font-family:var(--font-mono);font-size:10.5px;color:var(--steel);letter-spacing:0.06em;text-align:center;white-space:nowrap;}
        @media(max-width:980px){.hero-grid{grid-template-columns:1fr;}.hero-globe-wrap{height:380px;order:-1;}.hero-stats-row{grid-template-columns:repeat(2,1fr);gap:20px 28px;}}
        @media(max-width:640px){.hero-actions{flex-direction:column;}.hero-actions .btn{justify-content:center;}}
      `}</style>

      <ParticleBackground />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 30% 20%, rgba(201,96,26,0.08), transparent), radial-gradient(ellipse 50% 50% at 85% 70%, rgba(232,199,126,0.06), transparent)', pointerEvents:'none' }} />

      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow-row">
              <span className="eyebrow" style={{ marginBottom:0 }}>Est. 2010 — Accra, Ghana</span>
              <span className="coord-chip">05.6037°N, 0.1870°W</span>
            </div>

            <h1 className="hero-title">
              Delivering Results<br />for <em>Industry Leaders</em><br />Across Africa
            </h1>

            <p className="hero-sub">
              Taurus Trade &amp; Logistics provides end-to-end supply chain solutions
              tailored to automotive, consumer, industrial, and energy markets —
              backed by a modern fleet, a proprietary ERP platform, and four decades
              of combined operating experience across West Africa and beyond.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Request a Quote
                <svg className="btn-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href={ERP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Track a Shipment
              </a>
            </div>

            <div className="hero-stats-row">
              {[
                { num: '500+', label: 'Fleet Vehicles' },
                { num: '15+', label: 'Years Operating' },
                { num: '12', label: 'Countries Served' },
                { num: '99%', label: 'On-Time Rate' },
              ].map(s => (
                <div key={s.label}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-globe-wrap">
            <Globe3D />
            <div className="hero-globe-caption">— drag to rotate · live shipping lanes —</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Trust strip
═══════════════════════════════════════════ */
function TrustStrip() {
  const clients = ['GoldFields Ghana', 'Dangote Industries', 'Accra Cold Chain', 'Volta Aluminium', 'Unilever West Africa', 'Nestlé Ghana', 'AngloGold Ashanti', 'Guinness Ghana'];
  return (
    <div style={{ borderTop:'1px solid var(--hairline)', borderBottom:'1px solid var(--hairline)', padding:'30px 0', overflow:'hidden', position:'relative' }}>
      <style>{`
        .marquee-track{display:flex;gap:64px;animation:marquee 32s linear infinite;white-space:nowrap;width:max-content;}
        .marquee-item{font-family:var(--font-mono);font-size:12.5px;color:var(--steel);letter-spacing:0.04em;text-transform:uppercase;}
      `}</style>
      <div className="marquee-track">
        {[...clients, ...clients].map((c, i) => (
          <span className="marquee-item" key={i}>{c}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Markets We Serve
═══════════════════════════════════════════ */
const MARKETS = [
  {
    n: '01', title: 'Automotive', accent:'#C9601A',
    desc: 'Just-in-time component delivery and finished-vehicle logistics for assembly plants and dealer networks across the region.',
    stats: ['JIT delivery windows', 'Inbound & outbound', 'Bonded warehousing'],
  },
  {
    n: '02', title: 'Consumer & Retail', accent:'#E8C77E',
    desc: 'Distribution and fulfillment for FMCG and retail brands, from port of entry to last-mile shelf availability.',
    stats: ['Cross-border distribution', 'Cold chain options', 'Retail-ready packing'],
  },
  {
    n: '03', title: 'Industrial & Mining', accent:'#5B7186',
    desc: 'Heavy haul and bulk transport for mining, manufacturing, and infrastructure projects with specialized equipment.',
    stats: ['Abnormal load permits', 'Bulk & break-bulk', 'On-site logistics'],
  },
  {
    n: '04', title: 'Energy & Agriculture', accent:'#8a9bb0',
    desc: 'Time-sensitive transport for energy infrastructure and agricultural exports, including perishable cold chain.',
    stats: ['Hazmat-certified fleet', 'Export documentation', 'Seasonal scaling'],
  },
];

function Markets() {
  const [active, setActive] = useState(0);
  return (
    <section className="section" id="markets">
      <style>{`
        .markets-layout{display:grid;grid-template-columns:0.85fr 1.15fr;gap:64px;align-items:start;}
        .market-tab{display:flex;align-items:baseline;gap:18px;padding:22px 4px;border-top:1px solid var(--hairline);cursor:pointer;transition:all 0.25s;}
        .market-tab:last-child{border-bottom:1px solid var(--hairline);}
        .market-tab:hover .market-tab-title{color:#fff;}
        .market-tab.active .market-tab-title{color:#fff;}
        .market-tab.active{padding-left:14px;}
        .market-tab-num{font-family:var(--font-mono);font-size:12px;color:var(--steel);flex-shrink:0;}
        .market-tab-title{font-family:var(--font-display);font-size:23px;font-weight:600;color:var(--white-50);transition:color 0.25s;}
        .market-panel{background:linear-gradient(160deg,rgba(237,239,242,0.04),rgba(237,239,242,0.01));border:1px solid var(--hairline);border-radius:6px;padding:48px;min-height:380px;position:relative;overflow:hidden;}
        .market-panel-accent{position:absolute;top:0;left:0;width:3px;height:100%;}
        .market-panel-stats{display:flex;flex-direction:column;gap:14px;margin-top:32px;}
        .market-panel-stat{display:flex;align-items:center;gap:12px;font-size:14px;color:var(--white-70);}
        .market-panel-stat-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
        @media(max-width:900px){.markets-layout{grid-template-columns:1fr;}.market-panel{padding:32px 28px;}}
      `}</style>
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom:64, maxWidth:680 }}>
            <div className="eyebrow">Markets We Serve</div>
            <h2 className="heading-lg" style={{ marginBottom:18 }}>Delivering results for industry leaders</h2>
            <p className="body-lg">With over a decade of experience providing solutions to large-scale enterprises throughout West Africa, we offer end-to-end logistics tailored for specific markets.</p>
          </div>
        </FadeUp>
        <div className="markets-layout">
          <FadeUp delay={1}>
            <div>
              {MARKETS.map((m, i) => (
                <div key={m.n} className={`market-tab${active === i ? ' active' : ''}`} onClick={() => setActive(i)}
                  style={{ borderLeft: active === i ? `2px solid ${m.accent}` : '2px solid transparent' }}>
                  <span className="market-tab-num">{m.n}</span>
                  <span className="market-tab-title">{m.title}</span>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="market-panel">
              <div className="market-panel-accent" style={{ background: MARKETS[active].accent }} />
              <div className="mono-label" style={{ marginBottom:14 }}>{MARKETS[active].n} / {String(MARKETS.length).padStart(2,'0')}</div>
              <h3 className="heading-md" style={{ marginBottom:18 }}>{MARKETS[active].title}</h3>
              <p className="body-md" style={{ maxWidth:480 }}>{MARKETS[active].desc}</p>
              <div className="market-panel-stats">
                {MARKETS[active].stats.map(s => (
                  <div className="market-panel-stat" key={s}>
                    <span className="market-panel-stat-dot" style={{ background: MARKETS[active].accent }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Solutions
═══════════════════════════════════════════ */
const SOLUTIONS = [
  { n:'01', icon:'road', title:'Road Freight & Transportation', desc:'Pan-African road transport covering 12+ countries with a modern, GPS-tracked fleet of 500+ vehicles directing thousands of shipments through a network of premium carriers.' },
  { n:'02', icon:'package', title:'Distribution & Fulfillment', desc:'International hub distribution, cross-border shipping, and key trade-corridor expertise — from port of entry through to final-mile delivery.' },
  { n:'03', icon:'shield', title:'Customs Brokerage & Trade Compliance', desc:'A specialized trade-compliance team handling documentation, duty optimization, and regulatory clearance across every border we cross.' },
  { n:'04', icon:'grid', title:'Fleet & ERP Technology — Panom', desc:'Our proprietary order-management platform gives clients and operators live visibility into trips, fuel, maintenance, and financials from a single dashboard.' },
];

const SOL_ICONS = {
  road: <path d="M5 3 2 21M19 3l3 18M12 3v4M12 11v2M12 17v4" />,
  package: <><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></>,
  shield: <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3zM9 12l2 2 4-4" />,
  grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
};

function Solutions() {
  return (
    <section className="section" id="solutions" style={{ background:'linear-gradient(180deg,transparent,rgba(15,34,64,0.35),transparent)' }}>
      <style>{`
        .sol-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--hairline);border:1px solid var(--hairline);border-radius:6px;overflow:hidden;}
        .sol-card{background:var(--ink);padding:44px 40px;transition:background 0.3s;position:relative;}
        .sol-card:hover{background:rgba(237,239,242,0.025);}
        .sol-icon-wrap{width:50px;height:50px;border:1px solid var(--hairline-2);border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:28px;color:var(--brass);transition:border-color 0.3s,color 0.3s;}
        .sol-card:hover .sol-icon-wrap{border-color:var(--brass);}
        .sol-num{font-family:var(--font-mono);font-size:12px;color:var(--steel);position:absolute;top:44px;right:40px;}
        .sol-title{font-family:var(--font-display);font-size:21px;font-weight:600;margin-bottom:14px;max-width:380px;}
        .sol-desc{font-size:14.5px;color:var(--white-50);line-height:1.75;max-width:400px;}
        @media(max-width:760px){.sol-grid{grid-template-columns:1fr;}.sol-card{padding:36px 28px;}}
      `}</style>
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom:64, maxWidth:680 }}>
            <div className="eyebrow">Our Solutions</div>
            <h2 className="heading-lg" style={{ marginBottom:18 }}>Scalable for every project, adaptable for every need</h2>
            <p className="body-lg">We are constantly refining time-tested processes to meet modern market demands — diving deep into each client's supply chain to create solutions that work specifically for them.</p>
          </div>
        </FadeUp>
        <FadeUp delay={1}>
          <div className="sol-grid">
            {SOLUTIONS.map(s => (
              <div className="sol-card" key={s.n}>
                <span className="sol-num">{s.n}</span>
                <div className="sol-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{SOL_ICONS[s.icon]}</svg>
                </div>
                <div className="sol-title">{s.title}</div>
                <div className="sol-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Stats band
═══════════════════════════════════════════ */
function StatsBand() {
  return (
    <div style={{ borderTop:'1px solid var(--hairline)', borderBottom:'1px solid var(--hairline)', padding:'64px 0' }}>
      <style>{`
        .stats-band-grid{display:grid;grid-template-columns:repeat(5,1fr);}
        .stats-band-item{text-align:center;padding:0 16px;position:relative;}
        .stats-band-item:not(:last-child)::after{content:'';position:absolute;right:0;top:8px;bottom:8px;width:1px;background:var(--hairline);}
        .stats-band-num{font-family:var(--font-display);font-size:38px;font-weight:600;color:#fff;}
        .stats-band-label{font-family:var(--font-mono);font-size:10.5px;color:var(--steel);text-transform:uppercase;letter-spacing:0.08em;margin-top:8px;}
        @media(max-width:768px){.stats-band-grid{grid-template-columns:repeat(2,1fr);row-gap:32px;}.stats-band-item:nth-child(2)::after{display:none;}.stats-band-item:last-child{grid-column:span 2;}}
      `}</style>
      <div className="container">
        <div className="stats-band-grid">
          {[
            { num: 500, suffix: '+', label: 'Active Vehicles' },
            { num: 12, suffix: '', label: 'Countries Served' },
            { num: 15, suffix: '+', label: 'Years of Operation' },
            { num: 10000, suffix: '+', label: 'Trips Completed' },
            { num: 99, suffix: '%', label: 'On-Time Rate' },
          ].map(s => (
            <div className="stats-band-item" key={s.label}>
              <div className="stats-band-num"><AnimatedCounter target={s.num} suffix={s.suffix} /></div>
              <div className="stats-band-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Network — regional offices
═══════════════════════════════════════════ */
const REGIONS = [
  { region:'Headquarters', country:'Ghana', city:'Accra & Kumasi', coord:'05.60°N, 00.18°W', color:'#E8C77E' },
  { region:'West Coast Corridor', country:'Nigeria', city:'Lagos', coord:'06.45°N, 03.39°E', color:'#C9601A' },
  { region:'West Coast Corridor', country:"Côte d'Ivoire", city:'Abidjan', coord:'05.31°N, 04.03°W', color:'#C9601A' },
  { region:'Sahel Network', country:'Senegal', city:'Dakar', coord:'14.69°N, 17.45°W', color:'#5B7186' },
  { region:'Sahel Network', country:'Togo', city:'Lomé', coord:'06.13°N, 01.22°E', color:'#5B7186' },
  { region:'International Gateway', country:'Netherlands', city:'Rotterdam', coord:'51.92°N, 04.48°E', color:'#8a9bb0' },
];

function Network() {
  return (
    <section className="section" id="network">
      <style>{`
        .network-layout{display:grid;grid-template-columns:0.95fr 1.05fr;gap:72px;align-items:center;}
        .region-table{border-top:1px solid var(--hairline);margin-top:8px;}
        .region-row{display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center;padding:16px 2px;border-bottom:1px solid var(--hairline);transition:background 0.2s;}
        .region-row:hover{background:rgba(237,239,242,0.025);}
        .region-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
        .region-city{font-size:14.5px;font-weight:600;color:#fff;}
        .region-meta{font-family:var(--font-mono);font-size:10.5px;color:var(--steel);text-transform:uppercase;letter-spacing:0.04em;margin-top:2px;}
        .region-coord{font-family:var(--font-mono);font-size:11.5px;color:var(--steel);text-align:right;white-space:nowrap;}
        @media(max-width:900px){.network-layout{grid-template-columns:1fr;}.network-layout > div:first-child{order:2;}}
      `}</style>
      <div className="container">
        <div className="network-layout">
          <FadeUp>
            <div>
              <div className="eyebrow">Our Network</div>
              <h2 className="heading-lg" style={{ marginBottom:18 }}>Connecting Africa to the world</h2>
              <p className="body-lg" style={{ marginBottom:8 }}>
                Our logistics network spans 12+ countries across West Africa, with international
                connections to Europe, Asia, and the Americas. Every node is tracked in real time
                through our ERP platform.
              </p>
              <div className="region-table">
                {REGIONS.map(r => (
                  <div className="region-row" key={r.city}>
                    <span className="region-dot" style={{ background: r.color, boxShadow:`0 0 8px ${r.color}` }} />
                    <div>
                      <div className="region-city">{r.city}, {r.country}</div>
                      <div className="region-meta">{r.region}</div>
                    </div>
                    <div className="region-coord">{r.coord}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div style={{ height:480, position:'relative' }}>
              <Globe3D />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Technology — ERP dashboard preview
═══════════════════════════════════════════ */
function Technology() {
  return (
    <section className="section" id="technology" style={{ background:'linear-gradient(180deg,transparent,rgba(15,34,64,0.35),transparent)' }}>
      <style>{`
        .tech-layout{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .dash{background:rgba(237,239,242,0.03);border:1px solid var(--hairline-2);border-radius:8px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(0,0,0,0.6);}
        .dash-bar{display:flex;align-items:center;gap:7px;padding:13px 18px;border-bottom:1px solid var(--hairline);background:rgba(237,239,242,0.02);}
        .dash-dot{width:9px;height:9px;border-radius:50%;}
        .dash-cards{display:grid;grid-template-columns:repeat(4,1fr);}
        .dash-card{padding:18px 14px;border-right:1px solid var(--hairline);border-bottom:1px solid var(--hairline);}
        .dash-card:last-child{border-right:none;}
        .dash-card-num{font-family:var(--font-display);font-size:19px;font-weight:600;}
        .dash-card-label{font-family:var(--font-mono);font-size:9px;color:var(--steel);text-transform:uppercase;letter-spacing:0.06em;margin-top:4px;}
        .dash-chart{display:flex;align-items:flex-end;gap:4px;height:90px;padding:16px 18px 0;}
        .dash-bar-el{flex:1;border-radius:2px 2px 0 0;}
        .dash-list-row{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--hairline);}
        .dash-list{padding:14px 18px;}
        .dash-list:first-child{border-right:1px solid var(--hairline);}
        .dash-list-title{font-family:var(--font-mono);font-size:9.5px;color:var(--steel);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;}
        .dash-list-item{display:flex;align-items:center;justify-content:space-between;padding:6px 0;font-size:11.5px;color:var(--white-70);}
        .dash-badge{padding:2px 8px;border-radius:2px;font-family:var(--font-mono);font-size:9px;font-weight:600;letter-spacing:0.03em;}
        .feature-list{display:flex;flex-direction:column;}
        .feature-row{display:flex;gap:18px;align-items:flex-start;padding:20px 0;border-top:1px solid var(--hairline);}
        .feature-row:last-child{border-bottom:1px solid var(--hairline);}
        .feature-row-icon{width:38px;height:38px;border:1px solid var(--hairline-2);border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--brass);}
        .feature-row-title{font-weight:600;font-size:15px;margin-bottom:5px;color:#fff;}
        .feature-row-desc{font-size:13.5px;color:var(--white-50);line-height:1.65;max-width:380px;}
        @media(max-width:900px){.tech-layout{grid-template-columns:1fr;}}
      `}</style>
      <div className="container">
        <div className="tech-layout">
          <FadeUp delay={1}>
            <div className="dash">
              <div className="dash-bar">
                <div className="dash-dot" style={{ background:'#5B7186' }} /><div className="dash-dot" style={{ background:'#8a9bb0' }} /><div className="dash-dot" style={{ background:'#C9601A' }} />
                <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--steel)', marginLeft:8 }}>panom.taurusgh.com — live</span>
                <div style={{ marginLeft:'auto',display:'flex',alignItems:'center',gap:6 }}>
                  <div style={{ width:6,height:6,borderRadius:'50%',background:'#8FBF8F',animation:'pulse-dot 2s infinite' }} />
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, color:'#8FBF8F' }}>LIVE</span>
                </div>
              </div>
              <div className="dash-cards">
                {[
                  { num:'247', label:'Active Trips', color:'#fff' },
                  { num:'GHS 4.2M', label:'Revenue MTD', color:'#8FBF8F' },
                  { num:'18', label:'Maint. Due', color:'#E8C77E' },
                  { num:'98.7%', label:'Fleet Uptime', color:'#fff' },
                ].map(c => (
                  <div className="dash-card" key={c.label}>
                    <div className="dash-card-num" style={{ color:c.color }}>{c.num}</div>
                    <div className="dash-card-label">{c.label}</div>
                  </div>
                ))}
              </div>
              <div className="dash-chart">
                {[55,70,45,80,65,90,75,85,60,95,80,88].map((h, i) => (
                  <div key={i} className="dash-bar-el" style={{ height:`${h}%`, background: i===11 ? '#C9601A' : 'rgba(91,113,134,0.5)' }} />
                ))}
              </div>
              <div className="dash-list-row">
                <div className="dash-list">
                  <div className="dash-list-title">Recent Trips</div>
                  {[
                    { id:'T-2847', route:'ACC→LOS', label:'Active', bg:'rgba(143,191,143,0.15)', fg:'#8FBF8F' },
                    { id:'T-2846', route:'KSI→ABJ', label:'Transit', bg:'rgba(232,199,126,0.15)', fg:'#E8C77E' },
                    { id:'T-2845', route:'ACC→DKR', label:'Sched.', bg:'rgba(91,113,134,0.2)', fg:'#8a9bb0' },
                  ].map(t => (
                    <div className="dash-list-item" key={t.id}>
                      <span>{t.id}</span><span style={{ opacity:0.5 }}>{t.route}</span>
                      <span className="dash-badge" style={{ background:t.bg, color:t.fg }}>{t.label}</span>
                    </div>
                  ))}
                </div>
                <div className="dash-list">
                  <div className="dash-list-title">Fuel Alerts</div>
                  {[
                    { truck:'GR-2841 TC', pct:18 },
                    { truck:'GR-1923 TC', pct:12 },
                    { truck:'GR-3047 TC', pct:8 },
                  ].map(f => (
                    <div className="dash-list-item" key={f.truck}>
                      <span>{f.truck}</span>
                      <span style={{ color:'#E8C77E', fontWeight:700 }}>{f.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div>
              <div className="eyebrow">ERP Technology — Panom</div>
              <h2 className="heading-lg" style={{ marginBottom:18 }}>Enterprise software built for logistics</h2>
              <p className="body-lg" style={{ marginBottom:8 }}>Our custom-built order-management platform runs everything — from a single live dashboard to deep analytics across every branch.</p>
              <div className="feature-list">
                {[
                  { title:'Real-Time Trip Tracking', desc:'Monitor every vehicle and route with live GPS integration and instant status updates.', icon:<path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zM12 12a3 3 0 100-6 3 3 0 000 6z"/> },
                  { title:'Fuel Intelligence', desc:'Track consumption per trip, detect inefficiencies, and eliminate fuel theft with real-time alerts.', icon:<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2zM6 8h8M17 9h1a2 2 0 012 2v6a2 2 0 11-4 0V5"/> },
                  { title:'Multi-Branch Management', desc:'Super-admin controls for managing branches, currencies, and users from one dashboard.', icon:<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></> },
                  { title:'Financial Reporting', desc:'Automated revenue, expenditure, and profitability reports with multi-currency invoicing.', icon:<path d="M3 3v18h18M7 14l4-4 4 4 5-6"/> },
                ].map(f => (
                  <div className="feature-row" key={f.title}>
                    <div className="feature-row-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                    </div>
                    <div>
                      <div className="feature-row-title">{f.title}</div>
                      <div className="feature-row-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Fleet Showcase — real 3D truck
═══════════════════════════════════════════ */
function FleetShowcase() {
  return (
    <section className="section" id="fleet">
      <style>{`
        .fleet-frame{position:relative;height:420px;border-radius:8px;overflow:hidden;border:1px solid var(--hairline-2);background:linear-gradient(180deg,#0B1626 0%,#070D17 100%);}
        .fleet-info-bar{position:absolute;bottom:0;left:0;right:0;padding:0 36px 30px;background:linear-gradient(0deg,rgba(7,13,23,0.95) 0%,transparent 100%);display:flex;gap:48px;flex-wrap:wrap;}
        .fleet-info-num{font-family:var(--font-display);font-weight:600;font-size:26px;}
        .fleet-info-label{font-family:var(--font-mono);font-size:10.5px;color:var(--steel);text-transform:uppercase;letter-spacing:0.06em;margin-top:4px;}
        .fleet-caption{position:absolute;top:24px;left:36px;}
      `}</style>
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom:48, maxWidth:680 }}>
            <div className="eyebrow">Our Fleet</div>
            <h2 className="heading-lg" style={{ marginBottom:18 }}>500+ modern vehicles, GPS-tracked end to end</h2>
            <p className="body-lg">Maintained on a strict preventive schedule and always ready for the long haul — every vehicle is logged, audited, and tracked through Panom.</p>
          </div>
        </FadeUp>
        <FadeUp delay={2}>
          <div className="fleet-frame">
            <div className="fleet-caption coord-chip">UNIT GR-2841 TC — ROUTE ACC→LOS</div>
            <Truck3D />
            <div className="fleet-info-bar">
              {[
                { label:'Tractor-Trailers', count:'180+', color:'#C9601A' },
                { label:'Cargo Trucks', count:'220+', color:'#E8C77E' },
                { label:'Light Commercial', count:'100+', color:'#8a9bb0' },
              ].map(v => (
                <div key={v.label}>
                  <div className="fleet-info-num" style={{ color:v.color }}>{v.count}</div>
                  <div className="fleet-info-label">{v.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Why Choose Us — capabilities/mission/vision
═══════════════════════════════════════════ */
const WHY_REASONS = [
  { title:'Adaptability', desc:'We specialize in taking on complex problems and transforming them into easy-to-manage solutions.' },
  { title:'Experience', desc:'With 15+ years of operation, we have the knowledge to address any challenge, anywhere in the region.' },
  { title:'End-to-End Solutions', desc:'From point of origin to final destination, our logistics solutions optimize the supply chain from beginning to end.' },
  { title:'Reach', desc:'With hubs across 12+ countries, we address client needs quickly, even in the most remote locations.' },
];

function WhyChooseUs() {
  return (
    <section className="section" id="about" style={{ background:'linear-gradient(180deg,transparent,rgba(15,34,64,0.35),transparent)' }}>
      <style>{`
        .why-top{display:grid;grid-template-columns:1fr 1fr 1fr;gap:48px;margin-bottom:72px;}
        .why-top-block{border-top:2px solid var(--brass);padding-top:22px;}
        .why-top-title{font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:var(--brass);margin-bottom:14px;}
        .why-top-text{font-size:14.5px;color:var(--white-70);line-height:1.75;}
        .why-reasons{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--hairline);border:1px solid var(--hairline);border-radius:6px;overflow:hidden;}
        .why-reason{background:var(--ink);padding:32px 26px;}
        .why-reason-title{font-family:var(--font-display);font-weight:600;font-size:17px;margin-bottom:10px;}
        .why-reason-desc{font-size:13px;color:var(--white-50);line-height:1.7;}
        @media(max-width:900px){.why-top{grid-template-columns:1fr;gap:32px;}.why-reasons{grid-template-columns:1fr 1fr;}}
      `}</style>
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom:56 }}>
            <div className="eyebrow">Why Choose Us</div>
            <h2 className="heading-lg">Making the impossible, possible</h2>
          </div>
        </FadeUp>
        <FadeUp delay={1}>
          <div className="why-top">
            <div className="why-top-block">
              <div className="why-top-title">Capabilities</div>
              <p className="why-top-text">We tirelessly troubleshoot to eliminate choke points, prevent stock depletion, streamline redundancies, and make delays a thing of the past.</p>
            </div>
            <div className="why-top-block">
              <div className="why-top-title">Mission</div>
              <p className="why-top-text">To design, build, and implement innovative, profitable, and sustainable services that help our customers meet demand — irrespective of fulfillment channel.</p>
            </div>
            <div className="why-top-block">
              <div className="why-top-title">Vision</div>
              <p className="why-top-text">To be the premier provider of supply-chain services across West Africa, enabling sustainable trade through investment in people, facilities, and technology.</p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={2}>
          <div className="why-reasons">
            {WHY_REASONS.map(r => (
              <div className="why-reason" key={r.title}>
                <div className="why-reason-title">{r.title}</div>
                <div className="why-reason-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Testimonials
═══════════════════════════════════════════ */
function Testimonials() {
  const testimonials = [
    { name:'Kwame Asante', role:'Supply Chain Director', company:'GoldFields Ghana', quote:'Taurus transformed our logistics operations. The Panom dashboard gives us complete visibility across 40 trucks — fuel, trips, maintenance — all in one place.' },
    { name:'Fatima Diallo', role:'Operations Manager', company:'Dangote Industries', quote:'Reliability is everything in logistics. Taurus has delivered 99%+ on-time across our Abidjan–Lagos corridor for over three years. Exceptional partners.' },
    { name:'Emmanuel Boateng', role:'CEO', company:'Accra Cold Chain', quote:'The multi-branch ERP with real-time fuel tracking saved us 18% on operational costs in the first year. The return was faster than we expected.' },
  ];

  return (
    <section className="section">
      <style>{`
        .test-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:1px;background:var(--hairline);border:1px solid var(--hairline);border-radius:6px;overflow:hidden;}
        .test-card{background:var(--ink);padding:36px 32px;display:flex;flex-direction:column;gap:22px;}
        .test-mark{font-family:var(--font-display);font-size:40px;color:var(--brass-dim);line-height:1;}
        .test-quote{font-size:14.5px;color:var(--white-70);line-height:1.8;flex:1;}
        .test-footer{display:flex;align-items:center;gap:13px;padding-top:18px;border-top:1px solid var(--hairline);}
        .test-avatar{width:38px;height:38px;border-radius:2px;border:1px solid var(--hairline-2);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:600;font-size:15px;color:var(--brass);flex-shrink:0;}
        .test-name{font-weight:600;font-size:13.5px;}
        .test-role{font-size:11.5px;color:var(--steel);margin-top:1px;}
      `}</style>
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom:56, maxWidth:680 }}>
            <div className="eyebrow">Client Stories</div>
            <h2 className="heading-lg">Trusted by industry leaders</h2>
          </div>
        </FadeUp>
        <FadeUp delay={1}>
          <div className="test-grid">
            {testimonials.map(t => (
              <div className="test-card" key={t.name}>
                <div className="test-mark">"</div>
                <p className="test-quote">{t.quote}</p>
                <div className="test-footer">
                  <div className="test-avatar">{t.name[0]}</div>
                  <div>
                    <div className="test-name">{t.name}</div>
                    <div className="test-role">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Contact
═══════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name:'', email:'', company:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1300);
  };

  return (
    <section className="section" id="contact" style={{ background:'linear-gradient(180deg,transparent,rgba(15,34,64,0.35),transparent)' }}>
      <style>{`
        .contact-layout{display:grid;grid-template-columns:1.1fr 0.9fr;gap:64px;align-items:start;}
        .contact-form{border:1px solid var(--hairline);border-radius:6px;padding:40px;background:rgba(237,239,242,0.02);}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .form-group{margin-bottom:20px;}
        .form-label{display:block;font-family:var(--font-mono);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--steel);margin-bottom:9px;}
        .form-input,.form-textarea{width:100%;background:rgba(237,239,242,0.04);border:1px solid var(--hairline-2);border-radius:3px;padding:12px 15px;color:#fff;font-size:14px;font-family:var(--font-body);outline:none;transition:all 0.2s;}
        .form-input:focus,.form-textarea:focus{border-color:var(--brass);box-shadow:0 0 0 3px rgba(232,199,126,0.1);}
        .form-textarea{min-height:120px;resize:vertical;}
        .contact-info{display:flex;flex-direction:column;gap:1px;background:var(--hairline);border:1px solid var(--hairline);border-radius:6px;overflow:hidden;}
        .contact-info-item{display:flex;gap:16px;align-items:flex-start;padding:22px 24px;background:var(--ink);}
        .contact-info-icon{width:38px;height:38px;border:1px solid var(--hairline-2);border-radius:4px;display:flex;align-items:center;justify-content:center;color:var(--brass);flex-shrink:0;}
        .contact-info-title{font-weight:700;font-size:13.5px;margin-bottom:4px;}
        .contact-info-text{font-size:13px;color:var(--white-50);line-height:1.65;}
        @media(max-width:800px){.contact-layout{grid-template-columns:1fr;}.form-row{grid-template-columns:1fr;}.contact-form{padding:28px;}}
      `}</style>
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom:56, maxWidth:680 }}>
            <div className="eyebrow">Get In Touch</div>
            <h2 className="heading-lg" style={{ marginBottom:18 }}>Ready to move your cargo?</h2>
            <p className="body-lg">Get a quote in under 24 hours. Our logistics experts are standing by.</p>
          </div>
        </FadeUp>
        <div className="contact-layout">
          <FadeUp delay={1}>
            <div className="contact-form">
              {sent ? (
                <div style={{ textAlign:'center',padding:'50px 0' }}>
                  <div style={{ fontFamily:'var(--font-display)',fontSize:26,fontWeight:600,marginBottom:10 }}>Message sent.</div>
                  <div style={{ color:'var(--white-50)',fontSize:14 }}>We'll get back to you within 24 hours.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
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
                    <label className="form-label">Logistics Needs</label>
                    <textarea className="form-textarea" placeholder="Origin, destination, cargo type, frequency..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width:'100%',justifyContent:'center',border:'none',cursor:'pointer',fontSize:15 }} disabled={loading}>
                    {loading ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="contact-info">
              {[
                { title:'Headquarters', text:'Accra, Ghana — Main Hub\nKumasi, Ghana — Regional Office', icon:<path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zM12 12a3 3 0 100-6 3 3 0 000 6z"/> },
                { title:'Phone', text:'+233 (0) 30 000 0000\nAvailable 24/7 for emergencies', icon:<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/> },
                { title:'Email', text:'logistics@taurusgh.com\nops@taurusgh.com', icon:<><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></> },
                { title:'Operating Hours', text:'Mon–Fri: 6:00 AM – 10:00 PM\nWeekends: 7:00 AM – 8:00 PM', icon:<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></> },
              ].map(c => (
                <div className="contact-info-item" key={c.title}>
                  <div className="contact-info-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                  </div>
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

/* ═══════════════════════════════════════════
   Footer
═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--hairline)', padding:'72px 0 36px' }}>
      <style>{`
        .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:56px;}
        .footer-brand-desc{font-size:13.5px;color:var(--white-50);line-height:1.75;max-width:280px;margin-top:16px;}
        .footer-col-title{font-family:var(--font-mono);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--steel);margin-bottom:18px;}
        .footer-links{list-style:none;display:flex;flex-direction:column;gap:11px;}
        .footer-links a{font-size:13.5px;color:var(--white-50);text-decoration:none;transition:color 0.2s;}
        .footer-links a:hover{color:#fff;}
        .footer-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:28px;border-top:1px solid var(--hairline);}
        .footer-bottom-text{font-family:var(--font-mono);font-size:11.5px;color:var(--steel);}
        @media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr;}.footer-bottom{flex-direction:column;gap:10px;text-align:center;}}
      `}</style>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:12 }}>
              <div style={{ width:34,height:34,border:'1px solid var(--brass-dim)',borderRadius:2,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:15,color:'var(--brass)',fontFamily:'var(--font-display)' }}>T</div>
              <div style={{ fontFamily:'var(--font-display)',fontWeight:600,fontSize:16 }}>Taurus Trade &amp; Logistics</div>
            </div>
            <p className="footer-brand-desc">Pan-African logistics excellence. Moving cargo across 12+ countries with integrity, technology, and speed since 2010.</p>
            <div style={{ display:'flex',gap:10,marginTop:20 }}>
              {['Li','Tw','Fb'].map(s => (
                <a key={s} href="#" style={{ width:32,height:32,borderRadius:2,border:'1px solid var(--hairline-2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--steel)',fontSize:10.5,fontWeight:700,textDecoration:'none',transition:'all 0.2s',fontFamily:'var(--font-mono)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--brass)'; e.currentTarget.style.color='var(--brass)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--hairline-2)'; e.currentTarget.style.color='var(--steel)'; }}
                >{s}</a>
              ))}
            </div>
          </div>
          {[
            { title:'Solutions', links:['Road Freight','Distribution & Fulfillment','Customs Brokerage','Fleet & ERP Technology'] },
            { title:'Company', links:['About Us','Our Fleet','Network','Careers','Contact'] },
            { title:'Technology', links:['Panom ERP','GPS Tracking','Fuel Monitoring','Track Shipment'] },
          ].map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map(l => (
                  <li key={l}>
                    <a href={l === 'Track Shipment' ? ERP_URL : '#'} target={l === 'Track Shipment' ? '_blank' : undefined} rel={l === 'Track Shipment' ? 'noopener noreferrer' : undefined}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-text">© {new Date().getFullYear()} TAURUS TRADE &amp; LOGISTICS — ALL RIGHTS RESERVED</div>
          <div className="footer-bottom-text">BUILT IN ACCRA, GHANA</div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   App
═══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <TrustStrip />
      <Markets />
      <Solutions />
      <StatsBand />
      <Network />
      <Technology />
      <FleetShowcase />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
