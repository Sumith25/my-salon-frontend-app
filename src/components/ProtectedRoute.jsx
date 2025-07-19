import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const groups = user?.profile?.["cognito:groups"] || [];
  if (role && !groups.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
