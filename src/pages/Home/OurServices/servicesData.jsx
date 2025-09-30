import React from 'react';
import { FaChalkboardTeacher, FaBookOpen, FaCalendarAlt, FaUsers, FaHistory, FaUserShield } from 'react-icons/fa';

const servicesData = [
    {
        id: 1,
        icon: <FaChalkboardTeacher size={30} />,
        title: "Online Tutoring",
        desc: "Connect with verified tutors and join live online sessions for better understanding.",
    },
    {
        id: 2,
        icon: <FaBookOpen size={30} />,
        title: "Study Resources",
        desc: "Access shared resources like notes, PDFs, and recordings from tutors and peers.",
    },
    {
        id: 3,
        icon: <FaCalendarAlt size={30} />,
        title: "Schedule Management",
        desc: "Easily book, manage, or join upcoming study sessions through a shared calendar.",
    },
    {
        id: 4,
        icon: <FaUsers size={30} />,
        title: "Group Collaboration",
        desc: "Create or join study groups to prepare together and collaborate on topics.",
    },
    {
        id: 5,
        icon: <FaHistory size={30} />,
        title: "Session History",
        desc: "View your past sessions with details like tutor name, time, and summary notes.",
    },
    {
        id: 6,
        icon: <FaUserShield size={30} />,
        title: "User Role Management",
        desc: "Admins can manage student and tutor accounts, access levels, and approvals.",
    },
];

export default servicesData;
//servicedata