import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const TYPE_ICON = {
  PDF: 'picture_as_pdf',
  XLSX: 'table_chart',
  XLS: 'table_chart',
  DOCX: 'article',
  DOC: 'article',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [openFolderId, setOpenFolderId] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filesLoading, setFilesLoading] = useState(false);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Client';

  useEffect(() => {
    async function fetchFolders() {
      setLoading(true);
      const { data } = await supabase.from('portal_folders').select('*').order('position');
      setFolders(data || []);
      setLoading(false);
    }
    fetchFolders();
  }, []);

  useEffect(() => {
    if (!openFolderId) { setFiles([]); return; }
    async function fetchFiles() {
      setFilesLoading(true);
      const { data } = await supabase
        .from('portal_files')
        .select('*')
        .eq('folder_id', openFolderId)
        .order('created_at');
      setFiles(data || []);
      setFilesLoading(false);
    }
    fetchFiles();
  }, [openFolderId]);

  const folder = folders.find((f) => f.id === openFolderId);

  async function handleDownload(file) {
    const res = await fetch(file.url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(blobUrl);
  }

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

          {/* Loading state */}
          {loading && (
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '2rem', color: 'var(--on-surface-variant)', display: 'block' }}
              >
                progress_activity
              </span>
            </div>
          )}

          {/* Folder grid */}
          {!loading && !openFolderId && (
            <>
              {folders.length === 0 ? (
                <p style={{ color: 'var(--on-surface-variant)' }}>No documents available yet.</p>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {folders.map((f) => (
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
                          <span className="material-symbols-outlined text-primary" style={{ fontSize: '1.75rem' }}>
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
                          {f.file_count ?? 'Open'} {f.file_count != null ? `file${f.file_count !== 1 ? 's' : ''}` : 'to view files'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* File list inside folder */}
          {!loading && folder && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filesLoading && (
                <div style={{ padding: '2rem 0', textAlign: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: 'var(--on-surface-variant)' }}>
                    progress_activity
                  </span>
                </div>
              )}

              {!filesLoading && files.length === 0 && (
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>No files in this folder yet.</p>
              )}

              {!filesLoading && files.map((file) => (
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
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '1.375rem' }}>
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
                    <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '0.15rem' }}>
                      {file.type} · {new Date(file.created_at).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Download */}
                  <button
                    onClick={() => handleDownload(file)}
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
                      flexShrink: 0,
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontFamily: 'inherit',
                      transition: 'background 0.15s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'var(--primary-container)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>download</span>
                    Download
                  </button>
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
