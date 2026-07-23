import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 font-sans text-gray-700">
      <div className="text-center">
        <div className="text-7xl font-black text-[#0052cc] mb-2">404</div>
        <h1 className="text-2xl font-extrabold text-[#031b33] mb-2">Boggan lama helin</h1>
        <p className="text-sm text-gray-500 mb-6">Waxaad u muuqataa inaad booqatay bog aan jirin ama la beddelay.</p>
        <Link to="/" className="inline-block bg-[#0052cc] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
          Ku noqo Bogga Hore
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
