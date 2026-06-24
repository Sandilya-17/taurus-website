import { useState, useEffect, useRef } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Globe3D from './components/Globe3D';
import Truck3D from './components/Truck3D';
import AnimatedCounter from './components/AnimatedCounter';
import FadeUp from './components/FadeUp';

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
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
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="nav-logo">
              <div className="nav-logo-icon">T</div>
              <div className="nav-logo-text">
                <div className="nav-logo-name">Taurus</div>
                <div className="nav-logo-sub">Trade & Logistics</div>
              </div>
            </a>
            <ul className="nav-links">
              {links.map(l => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
              <li><a href="http://localhost:3000" className="nav-cta">Login to ERP →</a></li>
            </ul>
            <button className="nav-mobile-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <button
          onClick={() => setMobileOpen(false)}
          style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        {links.map(l => (
          <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href="http://localhost:3000" style={{ color: '#3B82F6 !important' }}>Login to ERP</a>
      </div>
    </>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Particle BG */}
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="orb orb-blue" style={{ width: 500, height: 500, top: '-100px', right: '-100px', opacity: 0.4 }} />
      <div className="orb orb-orange" style={{ width: 300, height: 300, bottom: '10%', left: '10%', opacity: 0.2 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Pan-African Freight Excellence
          </div>

          <h1 className="hero-title">
            Moving Africa's
            <br />
            <span>Economy Forward</span>
          </h1>

          <p className="hero-sub">
            Taurus Trade & Logistics delivers end-to-end supply chain solutions
            across West Africa and beyond — powered by cutting-edge ERP technology,
            a trusted fleet, and a relentless commitment to on-time delivery.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Get a Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#services" className="btn-secondary">
              Our Services
            </a>
          </div>

          <div className="hero-stats">
            {[
              { num: '500', suffix: '+', label: 'Trucks Managed' },
              { num: '15', suffix: '+', label: 'Years Experience' },
              { num: '99', suffix: '%', label: 'On-Time Delivery' },
              { num: '12', suffix: '', label: 'Countries Served' },
            ].map(s => (
              <div className="hero-stat" key={s.label}>
                <div className="hero-stat-num">{s.num}{s.suffix}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Truck track at bottom */}
      <div className="truck-track">
        <div className="truck-anim">🚛</div>
      </div>
    </section>
  );
}

/* ── Services ── */
const SERVICES = [
  {
    icon: '🚛',
    title: 'Road Freight',
    desc: 'Pan-African road transport covering 12+ countries with our modern, GPS-tracked fleet of 500+ trucks.',
    accent: '#2563EB',
    iconBg: 'rgba(37,99,235,0.12)',
    iconBorder: 'rgba(37,99,235,0.3)',
  },
  {
    icon: '⛽',
    title: 'Fuel & Fleet Management',
    desc: 'Real-time fuel monitoring, driver tracking, and preventive maintenance scheduling via our integrated ERP.',
    accent: '#F97316',
    iconBg: 'rgba(249,115,22,0.12)',
    iconBorder: 'rgba(249,115,22,0.3)',
  },
  {
    icon: '📦',
    title: 'Inventory & Warehousing',
    desc: 'Smart inventory management with stock ledger, purchase tracking, and automated low-stock alerts.',
    accent: '#8B5CF6',
    iconBg: 'rgba(139,92,246,0.12)',
    iconBorder: 'rgba(139,92,246,0.3)',
  },
  {
    icon: '📊',
    title: 'Logistics Analytics',
    desc: 'Executive dashboards with real-time KPIs — revenue, expenditure, trip analytics, and financial reports.',
    accent: '#06B6D4',
    iconBg: 'rgba(6,182,212,0.12)',
    iconBorder: 'rgba(6,182,212,0.3)',
  },
  {
    icon: '🔧',
    title: 'Fleet Maintenance',
    desc: 'Proactive maintenance scheduling, tyre management, and full audit logs for every vehicle in your fleet.',
    accent: '#10B981',
    iconBg: 'rgba(16,185,129,0.12)',
    iconBorder: 'rgba(16,185,129,0.3)',
  },
  {
    icon: '💳',
    title: 'Invoicing & Finance',
    desc: 'Automated invoicing, multi-currency support, and comprehensive financial reporting across all branches.',
    accent: '#F59E0B',
    iconBg: 'rgba(245,158,11,0.12)',
    iconBorder: 'rgba(245,158,11,0.3)',
  },
];

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-badge">What We Do</div>
            <h2 className="section-title">Complete Logistics Solutions</h2>
            <p className="section-sub">
              From fleet management to financial reporting — every tool your logistics
              business needs, unified in one powerful platform.
            </p>
          </div>
        </FadeUp>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={Math.min(i + 1, 5)}>
              <div
                className="service-card"
                style={{ '--card-accent': s.accent }}
              >
                <div
                  className="service-icon"
                  style={{ '--icon-bg': s.iconBg, '--icon-border': s.iconBorder }}
                >
                  {s.icon}
                </div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats Band ── */
function StatsBand() {
  return (
    <div className="stats-band" id="about">
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
              <div className="stat-num">
                <AnimatedCounter target={s.num} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Network (Globe) ── */
function Network() {
  return (
    <section className="section route-map-section" id="network">
      <div className="route-map-bg">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <FadeUp>
              <div>
                <div className="section-badge">Our Network</div>
                <h2 className="section-title">Connecting Africa<br />to the World</h2>
                <p className="section-sub" style={{ marginBottom: 32 }}>
                  Our logistics network spans 12+ countries across West Africa,
                  with international connections to Europe, Asia, and the Americas.
                  Every node is tracked in real-time through our ERP platform.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { flag: '🇬🇭', country: 'Ghana (HQ)', desc: 'Accra & Kumasi hubs' },
                    { flag: '🇳🇬', country: 'Nigeria', desc: 'Lagos operations' },
                    { flag: '🇨🇮', country: "Côte d'Ivoire", desc: 'Abidjan corridor' },
                    { flag: '🌍', country: 'West Africa+', desc: '9 more countries' },
                  ].map(c => (
                    <div key={c.country} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ fontSize: 22 }}>{c.flag}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{c.country}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{c.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={2}>
              <div style={{ width: '100%', aspectRatio: '1/1', position: 'relative' }}>
                <div className="orb orb-blue" style={{ width: 300, height: 300, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.15, animation: 'glow-pulse 3s ease-in-out infinite' }} />
                <Globe3D />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Mobile: reverse column */}
      <style>{`@media(max-width:900px){.network-inner{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── Technology (ERP Preview) ── */
function Technology() {
  return (
    <section className="section" id="technology" style={{ background: 'linear-gradient(180deg, transparent, rgba(14,28,60,0.5), transparent)' }}>
      <div className="container">
        <div className="features-layout">
          {/* Left: Dashboard preview */}
          <FadeUp delay={1}>
            <div className="features-visual" style={{ width: '100%', minHeight: 480 }}>
              <div className="dashboard-preview" style={{ position: 'relative', height: '100%' }}>
                <div className="dashboard-preview-bar">
                  <div className="db-dot db-dot-r" /><div className="db-dot db-dot-y" /><div className="db-dot db-dot-g" />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>Taurus ERP — Dashboard</span>
                </div>
                <div className="db-cards">
                  {[
                    { num: '247', label: 'Active Trips', color: '#60A5FA' },
                    { num: 'GHS 4.2M', label: 'Revenue MTD', color: '#4ADE80' },
                    { num: '18', label: 'Maintenance Due', color: '#FB923C' },
                    { num: '98.7%', label: 'Fleet Uptime', color: '#A78BFA' },
                  ].map(c => (
                    <div className="db-card" key={c.label}>
                      <div className="db-card-num" style={{ color: c.color }}>{c.num}</div>
                      <div className="db-card-label">{c.label}</div>
                    </div>
                  ))}
                </div>
                <div className="db-chart">
                  {[55,70,45,80,65,90,75,85,60,95,80,88].map((h, i) => (
                    <div key={i} className="db-bar" style={{
                      height: `${h}%`,
                      background: i === 11
                        ? 'linear-gradient(180deg,#F97316,#FB923C)'
                        : 'linear-gradient(180deg,#2563EB,#3B82F6)',
                      opacity: i === 11 ? 1 : 0.6,
                    }} />
                  ))}
                </div>
                <div className="db-chart-row">
                  <div className="db-list">
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Recent Trips</div>
                    {[
                      { id: 'T-2847', route: 'ACC→LOS', status: 'db-badge-green', label: 'Active' },
                      { id: 'T-2846', route: 'KSI→ABJ', status: 'db-badge-orange', label: 'In Transit' },
                      { id: 'T-2845', route: 'ACC→DKR', status: 'db-badge-blue', label: 'Scheduled' },
                    ].map(t => (
                      <div className="db-list-item" key={t.id}>
                        <span>{t.id}</span><span style={{ opacity: 0.6 }}>{t.route}</span>
                        <span className={`db-badge ${t.status}`}>{t.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="db-list">
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Fuel Alerts</div>
                    {[
                      { truck: 'GR-2841 TC', pct: 18 },
                      { truck: 'GR-1923 TC', pct: 12 },
                      { truck: 'GR-3047 TC', pct: 8 },
                    ].map(f => (
                      <div className="db-list-item" key={f.truck}>
                        <span>{f.truck}</span>
                        <span style={{ color: '#FB923C', fontWeight: 700 }}>{f.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="float-card" style={{ top: '-20px', right: '-30px', animation: 'float 4s ease-in-out infinite' }}>
                <div className="float-card-title">Today's Revenue</div>
                <div className="float-card-value" style={{ color: '#4ADE80' }}>GHS 142,800</div>
                <div className="float-card-delta delta-up">▲ 12.4% vs yesterday</div>
              </div>
              <div className="float-card" style={{ bottom: '30px', right: '-20px', animation: 'float2 5s ease-in-out infinite' }}>
                <div className="float-card-title">Active Drivers</div>
                <div className="float-card-value" style={{ color: '#60A5FA' }}>184 / 210</div>
                <div className="float-card-delta" style={{ color: 'rgba(255,255,255,0.5)' }}>87.6% utilization</div>
              </div>
            </div>
          </FadeUp>

          {/* Right: Feature list */}
          <FadeUp delay={2}>
            <div>
              <div className="section-badge">ERP Technology</div>
              <h2 className="section-title">Enterprise Software Built for Logistics</h2>
              <p className="section-sub" style={{ marginBottom: 36 }}>
                Our custom-built ERP system manages everything — from a single
                dashboard to deep analytics across all branches.
              </p>
              <div className="features-list">
                {[
                  { icon: '🗺️', title: 'Real-Time Trip Tracking', desc: 'Monitor every truck, every route, with live GPS integration and status updates.' },
                  { icon: '⛽', title: 'Fuel Intelligence', desc: 'Track consumption per trip, detect inefficiencies, and eliminate fuel theft with real-time alerts.' },
                  { icon: '📋', title: 'Multi-Branch Management', desc: 'Super admin controls for managing multiple branches, currencies, and users from one dashboard.' },
                  { icon: '📈', title: 'Financial Reports', desc: 'Automated revenue, expenditure, and profitability reports. Invoicing with multi-currency support.' },
                  { icon: '🔔', title: 'Smart Alerts', desc: 'Maintenance due, low stock, fuel alerts — proactive notifications before problems occur.' },
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
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── Fleet Showcase ── */
function FleetShowcase() {
  return (
    <section className="section" style={{ background: 'rgba(0,0,0,0.2)', padding: '80px 0' }}>
      <div className="container">
        <FadeUp>
          <div className="section-header centered">
            <div className="section-badge">Our Fleet</div>
            <h2 className="section-title">500+ Modern Vehicles</h2>
            <p className="section-sub">
              From long-haul tractor-trailers to mid-range cargo trucks —
              GPS-tracked, maintained, and always ready.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={2}>
          <div style={{ position: 'relative', height: 320, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(180deg, #0A1628 0%, #0D1F3C 100%)' }}>
            <Truck3D style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 32px 24px', background: 'linear-gradient(0deg, rgba(10,22,40,0.9) 0%, transparent 100%)' }}>
              <div style={{ display: 'flex', gap: 32 }}>
                {[
                  { label: 'Tractor-Trailers', count: '180+' },
                  { label: 'Cargo Trucks', count: '220+' },
                  { label: 'Light Commercial', count: '100+' },
                ].map(v => (
                  <div key={v.label}>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 22, color: '#F97316' }}>{v.count}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{v.label}</div>
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

/* ── Testimonials ── */
function Testimonials() {
  const testimonials = [
    { name: 'Kwame Asante', role: 'Supply Chain Director', company: 'GoldFields Ghana', quote: 'Taurus transformed our logistics operations. The ERP dashboard gives us complete visibility across 40 trucks — fuel, trips, maintenance — all in one place.' },
    { name: 'Fatima Diallo', role: 'Operations Manager', company: 'Dangote Industries', quote: 'Reliability is everything in logistics. Taurus has delivered 99%+ on-time across our Abidjan-Lagos corridor for over 3 years. Exceptional partners.' },
    { name: 'Emmanuel Boateng', role: 'CEO', company: 'Accra Cold Chain', quote: "The multi-branch ERP with real-time fuel tracking saved us 18% on operational costs in the first year. The ROI was faster than we expected." },
  ];

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <FadeUp>
          <div className="section-header centered">
            <div className="section-badge">Client Stories</div>
            <h2 className="section-title">Trusted by Industry Leaders</h2>
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i + 1}>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, padding: '28px 28px 24px',
                display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{ fontSize: 32, color: '#2563EB', fontFamily: 'serif', lineHeight: 1 }}>"</div>
                <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, flex: 1 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1E3A8A, #2563EB)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 16,
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{t.role}, {t.company}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                    {'★★★★★'.split('').map((s, j) => <span key={j} style={{ color: '#F97316', fontSize: 12 }}>{s}</span>)}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <FadeUp>
          <div className="section-header centered">
            <div className="section-badge">Get In Touch</div>
            <h2 className="section-title">Ready to Move Your Cargo?</h2>
            <p className="section-sub">
              Get a quote in under 24 hours. Our logistics experts are standing by.
            </p>
          </div>
        </FadeUp>

        <div className="contact-layout">
          <FadeUp delay={1}>
            <div className="contact-form">
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Message Sent!</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>We'll get back to you within 24 hours.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                    {loading ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin-slow 0.8s linear infinite' }}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                        Sending…
                      </>
                    ) : 'Send Message →'}
                  </button>
                  <style>{`@keyframes spin-slow{to{transform:rotate(360deg)}}`}</style>
                </form>
              )}
            </div>
          </FadeUp>

          <FadeUp delay={2}>
            <div className="contact-info">
              <div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Our Offices</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7 }}>
                  Headquartered in Accra, Ghana with operational hubs across West Africa.
                </p>
              </div>
              {[
                { icon: '📍', title: 'Headquarters', text: 'Accra, Ghana — Main Hub\nKumasi, Ghana — Regional Office' },
                { icon: '📞', title: 'Phone', text: '+233 (0) 30 000 0000\nAvailable 24/7 for emergencies' },
                { icon: '✉️', title: 'Email', text: 'logistics@taurusgh.com\nops@taurusgh.com' },
                { icon: '🕐', title: 'Operating Hours', text: 'Mon–Fri: 6:00 AM – 10:00 PM\nWeekends: 7:00 AM – 8:00 PM' },
              ].map(c => (
                <div className="contact-info-item" key={c.title}>
                  <div className="contact-info-icon">{c.icon}</div>
                  <div>
                    <div className="contact-info-title">{c.title}</div>
                    <div className="contact-info-text" style={{ whiteSpace: 'pre-line' }}>{c.text}</div>
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

/* ── Footer ── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#1E3A8A,#2563EB)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff', fontFamily: 'Space Grotesk' }}>T</div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 16 }}>Taurus Trade & Logistics</div>
              </div>
            </div>
            <p className="footer-brand-desc">
              Pan-African logistics excellence. Moving cargo across 12+ countries
              with integrity, technology, and speed since 2010.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {['LinkedIn', 'Twitter', 'Facebook'].map(s => (
                <a key={s} href="#" style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700,
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.2)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Services', links: ['Road Freight', 'Fleet Management', 'Warehousing', 'Analytics', 'Maintenance', 'Invoicing'] },
            { title: 'Company', links: ['About Us', 'Our Fleet', 'Network', 'Careers', 'News', 'Contact'] },
            { title: 'Technology', links: ['ERP Platform', 'GPS Tracking', 'Fuel Monitoring', 'Mobile App', 'API Access', 'Login'] },
          ].map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
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

/* ── App ── */
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
