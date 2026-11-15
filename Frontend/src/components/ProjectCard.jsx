export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className="project-card">
      {project.image ? (
        <img className="project-card-image" src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" />
      ) : (
        <div className="project-card-image project-card-placeholder" aria-hidden="true">✳</div>
      )}

      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>

        {project.tech.length > 0 && (
          <ul className="project-card-tech" aria-label="Tech used">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        {project.description && <p className="project-card-desc">{project.description}</p>}

        <div className="project-card-links">
          {project.liveUrl && ( 
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live link↗</a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          )}
        </div>

        <div className="project-card-actions">
          <button type="button" className="btn btn-ghost" onClick={onEdit}>Edit</button>
          <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}
