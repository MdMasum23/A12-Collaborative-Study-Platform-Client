import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state || '/';

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: `Welcome back, ${res.user.displayName || 'User'}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    navigate(from);
                }, 1500);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
                console.error(error);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaLock className="inline mr-2" /> Password
                        </label>
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}

                        {/* Forgot Password */}
                        <div className="text-right mt-1">
                            <Link
                                to="/auth/forgot-password"
                                className="text-sm text-blue-600 hover:underline font-medium"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="divider my-4">or</div>

                {/* Google Login */}
                <SocialLogin></SocialLogin>

                {/* Don't have an account? */}
                <p className="text-center mt-4 text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <Link to="/auth/register" className="text-blue-600 font-semibold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
//Add Login component with email/password and Google authentication