import React from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const SessionRow = ({ session, type, setSelectedSession, setModalOpen, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleReject = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to reject this session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/reject-session/${session._id}`);
      refetch();
      Swal.fire('Rejected!', 'Session has been rejected.', 'success');
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this approved session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/delete-session/${session._id}`);
      refetch();
      Swal.fire('Deleted!', 'Session has been deleted.', 'success');
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow-md bg-white">
      <h4 className="text-lg font-semibold mb-2">{session.title}</h4>
      <p className="text-sm mb-1"><span className="font-medium">Tutor:</span> {session.tutorName}</p>
      <p className="text-sm mb-3 text-gray-500">{session.description.slice(0, 80)}...</p>

      {type === 'pending' && (
        <div className="flex gap-3">
          <button
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {
              setSelectedSession(session);
              setModalOpen(true);
            }}
          >
            <FaCheck className="inline mr-1" /> Approve
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleReject}
          >
            <FaTimes className="inline mr-1" /> Reject
          </button>
        </div>
      )}

      {type === 'approved' && (
        <div className="flex gap-3">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              setSelectedSession(session);
              setModalOpen(true);
            }}
          >
            <FaEdit className="inline mr-1" /> Update
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            <FaTrash className="inline mr-1" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionRow;