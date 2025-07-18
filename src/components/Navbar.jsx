import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";

export default function Navbar() {
  const auth = useAuth();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-xl">
        My Salon App
      </Link>
      <div className="flex space-x-4">
        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
        <Link to="/services" className="text-white hover:text-gray-300">Services</Link>
        <Link to="/register" className="text-white hover:text-gray-300">Register</Link>

        {auth.isAuthenticated && auth.user?.profile["cognito:groups"]?.includes("admin") && (
          <>
            <Link to="/admin" className="text-white hover:text-gray-300">Admin Dashboard</Link>
            <button onClick={() => auth.signoutRedirect()} className="text-white hover:text-gray-300">
              Logout
            </button>
          </>
        )}

        {auth.isAuthenticated && auth.user?.profile["cognito:groups"]?.includes("customer") && (
          <>
            <Link to="/customer" className="text-white hover:text-gray-300">Customer Dashboard</Link>
            <button onClick={() => auth.signoutRedirect()} className="text-white hover:text-gray-300">
              Logout
            </button>
          </>
        )}

        {!auth.isAuthenticated && (
          <button onClick={() => auth.signinRedirect()} className="text-white hover:text-gray-300">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
