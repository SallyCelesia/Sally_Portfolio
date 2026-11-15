import '../styles/LetsTalkCard.css';
import { Link } from 'react-router-dom';

export default function LetsTalkCard() {
  return (
    <div className="lets-talk-card" aria-label="Let's Talk with SALLY, UI/UX Designer">
      <div className="lets-talk-avatar-blank" aria-hidden="true" />

      <div className="lets-talk-info">
        <span className="lets-talk-eyebrow">Visit</span>
        <div className="lets-talk-identity">
          <Link to="/myprojects" style={{textDecoration:"none"}}><strong className="lets-talk-name">MY PROJECTS</strong></Link>
          <span className="lets-talk-role">Links</span>
        </div>
      </div>
      
      <div className="lets-talk-actions">
        <span className="lets-talk-spark" aria-hidden="true">✳</span>
        <Link to="/myprojects" style={{textDecoration:"none"}}><span className="lets-talk-arrow-btn" aria-hidden="true">↗</span></Link>
      </div>
    </div>
  );
}
