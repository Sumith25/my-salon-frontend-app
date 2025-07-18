import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export default function Login() {
    const auth = useAuth();

    useEffect(() => {
        auth.signinRedirect();
    }, []);

    return (
        <div className="text-center mt-20">
            <p>Redirecting to secure login...</p>
        </div>
    );
}
