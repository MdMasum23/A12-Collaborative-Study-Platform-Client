import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { CalendarDays, Clock, BadgeCheck } from 'lucide-react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const CreateSession = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // console.log('Session Data:', data);

        const sessionData = {
            ...data,
            tutorName: user?.displayName,
            tutorEmail: user?.email,
            regFee: parseFloat(data.regFee) || 0,
            status: 'pending',
            registrationStart: new Date(data.regStart).toISOString(),
            registrationEnd: new Date(data.regEnd).toISOString(),
            classStart: new Date(data.classStart).toISOString(),
            classEnd: new Date(data.classEnd).toISOString(),
        };
        // console.log(sessionData);

        axiosSecure.post('/sessions', sessionData)
            .then(res => {
                console.log(res.data);

                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Session Created!',
                        text: 'Your study session has been submitted successfully!',
                    });
                    // reset();
                };
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again.',
                });
            })

    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white dark:bg-base-200 rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-primary">🎓 Create New Study Session</h2>
                    <p className="text-gray-500 mt-2">Submit your session for students to join!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Tutor Name */}
                    <div>
                        <label className="label font-semibold">Tutor Name</label>
                        <input
                            type="text"
                            readOnly
                            defaultValue={user?.displayName || ''}
                            {...register('tutorName')}
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Tutor Email */}
                    <div>
                        <label className="label font-semibold">Tutor Email</label>
                        <input
                            type="email"
                            readOnly
                            defaultValue={user?.email || ''}
                            {...register('tutorEmail')}
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Session Title */}
                    <div>
                        <label className="label font-semibold">Session Title</label>
                        <input
                            type="text"
                            placeholder="Enter title"
                            {...register('title', { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.title && <p className="text-red-500 mt-1">Title is required</p>}
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="label font-semibold">Session Duration</label>
                        <input
                            type="text"
                            placeholder="Duration (in months)"
                            {...register('duration', { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.duration && <p className="text-red-500 mt-1">Duration is required</p>}
                    </div>

                    {/* Registration Start Date */}
                    <div>
                        <label className="label font-semibold flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" /> Registration Start Date
                        </label>
                        <input
                            type="date"
                            {...register('regStart', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Registration End Date */}
                    <div>
                        <label className="label font-semibold flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" /> Registration End Date
                        </label>
                        <input
                            type="date"
                            {...register('regEnd', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Class Start Date */}
                    <div>
                        <label className="label font-semibold flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Class Start Date
                        </label>
                        <input
                            type="date"
                            {...register('classStart', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Class End Date */}
                    <div>
                        <label className="label font-semibold flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Class End Date
                        </label>
                        <input
                            type="date"
                            {...register('classEnd', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Registration Fee */}
                    <div>
                        <label className="label font-semibold">Registration Fee</label>
                        <input
                            type="number"
                            readOnly
                            defaultValue={0}
                            {...register('regFee')}
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Hidden Status */}
                    <input type="hidden" value="pending" {...register('status')} />

                    {/* Session Description */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="label font-semibold">Session Description</label>
                        <textarea
                            rows={4}
                            placeholder="Write a detailed description of the session..."
                            {...register('description', { required: true })}
                            className="textarea textarea-bordered w-full"
                        />
                        {errors.description && <p className="text-red-500 mt-1">Description is required</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 text-center mt-4">
                        <button className="btn btn-primary px-8 py-2 text-lg rounded-full">
                            <BadgeCheck className="w-5 h-5 mr-2" /> Create Session
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSession;