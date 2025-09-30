import React from 'react';
import { Link } from 'react-router';

const BookedSessionsCard = ({ booking }) => {
  const session = booking.session;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition">
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-primary">{session?.title || "No Title"}</h3>
        <p><span className="font-medium">Tutor:</span> {session?.tutorName}</p>
        <p><span className="font-medium">Duration:</span> {session?.duration}</p>
        <p><span className="font-medium">Status:</span> {session?.status}</p>
        <p className="text-sm text-gray-500">{session?.description?.slice(0, 80)}...</p>

        <Link to={`/session/${booking.sessionId}`}
          className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookedSessionsCard;