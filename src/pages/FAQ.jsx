import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'Getting Started',
    icon: 'bar_chart',
    items: [
      {
        q: 'Do I need an accountant for my small business in New Zealand?',
        a: "Having an accountant can save you time, reduce errors, and often lower your tax bill. We also help ensure you stay compliant with Inland Revenue Department (IRD) requirements.",
      },
      {
        q: 'What services do you offer?',
        a: "We provide a full range of accounting services including annual financial statements, income tax returns (IR3, IR4, IR6), GST returns, bookkeeping support, and business advice and tax planning. If you're unsure what you need, we're happy to guide you.",
      },
    ],
  },
  {
    category: 'Tax & Compliance',
    icon: 'receipt_long',
    items: [
      {
        q: 'When do I need to register for GST?',
        a: "You must register for GST if your turnover exceeds $60,000 per year, or if you expect it to. We can help you decide the right time and handle the registration process.",
      },
      {
        q: 'What happens if I miss a tax deadline?',
        a: "Inland Revenue may charge penalties and interest. The good news is we can often help minimise these and get you back on track quickly.",
      },
      {
        q: 'Can you deal with IRD on my behalf?',
        a: "Yes. Once you authorise us, we can communicate with IRD, manage your filings, and handle any queries or notices — taking the stress off you entirely.",
      },
    ],
  },
  {
    category: 'Process & Pricing',
    icon: 'folder_open',
    items: [
      {
        q: 'What information do I need to provide?',
        a: "Typically bank statements, invoices (sales and expenses), loan or finance details, and payroll info if applicable. Don't worry if things aren't perfectly organised — we can help with that too.",
      },
      {
        q: 'How much do your services cost?',
        a: "Our fees are affordable and transparent, tailored to the size and complexity of your work. We're known for competitive pricing, personalised service, and no hidden costs.",
      },
      {
        q: 'Do you offer fixed pricing?',
        a: "Yes — in many cases we can agree on a fixed annual fee so you know exactly what to expect.",
      },
      {
        q: "What's the difference between accounting software and using an accountant?",
        a: "Accounting software helps you record and organise your financial data — things like invoices, expenses, and bank transactions. An accountant does much more: we ensure your financials are accurate and compliant with IRD requirements, prepare and file your tax returns correctly, identify tax-saving opportunities, and provide advice to help you grow your business. In simple terms, software handles the data — an accountant interprets it and helps you make better decisions. Most businesses benefit from using both.",
      },
    ],
  },
  {
    category: 'Working With Us',
    icon: 'handshake',
    items: [
      {
        q: 'Do I need to visit your office?',
        a: "You are welcome to visit our office but we work fully online as well. You can send documents digitally and communicate with us easily from wherever you are.",
      },
      {
        q: 'How quickly can you complete my work?',
        a: "This depends on complexity, but we aim to deliver efficiently without compromising quality. Urgent jobs can often be prioritised.",
      },
      {
        q: "I'm behind on my taxes — can you help?",
        a: "Absolutely. Many clients come to us in this situation. We'll assess where things stand, create a clear plan, and help you get compliant again. No judgement — just practical solutions.",
      },
    ],
  },
  {
    category: 'Extra Value',
    icon: 'trending_up',
    items: [
      {
        q: 'Can you help me grow my business?',
        a: "Yes — beyond compliance, we provide cashflow insights, tax-saving strategies, and business structure advice. We aim to be a long-term partner, not just a once-a-year service.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderRadius: '0.5rem',
        border: '1px solid var(--surface-variant)',
        overflow: 'hidden',
        transition: 'box-shadow 0.4s',
        boxShadow: open ? '0 4px 16px rgba(0,0,0,0.07)' : 'none',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          background: open ? 'linear-gradient(135deg, var(--primary-container), var(--primary))' : 'var(--surface)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.4s',
        }}
      >
        <span
          className="font-serif"
          style={{
            fontSize: '1.0625rem',
            fontWeight: 600,
            color: open ? 'rgba(255,255,255,0.95)' : 'var(--on-surface)',
            lineHeight: 1.4,
            transition: 'color 0.4s',
          }}
        >
          {q}
        </span>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: '1.5rem',
            color: open ? 'rgba(255,255,255,0.85)' : 'var(--primary)',
            flexShrink: 0,
            transition: 'transform 0.4s, color 0.4s',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        >
          expand_more
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '600px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.75s ease-in-out',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.5rem 1.5rem',
            background: 'var(--surface)',
            borderTop: '1px solid var(--surface-variant)',
          }}
        >
          <p
            className="text-on-surface-variant"
            style={{ lineHeight: 1.75, fontSize: '1rem' }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-primary"
        style={{
          padding: '8rem 0',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
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
              marginBottom: '1.5rem',
            }}
          >
            Got Questions?
          </span>
          <h1
            className="font-serif page-heading"
            style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--on-primary)' }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              color: 'var(--surface-container-highest)',
              fontSize: '1.25rem',
              maxWidth: '48rem',
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            Everything you need to know about working with SK &amp; Associates.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-surface" style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '52rem' }}>
          {faqs.map((section, si) => (
            <div key={si} style={{ marginBottom: '4rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '1.5rem', color: 'var(--primary)' }}
                >
                  {section.icon}
                </span>
                <h2
                  className="text-primary font-serif"
                  style={{ fontSize: '1.75rem' }}
                >
                  {section.category}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {section.items.map((item, qi) => (
                  <FAQItem key={qi} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div
            style={{
              marginTop: '2rem',
              padding: '3rem',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, var(--primary-container), var(--primary))',
              textAlign: 'center',
            }}
          >
            <h3
              className="font-serif"
              style={{ fontSize: '1.75rem', color: 'var(--on-primary)', marginBottom: '0.75rem' }}
            >
              Still have questions?
            </h3>
            <p
              style={{
                color: 'var(--surface-container-highest)',
                opacity: 0.85,
                marginBottom: '1.75rem',
                fontSize: '1.0625rem',
              }}
            >
              We're always happy to help. Reach out and we'll get back to you promptly.
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                backgroundColor: 'var(--surface)',
                color: 'var(--primary)',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseOut={e => (e.currentTarget.style.opacity = '1')}
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
