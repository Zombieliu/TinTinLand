import Header from "../../components/header";
import Tail from "../../components/tail";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Heads from "../../components/head";
import HackathonsState from "../../components/state";
import {useAtom} from "jotai";
import {Hackathons_detail} from "../../jotai";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {https} from "../../constants";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Hackathons = (props) =>{
    const { t } = useTranslation('common')
    const [hackathonsData,setHackathonsData] = useAtom(Hackathons_detail)

    useEffect(()=>{
            const hackathons_details_list = JSON.parse(props.hackathons_details)
            setHackathonsData(hackathons_details_list)
    },[])
    return (

        <div className="mx-auto relative bg-fixed overflow-hidden"
             style={{backgroundImage:"url('/tintin-bg.png')"}}>
            <Heads/>
            <Header/>
            <div className=" lg:px-10 xl:px-20 relative px-5 pt-24 mx-auto">
                <div className="p-10  rounded-xl bg-left md:bg-cover overflow-hidden"  style={{backgroundImage:"url('/黑客松_bg.png')"}}>
                    <div className="">
                        <div className="text-[#5448AE] text-xl mb-5">
                            Hackathons
                        </div>
                        <div className="text-4xl mb-5">
                            <div className="mb-2">
                                {t("建立与全球开发者的联系")}
                            </div>
                            <div>
                                {t("一起组队玩转黑客松")}
                            </div>
                        </div>
                        <div className="text-xl ">
                            {t("用区块链技术创建 Web3 世界")}<br/>
                            {t("协助开发者创建团队，提供技术指导，引入投资")}

                        </div>
                    </div>


                </div>
                <div>
                    <div className="text-indigo-700 text-xl mt-10">
                        Explore Hackathons
                    </div>
                    <div className="mt-5 mb-20 grid md:grid-cols-2 xl:grid-cols-3  gap-10 ">
                        {hackathonsData.map(items=>(
                            <div key={items.id} className="rounded-2xl relative">
                                <div className={classNames(HackathonsState[items.state]," flex justify-end right-4 mt-5 rounded-full px-3 py-1   absolute")}>
                                    {items.state}
                                </div>
                                <img className="rounded-t-2xl w-full  h-56" src={items.img} alt=""/>
                                <div className="px-10 py-8 bg-white rounded-b-2xl">
                                    <div className="   mt-2">
                                        {items.name}
                                    </div>
                                    <div className="text-sm   mt-2">
                                        {items.time}
                                    </div>
                                    <div className="line-clamp-4 h-20 text-sm text-[#000000]  mt-2">
                                        {items.text}
                                    </div>
                                    <div className="flex mt-5 ">
                                        <Link href={items.registrationLink}>
                                            <a className={items.state=="ComingSoon" || items.state=="OnGoing"  ?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"}>
                                                {t("立刻报名")}
                                            </a>
                                        </Link>

                                        <Link href={items.activityLink}>
                                            <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5" target="_blank">
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
export default Hackathons


export async function getStaticProps({locale}){
    let data ={ locale }
    const hackathons_ret = await fetch(`${https}/v1/Hackathons/GetHackathonsDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    const hackathons_result = await hackathons_ret.json()
    let  hackathons_details = await hackathons_result.res.project_details
    return {
        props: {
            hackathons_details,
            ...await serverSideTranslations(locale, ['common', 'footer','header']),
        }
    }

}
