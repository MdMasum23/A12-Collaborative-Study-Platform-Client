import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaCalendarAlt, FaClock, FaUser, FaStar, FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import Loading from '../../components/Loading/Loading';
import SessionReviews from '../SessionReviews/SessionReviews';
import SubmitReview from '../SessionReviews/SubmitReview';

const SessionDetails = () => {
    const { id: sessionId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, role, loading: authLoading } = useAuth();
    const [reviewRefreshKey, setReviewRefreshKey] = useState(0);
    const [bookingLoading, setBookingLoading] = useState(false);

    const fetchReviewsAgain = useCallback(() => {
        setReviewRefreshKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data: session, isLoading, isError, error } = useQuery({
        queryKey: ['sessionDetails', sessionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sessions/${sessionId}`);
            return res.data;
        },
    });

    if (isLoading || authLoading) return <Loading />;
    if (isError) return (<div className="text-center mt-10 text-red-500"> Error loading session: {error.message} </div>);

    const isClosed = new Date(session.registrationEnd) < new Date();

    const handleBookNow = async () => {
        if (!user) {
            return Swal.fire({
                icon: 'warning',
                title: 'Please log in to book a session',
            });
        }

        setBookingLoading(true);

        try {
            const bookingData = {
                sessionId,
                studentEmail: user.email,
                studentName: user.displayName,
                status: 'booked',
                bookedAt: new Date(),
            };

            const res = await axiosSecure.post('/bookings', bookingData);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Booked!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: res.data.message || 'You already booked this session!',
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Booking failed',
                text: err.message,
            });
        } finally {
            setBookingLoading(false);
        }
    };

    const isButtonDisabled = isClosed || !user || role === 'admin' || role === 'tutor' || bookingLoading;

    const buttonLabel = () => {
        if (isClosed) return 'Registration Closed';
        if (!user) return 'Login to Book';
        if (role === 'admin' || role === 'tutor') return 'Not Allowed';
        if (bookingLoading) return 'Booking...';
        return 'Book Now';
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-sky-50 via-white to-purple-100 py-10 px-4">
            {/* Hero Title */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">{session.title}</h1>
                <p className="text-lg text-gray-500 flex justify-center items-center gap-2 mt-2">
                    <FaUser /> Tutor: {session.tutorName}
                </p>
            </div>

            {/* Card */}
            <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md shadow-xl rounded-3xl p-8 space-y-8 border border-white/30">
                {/* Description */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{session.description}</p>
                </section>

                {/* Info Grid */}
                <section className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/80 p-4 rounded-xl shadow">
                        <FaCalendarAlt className="text-primary" />
                        <span>Reg Start: {new Date(session.registrationStart).toDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-4 rounded-xl shadow">
                        <FaCalendarAlt className="text-primary" />
                        <span>Reg End: {new Date(session.registrationEnd).toDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-4 rounded-xl shadow">
                        <FaCalendarAlt className="text-primary" />
                        <span>Class Start: {new Date(session.classStart).toDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-4 rounded-xl shadow">
                        <FaCalendarAlt className="text-primary" />
                        <span>Class End: {new Date(session.classEnd).toDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-4 rounded-xl shadow">
                        <FaClock className="text-primary" />
                        <span>Duration: {session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-4 rounded-xl shadow">
                        <FaMoneyBillWave className="text-primary" />
                        <span>Fee: {session.regFee > 0 ? `$${session.regFee}` : 'Free'}</span>
                    </div>
                </section>

                {/* Book Now */}
                <div className="text-center pt-4">
                    <button onClick={handleBookNow} disabled={isButtonDisabled}
                        className={`px-6 py-3 rounded-full flex items-center justify-center gap-2 mx-auto transition-all duration-200 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 font-semibold'
                            }`}
                    >
                        {isClosed ? <MdOutlineClose className="text-lg" /> : null}
                        {buttonLabel()}
                    </button>
                </div>
            </div>

            {/* Reviews */}
            <div className="max-w-4xl mx-auto mt-12">
                <SessionReviews sessionId={sessionId} refreshKey={reviewRefreshKey} />
                <SubmitReview sessionId={sessionId} onReviewSubmitted={fetchReviewsAgain} />
            </div>
        </div>
    );
};

export default SessionDetails;