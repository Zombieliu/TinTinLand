import Header from "../../components/header";
import Tail from "../../components/tail";
import React, {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Activity_Info from "../../components/activity_info";
import Heads from "../../components/head";
import {client} from "../../client";
import {useAtom} from "jotai";
import {LoginState, OpenLoginState, PopUpBoxInfo, PopUpBoxState, UserEmail} from "../../jotai";
import {Dialog, Transition} from "@headlessui/react";
import {Pop_up_box} from "../../components/pop_up_box";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Course = () =>{
    const Course_info =
        [
            {
                id: "EVM_103",
                img: "/course/EVM_103.png",
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
                h1:"区块链入门课程——0基础创建以太坊智能合约",
                link: "https://hkr.xet.tech/s/Pe8p8",
                state: false,
                AboutStart:true,
            },
            {
                id: "EVM_102",
                img: "/course/EVM_102.png",
                type: [
                    {
                        content: "Solidity"
                    },
                    {
                        content: "The Graph"
                    },
                    {
                        content: "链上合约数据的读取与写入"
                    },
                    {
                        content: "合约安全"
                    },
                    {
                        content: "Arbitrum-sdk"
                    },

                ],
                h1: "第二期｜以太坊开发快速入门-轻松创建智能合约",
                link: "https://hkr.h5.xeknow.com/s/2yYwKx",
                state: false,
                AboutStart:false,
            },
            {
                id: "IC_103",
                img: "/course/IC_103.png",
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

                ],
                h1: "第3期｜Internet Computer：从核心技术入门到开发实战",
                link: "https://hkr.h5.xeknow.com/s/xRaCr",
                state: true,
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
                h1: "第一期｜Flow DApp开发入门课程——从初识Cadence到搭建Marketplace",
                link: "https://hkr.h5.xeknow.com/s/PGm9a",
                state: true,
                AboutStart:false,

            },
            {
                id: "IC_201",
                img: "/course/IC_201.png",
                type: [
                    {
                        content: "Motoko"
                    },
                    {
                        content: "Canister"
                    },
                    {
                        content: "ICP系统服务"
                    },
                    {
                        content: "Ti Jar"
                    },

                ],
                h1: "第一期｜Internet Computer：从核心技术入门到开发实战进阶",
                link: "",
                state: false,
                AboutStart:false,

            },
        ]
    const [loginState,] = useAtom(LoginState)
    const [user_email,] = useAtom(UserEmail)
    const [openLogin,setOpenLogin] =useAtom(OpenLoginState)
    const [pop_up_boxState,setSop_up_boxState] = useAtom(PopUpBoxState)
    const [pop_up_boxData,setPop_up_boxData] =useAtom(PopUpBoxInfo)

    const Signup = async (courseName) => {
        if(loginState){
            setOpenLogin(true)
            const CourseId = await client.callApi('v1/teachable/GetCourseId', {
                course_name:courseName
            });
            const TaUser = await client.callApi('v1/teachable/GetTaUser', {
                user_email: user_email.user_email
            });
            console.log(CourseId,TaUser)

            if (CourseId.res !==undefined && TaUser.res!==undefined) {
                if(CourseId.isSucc && TaUser.isSucc){
                    const data = await client.callApi('v1/teachable/EnrollCourse', {
                        course_id: CourseId.res.course_id,
                        user_id: TaUser.res.user_id
                    });
                    console.log(data)
                    if(data.isSucc){
                        setOpenLogin(false)
                        setPop_up_boxData({
                            state:true,
                            type:"报名",
                            title:"",
                        })
                        setSop_up_boxState(true)
                    }else {
                        setOpenLogin(false)
                        setPop_up_boxData({
                            state:false,
                            type:"报名",
                            title:"你已经报过该课程了",
                        })
                        setSop_up_boxState(true)
                    }

                }else {
                    setOpenLogin(false)
                    setPop_up_boxData({
                        state:false,
                        type:"报名",
                        title:"请检查网络",
                    })
                    setSop_up_boxState(true)
                }

                // console.log(CourseId.res.course_id,TaUser.res.user_id)
            }else {
                setOpenLogin(false)
                setPop_up_boxData({
                    state:false,
                    type:"报名",
                    title:"请检查网络",
                })
                setSop_up_boxState(true)
            }

        }
    }

    return (

        <div className="mx-auto relative bg-fixed overflow-hidden"
             style={{backgroundImage:"url('/tintin-bg.png')"}}>
            <Heads/>
            <Header/>
            <div className=" lg:px-10 xl:px-20 relative px-5 pt-24    mx-auto ">
                <div className="   p-10  rounded-xl  bg-left md:bg-cover overflow-hidden "  style={{backgroundImage:"url('/课程_bg.png')"}}>
                    <div className="">
                        <div className="text-[#5448AE] text-xl mb-5">
                            TinTin课程
                        </div>
                        <div className="text-4xl mb-5">
                        <div className="mb-2">
                            学习最前沿的 Web3 技术，
                        </div>
                        <div>
                            创造未来开放网络
                        </div>
                        </div>
                        <div className="text-xl ">
                            生态官方合作课程，项目 CTO &核心开发者亲自授课 <br/>配套高质量社群，全球一线开发者助教全程陪伴，社区同学交流讨论。
                        </div>
                        <button className="bg-black text-white px-4 py-2 rounded-full mt-5">
                            TinTin EDU
                        </button>
                    </div>
                </div>
                <div>
                    <div className="text-indigo-700 text-xl mt-10">
                        火热报名中🔥
                    </div>
                    <div className="mt-5 mb-20 grid md:grid-cols-2 xl:grid-cols-3  gap-10 ">
                        {Course_info.map(items=>(
                            <div key={items.id} className={classNames(items.state || items.AboutStart?"rounded-2xl  ":"hidden")}>
                                <img className="rounded-t-2xl" src={items.img} alt=""/>
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
                                        <button onClick={()=>Signup(items.h1)}>
                                            <div   className={items.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"} >
                                                立刻报名
                                            </div>
                                        </button>
                                        <button onClick={()=>Signup(items.h1)} >
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
                        ))}

                    </div>
                    <div className="text-indigo-700 text-xl mt-10">
                        往期回顾
                    </div>
                    <div className="mt-5 mb-20 grid md:grid-cols-2 xl:grid-cols-3  gap-10 ">
                        {Course_info.map(items=>(
                            <div key={items.id} className={classNames(items.state || items.AboutStart?"hidden":"rounded-2xl")}>
                                <img className="rounded-t-2xl" src={items.img} alt=""/>
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
                                            <a className={items.state?"text-xs 2xl:text-xl bg-black text-white rounded-full  px-8 py-2.5 mr-5":"hidden"}>
                                                立刻报名
                                            </a>
                                        </Link>

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
            <Transition.Root show={openLogin} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={()=>false}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center  justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="">

                                    <div className="animate-spin text-white">
                                        <i className="fa fa-spinner f-spin fa-2x fa-fw"></i>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Pop_up_box/>
            <Tail/>
        </div>


    )
}
export default Course
