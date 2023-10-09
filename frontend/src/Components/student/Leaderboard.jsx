import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pencil from "../../assets/pencil.png";
import View from "../../assets/analysis.png";
import Searchbox from "../SearchBox";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import { Chart as chartjs } from "chart.js/auto";
import LeadersList from "./LeaderList";

const navigationLink = [
  {
    name: "Meetings",
    path: "/mentor/meetings",
    icons: Pencil,
  },
  {
    name: "Test",
    path: "/mentor/my-test",
    icons: Pencil,
  },
  {
    name: "Discussion",
    path: "user/discuss",
    icons: Pencil,
  },
  {
    name: "Your Course",
    path: "/mentor/material",
    icons: Pencil,
  },
  {
    name: "Materials",
    path: "/mentor/material",
    icons: Pencil,
  },
  {
    name: "News Feed",
    path: "/mentor/meetings",
    icons: Pencil,
  },
];
const classReport = [
  {
    class: 3,
    performance: 40,
    color: "red",
  },
  {
    class: 4,
    performance: 60,
    color: "yellow",
  },
  {
    class: 5,
    performance: 20,
    color: "red",
  },

  {
    class: 7,
    performance: 60,
    color: "orange",
  },

  {
    class: 9,
    performance: 60,
    color: "orange",
  },
  {
    class: 10,
    performance: 80,
    color: "green",
  },

  {
    class: 12,
    performance: 10,
    color: "yellow",
  },
];
const class1 = [
  {
    month: "Jan",
    performance: 40,
  },
  {
    month: "Feb",
    performance: 20,
  },

  {
    month: "Mar",
    performance: 40,
  },
  {
    month: "Apr",
    performance: 10,
  },
  {
    month: "May",
    performance: 30,
  },
  {
    month: "Jun",
    performance: 90,
  },
  {
    month: "Jul",
    performance: 10,
  },
  {
    month: "Aug",
    performance: 40,
  },
  {
    month: "Sep",
    performance: 20,
  },
  {
    month: "Oct",
    performance: 80,
  },
  {
    month: "Nov",
    performance: 60,
  },
  {
    month: "Dec",
    performance: 40,
  },
];

const options = {
  scales: {
    x: {
      grid: {
        display: true,
      },
      ticks: {
        stepSize: 9,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Leaderboard = () => {
  const [chartData, setChartData] = useState({
    labels: classReport.map((data) => data.class),
    datasets: [
      {
        label: "Class Performance",
        data: classReport.map((data) => data.performance),
        backgroundColor: classReport.map((data) => data.color),

        barPercentage: 0.9,
      },
    ],
  });
  const [chartAnalysis, setChartAnalysis] = useState({
    labels: month,
    datasets: [
      {
        label: "Class 1",
        data: class1.map((data) => data.performance),
        borderColour: "red",
        suggestedMin: 0,
        suggestedMax: 25,
      },
    ],
  });

  return (
    <div className="base-container gap-10 py-[5vh]">
      <div className="flex-row-between space-x-2 w-full h-[220px]">
        <div className="w-2/6 h-full bg-slate-100 rounded-lg shadow-md p-5">
          <Bar data={chartData} options={options} />
        </div>
        <div className="w-2/6 h-full bg-slate-100 rounded-lg shadow-md p-5">
          <Line data={chartAnalysis} options={options} />
        </div>

        <div className="w-2/6 flex-row-center flex-wrap ">
          {navigationLink.map((obj, id) => (
            <Link
              to={obj.path}
              className="bg-green-200 h-[100px] gap-2 rounded-md w-[100px] font-comf text-sm flex flex-col justify-center items-center m-2"
            >
              <button>
                <img src={obj.icons} className="w-[50px]" />
              </button>
              {obj.name}
            </Link>
          ))}
        </div>
      </div>
      <LeadersList />
    </div>
  );
};

export default Leaderboard;
