import React from 'react';
import Marquee from 'react-fast-marquee';

const feedbackData = [
  {
    name: 'Sheikh Shubo',
    role: 'Software Engineer',
    photo: 'https://i.ibb.co/p64MZ9qK/Picsart-25-04-29-20-47-54-710.jpg',
    comment: 'CollabStudy helped me find the perfect tutor within minutes. The interface is simple and really effective!',
  },
  {
    name: 'Shamima Aktar',
    role: 'University Student',
    photo: 'https://i.ibb.co/rGrXbjBH/muslime-employee.jpg',
    comment: 'Thanks to this platform, I was able to join live study sessions and improve my results. Highly recommended!',
  },
  {
    name: 'Rafiq Hasan',
    role: 'Parent',
    photo: 'https://randomuser.me/api/portraits/men/33.jpg',
    comment: 'Great experience for my son. The tutors are responsive and professional. Perfect for collaborative learning.',
  },
  {
    name: 'Tanjina Nahar',
    role: 'College Student',
    photo: 'https://i.ibb.co/5WXy33BW/employee-img-01.jpg',
    comment: 'This platform saved me hours of search! Very easy to use and connect with others.',
  },
  {
    name: 'Rakibul Islam',
    role: 'HSC Candidate',
    photo: 'https://randomuser.me/api/portraits/men/41.jpg',
    comment: 'I joined a study group and it really boosted my confidence. I love CollabStudy!',
  },
];

const ClientFeedback = () => {
  return (
    <div className="py-16 my-10 mb-20">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-bold text-blue-500">What Our Students Say</h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Real experiences from CollabStudy users — discover how we’re making a difference.
        </p>
      </div>

      <Marquee pauseOnHover speed={50}>
        <div className="flex gap-6 px-4">
          {feedbackData.map((feedback, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 w-80 hover:scale-[1.03] hover:shadow-xl transition-transform duration-300 border border-blue-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={feedback.photo}
                  alt={feedback.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
                />
                <div>
                  <h4 className="text-gray-800 font-semibold">{feedback.name}</h4>
                  <p className="text-gray-500 text-sm">{feedback.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">“{feedback.comment}”</p>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default ClientFeedback;