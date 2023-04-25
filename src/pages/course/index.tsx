import Header from "../../components/header";
import Tail from "../../components/tail";
import React, {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Activity_Info from "../../components/activity_info";
import Heads from "../../components/head";
import {client} from "../../client";
import {useAtom} from "jotai";
import {
    Course_data,
    LoginState,
    OpenLoginState,
    PopUpBoxInfo,
    PopUpBoxState,
    SignUpCourseBoxData,
    SignUpCourseBoxState,
    UserEmail
} from "../../jotai";
import {Dialog, Transition} from "@headlessui/react";
import {Pop_up_box, SignUpCourseBox} from "../../components/pop_up_box";
import Loading from "../../components/loading";
import {WaitPayPoPUpBox} from "../../components/payState";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {https} from "../../constants";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Course = (props) =>{
    const [,setSignUpCourseBox] = useAtom(SignUpCourseBoxState)
    const [,setSignUpCourseData] =useAtom(SignUpCourseBoxData)
    const { t } = useTranslation('common')
    const [course_info,setCourse_info] = useAtom(Course_data)
    const Signup = (img,courseName) =>{
        setSignUpCourseBox(true)
        setSignUpCourseData({
            img,
            courseName,
            price: "100"
        })
    }
    useEffect(()=>{
        const course_details_list = JSON.parse(props.course_details)
        setCourse_info(course_details_list)
    },[])

    return (

        <div className="mx-auto relative bg-fixed overflow-hidden"
             style={{backgroundImage:"url('/tintin-bg.png')"}}>
            <Heads/>
            <Header/>
            <div className=" lg:px-10 xl:px-20 relative px-5 pt-24    mx-auto ">
                <div className="   p-10  rounded-xl  bg-left md:bg-cover overflow-hidden "  style={{backgroundImage:"url('/课程_bg.png')"}}>
                    <div className="">
                        <div className="text-[#5448AE] text-xl mb-5">
                            {t("TinTin课程")}
                        </div>
                        <div className="text-4xl mb-5">
                        <div className="mb-2">
                            {t("学习最前沿的 Web3 技术")}
                        </div>
                        <div>
                            {t("创造未来开放网络")}
                        </div>
                        </div>
                        <div className="text-xl ">
                            {t("生态官方合作课程，项目 CTO &核心开发者亲自授课")}
                            <br/> {t("配套高质量社群，全球一线开发者助教全程陪伴，社区同学交流讨论")}
                        </div>
                        <button className="bg-black text-white px-4 py-2 rounded-full mt-5">
                            TinTin EDU
                        </button>
                    </div>
                </div>
                <div>
                    <div className="text-indigo-700 text-xl mt-10">
                        {t("火热报名中")} 🔥
                    </div>
                    <div className="mt-5 mb-20 grid md:grid-cols-2 xl:grid-cols-3  gap-10 ">
                        {course_info.map(items=>(
                            <div key={items.id} className={classNames(items.state == "In progress" || items.state == "About to start" ?"rounded-2xl  ":"hidden")}>
                                <img className="rounded-t-2xl xl:h-60 2xl:h-80" src={items.img} alt=""/>
                                <div className="px-10 py-8 bg-white rounded-b-2xl">
                                    <div className="flex  h-20 overflow-hidden  flex-wrap">
                                        {items.type.map(list=>(
                                            <div key={list.content} className="bg-gray-200 rounded-full text-center text-gray-700  h-7 px-3 py-1 mr-2 mb-4 text-sm" >
                                                {list.content}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="line-clamp-2  h-12 mt-2">
                                        {items.name}
                                    </div>
                                    <div className="flex mt-5 ">
                                        {/*<button onClick={()=>{Signup(items.img,items.h1)}}>*/}
                                        {/*    <div   className={items.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"} >*/}
                                        {/*           {t("立刻报名")}*/}
                                        {/*    </div>*/}
                                        {/*</button>*/}
                                        <Link href={items.link}>
                                            <a  target="_blank" className={items.state=="In progress"?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"} >
                                                {t("立刻报名")}
                                            </a>
                                        </Link>
                                        {/*onClick={()=>{Signup(items.img,items.h1)}}*/}
                                        <button >
                                            <div className={items.state=="About to start"?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"}>
                                                {t("即将开始")}
                                            </div>
                                        </button>

                                        <Link href={`/course_details/${items.id}`}>
                                            <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5" >
                                                {t("了解更多")}
                                            </a>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="text-indigo-700 text-xl mt-10">
                        {t("往期回顾")}
                    </div>
                    <div className="mt-5 mb-20 grid md:grid-cols-2 xl:grid-cols-3  gap-10 ">
                        {course_info.map(items=>(
                            <div key={items.id} className={classNames(items.state == "In progress" || items.state == "About to start"?"hidden":"rounded-2xl")}>
                                <img className="rounded-t-2xl xl:h-60 2xl:h-80" src={items.img} alt=""/>
                                <div className="px-10 py-8 bg-white rounded-b-2xl">
                                    <div className="flex  h-20 overflow-hidden  flex-wrap">
                                        {items.type.map(list=>(
                                            <div key={list.content} className="bg-gray-200 rounded-full text-center text-gray-700  h-7 px-3 py-1 mr-2 mb-4 text-sm" >
                                                {list.content}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="line-clamp-2  h-12 mt-2">
                                        {items.name}
                                    </div>
                                    <div className="flex mt-5 ">
                                        {/*<button onClick={()=>{Signup(items.img,items.h1)}}>*/}
                                        {/*    <div   className={items.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"} >*/}
                                        {/*           {t("立刻报名")}*/}
                                        {/*    </div>*/}
                                        {/*</button>*/}
                                        <Link href={items.link}>
                                            <a  target="_blank" className={items.state=="In progress"?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"} >
                                                   {t("立刻报名")}
                                            </a>
                                        </Link>
                                        {/*onClick={()=>{Signup(items.img,items.h1)}}*/}
                                        <button >
                                            <div className={items.state=="About to start"?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"}>
                                                {t("即将开始")}
                                            </div>
                                        </button>

                                        <Link href={`/course_details/${items.id}`}>
                                            <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5" >
                                                {t("了解更多")}
                                            </a>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>


                </div>
            </div>
       <Loading/>
            <Pop_up_box/>
            <WaitPayPoPUpBox/>
            <SignUpCourseBox/>
            <Tail/>
        </div>


    )
}
export default Course


export async function getStaticProps({locale}){
    let data ={ locale }
    const course_ret = await fetch(`${https}/v1/Course/GetCourseAllDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    const course_result = await course_ret.json()
    let course_details = await course_result.res.project_details
    return {
        props: {
            course_details,
            ...await serverSideTranslations(locale, ['common', 'footer','header']),
        }
    }

}
