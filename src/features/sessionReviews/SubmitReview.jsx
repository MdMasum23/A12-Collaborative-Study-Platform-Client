import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitReview = ({ sessionId, onReviewSubmitted }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert('You must be logged in to submit a review.');

        const newReview = {
            sessionId,
            studentName: user.displayName || 'Anonymous',
            rating,
            review: reviewText,
            reviewDate: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post('/reviews', newReview);
            if (res.data.insertedId) {
                toast.success("You Review submitted!");
                setRating(0);
                setReviewText('');
                onReviewSubmitted();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit review.");
        }
    };

    return (
        <div className="mt-10 p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Leave a Review</h3>
            <form onSubmit={handleSubmit}>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            className={`cursor-pointer text-2xl ${(hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                        />
                    ))}
                </div>

                {/* Review Text */}
                <textarea
                    rows="4"
                    className="w-full border rounded-md p-3 mb-4"
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                ></textarea>

                <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-6 rounded-md font-semibold hover:from-indigo-600"
                >
                    Submit Review
                </button>
            </form>
            <ToastContainer position="top-right" autoClose={2500} />
        </div>
    );
};

export default SubmitReview;
//Add SubmitReview component for posting session reviews with star rating