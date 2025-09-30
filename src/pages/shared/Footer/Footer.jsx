import React from 'react';
import { Link } from 'react-router';
import CollabStudyLogo from '../CollabStudyLogo/CollabStudyLogo';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content px-4 py-10">
            <div className="footer max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Info */}
                <div>
                    {/* <Link to="/" className="text-2xl font-bold text-primary">CollabStudy</Link> */}
                    <CollabStudyLogo></CollabStudyLogo>
                    <p className="mt-2 text-sm">
                        A collaborative platform for students and tutors to schedule sessions and share resources.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <span className="footer-title">Quick Links</span>
                    <Link to="/" className="link link-hover">Home</Link>
                    <Link to="/study-sessions" className="link link-hover">Study Sessions</Link>
                    <Link to="/tutors" className="link link-hover">Tutors</Link>
                    <Link to="/auth/login" className="link link-hover">Login</Link>
                </div>

                {/* Contact or Socials */}
                <div>
                    <span className="footer-title">Contact</span>
                    <p>Email: support@collabstudy.com</p>
                    <p>Phone: +880 1234-567890</p>
                    <div className="flex gap-4 mt-2">
                        <a href="#">
                            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="w-6 h-6" alt="Facebook" />
                        </a>
                        <a href="#">
                            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" className="w-6 h-6" alt="Twitter" />
                        </a>
                        <a href="#">
                            <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" className="w-6 h-6" alt="Instagram" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider line and copyright */}
            <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm">
                © 2025 CollabStudy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
//footer