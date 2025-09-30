import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const CreateNote = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const noteData = {
            email: user?.email,
            title: data.title,
            description: data.description,
            createdAt: new Date(),
        };

        try {
            const res = await axiosSecure.post('/notes', noteData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Note created successfully!',
                    timer: 1800,
                    showConfirmButton: false,
                });
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong.',
            });
        }
    };

    return (
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 text-gray-800">Create a Study Note</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 sm:p-10 shadow-lg rounded-3xl space-y-6 border border-gray-100"
            >
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        readOnly
                        defaultValue={user?.email}
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700 border border-gray-200 cursor-not-allowed"
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                    <input
                        type="text"
                        placeholder="Enter your note title"
                        {...register('title', { required: true })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.title && <p className="text-sm text-red-500 mt-1">Title is required</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <textarea
                        rows={6}
                        placeholder="Write your note..."
                        {...register('description', { required: true })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                    {errors.description && <p className="text-sm text-red-500 mt-1">Description is required</p>}
                </div>

                {/* Submit */}
                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="bg-primary text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition"
                    >
                        Save Note
                    </button>
                </div>
            </form>
        </div>

    );
};

export default CreateNote;
// add CreateNote form component for creating study notes