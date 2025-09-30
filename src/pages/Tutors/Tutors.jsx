import React, { useEffect, useState } from 'react';
import TutorCard from './TutorCard';
import { FaChalkboardTeacher } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Tutors = () => {
    const [tutors, setTutors] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/tutors')
            .then(res => {
                setTutors(res.data);
            })
            .catch(err => {
                console.error('Failed to fetch tutors:', err);
            });
    }, [axiosSecure]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center mb-10 text-[#374151] flex items-center justify-center gap-3">
                <FaChalkboardTeacher className="text-[#4F46E5]" /> Meet Our Tutors
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tutors.map((tutor, idx) => (
                    <TutorCard key={idx} tutor={tutor} />
                ))}
            </div>
        </div>
    );
};

export default Tutors;
//tutors