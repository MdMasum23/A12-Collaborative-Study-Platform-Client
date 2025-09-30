import React from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner01 from '../../../assets/banner-images/banner-01.jpg'
import banner02 from '../../../assets/banner-images/banner-02.jpg'
import banner03 from '../../../assets/banner-images/banner-03.jpg'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
    return (
        <div className='text-center font-medium py-3'>
            <Swiper
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="cursor-pointer overflow-hidden shadow-lg rounded-2xl"
            >

                <SwiperSlide>
                    <img className='max-h-[83vh] w-full mx-auto rounded-xl' src={banner01} alt="Banner 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='max-h-[83vh] w-full mx-auto rounded-xl' src={banner02} alt="Banner 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='max-h-[83vh] w-full mx-auto rounded-xl' src={banner03} alt="Banner 3" />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;
//banner