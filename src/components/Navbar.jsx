import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Updated context using OIDC

export default function Navbar() {
    const { user, isAuthenticated, login, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Cognito Hosted UI logout
    };

    const handleLogin = () => {
        login(); // Cognito Hosted UI login
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div
                className="text-white font-bold text-xl cursor-pointer"
                onClick={() => navigate('/')}
            >
                My Salon App
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                <Link to="/services" className="text-white hover:text-gray-300">Services</Link>

                {!isAuthenticated && (
                    <>
                        <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
                        <button onClick={handleLogin} className="text-white hover:text-gray-300">Login</button>
                    </>
                )}

                {user?.profile?.['cognito:groups']?.includes('admin') && (
                    <>
                        <Link to="/admin" className="text-white hover:text-gray-300">Admin Dashboard</Link>
                        <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
                    </>
                )}

                {user?.profile?.['cognito:groups']?.includes('customer') && (
                    <>
                        <Link to="/customer" className="text-white hover:text-gray-300">Customer Dashboard</Link>
                        <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}
