import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerRegistration from "./pages/CustomerRegistration";
import CustomerList from "./pages/CustomerList";
import ServicesVisitor from "./pages/ServicesVisitor";
import ServicesCustomer from "./pages/ServicesCustomer";
import ServicesAdmin from "./pages/ServicesAdmin";
import CustomerBookAppointment from "./pages/CustomerBookAppointment";
import AdminAppointments from "./pages/AdminAppointments";
import CustomerMyBookings from "./pages/CustomerMyBookings";
import AdminProducts from "./pages/AdminProducts";
import AdminStaff from "./pages/AdminStaff";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "react-oidc-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect user to the right dashboard after login
  useEffect(() => {
    if (auth.isAuthenticated) {
      const groups = auth.user?.profile["cognito:groups"] || [];
      if (groups.includes("admin")) {
        navigate("/admin");
      } else if (groups.includes("customer")) {
        navigate("/customer");
      }
    }
  }, [auth.isAuthenticated, auth.user, navigate]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Auth error: {auth.error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<CustomerRegistration />} />
          <Route path="/services" element={<ServicesVisitor />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute role="admin">
                <CustomerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute role="admin">
                <ServicesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute role="admin">
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <ProtectedRoute role="admin">
                <AdminStaff />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/appointments"
            element={
              <ProtectedRoute role="admin">
                <AdminAppointments />
              </ProtectedRoute>
            }
          />

          {/* Customer Protected Routes */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute role="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/book"
            element={
              <ProtectedRoute role="customer">
                <CustomerBookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/services"
            element={
              <ProtectedRoute role="customer">
                <ServicesCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/appointments"
            element={
              <ProtectedRoute role="customer">
                <CustomerMyBookings />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
