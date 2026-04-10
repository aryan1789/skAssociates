import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const FOLDERS = [
  {
    id: 1,
    name: 'Payroll Related Forms',
    icon: 'payments',
    updated: '11 Apr 2026',
    files: [
      { id: 1, name: 'Kiwisaver Deduction-KS2.pdf', size: 'PDF', type: 'PDF', date: '11 Apr 2026', url: '/documents/payroll/Kiwisaver Deduction-KS2.pdf' },
      { id: 2, name: 'Tax Declaration- IR330.pdf', size: 'PDF', type: 'PDF', date: '11 Apr 2026', url: '/documents/payroll/Tax Declaration- IR330.pdf' },
      { id: 3, name: 'Kiwisaver Opt-out form-KS10.pdf', size: 'PDF', type: 'PDF', date: '11 Apr 2026', url: '/documents/payroll/Kiwisaver Opt-out form-KS10.pdf' },
    ],
  },
  {
    id: 2,
    name: 'Useful Depreciation Claiming Guide',
    icon: 'receipt_long',
    updated: '11 Apr 2026',
    files: [
      { id: 1, name: 'Application for a higher maximum pooling value- IR719.pdf', size: 'PDF', type: 'PDF', date: '11 Apr 2026', url: '/documents/depreciation/Application for a higher maximum pooling value- IR719.pdf' },
      { id: 2, name: 'Application for a Special Depreciation rate-IR260B.pdf', size: 'PDF', type: 'PDF', date: '11 Apr 2026', url: '/documents/depreciation/Application for a Special Depreciation rate-IR260B.pdf' },
      { id: 3, name: 'Application for a Provisional Depreciation rate IR260A 2023.pdf', size: 'PDF', type: 'PDF', date: '11 Apr 2026', url: '/documents/depreciation/Application for a Provisional Depreciation rate IR260A 2023.pdf' },
    ],
  },
  {
    id: 3,
    name: 'Other Useful Stuff ',
    icon: 'bar_chart',
    updated: '11 Apr 2026',
    files: [
      { id: 1, name: 'Prescribed Investor rate(PIR) IR861.pdf', size: 'PDF', type: 'PDF', date: '11 Apr 2026', url: '/documents/other/Prescribed Investor rate(PIR) IR861.pdf' },
      { id: 2, name: 'Fringe Benefit Tax Guide-IR409.pdf', size: 'PDF', type: 'PDF', date: '11 Apr 2026', url: '/documents/other/Fringe Benefit Tax Guide-IR409.pdf' },
      { id: 3, name: 'SK- Associates Vehicle-Log-Book-Template.xlsx', size: 'XLSX', type: 'XLSX', date: '11 Apr 2026', url: '/documents/other/SK- Associates Vehicle-Log-Book-Template.xlsx' },
    ],
  },
];

const TYPE_ICON = {
  PDF: 'picture_as_pdf',
  XLSX: 'table_chart',
  DOCX: 'article',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [openFolderId, setOpenFolderId] = useState(null);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Client';

  const folder = FOLDERS.find((f) => f.id === openFolderId);

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

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
            <button
              onClick={() => setOpenFolderId(null)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: openFolderId ? 'pointer' : 'default',
                fontFamily: 'inherit',
              }}
            >
              <h2
                className="font-serif"
                style={{
                  fontSize: '2rem',
                  color: openFolderId ? 'var(--primary)' : 'var(--on-surface)',
                  textDecoration: openFolderId ? 'underline' : 'none',
                  textUnderlineOffset: '3px',
                  margin: 0,
                }}
              >
                Knowledge Base
              </h2>
            </button>
            {folder && (
              <>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '1.25rem', color: 'var(--on-surface-variant)' }}
                >
                  chevron_right
                </span>
                <h2
                  className="font-serif"
                  style={{ fontSize: '2rem', color: 'var(--on-surface)', margin: 0 }}
                >
                  {folder.name}
                </h2>
              </>
            )}
          </div>

          {/* Folder grid */}
          {!openFolderId && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {FOLDERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setOpenFolderId(f.id)}
                  className="bg-surface-container-lowest"
                  style={{
                    borderRadius: '0.75rem',
                    padding: '1.75rem',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    border: '1px solid var(--outline-variant)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    background: 'var(--surface-container-lowest)',
                    fontFamily: 'inherit',
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        width: '3.25rem',
                        height: '3.25rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'var(--primary-container)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontSize: '1.75rem' }}
                      >
                        folder
                      </span>
                    </div>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '1.25rem', color: 'var(--on-surface-variant)', opacity: 0.4 }}
                    >
                      arrow_forward_ios
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-primary font-serif"
                      style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '0.25rem' }}
                    >
                      {f.name}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>
                      {f.files.length} file{f.files.length !== 1 ? 's' : ''} · Updated {f.updated}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* File list inside folder */}
          {folder && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {folder.files.map((file) => (
                <div
                  key={file.id}
                  className="bg-surface-container-lowest"
                  style={{
                    borderRadius: '0.75rem',
                    padding: '1.25rem 1.5rem',
                    border: '1px solid var(--outline-variant)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)')}
                  onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.04)')}
                >
                  {/* File type icon */}
                  <div
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--primary-container)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: '1.375rem' }}
                    >
                      {TYPE_ICON[file.type] || 'insert_drive_file'}
                    </span>
                  </div>

                  {/* Name + meta */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      className="text-on-surface"
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {file.name}
                    </p>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--on-surface-variant)',
                        marginTop: '0.15rem',
                      }}
                    >
                      {file.type} · {file.size} · {file.date}
                    </p>
                  </div>

                  {/* Download */}
                  <a
                    href={file.url}
                    download={file.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      flexShrink: 0,
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      transition: 'background 0.15s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'var(--primary-container)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>download</span>
                    Download
                  </a>
                </div>
              ))}

              {/* Back button */}
              <button
                onClick={() => setOpenFolderId(null)}
                style={{
                  marginTop: '1rem',
                  alignSelf: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--on-surface-variant)',
                  background: 'none',
                  border: '1px solid var(--outline-variant)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'var(--surface-variant)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'none')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_back</span>
                Back to folders
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
