import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getMyApplications } from '../../services/applicationService';

const getStatusStyle = (status) => {
  switch (status?.toUpperCase()) {
    case 'AWARDED':
      return 'bg-green-50 text-green-600 border border-green-100';
    case 'REJECTED':
      return 'bg-red-50 text-red-600 border border-red-100';
    case 'UNDER_REVIEW':
      return 'bg-yellow-50 text-yellow-600 border border-yellow-100';
    case 'SUBMITTED':
    default:
      return 'bg-blue-50 text-blue-600 border border-blue-100';
  }
};

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fixed - no need to pass user.id, backend gets it from JWT token
        const data = await getMyApplications();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Waa la waayey codsiyadaada. Hubi in Backend-ku shaqaynayo.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 max-w-7xl mx-auto font-sans text-gray-700">
      <div className="mb-8">
        <div className="text-xs text-gray-400 font-medium">Home / Codsiyadayda</div>
        <h1 className="text-3xl font-extrabold text-[#031b33] mt-2">Codsiyadayda</h1>
        <p className="text-sm text-gray-500 mt-1">Halkan ka la soco xaaladda codsiyadaada deeqaha waxbarasho.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center mb-4">
          {error}
        </div>
      )}

      {!error && applications.length === 0 ? (
        <div className="bg-white text-center py-16 rounded-xl border border-gray-100 text-sm text-gray-400">
          Weli ma jirto wax deeq waxbarasho ah oo aad codsatay.
          <div className="mt-4">
            <Link
              to="/scholarships"
              className="text-[#0052cc] font-semibold hover:underline text-xs"
            >
              Baadh Deeqaha Waxbarasho →
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-400 uppercase font-bold tracking-wider border-b border-gray-100">
                  <th className="p-4">#</th>
                  <th className="p-4">Scholarship</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium text-gray-600">
                {applications.map((app, index) => (
                  <tr key={app.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-bold">{index + 1}</td>
                    <td className="p-4 font-bold text-gray-800">
                      {app.scholarship?.title || `Scholarship #${app.scholarshipId}`}
                    </td>
                    <td className="p-4 text-gray-400">
                      {app.scholarship?.category || '-'}
                    </td>
                    <td className="p-4 text-gray-400">
                      {app.submittedAt
                        ? new Date(app.submittedAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${getStatusStyle(app.status)}`}>
                        {app.status || 'SUBMITTED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;