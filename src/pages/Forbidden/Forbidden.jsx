import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
      <p className="text-gray-600 text-lg mb-6">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
//forbidden