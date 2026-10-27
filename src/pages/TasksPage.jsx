import AddTask from "../components/AddTask";
import ErrorMessage from "../components/ErrorMessage";
import Tasks from "../components/Tasks";
import { useTasks } from "../contexts/TasksContext";

function TasksPage() {
  const { addTask, error } = useTasks();

  return (
    <div className="space-y-4">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AddTask onAddTaskSubmit={addTask} />
      <Tasks />
    </div>
  );
}

export default TasksPage;
