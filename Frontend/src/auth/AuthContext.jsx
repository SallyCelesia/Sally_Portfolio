import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';

// The context object only. The hook that reads it lives in useAuth.js.
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // onAuthStateChanged runs once on load (to restore a session) and again
  // on every sign-in or sign-out. Returning its unsubscribe stops the listener
  // when the provider unmounts.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setReady(true);
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    isAdmin: Boolean(
      user
      && import.meta.env.ADMIN_USER_UID
      && user.uid === import.meta.env.ADMIN_USER_UID
    ),
    signUp: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signOutUser: () => signOut(auth),
  };

  // Render nothing until Firebase has told us who (if anyone) is signed in.
  // Otherwise a signed-in user would briefly see the login page.
  return <AuthContext.Provider value={value}>{ready && children}</AuthContext.Provider>;
}
