import Header from "../../components/header";
import Tail from "../../components/tail";
import React, {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {Dialog, Listbox, Switch, Tab, Transition} from "@headlessui/react";
import Heads from "../../components/head";
import {useAtom} from "jotai";
import {UserEmail,} from "../../jotai";
import {client} from "../../client";
import {useRouter} from "next/router";
import {PromptBox} from "../../components/pop_up_box";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const Homepage= () =>{

    const router = useRouter();
    const [user_email,] = useAtom(UserEmail)
    const userData = {username:"",user_email:"",user_course_passport:"",twitter:"",telegram:"",roles:"",privacy:false,github:"",experience:"",description:"",course_user:false,country:"",achievements:"",}
    const [userInfo,setUserInfo] =useState(userData)
    let [categories] = useState({
        简介: [],
        TinTin足迹: [],
    })
    useEffect(() => {
        if(router.isReady){
            const query = async() =>{
                const ret = await client.callApi('v1/user/GetUser', {
                    user_email: user_email.user_email
                });
                if(ret.isSucc){
                    const data = ret.res.user
                    const userData = {
                        username:data.username,
                        user_email:data.user_email,
                        user_course_passport:data.user_course_passport,
                        twitter:data.twitter,
                        telegram:data.telegram,
                        roles:data.roles,
                        privacy:data.privacy,
                        github:data.github,
                        experience:data.experience,
                        description:data.description,
                        course_user:data.course_user,
                        country:data.country,
                        achievements:data.achievements,}
                    setUserInfo(userData)
                }

            }
            query()
        }
    },[router.isReady])
    const usertype = [
        {
            type:"产品经理",
        },
        {
            type:"DAO贡献者",
        },
        {
            type:"The Graph",
        },
    ]


    // if(userInfo.username !==""){
        return (

            <div className="mx-auto relative  bg-fixed overflow-hidden"
                 style={{backgroundImage:"url('/tintin-bg.png')"}}>
                <Heads/>
                <Header/>
                <div className=" lg:px-10 xl:px-32 relative md:px-5 pt-24 pb-96   mx-auto ">
                    <img className="sm:rounded-lg h-20 sm:h-full" src="https://cdn.discordapp.com/attachments/996743003165171723/1009394374100144209/unknown.png" alt=""/>
                    <div className=" -mt-8 flex justify-between items-center">
                        <div className="sm:flex items-center mx-4">
                            <div>
                                <img className="w-28 rounded-full" src="https://cdn.discordapp.com/attachments/897398778166906911/978238644810842133/unknown.png" alt=""/>
                            </div>
                            <div className="hidden ml-2 sm:grid grid-cols-4 xl:grid-cols-8 gap-2">
                                {usertype.map(item=>(
                                    <div key={item.type} className="bg-purple-100 rounded-full text-center text-gray-700 px-3 py-0.5  text-xs " >
                                        {item.type}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link href="/dashboard">
                            <a className="w-28 mr-4 sm:mr-4 mt-4 flex justify-center py-1.5 px-3 border border-black  rounded-full shadow-sm text-sm font-medium"
                            >
                                Edit profile
                            </a>
                        </Link>
                    </div>
                    <div className="sm:hidden mt-2 ml-2 grid grid-cols-4  gap-4">
                        {usertype.map(item=>(
                            <div key={item.type} className="bg-purple-100 rounded-full text-center text-gray-700 px-1 py-0.5  text-xs " >
                                {item.type}
                            </div>
                        ))}
                    </div>
                    <div className="ml-4 mt-4">
                        <div className="flex items-center">
                            <div className="font-semibold text-xl">
                                {userInfo.username}
                            </div>
                            <div className="border-r h-4 mx-3 border-black">

                            </div>
                            <Link  href={`https://twitter.com/${userInfo.twitter}`} className={userInfo.twitter==""?"hidden" :""}>
                                <a>
                                    <img className="w-6" src="/common_icons/icon-twitter@2x.png" alt=""/>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="ml-4 flex items-center mt-3 text-gray-600">
                        <div className="flex items-center">
                            <i className="fa fa-briefcase" aria-hidden="true"></i>
                            <div className="text-xs ml-1">
                                产品策划@TinTinLand
                            </div>
                        </div>
                        <div className="flex items-center ml-5">
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                            <div className="text-xs ml-1">
                                2022年12月02日 加入
                            </div>
                        </div>
                    </div>

                    <Tab.Group>
                        <Tab.List className="ml-4  space-x-1  mt-10 mx-auto  flex justify-between border-b border-gray-300">
                            <div>
                                {Object.keys(categories).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-24  font-medium  mr-8 focus:outline-none ',
                                                selected
                                                    ? 'border-b-2  border-black'
                                                    : ' text-gray-500 ')}>
                                        {category}
                                    </Tab>
                                ))}
                            </div>

                        </Tab.List>

                        <Tab.Panels className="mt-2 ">
                            <Tab.Panel
                                className={classNames('  p-1 ')}>
                                <div className={userInfo.description == ""?"flex justify-center my-auto":" hidden"}>
                                    <div className="text-center text-gray-500">
                                        <img className="mt-20 w-32"  src="/common_icons/无简介空状态@2x.png" alt=""/>
                                        暂无个人简介
                                    </div>
                                </div>
                                <div className={userInfo.description == ""?" hidden":" my-auto "}>
                                    <div className=" text-gray-500">
                                        {userInfo.description}
                                    </div>
                                </div>

                            </Tab.Panel>

                            <Tab.Panel className={classNames('  p-1')}>
                                <div className="flex justify-center my-auto">
                                    <div className="text-center text-gray-500">
                                        <img className="mt-20 w-32"  src="/common_icons/无简介空状态@2x.png" alt=""/>
                                        暂无个人简介
                                    </div>
                                </div>


                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                <PromptBox/>
                <Tail/>
            </div>
        )
    // }else {
    //     return (
    //         <div>1</div>
    //     )
    // }

}

export default Homepage

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'footer','header']),
    }
})
