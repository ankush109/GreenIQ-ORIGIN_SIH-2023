import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18n from "../../Language/i18n";

import primaryImage from "../../assets/primary-background.png";
import Demo from "../../assets/demo.jpg";
import Chatbot from "../../assets/chatbot.png";
import Banner from "../../assets/banner.jpg";
import SIH from "../../assets/sih.jpg";
import Techno from "../../assets/techno.png";
import Physics from "../../assets/physics.jpg";
import Chemistry from "../../assets/chemistry.jpg";
import Certificate from "../../assets/certificate.jpg";

import * as Links from "./Links";
import Container from "./Container";
import { GetUserQuery } from "../../api/user";

import { BiRightArrow } from "react-icons/bi";

import { GoGlobe } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

import MapCommunities from "./Mapbox/MapCommunities";
import Searchbox from "../../Components/SearchBox";
import { ImCross } from "react-icons/im";
import { LoaderIcon } from "react-hot-toast";

const Landing = () => {
  const [dropDown, setDropDown] = useState(false);
  const data = GetUserQuery();
  const [user, setuser] = useState();
  const [scrollLeft, setScrollLeft] = useState(0);
  const [chatbot, setChatbot] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setloading] = useState(false);
  const [chatquestion, setChatquestion] = useState([
    { bot: "Hi this is Sathi Bot how may i help u?" },
    { user: "Hi i want some answer" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(question);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        `question=${encodeURIComponent(question)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response) {
        setloading(false);
        setAnswer(response.data.answer);
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const array = [1, 2, 3, 4, 5, 6];
  const arr = [1, 2, 3];

  const scrollLeftHandler = () => {
    const scrollContainer = document.getElementById("scroll-container");
    const scrollStep = 100;
    scrollContainer.scrollLeft -= scrollStep;

    setScrollLeft(scrollContainer.scrollLeft);
  };
  const scrollRightHandler = () => {
    const scrollContainer = document.getElementById("scroll-container");
    const scrollStep = 100;
    scrollContainer.scrollLeft += scrollStep;
    setScrollLeft(scrollContainer.scrollLeft);
  };

  useEffect(() => {
    setuser(data?.data);
  }, [data.data]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const navigate = useNavigate();

  const NavLinks = ({ obj }) => {
    console.log(obj);
    
    return !obj.protected ? (
      <Link
        to={obj.path}
        className="hover:text-theme cursor-pointer tracking-widest  "
      >
        {obj.name}
      </Link>
    ) : user ? (
      <Link
        to={obj.path}
        className="hover:text-theme cursor-pointer tracking-widest  "
      >
        {obj.name}
      </Link>
    ) : (
      ""
    );
  };
  const handleChange = (e) => {
    e.preventDefault();
    const value = document.getElementById("language").value;
    console.log(value);
  };
  return (
    <div className=" bg-background text-center">
      <section>
        <div
          className="cursor-pointer w-[120px] h-[120px] rounded-full  fixed bottom-1"
          onClick={() => {
            setChatbot(true);
          }}
        >
          <button>
            <img className="w-full" src={Chatbot} />
          </button>
        </div>
        <div
          className={`${
            chatbot ? "" : "hidden"
          } w-[300px] h-[300px] bg-green-100 rounded-lg fixed bottom-24 p-3 left-24`}
        >
          <div className="">
            <ImCross
              className=""
              onClick={() => {
                setChatbot(false);
              }}
            />
          </div>
          <div className="px-5 w-full h-3/4 my-2 border-2 border-gray-500 p-2 overflow-y-auto gap-2">
            {answer && (
              <div className="chat-message">
                <strong>Saathi:</strong> {answer}
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-x-2  font-comf flex-row-between border-2 border-gray-500 px-2 py-1 rounded-md"
          >
            <input
              type="text"
              placeholder="Search for the meeting..."
              className="w-full outline-none  bg-green-100"
              value={question}
              onChange={handleQuestionChange}
            />

            <button type="submit" className="">
              {loading ? (
                <h1>
                  <LoaderIcon />
                </h1>
              ) : (
                <BiRightArrow />
              )}
            </button>
          </form>
        </div>
      </section>

      <section className="fixed inset-x-0 mx-auto w-full custom-navbar-width z-10 py-5 ">
        <nav className="bg-white text-primary  lg:flex hidden flex-row justify-between px-5 py-1  rounded-2xl shadow-md items-center text-para  z-10 border-nav">
          <div className="mx-2 w-[200px]">
            <Link to="" className="text-5xl font-right ">
              Green<span className="text-theme">IQ</span>
            </Link>
          </div>
          <div className=" mx-2  list-none space-x-10  flex-row-center text-lg text-primary font-comf">
            {Links.Navbar_Links.map((obj, id) => (
              <NavLinks obj={obj} />
            ))}

            {/* <li className="flex flex-row items-center hover:text-theme cursor-pointer ">
              &nbsp;
              <span>
                {data?.data?.role === "mentor" ? (
                  <Link to="/mentor/Meetings">Meetings</Link>
                ) : (
                  <Link to="/user/book-meeting">Book a call</Link>
                )}
              </span>
            </li> */}
            {user ? (
              <li className="flex flex-row items-center hover:text-theme cursor-pointer ">
                &nbsp;<span>Hello, {data?.data?.name}</span>
              </li>
            ) : (
              <LoaderIcon />
            )}
            {user && user?.role == "student" ? (
              <Link to="/user/leaderboard">
                <button className="  ">DASHBOARD</button>
              </Link>
            ) : (
              user && (
                <Link to="/mentor/classroom">
                  <button className=" ">DASHBOARD</button>
                </Link>
              )
            )}

            <select
              name="language"
              className="outline-none"
              id="language"
              onChange={() => {
                changeLanguage(document.getElementById("language").value);
              }}
            >
              <option value="en">English</option>
              <option value="be">বাংলা</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
              {/*Tamil*/}
              <option value="ka">ಕನ್ನಡ</option>
              {/*Kannada*/}
              <option value="pu">ਪੰਜਾਬੀ</option>
              {/*Punjabi*/}
            </select>
            {user ? (
              <button
                className=" primary-btn "
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                LOG OUT
              </button>
            ) : (
              <Link to="/login">
                <button className=" primary-btn ">Login</button>
              </Link>
            )}
          </div>
        </nav>

        <nav className="text-primary flex lg:hidden flex-row justify-between px-5 py-2 my-4 rounded-lg shadow-md items-center text-para   z-10  border-nav bg-white space-x-5">
          <div className="mx-2 w-[100px]">
            <Link to="" className="text-4xl font-right ">
              Green<span className="text-theme">IQ</span>
            </Link>
          </div>
          <div className="mx-2  flex-row-between">
            <p
              className="text-4xl font-heading "
              onClick={() => setDropDown(!dropDown)}
            >
              <GiHamburgerMenu />
            </p>
          </div>
        </nav>
      </section>

      {dropDown && (
        <section className="absolute inset-x-0 mx-auto custom-navbar-width top-32 z-10 font-comf">
          <div className=" flex flex-col list-none top-32 rounded-lg leading-10 text-left px-7  py-3 custom-navbar-width border-2 border-[#cbcdd4] bg-white z-10">
            {Links.Navbar_Links.map((obj, id) => (
              <NavLinks obj={obj} />
            ))}
            <li className="flex flex-row items-center hover:text-theme cursor-pointer ">
              <span>English</span>&nbsp;
              <GoGlobe />
            </li>

            <button className=" my-5 px-10 text-medium font-theme py-1 w-full bg-theme rounded-full z-10">
              GET STARTED
            </button>
          </div>
        </section>
      )}

      <section style={{ backgroundImage: `url(${primaryImage})` }}>
        <div className="primary-container md:w-2/3 mx-auto gap-5 md:leading-10 leading-7 text-center  flex flex-col items-center justify-center h-[100vh] translate-y-14 relative ">
          <div className="md:text-7xl text-3xl md:my-5 my-3 font-merri">
            <span>
              <Typewriter
                words={[
                  "Learn Concepts",
                  "Find Resources",
                  "Appear For Tests",
                  "Daily Monitoring",
                  "Track Progress",
                  "1:1 Mentorship",
                  "Resolve Doubts",
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={150}
                deleteSpeed={100}
                delaySpeed={1000}
              />
            </span>
          </div>
          <p className="md:text-lg text-sm font-comf"></p>
          {user && (
            <Link to="/user" className=" primary-btn ">
              DASHBOARD
            </Link>
          )}
        </div>
      </section>

      <section>
        <div
          className={`primary-container flex flex-row flex-wrap items-center justify-between  text-primary`}
        >
          <div className="md:w-full lg:w-2/5 text-left my-5">
            <h1 className="md:text-5xl text-3xl font-merri">{t("title_1")}</h1>
            <p className="leading-7 my-5 font-comf">{t("description_1")}</p>
            <button className="primary-btn">{t("button")}</button>
          </div>
          <div className="lg:w-[500px] md:w-full   my-5">
            <img src={Demo} alt="demo video" className="rounded-lg " />
          </div>
        </div>
      </section>
      <section className="primary-container text-left flex-col-center  bg-primary text-white curved ">
        <h1 className="heading">{t("heading_1")}</h1>
        <div
          className="my-5 py-10 flex overflow-x-auto space-x-8 w-full  overflow-y-visible horizontal-scroll "
          id="scroll-container"
        >
          {array.map((obj, id) => (
            <div
              className=" w-[300px] h-[300px] rounded-2xl shadow-md cursor-pointer group flex-shrink-0 bg-contain"
              style={{
                backgroundImage: `url(${id % 2 == 0 ? Physics : Chemistry})`,
              }}
            >
              <div className="group-hover:opacity-100  opacity-0  bg-theme text-center flex-col-center w-full h-full rounded-2xl gap-5">
                <h1 className="font-merri text-3xl">Mathematics</h1>
                <p className="font-comf leading-6">
                  10+ Assignments | 20+Test Module
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-row-between space-x-5">
          <hr className="border-2 border-white w-4/5" />
          <div className="flex flex-row space-x-8 text-primary">
            <button
              className="w-[50px] h-[50px] flex-row-center rounded-full bg-temporary text-xl"
              onClick={scrollLeftHandler}
            >
              <AiOutlineArrowLeft />
            </button>
            <button
              className="w-[50px] h-[50px] flex-row-center rounded-full bg-temporary text-xl"
              onClick={scrollRightHandler}
            >
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </section>

      <section>
        <div
          className={`primary-container flex flex-row flex-wrap items-center justify-between bg-primary text-white`}
        >
          <div className="md:w-full lg:w-2/5 text-left my-5">
            <h1 className="md:text-5xl text-3xl font-merri">{t("title_1")}</h1>
            <p className="leading-7 my-5 font-comf">{t("description_1")}</p>
            <button className="primary-btn">{t("button")}</button>
          </div>
          <div className="lg:w-[500px] md:w-full   my-5">
            <img src={Demo} alt="demo video" className="rounded-lg " />
          </div>
        </div>
      </section>

      <section className=" my-5 text-left h-[80vh] flex-col-center items-center gap-8 mt-[20vh]">
        <h1 className=" heading ">{t("heading_2")}</h1>

        <div className="flex-row-center  w-full">
          {/* <img src="" className="w-full h-[400px]" /> */}
          <MapCommunities />
        </div>
      </section>
      <section className="primary-container  text-black">
        <h1 className="heading text-left">{t("heading_3")}</h1>

        <div className="py-10 flex overflow-x-auto space-x-8 w-full  overflow-y-visible horizontal-scroll ">
          {array.map((obj, id) => (
            <div
              className=" w-[400px] h-[200px] rounded-2xl shadow-md  flex-shrink-0 border-2 border-theme bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${Certificate})` }}
            ></div>
          ))}
        </div>
        <h1 className=" heading ">{t("heading_4")}</h1>
        <div className="py-10 flex-row-center flex-wrap text-center">
          {arr.map((obj, id) => (
            <div
              className=" w-[300px] h-[200px] rounded-2xl shadow-md cursor-pointer group m-5 bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${id % 2 == 0 ? Techno : SIH})` }}
            >
              {/* <div className="group-hover:opacity-100 opacity-0 bg-primary text-center flex-col-center w-full h-full rounded-2xl">
                <h1 className="text-theme">English</h1>
                <p className="text-white">20+ Assignments | 40+Test Module</p>
              </div> */}
            </div>
          ))}
        </div>
      </section>
      <section className=" curved-right md:h-[80vh] bg-green-200 my-[10vh] flex-row-between flex-wrap primary-container">
        <div className="lg:w-[500px] md:w-full border-2  my-5">
          <img src={Banner} alt="demo video" className="rounded-lg " />
        </div>
        <div className="md:w-full lg:w-2/5 text-left my-5">
          <h1 className="md:text-5xl text-3xl font-merri">{t("title_2")}</h1>
          <p className="leading-7 my-5 font-comf">{t("description_2")}</p>
          <button className="primary-btn">{t("button")}</button>
        </div>
      </section>
      <footer className="primary-container flex-col-center list-none text-white bg-cover bg-no-repeat bg-primary font-comf">
        <div className="flex flex-row flex-wrap space-x-8 justify-between items-center px-[7vw] ">
          <div className="text-left leading-10 flex flex-col my-5">
            <Link to="" className="text-5xl font-right ">
              Green<span className="text-theme">IQ</span>
            </Link>
          </div>
          <div className="text-left leading-10 flex flex-col my-5 ">
            <label className="pb-3 ">CHECK OUT</label>
            {Links.Footer_1_Links.map((obj, id) => (
              <Link to={obj.path} className="hover:text-theme ">
                {obj.name}
              </Link>
            ))}
          </div>
          <div className="text-left leading-10 flex flex-col my-5 ">
            <label className="pb-3">POLICIES</label>
            {Links.Footer_2_Links.map((obj, id) => (
              <Link to={obj.path} className="hover:text-theme ">
                {obj.name}
              </Link>
            ))}
          </div>
        </div>
        <hr className="my-10" />
        <div className="">
          <div className="flex-row-center space-x-5 my-5">
            {Links.SocialLinks.map((obj, id) => (
              <Link
                to=""
                className="w-[40px] h-[40px] rounded-full border-2 border-white text-white hover:scale-125 text-2xl flex-row-center"
              >
                {obj.icon}
              </Link>
            ))}
          </div>
          <p>© GreenIQ 2023 | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
