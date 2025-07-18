import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
    const { isAuthenticated, user } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    const roles = user?.profile?.['cognito:groups'] || [];

    if (!roles.includes(allowedRole)) {
        return <Navigate to="/" />; // Or redirect somewhere safer
    }

    return children;
}
