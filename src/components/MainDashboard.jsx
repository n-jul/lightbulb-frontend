import { useState } from "react";
import SuperAdminDashboard from "./SuperAdminDashboard";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import useAuth from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const DashboardPage = () => {
  const {username, role} = useSelector((state)=>state.auth)
  const [userRole] = useState(role); // Can be 'super_admin', 'admin', or 'practice_user'
  const [userName] = useState(username);
  const navigate = useNavigate()
  const {handleLogout} = useAuth()
  const handleSubmit = () => {
    handleLogout();
    navigate("/auth")
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">LIGHTBULB</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {userName}</span>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={handleSubmit}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        {userRole === "superadmin" && (
          <SuperAdminDashboard/>
        )}
        {userRole === "admin" && <AdminDashboard/>}
        {userRole === "user" && (
          <UserDashboard />
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
