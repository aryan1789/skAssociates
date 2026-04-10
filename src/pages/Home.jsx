import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fly-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary" style={{ padding: '5rem 0', minHeight: 'calc(100vh - 5rem)', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, var(--primary-container), var(--primary))' }}>
        <div className="container hero-grid">
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h1 className="text-on-primary font-serif hero-heading" style={{ fontSize: '3.75rem', lineHeight: 1.1, marginBottom: '2rem' }}>
              Friendly Tax & Accounting for Small Businesses
            </h1>
            <p className="font-body" style={{ color: 'var(--surface-container-highest)', fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.6, opacity: 0.9, maxWidth: '36rem' }}>
              We handle your bookkeeping and tax returns so you can get back to running your business. No stress, no corporate jargon.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="bg-surface text-primary" style={{ padding: '1rem 2rem', borderRadius: '0.5rem', fontWeight: 600, letterSpacing: '0.025em', transition: 'all 0.3s' }}>
                Get Started
              </button>
              <Link to="/services" style={{ padding: '1rem 2rem', borderRadius: '0.5rem', fontWeight: 600, letterSpacing: '0.025em', color: '#fff', border: '1px solid rgba(244, 250, 254, 0.3)', backdropFilter: 'blur(4px)', transition: 'all 0.3s' }}>
                View Our Services
              </Link>
            </div>
          </div>
          <div className="hero-image" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <img
              src="/office.png"
              alt="Our welcoming office"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', borderRadius: '0.5rem' }}
            />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '0.5rem', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)', pointerEvents: 'none' }}></div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-surface" style={{ padding: '6rem 0' }}>
        <div className="container">
          <h1 className="fly-in text-on-surface-variant">Helping You Stay Compliant, Confident, and in Control</h1>
          <br></br>
          <p className="fly-in text-on-surface-variant" style={{ fontSize: '1.25rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
            At <strong style={{ fontWeight: 600 }}>SK & Associates</strong>,  we believe accounting is more than just numbers - it's about giving you clarity and peace of mind. We provide reliable, practical, and personalised accounting and taxation services tailored to  businesses and individuals across New Zealand.
          </p>
          <p className="fly-in delay-1 text-on-surface-variant" style={{ fontSize: '1.25rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
            Whether you need help with tax returns, GST, bookkeeping, or ongoing financial advice, we take the time to understand your situation and offer solutions that truly work for you. Our approach is simple: clear advice, timely service, and no unnecessary complexity.
          </p>
          <p className="fly-in delay-2 text-on-surface-variant" style={{ fontSize: '1.25rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
            We pride ourselves on being approachable and responsive, ensuring you always feel supported and informed. With a strong focus on accuracy and compliance, you can trust that your financial matters are in safe hands.
          </p>
          <p className="fly-in delay-3 text-on-surface-variant" style={{ fontSize: '1.25rem', lineHeight: 1.8, fontWeight: 300 }}>
            Let us handle the numbers, so you can focus on growing your business with confidence.          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div className="fly-in stats-grid">
            {[
              { stat: '400+', label: 'Happy Clients' },
              { stat: '15+', label: 'Years of Experience' },
              { stat: '99%', label: 'Recommended' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '3.5rem 2rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, var(--primary-container), var(--primary))' }}>
                <p className="font-serif" style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1, background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.55))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{item.stat}</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-surface-container-low" style={{ padding: '8rem 0' }}>
        <div className="container">
          <div className="fly-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
            <div>
              <h2 className="text-primary font-serif" style={{ fontSize: '3rem' }}>We're Here to Help</h2>
            </div>
            <div style={{ paddingBottom: '0.5rem' }}>
              <Link to="/services" className="text-primary" style={{ borderBottom: '1px solid var(--primary)', transition: 'opacity 0.3s' }}>See all services</Link>
            </div>
          </div>
          <div className="service-highlight-grid">
            {[
              { icon: 'account_balance_wallet', title: 'Tax Returns', desc: 'Stress-free tax preparation for you and your business.' },
              { icon: 'menu_book', title: 'Accounting and Bookkeeping', desc: 'We keep your accounts organized so you always know where you stand.' },
              { icon: 'insights', title: 'Business Advice', desc: 'Friendly guidance on how to grow and manage your business.' },
            ].map((service, i) => (
              <div key={i} className={`fly-in delay-${i + 1}`} style={{ padding: '2.5rem', borderRadius: '0.5rem', transition: 'all 0.3s ease', cursor: 'pointer', background: 'linear-gradient(135deg, var(--primary-container), var(--primary))' }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', marginBottom: '2rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.875rem', color: 'rgba(255,255,255,0.9)' }}>{service.icon}</span>
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.95)' }}>{service.title}</h3>
                <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-surface-container-low" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="text-primary font-serif" style={{ fontSize: '3rem' }}>Our Partners</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
            {[
              'https://www.wizfinancials.co.nz/wp-content/uploads/2025/12/client2.png',
              'https://www.wizfinancials.co.nz/wp-content/uploads/2025/12/client3.png',
              'https://www.wizfinancials.co.nz/wp-content/uploads/2025/12/client4.png',
            ].map((src, i) => (
              <img key={i} src={src} alt={`Partner ${i + 1}`} style={{ height: '6rem', width: 'auto', maxWidth: '260px', objectFit: 'contain' }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface-container-low" style={{ padding: '6rem 0' }}>
        <div className="fly-in container" style={{ textAlign: 'center', maxWidth: '56rem' }}>
          <h2 className="text-primary font-serif" style={{ fontSize: '2.25rem', marginBottom: '2rem' }}>Ready to make tax season stress-free?</h2>
          <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem' }}>Let's Chat</Link>
            <Link to="/faq" className="btn-secondary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem' }}>Read Our FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}

