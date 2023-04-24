import Header from "../../components/header";
import Tail from "../../components/tail";
import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Listbox, Switch, Tab, Transition} from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import Heads from "../../components/head";
import {client} from "../../client";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {OpenLoginState, PopUpBoxInfo, PopUpBoxState, UserEmail} from "../../jotai";
import {user} from "../../shared/interface/user";
import {Pop_up_box} from "../../components/pop_up_box";
import {ConnectButton, useChainModal, useConnectModal} from "@rainbow-me/rainbowkit";
import Loading from "../../components/loading";
import {useAccount, useNetwork} from "wagmi";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const nation = [
    { id: 1, name: '中国' },
    { id: 2, name: '美国' },

]
const Role = [
    { id: 1, name: '开发' },
    { id: 2, name: '设计' },

]
const Experience = [
    { id: 1, name: '一年不到' },
    { id: 2, name: '刚来' },
]

const UserInfo = () =>{
    const router = useRouter();
    const [emailType,setEmailType] = useState(true)
    const [userNameType,setUserNameType] = useState(true)
    const [selectedNation, setSelectedNation] = useState(nation[0])
    const [selectedRole, setSelectedRole] = useState(Role[0])
    const [selectedExperience, setSelectedExperience] = useState(Experience[0])
    const [enabled, setEnabled] = useState(false)
    const [user_email,] = useAtom(UserEmail)
    const [saveState,setSaveState] = useState(false)
    const [,setPop_up_boxData] =useAtom(PopUpBoxInfo)
    const [,setSop_up_boxState] = useAtom(PopUpBoxState)
    const [openWallet,setOpenWallet] =useState(false)
    useEffect(() => {
        if(router.isReady){
            const query = async() =>{
                const ret = await client.callApi('v1/user/GetUser', {
                    user_email: user_email.user_email
                });
                if(ret.isSucc){
                    const data = ret.res.user;
                    (document.getElementById("userName") as HTMLInputElement).value = data.username;
                    (document.getElementById("userEmail") as HTMLInputElement).value = data.user_email;
                    (document.getElementById("description") as HTMLInputElement).value = data.description;

                    const NationIndex =  nation.find( o => o.name ===data.country);
                    setSelectedNation(NationIndex?nation[NationIndex.id - 1]:nation[0]);

                    const RoleIndex =  Role.find( o => o.name ===data.roles);
                    setSelectedRole(RoleIndex?Role[RoleIndex.id - 1]:Role[0]);

                    const ExperienceIndex =  Experience.find( o => o.name ===data.experience);
                    setSelectedExperience(ExperienceIndex?Experience[ExperienceIndex.id - 1]:Experience[0]);

                    (document.getElementById("achievements") as HTMLInputElement).value = data.achievements;
                    (document.getElementById("Twitter") as HTMLInputElement).value = data.twitter;
                    (document.getElementById("Github") as HTMLInputElement).value = data.github;
                    (document.getElementById("Telegram") as HTMLInputElement).value = data.telegram;
                    setEnabled(data.privacy)


                }

            }
            query()
        }
    },[router.isReady])

    function checkEmail()
    {
        const email = (document.getElementById("userEmail") as HTMLInputElement).value
        const expression = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let objExp = new RegExp(expression);
        if(objExp.test(email)==true){
            setEmailType(true)
        }
        else{
            setEmailType(false)
        }
    }

    const checkNumber = async (e) =>{
        // e.target.value= e.target.value.replace(/[ ]/g,'')
        if (e.target.value.replace(/[ ]/g,'') =='') {
            setUserNameType(false)
        }else {
            setUserNameType(true)

        }
    }




    const Revise = async () => {
        setSaveState(true)
        const user:user = {
            username:(document.getElementById("userName") as HTMLInputElement).value,
            user_email:(document.getElementById("userEmail") as HTMLInputElement).value,
            user_course_passport:"",
            twitter:  (document.getElementById("Twitter") as HTMLInputElement).value,
            telegram: (document.getElementById("Telegram") as HTMLInputElement).value,
            roles:selectedRole.name,
            privacy:enabled,
            github:(document.getElementById("Github") as HTMLInputElement).value,
            experience:selectedExperience.name,
            description:(document.getElementById("description") as HTMLInputElement).value,
            country:selectedNation.name,
            achievements:(document.getElementById("achievements") as HTMLInputElement).value,
        }
        const ret = await client.callApi('v1/user/UpdateUser', {
            user
        });
        if(ret.isSucc){
            setSaveState(false)
            setPop_up_boxData({
                state:true,
                type:"保存",
                title:"",
                hash: ""
            })
            setSop_up_boxState(true)
            // location.reload();

        }else {
            setSaveState(false)
            setPop_up_boxData({
                state:false,
                type:"保存",
                title:"请重试",
                hash: ""
            })
            setSop_up_boxState(true)
        }
    }
    return(
        <>

                <div className="mx-auto sm:rounded-lg  mt-2 sm:max-w-xl w-full pb-16">

                    {/*基本信息*/}
                    <div className="bg-[#F9F9FB] rounded-xl p-5 mt-4">
                        <div className="text-xl font-semibold">
                            基本信息
                        </div>
                        <div className="text-gray-500 text-sm">
                            简单介绍自己，以便于别人了解你
                        </div>

                        {/*    用户名*/}
                        <div className="mt-2">
                            <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700 mt-4 ">
                                用户名
                                <div className={classNames(userNameType?"hidden":"text-red-400")}>
                                    请填入正确的ID
                                </div>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userName"
                                    autoComplete="off"
                                    required
                                    placeholder="Enter your ID"
                                    onKeyUp={checkNumber}
                                    maxLength={24}
                                    className={classNames(userNameType?"outline-none":"border-red-400","outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500   sm:text-sm")}
                                />
                            </div>
                        </div>
                        {/*    邮箱地址*/}
                        <div className="mt-2">
                            <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700">
                                邮箱地址
                                <div className={classNames(emailType?"hidden":"text-red-400")}>
                                    请检查你的邮箱格式
                                </div>
                            </label>
                            <div className="mt-1">
                                <input
                                    id="userEmail"
                                    name="email"
                                    type="email"
                                    autoComplete="off"
                                    readOnly={true}
                                    onKeyDown={checkEmail}
                                    onInput={checkEmail}
                                    required
                                    placeholder="Enter your email"
                                    className={classNames(emailType?"outline-none":"border-red-400","outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm")}
                                />
                            </div>
                        </div>
                        {/*    简介*/}
                        <div className="mt-2">
                            <label htmlFor="email" className=" flex justify-between text-sm font-medium text-gray-700">
                                简介
                            </label>
                            <div className="mt-1">
                                                <textarea
                                                    rows={4}
                                                    name="description"
                                                    id="description"
                                                    autoComplete="off"
                                                    className="p-1 shadow-sm outline-none block w-full sm:text-sm border-gray-300 rounded-md resize-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="请介绍你自己吧"
                                                    defaultValue={''}
                                                    maxLength= {300}
                                                />
                            </div>
                        </div>

                        {/*    选择国家*/}
                        <div className="mt-2">
                            <Listbox value={selectedNation} onChange={setSelectedNation}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Label className="block text-sm font-medium text-gray-700">国家</Listbox.Label>
                                        <div className="mt-1 relative">
                                            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">{selectedNation.name}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                    {nation.map((nation) => (
                                                        <Listbox.Option
                                                            key={nation.id}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={nation}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                        {nation.name}
                                                                                    </span>
                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'text-white' : 'text-indigo-600',
                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                            )}
                                                                        >
                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                        {/*    选择Web3角色*/}
                        <div className="mt-2">
                            <Listbox value={selectedRole} onChange={setSelectedRole}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Label className="block text-sm font-medium text-gray-700">Web3角色</Listbox.Label>
                                        <div className="mt-1 relative">
                                            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">{selectedRole.name}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                    {Role.map((items) => (
                                                        <Listbox.Option
                                                            key={items.id}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={items}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                        {items.name}
                                                                                    </span>
                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'text-white' : 'text-indigo-600',
                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                            )}
                                                                        >
                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                        {/*    选择经验*/}
                        <div className="mt-2">
                            <Listbox value={selectedExperience} onChange={setSelectedExperience}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Label className="block text-sm font-medium text-gray-700">经验</Listbox.Label>
                                        <div className="mt-1 relative">
                                            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">{selectedExperience.name}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                    {Experience.map((items) => (
                                                        <Listbox.Option
                                                            key={items.id}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={items}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                        {items.name}
                                                                                    </span>
                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'text-white' : 'text-indigo-600',
                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                            )}
                                                                        >
                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                    </div>
                    {/*成就*/}
                    <div className="bg-[#F9F9FB] rounded-xl p-5 mt-4">
                        <div className="mt-2">
                            <label htmlFor="email" className=" ">
                                <div className=" font-medium text-gray-700">
                                    成就
                                </div>
                                <div className="text-gray-500 text-sm">
                                    分享更多关于你的经历
                                </div>
                            </label>
                            <div className="mt-1">
                                                <textarea
                                                    rows={4}
                                                    name="achievements"
                                                    id="achievements"
                                                    autoComplete="off"
                                                    className="p-1 shadow-sm outline-none block w-full sm:text-sm border-gray-300 rounded-md resize-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="你的经历与成就"
                                                    maxLength= {300}
                                                />
                            </div>
                        </div>
                    </div>
                    {/*社交账号*/}
                    <div className="bg-[#F9F9FB] rounded-xl p-5 mt-4">
                        <div className="mt-2">
                            <label htmlFor="email" className=" ">
                                <div className=" font-medium text-gray-700">
                                    社交账号
                                </div>
                                <div className="text-gray-500 text-sm">
                                    让大家在网络上找到你
                                </div>
                            </label>
                            {/*twitter*/}
                            <div className="mt-2">
                                <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700">
                                    Twitter
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="Twitter"
                                        required
                                        autoComplete="off"
                                        placeholder="Twitter"
                                        className="outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                                    />
                                </div>
                            </div>
                            {/*github*/}
                            <div className="mt-2">
                                <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700">
                                    GitHub
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="Github"
                                        required
                                        autoComplete="off"
                                        placeholder="Github"
                                        className="outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none  focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            {/*telegram*/}
                            <div className="mt-2">
                                <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700">
                                    Telegram
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="Telegram"
                                        required
                                        autoComplete="off"
                                        placeholder="Telegram"
                                        className="outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*连接钱包*/}
                    <div className="bg-[#F9F9FB] rounded-xl p-5 mb-20 sm:mb-0  mt-4 ">
                        <div className="mt-2">
                            <div  className="flex justify-between items-center ">
                                <div className=" font-medium text-gray-700">
                                    钱包绑定
                                </div>
                                <div className="text-gray-700 flex  items-center">
                                    <ConnectButton  accountStatus="address"  />
                                    {/*<button onClick={()=>{setOpenWallet(true)}}*/}
                                    {/*        className="bg-white border border-black text-black rounded-full py-1 px-3 mr-5 w-24">*/}
                                    {/*    绑定钱包</button>*/}

                                </div>
                            </div>
                        </div>
                    </div>
                    {/*隐私*/}
                    <div className="bg-[#F9F9FB] rounded-xl p-5 mb-20 sm:mb-0  mt-4 ">
                        <div className="mt-2">
                            <div  className="flex justify-between items-center ">
                                <div className=" font-medium text-gray-700">
                                    隐私设置
                                </div>
                                <div className="text-gray-700 flex  items-center">
                                    <div className="mr-2">
                                        公开我的主页
                                    </div>
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
                                        className={classNames(
                                            enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
                                        )}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            className={classNames(
                                                enabled ? 'translate-x-5' : 'translate-x-0',
                                                'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                            )}
                                        >
        <span
            className={classNames(
                enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
        >
          <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
            className={classNames(
                enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
        >
          <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mx-4 mt-5 md:mt-10">
                        {/*<button onClick={()=>location.reload()} className="bg-white border border-black text-black rounded-full py-1 px-3 mr-5 w-24">取消</button>*/}
                        <button onClick={Revise} className="bg-black text-white rounded-full py-1 px-3 w-24 flex justify-center ">
                            <div>
                                保存
                            </div>

                            <div className={saveState?"animate-spin":"hidden animate-spin"}>
                                <i className="fa fa-spinner f-spin fa-x fa-fw"></i></div></button>
                    </div>
                </div>
            <Pop_up_box/>
            <Transition.Root show={openWallet} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={setOpenWallet}>
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
                                <Dialog.Panel className="relative transform overflow-hidden  rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mx-auto flex  items-center justify-center rounded-full font-medium text-xl">
                                            选择钱包
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5 flex justify-center">
                                            <div className="pr-10">
                                                <div className="p-5 rounded-full bg-[#FFD4A1]">

                                                <img className="w-24 h-24 " src="/MetaMask.png" alt=""/>

                                                </div>

                                                <div className="mt-4 ">
                                                    MetaMask
                                                </div>

                                            </div>
                                            <div>
                                                <div className="p-5 rounded-full bg-[#3B99FC]">

                                                    <img  className="w-24 h-24 rounded-full" src="/WalletConnect.png" alt=""/>

                                                </div>
                                                <div className="mt-4 ">
                                                    WalletConnect
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="mt-5 flex justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex  justify-center rounded-full  border border-black px-6 py-1 text-base font-medium text-black sm:text-sm"
                                            onClick={() => setOpenWallet(false)}
                                        >
                                          取消
                                        </button>
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

const UserCourse = () =>{
    const router = useRouter();
    const [user_email,] = useAtom(UserEmail)
    const course_info = [
        {
            course_name:"",
            percent_complete:"",
            course_tab:[{content:""}],
            course_image:"",
            course_link:"",
            course_homework_id:[{id:"",url:"",state:false}]
        }
    ]
    const [courseInfo,setCourseInfo] = useState(course_info)
    const [courseDataState,setCourseDataState] =useState(false)
    const [promptBox,setPromptBox] = useState(false)
    const [promptTime,setPromptTime] = useState(0)
    const [,setOpenLogin] =useAtom(OpenLoginState)
    const [courseDetail,setCourseDetail] = useState({
        name: "",
        price: 0,
        address:""})
    const [,setSop_up_boxState] = useAtom(PopUpBoxState)
    const [,setPop_up_boxData] =useAtom(PopUpBoxInfo)
    const [freeCourse1,setFreeCourse1] =useState(false)
    const [freeCourse2,setFreeCourse2] =useState(false)
    const [freeCourse3,setFreeCourse3] =useState(false)

    const [paidCourse1,setPaidCourse1] =useState(false)
    const [paidCourse2,setPaidCourse2] =useState(false)
    const [paidCourse3,setPaidCourse3] =useState(false)
    const [paidCourse4,setPaidCourse4] =useState(false)

    const { address, isConnected } = useAccount()
    const { openConnectModal } = useConnectModal();
    const { chain,} = useNetwork()
    const { openChainModal } = useChainModal();

    let TimeOut
    useEffect(() => {
        TimeOut = setTimeout(() => {
            if (promptTime > 0) {
                setPromptTime(promptTime - 1);
            }else {
                setPromptBox(false)
            }
        }, 1000);
        return ()=>clearTimeout(TimeOut)
    }, [promptTime]);


    useEffect(() => {
        if(router.isReady){
            const query = async() =>{
                const ret = await client.callApi('v1/user/GetUserCourseList', {
                    email: user_email.user_email
                });
                if(JSON.parse(ret.res.courses).length !==0){
                   const data = JSON.parse(ret.res.courses)
                    let course_list = []
                    for (let x = 0 ; x<data.length ; x++){
                        const AddWjAnswersList =  await client.callApi('v1/wj/AddWjAnswersList', {
                            course_name: data[x].course_name,
                        });
                    }
                    for (let i = 0 ;i<data.length ;i++) {
                        const course = await client.callApi('v1/course/GetCourse', {
                            course_name: data[i].course_name
                        });


                        const  survey =  await client.callApi('v1/course/GetCourseWjResult', {
                            course_name: data[i].course_name,
                        });
                        // console.log(survey,"survey")
                        const userCourseWj =  await CreateUserCourseWj(data[i].course_name)
                        let Url_list = []
                        if(userCourseWj.res){

                            const UserCourseWj = JSON.parse(userCourseWj.res.user_course_wj_url_list)

                            let wj_open_username = JSON.parse(survey.res.unique_username)
                            // console.log(wj_open_username,"------------")

                            for (let url_list = 0 ; url_list < wj_open_username.length;url_list++){
                                // console.log(wj_open_username,"wj_open_username")
                                let state
                                if(survey.res == undefined){
                                    state = undefined
                                }else {
                                    const ret = await client.callApi('v1/user/GetUser', {
                                        user_email: user_email.user_email
                                    });
                                    const unique_username = ret.res.user.unique_username
                                    state = JSON.parse(wj_open_username[url_list]).includes(unique_username)
                                }
                                let Url_list_result = {
                                    id:url_list,
                                    state:state,
                                    url:UserCourseWj[url_list]
                                }
                                Url_list.push(Url_list_result)
                            }
                        }
                        if(course.res!==undefined && userCourseWj.res!==undefined){
                            let result = {
                                course_name:data[i].course_name,
                                percent_complete:data[i].percent_complete,
                                course_tab:JSON.parse(course.res.course_details.course_tab),
                                course_image:course.res.course_details.course_image,
                                course_link:course.res.course_details.course_link,
                                course_homework_id:Url_list
                            }

                            course_list.push(result)
                            // console.log("course_list",course_list)
                            // console.log(result.course_homework_id)
                        }
                    }
                    setCourseInfo(course_list)
                    setCourseDataState(true)
                }
                else {
                    setCourseDataState(true)
                }
            }
            query()
        }
    },[router.isReady])

    const CreateUserCourseWj = async(course_name) =>{
        const AddWjLoginCode = await client.callApi('v1/wj/AddWjLoginCode', {
            user_email: user_email.user_email,
        });
        const AddUserCourseWj = await client.callApi('v1/user/AddUserCourseWj', {
            course_name,
            user_email: user_email.user_email,
        });
        const userCourseWj = await client.callApi('v1/user/GetUserCourseWj', {
            course_name,
            user_email: user_email.user_email,
        });


        return userCourseWj
    }

    const ToHomeWork = async (course_name,id,state) => {
        if(!state){
            const data =  await CreateUserCourseWj(course_name)
            const userCourseWjUrl =JSON.parse(data.res.user_course_wj_url_list)[id]

            window.open('about:blank').location.href=userCourseWjUrl
        }
    }
    const goToSchool = (link)=>{
        setPromptBox(true)
        setPromptTime(10)
        setTimeout(()=>{
            window.open(link, "_blank")
        },3000)
    }

    const ReceiveAward = async (name) => {
        setOpenLogin(true)
        const singerState = await client.callApi('v1/user/GetUserBind', {
            user_email: user_email.user_email,
        });

        if(singerState.isSucc){
            setCourseDetail({name: name,price: 100,address:singerState.res.user_evm_address})
            setOpenLogin(false)
            setPaidCourse1(true)
        } else {
            setOpenLogin(false)
            setPop_up_boxData({
                state: false,
                type: "领取",
                title: `请检查网络`,
                hash: ""
            })
            setSop_up_boxState(true)
        }


    }

    const claimNFT = async () => {
        if (isConnected) {
            setOpenLogin(true)
                if (courseDetail.address == address) {
                    if (!chain.unsupported) {
                        setOpenLogin(false)


                    } else {
                        setOpenLogin(false)
                        openChainModal()
                    }
                } else {
                    setOpenLogin(false)
                    setPop_up_boxData({
                        state: false,
                        type: "领取",
                        title: `请切换到到${courseDetail.address}地址进行交易`,
                        hash: ""
                    })
                    setSop_up_boxState(true)
                }
        } else {
            openConnectModal()
        }


        // const proof = getMerkleProof(WHITELIST, index, courseDetail.address);
    }

    if(!courseDataState) {
        return (
            <div className="py-72 flex justify-center">
                <div className="animate-spin text-white">
                    <i className="fa fa-spinner f-spin fa-2x fa-fw"></i></div>
            </div>
        )
    }else {
        if(courseInfo[0].course_name !== ""){
            return(
                <>
                    <div className="mt-5 mb-20 grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-10 mx-2 md:mx-0 outline-none">
                        {courseInfo.map(items=>(

                            <div key={items.course_name} className="rounded-2xl relative">
                                <div className="absolute right-3 top-3 ">
                                    <div className={Number(items.percent_complete) == 100?"hidden ":
                                        "bg-[#0B9C7E] rounded-full px-2 text-xs py-0.5  text-white border"}>
                                        学习中({items.percent_complete}%)
                                    </div>
                                    <div className={Number(items.percent_complete) == 100?"bg-[#5448AE] rounded-full px-2 text-xs py-0.5  text-white border ":
                                        "hidden"}>
                                        已完成课程
                                    </div>

                                </div>
                                <img className="rounded-t-2xl" src={items.course_image} alt=""/>
                                <div className="relative  rounded-b-2xl" >
                                    <div className={classNames(Number(items.percent_complete) == 100  && items.course_homework_id.findIndex(target=>target.state ==true) !== -1 ?"absolute":"bg-white","  flex flex-col rounded-b-2xl")}>
                                        <div className="px-10  pt-4">
                                            <div className="flex  h-20 overflow-hidden  flex-wrap">
                                                {items.course_tab.map(list=>(
                                                    <div key={list.content} className="bg-gray-200 rounded-full text-center text-gray-700  h-7 px-3 py-1 mr-2 mb-4 text-sm" >
                                                        {list.content}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="line-clamp-2  h-12 mt-2">
                                                {items.course_name}
                                            </div>
                                            <div className="flex mt-5 ">
                                                <button onClick={()=>ReceiveAward(items.course_name)}>
                                                    <div className={Number(items.percent_complete) == 100  && items.course_homework_id.findIndex(target=>target.state ==true) !== -1 ? "text-xs  bg-black text-white rounded-full  px-8 py-2.5 mr-5":""}>
                                                        领取奖励
                                                    </div>
                                                </button>
                                                <button onClick={()=>goToSchool(items.course_link)}>
                                                    <div className={Number(items.percent_complete) == 100  && items.course_homework_id.findIndex(target=>target.state ==true) !== -1 ? "hidden":"text-xs  bg-black text-white rounded-full  px-8 py-2.5 mr-5"}>
                                                        跳转上课
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        <div className={Number(items.percent_complete) == 100  && items.course_homework_id.findIndex(target=>target.state ==true) !== -1 ?"mt-4  px-10 py-6":"mt-4 border-t px-10 py-4"}>
                                            <div className={Number(items.percent_complete) == 100  && items.course_homework_id.findIndex(target=>target.state ==true) !== -1 ?"hidden":"flex justify-between items-center"}>
                                                <div className="text-xs text-gray-700">
                                                    作业完成情况
                                                </div>
                                                <div className="flex">
                                                    {items.course_homework_id.map(list =>(
                                                            <button key={list.id}   onClick={()=>ToHomeWork(items.course_name,list.id,list.state)}>

                                                                <div  className={list.state?"bg-[#0B9C7E] cursor-not-allowed w-4 h-4 mr-1 rounded-full":"bg-gray-200 w-4 h-4 mr-1 rounded-full"}>
                                                                </div>
                                                            </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <img className={Number(items.percent_complete) == 100  && items.course_homework_id.findIndex(target=>target.state ==true) !== -1 ? "rounded-b-2xl h-70  w-full":"hidden "} src="/workDone.png" alt=""/>

                                </div>
                            </div>
                        ))}

                    </div>
                    <Loading/>
                    <Pop_up_box/>
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
                                    <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-6/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
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
                                                    {courseDetail.name}
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
                                    <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-6/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
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

                                            <div className="text-center mt-5 rounded-lg py-6 h-96  bg-gradient-to-b from-[#E64145]/5   to-[#2823F0]/10">
                                                <div className="">
                                                    确认领取
                                                </div>

                                                <div className="font-light  mt-5">
                                                    课程名称 NFT 将发送中下方地址
                                                </div>
                                                <div className="text-xs md:text-sm xl:text-lg mt-2 font-semibold">
                                                    {courseDetail.address}
                                                </div>
                                                <div className="flex justify-center my-2">
                                                    <img className="w-36 h-36 " src="/award/tintin_nft.png" alt=""/>
                                                </div>

                                                <div className="  text-sm ">
                                                    确认无误后请点击领取
                                                </div>
                                                <div className="flex justify-center mt-5">
                                                    <ConnectButton  accountStatus="address"  />
                                                </div>
                                            </div>

                                            <div className="flex justify-center mt-5">
                                                <button onClick={() => setFreeCourse2(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                                    取消
                                                </button>
                                                <button onClick={claimNFT}  className="bg-black border border-black text-white w-36 py-1.5 rounded-full mr-5">
                                                    领取
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
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
                                    <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-6/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
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
                                    <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-6/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
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
                                                            <span className="text-sm mt-1 text-gray-500">课程奖励</span>
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
                                                   {courseDetail.name}
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
                                    <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-6/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
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
                                                            <span className="text-sm mt-1 text-gray-500">课程奖励</span>
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
                                                     NFT 及学费 {courseDetail.price} USDT 将发送中下方地址
                                                </div>
                                                <div className="text-xs md:text-sm xl:text-lg mt-2 font-semibold">
                                                    {courseDetail.address}
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
                                                <button  onClick={() => {
                                                    setPaidCourse2(false)
                                                    setPaidCourse3(true)}} className="bg-black border border-black text-white w-36 py-1.5 rounded-full mr-5">
                                                    下一步
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                    <Transition.Root show={paidCourse3} as={Fragment}>
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
                                    <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-6/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
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
                                                            <span className="text-sm mt-1 text-gray-500">课程奖励</span>
                                                        </div>
                                                        <div className="flex flex-col items-center ">
                                                            <div className="relative flex h-5 w-5 items-center justify-center rounded-full ">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-black" aria-hidden="true" />

                                                            </div>
                                                            <span className="text-sm mt-1  text-black font-semibold">完成</span>
                                                        </div>
                                                    </li>
                                                </ol>
                                            </nav>

                                            <div className="flex flex-col justify-between text-center mt-5 rounded-lg py-6 h-80  bg-gradient-to-b from-[#E64145]/5   to-[#2823F0]/10">
                                                <div>
                                                    <div className="text-xl">
                                                        课程奖励
                                                    </div>
                                                    <div className="mt-5">
                                                        {courseDetail.name} <br/>押金
                                                    </div>
                                                    <div className="flex justify-center py-1">
                                                        <div className="px-4 py-2 rounded-full border-black border w-36 ">
                                                            {courseDetail.price}USDT
                                                        </div>
                                                    </div>
                                                    <div>
                                                        将有我们的工作人员发送至下方地址:
                                                    </div>
                                                    <div>
                                                        {courseDetail.address}
                                                    </div>
                                                </div>
                                                <div className="flex justify-center mt-5">
                                                    <ConnectButton  accountStatus="address"  />
                                                </div>
                                                <div className="mt-3 font-semibold text-sm">
                                                    确认无误后请点击确认
                                                </div>

                                            </div>
                                            <div className="flex justify-center mt-5">
                                                <button onClick={() => setPaidCourse3(false)}  className="bg-white border border-black text-black w-36 py-1.5 rounded-full mr-5">
                                                    返回
                                                </button>
                                                <button  onClick={claimNFT}  className="bg-black border border-black text-white w-36 py-1.5 rounded-full mr-5">
                                                    确认
                                                </button>

                                            </div>


                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Transition.Root>
                    <Transition.Root show={paidCourse4} as={Fragment}>
                        <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={setPaidCourse4}>
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
                                    <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-6/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                        <div className="bg-white px-4 py-5 sm:px-6 rounded-md">
                                            <div className='flex justify-between text-xl font-light text-black 	mb-5 items-centers'>
                                                <div className="font-normal">
                                                    领取奖励
                                                </div>
                                                <button   onClick={() => setPaidCourse4(false)}
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
            )
        }else {
            return (
                <div className="py-72 flex justify-center">
                    暂无课程
                </div>
            )
        }
    }


}
const Homepage= () =>{


    const categories =[
        {
            title:"我的课程",
        },
        {
            title:"个人资料",
        },
    ]



    return (

        <div className="mx-auto relative  bg-fixed overflow-hidden"
             style={{backgroundImage:"url('/tintin-bg.png')"}}>
            <Heads/>
            <Header/>
            <div className=" lg:px-10 xl:px-20 relative md:px-5 pt-12    mx-auto ">

                <Tab.Group>
                    <Tab.List className="  space-x-1  mt-10 mx-auto   flex justify-center border-b border-[#000000]/20 pb-5">
                        <div className="rounded-full border border-[#000000]/20 bg-[#FFFFFF]">
                            {categories.map((category) => (
                                <Tab
                                    key={category.title}
                                    className={({ selected }) =>
                                        classNames(
                                            'px-12 py-1.5 font-medium rounded-full  focus:outline-none ',
                                            selected
                                                ? 'bg-black text-white '
                                                : 'text-black ')}>
                                    {category.title}
                                </Tab>
                            ))}
                        </div>

                    </Tab.List>

                    <Tab.Panels className="mt-2 ">
                        <Tab.Panel
                            className={classNames('  p-1 ')}>
                            <UserCourse/>
                        </Tab.Panel>


                        <Tab.Panel className={classNames('  p-1')}>
                            <UserInfo/>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
            <Tail/>
        </div>


    )
}

export default Homepage
