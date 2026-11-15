// Password rules for sign-up: longer than 6 characters, at least one uppercase
// letter, and at least one symbol (anything that is not a letter or digit).
// Returns an error message, or null when the password passes.
export function validatePassword(password) {
  if (password.length <= 6) return 'Password must be longer than 6 characters.';
  if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Password needs at least one symbol, such as ! or #.';
  return null;
}
