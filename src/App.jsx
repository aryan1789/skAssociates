import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import logo from './assets/logo.png';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import Consultation from './pages/Consultation';
import FAQ from './pages/FAQ';

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const prevUserRef = React.useRef(user);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Redirect to dashboard when user logs in
  useEffect(() => {
    if (!prevUserRef.current && user) {
      navigate('/dashboard');
    }
    prevUserRef.current = user;
  }, [user, navigate]);

  // Redirect to home when user signs out from dashboard
  useEffect(() => {
    if (!user && path === '/dashboard') {
      navigate('/');
    }
  }, [user, path, navigate]);

  if (user) {
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
    const displayName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email;
    const initials = displayName.trim()[0].toUpperCase();

    return (
      <header className="header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <nav className="container header-nav">
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="SK & Associates" style={{ height: '3rem' }} />
          </Link>
          <div className="nav-actions" style={{ alignItems: 'center' }}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--outline-variant)' }}
              />
            ) : (
              <div style={{
                width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                backgroundColor: 'var(--primary)', color: 'var(--on-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.9375rem', flexShrink: 0,
                border: '2px solid var(--outline-variant)',
              }}>
                {initials}
              </div>
            )}
            <button className="btn btn-secondary" onClick={signOut} style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 500 }}>Sign Out</button>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <>
      <header className="header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <nav className="container header-nav">
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="SK & Associates" style={{ height: '3rem' }} />
          </Link>

          {/* Desktop nav */}
          <div className="nav-links">
            <Link to="/" className={`nav-link ${path === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/services" className={`nav-link ${path === '/services' ? 'active' : ''}`}>Services</Link>
            <Link to="/pricing" className={`nav-link ${path === '/pricing' ? 'active' : ''}`}>Pricing</Link>
            <Link to="/about" className={`nav-link ${path === '/about' ? 'active' : ''}`}>Why Us</Link>
            <Link to="/contact" className={`nav-link ${path === '/contact' ? 'active' : ''}`}>Contact Us</Link>
            <Link to="/faq" className={`nav-link ${path === '/faq' ? 'active' : ''}`}>FAQ</Link>
          </div>

          {/* Desktop actions */}
          <div className="nav-actions">
            <Link to="/consultation" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 500 }}>Book a Consultation</Link>
            <button className="btn btn-secondary" onClick={() => setModal('signin')} style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 500 }}>Log In</button>
            <button className="btn btn-secondary" onClick={() => setModal('register')} style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 500 }}>Register</button>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/" className={`nav-link ${path === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/services" className={`nav-link ${path === '/services' ? 'active' : ''}`}>Services</Link>
            <Link to="/pricing" className={`nav-link ${path === '/pricing' ? 'active' : ''}`}>Pricing</Link>
            <Link to="/about" className={`nav-link ${path === '/about' ? 'active' : ''}`}>Why Us</Link>
            <Link to="/contact" className={`nav-link ${path === '/contact' ? 'active' : ''}`}>Contact Us</Link>
            <Link to="/faq" className={`nav-link ${path === '/faq' ? 'active' : ''}`}>FAQ</Link>
            <div className="mobile-menu-actions">
              <Link to="/consultation" className="btn btn-primary" style={{ borderRadius: '0.5rem', textAlign: 'center' }}>Book a Consultation</Link>
              <button className="btn btn-secondary" onClick={() => { setModal('signin'); setMenuOpen(false); }} style={{ borderRadius: '0.5rem' }}>Log In</button>
              <button className="btn btn-secondary" onClick={() => { setModal('register'); setMenuOpen(false); }} style={{ borderRadius: '0.5rem' }}>Register</button>
            </div>
          </div>
        )}
      </header>
      {modal && <AuthModal initialTab={modal} onClose={() => setModal(null)} />}
    </>
  );
}

function Footer() {
  const { user } = useAuth();
  return (
    <footer className="bg-primary text-surface" style={{ padding: '4rem 0', background: 'linear-gradient(135deg, var(--primary-container), var(--primary))' }}>
      <div className="container footer-grid">
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <img src={logo} alt="SK & Associates" style={{ height: '2.5rem' }} />
          </div>
          <p style={{ color: 'var(--surface-container-highest)', opacity: 0.8, fontSize: '0.875rem', lineHeight: 1.6 }}>
            Friendly, local tax advisory and bookkeeping services tailored for small businesses and families.
          </p>
        </div>
        {!user && (
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
        )}
      </div>
      <div className="container" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(221, 227, 231, 0.1)', textAlign: 'center', fontSize: '0.75rem', opacity: 0.5 }}>
        © 2026 SK & Associates. All rights reserved.
      </div>
    </footer>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: 'var(--primary)',
        color: 'var(--on-primary)',
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        border: 'none',
        zIndex: 999,
        transition: 'all 0.3s ease',
      }}
      onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseOut={e => e.currentTarget.style.transform = 'none'}
      aria-label="Scroll to top"
    >
      <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>arrow_upward</span>
    </button>
  );
}

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition" style={{ flex: 1 }}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTopOnRoute />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <AnimatedRoutes />
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
        <Analytics />
      </Router>
    </AuthProvider>
  );
}

export default App;
