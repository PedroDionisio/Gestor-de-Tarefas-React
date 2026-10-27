import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, SquarePen } from "lucide-react";
import { useTasks } from "../contexts/TasksContext";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import TextExpander from "../components/TextExpander";
import Title from "../components/Title";

function TaskDetails() {
  const { taskId } = useParams();
  const { tasks, isLoading, error, updateTask } = useTasks();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === taskId);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  async function handleEditClick() {
    if (isEditing) {
      await updateTask(taskId, {
        title: editTitle,
        description: editDescription,
      });
    } else {
      setEditTitle(task.title);
      setEditDescription(task.description);
    }
    setIsEditing((current) => !current);
  }

  if (isLoading) return <Loader className="text-slate-100" />;

  if (!task)
    return (
      <div className="space-y-4 rounded-md bg-slate-200 p-6 text-center">
        <p className="text-slate-600">Tarefa não encontrada.</p>
        <Link to="/" className="font-medium text-slate-700 underline">
          Voltar às tarefas
        </Link>
      </div>
    );

  return (
    <div className="space-y-4">
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="relative flex justify-center">
        <button
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="absolute bottom-0 left-0 top-0 text-slate-100"
        >
          <ChevronLeft />
        </button>
        <Title>Detalhes da tarefa</Title>
        <button
          onClick={handleEditClick}
          aria-label={isEditing ? "Guardar alterações" : "Editar tarefa"}
          className={`absolute bottom-0 right-0 top-0 rounded-md px-3 ${
            isEditing ? "bg-green-500 text-white" : "text-slate-100"
          }`}
        >
          {isEditing ? "Guardar" : <SquarePen />}
        </button>
      </div>

      <div className="space-y-2 rounded-md bg-slate-200 p-4">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              aria-label="Título"
              className="w-full rounded-md border border-slate-300 px-2 py-2"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              aria-label="Descrição"
              className="w-full rounded-md border border-slate-300 px-2 py-2"
              rows={4}
            />
          </>
        ) : (
          <>
            <h2 className="text-center text-xl font-bold text-slate-600">
              {task.title}
            </h2>
            <TextExpander>{task.description}</TextExpander>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskDetails;
