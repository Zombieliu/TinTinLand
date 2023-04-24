import Header from "../../components/header";
import Tail from "../../components/tail";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Activity_Info from "../../components/activity_info";
import Heads from "../../components/head";
import {Activity_Alldetail, Activity_detail} from "../../jotai";
import {useAtom} from "jotai";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetStaticPaths} from "next";
import {CourseDatabaseId, https} from "../../constants";
import {useTranslation} from "next-i18next";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Meeting = (props) =>{
    const router = useRouter()
    const [activityList,setActivityList] = useAtom(Activity_detail)
    const { t } = useTranslation('common')
    useEffect(()=>{
        if (router.isReady){
            setActivityList(JSON.parse(props.activity_details))

            }
        },[router.isReady])
    return (

        <div className="mx-auto relative bg-fixed overflow-hidden"
             style={{backgroundImage:"url('/tintin-bg.png')"}}>
            <Heads/>
            <Header/>
            <div className=" lg:px-10 xl:px-20 relative px-5 pt-24    mx-auto ">
                <div className=" py-10     xl:flex justify-between " >
                    <div className=" xl:w-4/12 2xl:w-1/2 ">
                        <div className="text-2xl md:text-4xl xl:text-6xl ">
                            <div>
                                {activityList.name}
                            </div>

                        </div>
                        <div className="mt-10 text-base  2xl:text-2xl font-light">
                            <div>
                                {activityList.des}
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-9/12  xl:ml-4 mt-10 xl:mt-0 ">
                        <div className="" >
                            <div className="md:flex  w-full   py-8 md:bg-white rounded-2xl">
                                <img className="rounded-t-2xl md:rounded-xl md:mx-8 md:w-7/12  " src={activityList.activityList[0].poster_1} alt=""/>
                                <div className=" bg-white p-5 xl:p-0  rounded-b-2xl ">
                                    <div className="pt-4 md:pt-0 flex ">
                                        <div className="rounded-full bg-gray-200 text-gray-700 px-2.5 py-0.5 text-sm">
                                            {activityList.activityList[0].activity}
                                        </div>
                                    </div>
                                    <div className="text-2xl  mt-5">
                                        {activityList.activityList[0].time}
                                    </div>
                                    <div className="font-light font-semibold">
                                        {activityList.activityList[0].date}
                                    </div>

                                        <div className='pr-1 font-semibold  text-xl xl:text-2xl line-clamp-3 xl:line-clamp-5 h-20 xl:h-32 mt-6'>
                                            {activityList.activityList[0].name}
                                        </div>

                                    <div className="flex  pt-6  xl:pt-20">

                                        <div className="flex justify-between  items-center">
                                            <div className="">
                                                <Link href={activityList.activityList[0].subLink}>
                                                    <a className={classNames(activityList.activityList[0].status =="In progress"|| activityList.activityList[0].status =="Not started"?"bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden")} target="_blank">
                                                        {t("订阅")}
                                                    </a>
                                                </Link>
                                            </div>
                                            <div className="">
                                                <Link href={activityList.activityList[0].videoLink}>
                                                    <a className={activityList.activityList[0].status !=="Done"?"hidden":" text-black border border-black rounded-full  px-4 py-2.5"} target="_blank">
                                                        {t("了解更多")}
                                                    </a>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div>
                    <div className="text-indigo-700 text-2xl">
                        {t("往期回顾")}
                    </div>
                    <div className="mt-5 mb-20 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 ">
                        {activityList.activityList.map((item,index)=>(
                            <div key={item.activity} className={ index ==0?"hidden":"rounded-2xl"}>
                                <img className="rounded-t-2xl w-99 h-60" src={item.poster_1} alt=""/>
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
            </div>
            <Tail/>
        </div>


    )
}
export default Meeting

export const getStaticPaths = async ({locales = [], defaultLocale}) => {
    let data = {
        locale: defaultLocale
    }
    const paths = []
    const activity_ret = await fetch(`${https}/v1/Activity/GetActivityAllDetails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const activity_result = await activity_ret.json()
    let activity_details = await JSON.parse(activity_result.res.project_details)

    for (let i= 0 ;i<activity_details.length;i++){
        for (const locale of locales) {
            paths.push({ params:{id:(activity_details[i].id).toString()},locale})
        }
    }
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({params:{id} ,locale}){
    let data = {
        // databaseId: CourseDatabaseId,
        locale,
        id
    }
    const activity_ret = await fetch(`${https}/v1/Activity/GetActivityDetails`,{
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
