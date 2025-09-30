import React, { useEffect, useState } from 'react';
import StudySessionCard from './StudySessionCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const StudySessions = () => {
    const axiosSecure = useAxiosSecure();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        axiosSecure.get('/sessions/available')
            .then(res => setSessions(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">

            <h2 className="text-4xl font-bold text-primary mb-10 text-center">
                Explore All Study Sessions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sessions.map(session => (
                    <StudySessionCard key={session._id} session={session} />
                ))}
            </div>
        </div>
    );
};

export default StudySessions;