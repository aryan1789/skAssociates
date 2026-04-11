import React, { useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvzvdpjr';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', businessName: '', service: '', message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const inputStyle = {
    width: '100%',
    backgroundColor: 'var(--surface-container-low)',
    border: '1px solid var(--surface-variant)',
    padding: '0.875rem 1rem',
    borderRadius: '0.5rem',
    color: 'var(--on-surface)',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--on-surface)',
    marginBottom: '0.5rem',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--primary)';
    e.target.style.boxShadow = '0 0 0 3px rgba(1, 13, 37, 0.08)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--surface-variant)';
    e.target.style.boxShadow = 'none';
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('businessName', formData.businessName);
      data.append('service', formData.service);
      data.append('message', formData.message);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', businessName: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="bg-primary" style={{ padding: '8rem 0', minHeight: '40vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, var(--primary-container), var(--primary))' }}>
        <div className="container" style={{ maxWidth: '64rem' }}>
          <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--on-primary-container)', fontWeight: 600, display: 'block', marginBottom: '1.5rem' }}>Contact Us</span>
          <h1 className="font-serif page-heading" style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--on-primary)' }}>Let's Chat</h1>
          <p style={{ color: 'var(--surface-container-highest)', fontSize: '1.25rem', maxWidth: '48rem', lineHeight: 1.6, opacity: 0.85 }}>Whether you need help with your personal taxes or managing your business books, we're here for you.</p>
        </div>
      </section>

      <section className="bg-surface" style={{ padding: '6rem 0' }}>
        <div className="container contact-layout">

          {/* Left: Contact info */}
          <div style={{ paddingTop: '3rem' }}>
            <h2 className="text-primary font-serif" style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Get in Touch</h2>
            <p className="text-on-surface-variant" style={{ fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '3rem' }}>
              We're a friendly, approachable team — reach out any time and we'll get back to you promptly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: 'phone', label: 'Phone', value: '027-SK-TAXES', href: 'tel:+64277582937' },
                { icon: 'phone', label: 'Phone', value: '027-215-2408', href: 'tel:+64272152408' },
                { icon: 'mail', label: 'Email', value: 'info@skassociates.co.nz', href: 'mailto:info@skassociates.co.nz' },
                { icon: 'markunread_mailbox', label: 'Postal Address', value: 'PO Box 48009, Blockhouse Bay, Auckland, 0644', href: null },
              ].map(({ icon, label, value, href }) => {
                const sharedStyle = { display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--surface-variant)', backgroundColor: 'var(--surface-container-lowest)', textDecoration: 'none', transition: 'border-color 0.2s, box-shadow 0.2s' };
                const inner = (
                  <>
                    <div style={{ flexShrink: 0, width: '3rem', height: '3rem', borderRadius: '0.5rem', backgroundColor: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined text-primary" style={{ fontSize: '1.5rem' }}>{icon}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', fontWeight: 600, marginBottom: '0.3rem' }}>{label}</p>
                      <p className="text-primary" style={{ fontSize: '1.0625rem', fontWeight: 500 }}>{value}</p>
                    </div>
                  </>
                );
                return href ? (
                  <a key={label} href={href} style={sharedStyle}
                    onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--primary-container)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--surface-variant)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    {inner}
                  </a>
                ) : (
                  <div key={label} style={sharedStyle}>{inner}</div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="or-divider">
            <div style={{ flex: 1, width: '1px', backgroundColor: 'var(--surface-variant)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', padding: '0.5rem 0' }}>or</span>
            <div style={{ flex: 1, width: '1px', backgroundColor: 'var(--surface-variant)' }} />
          </div>

          {/* Right: Form */}
          <div className="bg-surface-container-lowest" style={{ padding: '3rem', borderRadius: '0.75rem', border: '1px solid var(--surface-variant)', boxShadow: '0 20px 40px rgba(22, 28, 32, 0.04)' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '2rem' }}>check</span>
                </div>
                <h3 className="text-primary font-serif" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Message Sent!</h3>
                <p className="text-on-surface-variant" style={{ fontSize: '1.0625rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Thanks for reaching out. We'll be in touch with you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-primary"
                  style={{ borderRadius: '0.5rem', padding: '0.75rem 2rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-primary font-serif" style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Send Us a Message</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-grid-2">
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input required name="firstName" type="text" value={formData.firstName} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input required name="lastName" type="text" value={formData.lastName} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input required name="email" type="email" value={formData.email} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div>
                    <label style={labelStyle}>Business Name <span style={{ fontWeight: 400, color: 'var(--on-surface-variant)' }}>(optional)</span></label>
                    <input name="businessName" type="text" value={formData.businessName} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div>
                    <label style={labelStyle}>How can we help?</label>
                    <select required name="service" value={formData.service} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur}>
                      <option value="">Select an option</option>
                      <option value="tax">Tax Returns</option>
                      <option value="advisory">Business Advice</option>
                      <option value="bookkeeping">Bookkeeping</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Additional Details <span style={{ fontWeight: 400, color: 'var(--on-surface-variant)' }}>(optional)</span></label>
                    <textarea name="message" rows="4" value={formData.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>

                  {status === 'error' && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>error</span>
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '0.5rem', borderRadius: '0.5rem', padding: '1rem', fontSize: '1rem', opacity: status === 'submitting' ? 0.7 : 1, cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </section>
    </>
  );
}
