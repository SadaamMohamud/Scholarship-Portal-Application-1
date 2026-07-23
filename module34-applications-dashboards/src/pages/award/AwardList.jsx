import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { getAllAwards, getMyAwards } from '../../services/awardService';

const AwardList = () => {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === 'ADMIN';

  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const data = isAdmin
          ? await getAllAwards()
          : await getMyAwards(user?.id);

        setAwards(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);

        setError(
          'Waa la waayey xogta abaalmarinta. Hubi in Backend-ku shaqaynayo.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, [isAdmin, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 font-sans text-gray-700">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="text-xs text-gray-400 font-medium">
            Home / Awards
          </div>

          <h1 className="text-3xl font-extrabold text-[#031b33] mt-2">
            Scholarship Awards
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            View successful scholarship awards and funded students.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">
              Total Awards
            </p>

            <h2 className="text-3xl font-black text-[#0052cc] mt-2">
              {awards.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">
              Status
            </p>

            <h2 className="text-3xl font-black text-green-600 mt-2">
              Completed
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">
              User Type
            </p>

            <h2 className="text-3xl font-black text-purple-600 mt-2">
              {isAdmin ? 'Admin' : 'Student'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <Sidebar />

          {/* Awards Section */}
          <div className="lg:col-span-3">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center mb-6">
                {error}
              </div>
            )}

            {!error && awards.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16">
                <h3 className="text-lg font-bold text-gray-700">
                  No Awards Found
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Weli lama helin wax abaalmarin ah.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-blue-50 text-[#0052cc] text-xs font-bold px-3 py-1 rounded-lg">
                        Award
                      </span>

                      <span className="text-xs text-gray-400">
                        #{award.id}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg">
                      {award.studentName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {award.scholarshipTitle}
                    </p>

                    <div className="mt-5 flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        Amount
                      </span>

                      <span className="text-sm font-bold text-green-600">
                        {award.amount ? `$${award.amount}` : 'Full Funded'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AwardList;