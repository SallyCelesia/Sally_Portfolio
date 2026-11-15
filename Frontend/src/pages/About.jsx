import { useState } from 'react';
import { Link } from 'react-router-dom';
import GridOverlay from '../components/GridOverlay';
import SocialLinks from '../components/SocialLinks';
import Certifications from '../components/Certifications';
import { useAuth } from '../auth/useAuth';
import { skills as defaultSkills } from '../data/skills';
import '../styles/About.css';
import '../styles/SocialLinks.css';

// Turn a skill name into a valid JavaScript variable name, e.g. "Node.js" -> "NodeJs".
const toVarName = (name) => name.replace(/[^a-zA-Z0-9]/g, '');
const SKILLS_STORAGE_KEY = 'skills.v1';

function isSkillsObject(value) {
  return value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
    && Object.keys(value).length > 0
    && Object.entries(value).every(([category, items]) =>
      category.trim().length > 0
      && Array.isArray(items)
      && items.every((item) => typeof item === 'string' && item.trim().length > 0)
    );
}

function loadSkills() {
  try {
    const saved = localStorage.getItem(SKILLS_STORAGE_KEY);
    if (!saved) return defaultSkills;
    const parsed = JSON.parse(saved);
    return isSkillsObject(parsed) ? parsed : defaultSkills;
  } catch {
    return defaultSkills;
  }
}

export default function About() {
  const { isAdmin } = useAuth();
  // Array destructuring: useState returns [value, setter]. The starting category is 'frontend'.
  const [skillData, setSkillData] = useState(loadSkills);
  const [category, setCategory] = useState('frontend');
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [skillsDraft, setSkillsDraft] = useState('');
  const [skillsError, setSkillsError] = useState('');
  const categories = Object.keys(skillData);
  const activeCategory = categories.includes(category) ? category : categories[0];

  // Each line of the object display, e.g. "  frontend: ['HTML', 'CSS'],"
  const objectLines = Object.entries(skillData).map(
    ([key, values]) => `  ${key}: [${values.map((v) => JSON.stringify(v)).join(', ')}],`
  );

  const items = skillData[activeCategory] ?? [];
  const destructuredNames = items.map(toVarName).join(', ');

  function startEditingSkills() {
    if (!isAdmin) return;
    setSkillsDraft(JSON.stringify(skillData, null, 2));
    setSkillsError('');
    setIsEditingSkills(true);
  }

  function saveSkills() {
    if (!isAdmin) return;
    let updatedSkills;
    try {
      updatedSkills = JSON.parse(skillsDraft);
    } catch {
      setSkillsError('Enter a valid JSON object before saving.');
      return;
    }

    if (!isSkillsObject(updatedSkills)) {
      setSkillsError('Use category names mapped to arrays of non-empty skill names.');
      return;
    }

    try {
      localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(updatedSkills));
    } catch {
      setSkillsError('Could not save your skills in this browser.');
      return;
    }

    setSkillData(updatedSkills);
    setSkillsError('');
    setIsEditingSkills(false);
  }

  return (
    <div className="about-page">
      <GridOverlay />

      <div className="about-content">
        <Link to="/" className="about-back">← Back</Link>

        <header className="about-intro">
          <p className="about-eyebrow">About me</p>
          <h1 className="about-title">MERN STACK DEVELOPER</h1>
          <p className="about-text">
            I build full-stack web applications with MongoDB, Express, React and Node.js.
            I care about clean interfaces, well-structured APIs, and code that the next
            developer can read.
          </p>
          <SocialLinks />
        </header>

        <section className="about-panel" aria-label="Skills object">
          <div className="about-panel-heading">
            <h2 className="about-panel-title">const skills</h2>
            {isAdmin && isEditingSkills ? (
              <div className="skills-editor-actions">
                <button type="button" className="skills-editor-btn" onClick={saveSkills}>Save</button>
                <button
                  type="button"
                  className="skills-editor-btn"
                  onClick={() => {
                    setIsEditingSkills(false);
                    setSkillsError('');
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : isAdmin ? (
              <button type="button" className="skills-editor-btn" onClick={startEditingSkills}>
                Edit code
              </button>
            ) : null}
          </div>
          {isAdmin && isEditingSkills ? (
            <textarea
              className="code-block skills-editor"
              aria-label="Edit skills JSON"
              spellCheck="false"
              value={skillsDraft}
              onChange={(event) => setSkillsDraft(event.target.value)}
            />
          ) : (
            <pre className="code-block">
              <code>
                {'const skills = {\n'}
                {objectLines.join('\n')}
                {'\n};'}
              </code>
            </pre>
          )}
          {skillsError && <p className="skills-editor-error" role="alert">{skillsError}</p>}
        </section>

        <nav className="skill-filters" aria-label="Filter skills by category">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              className={`skill-filter-btn ${activeCategory === name ? 'is-active' : ''}`}
              aria-pressed={activeCategory === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </nav>

        <section className="about-panel" aria-label="Filtered skills">
          <pre className="code-block">
            <code>{`const [${destructuredNames}] = skills.${activeCategory};`}</code>
          </pre>

          {/* key={category} remounts this list on every click, so the fall animation replays. */}
          <ul className="skill-drop-zone" key={activeCategory}>
            {items.map((skill, i) => (
              <li
                key={skill}
                className="skill-chip"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
        <Certifications />
      </div>
    </div>
  );
}
