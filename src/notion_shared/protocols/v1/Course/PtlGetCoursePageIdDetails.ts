export interface ReqGetCoursePageIdDetails {
    /** 要增加的消息内容 */
    pageId:string
}

export interface ResGetCoursePageIdDetails {
    /** 服务端内容创建时间 */
    project_details:string
    time: Date
}
