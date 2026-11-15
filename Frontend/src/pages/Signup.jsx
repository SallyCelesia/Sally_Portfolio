import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { friendlyAuthError } from '../auth/errors';
import { validatePassword } from '../auth/passwordRules';
import GridOverlay from '../components/GridOverlay';
import '../styles/Auth.css';

export default function Signup() {
  const { user, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/home" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Check our own rules first, so the learner sees exactly what is missing.
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setBusy(true);
    try {
      await signUp(email.trim(), password);
    } catch (err) {
      setError(friendlyAuthError(err));
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <GridOverlay />
      <div className="auth-content">
        <p className="auth-eyebrow">New account</p>
        <h1 className="auth-title">SIGN UP</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Email</span>
            <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          <ul className="auth-rules" aria-label="Password rules">
            <li className={password.length > 6 ? 'is-met' : ''}>More than 6 characters</li>
            <li className={/[A-Z]/.test(password) ? 'is-met' : ''}>One uppercase letter</li>
            <li className={/[^A-Za-z0-9]/.test(password) ? 'is-met' : ''}>One symbol</li>
          </ul>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="auth-btn" disabled={busy}>
            {busy ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}
