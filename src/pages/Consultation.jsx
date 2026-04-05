import React, { useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreorgbk';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function Consultation() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    service: '',
    consultationType: '',
    availableDays: [],
    preferredTimes: [],
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^[\d\s\-().+]{7,20}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }
    return errors;
  };

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
    const { name } = e.target;
    e.target.style.borderColor = fieldErrors[name] ? 'var(--error)' : 'var(--surface-variant)';
    e.target.style.boxShadow = 'none';
    // Validate the single field on blur
    const errors = validate();
    setFieldErrors(prev => ({ ...prev, [name]: errors[name] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as the user types
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setStatus('submitting');
    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('businessName', formData.businessName);
      data.append('service', formData.service);
      data.append('consultationType', formData.consultationType);
      data.append('availableDays', formData.availableDays.join(', '));
      data.append('preferredTimes', formData.preferredTimes.join(', '));
      data.append('message', formData.message);
      data.append('_subject', `Consultation Request from ${formData.firstName} ${formData.lastName}`);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-primary" style={{ padding: '8rem 0', minHeight: '40vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, var(--primary-container), var(--primary))' }}>
        <div className="container" style={{ maxWidth: '64rem' }}>
          <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--on-primary-container)', fontWeight: 600, display: 'block', marginBottom: '1.5rem' }}>Free Consultation</span>
          <h1 className="font-serif page-heading" style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--on-primary)' }}>Book a Consultation</h1>
          <p style={{ color: 'var(--surface-container-highest)', fontSize: '1.25rem', maxWidth: '48rem', lineHeight: 1.6, opacity: 0.85 }}>
            Tell us a bit about yourself and when you're available. We'll confirm a time that works for you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-surface" style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '48rem' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '50%', backgroundColor: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '2.25rem' }}>event_available</span>
              </div>
              <h2 className="text-primary font-serif" style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Request Received!</h2>
              <p className="text-on-surface-variant" style={{ fontSize: '1.125rem', lineHeight: 1.7, maxWidth: '32rem', margin: '0 auto 2.5rem' }}>
                Thanks for reaching out. We'll review your availability and be in touch shortly to confirm a time.
              </p>
              <button onClick={() => setStatus('idle')} className="btn-primary" style={{ borderRadius: '0.5rem', padding: '0.875rem 2.5rem' }}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-primary font-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Details</h2>
              <p className="text-on-surface-variant" style={{ fontSize: '1rem', marginBottom: '2.5rem' }}>All fields are required unless marked optional.</p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Name */}
                <div className="form-grid-2">
                  <div>
                    <label style={labelStyle}>First Name <span style={{ color: 'var(--error)' }}>*</span></label>
                    <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} style={{ ...inputStyle, borderColor: fieldErrors.firstName ? 'var(--error)' : 'var(--surface-variant)' }} onFocus={handleFocus} onBlur={handleBlur} />
                    {fieldErrors.firstName && <p style={{ fontSize: '0.8125rem', color: 'var(--error)', marginTop: '0.375rem' }}>{fieldErrors.firstName}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name <span style={{ color: 'var(--error)' }}>*</span></label>
                    <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} style={{ ...inputStyle, borderColor: fieldErrors.lastName ? 'var(--error)' : 'var(--surface-variant)' }} onFocus={handleFocus} onBlur={handleBlur} />
                    {fieldErrors.lastName && <p style={{ fontSize: '0.8125rem', color: 'var(--error)', marginTop: '0.375rem' }}>{fieldErrors.lastName}</p>}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label style={labelStyle}>Email Address <span style={{ color: 'var(--error)' }}>*</span></label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} style={{ ...inputStyle, borderColor: fieldErrors.email ? 'var(--error)' : 'var(--surface-variant)' }} onFocus={handleFocus} onBlur={handleBlur} />
                  {fieldErrors.email && <p style={{ fontSize: '0.8125rem', color: 'var(--error)', marginTop: '0.375rem' }}>{fieldErrors.email}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Phone Number <span style={{ color: 'var(--error)' }}>*</span></label>
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} style={{ ...inputStyle, borderColor: fieldErrors.phone ? 'var(--error)' : 'var(--surface-variant)' }} onFocus={handleFocus} onBlur={handleBlur} />
                  {fieldErrors.phone && <p style={{ fontSize: '0.8125rem', color: 'var(--error)', marginTop: '0.375rem' }}>{fieldErrors.phone}</p>}
                </div>

                {/* Business */}
                <div>
                  <label style={labelStyle}>Business Name <span style={{ fontWeight: 400, color: 'var(--on-surface-variant)' }}>(optional)</span></label>
                  <input name="businessName" type="text" value={formData.businessName} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>

                <div style={{ height: '1px', backgroundColor: 'var(--surface-variant)' }} />

                {/* Service + Type */}
                <div className="form-grid-2">
                  <div>
                    <label style={labelStyle}>What do you need help with?</label>
                    <select required name="service" value={formData.service} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur}>
                      <option value="">Select a service</option>
                      <option value="tax">Tax Returns</option>
                      <option value="bookkeeping">Bookkeeping</option>
                      <option value="advisory">Business Advice</option>
                      <option value="payroll">Payroll</option>
                      <option value="ird">IRD Liaison</option>
                      <option value="other">Other / Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Consultation Type</label>
                    <select required name="consultationType" value={formData.consultationType} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur}>
                      <option value="">Select a type</option>
                      <option value="in-person">In Person</option>
                      <option value="phone">Phone Call</option>
                      <option value="video">Video Call</option>
                    </select>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: 'var(--surface-variant)' }} />

                {/* Availability */}
                <div>
                  <label style={{ ...labelStyle, marginBottom: '0.75rem' }}>When are you typically free? <span style={{ fontWeight: 400, color: 'var(--on-surface-variant)' }}>(select all that apply)</span></label>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {DAYS.map(day => {
                      const selected = formData.availableDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          style={{
                            padding: '0.5rem 1.125rem',
                            borderRadius: '2rem',
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: `1px solid ${selected ? 'var(--primary)' : 'var(--surface-variant)'}`,
                            backgroundColor: selected ? 'var(--primary)' : 'var(--surface-container-lowest)',
                            color: selected ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ ...labelStyle, marginBottom: '0.75rem' }}>Preferred Time of Day <span style={{ fontWeight: 400, color: 'var(--on-surface-variant)' }}>(select all that apply)</span></label>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {['Morning (9am–12pm)', 'Afternoon (12pm–3pm)', 'Late Afternoon (3pm–5pm)'].map(time => {
                      const selected = formData.preferredTimes.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            preferredTimes: selected
                              ? prev.preferredTimes.filter(t => t !== time)
                              : [...prev.preferredTimes, time],
                          }))}
                          style={{
                            padding: '0.5rem 1.125rem',
                            borderRadius: '2rem',
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: `1px solid ${selected ? 'var(--primary)' : 'var(--surface-variant)'}`,
                            backgroundColor: selected ? 'var(--primary)' : 'var(--surface-container-lowest)',
                            color: selected ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: 'var(--surface-variant)' }} />

                {/* Message */}
                <div>
                  <label style={labelStyle}>Anything else you'd like us to know? <span style={{ fontWeight: 400, color: 'var(--on-surface-variant)' }}>(optional)</span></label>
                  <textarea name="message" rows="4" value={formData.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} onFocus={handleFocus} onBlur={handleBlur} />
                </div>

                {status === 'error' && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>error</span>
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary"
                  style={{ width: '100%', borderRadius: '0.5rem', padding: '1rem', fontSize: '1rem', opacity: status === 'submitting' ? 0.7 : 1, cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
                >
                  {status === 'submitting' ? 'Submitting…' : 'Request Consultation'}
                </button>

              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}
