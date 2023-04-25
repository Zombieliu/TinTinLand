import { useAtom ,atom} from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const data  = {
    id:"",
    name:"",
    cycle:"",
    img:"",
    title:"",
    link:"",
    state:"",
    homeDisplay:"",
    startTime:"",
    endTime:"",
    type:[{content:""}],
    course_data:[{
        name:"",
        content:[
            { text: "" }
        ]
    }],
    community_recommendation: [{
        name:"",
        img:"",
        position:"",
        img2:"",
        name2:"",
        position2:"",
        text:"",
    }],
    teacher:[{name:"",img:"",title:"",introduction:""}],
    project_provider: [{name:"",img:""}],
    method:[{name:"",img:""}],
    target:[{name:""}],
    community_support:[{name:"",icon:""}]

}

const courseData = [
    {
        id:"",
        name:"",
        img:"",
        link:"",
        state:"",
        homeDisplay:"",
        type:[
            {content:""}
        ]
    }
]
const hackathonsData = [
    {
        id:"",
        activityLink:"",
        name:"",
        img:"",
        registrationLink:"",
        state:"",
        text:"",
        time:"",
    },
    {
        id:"",
        activityLink:"",
        name:"",
        img:"",
        registrationLink:"",
        state:"",
        text:"",
        time:"",
    },
    {
        id:"",
        activityLink:"",
        name:"",
        img:"",
        registrationLink:"",
        state:"",
        text:"",
        time:"",
    }
]
const activityData = [
    {
        id: "",
        name: "",
        des: "",
        activityList: [{
            activity: "",
            name: "",
            status: "",
            time: "",
            date: "",
            subLink: "",
            videoLink: "",
            poster_1: "",
            poster_2: "",
        },]
    },

    {
        id: "",
        name: "",
        des: "",
        activityList: [{
            activity: "",
            name: "",
            status: "",
            time: "",
            date: "",
            subLink: "",
            videoLink: "",
            poster_1: "",
            poster_2: "",
        },]
    },
    {
        id: "",
        name: "",
        des: "",
        activityList: [{
            activity: "",
            name: "",
            status: "",
            time: "",
            date: "",
            subLink: "",
            videoLink: "",
            poster_1: "",
            poster_2: "",
        },]
    },
]
const PopUpBoxInfo = atom({
    type:"",
    state:false,
    title:"",
    hash:""
})
const PopUpBoxState = atom(false)

const Course_data = atom(courseData)

const Course_Detail = atom(data)

const Activity_Alldetail = atom(activityData)

const Activity_detail = atom(activityData[0])

const Hackathons_detail = atom(hackathonsData)

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


const Language = atomWithStorage("Language","cn")
export {Activity_detail,Activity_Alldetail,Course_data,Hackathons_detail,Language,Course_Detail,JobFairInfoState,LoginState,UserEmail,PopUpBoxState,PopUpBoxInfo,OpenLoginState,OpenPayState,PayState,PendingPayState,PromptBoxState,SignUpCourseBoxState,SignUpCourseBoxData}
