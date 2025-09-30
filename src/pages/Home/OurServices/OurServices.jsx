import React from 'react';
import servicesData from './servicesData';

const OurServices = () => {
    return (
        <div className="bg-[#F3F4F6] my-16 py-16 px-4 md:px-10 rounded-[50px]">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">Our Services</h2>
                <p className="text-sm md:text-base text-gray-600 mb-10 max-w-3xl mx-auto">
                    We empower learners and educators by offering flexible tools and organized study experiences for modern education.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesData.map((service) => (
                        <div
                            key={service.id}
                            className="rounded-xl p-6 bg-white text-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out hover:bg-blue-100"
                        >
                            <div className="bg-blue-50 text-blue-600 p-3 rounded-full mb-4 text-3xl mx-auto w-fit">
                                {service.icon}
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-600">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurServices;
//ourservices