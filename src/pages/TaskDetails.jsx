import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, SquarePen } from "lucide-react";
import { useTasks } from "../contexts/TasksContext";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import TextExpander from "../components/TextExpander";
import { formatDate } from "../utils/formatDate";
import { inputClass } from "../utils/styles";

function TaskDetails() {
  const { taskId } = useParams();
  const { tasks, isLoading, error, updateTask } = useTasks();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === taskId);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editError, setEditError] = useState("");

  function handleEditClick() {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditError("");
    setIsEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!editTitle.trim()) {
      setEditError("O título não pode ficar vazio.");
      return;
    }

    await updateTask(taskId, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  }

  if (isLoading) return <Loader />;

  if (!task)
    return (
      <div className="space-y-4 rounded-xl border border-dashed border-line px-4 py-10 text-center">
        <p className="text-muted">Esta tarefa não existe ou foi apagada.</p>
        <Link to="/" className="font-medium text-accent hover:underline">
          Voltar às tarefas
        </Link>
      </div>
    );

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
      >
        <ChevronLeft size={16} />
        Voltar
      </button>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <article className="space-y-5 rounded-xl border border-line bg-surface p-5 sm:p-8">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              aria-label="Título"
              className={`${inputClass} text-lg font-semibold`}
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              aria-label="Descrição"
              rows={6}
              className={inputClass}
            />
            {editError && (
              <p role="alert" className="text-sm text-red-600">
                {editError}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button aria-label="Guardar alterações">Guardar</Button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="min-w-0 break-words text-2xl font-semibold tracking-tight sm:text-3xl">
                {task.title}
              </h1>
              <Button
                variant="secondary"
                onClick={handleEditClick}
                aria-label="Editar tarefa"
                className="shrink-0 self-start"
              >
                <SquarePen size={16} />
                Editar
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span
                className={`rounded-full px-2.5 py-0.5 font-medium ${
                  task.isCompleted
                    ? "bg-accent-soft text-accent"
                    : "bg-canvas text-muted"
                }`}
              >
                {task.isCompleted ? "Concluída" : "Pendente"}
              </span>
              <span className="text-muted">
                Criada a {formatDate(task.createdAt)}
              </span>
            </div>

            <div className="border-t border-line pt-5">
              {task.description ? (
                <TextExpander>{task.description}</TextExpander>
              ) : (
                <p className="text-muted">Sem descrição.</p>
              )}
            </div>
          </>
        )}
      </article>
    </div>
  );
}

export default TaskDetails;
