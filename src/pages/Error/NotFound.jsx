import Lottie from 'lottie-react';
import React from 'react';
import animation from '../../assets/Animations/error-404-animation.json'
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-[#f0f8ff]">
            <div className="w-full max-w-sm">
                <Lottie animationData={animation} loop={true} />
            </div>

            <div className="text-center pb-20">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                    Oops! Page Not Found
                </h1>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Sorry, the page you are looking for doesn’t exist or might have been moved.
                </p>
                <Link to="/"
                    className="bg-primary text-white px-6 py-2 rounded-xl shadow hover:bg-primary/90 transition-all duration-300"
                >
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
//notfound