import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaDownload, FaBookOpen } from 'react-icons/fa';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllStudyMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const { data: bookedSessions = [], isLoading } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/student?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: materials = [] } = useQuery({
    queryKey: ['materials', selectedSessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials/${selectedSessionId}`);
      return res.data;
    },
    enabled: !!selectedSessionId,
  });

  if (isLoading) return <div className="text-center py-10">Loading your booked sessions...</div>;

  return (
    <div className="px-4 md:px-8 py-8">
      {/* SECTION 1: Booked Sessions */}
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">📚 Your Booked Sessions</h2>

      {bookedSessions.length === 0 ? (
        <p className="text-center text-gray-500">You haven't booked any sessions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {bookedSessions.map((session) => (
            <div key={session._id} className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-blue-600">{session.title}</h3>
              <p><span className="font-semibold">Tutor:</span> {session.tutorName}</p>
              <p><span className="font-semibold">Duration:</span> {session.duration}</p>
              <p><span className="font-semibold">Status:</span> {session.status}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Class:</strong> {new Date(session.classStart).toLocaleDateString()} - {new Date(session.classEnd).toLocaleDateString()}
              </p>
              <button
                onClick={() => setSelectedSessionId(session.sessionId)}
                className="mt-4 w-full btn btn-outline btn-info btn-sm"
              >
                <FaBookOpen className="mr-2" /> View Materials
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: Study Materials */}
      {selectedSessionId && (
        <>
          <h3 className="text-2xl font-bold text-center mb-4 text-secondary">
            📂 Study Materials for Selected Session
          </h3>

          {materials.length === 0 ? (
            <p className="text-center text-gray-500">No materials uploaded for this session yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div key={material._id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                  <img
                    src={material.image}
                    alt={material.title}
                    className="rounded-xl w-full h-48 object-cover mb-3 border"
                  />
                  <h4 className="font-bold text-lg mb-1">{material.title}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <a
                      href={material.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      📎 View Google Drive
                    </a>
                    <a
                      href={material.image}
                      download={`Material-${material._id}.jpg`}
                      className="btn btn-sm btn-success flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaDownload /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllStudyMaterials;