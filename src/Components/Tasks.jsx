import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, SquarePen, TrashIcon } from "lucide-react";
import IconButton from "./IconButton";
import { formatDate } from "../utils/formatDate";
import { useTasks } from "../contexts/TasksContext";

const FILTERS = [
  { value: "all", label: "Todas", emptyMessage: "Sem tarefas!" },
  {
    value: "pending",
    label: "Pendentes",
    emptyMessage: "Sem tarefas pendentes!",
  },
  {
    value: "completed",
    label: "Concluídas",
    emptyMessage: "Sem tarefas concluídas!",
  },
];

function Tasks() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("none");

  const numCompleted = tasks.filter((task) => task.isCompleted).length;
  const numTotal = tasks.length;

  function handleFilterClick(filterValue) {
    setFilter((current) => (current === filterValue ? "all" : filterValue));
  }

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
    <div className="space-y-4 rounded-md bg-slate-200 p-6 shadow">
      {numTotal > 0 && (
        <p className="text-center text-sm text-slate-600">
          {numCompleted} de {numTotal} tarefas concluídas
        </p>
      )}

      <div className="flex justify-center gap-2">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleFilterClick(value)}
            className={`rounded-md px-4 py-2 font-medium ${
              filter === value
                ? "bg-slate-500 text-white"
                : "bg-slate-300 text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Pesquisar tarefa..."
        aria-label="Pesquisar tarefa"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-md border border-slate-300 px-4 py-2"
      />

      <select
        value={sortBy}
        aria-label="Ordenar tarefas"
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full rounded-md border border-slate-300 px-4 py-2"
      >
        <option value="none">Ordem de criação</option>
        <option value="date">Ordenar por data</option>
        <option value="title">Ordenar por título</option>
      </select>

      {sortedTasks.length === 0 && (
        <p className="text-center text-slate-500">
          {searchQuery
            ? `Nenhuma tarefa encontrada para "${searchQuery}"`
            : emptyMessage}
        </p>
      )}

      <ul className="space-y-4">
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

function TaskItem({ task }) {
  const { toggleTask, updateTask, deleteTask } = useTasks();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  function handleSave() {
    updateTask(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  }

  function handleDelete() {
    if (window.confirm("Tem a certeza que pretende eliminar esta tarefa?"))
      deleteTask(task.id);
  }

  return (
    <li className="flex gap-2">
      {isEditing ? (
        <div className="flex w-full flex-col gap-2">
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
            rows={3}
          />
        </div>
      ) : (
        <button
          onClick={() => toggleTask(task.id)}
          className={`w-full rounded-md bg-slate-400 p-2 text-left text-white ${
            task.isCompleted ? "line-through" : ""
          }`}
        >
          <span className="block">{task.title}</span>
          <span className="block text-xs font-normal text-slate-200">
            Criada a {formatDate(task.createdAt)}
          </span>
        </button>
      )}

      {isEditing ? (
        <button
          onClick={handleSave}
          className="rounded-md bg-green-500 p-2 text-white"
        >
          Guardar
        </button>
      ) : (
        <IconButton label="Editar tarefa" onClick={() => setIsEditing(true)}>
          <SquarePen />
        </IconButton>
      )}

      <IconButton
        label="Ver detalhes"
        onClick={() => navigate(`/tarefas/${task.id}`)}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton label="Eliminar tarefa" onClick={handleDelete}>
        <TrashIcon />
      </IconButton>
    </li>
  );
}

export default Tasks;
