import React, { useState } from 'react';
import {
  MdOutlineDashboard,
  MdAccountCircle,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
  MdBiotech,
} from 'react-icons/md';
import {
  BsChevronDown,
  BsChatLeftText,
  BsCalendarCheck,
  BsFiles,
  BsServer,
} from 'react-icons/bs';
import { SiBookstack } from "react-icons/si";

const Menus = [
  { title: 'Dashboard', src: 'Chart_fill', icon: <MdOutlineDashboard className='text-xl'/> },
  { title: 'Inbox', src: 'Chat', icon: <BsChatLeftText className='text-xl'/> },
  { title: 'Accounts', src: 'User', gap: true, icon: <MdAccountCircle className='text-xl'/> },
  {
    title: 'Courses ',
    src: 'Calendar',
    icon: <SiBookstack className="text-xl" />
    , subMenus: [
      {
        title: 'Roadmaps',
        src: '/courses/roadmaps',
        icon:<MdBiotech/>,

        cName: 'sub-nav',
      },
      {
        title: 'Service 2',
        src: '/services/services2',

        cName: 'sub-nav',
      },
      {
        title: 'Service 3',
        src: '/services/services3',
      },
    ],
    isOpen: false
  },
  {
    title: 'Services',
    src: 'Services',
    icon: <BsServer />,
    subMenus: [
      {
        title: 'Service 1',
        src: '/services/services1',

        cName: 'sub-nav',
      },
      {
        title: 'Service 2',
        src: '/services/services2',

        cName: 'sub-nav',
      },
      {
        title: 'Service 3',
        src: '/services/services3',
      },
    ],
    isOpen: false
  },
  { title: 'Analytics', src: 'Chart', icon: <MdAnalytics /> },
  { title: 'Files ', src: 'Folder', gap: true, icon: <BsFiles /> },
  { title: 'Setting', src: 'Setting', icon: <MdOutlineSettings /> },
  { title: 'Logout', src: 'Logout', icon: <MdLogout /> },
];

const Leftbar1 = () => {
  const [Menu, SetMenu] = useState(Menus)
  const [open, setOpen] = useState(true);
  const setSubMenuOpen = (index) => {
    SetMenu((prevMenus) =>
      prevMenus.map((menu, i) => {
        if (i === index) {
          return { ...menu, isOpen: !menu.isOpen };
        }
        return menu;
      })
    );
  };
  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div className=" h-screen flex items-start justify-start ">
      <button
        className="fixed lg:hidden z-90 bottom-10 right-8 bg-teal-800 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-teal-800   duration-300"
        onClick={toggleSidebar}
      >
        <span class="text-white">
          <MdOutlineDashboard className='text-xl'/>
        </span>
      </button>

      <div
        className={` ${open ? 'w-48 px-2 ' : 'w-0 '
          } lg:w-72 bg-blue-800 h-screen   relative duration-500`}
      >
        <div className=" justify-center mt-3">
          <h1
            className={`text-white  font-medium text-2xl text-center duration-200 ${!open && 'invisible'
              }`}
          >
            LOGO
          </h1>
        </div>
        <ul className="pt-6">
          {Menu.map((Menu, index) => (
            <>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-teal-400 text-white text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'}  `}
              >
                {Menu.icon ? Menu.icon : <MdOutlineDashboard />}
                <span className="flex-1">{Menu.title}</span>
                {Menu.subMenus && (
                  <BsChevronDown
                    onClick={() => setSubMenuOpen(index)}
                    className={`${Menu.isOpen && 'rotate-180'}`}
                  />
                )}
              </li>
              {Menu.subMenus && Menu.isOpen && open && (
                <ul>
                  {Menu.subMenus.map((subMenuItem, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-x-2 px-5 cursor-pointer text-center text-sm text-gray-200 py-1"
                    >
                        {subMenuItem.icon}
                      {subMenuItem.title}
                      
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leftbar1