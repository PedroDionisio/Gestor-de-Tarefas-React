import { supabase } from "./supabase";

const ERROR_MESSAGES = {
  "Invalid login credentials": "Email ou palavra-passe incorretos.",
  "User already registered": "Já existe uma conta com este email.",
  "Email not confirmed":
    "Ainda não confirmaste o teu email. Abre o link que te enviámos para ativar a conta.",
  "email rate limit exceeded":
    "Foram enviados demasiados emails. Tenta novamente daqui a alguns minutos.",
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
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw translateError(error);
}
