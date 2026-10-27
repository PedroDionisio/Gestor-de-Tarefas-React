import { supabase } from "./supabase";

function toProfile(row) {
  return {
    id: row.id,
    name: row.name,
    bio: row.bio,
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
  };
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error("Não foi possível carregar o perfil.");
  return toProfile(data);
}

export async function updateProfile(userId, { name, bio }) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ name, bio })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error("Não foi possível guardar o perfil.");
  return toProfile(data);
}
