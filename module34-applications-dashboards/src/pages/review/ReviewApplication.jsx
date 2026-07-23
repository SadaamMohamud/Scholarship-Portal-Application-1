import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { getApplicationForReview, submitReview } from '../../services/reviewService';

const ReviewApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
 const [comment, setComment] = useState('');
const [score, setScore] = useState(50);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await getApplicationForReview(id);
        setApplication(data);
      } catch (err) {
        setError('Waa la waayey faahfaahinta codsigan.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  try {
    await submitReview({
      applicationId: Number(id),
      score: Number(score),
      comments: comment
    });
    alert('Dib-u-eegistaadu waa la diray!');
    navigate('/reviews');
  } catch (err) {
    alert('Waxaa dhacay khalad markii dib-u-eegista la dirayay.');
  } finally {
    setSubmitting(false);
  }
};

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 max-w-7xl mx-auto font-sans text-gray-700">
      <div className="mb-8">
        <div className="text-xs text-gray-400 font-medium">Home / Reviewer / Dib-u-eeg</div>
        <h1 className="text-3xl font-extrabold text-[#031b33] mt-2">Dib-u-eeg Codsiga</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Sidebar />

        <div className="md:col-span-3 space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center">{error}</div>}

          {application && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-sm text-gray-600 space-y-2">
              <div><span className="text-gray-400">Magaca:</span> <span className="font-semibold text-gray-800">{application.student?.fullName}</span></div>
              <div><span className="text-gray-400">Deeqda:</span> <span className="font-semibold text-gray-800">{application.scholarship?.title}</span></div>
              <div><span className="text-gray-400">Statement:</span> <p className="mt-1">{application.personalStatement || 'Ma jiro.'}</p></div>
              </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4 text-sm font-medium">
           <div>
                <label className="block text-gray-600 mb-1">Dhibcaha (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full border border-gray-200 text-xs rounded-lg p-2.5"
                />
              </div>
            <div>
              <label className="block text-gray-600 mb-1">Faallo</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="4" className="w-full border border-gray-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-[#0052cc]"></textarea>
            </div>
            <button type="submit" disabled={submitting} className="w-full bg-[#0052cc] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition text-xs disabled:bg-blue-400">
              {submitting ? 'Waa la dirayaa...' : 'Dir Dib-u-eegista'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewApplication;
