import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ButtonIntoPage from "./ButtonIntoPage";
import ButtonTrash from "./ButtonTrash";
import { useState } from "react";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onEditTask }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const numCompleted = tasks.filter((task) => task.isCompleted).length;
  const numTotal = tasks.length;

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  function handleFilterClick(filterValue) {
    setFilter((current) => (current === filterValue ? "all" : filterValue));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true;
  });

  const emptyMessages = {
    all: "Sem tarefas!",
    pending: "Sem tarefas pendentes!",
    completed: "Sem tarefas concluídas!",
  };
  return (
    <div className="p-6 bg-slate-200 rounded-md shadow space-y-4">
      {numTotal > 0 && (
        <p className="text-slate-600 text-sm text-center">
          {numCompleted} de {numTotal} tarefas concluídas
        </p>
      )}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => handleFilterClick("all")}
          className={`px-4 py-2 rounded-md font-medium ${
            filter === "all"
              ? "bg-slate-500 text-white"
              : "bg-slate-300 text-slate-700"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => handleFilterClick("pending")}
          className={`px-4 py-2 rounded-md font-medium ${
            filter === "pending"
              ? "bg-slate-500 text-white"
              : "bg-slate-300 text-slate-700"
          }`}
        >
          Pendentes
        </button>
        <button
          onClick={() => handleFilterClick("completed")}
          className={`px-4 py-2 rounded-md font-medium ${
            filter === "completed"
              ? "bg-slate-500 text-white"
              : "bg-slate-300 text-slate-700"
          }`}
        >
          Concluídas
        </button>
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-slate-500 text-center">{emptyMessages[filter]}</p>
      )}
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onTaskClick={onTaskClick}
            onDeleteTaskClick={onDeleteTaskClick}
            onEditTask={onEditTask}
            onSeeDetailsClick={onSeeDetailsClick}
          />
        ))}
      </ul>
    </div>
  );
}

function Task({
  task,
  onTaskClick,
  onDeleteTaskClick,
  onEditTask,
  onSeeDetailsClick,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  return (
    <li className="flex flex-col gap-2">
      <div className="flex gap-2">
        {isEditing ? (
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Título"
              className="border border-slate-300 px-2 py-2 rounded-md w-full"
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Descrição"
              className="border border-slate-300 px-2 py-2 rounded-md w-full"
            />
          </div>
        ) : (
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${task.isCompleted && "line-through"}`}
          >
            <span className="block">{task.title}</span>
            <span className="block text-xs text-slate-200 font-normal">
              Criada a {task.createdAt}
            </span>
          </button>
        )}

        {isEditing ? (
          <button
            onClick={() => {
              onEditTask(task.id, editTitle, editDescription);
              setIsEditing(false);
            }}
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white p-2 rounded-md"
          >
            Editar
          </button>
        )}

        <ButtonIntoPage onClick={() => onSeeDetailsClick(task)}>
          <ChevronRightIcon />
        </ButtonIntoPage>
        <ButtonTrash onClick={() => onDeleteTaskClick(task.id)}>
          <TrashIcon />
        </ButtonTrash>
      </div>
    </li>
  );
}

export default Tasks;
