import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import UpdateMaterialModal from './UpdateMaterialModal';

const UploadAllMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const { data: materials = [], refetch } = useQuery({
        queryKey: ['materials', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials/tutor/${user?.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const SwalResult = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this material!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (SwalResult.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/materials/${id}`);
                if (res.data?.deletedCount > 0) {
                    Swal.fire('Deleted!', 'The material has been successfully deleted.', 'success');
                    refetch();
                } else {
                    Swal.fire('Failed', 'Material could not be deleted. Try again later.', 'error');
                }
            } catch (error) {
                console.error('Delete error:', error);
                Swal.fire('Error', 'An error occurred while deleting the material.', 'error');
            }
        }
    };

    return (
        <div className="p-5 max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-center">Your Uploaded Materials</h2>

            {materials.length === 0 ? (
                <p className="text-center text-gray-500">No materials found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {materials.map((item) => (
                        <div key={item._id} className="rounded-2xl shadow-md border p-4 bg-white">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded-xl mb-3"
                            />
                            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm mb-2 text-gray-600">
                                <a
                                    href={item.driveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    View Drive Material
                                </a>
                            </p>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setSelectedMaterial(item)} // ✅ FIXED
                                    className="btn btn-sm btn-accent"
                                >
                                    <FaEdit className="mr-1" /> Update
                                </button>

                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                                >
                                    <FaTrash className="mr-1" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ✅ Show Modal OUTSIDE of map */}
            {selectedMaterial && (
                <UpdateMaterialModal
                    material={selectedMaterial}
                    closeModal={() => setSelectedMaterial(null)}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default UploadAllMaterials;
// add UploadAllMaterials component with update and delete functionality