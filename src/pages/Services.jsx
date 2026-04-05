import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "Taxation",
      desc: "We'll handle your personal or business taxes so you don't have to worry about missing anything.",
      details: ["Individual Income Tax Returns", "Trust Tax Returns", "LLP Tax Returns", "Corporate Tax Returns", "Year-round Tax Planning", "Audit support and representation"]
    },
    {
      title: "Business Accounting",
      desc: "Consistent and clear tracking of your expenses and income, giving you peace of mind.",
      details: ["Accurate and Compliant Accounting", "Monthly or Annual Accounting Reports", "Budgeting and Cashflow", "On-going Accounting Advice and Support"]
    },
    {
      title: "Business Advice",
      desc: "Friendly guidance to help you grow your business and navigate any financial challenges.",
      details: ["Business entity structuring advice", "Risk Mitigation Advice", "Business Acquisition or Sale Guidance", "Expansion planning", "Financial health check-ups"]
    },
    {
      title: "Rental Accounting",
      desc: "Specialist accounting for rental property owners, so you can focus on maximising your rental returns.",
      details: ["Rental income and expense tracking", "Annual rental property tax returns", "Mixed-use property apportionment", "Depreciation calculations", "Bright-line test guidance",]
    },

    {
      title: "IRD Liaison",
      desc: "We act as your representative with the Inland Revenue Department, handling all communications and avoiding tricky inquiries on your behalf.",
      details: ["Direct communication with IRD", "Audit assistance and representation", "Payment arrangement negotiations", "Penalty remission requests"]
    }
  ];

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedService]);

  return (
    <>
      <section className="bg-primary" style={{ padding: '8rem 0', minHeight: '40vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, var(--primary-container), var(--primary))' }}>
        <div className="container" style={{ maxWidth: '64rem' }}>
          <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--on-primary-container)', fontWeight: 600, display: 'block', marginBottom: '1.5rem' }}>What We Offer</span>
          <h1 className="font-serif page-heading" style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--on-primary)' }}>Our Services</h1>
          <p style={{ color: 'var(--surface-container-highest)', fontSize: '1.25rem', maxWidth: '48rem', lineHeight: 1.6, opacity: 0.85 }}>We're here to take the stress out of your finances. Click any service card to learn more.</p>
        </div>
      </section>

      <section className="bg-surface" style={{ paddingTop: '3rem', paddingBottom: '6rem', minHeight: '50vh' }}>
        <div className="container" style={{ maxWidth: '72rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {services.map((svc, i) => (
              <div
                key={i}
                className="service-card"
                onClick={() => setSelectedService(svc)}
                style={{
                  background: 'linear-gradient(135deg, #1e8a82, #0d2545)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.18)';
                  e.currentTarget.style.opacity = '0.92';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                  e.currentTarget.style.opacity = '1';
                }}>
                <div style={{ padding: '2.5rem 2.5rem 0 2.5rem' }}>
                  <h3 className="font-serif" style={{ fontSize: '1.75rem', lineHeight: 1.2, color: 'rgba(255,255,255,0.95)' }}>{svc.title}</h3>
                </div>
                <div style={{ padding: '1.5rem 2.5rem 2.5rem 2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <p style={{ lineHeight: 1.6, flexGrow: 1, color: 'rgba(255,255,255,0.6)' }}>{svc.desc}</p>
                  <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.75)', fontWeight: 500, fontSize: '0.875rem' }}>
                    Read Details <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', marginLeft: '0.25rem' }}>arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Modal — rendered via portal to escape page-transition stacking context */}
      {selectedService && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(6px)', padding: '1rem'
        }} onClick={() => setSelectedService(null)}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '1rem', padding: '3rem', maxWidth: '36rem', width: '100%',
            position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxHeight: '90vh', overflowY: 'auto'
          }} onClick={e => e.stopPropagation()}>

            <button
              onClick={() => setSelectedService(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--surface-variant)', borderRadius: '50%', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={e => e.currentTarget.style.background = 'var(--outline-variant)'}
              onMouseOut={e => e.currentTarget.style.background = 'var(--surface-variant)'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--on-surface-variant)' }}>close</span>
            </button>

            <h2 className="text-primary font-serif" style={{ fontSize: '2.25rem', marginBottom: '1rem', lineHeight: 1.1 }}>{selectedService.title}</h2>
            <p className="text-on-surface" style={{ lineHeight: 1.6, marginBottom: '2.5rem', fontSize: '1.125rem' }}>{selectedService.desc}</p>

            <div style={{ borderTop: '1px solid var(--surface-variant)', paddingTop: '2rem' }}>
              <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedService.details.map((detail, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '1.5rem', flexShrink: 0 }}>check_circle</span>
                    <span className="text-on-surface" style={{ lineHeight: 1.5, fontSize: '1rem' }}>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '3rem', borderRadius: '0.5rem', padding: '1rem' }} onClick={() => setSelectedService(null)}>
              Close Details
            </button>
          </div>
        </div>
      , document.body)}
    </>
  );
}
