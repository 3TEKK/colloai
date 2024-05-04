"use client";

import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';

export const userDropdown= () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative">
          <div className="text-gray-800 absolute top-10 right-7 cursor-pointer" onClick={toggleDropdown}>
            <FaRegUser size={30}/>
          </div>
          {isDropdownOpen && (
            <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded border border-gray-200">
              {/* Dropdown menu content */}
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
                {/* Add more menu items as needed */}
              </ul>
            </div>
          )}
        </div>
    );
}