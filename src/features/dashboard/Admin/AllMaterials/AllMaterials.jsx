import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllMaterials = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all materials (admin can see all)
    const { data: materials = [], refetch, isLoading, isError } = useQuery({
        queryKey: ['allMaterials'],
        queryFn: async () => {
            const res = await axiosSecure.get('/materials/all'); // backend route for admin
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete this material?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/materials/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Material removed successfully.', 'success');
                    refetch();
                } else {
                    Swal.fire('Error', 'Failed to delete material.', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'Server error deleting material.', error);
            }
        }
    };

    if (isLoading) return <div className="text-center mt-20">Loading materials...</div>;
    if (isError) return <div className="text-center mt-20 text-red-600">Failed to load materials.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">All Materials (Admin Panel)</h1>

            {materials.length === 0 ? (
                <p className="text-center text-gray-500">No materials found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {materials.map((material) => (
                        <div
                            key={material._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                        >
                            <img
                                src={material.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                                alt={material.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="font-semibold text-lg mb-2">{material.title}</h2>
                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-semibold">Tutor:</span> {material.tutorEmail}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-semibold">Added:</span>{' '}
                                    {new Date(material.createdAt).toLocaleDateString()}
                                </p>
                                <a
                                    href={material.driveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline mb-4"
                                >
                                    View Drive Material
                                </a>

                                <button
                                    onClick={() => handleDelete(material._id)}
                                    className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center gap-2"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllMaterials;

//Add AllMaterials admin component with fetch, display, and delete functionality