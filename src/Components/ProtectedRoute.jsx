import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loader fullPage />;

  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
}

export default ProtectedRoute;
