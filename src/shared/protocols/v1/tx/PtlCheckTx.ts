// This is a demo code file
// Feel free to delete it

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqCheckTx {
    /** 要增加的消息内容 */
    tx_hash:string;
    user_id:string;
    course_id:string;
}

export interface ResCheckTx {
    /** 服务端内容创建时间 */
    time: Date
}
