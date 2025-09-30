import React, { useEffect, useState } from 'react';
import AvailableSessionCard from './AvailableSessionCard';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading'

const AvailableSessions = () => {
    const [sessions, setSessions] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axiosSecure.get('/sessions/approved');
                setSessions(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, [axiosSecure]);

    if (loading) {
        <Loading />
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Error loading sessions: {error.message}. Please ensure your backend is running and the '/sessions/approved' endpoint exists.
            </div>
        );
    }

    return (
        <div className="py-10 my-10 px-4 max-w-7xl mx-auto">

            <div className="text-center mb-12"> {/* Container for heading and paragraph */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 leading-tight">
                    🎓 Available <span className="text-secondary">Study Sessions</span>
                </h2>
                <p className="text-md text-gray-700 text-center mb-12 max-w-3xl mx-auto">
                    Explore a variety of engaging study sessions designed to boost your learning.
                    Find sessions with ongoing registration or see what's coming up.
                </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {
                    sessions.map(session => (
                        <AvailableSessionCard key={session._id.$oid || session._id} session={session} />
                    ))
                }
            </div>

            {
                sessions.length === 0 && <>
                    <div className="flex flex-col justify-center items-center h-screen text-gray-600">
                        <p className="text-xl mb-4">No approved sessions available at the moment.</p>
                        <p className="text-md">Check back later for new opportunities!</p>
                    </div>
                </>
            }

        </div>
    );
};

export default AvailableSessions;