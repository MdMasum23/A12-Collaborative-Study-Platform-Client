import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();

    const from = location.state || '/';

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;
                console.log(user);

                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                };

                const res = await axiosInstance.post('/users', userInfo);
                console.log('user update info', res.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: `Welcome back, ${result.user.displayName || 'User'}`,
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
        <div>
            {/* Google */}
            <button onClick={handleGoogleSignIn} className="btn btn-outline w-full flex items-center justify-center gap-2">
                <FcGoogle size={20} />
                Login with Google
            </button>
            {/* <ToastContainer position="top-right" autoClose={3000} /> */}
        </div>
    );
};

export default SocialLogin;