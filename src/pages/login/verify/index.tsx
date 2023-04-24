import Header from "../../../components/header";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Heads from "../../../components/head";
import {client} from "../../../client";
import {logger} from "bs-logger";
import login from "../index";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Verify = () =>{
    const router = useRouter()
    const [nextState,SetNextState] = useState(false)
    const [verifyState,SetVerifyState] =useState(true)
    const [hidden,setHidden] = useState(false)
    const [time,setTime] = useState(0)
    let TimeOut
    useEffect(() => {
        TimeOut =  setTimeout(() => {
            if (time > 0) {
                setTime(time - 1);
            }else {
                setHidden(false)
            }
        }, 1000);
        return ()=>clearTimeout(TimeOut)
    }, [time]);

    const checkNumber = async (e) =>{
        SetVerifyState(true)
        e.target.value = e.target.value.toString().match(/^\d+(?:.\d{0,8})?/)
        if (e.target.value.indexOf('.') < 0 && e.target.value != '') {
            e.target.value = parseFloat(e.target.value);
        }
        const inp1 = (document.getElementById("inpo1") as HTMLInputElement).value
        const inp2 = (document.getElementById("inpo2") as HTMLInputElement).value
        const inp3 = (document.getElementById("inpo3") as HTMLInputElement).value
        const inp4 = (document.getElementById("inpo4") as HTMLInputElement).value
        const inp5 = (document.getElementById("inpo5") as HTMLInputElement).value
        const inp6 = (document.getElementById("inpo6") as HTMLInputElement).value
        if(inp1 && inp2 && inp3 && inp4 && inp5 && inp6){
            SetNextState(true)
        }else {
            SetNextState(false)
        }
    }

    const send = async () =>{
        if(!hidden){
            setHidden(true)
            setTime(60);
            SetNextState(false);
            SetVerifyState(true);
         const data =  await client.callApi('v1/email/SendEmail', {
                email: router.query.email as string,
            });

             (document.getElementById("inpo1") as HTMLInputElement).value = "";
             (document.getElementById("inpo2") as HTMLInputElement).value = "";
             (document.getElementById("inpo3") as HTMLInputElement).value = "";
             (document.getElementById("inpo4") as HTMLInputElement).value = "";
             (document.getElementById("inpo5") as HTMLInputElement).value = "";
             (document.getElementById("inpo6") as HTMLInputElement).value = "";
             (document.getElementById("inpo1") as HTMLInputElement).focus();


        }
    }


    const goToNext =async () =>{
        const code = (document.getElementById("inpo1") as HTMLInputElement).value
            +(document.getElementById("inpo2") as HTMLInputElement).value
        +(document.getElementById("inpo3") as HTMLInputElement).value
        +(document.getElementById("inpo4") as HTMLInputElement).value
        +(document.getElementById("inpo5") as HTMLInputElement).value
        +(document.getElementById("inpo6") as HTMLInputElement).value;


        const ret = await client.callApi('v1/email/CheckEmail', {
            email: router.query.email as string,
            code:code
        });

        if(ret.res.state){
            await  router.push(
                {
                    pathname:"/login/personal_info",
                    query:{email:router.query.email}
                }
            )
        }else {
            SetVerifyState(false)
        }


        }

   async function  inp1_onkeyup(e){
       await  checkNumber(e)
        if ((document.getElementById("inpo1") as HTMLInputElement).value.length == 1) {
            document.getElementById('inpo2').focus()
        }

    }
   async  function inp2_onkeyup(e){
        await  checkNumber(e)
        if((document.getElementById("inpo2") as HTMLInputElement).value.length==1){
            document.getElementById('inpo3').focus()
        }
    }
   async function inp3_onkeyup(e){
        await  checkNumber(e)
        if((document.getElementById("inpo3") as HTMLInputElement).value.length==1){
            document.getElementById('inpo4').focus()

        }
    }
   async function inp4_onkeyup(e){
       await  checkNumber(e)
        if((document.getElementById("inpo4") as HTMLInputElement).value.length==1){
            document.getElementById('inpo5').focus()

        }
    }
   async  function inp5_onkeyup(e){
      await  checkNumber(e)
        if((document.getElementById("inpo5") as HTMLInputElement).value.length==1){
            document.getElementById('inpo6').focus()
        }
    }
   async  function inp6_onkeyup(e){
        await  checkNumber(e)

    }

    return (
        <>
            <div className="mx-auto relative h-screen bg-no-repeat bg-center  sm:bg-fixed overflow-hidden"
                 style={{backgroundImage: "url('/tintin-bg.png')"}}>
                <Heads/>
                <Header/>
                <div className="min-h-full flex flex-col  justify-center py-12 px-6 lg:px-8 ">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className=" backdrop-blur-sm bg-white/70 py-8 px-4 shadow rounded-lg sm:px-10">
                            <div className="text-4xl ">
                                验证
                            </div>
                            <div className="mt-2 text-sm mb-5 mt-5">
                                为确认您的身份，我们已将您的验证码发送至
                                {router.query.email}
                            </div>
                            <label  className="flex justify-between text-sm font-medium text-gray-700">
                               验证码
                                <div className={classNames(verifyState?"hidden":"text-red-400")}>
                                   验证码无效，请重试
                                </div>
                            </label>
                            <div className="mt-1 ">
                                <form action="" method="POST" className="flex justify-between transition duration-500">
                                    <input id="inpo1" type="text" maxLength={1} name="inp1"
                                           className={classNames(verifyState?"border-gray-400":"border-2 border-red-400","border w-12 sm:w-14 h-16 sm:h-20 rounded-lg text-center text-4xl")}
                                           autoFocus={true}
                                           autoComplete="off"
                                           onKeyUp={inp1_onkeyup}/>

                                    <input id="inpo2" type="text" maxLength={1} name="inp2"
                                           className={classNames(verifyState?"border-gray-400":"border-2 border-red-400","border w-12 sm:w-14 h-16 sm:h-20 rounded-lg text-center text-4xl")}  autoComplete="off"
                                           onKeyUp={inp2_onkeyup}/>

                                    <input id="inpo3" type="text" maxLength={1} name="inp3"
                                           className={classNames(verifyState?"border-gray-400":"border-2 border-red-400","border w-12 sm:w-14 h-16 sm:h-20 rounded-lg text-center text-4xl")} autoComplete="off"
                                           onKeyUp={inp3_onkeyup}/>
                                    <input id="inpo4" type="text" maxLength={1} name="inp4"
                                           className={classNames(verifyState?"border-gray-400":"border-2 border-red-400","border w-12 sm:w-14 h-16 sm:h-20 rounded-lg text-center text-4xl")}autoComplete="off"
                                           onKeyUp={inp4_onkeyup}/>

                                    <input id="inpo5" type="text" maxLength={1} name="inp5"
                                           className={classNames(verifyState?"border-gray-400":"border-2 border-red-400","border w-12 sm:w-14 h-16 sm:h-20 rounded-lg text-center text-4xl")}autoComplete="off"
                                           onKeyUp={inp5_onkeyup}/>
                                    <input id="inpo6" type="text" maxLength={1} name="inp6"
                                           className={classNames(verifyState?"border-gray-400":"border-2 border-red-400","border w-12 sm:w-14 h-16 sm:h-20 rounded-lg text-center text-4xl")}autoComplete="off"
                                           onKeyUp={inp6_onkeyup}
                                    />
                                </form>
                            </div>
                            <div className="flex justify-center sm:justify-end mt-5 mb-12">
                                <button
                                    type="submit"
                                    onClick={goToNext}
                                    className={classNames(nextState?" bg-black text-white ":" text-gray-400 border-gray-400 cursor-not-allowed","transition-all duration-500 w-24 flex justify-center py-2 px-4 border border-black  rounded-full shadow-sm text-sm font-medium")}  >
                                    继续
                                </button>
                            </div>
                            <div className="mt-5 border-t border-gray-300 text-indigo-700 text-sm">
                                <div className="flex items-center">
                                <button onClick={send} className={classNames(hidden?"cursor-not-allowed":"","py-3")}  >
                                重新发送验证码
                                </button>
                                    <div className={classNames(hidden?"":"hidden","ml-2")}>
                                        {time}s
                                    </div>
                                </div>
                                <Link href="/login">
                                    <a className="">
                                        使用其他邮箱登陆
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Verify
