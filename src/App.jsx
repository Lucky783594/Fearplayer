import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminPanel from "./pages/AdminPanel";
import SearchPage from "./pages/SearchPage";
import LikedSongs from "./pages/LikedSongs";

const FullScreenSkeleton = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-6 animate-pulse">
      <div className="w-full max-w-sm space-y-8">

        <div className="h-6 bg-gray-800 rounded w-1/3 mx-auto"></div>

        <div className="w-64 h-64 bg-gray-800 rounded-2xl mx-auto shadow-xl"></div>
        
        <div className="space-y-3">
          <div className="h-5 bg-gray-800 rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto"></div>
        </div>
        
        <div className="space-y-2 max-w-xs mx-auto">
          <div className="h-1.5 bg-gray-800 rounded-full w-full"></div>
          <div className="flex justify-between text-xs">
            <div className="h-3 bg-gray-800 rounded w-6"></div>
            <div className="h-3 bg-gray-800 rounded w-6"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-6">
          <div className="w-5 h-5 bg-gray-800 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
          <div className="w-14 h-14 bg-gray-800 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
          <div className="w-5 h-5 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const ProtectedAdmin = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <FullScreenSkeleton />;
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;
  return children;
};

const ProtectedUser = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <FullScreenSkeleton />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="liked"
          element={
            <ProtectedUser>
              <LikedSongs />
            </ProtectedUser>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedAdmin>
              <AdminPanel />
            </ProtectedAdmin>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
