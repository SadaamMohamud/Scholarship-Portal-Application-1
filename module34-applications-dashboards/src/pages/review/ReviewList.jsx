import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { getApplicationsForReview } from '../../services/reviewService';

const ReviewList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getApplicationsForReview();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Waa la waayey liiska codsiyada la dib-u-eegayo.');
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 max-w-7xl mx-auto font-sans text-gray-700">
      <div className="mb-8">
        <div className="text-xs text-gray-400 font-medium">Home / Reviewer / Codsiyada</div>
        <h1 className="text-3xl font-extrabold text-[#031b33] mt-2">Codsiyada Sugaya Dib-u-eegis</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Sidebar />

        <div className="md:col-span-3">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center mb-4">{error}</div>}

          {!error && applications.length === 0 ? (
            <div className="bg-white text-center py-16 rounded-xl border border-gray-100 text-sm text-gray-400">
              Ma jiraan wax codsiyo ah oo sugaya dib-u-eegis hadda.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              {applications.map((app) => (
                <div key={app.id} className="p-4 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-gray-800">{app.student?.fullName}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{app.scholarship?.title}</div>
                  </div>
                  <Link to={`/reviews/${app.id}`} className="text-xs font-bold text-[#0052cc] hover:underline">
                    Dib u Eeg &rarr;
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
