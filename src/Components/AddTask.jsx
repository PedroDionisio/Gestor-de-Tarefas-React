import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "./Button";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Escreve um título para a tarefa.");
      return;
    }

    setError("");
    onAddTaskSubmit(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-line bg-surface p-4 sm:p-5"
    >
      <input
        type="text"
        placeholder="Nova tarefa"
        aria-label="Título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-transparent text-lg font-medium placeholder:text-muted/60 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Descrição (opcional)"
        aria-label="Descrição da tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-1 w-full bg-transparent py-1 text-sm placeholder:text-muted/60 focus:outline-none"
      />

      <div className="mt-4 flex flex-col-reverse gap-3 border-t border-line pt-4 sm:flex-row sm:items-center">
        <p
          role={error ? "alert" : undefined}
          className="flex-1 text-sm text-red-600"
        >
          {error}
        </p>
        <Button className="w-full sm:w-auto">
          <Plus size={16} />
          Adicionar tarefa
        </Button>
      </div>
    </form>
  );
}

export default AddTask;
