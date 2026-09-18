import { useState } from "react";
import { ChevronLeft, SquarePen } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../Components/Title.jsx";
import TextExpander from "../Components/TextExpander.jsx";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("id");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.id === taskId);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task?.title || "");
  const [editDescription, setEditDescription] = useState(
    task?.description || "",
  );

  function handleEditClick() {
    if (isEditing) {
      const newTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, title: editTitle, description: editDescription }
          : task,
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
    setIsEditing((prev) => !prev);
  }

  if (!task) {
    return (
      <div className="h-screen w-screen bg-slate-500 p-6">
        <p className="text-slate-100 text-center">Tarefa não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="w-[500px] mx-auto space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeft />
          </button>
          <Title>Detalhes da tarefa</Title>
          <button
            onClick={handleEditClick}
            className={`absolute right-0 top-0 bottom-0 px-3 rounded-md ${
              isEditing ? "bg-green-500 text-white" : "text-slate-100"
            }`}
          >
            {isEditing ? "Guardar" : <SquarePen />}
          </button>
        </div>

        <div className="bg-slate-200 p-4 rounded-md space-y-2">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border border-slate-300 px-2 py-2 rounded-md w-full"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="border border-slate-300 px-2 py-2 rounded-md w-full"
                rows={4}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-slate-600 text-center">
                {task.title}
              </h2>
              <TextExpander>{task.description}</TextExpander>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
