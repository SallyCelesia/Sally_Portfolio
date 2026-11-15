// Firebase errors carry a code such as "auth/wrong-password".
// Map the ones a learner can act on to a plain sentence.
const messages = {
  'auth/invalid-email': 'That email address is not valid.',
  'auth/email-already-in-use': 'An account already exists for that email.',
  'auth/weak-password': 'Firebase rejected that password as too weak.',
  'auth/invalid-credential': 'Email or password is incorrect.',
  'auth/user-not-found': 'Email or password is incorrect.',
  'auth/wrong-password': 'Email or password is incorrect.',
  'auth/too-many-requests': 'Too many attempts. Wait a few minutes and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
};

export function friendlyAuthError(error) {
  return messages[error?.code] ?? 'Something went wrong. Please try again.';
}
