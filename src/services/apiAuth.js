import { supabase } from "./supabase";
import { clearRecovery } from "./passwordRecovery";

const ERROR_MESSAGES = {
  "Invalid login credentials": "Email ou palavra-passe incorretos.",
  "User already registered": "Já existe uma conta com este email.",
  "Email not confirmed":
    "Ainda não confirmaste o teu email. Abre o link que te enviámos para ativar a conta.",
  "email rate limit exceeded":
    "Foram enviados demasiados emails. Tenta novamente daqui a alguns minutos.",
  "New password should be different from the old password.":
    "A nova palavra-passe tem de ser diferente da anterior.",
  "Auth session missing!":
    "O link expirou ou já foi usado. Pede um novo link de recuperação.",
};

function translateError(error) {
  return new Error(
    ERROR_MESSAGES[error.message] ?? "Ocorreu um erro. Tenta novamente.",
  );
}

export async function signup({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });
  if (error) throw translateError(error);

  if (data.user?.identities?.length === 0)
    throw new Error(ERROR_MESSAGES["User already registered"]);

  return { needsConfirmation: !data.session };
}

export async function login({ email, password }) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw translateError(error);
  clearRecovery();
}

export async function requestPasswordReset(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/nova-password`,
  });
  if (error) throw translateError(error);
}

export async function updatePassword(password) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw translateError(error);
}

export async function logout() {
  clearRecovery();
  const { error } = await supabase.auth.signOut();
  if (error) throw translateError(error);
}
