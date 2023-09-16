// components/Layout.js
import React from 'react';
import Dropdown from './Dropdown';

const Leftbar2 = ({ children }) => {
  const sidebarItems = [
    {
      title: 'Dashboard',
      link: '#',
    },
    {
      title: 'Products',
      link: '#',
      submenu: [
        {
          title: 'Product 1',
          link: '#',
        },
        {
          title: 'Product 2',
          link: '#',
        },
      ],
    },
    {
      title: 'Orders',
      link: '#',
    },
    // Add more menu items and submenus as needed
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        {/* Sidebar Content */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold">My Sidebar</h1>
          {/* Map through sidebarItems and use the Dropdown component */}
          {sidebarItems.map((item) => (
            <Dropdown key={item.title} title={item.title} items={item.submenu ? item.submenu : [{ title: item.title, link: item.link }]} />
          ))}
        </div>
        {/* End Sidebar Content */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
      {/* End Main Content */}
    </div>
  );
};

export default Leftbar2;
