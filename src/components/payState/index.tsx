import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import {CheckIcon} from "@heroicons/react/solid";
import {useAtom} from "jotai";
import {OpenPayState, PayState, PendingPayState} from "../../jotai";

const WaitPayPoPUpBox = () =>{
    const [openPayState,setOpenPayState] = useAtom(OpenPayState)
    const [payState,setPayState] = useAtom(PayState)

    const [time,setTime] = useAtom(PendingPayState)

    useEffect(()=>{
        if(payState =="pending"){
            setTime(10)
        }
    },[])
    let TimeOut
    useEffect(() => {
        TimeOut =   setTimeout(() => {
            if (time > 0) {
                setTime(time - 1);
            }else {
                setPayState("fail")
            }
        }, 1000);
        return ()=>clearTimeout(TimeOut)
    }, [time]);
    return(
        <>
            <Transition.Root show={openPayState} as={Fragment}>
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
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-3/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 rounded-md">
                                    <div className={payState=="pending"?"":"hidden"}>
                                    <div  className="flex justify-center">
                                    <img className="w-16" src="/payState/pending_60dp@2x.png" alt=""/>
                                    </div>

                                    <div className="flex justify-center mt-2 mb-10">
                                        等待返回支付结果中 （{time}s）
                                    </div>

                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => {setOpenPayState(false);clearTimeout(TimeOut)}}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                            已完成
                                        </button>
                                        <button  onClick={()=>clearTimeout(TimeOut)} className="bg-black border border-black text-white w-36 py-1.5 rounded-full mr-5">
                                            支付遇到问题
                                        </button>

                                    </div>
                                    </div>

                                    <div className={payState=="fail"?"":"hidden"}>
                                        <div className="flex justify-center">
                                            <img className="w-16" src="/payState/fail_60dp@2x.png" alt=""/>
                                        </div>
                                        <div className="text-center">
                                            <div>
                                                购买失败
                                            </div>
                                            <div className="font-light">
                                                无查询到您的支付结果，如需帮助请联系xxxx@tintin.com 或查阅「TinTinLand 指南」。
                                            </div>
                                        </div>


                                        <div className="flex justify-center mt-5">
                                            <button onClick={() => setOpenPayState(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                                关闭
                                            </button>
                                        </div>
                                    </div>


                                    <div className={payState=="done"?"":"hidden"}>
                                        <div className="flex justify-center">
                                            <img className="w-16" src="/payState/done_60dp@2x.png" alt=""/>
                                        </div>
                                        <div className="text-center">
                                            <div>
                                                购买成功
                                            </div>
                                            <div className="font-light">
                                                您已成功购买此课程，现在可进入www.tintinland.com进行课程学习。如需更多关于课程的信息，<br/>请查阅「TinTinLand 指南」。
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-5">
                                            <button onClick={() => setOpenPayState(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                                关闭
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}


export {WaitPayPoPUpBox}
