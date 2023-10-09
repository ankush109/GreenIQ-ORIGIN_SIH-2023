import React from "react";
import ScholarshipCard from "./ScholarshipCard";
import Leftbar from "./Leftbar";

const Newsfeed = () => {
  const data = {
    opportunities: [
      {
        type: "Grant",
        name: "Agricultural Development Grant",
        description:
          "The Agricultural Development Grant program aims to support small-scale farmers in rural West Bengal. Funding is available for purchasing equipment, seeds, and training.",
        eligibility: "Local Farmers and Farming Cooperatives",
        deadline: "November 30, 2023",
        location: "Bankura, West Bengal",
      },
      {
        type: "Job Opening",
        name: "Community Organizer",
        description:
          "We are hiring a Community Organizer to work closely with rural communities in West Bengal. Responsibilities include organizing events, community outreach, and project coordination.",
        location: "Jhargram, West Bengal",
      },
      {
        type: "Scholarship",
        name: "Girls' Education Scholarship",
        description:
          "The Girls' Education Scholarship program aims to empower girls in rural West Bengal by providing scholarships for their education. Open to girls in Classes 6 to 10.",
        eligibility: "Girls from Rural Areas (Class 6-10)",
        deadline: "March 15, 2024",
        location: "Murshidabad, West Bengal",
      },
      {
        type: "Job Opening",
        name: "Environmental Conservationist",
        description:
          "We are seeking Environmental Conservationists to work on conservation projects in the Sundarbans region of West Bengal. Tasks include wildlife monitoring and habitat restoration.",
        location: "Sundarbans, West Bengal",
      },
      {
        type: "Job Opening",
        name: "Agricultural Technician",
        description:
          "We are hiring an Agricultural Technician to work on our farm in rural West Bengal. Responsibilities include crop management, soil testing, and equipment maintenance.",
        location: "West Midnapore, West Bengal",
      },
      {
        type: "Grant",
        name: "Rural Development Grant",
        description:
          "The Rural Development Grant program is offering funding for community projects in rural West Bengal. Eligible projects include infrastructure development, healthcare initiatives, and education programs.",
        eligibility: "Local NGOs and Community Groups",
        deadline: "December 31, 2023",
      },
      {
        type: "Job Opening",
        name: "Healthcare Worker",
        description:
          "We are looking for healthcare workers to serve in rural health clinics in West Bengal. Responsibilities include providing basic medical care, health education, and community outreach.",
        location: "Purulia, West Bengal",
      },
      {
        type: "Scholarship",
        name: "Rural Student Scholarship",
        description:
          "The Rural Student Scholarship program is awarding scholarships to talented students from rural areas of West Bengal to pursue higher education. Scholarships cover tuition fees and living expenses.",
        eligibility: "Rural Students (Class 12 Passed)",
        deadline: "February 28, 2024",
      },
    ],
  };
  return (
    <div className=" base-container py-[5vh] ">
      <div>
        <h2 className="text-3xl font-merri mb-5 m-3">News</h2>
      </div>
      <div className="flex flex-wrap items-center  justify-center gap-4">
        {data?.opportunities?.map((item) => (
          <ScholarshipCard
            key={item.name}
            des={item.description}
            title={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Newsfeed;
