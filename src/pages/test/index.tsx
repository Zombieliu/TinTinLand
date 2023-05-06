import Link from "next/link";
import React, {useEffect} from "react";
import {https} from "../../constants";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useAtom} from "jotai";
import {Course_data, SignUpCourseBoxData, SignUpCourseBoxState} from "../../jotai";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";


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
    // const [,setSignUpCourseBox] = useAtom(SignUpCourseBoxState)
    // const [,setSignUpCourseData] =useAtom(SignUpCourseBoxData)
    // const [,setCourse_info] = useAtom(Course_data)
    useEffect(()=>{
        if(router.isReady){
            const query = async () =>{
                const project_details = JSON.parse(data.course_details)
                // setCourse_info(project_details)
            }
            query()
        }
        return ()=> {
            clearInterval(autoTimer)
        }
    },[router.isReady])

    useEffect(()=>{

    },[])

    let index = 0
    let autoTimer

     autoTimer =  setInterval(() => {
         clearInterval(autoTimer)
         console.log("收拾收拾")
        index = index + 27
        run()
    }, 3000)

    const left = ()=>{
        clearInterval(autoTimer)
        if(index !== 0){
            index = index - 27
            run()
        }
        autoTimer =  setInterval(() => {
            console.log("收拾收拾")
            index = index + 27
            run()
        }, 3000)
    }
    const right = ()=>{
        clearInterval(autoTimer)
        index = index + 27
        run()
        autoTimer =  setInterval(() => {
            console.log("收拾收拾")
            index = index + 27
            run()
        }, 3000)
    }

    const  run = () => {
        if(typeof window !== 'undefined'){
            if(document.getElementById("carousel")){
                const left = document.getElementById("carousel")
                if (index <= Number((course_info.length - course_info.length/2) * 27)) {
                    left.style.marginLeft  = -index + "rem"
                } else {
                    index = 0
                    left.style.marginLeft = 0 + "rem"
                }
            }
        }
    }

    // let index = 0
    // let autoTimer
    // // function createAuto() {
    // //     return  setInterval(() => {
    // //         clearInterval(autoTimer)
    // //         index = index + 26
    // //         run()
    // //     }, 3000)
    // // }
    // //  autoTimer = createAuto()
    // autoTimer =  setInterval(() => {
    //     clearInterval(autoTimer)
    //     console.log("收拾收拾")
    //     right()
    // }, 3000)
    //
    // const left = ()=>{
    //     if(index !== 0){
    //         index = index - 27
    //         run()
    //     }
    //     autoTimer =  setInterval(() => {
    //         index = index + 27
    //         run()
    //     }, 3000)
    // }
    // const right = ()=>{
    //     index = index + 27
    //     run()
    //     autoTimer =  setInterval(() => {
    //         index = index + 27
    //         run()
    //     }, 3000)
    // }
    //
    // const  run = () => {
    //     clearInterval(autoTimer)
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
        <div className="my-32 mx-10">
            <div className="w-full relative hidden overflow-hidden xl:flex">
                <div className="z-20 absolute  text-black  mx-auto bottom-0 top-0 text-2xl items-center  text-black  flex justify-center">
                    <div onClick={left}  className="bg-white  px-6 py-3 cursor-pointer items-center opacity-50 rounded-full hover:opacity-80 transition duration-300">
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </div>
                </div>
                <div  className="z-20 absolute  text-black  mx-auto bottom-0 top-0 text-2xl right-0 items-center  text-black  flex justify-center">
                    <div onClick={right} className="bg-white  px-6 py-3 cursor-pointer items-center opacity-50 rounded-full hover:opacity-80 transition duration-300">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="w-full  h-full relative  transition-all duration-700 " id="carousel">
                    <div className="flex gap-8  "  id="container">
                        {course_info.map(items=>(
                            <div key={items.id}>
                                <div  className="rounded-2xl   xl:w-96 2xl:w-99">
                                    <img className="rounded-t-2xl w-full h-56 2xl:h-72"  alt=""/>
                                    <div className="px-10 py-8 bg-white rounded-b-2xl">
                                        <div className="flex  h-20 overflow-hidden flex-wrap ">

                                            {items.id}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Test
export async function getStaticProps({ locale }){
    let data = {locale}
    const course_ret = await fetch(`${https}/v1/Course/GetCourseAllDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    const course_result = await course_ret.json()
    let course_details = await course_result.res.project_details



    {fallback: false}
    return {
        props:{
            course_details,
            ...await serverSideTranslations(locale, ['common', 'footer','header']),
        }
    }

}
