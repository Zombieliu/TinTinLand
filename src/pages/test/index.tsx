import {Dialog,Transition} from "@headlessui/react";
import {useAtom} from "jotai";
import React, {Fragment, useEffect, useState} from "react";
import {ConnectButton, useAccountModal, useConnectModal} from "@rainbow-me/rainbowkit";
import {useAccount} from 'wagmi'
import {CheckIcon} from "@heroicons/react/solid";
import {OpenLoginState, OpenPayState, PayState, PendingPayState, PopUpBoxInfo, PopUpBoxState} from "../../jotai";
import {Pop_up_box} from "../../components/pop_up_box";
import Loading from "../../components/loading";
import { WaitPayPoPUpBox} from "../../components/payState";
import {router} from "next/client";

export default function App() {
    const { address, isConnected } = useAccount()
    //获取登陆状态 和地址
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const [connectWallet,setConnectWallet] = useState(false)


    const [freeCourse1,setFreeCourse1] =useState(false)
    const [freeCourse2,setFreeCourse2] =useState(false)
    const [freeCourse3,setFreeCourse3] =useState(false)

    const [paidCourse1,setPaidCourse1] =useState(false)
    const [paidCourse2,setPaidCourse2] =useState(false)
    const [paidCourse3,setPaidCourse3] =useState(false)

    //点击上课提醒框
    const [promptBox,setPromptBox] = useState(false)
    const [,setPop_up_boxData] =useAtom(PopUpBoxInfo)
    const [,setSop_up_boxState] = useAtom(PopUpBoxState)

    const [openLogin,setOpenLogin] =useAtom(OpenLoginState)


    const [,setOpenPayState] = useAtom(OpenPayState)
    const [,setPayState] = useAtom(PayState)
    const [,setTime] = useAtom(PendingPayState)
    const [promptTime,setPromptTime] = useState(0)
    useEffect(()=>{
        setConnectWallet(false)
    // 登陆后关闭提醒框
    },[openConnectModal])


    let TimeOut
    useEffect(() => {
        TimeOut =   setTimeout(() => {
            if (promptTime > 0) {
                setPromptTime(promptTime - 1);
            }else {
                setPromptBox(false)
            }
        }, 1000);
        return ()=>clearTimeout(TimeOut)
    }, [promptTime]);

    const receive = (bool) =>{
        if(isConnected){
            if(bool){
                setFreeCourse1(true)
            }else {
                setPaidCourse1(true)
            }

        }else {
            setConnectWallet(true)
        }
    }

    const ConnectWallet = async () =>{
        if(!isConnected){
            openConnectModal()
        }else {
            alert("已经连接")
        }
    }
    const claim = () =>{
        setOpenLogin(true)
        setTimeout(function(){
                setOpenLogin(false)
            setPop_up_boxData({
                state:true,
                type:"领取NFT",
                title:"",
                hash: "12312"
            })
            setSop_up_boxState(true)
            setFreeCourse2(false),
                setFreeCourse3(true)
            },
            3000);


    }

    const claimNFTAndTuition = () =>{
        setOpenLogin(true)
        setTimeout(function(){
                setOpenLogin(false)
                setPop_up_boxData({
                    state:true,
                    type:"领取NFT",
                    title:"",
                    hash: "12312"
                })
                setSop_up_boxState(true)
                setPaidCourse2(false),
                    setPaidCourse3(true)
            },
            3000);
    }

    const goSchool = ()=>{
       setPromptBox(true)
        setPromptTime(10)
        setTimeout(()=>{
            window.open("https://www.google.com/", "_blank")
        },3000)

    }
    return (
        <>

            <Pop_up_box/>
            <Loading/>
            <WaitPayPoPUpBox/>
            <div className="flex mt-10 justify-center">
                <ConnectButton  accountStatus="address"/>
            </div>
            <div className="flex mt-10 justify-center">
                <button onClick={()=>receive(true)} className="rounded-full mx-10  px-4 py-1 bg-black text-white mt-20">
                  免费版  领取奖励
                </button>

                <button onClick={()=>receive(false)} className="rounded-full  px-4 py-1 bg-black text-white mt-20">
                    付费版  领取奖励
                </button>
            </div>

            <div className="flex mt-5 justify-center">
                <button onClick={()=>{setOpenPayState(true);setPayState("pending");setTime(10)}} className="rounded-full mx-10  px-4 py-1 bg-black text-white mt-20">
                   付款等待界面
                </button>

                <button onClick={()=>{setOpenPayState(true);setPayState("fail")}} className="rounded-full mx-10 px-4 py-1 bg-black text-white mt-20">
                    付款失败界面
                </button>

                <button onClick={()=>{setOpenPayState(true);setPayState("done")}} className="rounded-full mx-10 px-4 py-1 bg-black text-white mt-20">
                    付款成功界面
                </button>

            </div>

            <Transition.Root show={promptBox} as={Fragment}>
                <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={setPromptBox}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-3/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 rounded-md ">
                                    <div className="flex justify-center">
                                    <img className="rounded-full w-14 h-14" src="/tintinlogo.svg" alt=""/>
                                    </div>
                                    <div className='text-center my-5 text-sm'>
                                        正在为你打开www.tintin school.com <br/>您将需要账号密码登陆
                                    </div>
                                    <div className='text-sm text-center'>
                                        账号密码在您首次注册TinTinLand时发送的邮件中，如需重新发送，
                                        <br/>
                                        <div className="flex justify-center">
                                            请点击
                                            <div className="text-indigo-800">
                                            重新发送
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => setPromptBox(false)}  className="bg-white border border-black text-black w-32 py-1.5 rounded-full mr-5">
                                            关闭 {promptTime}s
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={connectWallet} as={Fragment}>
                <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={setConnectWallet}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-3/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 lg:px-12 rounded-md">
                                    {/*<div className='flex justify-end text-xl font-light text-black 	mb-5 items-centers'>*/}
                                    {/*    <button   onClick={() => setConnectWallet(false)}*/}
                                    {/*              className="fa fa-times  outline-none" aria-hidden="true"></button>*/}
                                    {/*</div>*/}
                                    <div className="flex justify-center">
                                        <div>
                                            <img src="/award/wallet_60dp.png" alt=""/>
                                        </div>
                                    </div>

                                    <div className="text-center mt-2 ">
                                        恭喜你完成
                                        <div className="my-2">
                                            BLABLA课程名称
                                        </div>
                                        <div className="text-gray-600 text-sm font-light">
                                            如需领取奖励，请先前往个人中心绑定钱包
                                        </div>
                                    </div>


                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => setConnectWallet(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                            取消
                                        </button>
                                        <button  onClick={ConnectWallet} className="bg-black border border-black text-white w-36 py-1.5 rounded-full mr-5">
                                            绑定钱包
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={freeCourse1} as={Fragment}>
                <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={setFreeCourse1}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 rounded-md">
                                    <div className='flex justify-between text-xl font-light text-black 	mb-5 items-centers'>
                                        <div className="font-normal">
                                            领取奖励
                                        </div>
                                        <button   onClick={() => setFreeCourse1(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <nav aria-label="Progress">
                                        <ol role="list" className="flex justify-center items-center">
                                            <li  className='relative flex justify-between w-1/2'>
                                                <div className="flex flex-col items-center">
                                                    <div className="absolute inset-0 bottom-6 flex items-center w-full" aria-hidden="true">
                                                        <div className="h-0.5 w-full mx-4 bg-gray-200" />
                                                    </div>
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full  bg-black">
                                                        <CheckIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">介绍</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full ">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-black font-semibold" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">领取NFT</span>
                                                </div>

                                                <div className="flex flex-col items-center ">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full ">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-black" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">完成</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>

                                    <div className="text-center mt-5 rounded-lg py-6 h-80  bg-gradient-to-b from-[#E64145]/5   to-[#2823F0]/10">
                                        <div className="">
                                            恭喜你完成
                                        </div>
                                        <div className="my-2  text-xl">
                                            BLABLA课程名称
                                        </div>
                                        <div className=" text-sm mt-10">
                                            你将获得由TinTin Land颁发的课程NFT，请根据指引完成领取吧
                                        </div>
                                        <div className="text-sm  mt-8">
                                            此NFT将被记录至你的TinTinLand的数字身份，
                                            <br/>
                                            <div className="flex  justify-center">
                                            领取后可进入<div className="text-indigo-800">个人主页</div>  查看
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => setFreeCourse1(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                            取消
                                        </button>
                                        <button  onClick={()=>{
                                            setFreeCourse1(false),
                                                setFreeCourse2(true)
                                        }} className="bg-black border border-black text-white w-36 py-1.5 rounded-full mr-5">
                                            下一步
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={freeCourse2} as={Fragment}>
                <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={()=>false}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 rounded-md">
                                    <div className='flex justify-between text-xl font-light text-black 	mb-5 items-centers'>
                                        <div className="font-normal">
                                            领取奖励
                                        </div>
                                        <button   onClick={() => setFreeCourse2(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <nav aria-label="Progress">
                                        <ol role="list" className="flex justify-center items-center">
                                            <li  className='relative flex justify-between w-1/2'>
                                                <div className="flex flex-col items-center">
                                                    <div className="absolute inset-0 bottom-6 flex items-center w-full" aria-hidden="true">
                                                        <div className="h-0.5 w-full mx-4 bg-gray-200" />
                                                    </div>
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full  bg-black">
                                                        <CheckIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">介绍</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full   bg-black">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-black font-semibold">领取NFT</span>
                                                </div>

                                                <div className="flex flex-col items-center ">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full ">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-black" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">完成</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>

                                    <div className="text-center mt-5 rounded-lg py-6 h-80  bg-gradient-to-b from-[#E64145]/5   to-[#2823F0]/10">
                                        <div className="">
                                            确认领取
                                        </div>

                                        <div className="font-light  mt-5">
                                            课程名称 NFT 将发送中下方地址
                                        </div>
                                        <div className="text-xs md:text-sm xl:text-lg mt-2 font-semibold">
                                            {address}
                                        </div>
                                        <div className="flex justify-center my-2">
                                            <img className="w-36 h-36 " src="/award/tintin_nft.png" alt=""/>
                                        </div>

                                        <div className="  text-sm ">
                                            确认无误后请点击领取
                                        </div>
                                    </div>


                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => setFreeCourse2(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                            取消
                                        </button>
                                        <button  onClick={claim} className="bg-black border border-black text-white w-36 py-1.5 rounded-full mr-5">
                                            领取
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={freeCourse3} as={Fragment}>
                <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={setFreeCourse3}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 rounded-md">
                                    <div className='flex justify-between text-xl font-light text-black 	mb-5 items-centers'>
                                        <div className="font-normal">
                                            领取奖励
                                        </div>
                                        <button   onClick={() => setFreeCourse3(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <nav aria-label="Progress">
                                        <ol role="list" className="flex justify-center items-center">
                                            <li  className='relative flex justify-between w-1/2'>
                                                <div className="flex flex-col items-center">
                                                    <div className="absolute inset-0 bottom-6 flex items-center w-full" aria-hidden="true">
                                                        <div className="h-0.5 w-full mx-4 bg-gray-200" />
                                                    </div>
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full  bg-black">
                                                        <CheckIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">介绍</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full  bg-black">
                                                        <CheckIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">领取NFT</span>
                                                </div>

                                                <div className="flex flex-col items-center ">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-black">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                                                    </div>
                                                    <span className="text-sm mt-1  text-black font-semibold">完成</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>

                                    <div className="text-center mt-5 rounded-lg py-6 h-80  bg-gradient-to-b from-[#E64145]/5   to-[#2823F0]/10">
                                        <div className="">
                                            领取成功
                                        </div>
                                        <div className="t  mt-5 flex justify-center">
                                            恭喜您领取成功，现在可进入
                                            <div className="text-indigo-800">
                                                个人主页
                                            </div>
                                            查看NFT
                                        </div>
                                        <div>
                                            关于TinTin Land NFT更多信息，请查阅XXXX
                                        </div>

                                        <div className="flex justify-center my-2">
                                            <img className="w-36 h-36 " src="/award/tintin_nft.png" alt=""/>
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => setFreeCourse3(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                            关闭
                                        </button>


                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={paidCourse1} as={Fragment}>
                <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={setPaidCourse1}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 rounded-md">
                                    <div className='flex justify-between text-xl font-light text-black 	mb-5 items-centers'>
                                        <div className="font-normal">
                                            领取奖励
                                        </div>
                                        <button   onClick={() => setPaidCourse1(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <nav aria-label="Progress">
                                        <ol role="list" className="flex justify-center items-center">
                                            <li  className='relative flex justify-between w-1/2'>
                                                <div className="flex flex-col items-center">
                                                    <div className="absolute inset-0 bottom-6 flex items-center w-full" aria-hidden="true">
                                                        <div className="h-0.5 w-full mx-4 bg-gray-200" />
                                                    </div>
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full  bg-black">
                                                        <CheckIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">介绍</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full ">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-black font-semibold" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">领取NFT</span>
                                                </div>

                                                <div className="flex flex-col items-center ">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full ">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-black" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">完成</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>

                                    <div className="text-center mt-5 rounded-lg py-6 h-80  bg-gradient-to-b from-[#E64145]/5   to-[#2823F0]/10">
                                        <div className="">
                                            恭喜你完成
                                        </div>
                                        <div className="my-2  text-xl">
                                            BLABLA课程名称
                                        </div>
                                        <div className=" text-sm mt-10">
                                            <div>
                                                你将获得全额的学费退款
                                            </div>
                                            及由TinTin Land颁发的课程NFT，请根据指引完成领取吧
                                        </div>
                                        <div className="text-sm  mt-10">
                                            此NFT将被记录至你的TinTinLand的数字身份，
                                            <br/>
                                            <div className="flex  justify-center">
                                                领取后可进入<div className="text-indigo-800">个人主页</div>  查看
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => setPaidCourse1(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                            取消
                                        </button>
                                        <button  onClick={()=>{
                                            setPaidCourse1(false),
                                                setPaidCourse2(true)
                                        }} className="bg-black border border-black text-white w-36 py-1.5 rounded-full mr-5">
                                            下一步
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={paidCourse2} as={Fragment}>
                <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={()=>false}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 rounded-md">
                                    <div className='flex justify-between text-xl font-light text-black 	mb-5 items-centers'>
                                        <div className="font-normal">
                                            领取奖励
                                        </div>
                                        <button   onClick={() => setPaidCourse2(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <nav aria-label="Progress">
                                        <ol role="list" className="flex justify-center items-center">
                                            <li  className='relative flex justify-between w-1/2'>
                                                <div className="flex flex-col items-center">
                                                    <div className="absolute inset-0 bottom-6 flex items-center w-full" aria-hidden="true">
                                                        <div className="h-0.5 w-full mx-4 bg-gray-200" />
                                                    </div>
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full  bg-black">
                                                        <CheckIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">介绍</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full   bg-black">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-black font-semibold">领取NFT</span>
                                                </div>

                                                <div className="flex flex-col items-center ">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full ">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-black" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">完成</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>

                                    <div className="text-center mt-5 rounded-lg py-6 h-80  bg-gradient-to-b from-[#E64145]/5   to-[#2823F0]/10">
                                        <div className="">
                                            确认领取
                                        </div>

                                        <div className="font-light  mt-5">
                                            课程名称 NFT 及 Balal 学费 888 USDT 将发送中下方地址
                                        </div>
                                        <div className="text-xs md:text-sm xl:text-lg mt-2 font-semibold">
                                            {address}
                                        </div>
                                        <div className="flex justify-center my-2">
                                            <img className="w-36 h-36 " src="/award/tintin_nft.png" alt=""/>
                                        </div>
                                        <div className="  text-sm ">
                                            确认无误后请点击领取
                                        </div>
                                    </div>


                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => setPaidCourse2(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                            取消
                                        </button>
                                        <button  onClick={claimNFTAndTuition} className="bg-black border border-black text-white w-36 py-1.5 rounded-full mr-5">
                                            领取
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={paidCourse3} as={Fragment}>
                <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={setPaidCourse3}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 rounded-md">
                                    <div className='flex justify-between text-xl font-light text-black 	mb-5 items-centers'>
                                        <div className="font-normal">
                                            领取奖励
                                        </div>
                                        <button   onClick={() => setPaidCourse3(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <nav aria-label="Progress">
                                        <ol role="list" className="flex justify-center items-center">
                                            <li  className='relative flex justify-between w-1/2'>
                                                <div className="flex flex-col items-center">
                                                    <div className="absolute inset-0 bottom-6 flex items-center w-full" aria-hidden="true">
                                                        <div className="h-0.5 w-full mx-4 bg-gray-200" />
                                                    </div>
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full  bg-black">
                                                        <CheckIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />

                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">介绍</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full  bg-black">
                                                        <CheckIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                                                    </div>
                                                    <span className="text-sm mt-1 text-gray-500">领取NFT</span>
                                                </div>

                                                <div className="flex flex-col items-center ">
                                                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-black">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                                                    </div>
                                                    <span className="text-sm mt-1  text-black font-semibold">完成</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>

                                    <div className="text-center mt-5 rounded-lg py-6 h-80  bg-gradient-to-b from-[#E64145]/5   to-[#2823F0]/10">
                                        <div className="text-xl">
                                            登记成功
                                        </div>
                                        <div className="mt-5">
                                            我们将在3个工作日内将课程NFT及课程奖金发放至您的钱包账户
                                        </div>
                                        <div>
                                            关于TinTin Land NFT更多信息，请查阅XXXX
                                        </div>
                                        <div className="flex justify-center my-2">
                                            <img className="w-36 h-36 " src="/award/tintin_nft.png" alt=""/>
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => setPaidCourse3(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                            关闭
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    );
}
