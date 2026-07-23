import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import { getMyDocuments, deleteDocument } from '../../services/documentService';

const DocumentList = () => {
  const { user } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDocuments = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getMyDocuments(user.id);
      setDocuments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Waa la waayey dukumeentiyadaada. Hubi in Backend-ku shaqaynayo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Ma hubtaa inaad tirtirto dukumeentigan?')) return;
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      alert('Waa la waayey tirtiridda dukumeentiga.');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 max-w-7xl mx-auto font-sans text-gray-700">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-400 font-medium">Home / Dukumeenti</div>
          <h1 className="text-3xl font-extrabold text-[#031b33] mt-2">Dukumeentiyadayda</h1>
        </div>
        <Link to="/documents/upload" className="bg-[#0052cc] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
          + Soo Geli Dukumeenti
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Sidebar />

        <div className="md:col-span-3">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center mb-4">{error}</div>}

          {!error && documents.length === 0 ? (
            <div className="bg-white text-center py-16 rounded-xl border border-gray-100 text-sm text-gray-400">
              Weli ma soo gelin wax dukumeenti ah.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-gray-800">{doc.fileName || doc.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{doc.type || 'OTHER'}</div>
                  </div>
                  <button onClick={() => handleDelete(doc.id)} className="text-xs font-bold text-red-500 hover:underline">
                    Tirtir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
