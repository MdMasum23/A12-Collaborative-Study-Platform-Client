import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';

const UploadMaterials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        axiosSecure.get(`/sessions/tutor/approved/${user?.email}`)
            .then((res) => {
                setSessions(res.data);
            });
    }, [axiosSecure, user?.email]);

    const handleSelectSession = (session) => {
        setSelectedSession(session);
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
        try {
            const res = await axios.post(imageUploadUrl, formData);
            // console.log(res.data);
            const url = res.data?.data?.url;
            if (url) {
                setImageUrl(url);
                console.log('Image uploaded to ImgBB:', url);
            }
        } catch (err) {
            console.error('Image upload failed:', err);
        }
    };


    const onSubmit = async (data) => {
        const materialData = {
            title: data.title,
            image: imageUrl,
            driveLink: data.driveLink,
            sessionId: selectedSession._id,
            tutorEmail: user?.email,
        };

        try {
            const res = await axiosSecure.post('/materials', materialData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Study material uploaded successfully!',
                });
                setSelectedSession(null);
                setImageUrl('');
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Upload failed!',
                text: 'Something went wrong while saving the material.',
            });
        }
    };


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Upload Study Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {sessions.map((session) => (
                    <div
                        key={session._id}
                        onClick={() => handleSelectSession(session)}
                        className={`cursor-pointer border rounded-xl p-4 shadow hover:shadow-lg transition-all ${selectedSession?._id === session._id ? 'bg-blue-100 border-blue-400' : 'bg-white'
                            }`}
                    >
                        <h3 className="text-lg font-semibold mb-1">{session.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">
                            Tutor: <span className="font-medium">{session.tutorName}</span>
                        </p>
                        {selectedSession?._id === session._id && (
                            <p className="text-sm text-gray-600">
                                Class Time: {session.classStartTime} - {session.classEndTime}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {selectedSession && (
                <div className="max-w-xl mx-auto border rounded-xl p-6 bg-white shadow">
                    <h3 className="text-xl font-semibold mb-4 text-center">Upload Materials for "{selectedSession.title}"</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="font-medium">Title</label>
                            <input
                                type="text"
                                {...register('title', { required: true })}
                                placeholder="Enter title"
                                className="input input-bordered w-full"
                            />
                            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                        </div>

                        <div>
                            <label className="font-medium">Study Session ID</label>
                            <input
                                type="text"
                                value={selectedSession._id}
                                readOnly
                                className="input input-bordered w-full bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Tutor Email</label>
                            <input
                                type="email"
                                value={user?.email}
                                readOnly
                                className="input input-bordered w-full bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Upload Image (Thumbnail)</label>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                            />
                            {!imageUrl && <p className="text-red-500 text-sm">Image is required</p>}
                        </div>

                        <div>
                            <label className="font-medium">Google Drive Link</label>
                            <input
                                type="text"
                                {...register('driveLink', { required: true })}
                                placeholder="Enter Google Drive link"
                                className="input input-bordered w-full"
                            />
                            {errors.driveLink && <p className="text-red-500 text-sm">Drive link is required</p>}
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Upload Material
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UploadMaterials;
//add UploadMaterials component with session selection and image upload