import Header from "../../../components/header";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {Router, useRouter} from "next/router";
import Heads from "../../../components/head";
import {useAtom} from "jotai";
import {LoginState, PromptBoxState, UserEmail,} from "../../../jotai";
import login from "../index";
import {client} from "../../../client";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Personal_info = () =>{
    const router = useRouter()
    const [emailType,setEmailType] = useState(true)
    const [emailNumber,setEmailNumber] =useState(false)
    const [,setLoginState] = useAtom(LoginState)
    const [userEmail,setUserEmail] =useAtom(UserEmail)
    const [nextState,setNextState] = useState(false)
    const [promptBox,setPromptBox] = useAtom(PromptBoxState)
    const checkNumber = async (e) =>{
        // e.target.value= e.target.value.replace(/[ ]/g,'')
        if (e.target.value.replace(/[ ]/g,'') =='') {

            setEmailNumber(false)
        }else {

            setEmailNumber(true)

        }
    }

    const next =async () =>{
        setNextState(true)
        if(!nextState){
            const ret = await client.callApi('v1/user/AddUser', {
                user_email: router.query.email as string,
                username: (document.getElementById("name") as HTMLInputElement).value,

            });

            if(ret.isSucc){
                const EnrollUser = await client.callApi('v1/teachable/EnrollUser', {
                    name: (document.getElementById("name") as HTMLInputElement).value,
                    email:  router.query.email as string,
                    password: "123456",
                    src: "test"
                });
                const AddWjUser = await client.callApi('v1/wj/AddWjUser', {
                   user_email: router.query.email as string,
                });
                const userName = {
                    username: (document.getElementById("name") as HTMLInputElement).value,
                    user_email: router.query.email as string,
                }
                setUserEmail(userName)
                setLoginState(true)
                setNextState(false)
                setPromptBox(true)
                await  router.push(
                    {
                        pathname:"/homepage",
                        // query:{email:(document.getElementById("email") as HTMLInputElement).value}
                    }
                )
            }else
            {
                setNextState(false)
                setEmailType(false)
            }
        }

    }

    return(
        <>
            <div className="mx-auto relative h-screen bg-no-repeat bg-center sm:bg-fixed overflow-hidden"
                 style={{backgroundImage:"url('/tintin-bg.png')"}}>
                <Heads/>
                <Header/>
                <div className="min-h-full flex flex-col  justify-center py-12 px-6 lg:px-8">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className=" backdrop-blur-sm bg-white/70 py-8 px-4 shadow rounded-lg text-center sm:text-left sm:px-10">
                            <div className="text-4xl">
                                基本信息
                            </div>
                            <div className="mt-2 mx-10 sm:mx-0 mb-5 sm:mb-10 mt-5">
                              离注册成功就差一步了，来设置您的用户名吧！
                            </div>
                            <div className="flex justify-center ">
                                <div className="relative ">
                                    <div className="w-20 h-20 rounded-full border border-gray-300 flex ">
                                        <img className="w-full rounded-full"  src="/login.png"  alt=""/>
                                    </div>
                                </div>

                            </div>
                            <div className="mt-4">
                                <label htmlFor="email" className="sm:flex justify-between  text-center sm:text-left  font-medium text-gray-700">
                                   用户名
                                    <div className={classNames(emailType?"hidden":"text-red-400")}>
                                       该ID已被注册
                                    </div>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        autoComplete="off"
                                        required
                                        placeholder="Enter your ID"
                                        onKeyUp={checkNumber}
                                        maxLength={24}
                                        className={classNames(emailType?"outline-none":"border-red-400","outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none text-center sm:text-left sm:text-sm")}
                                    />
                                </div>
                            </div>
                            <div className={nextState?"hidden":"flex  justify-center sm:justify-end mt-10"}>
                                <button
                                    type="submit"
                                    onClick={next}
                                    className={classNames(emailType && emailNumber?" bg-black text-white ":" text-gray-400 border-gray-400 cursor-not-allowed","w-24 flex justify-center py-2 px-4 border border-black  rounded-full shadow-sm text-sm font-medium")}
                                >
                                   <div className={nextState?"hidden":""}>注册</div>

                                </button>
                            </div>

                            <div className={nextState?"flex  justify-center sm:justify-end mt-10":"hidden"}>
                                <button
                                    type="submit"
                                    className={classNames(emailType && emailNumber?" bg-black text-white ":" text-gray-400 border-gray-400 cursor-not-allowed","w-24 flex justify-center py-2 px-4 border border-black  rounded-full shadow-sm text-sm font-medium")}
                                >
                                    <div className="animate-spin ">
                                        <i className="fa fa-spinner f-spin  fa-fw">
                                        </i>
                                    </div>
                                </button>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Personal_info
