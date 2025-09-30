import React from 'react';
import Navbar from '../pages/shared/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';
import Lottie from 'lottie-react';
import animation from '../assets/Animations/form-animation.json'

const AuthLayout = () => {
    return (
        <div className="flex flex-col bg-[#f0f8ff]">
            <header>
                <Navbar />
            </header>

            <main className="min-h-[calc(100vh-80px)] flex-1 flex items-center justify-center px-4 py-8">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full max-w-6xl mx-auto h-full">
                    {/* Form Section */}
                    <div className="w-full lg:flex-1 flex items-center justify-center h-full">
                        <div className="w-full max-w-md">
                            <Outlet />
                        </div>
                    </div>

                    {/* Animation Section (Hidden on small screens) */}
                    <div className="hidden lg:flex lg:flex-1 items-center justify-center h-full">
                        <div className="w-full max-w-md">
                            <Lottie animationData={animation} loop={true} />
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default AuthLayout;