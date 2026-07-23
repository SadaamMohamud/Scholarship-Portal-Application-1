import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);

        // Fixed - correct endpoint is /admin/users not /users
        const response = await api.get('/admin/users');
        const savedUsers = Array.isArray(response.data) ? response.data : [];

        if (savedUsers.length) {
          localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
          setUsers(savedUsers);
        } else {
          throw new Error('No users returned from API');
        }
      } catch (err) {
        console.error('Error loading users:', err);
        const savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
        setUsers(savedUsers);
        if (!savedUsers.length) {
          setError('Ma awoodo inaan soo dejiyo liiska dadka. Fadlan isku day markale.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen py-12 px-6 font-sans text-gray-700">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="text-xs text-gray-400 font-medium">
            Home / Dashboard
          </div>
          <h1 className="text-3xl font-black text-[#031b33] mt-2">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Welcome back {user?.fullName || user?.name || ''}. Manage your scholarship portal information.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 uppercase">Total Users</p>
            <h2 className="text-3xl font-black text-[#0052cc] mt-2">
              {users.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 uppercase">Account Role</p>
            <h2 className="text-xl font-black text-green-600 mt-3">
              {user?.role || 'STUDENT'}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 uppercase">Status</p>
            <h2 className="text-xl font-black text-amber-500 mt-3">
              Active
            </h2>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl shadow">
              🎓
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#031b33]">Your Profile</h2>
              <p className="text-sm text-gray-500">Personal account information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-xs text-gray-400 uppercase">Name</p>
              <p className="font-bold text-gray-900 mt-1">
                {user?.fullName || user?.name || 'Unknown'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Email</p>
              <p className="font-bold text-gray-900 mt-1">
                {user?.email || 'Not available'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Role</p>
              <p className="font-bold text-gray-900 mt-1">
                {user?.role || 'Not available'}
              </p>
            </div>
          </div>
        </div>

        {/* Users Table - Only show for ADMIN */}
        {user?.role === 'ROLE_ADMIN' && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black text-[#031b33]">Registered Users</h2>
                <p className="text-sm text-gray-500">All users saved in the system.</p>
              </div>
              <span className="bg-blue-50 text-[#0052cc] px-4 py-2 rounded-xl text-xs font-bold">
                Total: {users.length}
              </span>
            </div>

            {loading && (
              <div className="text-center py-10 text-sm text-gray-500">
                Loading users...
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            {!loading && users.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-600">
                  <thead>
                    <tr className="border-b text-xs uppercase text-gray-400">
                      <th className="py-3 px-4 text-left">#</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-bold">{index + 1}</td>
                        <td className="py-3 px-4">
                          {item.fullName || item.name || item.email}
                        </td>
                        <td className="py-3 px-4">{item.email || '-'}</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">
                            {item.role?.replace('ROLE_', '') || 'USER'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;