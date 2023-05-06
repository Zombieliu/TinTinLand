import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {Keyboard, Autoplay, Navigation, Pagination, Scrollbar} from "swiper";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules


export default function App() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    return (
        <>
            <Swiper
                slidesPerView={1}
                centeredSlides={false}
                slidesPerGroupSkip={1}
                grabCursor={true}
                keyboard={{
                    enabled: true,
                }}
                breakpoints={{
                    769: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                scrollbar={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay,Keyboard, Scrollbar, Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://cdn.magloft.com/github/swiper/images/page-001.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn.magloft.com/github/swiper/images/page-002.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn.magloft.com/github/swiper/images/page-003.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn.magloft.com/github/swiper/images/page-004.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn.magloft.com/github/swiper/images/page-005.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn.magloft.com/github/swiper/images/page-006.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn.magloft.com/github/swiper/images/page-007.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn.magloft.com/github/swiper/images/page-008.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn.magloft.com/github/swiper/images/page-009.jpg" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
