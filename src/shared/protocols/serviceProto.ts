import { ServiceProto } from 'tsrpc-proto';
import { ReqAddCourse, ResAddCourse } from './v1/course/PtlAddCourse';
import { ReqAddCourseAdvantages, ResAddCourseAdvantages } from './v1/course/PtlAddCourseAdvantages';
import { ReqAddCourseCommunitySupport, ResAddCourseCommunitySupport } from './v1/course/PtlAddCourseCommunitySupport';
import { ReqAddCourseHomework, ResAddCourseHomework } from './v1/course/PtlAddCourseHomework';
import { ReqAddCourseProvider, ResAddCourseProvider } from './v1/course/PtlAddCourseProvider';
import { ReqAddCourseTeacher, ResAddCourseTeacher } from './v1/course/PtlAddCourseTeacher';
import { ReqAddCourseWj, ResAddCourseWj } from './v1/course/PtlAddCourseWj';
import { ReqGetAllCourse, ResGetAllCourse } from './v1/course/PtlGetAllCourse';
import { ReqGetAllCourseWj, ResGetAllCourseWj } from './v1/course/PtlGetAllCourseWj';
import { ReqGetCourse, ResGetCourse } from './v1/course/PtlGetCourse';
import { ReqGetCourseAdvantages, ResGetCourseAdvantages } from './v1/course/PtlGetCourseAdvantages';
import { ReqGetCourseCommunitySupport, ResGetCourseCommunitySupport } from './v1/course/PtlGetCourseCommunitySupport';
import { ReqGetCourseHomework, ResGetCourseHomework } from './v1/course/PtlGetCourseHomework';
import { ReqGetCourseProvider, ResGetCourseProvider } from './v1/course/PtlGetCourseProvider';
import { ReqGetCourseTeacher, ResGetCourseTeacher } from './v1/course/PtlGetCourseTeacher';
import { ReqGetCourseWj, ResGetCourseWj } from './v1/course/PtlGetCourseWj';
import { ReqGetCourseWjResult, ResGetCourseWjResult } from './v1/course/PtlGetCourseWjResult';
import { ReqRemoveCourse, ResRemoveCourse } from './v1/course/PtlRemoveCourse';
import { ReqRemoveCourseWj, ResRemoveCourseWj } from './v1/course/PtlRemoveCourseWj';
import { ReqCheckEmail, ResCheckEmail } from './v1/email/PtlCheckEmail';
import { ReqSendEmail, ResSendEmail } from './v1/email/PtlSendEmail';
import { ReqEnrollCourse, ResEnrollCourse } from './v1/teachable/PtlEnrollCourse';
import { ReqEnrollUser, ResEnrollUser } from './v1/teachable/PtlEnrollUser';
import { ReqGetCourseId, ResGetCourseId } from './v1/teachable/PtlGetCourseId';
import { ReqGetTaUser, ResGetTaUser } from './v1/teachable/PtlGetTaUser';
import { ReqCheckTx, ResCheckTx } from './v1/tx/PtlCheckTx';
import { ReqAddUser, ResAddUser } from './v1/user/PtlAddUser';
import { ReqAddUserBind, ResAddUserBind } from './v1/user/PtlAddUserBind';
import { ReqAddUserCourseWj, ResAddUserCourseWj } from './v1/user/PtlAddUserCourseWj';
import { ReqGetThirdPartyUser, ResGetThirdPartyUser } from './v1/user/PtlGetThirdPartyUser';
import { ReqGetUser, ResGetUser } from './v1/user/PtlGetUser';
import { ReqGetUserBind, ResGetUserBind } from './v1/user/PtlGetUserBind';
import { ReqGetUserCourseList, ResGetUserCourseList } from './v1/user/PtlGetUserCourseList';
import { ReqGetUserCourseWj, ResGetUserCourseWj } from './v1/user/PtlGetUserCourseWj';
import { ReqUpdateUser, ResUpdateUser } from './v1/user/PtlUpdateUser';
import { ReqAddWjAccessToken, ResAddWjAccessToken } from './v1/wj/PtlAddWjAccessToken';
import { ReqAddWjAnswersList, ResAddWjAnswersList } from './v1/wj/PtlAddWjAnswersList';
import { ReqAddWjLoginCode, ResAddWjLoginCode } from './v1/wj/PtlAddWjLoginCode';
import { ReqAddWjUser, ResAddWjUser } from './v1/wj/PtlAddWjUser';
import { ReqGetWjAccessToken, ResGetWjAccessToken } from './v1/wj/PtlGetWjAccessToken';

