// This is a demo code file
// Feel free to delete it

import {course_details} from "../../../interface/course_details";

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqGetAllCourse {
    /** 要增加的消息内容 */
}

export interface ResGetAllCourse {
    /** 服务端内容创建时间 */
    time: Date;
    course_details:string
}
