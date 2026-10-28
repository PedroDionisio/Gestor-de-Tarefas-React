import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";
import { isRecoveryPending } from "../services/passwordRecovery";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loader fullPage />;

  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  if (isRecoveryPending()) return <Navigate to="/nova-password" replace />;

  return children;
}

export default ProtectedRoute;
