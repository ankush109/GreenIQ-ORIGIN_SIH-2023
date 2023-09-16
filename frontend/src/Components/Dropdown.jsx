import React, { useState } from 'react';

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 cursor-pointer"
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.293.293l3 3a1 1 0 11-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L7.707 7.707a1 1 0 11-1.414-1.414l3-3A1 1 0 0110 3z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
          {/* Dropdown Content */}
          {items.map((item) => (
            <div key={item.title}>
              <a
                href={item.link}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                {item.title}
              </a>
              {item.submenu && (
                <div className="pl-8">
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.link}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
