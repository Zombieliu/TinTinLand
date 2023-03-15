import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import {atom, useAtom} from "jotai";
import {
    PopUpBoxState,
    PopUpBoxInfo,
    PromptBoxState,
    SignUpCourseBoxState,
    SignUpCourseBoxData,
    LoginState, UserEmail, OpenLoginState, OpenPayState, PayState, PendingPayState,
} from "../../jotai";
import Link from "next/link";
import {client} from "../../client";
import {useAccount, useNetwork, usePrepareSendTransaction, useSendTransaction, useSignMessage} from "wagmi";
import {ConnectButton, useChainModal, useConnectModal} from "@rainbow-me/rainbowkit";
import {verifyMessage} from "ethers/lib/utils";
import {BigNumber} from "ethers";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Pop_up_box = () =>{
    const [pop_up_boxState,setSop_up_boxState] = useAtom(PopUpBoxState)
    const [pop_up_boxData,] =useAtom(PopUpBoxInfo)
    let time
    useEffect(()=>{
        clearTimeout(time)
        if(pop_up_boxState){
            time = setTimeout(()=>{
                setSop_up_boxState(false)
               // if(pop_up_boxData.state){
               //     location.reload()
               // }
            },6000)
        }
        const Pop_up_box = document.getElementById('SwapSuccessPop_up_box');
        Pop_up_box.onmouseover = function(){
            clearInterval(time);
        }
        Pop_up_box.onmouseout = function(){
            time = setTimeout(()=>{
                setSop_up_boxState(false)
                // if(pop_up_boxData.state){
                //     location.reload()
                // }
            },3000)
        }
    },[pop_up_boxState])
    return(
        <div
            id="SwapSuccessPop_up_box"
            aria-live="assertive"
            className="pointer-events-none z-50 fixed inset-0 top-10 flex items-end px-4 py-6 sm:items-start sm:p-6 "
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                <Transition
                    show={pop_up_boxState}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="pointer-events-auto  w-full max-w-sm overflow-hidden rounded-lg text-black bg-[#FFFFFF] shadow-lg shadow-[0_2px_16px_-1px_rgb(0,0,0,0.1)] ">
                        <div className="p-4">
                            <div className="flex items-center">
                                <img className={pop_up_boxData.state?"w-10  mt-1":"hidden"} src="/successful.svg" alt=""/>
                                <img className={pop_up_boxData.state?"hidden":"w-10  mt-1"} src="/fail.png" alt=""/>
                                <div className="ml-3 w-0 flex-1 pt-0.5 text-black text-sm">
                                    <p className="font-medium">{pop_up_boxData.type}{classNames(pop_up_boxData.state?"成功":"失败")}</p>
                                    <p className={pop_up_boxData.state?"hidden":"mt-1 text-xs"}>{pop_up_boxData.title}</p>
                                    <div className={pop_up_boxData.hash == ""? "hidden":""}>
                                        <Link legacyBehavior href={`https://mumbai.polygonscan.com/tx/${pop_up_boxData.hash}`} target="_Blank">
                                            <a className={"mt-1 underline font-semibold text-black"}
                                               target="_Blank">
                                                在浏览器中查看
                                            </a></Link>

                                    </div>
                                </div>

                                <div className="-mt-4 flex flex-shrink-0">
                                    <button
                                        type="button"
                                        className="inline-flex rounded-md  text-black hover:text-gray-500 focus:outline-none "
                                        onClick={() => {
                                            setSop_up_boxState(false)
                                            // if(pop_up_boxData.state){
                                            //     location.reload()
                                            // }
                                        }}
                                    >
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                        <span className="sr-only">Close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    )
}


