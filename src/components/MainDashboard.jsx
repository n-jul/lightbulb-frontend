import { useState } from 'react';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const DashboardPage = () => {
  // In a real app, you'd get these from your auth context/state
  const [userRole] = useState('practice_user'); // Can be 'super_admin', 'admin', or 'practice_user'
  const [userEmail] = useState('john@example.com');
  
  // Sample campaigns data
  const [campaigns] = useState([
    {
      id: 1,
      name: "Q1 Marketing Campaign",
      description: "First quarter marketing initiatives",
      status: "Active",
      targetUsers: ["john@example.com", "jane@example.com"]
    },
    {
      id: 2,
      name: "Product Launch",
      description: "New product feature announcement",
      status: "Draft",
      targetUsers: ["john@example.com"]
    }
  ]);

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
              <span className="text-gray-600">Welcome, {userEmail}</span>
              <button className="text-gray-600 hover:text-gray-900">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        {userRole === 'super_admin' && <SuperAdminDashboard campaigns={campaigns} />}
        {userRole === 'admin' && <AdminDashboard campaigns={campaigns} />}
        {userRole === 'practice_user' && (
          <UserDashboard campaigns={campaigns} userEmail={userEmail} />
        )}
      </main>
    </div>
  );
};

export default DashboardPage;