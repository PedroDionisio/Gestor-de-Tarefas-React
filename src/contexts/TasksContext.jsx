import { createContext, useContext } from "react";
import { v4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const TasksContext = createContext();

function TasksProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useLocalStorage(`tasks-${user.id}`, []);

  function addTask(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((current) => [...current, newTask]);
  }

  function toggleTask(taskId) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }

  function updateTask(taskId, changes) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, ...changes } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, toggleTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined)
    throw new Error("useTasks tem de ser usado dentro do TasksProvider");
  return context;
}

export { TasksProvider, useTasks };
