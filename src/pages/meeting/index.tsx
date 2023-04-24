import Header from "../../components/header";
import Tail from "../../components/tail";
import React, {useEffect, useState} from "react";
import Link from "next/link";

import Activity_Info from "../../components/activity_info";
import Heads from "../../components/head";

import {Activity_Alldetail} from "../../jotai";
import {useAtom} from "jotai";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {https} from "../../constants";
import {GetStaticPaths} from "next";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Meeting = (props) =>{
    const { t } = useTranslation('common')
    const [activityList,setActivityList] = useAtom(Activity_Alldetail)
    useEffect(()=>{
            const activity_details_list = JSON.parse(props.activity_details)
            setActivityList(activity_details_list)
    },[])
    return (

        <div className="mx-auto relative bg-fixed overflow-hidden"
             style={{backgroundImage:"url('/tintin-bg.png')"}}>
            <Heads/>
            <Header/>
            <div className=" lg:px-10 xl:px-20 relative px-5 pt-24    mx-auto ">
                <div className="   p-10  rounded-xl  bg-left md:bg-cover overflow-hidden "  style={{backgroundImage:"url('/活动_bg.png')"}}>
                    <div className="">
                        <div className="text-[#5448AE] text-xl mb-5">
                            {t("TinTin活动")}
                        </div>
                        <div className="text-4xl mb-5">
                            <div className="mb-2">
                                {t("与顶尖项目面对面讨论")}
                            </div>
                            <div>
                                {t("获得热点趋势与开发实战经验")}
                            </div>
                        </div>
                        <div className="text-xl ">
                            {t("最新的多链技术分享，众多赛道实时资讯")}
                            <br/>
                            {t("生态项目代码实操演练，与 Web3 领军人物现场讨论")}
                            </div>
                    </div>


                </div>
                <div>
                    {activityList.map((items=>(
                    <div key={items.id} className="mt-10">
                        <div className="text-indigo-700 text-xl flex justify-between">
                            {items.name}
                            <Link href={`/meetingList/${items.id}`}>
                            <div className="flex bg-white text-black rounded-full cursor-pointer text-sm items-center px-4 py-1.5">
                                <div className="mr-1" >
                                    {t("查看更多")}
                                </div>
                                <div>
                                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="md:w-2/3 text-sm mt-2">
                            {items.des}
                        </div>
                    <div className="mt-5 mb-20 grid md:grid-cols-2 xl:grid-cols-3   gap-10 ">
                        {items.activityList.map((item,index)=>(
                            <div key={item.activity} className={index>2?"hidden":"rounded-2xl"}>
                                <img className="rounded-t-2xl w-full h-64 2xl:h-72" src={item.poster_1} alt=""/>
                                <div className="px-10 py-8 bg-white rounded-b-2xl">
                                    <div className="flex   flex-wrap">
                                        <div  className="bg-gray-200 rounded-full text-center text-gray-700 px-3 py-1 mr-2 mb-4 text-sm" >
                                            {item.activity}
                                        </div>
                                    </div>
                                    <div className=" text-2xl line-clamp-2 h-16">
                                        {item.name}
                                    </div>
                                    <div className="flex mt-5 items-center ">
                                        <div className="mt-4">
                                            <Link href={item.subLink}>
                                                <a className={item.status == "In progress"||item.status == "Not started"?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-10 py-2.5 mr-5 ":"hidden"}>
                                                    {t("订阅")}
                                                </a>
                                            </Link>
                                        </div>
                                        <Link href={item.videoLink}>
                                            <a className={item.status !== "Done"?"hidden":" text-black border border-black rounded-full  px-8 py-2.5"} target="_blank">
                                                {t("了解更多")}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    </div>
                    )))}
                </div>
            </div>
            <Tail/>
        </div>


    )
}
export default Meeting


export async function getStaticProps({locale}){
    let data = { locale }
    const activity_ret = await fetch(`${https}/v1/Activity/GetActivityAllDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    const activity_result = await activity_ret.json()
    let  activity_details = await activity_result.res.project_details
    return {
        props: {
            activity_details,
            ...await serverSideTranslations(locale, ['common', 'footer','header']),
        }
    }

}


