import { supabase } from "./supabase";

function toTask(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    isCompleted: row.is_completed,
    createdAt: row.created_at,
  };
}

function toRow(changes) {
  const row = {};
  if ("title" in changes) row.title = changes.title;
  if ("description" in changes) row.description = changes.description;
  if ("isCompleted" in changes) row.is_completed = changes.isCompleted;
  return row;
}

export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at");

  if (error) throw new Error("Não foi possível carregar as tarefas.");
  return data.map(toTask);
}

export async function createTask({ title, description }) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ title, description })
    .select()
    .single();

  if (error) throw new Error("Não foi possível criar a tarefa.");
  return toTask(data);
}

export async function updateTask(taskId, changes) {
  const { data, error } = await supabase
    .from("tasks")
    .update(toRow(changes))
    .eq("id", taskId)
    .select()
    .single();

  if (error) throw new Error("Não foi possível guardar a tarefa.");
  return toTask(data);
}

export async function deleteTask(taskId) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) throw new Error("Não foi possível apagar a tarefa.");
}
