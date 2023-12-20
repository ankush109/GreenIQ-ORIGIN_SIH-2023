import React from "react";
import ankush from "../assets/ankush.png";
import anuvab from "../assets/anuvab.png";
import bristi from "../assets/bristi.png";
import kaushan from "../assets/kaushan.png";
import souvik from "../assets/souvik.png";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
const teamMembers = [
  {
    name: "Ankush Banerjee",
    role: "Full Stack Developer",
    responsibilities:
      "Responsible for implementing the overall architecture and the system end to end",
    image: ankush,
    linkedinLink: "https://www.linkedin.com/in/ankush2003/",
    gihubLink: "https://github.com/Ankush109",
  },
  {
    name: "Anuvab Chakravarty",
    role: "Design and Analysis",
    responsibilities:
      "Responsible for improvising ideas and features for improving the overall system",
    image: anuvab,
    linkedinLink: "https://www.linkedin.com/in/anuvab-chakravarty-001b39233/",
    githubLink: "https://github.com/Vanaub22",
  },
  {
    name: "Bristi Maity",
    role: "ML",
    responsibilities: "Responsible for building the machine learning prospects",
    image: bristi,
    linkedinLink: "https://www.linkedin.com/in/bristi-maity-6260a5244/",
    githubLink: "https://github.com/bristi03",
  },
  {
    name: "Souvik Sen",
    role: "Full Stack Developer",
    responsibilities:
      "Responsible for implementing the overall architecture and the system end to end",
    image: souvik,
    linkedinLink: "https://www.linkedin.com/in/souvik001/",
    githubLink: "https://github.com/Souvik3469",
  },
  {
    name: "Kaushan Dutta",
    role: "Frontend Developer",
    responsibilities:
      "Responsible for designing the entire frontend UI and making enhancing the frontend ",
    image: kaushan,
    linkedinLink: "https://www.linkedin.com/in/kaushan-dutta-bb68b021a/",
    githubLink: "https://github.com/Kaushan-Dutta",
  },
];

function TeamMember({
  name,
  role,
  responsibilities,
  image,
  linkedinLink,
  gihubLink,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md m-4 max-w-xs">
      <img
        src={image}
        className="w-48 h-64 object-cover mx-auto mb-4 rounded-full"
        alt={name}
      />
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">{name}</h1>
        <h2 className="text-sm text-gray-600 mb-2">{role}</h2>
        {responsibilities && (
          <p className="text-sm text-gray-700">{responsibilities}</p>
        )}
        <div className="flex flex-row justify-center gap-6 my-3 ">
          <Link to={linkedinLink}>
            <LinkedInIcon />
          </Link>
          <Link to={gihubLink}>
            <GitHubIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="bg-green-100 min-h-screen">
      <section className="fixed inset-x-0 mx-auto w-full custom-navbar-width z-10 py-5 ">
        <nav className="bg-white text-primary lg:flex hidden flex-row justify-between px-5 py-1 rounded-2xl shadow-md items-center text-para z-10 border-nav">
          <div className="mx-2 w-[200px]">
            <Link to="" className="text-5xl font-right ">
              Green<span className="text-theme">IQ</span>
            </Link>
          </div>

          <div className="mx-2 h-20 list-none space-x-10 flex-row-center text-lg text-primary font-comf">
            {/* Static Links */}
            <a href="/">Home</a>
            <a href="/user/book-meeting">Dashboard</a>
            {/* Add more static links as needed */}
          </div>
        </nav>

        <nav className="text-primary flex lg:hidden flex-row justify-between px-5 py-2 my-4 rounded-lg shadow-md items-center text-para z-10 border-nav bg-white space-x-5">
          <div className="mx-2  w-[100px]">
            <Link to="" className="text-4xl font-right ">
              Green<span className="text-theme">IQ</span>
            </Link>
          </div>
          <div className="mx-2 flex-row-between">
            <p className="text-4xl font-heading">
              <GiHamburgerMenu />
            </p>
          </div>
        </nav>
      </section>

      <div className="flex flex-col justify-center items-center p-40 ">
        <h1 className="text-6xl font-bold bg-green-300 p-4 rounded-xl">
          We are the people who
        </h1>
        <h1 className="text-2xl font-semibold my-3 text-center">
          Developed GreenIQ
        </h1>
        <div className="flex items-center mx-auto ">
          <p className="text-md text-center text-green-900 font-semibold mb-8">
            GreenIQ represents a transformative solution to the pressing
            challenges faced by rural education in Kerala. Through its
            innovative features and holistic approach, GreenIQ has the potential
            to significantly enhance the quality of education in rural areas,
            empowering students with knowledge and skills for a brighter future.
          </p>
          <img
            className="w-56 mx-6  object-cover  rounded-full "
            src="https://i0.wp.com/opportunitycell.com/wp-content/uploads/2022/03/SIH2.png?fit=327%2C345&ssl=1"
          />
        </div>
        <h1 className="text-3xl font-bold mb-5">Team - Cyber Elites</h1>
        <p className="text-xl text-center">
          PS: 1326 || Ideate and Implement Education in Rural Areas ||
          <Link
            className="mx-2"
            to="https://github.com/ankush109/GreenIQ-ORIGIN_SIH-2023"
          >
            <GitHubIcon />
          </Link>{" "}
          ||
          <Link
            className="mx-2"
            to="https://www.youtube.com/watch?v=9pKMHoUljrI"
          >
            <YouTubeIcon
              style={{
                color: "red",
              }}
            />
          </Link>
        </p>
        <div>
          <p className="bg-green-300 p-2 rounded-lg font-semibold m-3">
            (You would not be able to clone this Project as this project
            intentionally includes known faults throughout its codebase. )
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
}

export default About;
