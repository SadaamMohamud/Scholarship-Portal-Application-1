import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { uploadDocument } from '../../services/documentService';
import { DOCUMENT_TYPES } from '../../utils/constants';

const UploadDocument = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState(DOCUMENT_TYPES.TRANSCRIPT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!file) {
      setError('Fadlan dooro faylka aad rabto inaad soo gelisid.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', docType);
      formData.append('studentId', user?.id);

      await uploadDocument(formData);
      setSuccess('Dukumeentigu si guul leh ayaa loo soo geliyay!');
      setTimeout(() => navigate('/documents'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Waxaa dhacay khalad markii dukumeentiga la soo gelinayay.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 max-w-7xl mx-auto font-sans text-gray-700">
      <div className="mb-8">
        <div className="text-xs text-gray-400 font-medium">Home / Dukumeenti / Soo Geli</div>
        <h1 className="text-3xl font-extrabold text-[#031b33] mt-2">Soo Geli Dukumeenti</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Sidebar />

        <div className="md:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
          {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-4 font-medium">{error}</div>}
          {success && <div className="bg-green-50 text-green-600 text-xs p-3 rounded-lg mb-4 font-medium">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm font-medium">
            <div>
              <label className="block text-gray-600 mb-1">Nooca Dukumeentiga</label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full border border-gray-200 text-xs rounded-lg p-2.5 bg-white">
                {Object.values(DOCUMENT_TYPES).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Faylka *</label>
              <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full border border-gray-200 text-xs rounded-lg p-2.5" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0052cc] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition mt-2 text-xs disabled:bg-blue-400">
              {loading ? 'Waa la soo gelinayaa...' : 'Soo Geli'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
