import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { FaUser, FaEnvelope, FaLock, FaImage, FaUserGraduate } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then( async (res) => {
                const user = res.user;

                const userInfo = {
                    name: data.name,
                    email: data.email,
                    photo: data.photo,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                };

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);

                return updateProfile(user, {
                    displayName: data.name,
                    photoURL: data.photo || 'https://i.ibb.co/2d0b4cJ/default-avatar.png',
                });
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Welcome to CollabStudy',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaUser className="inline mr-2" /> Name
                        </label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            placeholder="Your full name"
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaEnvelope className="inline mr-2" /> Email
                        </label>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: 'Enter a valid email',
                                },
                            })}
                            type="email"
                            placeholder="example@mail.com"
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaImage className="inline mr-2" /> Photo URL
                        </label>
                        <input
                            {...register('photo', { required: 'Photo URL is required' })}
                            type="text"
                            placeholder="https://yourphoto.com/image.jpg"
                            className="input input-bordered w-full"
                        />
                        {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaLock className="inline mr-2" /> Password
                        </label>
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                    message:
                                        'Password must be at least 6 characters with at least one uppercase & lowercase',
                                },
                            })}
                            type="password"
                            placeholder="Enter a strong password"
                            className="input input-bordered w-full"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="divider my-4">or</div>

                {/* Google Login */}
                <SocialLogin></SocialLogin>

                {/* Already have an account? */}
                <p className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
//Add Register component with email/password, photo URL, and Google signup