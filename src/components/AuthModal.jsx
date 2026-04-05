import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ initialTab = 'signin', onClose }) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [tab, setTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Reset form when tab changes
  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setStatus('idle');
    setErrorMsg('');
  }, [tab]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

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

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--primary)';
    e.target.style.boxShadow = '0 0 0 3px rgba(1, 13, 37, 0.08)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--surface-variant)';
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (tab === 'register' && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setStatus('loading');
    const { error } = tab === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password);

    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
    } else if (tab === 'register') {
      setStatus('success');
    } else {
      onClose();
    }
  };

  const handleGoogle = async () => {
    await signInWithGoogle();
    // Redirect is handled by Supabase OAuth flow
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(1, 13, 37, 0.5)', backdropFilter: 'blur(6px)', padding: '1rem' }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: 'var(--surface-container-lowest)', borderRadius: '1rem', padding: '2.5rem', width: '100%', maxWidth: '26rem', boxShadow: '0 25px 60px rgba(0,0,0,0.2)', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'var(--surface-variant)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--outline-variant)'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--surface-variant)'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)' }}>close</span>
        </button>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', backgroundColor: 'var(--surface-container-low)', borderRadius: '0.5rem', padding: '0.25rem' }}>
          {['signin', 'register'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{ flex: 1, padding: '0.625rem', borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 600, transition: 'all 0.2s', backgroundColor: tab === t ? 'var(--surface-container-lowest)' : 'transparent', color: tab === t ? 'var(--primary)' : 'var(--on-surface-variant)', boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}
            >
              {t === 'signin' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '1.75rem' }}>mark_email_read</span>
            </div>
            <h3 className="text-primary font-serif" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Check your email</h3>
            <p className="text-on-surface-variant" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
              We've sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-primary font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.375rem' }}>
              {tab === 'signin' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-on-surface-variant" style={{ fontSize: '0.9375rem', marginBottom: '1.75rem' }}>
              {tab === 'signin' ? 'Sign in to your client portal.' : 'Register to access your client portal.'}
            </p>

            {/* Google button */}
            <button
              onClick={handleGoogle}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--surface-variant)', backgroundColor: 'var(--surface-container-lowest)', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--on-surface)', cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s', marginBottom: '1.25rem' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--outline)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--surface-variant)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--surface-variant)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--surface-variant)' }} />
            </div>

            {/* Email/password form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--on-surface)', marginBottom: '0.4rem' }}>Email Address</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--on-surface)', marginBottom: '0.4rem' }}>Password</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              {tab === 'register' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--on-surface)', marginBottom: '0.4rem' }}>Confirm Password</label>
                  <input required type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              )}

              {errorMsg && (
                <p style={{ fontSize: '0.875rem', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>error</span>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.25rem', borderRadius: '0.5rem', padding: '0.875rem', fontSize: '1rem', opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
              >
                {status === 'loading' ? 'Please wait…' : tab === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>
              {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => setTab(tab === 'signin' ? 'register' : 'signin')} style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontSize: 'inherit' }}>
                {tab === 'signin' ? 'Register' : 'Sign In'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
