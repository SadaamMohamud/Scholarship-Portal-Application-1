import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('user')) || {
    id: 1,
    fullName: 'Student'
  };

  useEffect(() => {
    const fetchStudentApplications = async () => {
      try {
        const response = await api.get(`/applications/student/${loggedInUser.id}`);
        setApplications(response.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError('Waa la waayey xogta codsiyadaada. Hubi in Backend-ku shaqaynayo.');
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser?.id) {
      fetchStudentApplications();
    }
  }, [loggedInUser.id]);

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED':
        return 'bg-green-50 text-green-600 border border-green-100';
      case 'REJECTED':
        return 'bg-red-50 text-red-600 border border-red-100';
      case 'PENDING':
      default:
        return 'bg-yellow-50 text-yellow-600 border border-yellow-100';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 font-sans text-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs text-gray-400 font-medium">
            Home / Student Dashboard
          </div>

          <h1 className="text-3xl font-extrabold text-[#031b33] mt-2">
            Welcome Back, {loggedInUser.fullName}
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage your scholarship applications and track your application status.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">
              Total Applications
            </p>

            <h2 className="text-3xl font-black text-[#0052cc] mt-2">
              {applications.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">
              Approved Applications
            </p>

            <h2 className="text-3xl font-black text-green-600 mt-2">
              {
                applications.filter(
                  app => app.status?.toUpperCase() === 'APPROVED'
                ).length
              }
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">
              Pending Review
            </p>

            <h2 className="text-3xl font-black text-yellow-500 mt-2">
              {
                applications.filter(
                  app =>
                    app.status?.toUpperCase() === 'PENDING' ||
                    !app.status
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-extrabold text-[#031b33]">
              My Scholarship Applications
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Track your submitted scholarship applications.
            </p>
          </div>

          {loading && (
            <div className="text-center py-12 text-sm text-gray-400">
              Loading applications...
            </div>
          )}

          {error && (
            <div className="m-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          {!loading && !error && applications.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-400">
              You have not submitted any scholarship applications yet.
            </div>
          )}

          {!loading && applications.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase text-gray-400 border-b border-gray-100">
                    <th className="p-4">Scholarship</th>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-semibold text-gray-800">
                        {app.scholarshipTitle}
                      </td>

                      <td className="p-4 text-gray-500">
                        {app.studentName}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusStyle(app.status)}`}
                        >
                          {app.status || 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;