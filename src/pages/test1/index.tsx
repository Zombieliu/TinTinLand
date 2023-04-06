import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Link from "next/link";

const Test1 = () =>{
    const { t } = useTranslation('header')
    const [language,setLanguage] = useState('zn')


    useEffect(()=>{
        console.log(t("课程"))
    },[t])
    const navigation = [
        { id:1 ,name: `${t("课程")}`, href: '/course' },
        { id:2 ,name:`${t("Hackathons")}`, href: '/hackathons' },
        { id:3 ,name: `${t("活动")}`, href: '/meeting' },
        { id:4 ,name: `${t("关于我们")}`, href: '/#About' },
        // { id:5 ,name: 'Job Fair', href: '/JobFair/开发' },
    ]

    return(
        <div>
            <h3>{t('name')}</h3>
            <label>语言切换</label>
          <Link href="/test1" locale="zn">
              中文
          </Link>


            <Link href="/test1" locale="de">
                de
            </Link>
            <Link href="/test1" locale="en">
                英文
            </Link>
            <div>

            </div>
        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['second-page', 'common',"footer","header"]),
    },
})

export default Test1