export interface ServiceType {
    api: {
        "v1/course/AddCourse": {
            req: ReqAddCourse,
            res: ResAddCourse
        },
        "v1/course/AddCourseAdvantages": {
            req: ReqAddCourseAdvantages,
            res: ResAddCourseAdvantages
        },
        "v1/course/AddCourseCommunitySupport": {
            req: ReqAddCourseCommunitySupport,
            res: ResAddCourseCommunitySupport
        },
        "v1/course/AddCourseHomework": {
            req: ReqAddCourseHomework,
            res: ResAddCourseHomework
        },
        "v1/course/AddCourseProvider": {
            req: ReqAddCourseProvider,
            res: ResAddCourseProvider
        },
        "v1/course/AddCourseTeacher": {
            req: ReqAddCourseTeacher,
            res: ResAddCourseTeacher
        },
        "v1/course/AddCourseWj": {
            req: ReqAddCourseWj,
            res: ResAddCourseWj
        },
        "v1/course/GetAllCourse": {
            req: ReqGetAllCourse,
            res: ResGetAllCourse
        },
        "v1/course/GetAllCourseWj": {
            req: ReqGetAllCourseWj,
            res: ResGetAllCourseWj
        },
        "v1/course/GetCourse": {
            req: ReqGetCourse,
            res: ResGetCourse
        },
        "v1/course/GetCourseAdvantages": {
            req: ReqGetCourseAdvantages,
            res: ResGetCourseAdvantages
        },
        "v1/course/GetCourseCommunitySupport": {
            req: ReqGetCourseCommunitySupport,
            res: ResGetCourseCommunitySupport
        },
        "v1/course/GetCourseHomework": {
            req: ReqGetCourseHomework,
            res: ResGetCourseHomework
        },
        "v1/course/GetCourseProvider": {
            req: ReqGetCourseProvider,
            res: ResGetCourseProvider
        },
        "v1/course/GetCourseTeacher": {
            req: ReqGetCourseTeacher,
            res: ResGetCourseTeacher
        },
        "v1/course/GetCourseWj": {
            req: ReqGetCourseWj,
            res: ResGetCourseWj
        },
        "v1/course/GetCourseWjResult": {
            req: ReqGetCourseWjResult,
            res: ResGetCourseWjResult
        },
        "v1/course/RemoveCourse": {
            req: ReqRemoveCourse,
            res: ResRemoveCourse
        },
        "v1/course/RemoveCourseWj": {
            req: ReqRemoveCourseWj,
            res: ResRemoveCourseWj
        },
        "v1/email/CheckEmail": {
            req: ReqCheckEmail,
            res: ResCheckEmail
        },
        "v1/email/SendEmail": {
            req: ReqSendEmail,
            res: ResSendEmail
        },
        "v1/teachable/EnrollCourse": {
            req: ReqEnrollCourse,
            res: ResEnrollCourse
        },
        "v1/teachable/EnrollUser": {
            req: ReqEnrollUser,
            res: ResEnrollUser
        },
        "v1/teachable/GetCourseId": {
            req: ReqGetCourseId,
            res: ResGetCourseId
        },
        "v1/teachable/GetTaUser": {
            req: ReqGetTaUser,
            res: ResGetTaUser
        },
        "v1/tx/CheckTx": {
            req: ReqCheckTx,
            res: ResCheckTx
        },
        "v1/user/AddUser": {
            req: ReqAddUser,
            res: ResAddUser
        },
        "v1/user/AddUserBind": {
            req: ReqAddUserBind,
            res: ResAddUserBind
        },
        "v1/user/AddUserCourseWj": {
            req: ReqAddUserCourseWj,
            res: ResAddUserCourseWj
        },
        "v1/user/GetThirdPartyUser": {
            req: ReqGetThirdPartyUser,
            res: ResGetThirdPartyUser
        },
        "v1/user/GetUser": {
            req: ReqGetUser,
            res: ResGetUser
        },
        "v1/user/GetUserBind": {
            req: ReqGetUserBind,
            res: ResGetUserBind
        },
        "v1/user/GetUserCourseList": {
            req: ReqGetUserCourseList,
            res: ResGetUserCourseList
        },
        "v1/user/GetUserCourseWj": {
            req: ReqGetUserCourseWj,
            res: ResGetUserCourseWj
        },
        "v1/user/UpdateUser": {
            req: ReqUpdateUser,
            res: ResUpdateUser
        },
        "v1/wj/AddWjAccessToken": {
            req: ReqAddWjAccessToken,
            res: ResAddWjAccessToken
        },
        "v1/wj/AddWjAnswersList": {
            req: ReqAddWjAnswersList,
            res: ResAddWjAnswersList
        },
        "v1/wj/AddWjLoginCode": {
            req: ReqAddWjLoginCode,
            res: ResAddWjLoginCode
        },
        "v1/wj/AddWjUser": {
            req: ReqAddWjUser,
            res: ResAddWjUser
        },
        "v1/wj/GetWjAccessToken": {
            req: ReqGetWjAccessToken,
            res: ResGetWjAccessToken
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 19,
    "services": [
        {
            "id": 33,
            "name": "v1/course/AddCourse",
            "type": "api"
        },
        {
            "id": 34,
            "name": "v1/course/AddCourseAdvantages",
            "type": "api"
        },
        {
            "id": 35,
            "name": "v1/course/AddCourseCommunitySupport",
            "type": "api"
        },
        {
            "id": 36,
            "name": "v1/course/AddCourseHomework",
            "type": "api"
        },
        {
            "id": 37,
            "name": "v1/course/AddCourseProvider",
            "type": "api"
        },
        {
            "id": 38,
            "name": "v1/course/AddCourseTeacher",
            "type": "api"
        },
        {
            "id": 39,
            "name": "v1/course/AddCourseWj",
            "type": "api"
        },
        {
            "id": 69,
            "name": "v1/course/GetAllCourse",
            "type": "api"
        },
        {
            "id": 70,
            "name": "v1/course/GetAllCourseWj",
            "type": "api"
        },
        {
            "id": 40,
            "name": "v1/course/GetCourse",
            "type": "api"
        },
        {
            "id": 41,
            "name": "v1/course/GetCourseAdvantages",
            "type": "api"
        },
        {
            "id": 42,
            "name": "v1/course/GetCourseCommunitySupport",
            "type": "api"
        },
        {
            "id": 43,
            "name": "v1/course/GetCourseHomework",
            "type": "api"
        },
        {
            "id": 44,
            "name": "v1/course/GetCourseProvider",
            "type": "api"
        },
        {
            "id": 45,
            "name": "v1/course/GetCourseTeacher",
            "type": "api"
        },
        {
            "id": 46,
            "name": "v1/course/GetCourseWj",
            "type": "api"
        },
        {
            "id": 47,
            "name": "v1/course/GetCourseWjResult",
            "type": "api"
        },
        {
            "id": 71,
            "name": "v1/course/RemoveCourse",
            "type": "api"
        },
        {
            "id": 72,
            "name": "v1/course/RemoveCourseWj",
            "type": "api"
        },
        {
            "id": 48,
            "name": "v1/email/CheckEmail",
            "type": "api"
        },
        {
            "id": 49,
            "name": "v1/email/SendEmail",
            "type": "api"
        },
        {
            "id": 50,
            "name": "v1/teachable/EnrollCourse",
            "type": "api"
        },
        {
            "id": 51,
            "name": "v1/teachable/EnrollUser",
            "type": "api"
        },
        {
            "id": 64,
            "name": "v1/teachable/GetCourseId",
            "type": "api"
        },
        {
            "id": 63,
            "name": "v1/teachable/GetTaUser",
            "type": "api"
        },
        {
            "id": 68,
            "name": "v1/tx/CheckTx",
            "type": "api"
        },
        {
            "id": 52,
            "name": "v1/user/AddUser",
            "type": "api"
        },
        {
            "id": 67,
            "name": "v1/user/AddUserBind",
            "type": "api"
        },
        {
            "id": 53,
            "name": "v1/user/AddUserCourseWj",
            "type": "api"
        },
        {
            "id": 54,
            "name": "v1/user/GetThirdPartyUser",
            "type": "api"
        },
        {
            "id": 55,
            "name": "v1/user/GetUser",
            "type": "api"
        },
        {
            "id": 65,
            "name": "v1/user/GetUserBind",
            "type": "api"
        },
        {
            "id": 56,
            "name": "v1/user/GetUserCourseList",
            "type": "api"
        },
        {
            "id": 57,
            "name": "v1/user/GetUserCourseWj",
            "type": "api"
        },
        {
            "id": 58,
            "name": "v1/user/UpdateUser",
            "type": "api"
        },
        {
            "id": 59,
            "name": "v1/wj/AddWjAccessToken",
            "type": "api"
        },
        {
            "id": 60,
            "name": "v1/wj/AddWjAnswersList",
            "type": "api"
        },
        {
            "id": 61,
            "name": "v1/wj/AddWjLoginCode",
            "type": "api"
        },
        {
            "id": 62,
            "name": "v1/wj/AddWjUser",
            "type": "api"
        },
        {
            "id": 32,
            "name": "v1/wj/GetWjAccessToken",
            "type": "api"
        }
    ],
    "types": {
        "v1/course/PtlAddCourse/ReqAddCourse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_image",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "course_cycle",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "course_state",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "course_registration_deadline",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "course_link",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "course_description",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "course_tab",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 8,
                    "name": "course_content_data",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 9,
                    "name": "course_teacher_info",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 10,
                    "name": "course_advantages",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 11,
                    "name": "course_provider",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 12,
                    "name": "course_student_profile_feedback",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 13,
                    "name": "course_target_user_group",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 14,
                    "name": "course_community_support",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourse/ResAddCourse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseAdvantages/ReqAddCourseAdvantages": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_advantages_label",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_advantages_content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseAdvantages/ResAddCourseAdvantages": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseCommunitySupport/ReqAddCourseCommunitySupport": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_community_support_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_community_support_info",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseCommunitySupport/ResAddCourseCommunitySupport": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseHomework/ReqAddCourseHomework": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_homework_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseHomework/ResAddCourseHomework": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseProvider/ReqAddCourseProvider": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_provider_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_provider_info",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseProvider/ResAddCourseProvider": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseTeacher/ReqAddCourseTeacher": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_teacher_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_teacher_info",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseTeacher/ResAddCourseTeacher": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseWj/ReqAddCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_wj_url_list",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlAddCourseWj/ResAddCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/course/PtlGetAllCourse/ReqGetAllCourse": {
            "type": "Interface"
        },
        "v1/course/PtlGetAllCourse/ResGetAllCourse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_details",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetAllCourseWj/ReqGetAllCourseWj": {
            "type": "Interface"
        },
        "v1/course/PtlGetAllCourseWj/ResGetAllCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_wj_url_list",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourse/ReqGetCourse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourse/ResGetCourse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_details",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/course_details/course_details"
                    }
                }
            ]
        },
        "../interface/course_details/course_details": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "course_cycle",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "course_link",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "course_state",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 15,
                    "name": "course_registration_start_date",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "course_registration_deadline",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "course_image",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "course_description",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 8,
                    "name": "course_content_data",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "course_tab",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 10,
                    "name": "course_advantages",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 9,
                    "name": "course_teacher_info",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 11,
                    "name": "course_provider",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 16,
                    "name": "course_student_profile_feedback",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 13,
                    "name": "course_student_profile",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 14,
                    "name": "course_community_support",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "v1/course/PtlGetCourseAdvantages/ReqGetCourseAdvantages": {
            "type": "Interface"
        },
        "v1/course/PtlGetCourseAdvantages/ResGetCourseAdvantages": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_advantages",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourseCommunitySupport/ReqGetCourseCommunitySupport": {
            "type": "Interface"
        },
        "v1/course/PtlGetCourseCommunitySupport/ResGetCourseCommunitySupport": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_community_support_info",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourseHomework/ReqGetCourseHomework": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourseHomework/ResGetCourseHomework": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_homework",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/course_homework/course_homework"
                    }
                }
            ]
        },
        "../interface/course_homework/course_homework": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "course_homework_id",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "v1/course/PtlGetCourseProvider/ReqGetCourseProvider": {
            "type": "Interface"
        },
        "v1/course/PtlGetCourseProvider/ResGetCourseProvider": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_provider_info",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourseTeacher/ReqGetCourseTeacher": {
            "type": "Interface"
        },
        "v1/course/PtlGetCourseTeacher/ResGetCourseTeacher": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_teacher_infos",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourseWj/ReqGetCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourseWj/ResGetCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_wj_url_list",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourseWjResult/ReqGetCourseWjResult": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlGetCourseWjResult/ResGetCourseWjResult": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 2,
                    "name": "unique_username",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlRemoveCourse/ReqRemoveCourse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_image",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "course_cycle",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "course_state",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "course_registration_deadline",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "course_link",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "course_description",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "course_tab",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 8,
                    "name": "course_content_data",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 9,
                    "name": "course_teacher_info",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 10,
                    "name": "course_advantages",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 11,
                    "name": "course_provider",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 12,
                    "name": "course_student_profile_feedback",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 13,
                    "name": "course_target_user_group",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 14,
                    "name": "course_community_support",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlRemoveCourse/ResRemoveCourse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/course/PtlRemoveCourseWj/ReqRemoveCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_wj_url_list",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/course/PtlRemoveCourseWj/ResRemoveCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/email/PtlCheckEmail/ReqCheckEmail": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "email",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "code",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/email/PtlCheckEmail/ResCheckEmail": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "state",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "v1/email/PtlSendEmail/ReqSendEmail": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/email/PtlSendEmail/ResSendEmail": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/teachable/PtlEnrollCourse/ReqEnrollCourse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/teachable/PtlEnrollCourse/ResEnrollCourse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/teachable/PtlEnrollUser/ReqEnrollUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "email",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "src",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/teachable/PtlEnrollUser/ResEnrollUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/teachable/PtlGetCourseId/ReqGetCourseId": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/teachable/PtlGetCourseId/ResGetCourseId": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "course_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/teachable/PtlGetTaUser/ReqGetTaUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/teachable/PtlGetTaUser/ResGetTaUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 2,
                    "name": "user_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/tx/PtlCheckTx/ReqCheckTx": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "tx_hash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "user_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "course_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/tx/PtlCheckTx/ResCheckTx": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/user/PtlAddUser/ReqAddUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlAddUser/ResAddUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/user/PtlAddUserBind/ReqAddUserBind": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "user_evm_address",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlAddUserBind/ResAddUserBind": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/user/PtlAddUserCourseWj/ReqAddUserCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlAddUserCourseWj/ResAddUserCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/user/PtlGetThirdPartyUser/ReqGetThirdPartyUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlGetThirdPartyUser/ResGetThirdPartyUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "wj_open_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlGetUser/ReqGetUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlGetUser/ResGetUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/user/user"
                    }
                }
            ]
        },
        "../interface/user/user": {
            "type": "Interface",
            "properties": [
                {
                    "id": 13,
                    "name": "unique_username",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "user_course_passport",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "course_user",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "description",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "country",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "roles",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "experience",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 8,
                    "name": "achievements",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 9,
                    "name": "twitter",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 10,
                    "name": "github",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 11,
                    "name": "telegram",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 12,
                    "name": "privacy",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                }
            ]
        },
        "v1/user/PtlGetUserBind/ReqGetUserBind": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlGetUserBind/ResGetUserBind": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user_evm_address",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlGetUserCourseList/ReqGetUserCourseList": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlGetUserCourseList/ResGetUserCourseList": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "courses",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlGetUserCourseWj/ReqGetUserCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlGetUserCourseWj/ResGetUserCourseWj": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user_course_wj_url_list",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/user/PtlUpdateUser/ReqUpdateUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/user/user"
                    }
                }
            ]
        },
        "v1/user/PtlUpdateUser/ResUpdateUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user",
                    "type": {
                        "type": "Reference",
                        "target": "../interface/user/user"
                    }
                }
            ]
        },
        "v1/wj/PtlAddWjAccessToken/ReqAddWjAccessToken": {
            "type": "Interface"
        },
        "v1/wj/PtlAddWjAccessToken/ResAddWjAccessToken": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "access_token",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/wj/PtlAddWjAnswersList/ReqAddWjAnswersList": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/wj/PtlAddWjAnswersList/ResAddWjAnswersList": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/wj/PtlAddWjLoginCode/ReqAddWjLoginCode": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/wj/PtlAddWjLoginCode/ResAddWjLoginCode": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "code",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/wj/PtlAddWjUser/ReqAddWjUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/wj/PtlAddWjUser/ResAddWjUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "user_id",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "v1/wj/PtlGetWjAccessToken/ReqGetWjAccessToken": {
            "type": "Interface"
        },
        "v1/wj/PtlGetWjAccessToken/ResGetWjAccessToken": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                },
                {
                    "id": 1,
                    "name": "access_token",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        }
    }
};