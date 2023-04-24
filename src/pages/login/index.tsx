import Header from "../../components/header";
import React, {useEffect, useState} from "react";
import {Router, useRouter} from "next/router";
import Heads from "../../components/head";
import {client} from "../../client";
import {Pop_up_box} from "../../components/pop_up_box";
import {useAtom} from "jotai";
import {PopUpBoxInfo, PopUpBoxState} from "../../jotai";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Login = () =>{
    const router = useRouter()
    const [emailType,setEmailType] = useState(true)
    const [emailNumber,setEmailNumber] =useState(false)
    const [loginState,setLoginState] = useState(false)
    const [,setPop_up_boxData] =useAtom(PopUpBoxInfo)
    const [,setSop_up_boxState] = useAtom(PopUpBoxState)
     function checkemail()
    {
        const email = (document.getElementById("email") as HTMLInputElement).value
        const expression = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let objExp = new RegExp(expression);
        if(objExp.test(email)==true){
            setEmailType(true)
            setEmailNumber(true)
        }
        else{
            setEmailType(false)
            setEmailNumber(false)
        }
    }
    const next =async () =>{
      if(emailNumber){
          // callApi
              setLoginState(true)
              const ret = await client.callApi('v1/email/SendEmail', {
                  email: (document.getElementById("email") as HTMLInputElement).value
              });

              if(ret.isSucc){
                  setLoginState(false)
                  await  router.push(
                      {
                          pathname:"/login/verify",
                          query:{email:(document.getElementById("email") as HTMLInputElement).value}
                      }
                  )
              }else {
                  setLoginState(false)
                  setPop_up_boxData({
                      state:false,
                      type:"发送验证码",
                      title: "请检查网络",
                      hash: ""
                  })
                  setSop_up_boxState(true)
              }
          }
    }

    return(
        <>
            <div className="mx-auto relative h-screen bg-no-repeat bg-center  sm:bg-fixed overflow-hidden"
                 style={{backgroundImage:"url('/tintin-bg.png')"}}>
                <Heads/>
                <Header/>
                <Pop_up_box/>
                <div className="min-h-full   flex flex-col  justify-center py-12 px-6 lg:px-8">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                        <div className=" backdrop-blur-sm bg-white/70 py-8 px-4 shadow rounded-lg sm:px-10 text-center sm:text-left pb-10 sm:pb-8">
                            <div className="text-4xl">
                                Welcome
                            </div>
                            <div className="mt-2 mx-16 sm:mx-0 mb-5 sm:mb-10 mt-5">
                                Welcome to TinTinLand! Please login with your email.
                            </div>

                                <div>
                                    <label htmlFor="email" className="sm:flex justify-between  text-center sm:text-left  font-medium text-gray-700">
                                        Email address
                                        <div className={classNames(emailType?"hidden":"text-red-400")}>
                                            Please enter a valid email.
                                        </div>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            onKeyDown={checkemail}
                                            onInput={checkemail}
                                            required
                                            placeholder="Enter your email"
                                            className={classNames(emailType?"outline-none":"border-red-400","outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none text-center sm:text-left  sm:text-sm")}
                                        />
                                    </div>
                                </div>
                                <div className={loginState?"hidden":"flex justify-center sm:justify-end mt-10"}>
                                    <button
                                        type="submit"
                                        onClick={next}
                                        className={classNames(emailType && emailNumber?"  text-white ":" text-gray-400 border-gray-400 cursor-not-allowed","bg-black w-28 flex justify-center py-2 px-4 border border-black  rounded-full shadow-sm text-sm font-medium items-center")}
                                    >
                                       <div >
                                           继续
                                       </div>
                                    </button>
                                </div>
                            <div className={loginState?"flex justify-center sm:justify-end mt-10":"hidden"}>
                                <button
                                    type="submit"
                                    className={classNames(emailType && emailNumber?" bg-black text-white ":" text-gray-400 border-gray-400 cursor-not-allowed","w-28 flex justify-center py-2 px-4 border border-black  rounded-full shadow-sm text-sm font-medium items-center")}
                                >
                                    <div className={" animate-spin"}><i className="fa fa-spinner f-spin fa-x fa-fw"></i></div>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login
