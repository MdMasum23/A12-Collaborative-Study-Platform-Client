import React from 'react';
import { CalendarDays, Clock, Info } from 'lucide-react';
import { Link } from 'react-router';

const StudySessionCard = ({ session }) => {
    const { _id, title, description, registrationStart,
        registrationEnd, duration, classStart, classEnd, regFee
    } = session;

    const now = new Date();
    const regStart = new Date(registrationStart);
    const regEnd = new Date(registrationEnd);

    const status = now >= regStart && now <= regEnd ? 'Ongoing' : 'Closed';

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-3">{description.slice(0, 100)}...</p>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-center gap-2"><CalendarDays size={18} /> Class: {new Date(classStart).toLocaleDateString()} - {new Date(classEnd).toLocaleDateString()}</p>
                <p className="flex items-center gap-2"><Clock size={18} /> Duration: {duration}</p>
                <p className="flex items-center gap-2">
                    <span className={`font-bold ${status === 'Ongoing' ? 'text-green-600' : 'text-red-600'}`}>
                        {status}
                    </span>
                </p>
                <p className="font-medium text-gray-700">Fee: ${regFee || 0}</p>
            </div>

            <Link to={`/session/${_id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                <Info size={16} className="mr-2" />
                Read More
            </Link>
        </div>
    );
};

export default StudySessionCard;
//studysessioncard