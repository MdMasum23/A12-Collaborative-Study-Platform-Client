import React from 'react';
import { FaBars, FaHome, FaGlobe, FaSignOutAlt, FaBookOpen, FaPlusSquare, FaEdit, FaFileAlt } from 'react-icons/fa';
import { Outlet, Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import CollabStudyLogo from '../pages/shared/CollabStudyLogo/CollabStudyLogo';
import useUserRole from '../hooks/useUserRole';


const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const { role, roleLading } = useUserRole();
    
    if (roleLading) {
        return <div className="text-center py-20">Loading dashboard...</div>;
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main Content Area (Pages at the Right) */}
            <div className="drawer-content flex flex-col items-center p-6">
                {/* Top-left Menu */}
                <div className="w-full mb-6 lg:hidden flex justify-start">
                    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button p-2">
                        <FaBars className="text-2xl" />
                    </label>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Your Dashboard!</h1>

                {/* Nested route content */}
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-full min-h-[93vh] flex flex-col">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar (Left) */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col">

                    {/* Logo (Placeholder) */}
                    <div className="flex items-center justify-center p-3">
                        <Link to="/">
                            <CollabStudyLogo></CollabStudyLogo>
                        </Link>
                    </div>

                    {/* User Info */}
                    {user && (
                        <div className="flex flex-col items-center mb-6 p-4 border-b border-base-300">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL} alt={`${user.displayName}'s avatar`} />
                                </div>
                            </div>
                            <span className="mt-3 text-lg font-semibold text-gray-900">{user.displayName}</span>
                            <span className="text-sm text-gray-600">{user.email}</span>
                            <span className="badge badge-primary badge-outline mt-1">{user.role}</span>
                        </div>
                    )}

                    {/* Public Interfaces */}
                    <li className="menu-title text-xl font-semibold mb-2">General</li>
                    <li>
                        <Link to="/" className="text-lg py-3">
                            <FaHome className="text-xl" />
                            Home
                        </Link>
                    </li>


                    {/* Student Dashboard Navigation */}
                    {role === 'user' && (
                        <>
                            <li className="menu-title text-xl font-semibold mt-4 mb-2">Student Dashboard</li>
                            <li>
                                <Link to="/dashboard/booked-sessions" className="text-lg py-3">
                                    <FaBookOpen className="text-xl" />
                                    View Booked Sessions
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/create-note" className="text-lg py-3">
                                    <FaPlusSquare className="text-xl" />
                                    Create Note
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manage-notes" className="text-lg py-3">
                                    <FaEdit className="text-xl" />
                                    Manage Personal Notes
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/study-materials" className="text-lg py-3">
                                    <FaFileAlt className="text-xl" />
                                    View Study Materials
                                </Link>
                            </li>
                        </>
                    )}


                    {/* Tutor Dashboard Navigation */}
                    {role === 'tutor' && (
                        <>
                            <li className="menu-title text-xl font-semibold mt-4 mb-2">Tutor Dashboard</li>
                            <li>
                                <Link to="/dashboard/create-session" className="text-lg py-3">
                                    <FaPlusSquare className="text-xl" />
                                    Create Session Tutor
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/created-all-sessions" className="text-lg py-3">
                                    <FaPlusSquare className="text-xl" />
                                    Created All Sessions Tutor
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/upload-materials" className="text-lg py-3">
                                    <FaPlusSquare className="text-xl" />
                                    Upload Materials Tutor
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/upload-all-materials" className="text-lg py-3">
                                    <FaPlusSquare className="text-xl" />
                                    Upload All Materials Tutor
                                </Link>
                            </li>
                        </>
                    )}

                    {/* Admin Dashboard Navigation */}
                    {role === 'admin' && (
                        <>
                            <li className="menu-title text-xl font-semibold mt-4 mb-2">Admin Dashboard</li>
                            <li>
                                <Link to="/dashboard/all-sessions" className="text-lg py-3">
                                    <FaBookOpen className="text-xl" />
                                    All Sessions Admin
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/all-users" className="text-lg py-3">
                                    <FaBookOpen className="text-xl" />
                                    All Users Admin
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/all-materials" className="text-lg py-3">
                                    <FaBookOpen className="text-xl" />
                                    All Materials Admin
                                </Link>
                            </li>
                        </>
                    )}


                    {/* Spacer to push Logout to the bottom */}
                    <div className="flex-grow"></div>

                    {/* LogOut Button */}
                    <li className="mt-auto pt-6">
                        <button onClick={logOut} className="btn btn-error btn-outline w-full text-lg py-3">
                            <FaSignOutAlt className="text-xl" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
//dashboard