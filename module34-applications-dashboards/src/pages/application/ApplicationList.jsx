import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { getAllApplications, updateApplicationStatus } from '../../services/applicationService';

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

// Bogga Admin-ka ee lagu maamulo dhammaan codsiyada la soo diray
const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllApplications();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Waa la waayey liiska codsiyada. Hubi in Backend-ku shaqaynayo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateApplicationStatus(id, status);
      setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
    } catch (err) {
      alert('Waa la waayey in la cusbooneysiiyo xaaladda codsigan.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 max-w-7xl mx-auto font-sans text-gray-700">
      <div className="mb-8">
        <div className="text-xs text-gray-400 font-medium">Home / Admin / Codsiyada</div>
        <h1 className="text-3xl font-extrabold text-[#031b33] mt-2">Dhammaan Codsiyada</h1>
        <p className="text-sm text-gray-500 mt-1">Maamul oo cusbooneysii xaaladda codsiyada ardayda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Sidebar />

        <div className="md:col-span-3">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center mb-4">{error}</div>}

          {!error && applications.length === 0 ? (
            <div className="bg-white text-center py-16 rounded-xl border border-gray-100 text-sm text-gray-400">
              Weli lama helin wax codsiyo ah.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400 uppercase font-bold tracking-wider border-b border-gray-100">
                      <th className="p-4">Applicant</th>
                      <th className="p-4">Scholarship</th>
                      <th className="p-4">GPA</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium text-gray-600">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50/50 transition">
                        <td className="p-4 font-bold text-gray-800">{app.fullName || app.studentName}</td>
                        <td className="p-4">{app.scholarshipTitle || `#${app.scholarshipId}`}</td>
                        <td className="p-4 text-gray-400">{app.gpa ?? '—'}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${getStatusStyle(app.status)}`}>
                            {app.status || 'PENDING'}
                          </span>
                        </td>
                        <td className="p-4 space-x-2">
                          <button
                            disabled={updatingId === app.id}
                            onClick={() => handleStatusChange(app.id, 'APPROVED')}
                            className="text-[10px] font-bold text-green-600 hover:underline disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            disabled={updatingId === app.id}
                            onClick={() => handleStatusChange(app.id, 'REJECTED')}
                            className="text-[10px] font-bold text-red-500 hover:underline disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
