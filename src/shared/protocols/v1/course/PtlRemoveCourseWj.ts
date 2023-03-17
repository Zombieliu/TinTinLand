// This is a demo code file
// Feel free to delete it

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqRemoveCourseWj {
    /** 要增加的消息内容 */
    course_name:string;
    course_wj_url_list:string;
}

export interface ResRemoveCourseWj {
    /** 服务端内容创建时间 */
    time: Date;
}
