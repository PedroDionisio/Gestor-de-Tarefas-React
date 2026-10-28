export const MIN_PASSWORD_LENGTH = 6;

export function validatePassword(password, confirmPassword) {
  if (password.length < MIN_PASSWORD_LENGTH)
    return `A palavra-passe tem de ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  if (password !== confirmPassword) return "As palavras-passe não coincidem.";
  return "";
}
