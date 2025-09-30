import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SessionRow from './SessionRow';
import ApproveModal from './ApproveModal';
import UpdateModal from './UpdateModal';

const AllStudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedSession, setSelectedSession] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const { data: sessions = [], refetch } = useQuery({
    queryKey: ['all-sessions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/sessions');
      return res.data;
    },
  });

  const pending = sessions.filter((s) => s.status === 'pending');
  const approved = sessions.filter((s) => s.status === 'approved');

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold">All Study Sessions</h2>

      {/* Pending Sessions */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Pending Sessions</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pending.map((session) => (
            <SessionRow
              key={session._id}
              session={session}
              type="pending"
              setSelectedSession={setSelectedSession}
              setModalOpen={setModalOpen}
              refetch={refetch}
            />
          ))}
        </div>
      </div>

      {/* Approved Sessions */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Approved Sessions</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approved.map((session) => (
            <SessionRow
              key={session._id}
              session={session}
              type="approved"
              setSelectedSession={setSelectedSession}
              setModalOpen={setUpdateModalOpen}
              refetch={refetch}
            />
          ))}
        </div>
      </div>

      {/* Approve Modal */}
      {modalOpen && selectedSession && (
        <ApproveModal
          session={selectedSession}
          closeModal={() => setModalOpen(false)}
          refetch={refetch}
        />
      )}

      {/* Update Modal */}
      {updateModalOpen && selectedSession && (
        <UpdateModal
          session={selectedSession}
          closeModal={() => setUpdateModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AllStudySessions;