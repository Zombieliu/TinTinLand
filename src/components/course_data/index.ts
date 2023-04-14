import { notion_client } from "../../client";
import {ActivityDatabaseID, CommunityMemberDatabaseID, HackathonsDatabaseID} from "../../constants";

export const databaseId = "4840faa8c91446279b26207812957d35"
//
// const TypeData  = (response) =>{
//     let TypeList = []
//     for (let type_length = 0 ;type_length<response.length;type_length++){
//         const type = {content:response[type_length].name}
//         TypeList.push(type)
//     }
//     return TypeList
// }
//
// const CommunityRecommendationData = async (pageId) => {
//
//     let Community_recommendation = await notion_client.callApi('v1/Project/GetPageIdDetails', {
//         pageId
//     });
//     let Community_recommendationData = await JSON.parse(Community_recommendation.res.project_details).properties["Sub-item"].relation
//     let Community_recommendationList = []
//     for (let community_recommendation_length = 0; community_recommendation_length < Community_recommendationData.length; community_recommendation_length++) {
//         const Community_recommendationKids = await notion_client.callApi('v1/Project/GetPageIdDetails', {
//             pageId: Community_recommendationData[community_recommendation_length].id
//         });
//         let Community_recommendationKidsData = await JSON.parse(Community_recommendationKids.res.project_details).properties
//         let community_recommendation = {
//             name: Community_recommendationKidsData.Name.title[0].plain_text,
//             position: Community_recommendationKidsData.Position.rich_text[0].plain_text,
//             img: Community_recommendationKidsData.Img.files[0].file.url,
//             name2: Community_recommendationKidsData.Name2.rich_text[0] ? Community_recommendationKidsData.Name2.rich_text[0].plain_text : "",
//             position2: Community_recommendationKidsData.Position2.rich_text[0] ? Community_recommendationKidsData.Position2.rich_text[0].plain_text : "",
//             img2: Community_recommendationKidsData.Img2.files[0] ? Community_recommendationKidsData.Img2.files[0].file.url : "",
//             text: Community_recommendationKidsData.Text.rich_text[0].plain_text,
//         }
//         Community_recommendationList.push(community_recommendation)
//
//     }
//     return Community_recommendationList
//
// }
//
// const TeacherData = async (pageId)=>{
//
//     let TeacherList = []
//
//     for(let i = 0 ;i < pageId.length;i++){
//         let response = await notion_client.callApi('v1/Project/GetPageIdDetails', {
//             pageId:pageId[i].id
//         });
//         const teacher_data = await JSON.parse(response.res.project_details).properties
//         const teacherList = {
//             name: teacher_data.Name.title[0].plain_text,
//             img: teacher_data.Img.files[0].file.url,
//             title: teacher_data.Title.rich_text[0].plain_text,
//             introduction: teacher_data.Introduction.rich_text[0].plain_text
//         }
//         TeacherList.push(teacherList)
//     }
//     return TeacherList
//
// }
//
// const ProjectProviderData = async (pageId) =>{
//     let ProjectProviderList = []
//
//     for(let i = 0 ;i < pageId.length;i++){
//         let response = await notion_client.callApi('v1/Project/GetPageIdDetails', {
//             pageId:pageId[i].id
//         });
//         const project_provider_data = await JSON.parse(response.res.project_details).properties
//         const project_provider_list = {
//             name: project_provider_data.Name.title[0].plain_text,
//             img: project_provider_data.Img.files[0].file.url,
//         }
//         ProjectProviderList.push(project_provider_list)
//     }
//     return ProjectProviderList
//
// }
//
// const TargetData = async (pageId) =>{
//     let TargetList = []
//
//     for(let i = 0 ;i < pageId.length;i++){
//         let response = await notion_client.callApi('v1/Project/GetPageIdDetails', {
//             pageId:pageId[i].id
//         });
//         const target_data = await JSON.parse(response.res.project_details).properties
//         const target_list = {
//             name: target_data.Name.title[0].plain_text,
//         }
//         TargetList.push(target_list)
//
//     }
//     return TargetList
//
// }
//
// const MethodData = async (pageId) =>{
//     let MethodList = []
//
//     for(let i = 0 ;i < pageId.length;i++){
//         let response = await notion_client.callApi('v1/Project/GetPageIdDetails', {
//             pageId:pageId[i].id
//         });
//         const method_data = await JSON.parse(response.res.project_details).properties
//         const method_list = {
//             name: method_data.Name.title[0].plain_text,
//             img: method_data.Img.files[0].file.url,
//         }
//         MethodList.push(method_list)
//     }
//     return MethodList
//
// }
//
// const CommunitySupportData = async (pageId) =>{
//     let CommunitySupportList = []
//     for(let i = 0 ;i < pageId.length;i++){
//         let response = await notion_client.callApi('v1/Project/GetPageIdDetails', {
//             pageId:pageId[i].id
//         });
//         const community_support_data = await JSON.parse(response.res.project_details).properties
//         const community_support_list = {
//             name: community_support_data.Name.title[0].plain_text,
//             icon: community_support_data.Icon.rich_text[0].plain_text,
//         }
//         CommunitySupportList.push(community_support_list)
//     }
//     return CommunitySupportList
//
// }
//
export const CourseData = async () =>{
    let CourseDataList = []
    let response = await notion_client.callApi('v1/Activity/GetActivityAllDetails', {
        databaseId: ActivityDatabaseID
    });
    // console.log(JSON.parse(response.res.project_details))

    console.log(response)
   return  CourseDataList
}
//
// const QueryAllCourse = async () =>{
//     const Course_info = []
//     const TaUser = await notion_client.callApi('v1/Project/GetProjectAllDetails', {
//         databaseId
//     });
//     const response = await JSON.parse(TaUser.res.project_details)
//     console.log(response)
//
//     // for (let course_length = 0; course_length < response.length; course_length++) {
//     //     let typeData = response[course_length].properties.Type.multi_select
//     //     let TypeList = TypeData(typeData)
//     //     let course_info =
//     //         {
//     //             id:    response[course_length].properties.ID.number,
//     //             name:  response[course_length].properties.Name.title[0].plain_text,
//     //             img:   response[course_length].properties.Img.files[0].file.url,
//     //             link:  response[course_length].properties.Link.url,
//     //             state: response[course_length].properties.State.status.name,
//     //             type: TypeList,
//     //         }
//     //
//     //     Course_info.push(course_info)
//     // }
//
//     return Course_info
// }
//
// const QueryCourseData = async (ID) => {
//     const TaUser = await notion_client.callApi('v1/Project/GetProjectDetails', {
//         id: "1",
//         databaseId
//     });
//     console.log(TaUser)
//     // const response = await JSON.parse(TaUser.res.project_details).results
//     // const course_length = Number(ID) - 1
//     //     let typeData = response[course_length].properties.Type.multi_select
//     //     let TypeList = TypeData(typeData)
//     //
//     //     let Community_recommendationPageId = await response[course_length].properties.Community_recommendation.relation[0].id
//     //     let Community_recommendationList = await CommunityRecommendationData(Community_recommendationPageId)
//     //
//     //     let TeacherPageId = await response[course_length].properties.Teacher.relation;
//     //     let Teacher_List = await TeacherData(TeacherPageId)
//     //
//     //     let ProjectProviderPageId = await response[course_length].properties.Project_provider.relation
//     //     let Project_providerList = await ProjectProviderData(ProjectProviderPageId)
//     //
//     //     let TargetPageId = await  response[course_length].properties.Target.relation
//     //     let Target_List = await TargetData(TargetPageId)
//     //
//     //     let MethodPageId = await  response[course_length].properties.Method.relation
//     //     let Method_List = await MethodData(MethodPageId)
//     //
//     //     let CommunitySupportPageId = await  response[course_length].properties.Community_support.relation
//     //     let Community_support_List = await CommunitySupportData(CommunitySupportPageId)
//     //
//     //     let CourseDataPageId = await  response[course_length].properties.Course_data.relation
//     //     let  Course_list = await CourseData(CourseDataPageId)
//     //
//     //     let course_info =
//     //         {
//     //             id: response[course_length].properties.ID.number,
//     //             name: response[course_length].properties.Name.title[0].plain_text,
//     //             cycle: response[course_length].properties.Cycle.rich_text[0].plain_text,
//     //             img: response[course_length].properties.Img.files[0].file.url,
//     //             title: response[course_length].properties.Title.rich_text[0].plain_text,
//     //             link: response[course_length].properties.Link.url,
//     //             state: response[course_length].properties.State.status.name,
//     //             startTime: response[course_length].properties.StartTime.rich_text[0].plain_text,
//     //             endTime: response[course_length].properties.EndTime.rich_text[0].plain_text,
//     //             type: TypeList,
//     //             course_data:Course_list,
//     //             community_recommendation: Community_recommendationList,
//     //             teacher: Teacher_List,
//     //             project_provider: Project_providerList,
//     //             method: Method_List,
//     //             target: Target_List,
//     //             community_support: Community_support_List
//     //         }
//     //
//     // return course_info
// }
//
//
// export {TypeData,CommunityRecommendationData,QueryCourseData,QueryAllCourse}
