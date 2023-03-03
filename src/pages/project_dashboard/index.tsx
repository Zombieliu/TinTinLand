import Header from "../../components/header";
import Tail from "../../components/tail";
import React, {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {Dialog, Disclosure, Listbox, Switch, Tab, Transition} from "@headlessui/react";
import { CheckIcon, SelectorIcon,MapIcon } from "@heroicons/react/outline";
import Heads from "../../components/head";
import {client} from "../../client";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {PopUpBoxInfo, PopUpBoxState, UserEmail} from "../../jotai";
import {user} from "../../shared/interface/user";
import {Pop_up_box, SignUpCourseBox} from "../../components/pop_up_box";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const track = [
    { id: 1, name: '请选择' },
    { id: 2, name: '1' },

]


// @ts-ignore
const ProjectInfo = () =>{
    const router = useRouter();
    const [selectedTrack, setSelectedTrack] = useState(track[0])
    const [user_email,] = useAtom(UserEmail)
    const [saveState,setSaveState] = useState(false)
    const [,setPop_up_boxData] =useAtom(PopUpBoxInfo)
    const [,setSop_up_boxState] = useAtom(PopUpBoxState)
    useEffect(() => {
        if(router.isReady){

        }
    },[router.isReady])


    const Revise = async () => {
        setSaveState(true)
        const user:user = {
            username:(document.getElementById("userName") as HTMLInputElement).value,
            user_email:(document.getElementById("userEmail") as HTMLInputElement).value,
            user_course_passport:"",
            twitter:  (document.getElementById("Twitter") as HTMLInputElement).value,
            telegram: (document.getElementById("Telegram") as HTMLInputElement).value,
            github:(document.getElementById("Github") as HTMLInputElement).value,

            description:(document.getElementById("description") as HTMLInputElement).value,
            country:selectedTrack.name,
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
                            项目基本信息
                        </div>
                        <div className="text-gray-500 text-sm">
                           项目资料
                        </div>
                        <img className="w-14 h-14 rounded-full my-2" src="/tintinlogo.svg" alt=""/>

                        {/*    用户名*/}
                        <div className="mt-2">
                            <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700 mt-4 ">
                                项目官网
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userName"
                                    autoComplete="off"
                                    required
                                    placeholder="填写你的项目官网"
                                    maxLength={24}
                                    className={classNames("outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500   sm:text-sm")}
                                />
                            </div>
                        </div>
                        {/*    邮箱地址*/}
                        <div className="mt-2">
                            <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700">
                                项目/机构名称
                            </label>
                            <div className="mt-1">
                                <input
                                    id="userEmail"
                                    name="email"
                                    type="email"
                                    autoComplete="off"
                                    readOnly={true}
                                    required
                                    placeholder="填写你的项目名称"
                                    className={classNames("outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm")}
                                />
                            </div>
                        </div>
                        {/*    选择赛道*/}
                        <div className="mt-2">
                            <Listbox value={selectedTrack} onChange={setSelectedTrack}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Label className="block text-sm font-medium text-gray-700">赛道</Listbox.Label>
                                        <div className="mt-1 relative">
                                            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">{selectedTrack.name}</span>
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
                                                    {track.map((nation) => (
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
                        {/*    简介*/}
                        <div className="mt-2">
                            <label htmlFor="email" className=" flex justify-between text-sm font-medium text-gray-700">
                                项目/公司简介
                            </label>
                            <div className="mt-1">
                                                <textarea
                                                    rows={4}
                                                    name="description"
                                                    id="description"
                                                    autoComplete="off"
                                                    className="p-1 shadow-sm outline-none block w-full sm:text-sm border-gray-300 rounded-md resize-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="请介绍你的项目"
                                                    defaultValue={''}
                                                />
                            </div>
                        </div>



                    </div>
                    {/*信息管理*/}
                    <div className="bg-[#F9F9FB] rounded-xl p-5 mt-4">
                        <div className="mt-2">
                            <label htmlFor="email" className=" ">
                                <div className=" font-medium text-xl text-gray-700">
                                    联系人信息管理
                                </div>
                                <div className="text-gray-500 text-sm">
                                    方便我们与您对接
                                </div>
                            </label>
                            {/*twitter*/}
                            <div className="mt-4">
                                <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700">
                                    联系人方式
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="Twitter"
                                        required
                                        autoComplete="off"
                                        placeholder="填写联系人方式"
                                        className="outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                                    />
                                </div>
                            </div>
                            {/*github*/}
                            <div className="mt-2">
                                <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700">
                                    联系方式
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="Github"
                                        required
                                        autoComplete="off"
                                        placeholder="填写联系方式"
                                        className="outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none  focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
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


                    <div className="flex justify-center mx-4 mt-5 md:mt-10">
                        {/*onClick={Revise}*/}
                        {/*<button onClick={()=>location.reload()} className="bg-white border border-black text-black rounded-full py-1 px-3 mr-5 w-24">取消</button>*/}
                        <button  className="bg-black text-white rounded-full py-1 px-3 w-24 flex justify-center ">
                            <div>
                                保存
                            </div>

                            <div className={saveState?"animate-spin":"hidden animate-spin"}>
                                <i className="fa fa-spinner f-spin fa-x fa-fw"></i></div></button>
                    </div>
                </div>
            <Pop_up_box/>
        </>
    )
}

const ProjectManagement = () =>{
    const router = useRouter();
    const [user_email,] = useAtom(UserEmail)
    const positions = [
        {
            id: 1,
            title: 'Senior Frontend Engineer, Creator Experience',
            salary: '80k-120K',
            city:"杭州",
            location: 'Remote',
            department: '全职',
        },
        {
            id: 1,
            title: 'Senior Frontend Engineer, Creator Experience',
            salary: '80k-120K',
            city:"杭州",
            location: 'Remote',
            department: '全职',
        },
        {
            id: 1,
            title: 'Senior Frontend Engineer, Creator Experience',
            salary: '80k-120K',
            city:"杭州",
            location: 'Remote',
            department: '全职',
        },
    ]
    const [createJobState,setCreateJobState] = useState(false)
    const [removeJobState,setRemoveJobState] = useState(false)
    const [openCreateJob,setOpenCreateJob] = useState({type:"",data:{}})
    const [selectedTrack, setSelectedTrack] = useState(track[0])
    const [,setSop_up_boxState] = useAtom(PopUpBoxState)
    const [,setPop_up_boxData] =useAtom(PopUpBoxInfo)
    useEffect(() => {
        if(router.isReady){

        }
    },[router.isReady])

    const  CreateJob = () =>{
        setPop_up_boxData({
            state:true,
            type:"创建岗位",
            title:"",
            hash: ""
        })
        setCreateJobState(false)
        setSop_up_boxState(true)

    }
    const Revise = () =>{
        setCreateJobState(true)
        setOpenCreateJob({type:"Revise",data:{}})
    }

    const Remove = () =>{
        setPop_up_boxData({
            state:true,
            type:"删除岗位",
            title:"",
            hash: ""
        })
        setRemoveJobState(false)
        setSop_up_boxState(true)

    }

    // if(!courseDataState) {
    //     return (
    //         <div className="py-72 flex justify-center">
    //             <div className="animate-spin text-white">
    //                 <i className="fa fa-spinner f-spin fa-2x fa-fw"></i></div>
    //         </div>
    //     )
    // }

            return(
                <>
                    <Pop_up_box/>
                    <Transition.Root show={createJobState} as={Fragment}>
                        <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={setCreateJobState}>
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
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
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
                                                    {openCreateJob.type==""?"创建岗位信息":"修改岗位信息"}
                                                </div>
                                                <button   onClick={() => setCreateJobState(false)}
                                                          className="fa fa-times  outline-none" aria-hidden="true"></button>
                                            </div>
                                            <div className='h-max-100 overflow-auto'>
                                            {/*基本信息*/}
                                            <div className="bg-[#F9F9FB] rounded-xl p-4 ">
                                                <div className="">
                                                    <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700  ">
                                                        岗位名称
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="userName"
                                                            autoComplete="off"
                                                            required
                                                            placeholder="填写岗位名称"
                                                            maxLength={24}
                                                            className={classNames("outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500   sm:text-sm")}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <Listbox value={selectedTrack} onChange={setSelectedTrack}>
                                                        {({ open }) => (
                                                            <>
                                                                <Listbox.Label className="block text-sm font-medium text-gray-700">岗位类型</Listbox.Label>
                                                                <div className="mt-1 relative">
                                                                    <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                        <span className="block truncate">{selectedTrack.name}</span>
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
                                                                            {track.map((nation) => (
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
                                                <div className="mt-2">
                                                    <Listbox value={selectedTrack} onChange={setSelectedTrack}>
                                                        {({ open }) => (
                                                            <>
                                                                <Listbox.Label className="block text-sm font-medium text-gray-700">薪资范围</Listbox.Label>
                                                                <div className="mt-1 relative">
                                                                    <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                        <span className="block truncate">{selectedTrack.name}</span>
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
                                                                            {track.map((nation) => (
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

                                                <div className="mt-4">
                                                    <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700">
                                                        岗位标签
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            id="Twitter"
                                                            required
                                                            autoComplete="off"
                                                            placeholder="填写岗位标签"
                                                            className="outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <label htmlFor="email" className=" flex justify-between text-sm font-medium text-gray-700">
                                                        岗位标签
                                                    </label>
                                                    <div className="mt-1">
                                                <textarea
                                                    rows={4}
                                                    name="description"
                                                    id="description"
                                                    autoComplete="off"
                                                    className="p-1 shadow-sm outline-none block w-full sm:text-sm border-gray-300 rounded-md resize-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="岗位详情"
                                                    defaultValue={''}
                                                />
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-700">
                                                        投递方式
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            id="Twitter"
                                                            required
                                                            autoComplete="off"
                                                            placeholder="填写投递方式"
                                                            className="outline-none block w-full px-3 py-2 border  rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            </div>
                                            <div className="flex justify-center mx-4 mt-5 ">

                                                <button onClick={() => setCreateJobState(false)} className="bg-white border border-black text-black rounded-full py-1 px-3 mr-5 w-24">取消</button>
                                                <button onClick={CreateJob} className="bg-black text-white rounded-full py-1 px-3 w-24 flex justify-center ">
                                                        保存
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                    <Transition.Root show={removeJobState} as={Fragment}>
                        <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto " onClose={setRemoveJobState}>
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
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
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
                                                    删除岗位信息
                                                </div>
                                                <button   onClick={() => setRemoveJobState(false)}
                                                          className="fa fa-times  outline-none" aria-hidden="true"></button>
                                            </div>
                                            <div className="text-center py-5">
                                               确认要删除该岗位吗（该操作不可以逆）
                                            </div>
                                            <div className="flex justify-center mx-4 mt-5 ">

                                                <button onClick={() => setRemoveJobState(false)} className="bg-white border border-black text-black rounded-full py-1 px-3 mr-5 w-24">取消</button>
                                                <button onClick={Remove} className="bg-red-600 text-white rounded-full py-1 px-3 w-24 flex justify-center ">
                                                    确认
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                <div className="py-5 mb-10 xl:mb-24 3xl:mb-72 ">
                    <div className="overflow-hidden bg-white shadow sm:rounded-md ">
                        <ul role="list" className="divide-y divide-gray-200">
                            {positions.map((position) => (
                                <li key={position.id}>
                                    <div  className="block hover:bg-gray-50">
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="md:flex items-center w-10/12">
                                                    <p className="truncate   text-sm font-medium text-black">{position.title}</p>
                                                    <div className="md:pl-5 text-sm ">
                                                        {position.salary} | {position.city} | {position.location} | {position.department}
                                                    </div>
                                                </div>
                                                <div className="ml-2 flex flex-shrink-0 text-gray-600">

                                                    <button onClick={Revise}>
                                                        <i className="fa fa-pencil mr-4" aria-hidden="true" ></i>
                                                    </button>

                                                    <button onClick={()=>{setRemoveJobState(true)}}>
                                                        <i className="fa fa-trash-o" aria-hidden="true" ></i>
                                                    </button>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-center">
                        <button onClick={()=> {
                            setCreateJobState(true),
                                setOpenCreateJob({type:"",data:{}})
                        }} className="flex items-center px-6 py-1 border border-gray-500 rounded-2xl mt-4">
                            添加岗位
                            <i className="fa fa-plus-circle ml-2"/>
                        </button>
                    </div>
                </div>
                </>
            )
}
const Project_Homepage= () =>{


    const categories =[
        {
            title:"项目资料",
        },
        {
            title:"岗位管理",
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
                            <ProjectInfo/>
                        </Tab.Panel>

                        <Tab.Panel className={classNames('  p-1')}>
                            <ProjectManagement/>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
            <Tail/>
        </div>


    )
}

export default Project_Homepage
