import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

export default function Login() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            auth.signinRedirect();
        } else {
            navigate("/");
        }
    }, [auth.isAuthenticated, auth, navigate]);

    return (
        <div className="text-center mt-20">
            <p>Redirecting to secure login...</p>
        </div>
    );
}
