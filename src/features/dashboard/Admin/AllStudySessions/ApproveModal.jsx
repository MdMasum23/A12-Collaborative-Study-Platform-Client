import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ApproveModal = ({ session, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isPaid, setIsPaid] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleApprove = async () => {
    const updateData = {
      status: 'approved',
      isPaid,
      regFee: isPaid ? Number(amount) : 0
    };

    await axiosSecure.patch(`/approve-session/${session._id}`, updateData);
    Swal.fire('Approved!', 'Session has been approved.', 'success');
    closeModal();
    refetch();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Approve Session</h2>
        <label className="block mb-2">Is this session Paid?</label>
        <select
          className="w-full border p-2 rounded mb-4"
          value={isPaid ? 'paid' : 'free'}
          onChange={(e) => setIsPaid(e.target.value === 'paid')}
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        {isPaid && (
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full border p-2 rounded mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        )}

        <div className="flex justify-end gap-3">
          <button onClick={closeModal}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button onClick={handleApprove}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;