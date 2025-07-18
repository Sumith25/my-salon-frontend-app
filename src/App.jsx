import { Routes, Route, Navigate } from "react-router-dom";
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
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

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

          {/* Customer Protected Routes */}
          {auth.isAuthenticated && auth.user?.profile["cognito:groups"]?.includes("customer") && (
            <>
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/book" element={<CustomerBookAppointment />} />
              <Route path="/customer/services" element={<ServicesCustomer />} />
              <Route path="/customer/appointments" element={<CustomerMyBookings />} />
            </>
          )}

          {/* Admin Protected Routes */}
          {auth.isAuthenticated && auth.user?.profile["cognito:groups"]?.includes("admin") && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/customers" element={<CustomerList />} />
              <Route path="/admin/services" element={<ServicesAdmin />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/staff" element={<AdminStaff />} />
              <Route path="/admin/appointments" element={<AdminAppointments />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
