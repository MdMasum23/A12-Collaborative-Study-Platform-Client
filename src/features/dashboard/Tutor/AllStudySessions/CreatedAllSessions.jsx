import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const CreatedAllSessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: sessions = [], isLoading, refetch } = useQuery({
    queryKey: ['tutorSessions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/tutor/${user.email}`);
      return res.data;
    }
  });

  const approved = sessions.filter(s => s.status === 'approved');
  const pending = sessions.filter(s => s.status === 'pending');
  const rejected = sessions.filter(s => s.status === 'rejected');

  const handleRequestApproval = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to send this session for approval again?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'Cancel',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/sessions/request/${id}`, {
          status: 'pending_again'
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire('Sent!', 'Your approval request has been sent.', 'success');
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 md:p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Your Created Sessions</h2>

      {/* Approved Sessions */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-green-700">Approved Sessions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approved.map(session => (
            <div key={session._id} className="border p-4 rounded-lg shadow bg-white">
              <h3 className="text-lg font-semibold">{session.title}</h3>
              <p className="text-gray-600">Status: <span className="text-green-600">{session.status}</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Sessions */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-yellow-700">Pending Sessions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pending.map(session => (
            <div key={session._id} className="border p-4 rounded-lg shadow bg-white">
              <h3 className="text-lg font-semibold">{session.title}</h3>
              <p className="text-gray-600">Status: <span className="text-yellow-600">{session.status}</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* Rejected Sessions */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-red-700">Rejected Sessions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rejected.map(session => (
            <div key={session._id} className="border p-4 rounded-lg shadow bg-white">
              <h3 className="text-lg font-semibold">{session.title}</h3>
              <p className="text-gray-600">Status: <span className="text-red-600">{session.status}</span></p>
              <button
                onClick={() => handleRequestApproval(session._id)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Request Approval Again
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatedAllSessions;
//add CreatedAllSessions component to display tutor sessions with re-approval option