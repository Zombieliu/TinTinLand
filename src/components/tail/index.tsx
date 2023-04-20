import {Dialog, Popover, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import Link from "next/link"
import React, { Fragment, useState } from "react"
import {useTranslation} from "next-i18next";


const WeiXinImg = {
    img:"/tintinVX.png"
}
const Tail=()=>{
    const { t } = useTranslation('footer')
    const [open, setOpen] = useState(false)
    const ends =[
        {
            title:`${t("联系我们")}`,
            content:[
                {
                    h1:"Twitter",
                    href:"https://twitter.com/Tintinland2021",
                },
                {
                    h1:"Youtube",
                    href:"https://www.youtube.com/channel/UCfHiMcFt-4btbC75FsReQhQ"
                },

            ],
            weixin:`${t("WeChat")}`,
            weixinimg:"https://cdn.discordapp.com/attachments/876498266550853642/994172638886903848/unknown.png"

        },
        {
            title:`${t("产品")}`,
            content:[
                {
                    h1:`${t("课程")}`,
                    href:"#Educate",
                },
                {
                    h1:"Hackathons",
                    href:"#Hackathons",
                },
                {
                    h1:`${t("活动")}`,
                    href:"#Activities",
                }
            ]

        },

    ]
    return(
        <div className="relative border-t border-gray-400 pt-4 2xl:pt-12 pb-1 px-10   bg-stone-900  rounded-t-3xl">
            <div className="md:hidden">
                <div className="md:flex justify-between  items-center  mx-auto  ">
                    <div  className="flex justify-center  " >
                        <img className="" src="/tintin_color_horizontal2.svg" alt=""/>
                    </div>
                </div>
                <div className="    mx-auto ">
                    <div className="">
                        <Link href="https://discord.gg/6b2QNSYgmz">
                            <a  target="_blank">
                        <div className="text-white text-3xl flex items-center font-light justify-center" >
                            <div>
                                {t("加入TinTinLand社区")}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 transform rotate-45" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"/>
                            </svg>

                        </div>
                            </a>
                        </Link>
                        <div className="my-2 text-gray-500 text-sm flex justify-center  ">
                              {t("点击进入discord")}
                        </div>
                    </div>

                </div>
                <div className="text-white flex justify-between mx-20 py-5  items-center">
                    <Link href="https://twitter.com/Tintinland2021">
                        <a className="">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>

                    </Link>
                    <button onClick={()=>{setOpen(true)}}>
                        <i className="fa fa-weixin" aria-hidden="true"></i>
                    </button>
                    <Link href="/home">
                        <a>
                            <i className="fa fa-weibo" aria-hidden="true"></i>
                        </a>

                    </Link>

                </div>


            </div>
            <div className="hidden md:block px-5 lg:px-10 xl:px-48 py-10 relative">
                <div className="md:flex justify-between    mx-auto ">
                    <div className="">
                        <Link href="https://discord.gg/6b2QNSYgmz">
                            <a  className="text-white text-3xl flex items-center font-light justify-center"  target="_blank">
                            <div>
                                   {t("加入TinTinLand社区")}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 transform rotate-45" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"/>
                            </svg>
                            </a>
                        </Link>
                        <div className="my-2 text-gray-500 text-sm flex justify-center md:justify-start ">
                                {t("点击进入discord")}
                        </div>
                    </div>
                    <div>
                        <div className="text-center mt-10 md:mt-0 md:flex justify-between mb-10">
                            {ends.map(end=>(
                                <div key={end.title} className="mx-10" >
                                    <div className="text-white  text-xl ">
                                        {end.title}
                                    </div>
                                    {end.content.map(item=>(
                                        <div key={item.h1} className="flex my-3 justify-center  text-gray-400 text-sm transition  duration-300 transform hover:translate-x-1 ">
                                            <Link href={item.href}>
                                                <a  target="_blank" className="text-center">
                                                    {item.h1}
                                                </a>
                                            </Link>

                                        </div>))}

                                    <div className="w-full max-w-sm mx-auto ">
                                        <Popover className="">
                                                    <Popover.Button
                                                        className=
                                                            'flex my-3 mx-4 md:justify-start justify-center  text-gray-400 text-sm transition  duration-300 transform translate-x-2.5 '
                                                        >
                                                         {end.weixin}
                                                    </Popover.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0 translate-y-1"
                                                        enterTo="opacity-100 translate-y-0"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100 translate-y-0"
                                                        leaveTo="opacity-0 translate-y-1"
                                                    >
                                                        <Popover.Panel className="absolute -mt-20 -ml-32">
                                                            <div className=" rounded-lg  ">

                                                                <div className="bg-gray-50 p-2 rounded-2xl">
                                                                    <img className="w-24" src={WeiXinImg.img} alt=""/>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                        </Popover>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div className="md:flex justify-between  items-center  mx-auto md:mr-14 ">
                    <div  className="flex justify-center md:justify-end " >
                        <img className="" src="/tintin_color_horizontal2.svg" alt=""/>
                    </div>
                </div>

            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl items-center transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                                        <div>
                                            <img src={WeiXinImg.img} alt=""/>
                                        </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}
export  default Tail
