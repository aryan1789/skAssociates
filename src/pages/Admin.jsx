import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const FOLDER_ICONS = [
  { value: 'folder', label: 'Folder' },
  { value: 'payments', label: 'Payments' },
  { value: 'receipt_long', label: 'Receipt' },
  { value: 'bar_chart', label: 'Chart' },
  { value: 'mail', label: 'Mail' },
  { value: 'handshake', label: 'Handshake' },
  { value: 'description', label: 'Document' },
];

export default function Admin() {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [openFolderId, setOpenFolderId] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderIcon, setNewFolderIcon] = useState('folder');
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const fileInputRef = useRef();

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (isAdmin) fetchFolders();
  }, [isAdmin]);

  useEffect(() => {
    if (openFolderId) fetchFiles(openFolderId);
    else setFiles([]);
  }, [openFolderId]);

  async function fetchFolders() {
    setLoading(true);
    const { data } = await supabase.from('portal_folders').select('*').order('position');
    setFolders(data || []);
    setLoading(false);
  }

  async function fetchFiles(folderId) {
    const { data } = await supabase
      .from('portal_files')
      .select('*')
      .eq('folder_id', folderId)
      .order('created_at');
    setFiles(data || []);
  }

  async function addFolder() {
    if (!newFolderName.trim()) return;
    await supabase.from('portal_folders').insert({
      name: newFolderName.trim(),
      icon: newFolderIcon,
      position: folders.length,
    });
    setNewFolderName('');
    setNewFolderIcon('folder');
    setShowNewFolder(false);
    fetchFolders();
  }

  async function renameFolder(id) {
    if (!renameValue.trim()) return;
    await supabase.from('portal_folders').update({ name: renameValue.trim() }).eq('id', id);
    setRenamingId(null);
    fetchFolders();
  }

  async function deleteFolder(id) {
    if (!window.confirm('Delete this folder and all its files?')) return;
    const { data: folderFiles } = await supabase
      .from('portal_files')
      .select('storage_path')
      .eq('folder_id', id)
      .not('storage_path', 'is', null);
    if (folderFiles?.length) {
      await supabase.storage.from('portal-documents').remove(folderFiles.map(f => f.storage_path));
    }
    await supabase.from('portal_folders').delete().eq('id', id);
    if (openFolderId === id) setOpenFolderId(null);
    fetchFolders();
  }

  async function uploadFile(e) {
    const file = e.target.files[0];
    if (!file || !openFolderId) return;
    setUploading(true);
    const storagePath = `${openFolderId}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('portal-documents')
      .upload(storagePath, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage
        .from('portal-documents')
        .getPublicUrl(storagePath);
      const ext = file.name.split('.').pop().toUpperCase();
      await supabase.from('portal_files').insert({
        folder_id: openFolderId,
        name: file.name,
        type: ['PDF', 'XLSX', 'DOCX', 'XLS', 'DOC'].includes(ext) ? ext : 'FILE',
        url: urlData.publicUrl,
        storage_path: storagePath,
      });
      fetchFiles(openFolderId);
    }
    setUploading(false);
    e.target.value = '';
  }

  async function deleteFile(file) {
    if (!window.confirm(`Delete "${file.name}"?`)) return;
    if (file.storage_path) {
      await supabase.storage.from('portal-documents').remove([file.storage_path]);
    }
    await supabase.from('portal_files').delete().eq('id', file.id);
    fetchFiles(openFolderId);
  }

  if (!isAdmin) {
    return (
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--on-surface-variant)' }}>Access denied.</p>
      </section>
    );
  }

  const folder = folders.find(f => f.id === openFolderId);

  return (
    <>
      {/* Header */}
      <section
        style={{
          padding: '5rem 0 3rem',
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
            Admin
          </span>
          <h1
            className="font-serif"
            style={{ fontSize: '3rem', color: 'var(--on-primary)', lineHeight: 1.1 }}
          >
            Client Portal Manager
          </h1>
          <p style={{ marginTop: '1rem', fontSize: '1rem', color: 'var(--on-primary-container)', opacity: 0.85 }}>
            Manage folders and files visible to all logged-in clients.
          </p>
        </div>
      </section>

      <section className="bg-surface-container-low" style={{ padding: '4rem 0', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '64rem' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setOpenFolderId(null)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: openFolderId ? 'pointer' : 'default', fontFamily: 'inherit' }}
            >
              <h2
                className="font-serif"
                style={{
                  fontSize: '1.75rem',
                  color: openFolderId ? 'var(--primary)' : 'var(--on-surface)',
                  textDecoration: openFolderId ? 'underline' : 'none',
                  textUnderlineOffset: '3px',
                  margin: 0,
                }}
              >
                Folders
              </h2>
            </button>
            {folder && (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--on-surface-variant)' }}>
                  chevron_right
                </span>
                <h2 className="font-serif" style={{ fontSize: '1.75rem', color: 'var(--on-surface)', margin: 0 }}>
                  {folder.name}
                </h2>
              </>
            )}
          </div>

          {/* Folder list */}
          {!openFolderId && (
            <>
              {loading ? (
                <p style={{ color: 'var(--on-surface-variant)', padding: '2rem 0' }}>Loading…</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {folders.length === 0 && (
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>No folders yet. Create one below.</p>
                  )}
                  {folders.map((f) => (
                    <div
                      key={f.id}
                      className="bg-surface-container-lowest"
                      style={{
                        borderRadius: '0.75rem',
                        padding: '1rem 1.5rem',
                        border: '1px solid var(--outline-variant)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <span className="material-symbols-outlined text-primary" style={{ fontSize: '1.5rem', flexShrink: 0 }}>
                        {f.icon}
                      </span>

                      {renamingId === f.id ? (
                        <>
                          <input
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && renameFolder(f.id)}
                            autoFocus
                            style={inputStyle}
                          />
                          <button onClick={() => renameFolder(f.id)} style={actionBtn('var(--primary)')}>Save</button>
                          <button onClick={() => setRenamingId(null)} style={actionBtn('var(--on-surface-variant)')}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setOpenFolderId(f.id)}
                            style={{
                              flex: 1,
                              background: 'none',
                              border: 'none',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontFamily: 'inherit',
                              fontSize: '0.9375rem',
                              fontWeight: 500,
                              color: 'var(--on-surface)',
                            }}
                          >
                            {f.name}
                          </button>
                          <button
                            onClick={() => { setRenamingId(f.id); setRenameValue(f.name); }}
                            style={actionBtn('var(--primary)')}
                          >
                            Rename
                          </button>
                          <button onClick={() => deleteFolder(f.id)} style={actionBtn('#d32f2f')}>Delete</button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* New folder form */}
              {showNewFolder ? (
                <div
                  className="bg-surface-container-lowest"
                  style={{
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    border: '1px solid var(--outline-variant)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <input
                    placeholder="Folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addFolder()}
                    autoFocus
                    style={inputStyle}
                  />
                  <div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginBottom: '0.5rem' }}>Icon</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {FOLDER_ICONS.map((ic) => (
                        <button
                          key={ic.value}
                          onClick={() => setNewFolderIcon(ic.value)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '0.4rem',
                            border: `2px solid ${newFolderIcon === ic.value ? 'var(--primary)' : 'var(--outline-variant)'}`,
                            background: newFolderIcon === ic.value ? 'var(--primary-container)' : 'transparent',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontSize: '0.8rem',
                            color: 'var(--on-surface)',
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{ic.value}</span>
                          {ic.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={addFolder}
                      style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem', background: 'var(--primary)', color: 'var(--on-primary)', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit', fontSize: '0.9rem' }}
                    >
                      Add Folder
                    </button>
                    <button
                      onClick={() => { setShowNewFolder(false); setNewFolderName(''); }}
                      style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem', background: 'none', color: 'var(--on-surface-variant)', border: '1px solid var(--outline-variant)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewFolder(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.5rem',
                    border: '1px dashed var(--outline-variant)',
                    background: 'none',
                    cursor: 'pointer',
                    color: 'var(--primary)',
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    transition: 'background 0.15s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--primary-container)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'none')}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>create_new_folder</span>
                  New Folder
                </button>
              )}
            </>
          )}

          {/* Files inside folder */}
          {folder && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {files.length === 0 && (
                  <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>No files yet. Upload one below.</p>
                )}
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-surface-container-lowest"
                    style={{
                      borderRadius: '0.75rem',
                      padding: '1rem 1.5rem',
                      border: '1px solid var(--outline-variant)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '1.375rem', flexShrink: 0 }}>
                      {file.type === 'PDF' ? 'picture_as_pdf' : file.type === 'XLSX' || file.type === 'XLS' ? 'table_chart' : 'insert_drive_file'}
                    </span>
                    <span style={{ flex: 1, fontSize: '0.9375rem', color: 'var(--on-surface)', wordBreak: 'break-word' }}>{file.name}</span>
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--primary)',
                        backgroundColor: 'var(--secondary-container)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '999px',
                        flexShrink: 0,
                      }}
                    >
                      {file.type}
                    </span>
                    <button onClick={() => deleteFile(file)} style={actionBtn('#d32f2f')}>Delete</button>
                  </div>
                ))}
              </div>

              {/* Upload button */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.xlsx,.xls,.docx,.doc,.csv"
                onChange={uploadFile}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '0.5rem',
                  border: '1px dashed var(--outline-variant)',
                  background: 'none',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  color: 'var(--primary)',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  opacity: uploading ? 0.6 : 1,
                  transition: 'background 0.15s',
                  marginBottom: '1.5rem',
                }}
                onMouseOver={(e) => { if (!uploading) e.currentTarget.style.background = 'var(--primary-container)'; }}
                onMouseOut={(e) => (e.currentTarget.style.background = 'none')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>
                  {uploading ? 'hourglass_empty' : 'upload_file'}
                </span>
                {uploading ? 'Uploading…' : 'Upload File'}
              </button>

              <button
                onClick={() => setOpenFolderId(null)}
                style={{
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
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_back</span>
                Back to folders
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}

const inputStyle = {
  flex: 1,
  padding: '0.5rem 0.75rem',
  borderRadius: '0.4rem',
  border: '1px solid var(--outline-variant)',
  fontFamily: 'inherit',
  fontSize: '0.9375rem',
  color: 'var(--on-surface)',
  background: 'var(--surface)',
  outline: 'none',
};

function actionBtn(color) {
  return {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
    fontFamily: 'inherit',
    flexShrink: 0,
  };
}
