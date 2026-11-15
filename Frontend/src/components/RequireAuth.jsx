import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

// Wraps a page. Signed-out visitors are sent to the login page.
// Signed-in visitors see the page plus a sign-out button.
export default function RequireAuth({ children }) {
  const { user, signOutUser } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return (
    <>
      {children}
      <button type="button" className="auth-signout" onClick={signOutUser}>
        Sign out
      </button>
    </>
  );
}
