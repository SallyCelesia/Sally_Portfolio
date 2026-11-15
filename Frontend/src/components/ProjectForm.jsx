import { useState } from 'react';

const EMPTY = {
  title: '',
  image: '',
  tech: '',
  description: '',
  liveUrl: '',
  githubUrl: '',
};

// Turn a saved project into the text shape the inputs use.
// tech is stored as an array, but an input shows it as "React, CSS".
function toFormState(project) {
  if (!project) return EMPTY;
  return { ...project, tech: project.tech.join(', ') };
}

export default function ProjectForm({ initial, onSave, onCancel }) {
  // Initialise from the project being edited, or blank for a new one.
  const [form, setForm] = useState(() => toFormState(initial));
  const isEditing = Boolean(initial);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      title: form.title.trim(),
      image: form.image.trim(),
      tech: form.tech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      description: form.description.trim(),
      liveUrl: form.liveUrl.trim(),
      githubUrl: form.githubUrl.trim(),
    });
    // After adding (not editing), clear the form so the next project starts blank.
    if (!isEditing) setForm(EMPTY);
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h2 className="project-form-title">{isEditing ? 'EDIT PROJECT' : 'ADD PROJECT'}</h2>

      <label className="field">
        <span>Title</span>
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>

      <label className="field">
        <span>Screenshot URL</span>
        <input name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://..." />
      </label>

      <label className="field">
        <span>Tech used (comma separated)</span>
        <input name="tech" value={form.tech} onChange={handleChange} placeholder="React, Node, MongoDB" />
      </label>

      <label className="field">
        <span>Description</span>
        <textarea name="description" rows={4} value={form.description} onChange={handleChange} />
      </label>

      <label className="field">
        <span>Live link</span>
        <input name="liveUrl" type="url" value={form.liveUrl} onChange={handleChange} placeholder="https://..." />
      </label>

      <label className="field">
        <span>GitHub link</span>
        <input name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." />
      </label>

      <div className="project-form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Save changes' : 'Add project'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
