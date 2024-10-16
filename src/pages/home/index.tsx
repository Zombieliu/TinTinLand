import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from 'next/image';
import Header from "../../components/header";
import Heads from "../../components/head";
import { Activity_Alldetail} from "../../jotai";
import HackathonsState from "../../components/state";
import Loading from "../../components/loading";
import Tail from "../../components/tail";
import { Keyboard, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Utility functions
const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

const parseJsonSafely = (jsonString: string, key: string) => {
  if (!jsonString || jsonString === '[]') {
    console.warn(`Empty or null JSON string for ${key}`);
    return [];
  }
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(`Failed to parse JSON for ${key}:`, error);
    console.error('Problematic JSON string:', jsonString);
    return [];
  }
};

// Components
const Course = ({ data }: { data: any[] }) => {
  const { t } = useTranslation('common');
  const course_info = data; // Directly use the data passed as prop

  return (
    <div id="Educate" className="pt-20">
      <div className="text-indigo-700 text-2xl">
        {t("TinTin课程")}
      </div>
      
      <div className="text-2xl md:text-4xl my-5">
        <div>
          {t("学习最前沿的 Web3 技术")}
          <br/>
          {t("创造未来开放网络")}
        </div>
      </div>

      <div className="mb-5 text-sm md:text-base">
        <div>
          {t("生态官方合作课程，项目 CTO &核心开发者亲自授课")}
        </div>
        <div>
          {t("配套高质量社群，全球一线开发者助教全程陪伴，社区同学交流讨论")}
        </div>

        <div className="flex justify-end md:-mt-10">
          <Link href="/course" legacyBehavior>
            <div className="flex bg-white text-black rounded-full cursor-pointer text-sm items-center px-4 py-1.5">
              <div className="mr-1">
                {t("查看更多")}
              </div>
              <div>
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Desktop view */}
      <div className="w-full relative hidden overflow-hidden xl:flex">
        <div className="w-full h-full relative transition-all duration-700" id="carousel">
          <Swiper
            rewind={true}
            slidesPerView={1}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            grabCursor={false}
            keyboard={{
              enabled: true,
            }}
            breakpoints={{
              769: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
            }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            scrollbar={false}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Keyboard, Scrollbar, Navigation, Pagination]}
            className="swiper-container gap-4"
          >
            {course_info.map(item => (
              <SwiperSlide key={item.id} className={item.homeDisplay === "False" ? "hidden" : ""}>
                <CourseCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <SwiperStyles />
        </div>
      </div>

      {/* Mobile view */}
      <div className="w-full xl:hidden">
        <div className="w-full flex relative overflow-x-auto snap-x snap-mandatory">
          <div className="flex">
            {course_info.map(item => (
              <div key={item.id} className={item.homeDisplay === "False" ? "hidden" : "rounded-2xl snap-always snap-center md:snap-start w-90 mx-5"}>
                <CourseCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ item }) => (
  <div className="rounded-2xl mr-4">
    <Image
      className="rounded-t-2xl w-full"
      src={item.img}
      alt=""
      width={500}
      height={300}
      layout="responsive"
    />
    <div className="px-10 py-8 bg-white rounded-b-2xl">
      <div className="flex h-20 overflow-hidden flex-wrap">
        {item.type.map(list => (
          <div key={list.content} className="bg-gray-200 rounded-full text-center text-gray-700 h-7 px-3 py-1 mr-2 mb-4 text-sm">
            {list.content}
          </div>
        ))}
      </div>
      <div className="line-clamp-2 text-xl h-14 mt-2">
        {item.name}
      </div>
      <div className="flex mt-5">
        <CourseButton item={item} />
      </div>
    </div>
  </div>
);

const CourseButton = ({ item }) => {
  const { t } = useTranslation('common');
  
  let buttonClass = "text-xs 2xl:text-xl rounded-full px-4 2xl:px-8 py-2.5";
  let buttonText = "";
  let href = "#"; // Default href
  
  switch(item.state) {
    case "OnGoing":
      buttonClass += " bg-black text-white";
      buttonText = "Join Now";
      break;
    case "Ended":
      buttonClass += " bg-orange-500 text-white";
      buttonText = "Ended";
      break;
    default:
      buttonClass += " border border-black text-black";
      buttonText = "Learn More";
  }

  // Ensure item.link is not null or undefined
  if (item.link) {
    href = item.link;
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <a target="_blank" rel="noopener noreferrer" className={buttonClass}>
        {t(buttonText)}
      </a>
    </Link>
  );
};

const SwiperStyles = () => (
  <style jsx global>{`
    .swiper-button-next,
    .swiper-button-prev {
      border-radius: 9999px;
      background-color: white;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 1.5rem;
      color: #000 !important;
    }  
    .swiper-button-prev:after, .swiper-button-next:after {
      font-size: 1.5rem !important;
    }
    .swiper-pagination-bullet-active {
      background: black;
    }
  `}</style>
);

const Hackathons = ({ data }) => {
  const { t } = useTranslation('common')
  const [hackathonsData, setHackathonsData] = useState([])
  
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setHackathonsData(data.slice(0, 2));
    } else {
      console.warn("Hackathons data is not an array:", data);
      setHackathonsData([]);
    }
  }, [data])

  if (hackathonsData.length === 0) {
    return null;
  }

  return (
    <div id="Hackathons" className="pt-20">
      <div className="text-indigo-700 text-2xl">
        Hackathons
      </div>
      <div className="text-2xl md:text-4xl my-5">
        <div>
          {t("建立与全球开发者的联系")}
        </div>
        <div>
          {t("一起组队玩转黑客松")}
        </div>
      </div>
      <div className="mb-5 text-sm md:text-base">
        <div>
          {t("用区块链技术创建 Web3 世界")}
        </div>
        <div>
          {t("协助开发者创建团队，提供技术指导，引入投资")}
        </div>
      </div>
      <div className="flex justify-end md:-mt-10">
        <Link href="/hackathons" legacyBehavior>
          <div className="flex  bg-white text-black rounded-full cursor-pointer text-sm items-center  px-4 py-1.5">
            <div className="mr-1" >
              {t("查看更多")}
            </div>
            <div>
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
        {hackathonsData.map((hackathon, index) => (
          <div key={hackathon.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="relative">
              <div className={classNames(HackathonsState[hackathon.state] || "", "absolute top-4 right-4 rounded-full px-3 py-1 text-sm")}>
                {hackathon.state}
              </div>
              <Image
                className="w-full h-64 object-cover"
                src={hackathon.img}
                alt={hackathon.name}
                width={800}
                height={400}
                layout="responsive"
              />
              <div className="px-10 py-8">
                <div className="2xl:text-xl font-semibold xl:w-72 truncate">
                  {hackathon.name}
                </div>
                <div className="font-light">
                  {hackathon.time}
                </div>
                <div className="flex mt-5 2xl:mt-10 items-center">
                  {hackathon.registrationLink && (hackathon.state === "ComingSoon" || hackathon.state === "OnGoing") && (
                    <Link href={hackathon.registrationLink} legacyBehavior>
                      <a className="text-xs 2xl:text-xl bg-black text-white rounded-full px-8 py-2.5 mr-5" target="_blank">
                        {t("立刻报名")}
                      </a>
                    </Link>
                  )}
                  {hackathon.activityLink && (
                    <Link href={hackathon.activityLink} legacyBehavior>
                      <a className="text-xs 2xl:text-xl text-black border border-black rounded-full px-8 py-2.5" target="_blank">
                        {t("了解更多")}
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Activity = ({ data }: { data: any[] }) => {
  const { t } = useTranslation('common');
  const [activityList, setActivityList] = useAtom(Activity_Alldetail);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Limit the activity list to 4 items
      setActivityList(data.slice(0, 2));
      setIsLoading(false);
    } catch (err) {
      console.error("Error setting activity data:", err);
      setError("Failed to load activity data");
      setIsLoading(false);
    }
  }, [data, setActivityList]);

  if (isLoading) {
    return <div>Loading activities...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activityList || activityList.length === 0) {
    return <div>No activities available</div>;
  }

  // Helper function to render an activity card
  const renderActivityCard = (activity: any) => (
    <div key={activity.id} className="relative w-full md:w-1/2 p-2">
      <div className="flex flex-col p-6 bg-white rounded-2xl h-full">
        <div className="flex-grow">
          <div className="flex">
            <div className="rounded-full bg-gray-200 text-gray-700 px-2.5 py-0.5 text-sm">
              {activity.activityList[0]?.activity || t("No activity")}
            </div>
          </div>
          <div className="text-xl font-light mt-3">
            {activity.activityList[0]?.time || t("No time specified")}
          </div>
          <div className="font-semibold">
            {activity.activityList[0]?.date || t("No date specified")}
          </div>
          <div className="text-lg font-semibold mt-3 line-clamp-3">
            {activity.activityList[0]?.name || t("No name specified")}
          </div>
          {/* Add image here */}
          <img 
            className="rounded-xl mt-5 w-full object-cover"
            src={activity.activityList[0]?.poster_1}
            alt={activity.activityList[0]?.name || "Activity poster"}
          />
        </div>
        <div className="flex mt-4 items-center">
          {activity.activityList[0]?.subLink && (activity.activityList[0]?.status === "In progress" || activity.activityList[0]?.status === "Not started") && (
            <Link href={activity.activityList[0].subLink} legacyBehavior>
              <a className="text-xs bg-black text-white rounded-full px-4 py-2 mr-3">
                {t("订阅")}
              </a>
            </Link>
          )}
          <Link href={`/meetingList/${activity.id}`} legacyBehavior>
            <a className="text-xs text-black border border-black rounded-full px-4 py-2">
              {t("了解更多")}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div id="Activities" className="pt-20">
      <div className="text-indigo-700 text-2xl">
        {t("TinTin活动")}
      </div>
      <div className="text-2xl md:text-4xl my-5">
        <div>
          {t("与顶尖项目面对面讨论")}
        </div>
        <div>
          {t("获得热点趋势与开发实战经验")}
        </div>
      </div>
      <div className="mb-5 text-sm md:text-base">
        <div>
          {t("最新的多链技术分享，众多赛道实时资讯")}
        </div>
        <div>
          {t("生态项目代码实操演练，与 Web3 领军人物现场讨论")}
        </div>
      </div>
      <div className="flex justify-end md:-mt-10">
        <Link href="/meeting" legacyBehavior>
          <div className="flex bg-white text-black rounded-full cursor-pointer text-sm items-center px-4 py-1.5">
            <div className="mr-1">
              {t("查看更多")}
            </div>
            <div>
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-wrap -mx-2 mt-4">
        {activityList.map(renderActivityCard)}
      </div>
    </div>
  );
};

const AboutUs = ()=>{
    const { t } = useTranslation('common')
    return(
        <div id="About" className="pt-20">
            <div className="xl:flex justify-between items-center">

                <div className='xl:w-1/2  xl:mr-9'>
                    <div className="text-indigo-700 text-2xl ">
                        {t("关于我们")}
                    </div>
                    <div className="text-2xl xl:text-4xl 2xl:text-5xl my-5">
                        {t("赋能下一代开发者的技术社区")}
                    </div>
                    <div className="2xl:mt-14 text-base 2xl:text-xl">
                        <div>
                            {t("TinTinLand 是赋能下一代开发者的技术社区，能够通过聚集、培育、输送 开发者到各开放网络，共同定义并构建未来")}
                        </div>
                        <div className="mt-5">
                            {t("我们也将和行业有商业洞察力、有经验的开发者、社区、媒体合作，提供 技术课程、技术内容解读、AMA、线下开发者活动等")}
                        </div>
                    </div>
                    <p className="mt-4 flex">
                        {t('联系我们')}:
                        <a href="mailto:tintinland2022@gmail.com" className="cursor-pointer ml-1 text-blue-600">
                            tintinland2022@gmail.com
                    </a>
                    </p>

                </div>

                <div className="mt-5 xl:w-1/2">
                    <Image
                      className="rounded-xl w-full"
                      src="/about us.png"
                      alt=""
                      width={600}
                      height={400}
                      layout="responsive"
                    />
                </div>

            </div>

        </div>
    )
}

const Media = ({ data }: { data: any[] }) => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    console.log("data",data);
    const media_details = data
    setMedia(media_details);
  }, [data]);

  useEffect(() => {
    if (media.length > 0) {
      const onload = () => {
        const oDiv = document.getElementById('div1');
        const oUl = document.getElementsByTagName('ul')[0];
        const Li = oUl.getElementsByTagName('li');

        oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
        oUl.style.width = (Li[0].offsetWidth * Li.length) / 16 + 'rem';

        const speed = 2;
        function move() {
          if (oUl.offsetLeft < -oUl.offsetWidth / speed) {
            oUl.style.left = '0';
          }
          if (oUl.offsetLeft > 0) {
            oUl.style.left = (-oUl.offsetWidth / speed) / 16 + 'rem';
          }
          oUl.style.left = (oUl.offsetLeft - 2) / 16 + 0.05 + 'rem'; //进行左横向滚动
        }

        let timer = setInterval(move, 60);

        oDiv.onmouseover = function () {
          clearInterval(timer);
        };
        oDiv.onmouseout = function () {
          timer = setInterval(move, 60);
        };
      };
      onload();
    }
  }, [media]);

  return (
    <div className="mt-20 mx-4 relative" id="div1">
      <div className="flex relative overflow-hidden w-full h-20">
        <ul className="flex mb-2 absolute">
          {media.concat(media).map((item, index) => (
            <li key={`${item.img}-${index}`} className="w-36 xl:w-44 bg-white rounded-xl mr-4">
              <Link href={item.href} passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                   <img  className=" filter grayscale hover:grayscale-0  transition duration-300" src={item.img} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Community = ({ data }) => {
  const [community, setCommunity] = useState([]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setCommunity(data);
    } else {
      console.warn("Community data is empty or invalid");
    }
  }, [data]);

  useEffect(() => {
    const initializeScroll = () => {
      if (community.length > 0) {
        const oDiv = document.getElementById('div2');
        const oUl = oDiv.querySelector('h3'); // 使用 querySelector 替代 getElementsByTagName
        if (!oUl) {
          console.warn("Could not find h3 element");
          return;
        }
        const Li = oUl.querySelectorAll('li'); // 使用 querySelectorAll 替代 getElementsByTagName

        // 检查是否有足够的 li 元素
        if (Li.length === 0) {
          console.warn("No li elements found");
          return;
        }

        oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
        oUl.style.width = (Li[0].offsetWidth * Li.length) / 16 + 'rem';

        const speed = 2;
        const move = () => {
          if (oUl.offsetLeft < -oUl.offsetWidth / speed) {
            oUl.style.left = '0';
          }
          if (oUl.offsetLeft > 0) {
            oUl.style.left = (-oUl.offsetWidth / speed) / 16 + 'rem';
          }
          oUl.style.left = (oUl.offsetLeft - 2) / 16 + 0.05 + 'rem';
        };

        let timer = setInterval(move, 60);

        oDiv.onmouseover = function () {
          clearInterval(timer);
        };
        oDiv.onmouseout = function () {
          timer = setInterval(move, 60);
        };
      }
    };

    initializeScroll();
  }, [community]);

  if (community.length === 0) {
    return null; // or show a placeholder
  }

  return (
    <div className="mt-10 mx-4 relative" id="div2">
      <div className="flex relative overflow-hidden w-full h-16">
        <h3 className="flex mb-2 absolute">
          {community.concat(community).map((item, index) => (
            <li key={`${item.img}-${index}`} className="w-36 xl:w-44 bg-white rounded-xl mr-4 list-none">
              <Link href={item.href} passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <Image
                    className="filter grayscale hover:grayscale-0 transition duration-300"
                    src={item.img}
                    alt=""
                    width={176}
                    height={64}
                    layout="responsive"
                  />
                </a>
              </Link>
            </li>
          ))}
        </h3>
      </div>
    </div>
  );
};

const CommunityMember = ({ data }) => {
  const { t } = useTranslation('common');
  const [communityMember, setCommunityMember] = useState([]);

  useEffect(() => {
    setCommunityMember(data);
  }, [data]);

  useEffect(() => {
    if (communityMember.length > 0) {
      const onload = () => {
        const oDiv = document.getElementById('div3');
        const oUl = document.getElementsByTagName('h4')[0];
        const Li = oUl.getElementsByTagName('li');

        oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
        oUl.style.width = (Li[0].offsetWidth * Li.length) / 15 + 'rem';

        const speed = 2;
        const move = () => {
          if (oUl.offsetLeft < -oUl.offsetWidth / speed) {
            oUl.style.left = '0';
          }
          if (oUl.offsetLeft > 0) {
            oUl.style.left = (-oUl.offsetWidth / speed) / 16 + 'rem';
          }
          oUl.style.left = (oUl.offsetLeft - 2) / 16 + 0.05 + 'rem';
        };

        let timer = setInterval(move, 60);

        oDiv.onmouseover = function () {
          clearInterval(timer);
        };
        oDiv.onmouseout = function () {
          timer = setInterval(move, 60);
        };
      };
      onload();
    }
  }, [communityMember]);

  return (
    <div className="w-full mt-10 mb-32">
      <div className="text-indigo-700 text-2xl mb-10">
        {t("社区成员")}
      </div>
      <div className="xl:hidden relative overflow-x-auto w-full h-64 snap-x snap-mandatory">
        <div className="flex absolute mb-2">
          {communityMember.map((item) => (
            <div key={item.name} className="rounded-2xl snap-always snap-start w-90 bg-white mr-8 p-5 list-none">
              <div className="flex items-center">
                <Image 
                  className="rounded-full"
                  src={item.img}
                  alt={item.name}
                  width={64}
                  height={64}
                />
                <div className="ml-2">
                  <div className="text-xl font-semibold">
                    {item.name}
                  </div>
                  <div>
                    {item.position}
                  </div>
                </div>
              </div>
              <div className="mt-5 line-clamp-5">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden xl:flex relative overflow-hidden w-full h-64" id="div3">
        <h4 className="flex absolute mb-2">
          {communityMember.map((item) => (
            <li key={item.name} className="rounded-2xl snap-always snap-center w-96 bg-white mr-8 p-5 list-none">
              <div className="flex items-center">
                <Image 
                  className="rounded-full"
                  src={item.img}
                  alt={item.name}
                  width={64}
                  height={64}
                />
                <div className="ml-2">
                  <div className="text-xl font-semibold">
                    {item.name}
                  </div>
                  <div>
                    {item.position}
                  </div>
                </div>
              </div>
              <div className="mt-5 line-clamp-5">
                {item.text}
              </div>
            </li>
          ))}
        </h4>
      </div>
    </div>
  );
};

// Update the Home component
const Home = ({ props }: { props: any }) => {
  const { t } = useTranslation('common');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Safely access props with default values
  const course_details = props?.course_details ? parseJsonSafely(props.course_details, 'course_details') : [];
  const media_details = props?.media_details ? parseJsonSafely(props.media_details, 'media_details') : [];
  const community_details = props?.community_details ? parseJsonSafely(props.community_details, 'community_details') : [];
  const communityMember_details = props?.communityMember_details ? parseJsonSafely(props.communityMember_details, 'communityMember_details') : [];
  const hackathons_details = props?.hackathons_details ? parseJsonSafely(props.hackathons_details, 'hackathons_details') : [];
  const activity_details = props?.activity_details ? parseJsonSafely(props.activity_details, 'activity_details') : [];

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="mx-auto relative sm:bg-fixed overflow-hidden" style={{backgroundImage: "url('/tintin-bg.png')"}}>
      <Heads />
      <Header />
      <main className="lg:px-10 xl:px-20 relative px-5 pt-24 mx-auto">
        <section className="backdrop-blur-sm bg-white/60 w-full rounded-2xl py-10 px-5 md:px-10">
        <div className="text-2xl md:text-4xl xl:text-6xl ">
                    <div>

                        A Global Web3.0 Developer Community
                    </div>
                        <div>
                           for Builders,Entrepreneurs
                        </div>
                        <div>
                          and Enthusiasts
                        </div>
                    </div>
                    <div className="mt-10 text-xs md:text-sm">
                        <div>
                            {t("赋能下一代开发者")}
                        </div>
                        <div>
                            {t("通过聚集、培育、输送开发者到各开放网络，共同定义并构建未来")}
                        </div>
                    </div>
        </section>
        <Course data={course_details} />
        <Hackathons data={hackathons_details} />
        <Activity data={activity_details} />
      </main>
      <section className="relative">
        <Media data={media_details} />
        <Community data={community_details} />
      </section>
      <section className="lg:px-10 xl:px-20 relative px-5 mx-auto">
        <AboutUs />
      </section>
      <section className="lg:px-10 xl:px-20 relative px-5 pt-16 mx-auto">
        <CommunityMember data={communityMember_details} />
      </section>
      <Loading/>
      <Tail/>
    </div>
  );
};

export default Home;