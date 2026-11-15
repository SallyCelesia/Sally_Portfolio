import { Link } from 'react-router-dom';
import '../styles/ShowcaseCard.css';

export default function ShowcaseCard() {
  return (
    <div className="showcase-card">
      <div className="showcase-visual">
      </div>
      <footer className="showcase-footer">
        <span className="showcase-brand">
          <span className="brand-asterisk" aria-hidden="true">✳</span>
          Tech & Skills →
        </span>
        <Link to="/about" style={{textDecoration:"none"}}>
          <span className="showcase-tag">/about</span>
        </Link>
      </footer>
    </div>
  );
}