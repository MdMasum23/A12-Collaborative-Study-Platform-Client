import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageNotes = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [editingNote, setEditingNote] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const { data: notes = [], refetch } = useQuery({
    queryKey: ['notes', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/notes/${id}`);
    if (res.data.deletedCount > 0) {
      Swal.fire('Deleted!', 'Your note has been deleted.', 'success');
      refetch();
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedNote = {
      title: updatedTitle,
      description: updatedDescription,
    };
    const res = await axiosSecure.patch(`/notes/${editingNote._id}`, updatedNote);
    if (res.data.modifiedCount > 0) {
      Swal.fire('Updated!', 'Note has been updated.', 'success');
      refetch();
      setEditingNote(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Your Notes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <div key={note._id} className="bg-white shadow-lg rounded-xl p-6 space-y-4 border">
            <div>
              <h3 className="text-xl font-bold">{note.title}</h3>
              <p className="text-gray-600">{note.description}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => {
                setEditingNote(note);
                setUpdatedTitle(note.title);
                setUpdatedDescription(note.description);
              }}
                className="text-blue-600 hover:text-blue-800"><FaEdit /></button>

              <button onClick={() => handleDelete(note._id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
            </div>
          </div>
        ))}

      </div>
      
      {
        notes.length === 0 && <>
          <p className="text-center mt-40 text-gray-500 text-lg">You haven't create any sessions yet.</p>

        </>
      }

      {/* Update Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-center">Update Note</h3>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="Title"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <textarea
              rows="4"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              placeholder="Description"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setEditingNote(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageNotes;
//add ManageNotes component with edit and delete functionality