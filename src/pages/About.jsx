import React from 'react';
import amitPhoto from '../assets/amit-shah.png';
import aryanPhoto from '../assets/aryan-shah.jpg';

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-on-primary" style={{ padding: '8rem 0', minHeight: '40vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, var(--primary-container), var(--primary))' }}>
        <div className="container" style={{ maxWidth: '64rem' }}>
          <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--on-primary-container)', fontWeight: 600, display: 'block', marginBottom: '1.5rem' }}>Why Us</span>
          <h1 className="font-serif page-heading" style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1rem' }}>Your Local Financial Partners.</h1>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-surface-container-low" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-primary font-serif" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Why Choose Us?</h2>
            <p className="text-on-surface-variant" style={{ fontSize: '1.125rem', maxWidth: '36rem', margin: '0 auto' }}>We know you have options when it comes to accounting. Here is what makes us different.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <div className="bg-surface-container-lowest" style={{ padding: '3rem', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
              <div style={{ height: '4rem', width: '4rem', borderRadius: '50%', backgroundColor: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '2rem' }}>handshake</span>
              </div>
              <h3 className="font-serif text-primary" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Personalized Attention</h3>
              <p className="text-on-surface-variant" style={{ lineHeight: 1.6 }}>We treat every client like family. You're never just a number to us; we take the time to deeply understand your unique financial situation. Ask any of our clients!</p>
            </div>
            <div className="bg-surface-container-lowest" style={{ padding: '3rem', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
              <div style={{ height: '4rem', width: '4rem', borderRadius: '50%', backgroundColor: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '2rem' }}>translate</span>
              </div>
              <h3 className="font-serif text-primary" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Jargon</h3>
              <p className="text-on-surface-variant" style={{ lineHeight: 1.6 }}>We explain complex tax laws and financial reports in plain words, so you explicitly understand where your money is going.</p>
            </div>
            <div className="bg-surface-container-lowest" style={{ padding: '3rem', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
              <div style={{ height: '4rem', width: '4rem', borderRadius: '50%', backgroundColor: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '2rem' }}>verified</span>
              </div>
              <h3 className="font-serif text-primary" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Expert Knowledge</h3>
              <p className="text-on-surface-variant" style={{ lineHeight: 1.6 }}>Our team consists of professionals who have up-to-date knowledge and who are there to support you at all times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-surface" style={{ padding: '8rem 0' }}>
        <div className="container">
          <h2 className="text-primary font-serif" style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>Meet Our Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', maxWidth: '64rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '250px', width: '250px', margin: '0 auto', marginBottom: '2rem', borderRadius: '50%', border: '4px solid var(--surface-container-low)', overflow: 'hidden' }}>
                <img src={amitPhoto} alt="Amit Shah" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <h3 className="text-primary font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Amit Shah, Principal</h3>
              <p className="font-label" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: '1rem' }}>Tax and Business Advisor</p>
              <p className="text-on-surface-variant" style={{ lineHeight: 1.6 }}>Amit has been in the profession for more than 15 years and loves working directly with small business owners to help them save money on taxes and understand their financial position.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '250px', width: '250px', margin: '0 auto', backgroundColor: 'var(--surface-container-highest)', marginBottom: '2rem', borderRadius: '50%', border: '4px solid var(--surface-container-low)' }}></div>
              <h3 className="text-primary font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Rakesh (a.k.a Zubin) Kothari</h3>
              <p className="font-label" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: '1rem' }}>Accountant</p>
              <p className="text-on-surface-variant" style={{ lineHeight: 1.6 }}>Zubin assists with financial reporting, tax returns, and general accounting matters. He focuses on accuracy and making the process straightforward for clients.</p>
            </div>
          </div>
          <div style={{ maxWidth: '320px', margin: '4rem auto 0', textAlign: 'center' }}>
            <div style={{ height: '250px', width: '250px', margin: '0 auto', marginBottom: '2rem', borderRadius: '50%', border: '4px solid var(--surface-container-low)', overflow: 'hidden' }}>
              <img src={aryanPhoto} alt="Aryan Shah" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }} />
            </div>
            <h3 className="text-primary font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Aryan Shah</h3>
            <p className="font-label" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: '1rem' }}>Admin and Accounts Assistant</p>
            <p className="text-on-surface-variant" style={{ lineHeight: 1.6 }}>Aryan is a young, passionate, and diligent professional who efficiently handles admin and bookkeeping tasks.</p>
          </div>
        </div>
      </section>
    </>
  );
}
