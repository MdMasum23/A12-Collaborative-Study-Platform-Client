import React from 'react';
import { Link } from 'react-router';

const AvailableSessionCard = ({ session }) => {
    const { _id, title, description, registrationStart, registrationEnd, } = session;

    // --- Status Logic: Determine if it's Ongoing or Closed ---
    const now = new Date();

    const sessionRegStart = new Date(registrationStart);
    const sessionRegEnd = new Date(registrationEnd);

    const isOngoing = sessionRegStart.getTime() <= now.getTime() && now.getTime() <= sessionRegEnd.getTime();
    const statusText = isOngoing ? 'Ongoing' : 'Closed';

    return (
        <div className={`card bg-white rounded-3xl shadow-lg p-5 flex flex-col justify-between border border-gray-200 hover:shadow-2xl transition-all
                        ${isOngoing ? 'border-b-4 border-green-500' : 'border-b-4 border-red-500'}`}
        >
            <div className="card-body p-8 flex flex-col justify-between h-full">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="card-title text-3xl font-bold text-gray-900 leading-snug">
                            {title}
                        </h3>
                        <span className={`badge ${isOngoing ? 'badge-success' : 'badge-error'} text-white px-4 py-2 text-sm font-semibold rounded-full shadow-md`} >
                            {statusText}
                        </span>
                    </div>

                    <p className="text-gray-700 mb-5 text-base line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="card-actions justify-end mt-auto">
                    <Link to={`/session/${_id}`} className="btn btn-primary bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 border-none">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AvailableSessionCard;