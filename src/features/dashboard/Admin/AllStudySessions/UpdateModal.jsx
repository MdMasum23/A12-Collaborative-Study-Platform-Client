import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const UpdateModal = ({ session, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedTitle = form.title.value;
    const updatedFee = parseFloat(form.fee.value);

    const updatedData = {
      title: updatedTitle,
      regFee: parseFloat(updatedFee),
    };

    await axiosSecure.patch(`/update-session/${session._id}`, updatedData);
    refetch();
    closeModal();
    Swal.fire('Updated!', 'Session has been updated.', 'success');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[90%] max-w-md"
      >
        <h3 className="text-xl font-bold mb-2">Update Session</h3>

        <input
          type="text"
          name="title"
          defaultValue={session.title}
          className="w-full border p-2 rounded"
          placeholder="Update Title"
        />
        <input
          type="number"
          name="fee"
          defaultValue={session.fee}
          className="w-full border p-2 rounded"
          placeholder="Update Fee"
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;
//Add UpdateModal component for editing sessions