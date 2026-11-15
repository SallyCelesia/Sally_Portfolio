import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GridOverlay from '../components/GridOverlay';
import ProjectForm from '../components/ProjectForm';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../auth/useAuth';
import '../styles/MyProjects.css';

const STORAGE_KEY = 'myprojects.v1';

// Read the saved list once, when the page first mounts.
// If the stored text is missing or corrupt, start with an empty list.
function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function MyProjects() {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState(loadProjects);
  const [editingId, setEditingId] = useState(null);

  // Only the admin can persist project changes.
  useEffect(() => {
    if (isAdmin) localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects, isAdmin]);

  const editing = projects.find((p) => p.id === editingId) ?? null;

  function handleSave(data) {
    if (!isAdmin) return;
    if (editing) {
      setProjects((list) =>
        list.map((p) => (p.id === editing.id ? { ...p, ...data } : p))
      );
      setEditingId(null);
    } else {
      setProjects((list) => [{ id: crypto.randomUUID(), ...data }, ...list]);
    }
  }

  function handleDelete(id) {
    if (!isAdmin) return;
    if (!window.confirm('Delete this project?')) return;
    setProjects((list) => list.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  }

  return (
    <div className="projects-page">
      <GridOverlay />

      <div className="projects-content">
        <header className="projects-header">
          <Link to="/" className="projects-back">← Back</Link>
          <h1 className="projects-title">MY PROJECTS</h1>
          <p className="projects-count">{projects.length} saved</p>
        </header>

        <div className={`projects-layout ${isAdmin ? '' : 'projects-layout-readonly'}`}>
          {isAdmin && (
            <section className="projects-form-panel" aria-label="Add or edit a project">
              {/* key forces a fresh form whenever we switch between adding and editing */}
              <ProjectForm
                key={editing ? editing.id : 'new'}
                initial={editing}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            </section>
          )}

          <section className="projects-list" aria-label="Project list">
            {projects.length === 0 && (
              <p className="projects-empty">No projects yet.</p>
            )}
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isAdmin={isAdmin}
                  onEdit={() => setEditingId(project.id)}
                  onDelete={() => handleDelete(project.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
