import React from 'react';
import { FaEnvelope, FaUserGraduate } from 'react-icons/fa';

const TutorCard = ({ tutor }) => {
    const { tutorName, tutorEmail, sessionCount } = tutor;

    return (
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                    {tutorName[0]}
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{tutorName}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                        <FaEnvelope /> {tutorEmail}
                    </p>
                </div>
            </div>
            <div className="mt-4 text-gray-700 text-sm flex items-center gap-2">
                <FaUserGraduate className="text-indigo-500" />
                Total Sessions: <span className="font-bold">{sessionCount}</span>
            </div>
        </div>
    );
};

export default TutorCard;