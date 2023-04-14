// This is a demo code file
// Feel free to delete it

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqGetHackathonsDetails {
    /** 要增加的消息内容 */
    databaseId:string
}

export interface ResGetHackathonsDetails {
    /** 服务端内容创建时间 */
    project_details:string
    time: Date
}
