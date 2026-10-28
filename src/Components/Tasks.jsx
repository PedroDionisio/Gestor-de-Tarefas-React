import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Search, SquarePen, Trash2 } from "lucide-react";
import Button from "./Button";
import IconButton from "./IconButton";
import Loader from "./Loader";
import { formatDate } from "../utils/formatDate";
import { inputClass, selectClass } from "../utils/styles";
import { useTasks } from "../contexts/TasksContext";

const FILTERS = [
  {
    value: "all",
    label: "Todas",
    emptyMessage: "Ainda não tens tarefas. Cria a primeira acima.",
  },
  {
    value: "pending",
    label: "Pendentes",
    emptyMessage: "Não tens tarefas pendentes.",
  },
  {
    value: "completed",
    label: "Concluídas",
    emptyMessage: "Ainda não concluíste nenhuma tarefa.",
  },
];

function Tasks() {
  const { tasks, isLoading } = useTasks();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("none");

  const numCompleted = tasks.filter((task) => task.isCompleted).length;
  const numTotal = tasks.length;
  const percentCompleted = numTotal
    ? Math.round((numCompleted / numTotal) * 100)
    : 0;

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "pending") return !task.isCompleted;
      if (filter === "completed") return task.isCompleted;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "date") return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  const emptyMessage = FILTERS.find((f) => f.value === filter).emptyMessage;

  return (
    <section className="space-y-4">
      {numTotal > 0 && (
        <div className="space-y-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">
              {numCompleted} de {numTotal} tarefas concluídas
            </span>
            <span className="text-muted">{percentCompleted}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${percentCompleted}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Pesquisar tarefa..."
            aria-label="Pesquisar tarefa"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${inputClass} pl-9`}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex w-full rounded-md border border-line bg-surface p-0.5 sm:w-auto">
            {FILTERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors sm:flex-none ${
                  filter === value
                    ? "bg-ink text-surface"
                    : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            aria-label="Ordenar tarefas"
            onChange={(e) => setSortBy(e.target.value)}
            className={selectClass}
          >
            <option value="none">Ordem de criação</option>
            <option value="date">Mais antigas primeiro</option>
            <option value="title">Por título</option>
          </select>
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading && sortedTasks.length === 0 && (
        <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
          {searchQuery
            ? `Nenhuma tarefa encontrada para "${searchQuery}".`
            : emptyMessage}
        </p>
      )}

      {sortedTasks.length > 0 && (
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
}

function TaskItem({ task }) {
  const { toggleTask, updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
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

    await updateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  }

  function handleDelete() {
    if (window.confirm("Tem a certeza que pretende eliminar esta tarefa?"))
      deleteTask(task.id);
  }

  if (isEditing)
    return (
      <li className="bg-canvas/60 px-4 py-3">
        <form onSubmit={handleSave} className="space-y-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            aria-label="Título"
            className={inputClass}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            aria-label="Descrição"
            rows={3}
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
            <Button>Guardar</Button>
          </div>
        </form>
      </li>
    );

  return (
    <li className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-canvas/60">
      <button
        onClick={() => toggleTask(task.id)}
        aria-label={
          task.isCompleted ? "Marcar como pendente" : "Marcar como concluída"
        }
        aria-pressed={task.isCompleted}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          task.isCompleted
            ? "border-accent bg-accent text-white"
            : "border-line hover:border-accent"
        }`}
      >
        {task.isCompleted && <Check size={14} strokeWidth={3} />}
      </button>

      <div className="min-w-0 flex-1">
        <Link
          to={`/tarefas/${task.id}`}
          className={`block truncate font-medium hover:underline ${
            task.isCompleted
              ? "text-muted line-through decoration-accent decoration-2"
              : ""
          }`}
        >
          {task.title}
        </Link>
        {task.description && (
          <p className="truncate text-sm text-muted">{task.description}</p>
        )}
        <p className="mt-1 text-xs text-muted">
          Criada a {formatDate(task.createdAt)}
        </p>
      </div>

      <div className="flex shrink-0 gap-1 sm:opacity-0 sm:transition-opacity sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
        <IconButton label="Editar tarefa" onClick={handleEditClick}>
          <SquarePen size={18} />
        </IconButton>
        <IconButton label="Eliminar tarefa" onClick={handleDelete}>
          <Trash2 size={18} />
        </IconButton>
      </div>
    </li>
  );
}

export default Tasks;
