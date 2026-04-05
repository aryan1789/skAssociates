import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const packages = [
    {
      title: "Sole Trader",
      price: "90",
      features: ["GST Returns", "Annual Income Tax Returns", "Annual Financial Statements", "Payroll support up to 2 employees", "IRD Liaison", "Email & Phone Support"]
    },
    {
      title: "Startup Business",
      price: "120",
      features: ["GST Returns", "Annual Income Tax Returns", "Annual Financial Statements", "Payroll support up to 2 employees", "Shareholder Salary Tax Returns (Max 2)", "IRD Liaison", "Email & Phone Support"]
    },
    {
      title: "Small Business",
      price: "180",
      features: ["GST Returns", "Annual Income Tax Returns", "Annual Financial Statements", "Payroll support up to 8 employees", "Shareholder Tax Returns", "IRD Liaison", "Email & Phone Support"]
    },
    {
      title: "Growing Business",
      price: "260",
      features: ["GST Returns", "Annual Income Tax Returns", "Annual Financial Statements", "Payroll support up to 15 employees", "Shareholder Tax Returns", "FBT (Fringe Benefit Tax) Returns", "ACC Levy Reviews", "IRD Liaison", "Email & Phone Support"]
    },
    {
      title: "Yearly Tax Returns",
      price: "400",
      features: ["Rental Property Return $400 plus GST up to 2 taxpayers", "$220 - $250 plus GST Rideshare Drivers/ Food Delivery Service", "Email & Phone support"]
    }
  ];

  return (
    <>
      <section className="bg-primary" style={{ padding: '8rem 0', minHeight: '40vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, var(--primary-container), var(--primary))' }}>
        <div className="container" style={{ maxWidth: '64rem' }}>
          <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--on-primary-container)', fontWeight: 600, display: 'block', marginBottom: '1.5rem' }}>Pricing</span>
          <h1 className="font-serif page-heading" style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--on-primary)' }}>Monthly Service Packages</h1>
        </div>
      </section>

      <section className="bg-surface" style={{ padding: '3rem 0 8rem 0' }}>
        <div className="container" style={{ maxWidth: '96rem', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'stretch' }}>
            {packages.map((pkg, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--surface-container-lowest)',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.02)',
                border: '1px solid var(--surface-variant)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)';
                  e.currentTarget.style.borderColor = 'var(--primary-container)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = 'var(--surface-variant)';
                }}>
                <div style={{
                  padding: '1.25rem 0.5rem',
                  textAlign: 'center',
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, #115e59, #010d25)'
                    : 'linear-gradient(135deg, #2ea898, #0d3060)',
                  color: '#ffffff'
                }}>
                  <h3 className="font-serif" style={{ fontSize: '1.125rem', fontWeight: 600 }}>{pkg.title}</h3>
                </div>

                <div style={{ padding: '1.5rem 1rem', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--on-surface-variant)', marginTop: '0.5rem', marginRight: '0.25rem' }}>$</span>
                      <span className="text-primary font-serif" style={{ fontSize: '4rem', lineHeight: 1, fontWeight: 700 }}>{pkg.price}</span>
                    </div>
                    <span className="font-label" style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', opacity: 0.8, display: 'block', marginTop: '0.5rem' }}>plus GST per month</span>
                  </div>

                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {pkg.features.map((feature, idx) => (
                      <React.Fragment key={idx}>
                        <li style={{ fontSize: '0.875rem', color: 'var(--on-surface)', lineHeight: 1.4, padding: '0.5rem 0', minHeight: '2.75rem', display: 'flex', alignItems: 'center' }}>
                          {feature}
                        </li>
                        {idx !== pkg.features.length - 1 && (
                          <div style={{ height: '1px', backgroundColor: 'var(--surface-variant)', opacity: 0.5 }}></div>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