const PromptBox = () =>{
    const [promptBox,setPromptBox] = useAtom(PromptBoxState)

    const [promptTime,setPromptTime] = useState(0)
    let TimeOut

    useEffect(()=>{
        setPromptTime(10)
    },[])

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
    return(
        <>
            <Transition.Root show={promptBox} as={Fragment}>
                <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto " onClose={setPromptBox}>
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
                                        <img className="  h-24" src="/画板%2011@2x.png" alt=""/>
                                    </div>
                                    <div className='text-center my-5 text-sm'>
                                        欢迎来到TinTin Land
                                    </div>
                                    <div className='text-sm text-center'>
                                        一封包含TinTIn Land指南及你的账户信息的邮件已发送至你关联的邮箱，请注意查收

                                    </div>
                                    <div className="flex justify-center mt-5">
                                        <button onClick={() => setPromptBox(false)}  className="bg-white border border-black text-black w-32 py-1.5 rounded-full mr-5 outline-none">
                                            关闭 {promptTime}s
                                        </button>
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


const SignUpCourseBox = () =>{
    const [signUpCourseBox,setSignUpCourseBox] = useAtom(SignUpCourseBoxState)
    const [signUpCourseData,setSignUpCourseData] =useAtom(SignUpCourseBoxData)
    const [loginState,] = useAtom(LoginState)
    const [user_email,] = useAtom(UserEmail)
    const [,setOpenLogin] =useAtom(OpenLoginState)
    const [,setSop_up_boxState] = useAtom(PopUpBoxState)
    const [,setPop_up_boxData] =useAtom(PopUpBoxInfo)
    const [,setOpenPayState] = useAtom(OpenPayState)
    const [,setPayState] = useAtom(PayState)
    const [,setTime] = useAtom(PendingPayState)

    const { address, isConnected } = useAccount()
    const { openConnectModal } = useConnectModal();
    const { chain,} = useNetwork()
    const { openChainModal } = useChainModal();

    const {signMessage:PaySignMessage } = useSignMessage({
        message: 'Give me all the Pay  money',
        async onSuccess(data, variables) {
            const address = verifyMessage(variables.message, data)
            const singerState = await client.callApi('v1/user/AddUserBind', {
                user_email:user_email.user_email,
                user_evm_address: address,
            });
            if(singerState.isSucc){
                await PayRegisterCourses()
            }else {
                alert("绑定失败钱包请重试")
            }
        },
        onError(){
            setOpenLogin(false)
            setPop_up_boxData({
                state: false,
                type: "签名",
                title: "",
                hash: ""
            })
            setSop_up_boxState(true)
        }
    })
    const {signMessage:FreeSignMessage } = useSignMessage({
        message: 'Give me all the Free money',
        async onSuccess(data, variables) {
            const address = verifyMessage(variables.message, data)
            const singerState = await client.callApi('v1/user/AddUserBind', {
                user_email:user_email.user_email,
                user_evm_address: address,
            });
            if(singerState.isSucc){
                await FreeRegisterCourses()
            }else {
                alert("绑定失败钱包请重试")
            }
        },
        onError(){
            setOpenLogin(false)
            setPop_up_boxData({
                state: false,
                type: "签名",
                title: "",
                hash: ""
            })
            setSop_up_boxState(true)
        }
    })

    const { config } = usePrepareSendTransaction({
        request: { to: '0x5F008811D7f065058a1b38f3c04e39a60C8CA28d', value: BigNumber.from('1000000000000000') },
    })
    const {sendTransaction } = useSendTransaction({
        ...config,
        async onSuccess(data) {
            setOpenLogin(false)
            setOpenPayState(true);setPayState("pending");setTime(120)
            const CourseId = await client.callApi('v1/teachable/GetCourseId', {
                course_name: signUpCourseData.courseName
            });
            const TaUser = await client.callApi('v1/teachable/GetTaUser', {
                user_email: user_email.user_email
            });
            const singerState = await client.callApi('v1/tx/CheckTx', {
                course_id: CourseId.res.course_id,
                tx_hash: data.hash,
                user_id: TaUser.res.user_id,
            });
            if(singerState.isSucc){
                setOpenPayState(true);setPayState("done");
            }else {
                // setPop_up_boxData({
                //     state: false,
                //     type: "报名",
                //     title: "请检查网络",
                //     hash: ""
                // })
                // setSop_up_boxState(true)
                setOpenPayState(true);setPayState("fail");
            }
        },
        async onError(){
            setOpenLogin(false)
            setPop_up_boxData({
                state: false,
                type: "交易",
                title: "请检查账号",
                hash: ""
            })
            setSop_up_boxState(true)
            setOpenPayState(true);setPayState("fail");
        }
    })

    const PaySignup = async () => {

        if(loginState){
            if(isConnected){
                setOpenLogin(true)
                const singerState = await client.callApi('v1/user/GetUserBind', {
                    user_email:user_email.user_email,
                });
                if(!singerState.isSucc){
                    await PaySignMessage()
                }else {
                    if(singerState.res.user_evm_address == address){
                        if(!chain.unsupported){
                            await PayRegisterCourses()
                        }else {
                            setOpenLogin(false)
                            openChainModal()
                        }
                    }else {
                        setOpenLogin(false)
                        setPop_up_boxData({
                            state: false,
                            type: "购买",
                            title: `请切换到到${singerState.res.user_evm_address}地址进行交易`,
                            hash: ""
                        })
                        setSop_up_boxState(true)
                    }
                }

            }else {
                openConnectModal()
            }

        }else {
            alert("请先登陆账号")
        }
    }
    const PayRegisterCourses = async () =>{
        const CourseId = await client.callApi('v1/teachable/GetCourseId', {
            course_name: signUpCourseData.courseName
        });
        const TaUser = await client.callApi('v1/teachable/GetTaUser', {
            user_email: user_email.user_email
        });

        console.log(CourseId.res,TaUser.res)
        if (CourseId.res !== undefined && TaUser.res !== undefined) {
            if (CourseId.isSucc && TaUser.isSucc) {
                sendTransaction?.()
            } else {
                setOpenLogin(false)
                setPop_up_boxData({
                    state: false,
                    type: "报名",
                    title: "请检查网络",
                    hash: ""
                })
                setSop_up_boxState(true)
            }
            // console.log(CourseId.res.course_id,TaUser.res.user_id)
        } else {
            setOpenLogin(false)
            setPop_up_boxData({
                state: false,
                type: "报名",
                title: "请检查网络",
                hash: ""
            })
            setSop_up_boxState(true)
        }
        setSignUpCourseBox(false)
    }
    const FreeRegisterCourses = async () => {

        const courseName = signUpCourseData.courseName
        const CourseId = await client.callApi('v1/teachable/GetCourseId', {
            course_name: courseName
        });
        const TaUser = await client.callApi('v1/teachable/GetTaUser', {
            user_email: user_email.user_email
        });

        console.log(CourseId, TaUser)

        if (CourseId.res !== undefined && TaUser.res !== undefined) {
            if (CourseId.isSucc && TaUser.isSucc) {
                const data = await client.callApi('v1/teachable/EnrollCourse', {
                    course_id: CourseId.res.course_id,
                    user_id: TaUser.res.user_id
                });
                console.log(data)
                if (data.isSucc) {
                    setOpenLogin(false)
                    setOpenPayState(true);setPayState("done");
                } else {
                    setOpenLogin(false)
                    setPop_up_boxData({
                        state: false,
                        type: "报名",
                        title: "你已经报过该课程了",
                        hash: ""
                    })
                    setSop_up_boxState(true)
                }

            } else {
                setOpenLogin(false)
                setPop_up_boxData({
                    state: false,
                    type: "报名",
                    title: "请检查网络",
                    hash: ""
                })
                setSop_up_boxState(true)
            }

            // console.log(CourseId.res.course_id,TaUser.res.user_id)
        } else {
            setOpenLogin(false)
            setPop_up_boxData({
                state: false,
                type: "报名",
                title: "请检查网络",
                hash: ""
            })
            setSop_up_boxState(true)
        }
        setSignUpCourseBox(false)
    }
    const FreeSignup = async () => {

        if(loginState){
            if(isConnected){
                setOpenLogin(true)
                const singerState = await client.callApi('v1/user/GetUserBind', {
                    user_email:user_email.user_email,
                });
                console.log(singerState.isSucc)
                if(!singerState.isSucc){
                   await FreeSignMessage()
                }else {
                    if(singerState.res.user_evm_address == address){
                        await FreeRegisterCourses()
                    }else {
                        setOpenLogin(false)
                        setPop_up_boxData({
                            state: false,
                            type: "购买",
                            title: `请切换到到${singerState.res.user_evm_address}地址进行交易`,
                            hash: ""
                        })
                        setSop_up_boxState(true)
                    }
                }
            }else {
                openConnectModal()
            }
        }else {
            alert("请先登陆账号")
        }
    }
    return(
        <>

            <Transition.Root show={signUpCourseBox} as={Fragment}>

                <div className="fixed z-40 inset-0 overflow-y-auto " >
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
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
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

                            <div className="inline-block align-bottom p-0.5   w-11/12 md:w-5/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">

                                <div className="bg-white px-4 py-5 sm:px-6 rounded-md">

                                    <div className='flex justify-between text-xl font-light text-black 	mb-5 items-centers'>
                                        <div className="font-normal">
                                            报名课程
                                        </div>

                                        <button   onClick={() => setSignUpCourseBox(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <img className="rounded-t-lg w-full h-72" src={signUpCourseData.img} alt=""/>

                                    <div className="text-center  rounded-b-lg py-8  bg-[#000000]/10 px-10">
                                        此课程学费为 USDT价格，完成课程后您将获得全额的USDT返还 您可以选择下方任意支付方式进行课程购买
                                        <div className="flex justify-center mt-5">
                                            <ConnectButton  accountStatus="address"  />
                                        </div>
                                        <div className="flex mt-5 justify-between  mx-20">
                                            <button className="  ">
                                                <img  className="rounded-lg w-12 h-12 mx-auto" src="/支付宝.png" alt=""/>
                                                <div>
                                                    {Number(signUpCourseData.price) *6.6}元
                                                </div>
                                            </button>

                                            <button onClick={PaySignup}>
                                                <img  className="rounded-lg w-12 h-12 mx-auto" src="/rainbow.svg" alt=""/>
                                                <div>
                                                    {signUpCourseData.price}USDT
                                                </div>
                                            </button>
                                            <button onClick={FreeSignup}>
                                                <img  className="rounded-lg w-12 h-12 mx-auto" src="/rainbow.svg" alt=""/>
                                                <div>
                                                    免费报名
                                                </div>
                                            </button>
                                        </div>

                                    </div>


                                    <div className="flex justify-center mt-5">

                                        <button onClick={() => setSignUpCourseBox(false)}  className="bg-white border border-black text-black w-28 py-1.5 rounded-full mr-5">
                                            取消
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition.Root>
        </>
    )
}


export {Pop_up_box,PromptBox,SignUpCourseBox}
