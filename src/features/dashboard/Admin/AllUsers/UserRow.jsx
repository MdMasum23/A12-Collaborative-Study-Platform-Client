import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const UserRow = ({ user, index, refetch }) => {
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
        <tr>
            <td>{index + 1}</td>
            <td className="flex items-center gap-3">
                <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                        <img src={user.photo} alt={user.name} />
                    </div>
                </div>
                <span>{user.name}</span>
            </td>
            <td>{user.email}</td>
            <td className="capitalize">{user.role}</td>
            <td>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleRoleUpdate('admin')}
                        className="btn btn-xs btn-success"
                        disabled={user.role === 'admin'}
                    >
                        Make Admin
                    </button>
                    <button
                        onClick={() => handleRoleUpdate('tutor')}
                        className="btn btn-xs btn-info"
                        disabled={user.role === 'tutor'}
                    >
                        Make Tutor
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default UserRow;
// add UserRow component with role update buttons