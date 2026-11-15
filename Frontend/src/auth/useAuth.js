import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Gives any component the current user and the sign-in, sign-up and sign-out functions.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
