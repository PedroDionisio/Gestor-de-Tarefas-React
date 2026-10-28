import AddTask from "../components/AddTask";
import ErrorMessage from "../components/ErrorMessage";
import Tasks from "../components/Tasks";
import Title from "../components/Title";
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../contexts/TasksContext";

function TasksPage() {
  const { user } = useAuth();
  const { addTask, error } = useTasks();
  const firstName = user.name.split(" ")[0];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Title>Tarefas</Title>
        <p className="text-muted">Olá {firstName}, o que há para fazer hoje?</p>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AddTask onAddTaskSubmit={addTask} />
      <Tasks />
    </div>
  );
}

export default TasksPage;
