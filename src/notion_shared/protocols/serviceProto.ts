import { ServiceProto } from 'tsrpc-proto';
import { ReqGetActivityAllDetails, ResGetActivityAllDetails } from './v1/Activity/PtlGetActivityAllDetails';
import { ReqGetCommunityMemberDetails, ResGetCommunityMemberDetails } from './v1/CommunityMember/PtlGetCommunityMemberDetails';
import { ReqGetCourseAllDetails, ResGetCourseAllDetails } from './v1/Course/PtlGetCourseAllDetails';
import { ReqGetCourseDetails, ResGetCourseDetails } from './v1/Course/PtlGetCourseDetails';
import { ReqGetHackathonsDetails, ResGetHackathonsDetails } from './v1/Hackathons/PtlGetHackathonsDetails';
import { ReqHello, ResHello } from './v1/Hello/PtlHello';
import { ReqGetMediaDetails, ResGetMediaDetails } from './v1/Media/PtlGetMediaDetails';

export interface ServiceType {
    api: {
        "v1/Activity/GetActivityAllDetails": {
            req: ReqGetActivityAllDetails,
            res: ResGetActivityAllDetails
        },
        "v1/CommunityMember/GetCommunityMemberDetails": {
            req: ReqGetCommunityMemberDetails,
            res: ResGetCommunityMemberDetails
        },
        "v1/Course/GetCourseAllDetails": {
            req: ReqGetCourseAllDetails,
            res: ResGetCourseAllDetails
        },
        "v1/Course/GetCourseDetails": {
            req: ReqGetCourseDetails,
            res: ResGetCourseDetails
        },
        "v1/Hackathons/GetHackathonsDetails": {
            req: ReqGetHackathonsDetails,
            res: ResGetHackathonsDetails
        },
        "v1/Hello/Hello": {
            req: ReqHello,
            res: ResHello
        },
        "v1/Media/GetMediaDetails": {
            req: ReqGetMediaDetails,
            res: ResGetMediaDetails
        }
    },
    msg: {

    }
}

export const notion_serviceProto: ServiceProto<ServiceType> = {
    "version": 10,
    "services": [
        {
            "id": 11,
            "name": "v1/Activity/GetActivityAllDetails",
            "type": "api"
        },
        {
            "id": 9,
            "name": "v1/CommunityMember/GetCommunityMemberDetails",
            "type": "api"
        },
        {
            "id": 6,
            "name": "v1/Course/GetCourseAllDetails",
            "type": "api"
        },
        {
            "id": 7,
            "name": "v1/Course/GetCourseDetails",
            "type": "api"
        },
        {
            "id": 10,
            "name": "v1/Hackathons/GetHackathonsDetails",
            "type": "api"
        },
        {
            "id": 0,
            "name": "v1/Hello/Hello",
            "type": "api"
        },
        {
            "id": 8,
            "name": "v1/Media/GetMediaDetails",
            "type": "api"
        }
    ],
    "types": {
        "v1/Activity/PtlGetActivityAllDetails/ReqGetActivityAllDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "databaseId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/Activity/PtlGetActivityAllDetails/ResGetActivityAllDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "project_details",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/CommunityMember/PtlGetCommunityMemberDetails/ReqGetCommunityMemberDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "databaseId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/CommunityMember/PtlGetCommunityMemberDetails/ResGetCommunityMemberDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "project_details",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/Course/PtlGetCourseAllDetails/ReqGetCourseAllDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "databaseId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/Course/PtlGetCourseAllDetails/ResGetCourseAllDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "project_details",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/Course/PtlGetCourseDetails/ReqGetCourseDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "databaseId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/Course/PtlGetCourseDetails/ResGetCourseDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "project_details",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/Hackathons/PtlGetHackathonsDetails/ReqGetHackathonsDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "databaseId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/Hackathons/PtlGetHackathonsDetails/ResGetHackathonsDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "project_details",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/Hello/PtlHello/ReqHello": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "hello",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/Hello/PtlHello/ResHello": {
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
        "v1/Media/PtlGetMediaDetails/ReqGetMediaDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "databaseId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/Media/PtlGetMediaDetails/ResGetMediaDetails": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "project_details",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        }
    }
};
