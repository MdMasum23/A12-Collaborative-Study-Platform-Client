import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLaptopCode, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';

const features = [
  {
    title: 'Live Collaboration Sessions',
    description:
      'Join real-time collaborative sessions with fellow students and expert tutors. Our interactive tools make learning engaging and effective.',
    icon: <FaLaptopCode size={40} className="text-primary" />,
    animation: 'fade-right',
    align: 'left',
  },
  {
    title: 'Verified Tutors & Mentors',
    description:
      'Learn from certified professionals who are passionate about teaching. Each tutor is vetted to ensure quality education for everyone.',
    icon: <FaChalkboardTeacher size={40} className="text-primary" />,
    animation: 'fade-left',
    align: 'right',
  },
  {
    title: '24/7 Student Support',
    description:
      'Get help whenever you need it. Our support team is available around the clock to answer questions and resolve issues instantly.',
    icon: <FaUsers size={40} className="text-primary" />,
    animation: 'fade-right',
    align: 'left',
  },
];

const PlatformFeatures = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, delay: 100 });
  }, []);

  return (
    <section className="py-20 px-5 sm:px-10 border-t border-b border-dashed overflow-x-hidden">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Platform <span className="text-primary">Features</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-2">
          Discover what makes <span className="font-semibold">CollabStudy</span> a standout in collaborative learning.
        </p>
      </div>

      <div className="flex flex-col gap-12 items-center max-w-6xl mx-auto w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            data-aos={feature.animation}
            className={`
              flex flex-col sm:flex-row items-start sm:items-center bg-white 
              shadow-md hover:shadow-xl transition duration-300 border-l-[5px] border-primary p-6 rounded-2xl w-full max-w-3xl
              ${feature.align === 'right' ? 'ml-auto' : 'mr-auto'}
            `}
          >
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mr-5 flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformFeatures;
//platformfeatures