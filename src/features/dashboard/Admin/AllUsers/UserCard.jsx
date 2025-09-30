import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const UserCard = ({ user, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleRoleUpdate = async (newRole) => {
        const confirm = await Swal.fire({
            title: `Make ${user.name} a ${newRole}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Updated!', `${user.name} is now a ${newRole}.`, 'success');
                    refetch();
                }
            } catch (error) {
                Swal.fire('Error!', 'Something went wrong.', error);
            }
        }
    };

    return (
        <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white space-y-3">
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                        <img src={user.photo} alt={user.name} />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
            </div>
            <p className="capitalize"><strong>Role:</strong> {user.role}</p>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => handleRoleUpdate('admin')}
                    className="btn btn-sm btn-success"
                    disabled={user.role === 'admin'}
                >
                    Make Admin
                </button>
                <button
                    onClick={() => handleRoleUpdate('tutor')}
                    className="btn btn-sm btn-info"
                    disabled={user.role === 'tutor'}
                >
                    Make Tutor
                </button>
            </div>
        </div>
    );
};

export default UserCard;