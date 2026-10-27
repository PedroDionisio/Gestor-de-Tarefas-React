import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";
import {
  createTask,
  deleteTask as deleteTaskApi,
  getTasks,
  updateTask as updateTaskApi,
} from "../services/apiTasks";

const TasksContext = createContext();

const initialState = {
  tasks: [],
  isLoading: true,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "tasks/loaded":
      return { ...state, tasks: action.payload, isLoading: false, error: "" };

    case "task/created":
      return { ...state, tasks: [...state.tasks, action.payload], error: "" };

    case "task/updated":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
        error: "",
      };

    case "task/deleted":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        error: "",
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}

function TasksProvider({ children }) {
  const { user } = useAuth();
  const [{ tasks, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(
    function () {
      async function fetchTasks() {
        try {
          const data = await getTasks();
          dispatch({ type: "tasks/loaded", payload: data });
        } catch (err) {
          dispatch({ type: "rejected", payload: err.message });
        }
      }

      fetchTasks();
    },
    [user.id],
  );

  async function addTask(title, description) {
    try {
      const task = await createTask({ title, description });
      dispatch({ type: "task/created", payload: task });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  async function updateTask(taskId, changes) {
    try {
      const task = await updateTaskApi(taskId, changes);
      dispatch({ type: "task/updated", payload: task });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  function toggleTask(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    return updateTask(taskId, { isCompleted: !task.isCompleted });
  }

  async function deleteTask(taskId) {
    try {
      await deleteTaskApi(taskId);
      dispatch({ type: "task/deleted", payload: taskId });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        toggleTask,
        updateTask,
        deleteTask,
      }}
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
