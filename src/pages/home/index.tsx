import Link from "next/link";
import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import HackathonsState from "../../components/state";
import Course_info from "../../components/course_info";
import Activity_Info from "../../components/activity_info";
import Heads from "../../components/head";
import {client} from "../../client";
import {useAtom} from "jotai";
import {
    Language,
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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Course = () => {
    const [language,setLanguage] =useAtom(Language)
    const [,setSignUpCourseBox] = useAtom(SignUpCourseBoxState)
    const [,setSignUpCourseData] =useAtom(SignUpCourseBoxData)
    let index = 0
    let autoTimer
    const Course_info =
        [
            {
                id: "IC_104",
                img: "/course/IC_104.png",
                type: [
                    {
                        content: "Motoko"
                    },
                    {
                        content: "Canister"
                    },
                    {
                        content: "Javescript"
                    },
                    {
                        content: "静态网站"
                    },
                ],
                h1:"Internet Computer：从核心技术入门到开发实战",
                state: false,
                link: "https://hkr.xet.tech/s/1RNB1X",
                AboutStart:true,
            },
            {
                id: "EVM_104",
                img: "/course/EVM_104.png",
                type: [
                    {
                        content: "Solidity"
                    },
                    {
                        content: "智能合约"
                    },
                    {
                        content: "合约安全"
                    },
                    {
                        content: "ERC20"
                    },
                    {
                        content: "ERC721"
                    },
                ],
                h1:"以太坊开发快速入门-轻松创建智能合约",
                state: false,
                link: "https://hkr.xet.tech/s/4sKJGh",
                AboutStart:true,
            },
            {
                id: "FLOW_101",
                img: "/course/FLOW_101.png",
                type: [
                    {
                        content: "Cadence"
                    },
                    {
                        content: "Flow FT"
                    },
                    {
                        content: "Flow NFT"
                    },
                    {
                        content: "NFT Metadata"
                    },
                    {
                        content: "FCL(Flow Client Library)"
                    },
                ],
                h1:"Flow DApp 开发：从初识 Candence 到搭建 Makertplace",
                state: true,
                link: "https://hkr.h5.xeknow.com/s/PGm9a",
                AboutStart:false,
            },
            {
                id: "BAC_101",
                img: "/course/BAC_101.png",
                type: [
                    {
                        content: "比特币脚本系统"
                    },
                    {
                        content: "基础数据结构"
                    },
                    {
                        content: "执行模型"
                    },

                    {
                        content: "UTXO 模型"
                    },

                    {
                        content: "账户模型"
                    },
                ],
                h1:"从0开始学区块链：工程师眼中的比特币和以太坊",
                state: true,
                link: "https://hkr.h5.xeknow.com/s/VRdMD",
                AboutStart:false,

            },

        ]
    useEffect(()=>{
        autoTimer = createAuto()
        return ()=> {
            clearInterval(autoTimer)
        }
    },[])

    function createAuto() {
        return  setInterval(() => {
            index = index + 26
            run()
        }, 8000)
    }
    function run() {
        clearInterval(autoTimer)
        if(typeof window !== 'undefined'){
            if(document.getElementById("carousel")){
            const left = document.getElementById("carousel")
            if (index <= Number((Course_info.length - Course_info.length/2) * 24)) {
                left.style.marginLeft  = -index + "rem"
            } else {
                index = 0
                left.style.marginLeft = 0 + "rem"
            }
            autoTimer = createAuto()
            }
        }
    }
    const left = ()=>{
        clearInterval(autoTimer)
        if(index !== 0){
            index = index-26
            run()
        }
    }
    const right = ()=>{
        clearInterval(autoTimer)
        index = index + 26
        run()
    }

    const Signup = (img,courseName) =>{
        setSignUpCourseBox(true)
        setSignUpCourseData({
            img,
            courseName,
            price: "100"
        })
    }


    return(
        <div id="Educate" className="pt-20">

                    <div  className="text-indigo-700 text-2xl ">
                        TinTin课程
                    </div>
                    <div className="text-2xl md:text-4xl my-5">
                        <div>
                            学习最前沿的 Web3 技术，
                        </div>
                        <div>
                            创造未来开放网络
                        </div>
                    </div>

                    <div className="mb-5 text-sm md:text-base">
                        <div>
                            生态官方合作课程，项目 CTO &核心开发者亲自授课
                        </div>
                        <div>
                            配套高质量社群，全球一线开发者助教全程陪伴，社区同学交流讨论。
                        </div>

                <div className="flex justify-end md:-mt-10">
                    <Link href="/course">
                <div className="flex  bg-white text-black rounded-full cursor-pointer text-sm items-center  px-4 py-1.5">
                    <div className="mr-1" >
                        查看更多
                    </div>
                    <div>
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </div>
                </div>
                    </Link>
                </div>
            </div>

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
                    <div className="flex gap-8"  id="container">
                        {Course_info.map(items=>(
                            <div key={items.id} className="w-full ">
                                <div  className="rounded-2xl  xl:w-96 2xl:w-99 ">
                                    <img className="rounded-t-2xl h-56 2xl:h-72" src={items.img} alt=""/>
                                    <div className="px-10 py-8 bg-white rounded-b-2xl">
                                        <div className="flex  h-20 overflow-hidden flex-wrap ">
                                            {items.type.map(list=>(
                                                <div key={list.content} className="bg-gray-200 rounded-full text-center text-gray-700 h-7 px-3 py-1 mr-2 mb-4 text-sm" >
                                                    {list.content}
                                                </div>
                                            ))}
                                        </div>
                                            <div className="line-clamp-2  text-xl h-14 mt-2">
                                                {items.h1}
                                            </div>
                                        <div className="flex mt-5 ">
                                            <Link href={items.link}>
                                                <a  target="_blank" className={items.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"} >
                                                    立刻报名
                                                </a>
                                            </Link>
                                            {/*<button onClick={()=>{Signup(items.img,items.h1)}}>*/}
                                            {/*    <div   className={items.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"} >*/}
                                            {/*        立刻报名*/}
                                            {/*    </div>*/}
                                            {/*</button>*/}
                                            <button >
                                                <div className={items.AboutStart?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"}>
                                                    即将开始
                                                </div>
                                            </button>

                                            <Link href={`/course_details/${items.id}`}>
                                                <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5" >
                                                    了解更多
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="w-full  xl:hidden">
                <div className="w-full flex relative overflow-x-auto snap-x snap-mandatory">
                    <div className="flex  ">
                        {Course_info.map(items=>(
                                        <div key={items.id} className="rounded-2xl snap-always snap-center md:snap-start w-90 mx-5">
                                            <img className="rounded-t-2xl h-52" src={items.img} alt=""/>
                                            <div className="px-10 py-8 bg-white rounded-b-2xl">
                                                <div className="flex  h-20 overflow-hidden  flex-wrap">
                                                    {items.type.map(list=>(
                                                        <div key={list.content} className="bg-gray-200 rounded-full text-center text-gray-700  h-7 px-3 py-1 mr-2 mb-4 text-sm" >
                                                            {list.content}
                                                        </div>
                                                    ))}
                                                </div>
                                                    <div className="line-clamp-2  h-12 mt-2">
                                                        {items.h1}
                                                    </div>
                                                <div className="flex mt-5 ">
                                                    <Link href={items.link}>
                                                        <a  target="_blank" className={items.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"} >
                                                            立刻报名
                                                        </a>
                                                    </Link>
                                                    <button >
                                                        <div className={items.AboutStart?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"}>
                                                            即将开始
                                                        </div>
                                                    </button>
                                                    <Link href={`/course_details/${items.id}`}>
                                                        <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5">
                                                            了解更多
                                                        </a>
                                                    </Link>
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

const Hackathons = ()=>{
    const Info1 = {
        state:"Ended",
        name:"WEB3 JAM ",
        time:"2022.06.17 - 2022.08.14",
        signUp:"",
        more:"https://www.notion.so/tintinland1/Web3-Jam-2022-Summer-0a0f85afb0db49cd9980cbdcc61f3101",
        img:"/hackathons/黑客松-1.png",

    }
    const Info2 = {
        state:"Ended",
        name:"Supernova Hackathon ",
        time:"2022.05.10 - 2022.06.20  ",
        signUp:"",
        more:"https://mp.weixin.qq.com/s/-xWsmrblKv5ygAQluPz-Mw",
        img:"/hackathons/黑客松-2.png",
    }
    const Info3 = {
        state:"Ended",
        name:"Warpspeed 2021 DFINITY×IAF ",
        time:"2021.11.15 -  2021.12.19 ",
        signUp:"",
        more:"https://mp.weixin.qq.com/s/e0QRDW7kxzBfgfx0NP4HSw",
        img:"/hackathons/黑客松-3.png",
    }
    return(
        <div id="Hackathons" className="pt-20 ">
            <div className="text-indigo-700 text-2xl">
                Hackathons
            </div>
            <div className="text-2xl md:text-4xl my-5">
                <div>
                    建立与全球开发者的联系，
                </div>
                <div>
                    一起组队玩转黑客松
                </div>
            </div>
            <div className="mb-5 text-sm md:text-base">
                <div>
                    用区块链技术创建 Web3 世界
                </div>
                <div>
                    协助开发者创建团队，提供技术指导，引入投资。
                </div>
            </div>
            <div className="flex justify-end md:-mt-10">
                <Link href="/hackathons">
                    <div className="flex  bg-white text-black rounded-full cursor-pointer text-sm items-center  px-4 py-1.5">
                        <div className="mr-1" >
                            查看更多
                        </div>
                        <div>
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </div>
                    </div>
                </Link>
            </div>
            <div className=" xl:flex mt-4 justify-between ">
                {/*大*/}
                <div className="relative  xl:w-10/12" >
                    <div className={classNames(HackathonsState[Info1.state]," flex justify-end right-4 mt-5 rounded-full px-3 py-1 border  absolute")}>
                        {Info1.state}
                    </div>
                    <img className="rounded-t-2xl" src={Info1.img} alt=""/>
                    <div className="px-10 py-8 bg-white rounded-b-2xl">
                        <div className="2xl:text-xl font-semibold xl:w-72 truncate">
                            {Info1.name}
                        </div>
                        <div className="font-light">
                            {Info1.time}
                        </div>
                        <div className="flex mt-5 2xl:mt-10 items-center">
                            <Link href={Info1.signUp}>
                                <a className={classNames(Info1.signUp?"":"hidden","text-xs 2xl:text-xl bg-black text-white rounded-full   px-8 py-2.5 mr-5")} target="_blank">
                                    立刻报名
                                </a>
                            </Link>

                            <Link href={Info1.more}>
                                <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5" target="_blank">
                                    了解更多
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-5 xl:mt-0 xl:w-5/12  xl:ml-4 2xl:ml-9     ">
                    {/*中*/}
                    <div className="">
                        <div className="relative ">
                            <div className={classNames(HackathonsState[Info2.state]," flex justify-end right-4 mt-5 rounded-full px-3 py-1 border  absolute")}>
                                {Info2.state}
                            </div>
                            <img className="rounded-t-2xl  w-full " src={Info2.img} alt=""/>
                            <div className="px-10 py-3  bg-white rounded-b-2xl">
                                <div className="2xl:text-xl font-semibold  truncate">
                                    {Info2.name}
                                </div>
                                <div className="font-light">
                                    {Info2.time}
                                </div>
                                <div className="flex mt-5 items-center">
                                    <Link href={Info2.signUp}>
                                        <a className={classNames(Info2.signUp?"":"hidden","text-xs 2xl:text-xl bg-black text-white rounded-full   px-8 py-2.5 mr-5")} target="_blank">
                                            立刻报名
                                        </a>
                                    </Link>

                                    <Link href={Info2.more}>
                                        <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5" target="_blank">
                                            了解更多
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*小*/}
                    <div className="mt-5 2xl:mt-9">
                        <div className="relative w-full ">
                            <div className={classNames(HackathonsState[Info3.state]," flex justify-end right-4 mt-5 rounded-full px-3 py-1  border absolute")}>
                               Ended
                            </div>
                            <div className="xl:flex  xl:items-center xl:justify-between bg-white rounded-2xl">

                                <img className="xl:hidden rounded-t-2xl xl:rounded-t-none xl:rounded-r-2xl  w-full h-80 " src={Info3.img} alt=""/>
                                <div className="pl-10 py-3 xl:py-0    ">
                                    <div className="2xl:text-xl font-semibold xl:w-48 2xl:w-56  truncate">
                                        {Info3.name}
                                    </div>
                                    <div className="font-light">
                                        {Info3.time}
                                    </div>
                                    <div className="flex mt-5">
                                        <Link href={Info2.signUp}>
                                            <a className={classNames(Info3.signUp?"":"hidden","text-xs 2xl:text-xl bg-black text-white rounded-full   px-8 py-2.5 mr-5")} target="_blank">
                                                立刻报名
                                            </a>
                                        </Link>
                                        <Link href={Info3.more}>
                                            <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5" target="_blank">
                                                了解更多
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <img className="rounded-t-2xl hidden xl:flex xl:rounded-t-none xl:rounded-r-2xl  xl:w-5/12 " src={Info3.img} alt=""/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Activity = ()=>{

    return(
        <div id="Activities"  className="pt-20">
            <div className="text-indigo-700 text-2xl">
                TinTin活动
            </div>
            <div className="text-2xl md:text-4xl my-5">
                <div>
                    与顶尖项目面对面讨论，
                </div>
                <div>
                    获得热点趋势与开发实战经验
                </div>
            </div>
            <div className="mb-5 text-sm md:text-base">
                <div>
                    最新的多链技术分享，众多赛道实时资讯
                </div>
                <div>
                    生态项目代码实操演练，与 Web3 领军人物现场讨论。
                </div>
            </div>
            <div className="flex justify-end md:-mt-10">
                <Link href="/meeting">
                    <div className="flex  bg-white text-black rounded-full cursor-pointer text-sm items-center  px-4 py-1.5">
                        <div className="mr-1 " >
                            查看更多
                        </div>
                        <div>
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </div>
                    </div>
                </Link>
            </div>
            <div className=" xl:flex  mt-4" >
                {/*大*/}
                <div className="hidden xl:block relative xl:w-1/2 2xl:w-7/12 " >
                    <div className="flex px-10 py-8 bg-white rounded-2xl  ">
                         <div className="my-auto  w-full">
                        <div className=" flex ">
                            <div className="rounded-full bg-gray-100 text-gray-700 px-2.5 py-0.5 text-sm">
                                {Activity_Info.TinTinLand.latestIssue.name}
                            </div>
                        </div>
                        <div className="text-2xl font-light mt-5">
                            {Activity_Info.TinTinLand.latestIssue.time}
                        </div>
                        <div className="font-semibold ">
                            {Activity_Info.TinTinLand.latestIssue.data}
                        </div>
                        <div className=" mt-4 mb-9 xl:my-9   items-center  xl:text-xl font-semibold line-clamp-4 h-20 xl:line-clamp-2  w-full  ">
                            {Activity_Info.TinTinLand.latestIssue.h1}
                        </div>
                            <div className="xl:flex 2xl:block w-full">
                                <img className="xl:flex 2xl:hidden rounded-xl mt-5   md:mt-0  md:mr-5 w-82 " src={Activity_Info.TinTinLand.latestIssue.img_T} alt=""/>
                                <img className="xl:hidden 2xl:flex rounded-2xl w-82 2xl:w-100  " src={Activity_Info.TinTinLand.latestIssue.img} alt=""/>
                                <div className="xl:ml-5  2xl:ml-0  flex  xl:mt-9 xl:justify-end  2xl:justify-start xl:items-end items-center">
                                    <div className="">
                                        <Link href={Activity_Info.TinTinLand.latestIssue.subscriptionLink}>
                                            <a className={Activity_Info.TinTinLand.latestIssue.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-7  py-2.5 mr-5 ":"hidden"}>
                                                订阅
                                            </a>
                                        </Link>
                                    </div>
                                    <div className=" text-sm">
                                        <Link href={`/meetingList/${Activity_Info.TinTinLand.latestIssue.type}`}>
                                            <a className="text-xs 2xl:text-xl text-black border border-black rounded-full px-4  py-2.5">
                                                了解更多
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="block xl:hidden relative  " >
                    <div className="flex flex-col-reverse md:flex-row p-8 bg-white rounded-2xl  items-center">
                        <div className="">
                            <div className="items-end ">
                              <img className="md:hidden xl:block rounded-xl mt-5  md:mt-0  md:mr-5 md:w-82" src={Activity_Info.TinTinLand.latestIssue.img_T} alt=""/>
                                <div className="md:hidden flex   mt-9  items-end items-center ">
                                    <div className="">
                                        <Link href={Activity_Info.TinTinLand.latestIssue.subscriptionLink}>
                                            <a className={Activity_Info.TinTinLand.latestIssue.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-10 py-2.5 mr-5 ":"hidden"}>
                                                订阅
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="xl:w-52 text-sm">
                                        <Link href={`/meetingList/${Activity_Info.TinTinLand.latestIssue.type}`}>
                                            <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5">
                                                了解更多
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full hidden  md:block xl:hidden">
                            <img className=" rounded-xl mt-5  md:mt-0  md:mr-5  " src={Activity_Info.TinTinLand.latestIssue.img} alt=""/>
                        </div>

                        <div className=" w-full md:pl-6">
                            <div className=" flex ">
                                <div className="rounded-full bg-gray-200 text-gray-700 px-2.5 py-0.5 text-sm">
                                    {Activity_Info.TinTinLand.latestIssue.name}
                                </div>
                            </div>
                            <div className="text-2xl font-light mt-5">
                                {Activity_Info.TinTinLand.latestIssue.time}
                            </div>
                            <div className="font-semibold">
                                {Activity_Info.TinTinLand.latestIssue.data}
                            </div>

                            <div className=" xl:text-xl font-semibold">
                                <div className=' mt-4 md:mb-8 items-center line-clamp-4 md:h-24 xl:line-clamp-3   2xl:w-90'>
                                    {Activity_Info.TinTinLand.latestIssue.h1}
                                </div>

                            </div>
                            <div className="hidden md:flex justify-between items-end ">
                                <div className="flex   items-center">
                                    <div className="  ">
                                        <Link href={Activity_Info.TinTinLand.latestIssue.subscriptionLink}>
                                            <a className={Activity_Info.TinTinLand.latestIssue.state?"text-xs 2xl:text-xl bg-black text-white rounded-full px-8 xl:px-10 py-2.5 mr-5 ":"hidden"}>
                                                订阅
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="  ">
                                        <Link href={`/meetingList/${Activity_Info.TinTinLand.latestIssue.type}`}>
                                            <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-4 xl:px-8 py-2.5">
                                                了解更多
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="my-auto mt-6 xl:mt-0 xl:w-1/2 xl:ml-4 2xl:ml-9 grid grid-cols-1  ">
                    {/*中*/}
                    <div className="relative  " >
                        <div className="flex flex-col-reverse md:flex-row p-8 bg-white rounded-2xl mx-auto items-center">
                            <div className="">
                                <div className="    items-end ">
                                 <img className=" md:hidden xl:block rounded-xl mt-5  md:mt-0  md:mr-5 md:w-82" src={Activity_Info.DTalk.latestIssue.img_T} alt=""/>
                                    <div className="md:hidden flex mt-9  items-end items-center ">
                                        <div className="">
                                            <Link href={Activity_Info.DTalk.latestIssue.subscriptionLink}>
                                                <a className={Activity_Info.DTalk.latestIssue.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-10 py-2.5 mr-5 ":"hidden"}>
                                                    订阅
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="xl:w-52 text-sm">
                                            <Link href={`/meetingList/${Activity_Info.DTalk.latestIssue.type}`}>
                                                <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5">
                                                    了解更多
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full hidden  md:block xl:hidden">
                                <img className=" rounded-xl mt-5  md:mt-0  md:mr-5  " src={Activity_Info.DTalk.latestIssue.img} alt=""/>
                            </div>

                            <div className=" w-full md:pl-6">
                                <div className=" flex ">
                                    <div className="rounded-full bg-gray-200 text-gray-700 px-2.5 py-0.5 text-sm">
                                        {Activity_Info.DTalk.latestIssue.name}
                                    </div>
                                </div>
                                <div className="text-2xl font-light mt-5">
                                    {Activity_Info.DTalk.latestIssue.time}
                                </div>
                                <div className="font-semibold">
                                    {Activity_Info.DTalk.latestIssue.data}
                                </div>

                                <div className=" xl:text-xl font-semibold">
                                    <div className=' mt-4 md:mb-8 xl:my-10 items-center line-clamp-4 md:h-24 xl:line-clamp-3   2xl:w-90'>
                                        {Activity_Info.DTalk.latestIssue.h1}
                                    </div>

                                </div>
                                <div className="hidden md:flex justify-between items-end  ">
                                    <div className="flex   items-center">
                                        <div className="  ">
                                            <Link href={Activity_Info.DTalk.latestIssue.subscriptionLink}>
                                                <a className={Activity_Info.DTalk.latestIssue.state?"text-xs 2xl:text-xl bg-black text-white rounded-full px-7   py-2.5 mr-5 ":"hidden"}>
                                                    订阅
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="  ">
                                            <Link href={`/meetingList/${Activity_Info.DTalk.latestIssue.type}`}>
                                                <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-4  py-2.5">
                                                    了解更多
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*小*/}
                    <div className="relative mt-4 2xl:mt-8  " >
                        <div className="flex flex-col-reverse md:flex-row 2xl:mt-0.5 p-8 bg-white rounded-2xl  items-center">
                            <div className="">
                                    <img className="md:hidden xl:block rounded-xl mt-5  md:mt-0  md:mr-5 md:w-82 " src={Activity_Info.TinTinMeeting.latestIssue.img_T} alt=""/>
                                    <div className="md:hidden flex   mt-9  items-end items-center ">
                                        <div className="">
                                            <Link href={Activity_Info.TinTinMeeting.latestIssue.subscriptionLink}>
                                                <a className={Activity_Info.TinTinMeeting.latestIssue.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-10 py-2.5 mr-5 ":"hidden"}>
                                                    订阅
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="xl:w-52 text-sm">
                                            <Link href={`/meetingList/${Activity_Info.TinTinMeeting.latestIssue.type}`}>
                                                <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-8 py-2.5">
                                                    了解更多
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                            </div>
                            <div className="w-full hidden  md:block xl:hidden">
                            <img className=" rounded-xl mt-5  md:mt-0  md:mr-5  " src={Activity_Info.TinTinMeeting.latestIssue.img} alt=""/>
                            </div>
                            <div className="w-full md:pl-6">
                                <div className=" flex ">
                                    <div className="rounded-full bg-gray-200 text-gray-700 px-2.5 py-0.5 text-sm">
                                        {Activity_Info.TinTinMeeting.latestIssue.name}
                                    </div>
                                </div>
                                <div className="text-2xl font-light mt-5">
                                    {Activity_Info.TinTinMeeting.latestIssue.time}
                                </div>
                                <div className="font-semibold">
                                    {Activity_Info.TinTinMeeting.latestIssue.data}
                                </div>

                                <div className=" xl:text-xl font-semibold">
                                    <div className=' mt-4 md:mb-8 xl:my-10 items-center line-clamp-4 md:h-24 xl:line-clamp-3   2xl:w-90'>
                                        {Activity_Info.TinTinMeeting.latestIssue.h1}
                                    </div>

                                </div>
                                <div className="hidden md:flex justify-between items-end ">
                                    <div className="flex   items-center">
                                        <div className="  ">
                                            <Link href={Activity_Info.TinTinMeeting.latestIssue.subscriptionLink}>
                                                <a className={Activity_Info.TinTinMeeting.latestIssue.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-7   py-2.5 mr-5 ":"hidden"}>
                                                    订阅
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="  ">
                                            <Link href={`/meetingList/${Activity_Info.TinTinMeeting.latestIssue.type}`}>
                                                <a className="text-xs 2xl:text-xl text-black border border-black rounded-full  px-4  py-2.5">
                                                    了解更多
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
        </div>
    )
}

const AboutUs = ()=>{
    return(
        <div id="About" className="pt-20">
            <div className="xl:flex justify-between items-center">

                <div className='xl:w-1/2  xl:mr-9'>
                    <div className="text-indigo-700 text-2xl ">
                        About Us
                    </div>
                    <div className="text-2xl xl:text-4xl 2xl:text-5xl my-5">
                        赋能下一代开发者的技术社区
                    </div>
                    <div className="2xl:mt-14 text-base 2xl:text-xl">
                        <div>
                            TinTinLand 是赋能下一代开发者的技术社区，能够通过聚集、培育、输送
                                开发者到各开放网络，共同定义并构建未来。
                        </div>
                        <div className="mt-5">
                            我们也将和行业有商业洞察力、有经验的开发者、社区、媒体合作，提供
                            技术课程、技术内容解读、AMA、线下开发者活动等。
                        </div>
                    </div>
                    <p className="mt-4 flex">
                        联系我们:
                        <a href="mailto:tintinland2022@gmail.com" className="cursor-pointer ml-1 text-blue-600">
                            tintinland2022@gmail.com
                    </a>
                    </p>

                </div>

                <div className="mt-5 xl:w-1/2">
                    <img className="rounded-xl w-full" src="/about us.png" alt=""/>
                </div>

            </div>

        </div>
    )
}

const Partner = () =>{

useEffect(()=>{

   const onload = () =>{

        const oDiv = document.getElementById('div1');

        const oUl = document.getElementsByTagName('ul')[0];

        const Li = oUl.getElementsByTagName('li');

        oUl.innerHTML = oUl.innerHTML+oUl.innerHTML;

        oUl.style.width = (Li[0].offsetWidth*Li.length)/16+'rem';

        const speed = 2

        function move(){

            if(oUl.offsetLeft<-oUl.offsetWidth/speed){
                oUl.style.left = '0'
            }
            if(oUl.offsetLeft>0){
                oUl.style.left = (-oUl.offsetWidth/speed)/16+'rem';
            }
         oUl.style.left = (oUl.offsetLeft-2)/16+0.05+'rem';//进行左横向滚动

        }
        let timer = setInterval(move,60)

        oDiv.onmouseover=function(){

            clearInterval(timer);

        }
        oDiv.onmouseout=function(){

            timer = setInterval(move,60)

        }

    }
    onload()
    },[])

   const  partner = [
       {
           href:"https://twitter.com/blocklikecom?s=20&t=l_Ve7fQVbE6so0EHlp9FbQ",
           img:"/partner/Blocklike-color.svg",
       },
       {
           href:"https://twitter.com/8BTC_OFFICIAL?s=20&t=16hIrZG9bvB0YvCzXzAerA",
           img:"/partner/defi之道-color.svg",
       },
       {
           href:"https://twitter.com/Foresight_News?s=20&t=A51w8xu6srB4VYPSysKX_A",
           img:"partner/Foresight-News-color.svg",
       },
       {
           href:"https://twitter.com/PANewsCN?s=20&t=A51w8xu6srB4VYPSysKX_A",
           img:"/partner/PANews-color.svg",
       },
       {
           href:"https://twitter.com/OdailyChina?s=20&t=l_Ve7fQVbE6so0EHlp9FbQ",
           img:"/partner/星球日报-color.svg",
       },
       {
           href:"https://twitter.com/TechFlowPost?s=20&t=16hIrZG9bvB0YvCzXzAerA",
           img:"/partner/深潮-color.svg",
       },
       {
           href:"https://twitter.com/MarsBit_CN?s=20&t=l_Ve7fQVbE6so0EHlp9FbQ",
           img:"/partner/火星财经-color.svg",
       },
       {
           href:"https://www.tuoluo.cn/",
           img:"/partner/陀螺科技-color.svg",
       },


   ]
    return(
        <div className="mt-20 mx-4 relative" id="div1">
            <div className="flex   relative overflow-hidden w-full h-20" >
                <ul className="flex mb-2 absolute">
                {partner.map(item=>(
                    <Link  key={item.img} href={item.href} >
                        <a target="_blank">
                    <li id="li" className='w-36   xl:w-44 bg-white rounded-xl mr-4 '>
                <img  className=" filter grayscale hover:grayscale-0  transition duration-300" src={item.img} />
                    </li>
                        </a>
                    </Link>
                ))}
                    {partner.map(item=>(
                        <Link  key={item.img} href={item.href} target="_blank">
                            <a target="_blank">
                            <li id="li" className='w-36   xl:w-44 bg-white rounded-xl mr-4 '>
                                <img  className=" filter grayscale hover:grayscale-0  transition duration-300" src={item.img} />
                            </li>
                            </a>
                        </Link>
                    ))}
                </ul>
            </div>

        </div>

    )

}

const Partner2 = () =>{

    useEffect(()=>{

      const onload = () =>{

            const Div2 = document.getElementById('div2');

            const UL2 = document.getElementsByTagName('h3')[0];

            const Li2 = UL2.getElementsByTagName('li');

            UL2.innerHTML = UL2.innerHTML+UL2.innerHTML;

            UL2.style.width = (Li2[0].offsetWidth*Li2.length)/16+'rem';

            const speed = 2

            function move2(){

                if(UL2.offsetLeft<-UL2.offsetWidth/speed){
                    UL2.style.left = '0'
                }
                if(UL2.offsetLeft>0){
                    UL2.style.left = (-UL2.offsetWidth/speed)/100+'rem';
                }
                // UL2.style.left = (UL2.offsetLeft-2)/16+'rem';//进行左横向滚动
                UL2.style.left = (UL2.offsetLeft)/16+0.05+'rem';//进行右横向滚动
            }
            let timer2 = setInterval(move2,60)

            Div2.onmouseover=function(){

                clearInterval(timer2);

            }
            Div2.onmouseout=function(){

                timer2 = setInterval(move2,60)

            }

        }
        onload()
    },[])

    const community = [
        {
            href:"https://learnblockchain.cn/",
            img:"/partner/登链社区-color.svg"
        },
        {
            href:"https://www.sunrecruitment.co.nz/",
            img:"/partner/APG-color.svg"
        },
        {
            href:"https://mp.weixin.qq.com/s/o4Q9US-Nl26s7gHhLDnPXw",
            img:"/partner/BTCU-高校区块链技术社区-color.svg"
        },
        {
            href:"https://www.sunrecruitment.co.nz/",
            img:"/partner/SUN-RECRUITMENT-color.svg"
        },
        {
            href:"https://twitter.com/ICPL_Community",
            img:"/partner/icpl.svg"
        },
        {
            href:"https://twitter.com/D_PlusCommunity?s=20&t=dtI_hlfd5jdBlz9weG-aDA",
            img:"/partner/Dplus-color.svg"
        },
        {
            href:"https://www.chainnode.com/",
            img:"/partner/ChainNode-color.svg"
        },
        {
            href:"https://twitter.com/EthereumCN?s=20&t=MyUrO-0Dh45O9tBhz7HBwA",
            img:"/partner/ECN-color.svg"
        },
        {
            href:"https://twitter.com/metatribe6465?s=20&t=-sX_ekTaDtBhgW0vt7JS_Q",
            img:"/partner/Metatribe-color.svg"
        },
        {
            href:"https://twitter.com/OneBlock_?s=20&t=MIkwh32a6Orf2f-2o60yHg",
            img:"/partner/oneblock-color.svg"
        },
        {
            href:"https://rebase.network/",
            img:"/partner/rebase-color.svg"
        },
        {
            href:"https://www.thublockchain.org/",
            img:"/partner/THUBA-color.svg"
        },
        {
            href:"https://twitter.com/ipfsnews2",
            img:"/partner/ipfsnews.svg"
        },



    ]
    return(
        <div className="mt-10 mx-4 relative">
            <div className="flex   relative overflow-hidden w-full h-16" id="div2" >
                <h3 className="flex mb-2 absolute" >
                    {community.map(item=>(
                        <Link key={item.img} href={item.href}>
                            <a target="_blank">
                        <li className='w-36 xl:w-44 bg-white rounded-xl mr-4 list-none'>
                            <img  className=" filter grayscale hover:grayscale-0  transition duration-300" src={item.img} />
                        </li>
                            </a>
                        </Link>
                    ))}
                    {community.map(item=>(
                        <Link key={item.img} href={item.href}>
                        <a target="_blank" >
                        <li key={item.img}   className='w-36 xl:w-44 bg-white rounded-xl mr-4 list-none '>
                            <img  className=" filter grayscale hover:grayscale-0  transition duration-300" src={item.img} />
                        </li>
                        </a>
                        </Link>
                    ))}
                </h3>
            </div>
        </div>

    )

}


const CommunityMember = () =>{
    useEffect(()=>{

        const onload = () =>{

            const Div3 = document.getElementById('div3');

            const UL3 = document.getElementsByTagName('h4')[0];

            const Li3 = UL3.getElementsByTagName('li');

            UL3.innerHTML = UL3.innerHTML+UL3.innerHTML;

            UL3.style.width = (Li3[0].offsetWidth*Li3.length)/15+'rem';

            const speed = 2

            function move3(){

                if(UL3.offsetLeft<-UL3.offsetWidth/speed){
                    UL3.style.left = '0'
                }
                if(UL3.offsetLeft>0){
                    UL3.style.left = (-UL3.offsetWidth/speed)/16+'rem';
                }
                UL3.style.left = (UL3.offsetLeft-2)/16+0.05+'rem';//进行左横向滚动
                // UL3.style.left = (UL3.offsetLeft)/16+0.05+'rem';//进行右横向滚动
            }
            let timer3 = setInterval(move3,60)

            Div3.onmouseover=function(){

                clearInterval(timer3);

            }
            Div3.onmouseout=function(){
                timer3 = setInterval(move3,60)
            }
        }
        onload()
    },[])
    const member = [
        {
            avatar:"people/Neo Liang.png",
            name:"Neo Liang",
            position:"Mixlabs创始人&SNZ技术合伙人",
            h1:"2016年进入区块链领域，主要从事底层架构和DApp开发，熟悉C/C++/objectc/Java/Go/Rust/Javascript等多种开发语言。",
        },
        {
            avatar:"people/赵杲.png",
            name:"赵杲",
            position:"MixLabs成员",
            h1:"后端工程师，Rust&Motoko开发者；具有1-2年的实际语言开发经验。",
        },
        {
            avatar:"people/James.png",
            name:"James",
            position:"Dmail Network CTO",
            h1:"精通Java/Python/Go等开发语言及其他相关技术框架，精通机器学习平台，大数据平台处理技术及相关框架。曾获得多项美国专利，美国国际计算机学会专业会员，美国电气和电子工程师协会专业会员。 ",
        },
        {
            avatar:"people/冯力全.png",
            name:"冯力全",
            position:"IC 社区开发者 ",
            h1:"熟悉Rust/Motoko等多种开发语言。",
        },
        {
            avatar:"people/Suzzy.png",
            name:"Suzzy",
            position:"Mix Labs区块链研发",
            h1:"擅长Java/Go/Motoko，正积极探索Rust。对区块链共识算法和Dapp开发有很大的兴趣，目前专注于IC生态 南开大学计算机专业硕士学位，具有3-5年的实际语言开发经验。 ",
        },
        {
            avatar:"people/Kevin.png",
            name:"Kevin",
            position:"独立游戏创作者",
            h1:"擅长智能合约开发及其漏洞分析，深入了解各种DeFi产品，目前在研究DeFi聚合套利。同时，也在学习和探索zk与游戏产品的结合，希望未来可以在IC上开发一款基于zk的独立游戏。曾获IOSG&ChainLink Hackathon 全球第二名，HackMoney Chainlink Grant，Polygon Grant等奖项。 ",
        },
        {
            avatar:"people/龙君昱.png",
            name:"龙君昱",
            position:"Primlabs motoko研发工程师 ",
            h1:"东北大学双控硕士研二，具有1年的实际语言开发经验。区块链技术爱好者，从事AI计算机视觉研究，主攻SNN方向。 ",
        },
        {
            avatar:"people/Neeboo.png",
            name:"Neeboo",
            position:"AstroX Network联合创始人",
            h1:"全栈工程师兼产品经理，连续创业者和跨行业应用经验，2018年至今为多条L1公链构建基础设施并获得Grant。 ",
        },
        {
            avatar:"people/Lenville.png",
            name:"Lenville",
            position:"自动驾驶研发工程师",
            h1:"前火币技术专家，具有5年以上的实际语言开发经验。",
        },
        {
            avatar:"people/陈昕炜.png",
            name:"陈昕炜",
            position:"PrimLabs Motoko开发工程师 ",
            h1:"东北大学 模式识别与智能系统专业硕士学位，具有3-5年的实际语言开发经验。区块链开发初学者，正在学习联邦学习与区块链结合的相关知识，并希望能够以此探索出Web3.0生态的全新领域。 ",
        },
        {
            avatar:"people/徐杨.png",
            name:"徐杨",
            position:"拓链科技CTO",
            h1:"十五年开发经历，深耕于区块链托管平台。对隐私计算，智能合约等技术兴趣浓厚。",
        },
        {
            avatar:"people/Harman.png",
            name:"Harman",
            position:"Primlabs Co-founder & 全栈研发工程师",
            h1:"东北大学计算机研一在读。熟悉Motoko/Java/JavaScript/Python等语言，正努力学习Rust等语言。对区块链web3有浓厚的探索欲望。",
        },
    ]
    return(
        <>
            <div className="w-full mt-10  mb-32">
                <div className="text-indigo-700 text-2xl mb-10">
                    社区成员
                </div>
                <div className=" xl:hidden   relative overflow-x-auto w-full h-64 snap-x snap-mandatory" >
                    <div className="flex  absolute mb-2">
                        {member.map(item=>(
                            <div key={item.name} className="rounded-2xl snap-always snap-start w-90 bg-white mr-8 p-5 list-none">
                                <div className="flex items-center">
                                    <img className="rounded-full w-16" src={item.avatar} alt=""/>
                                    <div className="ml-2">
                                        <div className='text-xl font-semibold'>
                                            {item.name}
                                        </div>
                                        <div>
                                            {item.position}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5  line-clamp-5">
                                    {item.h1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden xl:flex   relative overflow-hidden w-full h-64 " id="div3">
                    <h4 className="flex  absolute mb-2">
                        {member.map(item=>(
                            <li key={item.name} className="rounded-2xl snap-always snap-center w-96 bg-white mr-8 p-5 list-none">
                                <div className="flex items-center">
                                    <img className="rounded-full w-16" src={item.avatar} alt=""/>
                                    <div className="ml-2">
                                        <div className='text-xl font-semibold'>
                                            {item.name}
                                        </div>
                                        <div>
                                            {item.position}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 line-clamp-5">
                                    {item.h1}
                                </div>
                            </li>
                        ))}
                    </h4>
                </div>
            </div>
        </>
    )
}

const Home = () =>{
    return (

        <div className="mx-auto relative   sm:bg-fixed overflow-hidden"
             style={{backgroundImage:"url('/tintin-bg.png')"}}>
            <Heads/>
          <Header/>
            <div className=" lg:px-10 xl:px-20 relative px-5 pt-24    mx-auto ">

                <div className=" backdrop-blur-sm bg-white/60 w-full rounded-2xl py-10 px-5  md:px-10 ">
                    <div className="text-2xl md:text-4xl xl:text-6xl ">
                    <div>
                        A Global Web3.0 Dev DAO
                    </div>
                        <div>
                           for Builders,Entrepreneurs
                        </div>
                        <div>
                          and Enthusiasts
                        </div>
                    </div>
                    <div className="mt-10 text-xs md:text-sm">
                        <div>
                            赋能下一代开发者。
                        </div>
                        <div>
                            通过聚集、培育、输送开发者到各开放网络，共同定义并构建未来。
                        </div>
                    </div>
                </div>

                <Course/>
                <Hackathons/>
                <Activity/>

            </div>
            <div className="relative">
                <Partner/>
                <Partner2/>
            </div>
            <div className="lg:px-10 xl:px-20 relative px-5 mx-auto">
                <AboutUs/>
            </div>
            <div className="lg:px-10 xl:px-20 relative px-5 pt-16    mx-auto">
                <CommunityMember/>
            </div>
          <Loading/>
            <Pop_up_box/>
            <WaitPayPoPUpBox/>
            <SignUpCourseBox/>
            <Tail/>
      </div>


    )
}


export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['second-page', 'common',"footer","header"]),
    },
})

export default Home


