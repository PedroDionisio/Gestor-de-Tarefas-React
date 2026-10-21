import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { TasksProvider } from "./contexts/TasksContext";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import TasksPage from "./pages/TasksPage";
import TaskDetails from "./pages/TaskDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: (
      <ProtectedRoute>
        <TasksProvider>
          <AppLayout />
        </TasksProvider>
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <TasksPage /> },
      { path: "/tarefas/:taskId", element: <TaskDetails /> },
      { path: "/perfil", element: <Profile /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
