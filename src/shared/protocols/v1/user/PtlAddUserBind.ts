// This is a demo code file
// Feel free to delete it

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqAddUserBind {
    /** 要增加的消息内容 */
    user_email: string;
    user_evm_address:string;
}

export interface ResAddUserBind {
    /** 服务端内容创建时间 */
    time: Date
}
