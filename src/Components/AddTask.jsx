import { useState } from "react";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      setError("Tem de preencher todos os campos.");
      return;
    }

    setError("");
    onAddTaskSubmit(title, description);
    setTitle("");
    setDescription("");
  }

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <input
        type="text"
        placeholder="Escreva o titulo da tarefa"
        className={`border px-4 py-2 rounded-md outline-slate-400 ${
          error && !title.trim() ? "border-red-500" : "border-slate-300"
        }`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Escreva a descriçao da tarefa"
        className={`border px-4 py-2 rounded-md outline-slate-400 ${
          error && !description.trim() ? "border-red-500" : "border-slate-300"
        }`}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
