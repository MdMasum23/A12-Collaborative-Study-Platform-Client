import React from 'react';
import { NavLink, Link } from 'react-router';
import "./navLinks.css"
import CollabStudyLogo from '../CollabStudyLogo/CollabStudyLogo';
import useAuth from '../../../hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';
import avatar from '../../../assets/avatar/profile-avatar.png'

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut().catch(err => console.error(err));
    };

    const links = <>
        <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>
            Home
        </NavLink>
        <NavLink to="/tutors" className={({ isActive }) => isActive ? "link active" : "link"}>
            Tutors
        </NavLink>
        <NavLink to="/study-sessions" className={({ isActive }) => isActive ? "link active" : "link"}>
            Study Sessions
        </NavLink>
    </>

    return (
        <div className="navbar w-11/12 mx-auto p-3 shadow rounded-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <div>
                    <CollabStudyLogo></CollabStudyLogo>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end gap-3">
                {!user ? (
                    <div className="flex gap-4">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={avatar} alt="Profile" />
                        </div>
                        <Link to="/auth/login" className="btn btn-primary">Login</Link>
                        <div className='hidden lg:block'>
                            <Link to="/auth/register" className="btn btn-outline">Register</Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        {/* Profile Dropdown for Small Devices */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" />
                                    ) : (
                                        <FaUserCircle className="text-3xl" />
                                    )}
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48 lg:hidden">
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>

                        {/* Dashboard & Logout for Large Screen */}
                        <div className="hidden lg:flex gap-2 items-center">
                            <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
                            <button onClick={handleLogout} className="btn btn-error text-white">Logout</button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Navbar;
//navbar