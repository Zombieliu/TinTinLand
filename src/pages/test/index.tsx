import Link from "next/link";
import React, {useEffect} from "react";
import {https} from "../../constants";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useAtom} from "jotai";
import {Course_data, SignUpCourseBoxData, SignUpCourseBoxState} from "../../jotai";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import {Keyboard, Autoplay, Navigation, Pagination, Scrollbar} from "swiper";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
const course_info = [
    {id:"1"},
    {id:"2"},
    {id:"3"},
    {id:"4"},
    {id:"5"},
    {id:"6"},

]
const Test = (data) =>{
    const router = useRouter();
    const [,setSignUpCourseBox] = useAtom(SignUpCourseBoxState)
    const [,setSignUpCourseData] =useAtom(SignUpCourseBoxData)
    const [,setCourse_info] = useAtom(Course_data)
    useEffect(()=>{
        if(router.isReady){
            const query = async () =>{

            }
            query()
        }
        return ()=> {

        }
    },[router.isReady])

    useEffect(()=>{

    },[])

    // let index = 0
    // let autoTimer
    //
    //  autoTimer =  setInterval(() => {
    //      clearInterval(autoTimer)
    //      console.log("收拾收拾")
    //     index = index + 27
    //     run()
    // }, 3000)
    //
    // const left = ()=>{
    //     clearInterval(autoTimer)
    //     if(index !== 0){
    //         index = index - 27
    //         run()
    //     }
    //     autoTimer =  setInterval(() => {
    //         console.log("收拾收拾")
    //         index = index + 27
    //         run()
    //     }, 3000)
    // }
    // const right = ()=>{
    //     clearInterval(autoTimer)
    //     index = index + 27
    //     run()
    //     autoTimer =  setInterval(() => {
    //         console.log("收拾收拾")
    //         index = index + 27
    //         run()
    //     }, 3000)
    // }
    //
    // const  run = () => {
    //     if(typeof window !== 'undefined'){
    //         if(document.getElementById("carousel")){
    //             const left = document.getElementById("carousel")
    //             if (index <= Number((course_info.length - course_info.length/2) * 27)) {
    //                 left.style.marginLeft  = -index + "rem"
    //             } else {
    //                 index = 0
    //                 left.style.marginLeft = 0 + "rem"
    //             }
    //         }
    //     }
    // }



    return(
        <div >
                    <Swiper
                        // loop={true}
                        grabCursor={false}
                        keyboard={{
                            enabled: false,
                        }}
                        breakpoints={{
                            769: {
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                            },
                            1100:{
                                slidesPerView: 2,
                                slidesPerGroup: 2,
                            }
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
                        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                        id='swiper-wrapper'
                    >
                        <SwiperSlide style={{background:"lightblue"}}>
                            <img src="https://cdn.magloft.com/github/swiper/images/page-001.jpg" />
                        </SwiperSlide>
                        <SwiperSlide style={{background:"lightblue"}}>
                            <img src="https://cdn.magloft.com/github/swiper/images/page-002.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://cdn.magloft.com/github/swiper/images/page-003.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://cdn.magloft.com/github/swiper/images/page-003.jpg" />
                        </SwiperSlide>
                    </Swiper>
            <style jsx global>
                {`.swiper-button-next,
                          .swiper-button-prev {
                          border-radius: 9999px;
                          background-color: white;
                          background-color: rgba(255, 255, 255, 0.5);
                        
                          padding:1.5rem;
                          color: #000 !important;
                          }  
                          .swiper-button-prev:after, .swiper-button-next:after {
                            font-size: 1.5rem!important;
                          }
                          .swiper-pagination-bullet-active {
                          background: black;
                          }`}
            </style>

        </div>
    )

}

export default Test
