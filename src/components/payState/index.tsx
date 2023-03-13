import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";;
import {useAtom} from "jotai";
import {OpenPayState, PayState, PendingPayState} from "../../jotai";

const WaitPayPoPUpBox = () =>{
    const [openPayState,setOpenPayState] = useAtom(OpenPayState)
    const [payState,setPayState] = useAtom(PayState)

    const [time,setTime] = useAtom(PendingPayState)

    useEffect(()=>{
        if(payState =="pending"){
            setTime(120)
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
                <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto " onClose={()=>false}>

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
                                <Dialog.Panel className="bg-white px-4 py-5 sm:px-6 rounded-md">
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
                                                无法查询到您的支付结果
                                                <div className="text-red-600 font-semibold">
                                                    ( 如已经扣款但是没有报名成功 )
                                                </div>请联系xxxx@tintin.com 或查阅「TinTinLand 指南」。
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
                                </Dialog.Panel>


                        </Transition.Child>
                        </div>
                        </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}


export {WaitPayPoPUpBox}
