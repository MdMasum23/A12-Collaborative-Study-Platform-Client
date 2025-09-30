import React from 'react';
import { useQuery } from '@tanstack/react-query';
import BookedSessionsCard from './BookedSessionsCard';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Loading from '../../../../components/Loading/Loading';

const BookedSessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Booked Sessions</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking, index) => (
          <BookedSessionsCard key={index} booking={booking} />
        ))}
      </div>
      {bookings.length === 0 && (
        <p className="text-center mt-10 text-gray-500 text-lg">You haven't booked any sessions yet.</p>
      )}
    </div>
  );
};

export default BookedSessions;