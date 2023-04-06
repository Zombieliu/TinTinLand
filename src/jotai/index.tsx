import { useAtom ,atom} from 'jotai'
import { atomWithStorage } from 'jotai/utils'


const detail = {
    id: "",
    img: "",
    cycle:"",
    name:"",
    state:false,
    AboutStart:true,
    startTime:"",
    registrationDeadline:"",
    link:"",
    h1:"",
    type: [{content:""}],
    Course_data:[{
        title:"",
        content:[
            { h1: "" }
        ]
    }],
    Learning_Highlights:[{icon:"", h1:"",}],
    teacher:[{img:"",name:"",title:"",introduction:""}],
    project_Provider: [],
    community_recommendation: [{
        avatar:"",
        name:"",
        position:"",
        avatar2:"",
        name2:"",
        position2:"",
        h1:"",
    }],
    suitable_ForTheCrowd:[],
    community_support:[],
}

const PopUpBoxInfo = atom({
    type:"",
    state:false,
    title:"",
    hash:""
})
const PopUpBoxState = atom(false)

const Course_Detail = atom(detail)

const JobFairInfoState = atom(false)

const LoginState = atom(false)

const OpenLoginState = atom(false)

const userEmail = { user_email: "",username:""}
const UserEmail = atomWithStorage("UserEmail",userEmail)

const OpenPayState = atom(false)

//修改支付状态
const PayState = atom("pending")

//等待页面倒计时
const PendingPayState = atom(0)

//个人主页弹出框
const PromptBoxState = atom(false)

//课程报名弹出框
const SignUpCourseBoxState = atom(false)
//课程信息
const SignUpCourseBoxData = atom({
    img:"",
    courseName:"",
    price:""
})


const Language = atom("zn")
export {Language,Course_Detail,JobFairInfoState,LoginState,UserEmail,PopUpBoxState,PopUpBoxInfo,OpenLoginState,OpenPayState,PayState,PendingPayState,PromptBoxState,SignUpCourseBoxState,SignUpCourseBoxData}
