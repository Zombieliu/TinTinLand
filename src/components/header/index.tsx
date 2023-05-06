import { Popover, Tab, Transition } from '@headlessui/react';
import Link from "next/link";
import { Switch } from '@headlessui/react'
import { MenuIcon, XIcon} from "@heroicons/react/outline";
import React, {Fragment, useEffect, useState} from "react";
import {useAtom} from "jotai";
import {Language, LoginState, UserEmail} from "../../jotai";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () =>{
    const router = useRouter();
    const { pathname, query, asPath } = router
    const [loginState,SetLoginState] = useAtom(LoginState)
    const [scroll,setScroll]=useState(false)
    const [,setLoginState] = useAtom(LoginState)
    const [userEmail,setUserEmail] =useAtom(UserEmail)
    const [language,setLanguage] =useAtom(Language)
    const { t } = useTranslation('header')

    const navigation = [
        { id:1 ,name:`${t("课程")}`, href: '/course' },
        { id:2 ,name:`${t("Hackathons")}`, href: '/hackathons' },
        { id:3 ,name: `${t("活动")}`, href: '/meeting' },
        { id:4 ,name: `${t("关于我们")}`, href: '/#About' },
        // { id:5 ,name: 'Job Fair', href: '/JobFair/开发' },
    ]

    if(typeof window !== "undefined"){
        window.onscroll = function() {myFunction()};
    }
    function myFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    };
    const loginOut = () =>{
        setLoginState(false);
        setUserEmail({user_email:"",username:""})

        router.push('/')
    }
    function languageChange() {
        console.log("--------------------",language)
        if(language =="cn"){
            setLanguage("en")
            router.push({ pathname, query }, asPath, { locale: "en" })
        }else {
            setLanguage("cn")
            router.push({ pathname, query }, asPath, { locale: "cn" })
        }

    }
    useEffect(()=>{
        if(router.isReady){
            if(router.locale == "cn"){
                setLanguage("cn")
            }else {
                setLanguage("en")
            }
        }
    },[router.isReady])

    return (
        <header>
            <Popover className="relative bg-white  ">
                <div className={classNames(scroll?" backdrop-blur-sm bg-white/95":"",
                    "flex  fixed z-50 inset-x-0    transition duration-700 mb-10 pl-5 mb-5 justify-between items-center  p-3 md:p-3 sm:px-6 lg:justify-end md:space-x-10 lg:px-10 xl:px-20 items-center ")}>

                    <div className=" flex  justify-between lg:justify-start">
                        <div className="flex justify-start  ">
                            <Link  href="/">
                                <a>
                                    <span className="sr-only">Workflow</span>
                                    <img
                                        className=" w-auto   "
                                        src="/tintin_color_horizontal.svg"
                                        alt=""
                                    />
                                </a>
                            </Link>
                        </div>

                    </div>
                    {/*导航*/}
                    <Tab.Group as="nav" className="hidden  lg:flex  space-x-8  text-white ">
                        {navigation.map((item) => (
                            <div key={item.name}>
                                <Link  href={item.href} >
                                    <a  className=" ">
                                        <div  className='w-20 py-2.5 text-sm leading-5 text-center  rounded-lg text-sm font-medium text-black '>
                                            {item.name}
                                        </div>

                                    </a>
                                </Link>
                            </div>
                        ))}
                    </Tab.Group>
                    {/*切换*/}
                    <div className="hidden lg:flex w-full justify-end  items-center">
                        <div className="flex justify-center items-center">
                            <Switch
                                // checked={languageState}
                                onChange={languageChange}
                                className={classNames(
                                    'relative inline-flex flex-shrink-0 h-7 w-12  border border-gray-500 rounded-full cursor-pointer transition-colors ease-in-out duration-200 items-center bg-gray-200 '
                                )}
                             checked>
                                <span className="sr-only">Use setting</span>

                                <span
                                    aria-hidden="true"
                                    className={classNames(

                                        'pointer-events-none inline-block   w-5 rounded-full   transform ring-0 transition ease-in-out'
                                    )}
                                >
                                    <div className="flex justify-between items-center  w-12  text-xs">

                                        <div className={language==="cn"?"w-12   w-6  py-1":"bg-black rounded-full w-12  w-6 py-1 text-center text-white"}>
                                              EN
                                        </div>
                                         <div className={language==="en"?" w-12   w-6  py-1":"bg-black rounded-full w-12   w-6  py-1  text-white"}>
                                          中
                                        </div>
                            </div>

                                </span>
                            </Switch>

                        </div>
                        {/*<Link href="/login">*/}
                        {/*    <a className={loginState?"hidden":" ml-4 text-base border border-gray-500 rounded-full cursor-pointer px-5"}>*/}
                        {/*        登陆*/}
                        {/*    </a>*/}
                        {/*</Link>*/}
                        {/*<div className={loginState?"mt-1.5 ml-4":"hidden"}>*/}
                        {/*    <Menu as="div" className=" relative ">*/}
                        {/*            <Menu.Button className="inline-flex w-7  rounded-full ">*/}
                        {/*                <img className="rounded-full " src="/login.png" alt=""/>*/}
                        {/*            </Menu.Button>*/}
                        {/*        <Transition*/}
                        {/*            as={Fragment}*/}
                        {/*            enter="transition ease-out duration-100"*/}
                        {/*            enterFrom="transform opacity-0 scale-95"*/}
                        {/*            enterTo="transform opacity-100 scale-100"*/}
                        {/*            leave="transition ease-in duration-75"*/}
                        {/*            leaveFrom="transform opacity-100 scale-100"*/}
                        {/*            leaveTo="transform opacity-0 scale-95"*/}
                        {/*        >*/}
                        {/*            <Menu.Items className="absolute right-0 mt-2 w-28  divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">*/}
                        {/*                <div className="px-1 py-1 text-center">*/}
                        {/*                    <Menu.Item>*/}
                        {/*                            <Link href="/homepage">*/}
                        {/*                                <a className="group flex w-full justify-center items-center rounded-md px-2 py-2 text-sm">*/}
                        {/*                                    个人主页*/}
                        {/*                                </a>*/}
                        {/*                            </Link>*/}
                        {/*                    </Menu.Item>*/}
                        {/*                </div>*/}
                        {/*                <div className="px-1 py-1 ">*/}
                        {/*                    <Menu.Item>*/}
                        {/*                        <Link  href="/dashboard">*/}
                        {/*                            <a className="group flex w-full justify-center items-center rounded-md px-2 py-2 text-sm">*/}
                        {/*                                Dashboard*/}
                        {/*                            </a>*/}
                        {/*                        </Link>*/}
                        {/*                    </Menu.Item>*/}
                        {/*                </div>*/}
                        {/*                <div className="px-1 py-1 ">*/}
                        {/*                    <Menu.Item>*/}

                        {/*                            <button onClick={loginOut} className="group flex w-full justify-center items-center rounded-md px-2 py-2 text-sm">*/}
                        {/*                                登出*/}
                        {/*                            </button>*/}
                        {/*                    </Menu.Item>*/}
                        {/*                </div>*/}


                        {/*            </Menu.Items>*/}
                        {/*        </Transition>*/}
                        {/*    </Menu>*/}
                        {/*</div>*/}

                    </div>

                    {/*手机版*/}
                    <div className="-mr-2  my-0.5 lg:hidden">
                        <Popover.Button className="bg-white  rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100  ">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                </div>

                <div className="fixed z-50 inset-x-0">
                    <Transition
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            className="absolute my-auto  fixed z-50 inset-x-0  min-h-screen  inset-y-auto   p-2 transition transform origin-top-right lg:hidden"
                        >
                            <div className="rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5 bg-white   transition duration-700 divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                className=" w-auto"
                                                src="/tintin_color_horizontal.svg"
                                                alt="Workflow"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100  ">
                                                <span className="sr-only">Close menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>

                                </div>
                                <div className="py-6 ">
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center ">
                                        {navigation.map((item) => (
                                            <Link key={item.name} href={item.href}>
                                                <a
                                                    className="text-base font-medium text-gray-900    transition duration-700 "
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between  p-5 items-center">
                                        <div className="flex justify-between">
                                            <Switch
                                                // checked={languageState}
                                                onChange={languageChange}
                                                className={classNames(
                                                    'relative inline-flex flex-shrink-0 h-7 w-12  border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 items-center bg-gray-200 '
                                                )}
                                             checked>
                                                <span className="sr-only">Use setting</span>

                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(

                                                        'pointer-events-none inline-block   w-5 rounded-full   transform ring-0 transition ease-in-out duration-200'
                                                    )}
                                                >
                                    <div className="flex justify-between items-center  w-12  text-xs">
                                         <div className={language==="cn"?"w-12   w-6  py-1":"bg-black rounded-full w-12  w-6 py-1 text-center text-white"}>
                                              EN
                                        </div>
                                         <div className={language==="en"?" w-12   w-6  py-1":"bg-black rounded-full w-12   w-6  py-1  text-white"}>
                                          中
                                        </div>
                            </div>
                                </span>
                                            </Switch>
                                        </div>

                                    {/*<Link href="/login">*/}
                                    {/*    <a className={loginState?"hidden":" ml-4 text-base border border-gray-500 rounded-full cursor-pointer px-5"}>*/}
                                    {/*        登陆*/}
                                    {/*    </a>*/}
                                    {/*</Link>*/}

                                    {/*<div className={loginState?"mt-1.5 ml-4":"hidden"}>*/}
                                    {/*    <Menu as="div" className=" relative ">*/}
                                    {/*        <Menu.Button className="inline-flex w-7  rounded-full ">*/}
                                    {/*            <img className="rounded-full " src="/login.png" alt=""/>*/}
                                    {/*        </Menu.Button>*/}
                                    {/*        <Transition*/}
                                    {/*            as={Fragment}*/}
                                    {/*            enter="transition ease-out duration-100"*/}
                                    {/*            enterFrom="transform opacity-0 scale-95"*/}
                                    {/*            enterTo="transform opacity-100 scale-100"*/}
                                    {/*            leave="transition ease-in duration-75"*/}
                                    {/*            leaveFrom="transform opacity-100 scale-100"*/}
                                    {/*            leaveTo="transform opacity-0 scale-95"*/}
                                    {/*        >*/}
                                    {/*            <Menu.Items className="absolute right-0 mt-2 w-28  divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">*/}
                                    {/*                <div className="px-1 py-1 text-center">*/}
                                    {/*                    <Menu.Item>*/}
                                    {/*                        <Link href="/homepage">*/}
                                    {/*                            <a className="group flex w-full justify-center items-center rounded-md px-2 py-2 text-sm">*/}
                                    {/*                                个人主页*/}
                                    {/*                            </a>*/}
                                    {/*                        </Link>*/}
                                    {/*                    </Menu.Item>*/}
                                    {/*                </div>*/}
                                    {/*                <div className="px-1 py-1 ">*/}
                                    {/*                    <Menu.Item>*/}
                                    {/*                        <Link  href="/dashboard">*/}
                                    {/*                            <a className="group flex w-full justify-center items-center rounded-md px-2 py-2 text-sm">*/}
                                    {/*                                Dashboard*/}
                                    {/*                            </a>*/}
                                    {/*                        </Link>*/}
                                    {/*                    </Menu.Item>*/}
                                    {/*                </div>*/}
                                    {/*                <div className="px-1 py-1 ">*/}
                                    {/*                    <Menu.Item>*/}

                                    {/*                        <button onClick={loginOut} className="group flex w-full justify-center items-center rounded-md px-2 py-2 text-sm">*/}
                                    {/*                            登出*/}
                                    {/*                        </button>*/}
                                    {/*                    </Menu.Item>*/}
                                    {/*                </div>*/}


                                    {/*            </Menu.Items>*/}
                                    {/*        </Transition>*/}
                                    {/*    </Menu>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </Popover.Panel>

                    </Transition>
                </div>
            </Popover>
        </header>
    )
}




export default Header
