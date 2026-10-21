import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";
import { useTasks } from "../contexts/TasksContext";

function TasksPage() {
  const { addTask } = useTasks();

  return (
    <div className="space-y-4">
      <AddTask onAddTaskSubmit={addTask} />
      <Tasks />
    </div>
  );
}

export default TasksPage;
