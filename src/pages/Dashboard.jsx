import React from 'react';
import { useAuth } from '../context/AuthContext';

const DOCUMENTS = [
  {
    id: 1,
    title: 'FY2024 Tax Return Summary',
    description: 'Your completed income tax return for the financial year ending 31 March 2024.',
    icon: 'description',
    size: '1.2 MB',
    type: 'PDF',
    date: '12 May 2024',
  },
  {
    id: 2,
    title: 'GST Return – Q3 2024',
    description: 'Goods and Services Tax return for the period July – September 2024.',
    icon: 'receipt_long',
    size: '340 KB',
    type: 'PDF',
    date: '28 Oct 2024',
  },
  {
    id: 3,
    title: 'Financial Statements FY2024',
    description: 'Profit & loss statement and balance sheet prepared for your business.',
    icon: 'bar_chart',
    size: '2.1 MB',
    type: 'PDF',
    date: '15 Jun 2024',
  },
  {
    id: 4,
    title: 'Payroll Summary – March 2025',
    description: 'Employer payroll deductions and PAYE reconciliation for March 2025.',
    icon: 'payments',
    size: '480 KB',
    type: 'XLSX',
    date: '5 Apr 2025',
  },
  {
    id: 5,
    title: 'IRD Correspondence – Apr 2025',
    description: 'Letter from Inland Revenue regarding your provisional tax obligation.',
    icon: 'mail',
    size: '210 KB',
    type: 'PDF',
    date: '18 Apr 2025',
  },
  {
    id: 6,
    title: 'Engagement Letter 2025',
    description: 'Signed engagement letter outlining the scope of services for this tax year.',
    icon: 'handshake',
    size: '155 KB',
    type: 'PDF',
    date: '3 Feb 2025',
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Client';

  return (
    <>
      {/* Hero */}
      <section
        className="bg-primary text-on-primary"
        style={{
          padding: '7rem 0 5rem',
          background: 'linear-gradient(135deg, var(--primary-container), var(--primary))',
        }}
      >
        <div className="container" style={{ maxWidth: '64rem' }}>
          <span
            style={{
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--on-primary-container)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Client Portal
          </span>
          <h1
            className="font-serif"
            style={{ fontSize: '3.5rem', lineHeight: 1.1, color: 'var(--on-primary)' }}
          >
            Welcome, {displayName}.
          </h1>
          <p
            style={{
              marginTop: '1.25rem',
              fontSize: '1.125rem',
              color: 'var(--on-primary-container)',
              opacity: 0.9,
            }}
          >
            Your documents and reports from SK &amp; Associates are listed below.
          </p>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-surface-container-low" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '64rem' }}>
          <h2
            className="text-primary font-serif"
            style={{ fontSize: '2rem', marginBottom: '2.5rem' }}
          >
            Your Documents
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-container-lowest"
                style={{
                  borderRadius: '0.75rem',
                  padding: '1.75rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  border: '1px solid var(--outline-variant)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {/* Icon + badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--primary-container)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: '1.5rem' }}
                    >
                      {doc.icon}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--primary)',
                      backgroundColor: 'var(--secondary-container)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '999px',
                    }}
                  >
                    {doc.type}
                  </span>
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <h3
                    className="text-primary font-serif"
                    style={{ fontSize: '1.0625rem', marginBottom: '0.4rem', lineHeight: 1.3 }}
                  >
                    {doc.title}
                  </h3>
                  <p
                    className="text-on-surface-variant"
                    style={{ fontSize: '0.875rem', lineHeight: 1.5 }}
                  >
                    {doc.description}
                  </p>
                </div>

                {/* Meta + download */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--outline-variant)',
                  }}
                >
                  <span
                    style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}
                  >
                    {doc.date} · {doc.size}
                  </span>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--primary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem 0',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '1.1rem' }}
                    >
                      download
                    </span>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
