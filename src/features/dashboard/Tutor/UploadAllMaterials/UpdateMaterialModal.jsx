import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const UpdateMaterialModal = ({ material, closeModal, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const [title, setTitle] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const [_image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (material) {
            setTitle(material.title || '');
            setDriveLink(material.driveLink || '');
            setImage(null);
            setPreview(material.image || null);
        }
    }, [material]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpdate = async () => {
        if (!title || !driveLink) {
            return Swal.fire('Error', 'Please fill all fields.', 'error');
        }

        const payload = {
            title,
            driveLink,
            image: preview,
        };

        try {
            const res = await axiosSecure.put(`/materials/${material._id}`, payload); // ✅ No FormData

            if (res.data.modifiedCount > 0) {
                Swal.fire('Updated!', 'Material updated successfully.', 'success');
                refetch();
                closeModal();
            } else {
                Swal.fire('No Change', 'No fields were changed.', 'info');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to update material.', 'error');
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-200">
            <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-lg space-y-4 relative">
                <h2 className="text-lg font-bold text-gray-800">Update Material</h2>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Material Title"
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="Google Drive Link"
                    className="input input-bordered w-full"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered w-full"
                />

                {preview && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">Image Preview:</p>
                        <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded" />
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={closeModal}
                        className="btn btn-outline btn-error"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="btn btn-primary"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateMaterialModal;
//add UpdateMaterialModal for editing study materials