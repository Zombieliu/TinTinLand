import type { NextPage } from 'next';
import Home from "./home";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Heads from "../components/head";
import React from "react";
import {
    ActivityDatabaseID,
    CommunityDatabaseID,
    CommunityMemberDatabaseID,
    CourseDatabaseId,
    HackathonsDatabaseID, https,
    MediaDatabaseID
} from "../constants";

const IndexPage: NextPage = (props) => {
    const router = useRouter()
    const { t } = useTranslation('common')
    console.log(t('change-locale'))
    console.log(router.locale)

  return (
      <main>
        <div>
            <Heads/>
              <Home  props={props}></Home>
        </div>
          {/*<Link*/}
          {/*    href='/'*/}
          {/*    locale={router.locale === 'en' ? 'de' : 'en'}*/}
          {/*>*/}
          {/*    <button>*/}
          {/*        {t('change-locale')}*/}
          {/*    </button>*/}
          {/*</Link>*/}
          {/*<Link href='/second'>*/}
          {/*    <button*/}
          {/*        type='button'*/}
          {/*    >*/}
          {/*        {t('to-second-page')}*/}
          {/*    </button>*/}
          {/*</Link>*/}
      </main>
  )
}

export default IndexPage

// export const getStaticProps = async ({ locale }) => ({
//     props: {
//         ...await serverSideTranslations(locale, ['common', 'footer']),
//     }
// })


export async function getStaticProps(){
    let course_data = {databaseId: CourseDatabaseId,}
    const course_ret = await fetch(`${https}/v1/Course/GetCourseAllDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(course_data)
    })
    const course_result = await course_ret.json()
    let course_details = await course_result.res.project_details

    let hackathons_data = {databaseId:HackathonsDatabaseID}
    const hackathons_ret = await fetch(`${https}/v1/Hackathons/GetHackathonsDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(hackathons_data)
    })
    const hackathons_result = await hackathons_ret.json()
    let  hackathons_details = await hackathons_result.res.project_details

    let activity_data = {databaseId:ActivityDatabaseID}
    const activity_ret = await fetch(`${https}/v1/Activity/GetActivityAllDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(activity_data)
    })
    const activity_result = await activity_ret.json()
    let  activity_details = await activity_result.res.project_details

    let media_data = {databaseId: MediaDatabaseID,}
    const media_ret = await fetch(`${https}/v1/Media/GetMediaDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(media_data)
    })
    const media_result = await media_ret.json()
    let media_details = await media_result.res.project_details



    let community_data = {databaseId: CommunityDatabaseID}
    const community_ret = await fetch(`${https}/v1/Media/GetMediaDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(community_data)
    })
    const community_result = await community_ret.json()
    let  community_details = await community_result.res.project_details

    let communityMember_data = {databaseId: CommunityMemberDatabaseID}
    const communityMember_ret = await fetch(`${https}/v1/CommunityMember/GetCommunityMemberDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(communityMember_data)
    })
    const communityMember_result = await communityMember_ret.json()
    let  communityMember_details = await communityMember_result.res.project_details

    {fallback: false}
    return {
        props:{
            course_details,
            media_details,
            community_details,
            communityMember_details,
            hackathons_details,
            activity_details
        }
    }

}
