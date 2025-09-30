import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Star } from 'lucide-react';
import { FaStar } from 'react-icons/fa';

const SessionReviews = ({ sessionId }) => {
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState([]);
    const [average, setAverage] = useState(0);

    useEffect(() => {
        axiosSecure.get(`/reviews/${sessionId}`)
            .then(res => {
                setReviews(res.data);
                const total = res.data.reduce((sum, r) => sum + r.rating, 0);
                setAverage((total / res.data.length).toFixed(1));
            });
    }, [axiosSecure, sessionId]);

    return (
        <div className="mt-10 p-6 rounded-xl bg-white shadow-xl">

            <h3 className="flex text-yellow-500 gap-1 mt-1 text-2xl font-bold mb-4">
                <FaStar /> <span className='text-primary'>Average Rating:</span>  <span className="text-yellow-500">{average || 'No Ratings Yet'}</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-x-3 max-h-[300px] overflow-y-auto space-y-3 pr-2 scroll-smooth">

                {reviews.map((r) => (
                    <div key={r._id} className=" bg-gray-50 border border-gray-200 rounded-lg p-4" >

                        <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-gray-800">{r.studentName}</p>
                            <div className="flex gap-1 text-yellow-500">
                                {[...Array(r.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                        </div>
                        
                        <p className="text-gray-600">{r.review}</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {new Date(r.reviewDate).toLocaleDateString()}
                        </p>

                    </div>
                ))}

                {
                    reviews.length === 0 && <>
                        <p className="text-gray-600">No reviews yet for this session.</p>
                    </>
                }

            </div>
        </div>
    );
};

export default SessionReviews;