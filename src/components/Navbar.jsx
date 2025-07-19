import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";

export default function Navbar() {
  const auth = useAuth();

  const cognitoClientId = "1f6ch58jioma5ireu11astd3m1";
  const redirectUri = "http://localhost:5173";
  const hostedUiDomain = "https://ap-south-1w0ytlmkws.auth.ap-south-1.amazoncognito.com";

  const registerUrl = `${hostedUiDomain}/signup?client_id=${cognitoClientId}&response_type=code&scope=openid+email+phone&redirect_uri=${redirectUri}`;

  return (
    <nav className="bg-gray-900 px-8 py-4 shadow-md flex justify-between items-center">
      <Link
        to="/"
        className="text-white text-2xl font-bold tracking-wide hover:text-pink-400 transition"
      >
        My Salon App
      </Link>

      <div className="flex items-center space-x-6 text-white font-medium">
        <Link to="/" className="hover:text-pink-400 transition">Home</Link>
        <Link to="/services" className="hover:text-pink-400 transition">Services</Link>

        {!auth.isAuthenticated && (
          <>
            <a href={registerUrl} className="hover:text-pink-400 transition">
              Register
            </a>
            <button
              onClick={() => auth.signinRedirect()}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition"
            >
              Login
            </button>
          </>
        )}

        {auth.isAuthenticated && auth.user?.profile["cognito:groups"]?.includes("admin") && (
          <>
            <Link to="/admin" className="hover:text-pink-400 transition">Admin Dashboard</Link>
            <button
              onClick={() => auth.signoutRedirect()}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition"
            >
              Logout
            </button>
          </>
        )}

        {auth.isAuthenticated && auth.user?.profile["cognito:groups"]?.includes("customer") && (
          <>
            <Link to="/customer" className="hover:text-pink-400 transition">Customer Dashboard</Link>
            <button
              onClick={() => auth.signoutRedirect()}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
