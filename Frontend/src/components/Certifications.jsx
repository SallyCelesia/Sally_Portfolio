import { useEffect, useState } from 'react';
import '../styles/Certifications.css';

const STORAGE_KEY = 'certifications.v1';
const EMPTY = { title: '', image: '', link: '' };

// Read the saved list once. If the stored text is missing or corrupt, start empty.
function loadCerts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Certifications() {
  const [certs, setCerts] = useState(loadCerts);
  const [form, setForm] = useState(EMPTY);
  // The id of the certification being edited, or null when adding.
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
  }, [certs]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm(EMPTY);
    setEditingId(null);
  }

  function handleAdd(e) {
    e.preventDefault();
    const cert = {
      title: form.title.trim(),
      image: form.image.trim(),
      link: form.link.trim(),
    };
    if (editingId) {
      // Update: replace the one being edited, keep its id.
      setCerts((list) => list.map((c) => (c.id === editingId ? { ...c, ...cert } : c)));
    } else {
      setCerts((list) => [...list, { id: crypto.randomUUID(), ...cert }]);
    }
    resetForm();
  }

  function startEdit(cert) {
    setForm({ title: cert.title, image: cert.image, link: cert.link });
    setEditingId(cert.id);
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this certification?')) return;
    setCerts((list) => list.filter((c) => c.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <section className="cert-panel" aria-label="Certifications">
      <h2 className="cert-heading">Certifications</h2>

      {certs.length === 0 && <p className="cert-empty">No certifications yet.</p>}

      <ul className="cert-list">
        {certs.map((cert) => (
          <li
            key={cert.id}
            className={`cert-card ${editingId === cert.id ? 'is-editing' : ''}`}
          >
            {cert.image ? (
              <img className="cert-image" src={cert.image} alt={cert.title} loading="lazy" />
            ) : (
              <div className="cert-image cert-placeholder" aria-hidden="true">✳</div>
            )}
            <div className="cert-info">
              <strong className="cert-title">{cert.title}</strong>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                  View credential ↗
                </a>
              )}
            </div>
            <div className="cert-card-actions">
              <button type="button" className="cert-btn" onClick={() => startEdit(cert)}>Edit</button>
              <button type="button" className="cert-btn cert-btn-danger" onClick={() => handleDelete(cert.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <form className="cert-form" onSubmit={handleAdd}>
        <label className="cert-field">
          <span>Title</span>
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label className="cert-field">
          <span>Image URL</span>
          <input name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://..." />
        </label>
        <label className="cert-field">
          <span>Link</span>
          <input name="link" type="url" value={form.link} onChange={handleChange} placeholder="https://..." />
        </label>

        <div className="cert-form-actions">
          {editingId ? (
            <>
              <button type="submit" className="cert-btn cert-btn-primary">Update</button>
              <button type="button" className="cert-btn" onClick={resetForm}>Cancel</button>
            </>
          ) : (
            <button type="submit" className="cert-btn cert-btn-primary">Add certification</button>
          )}
        </div>
      </form>
    </section>
  );
}
