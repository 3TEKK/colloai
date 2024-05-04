"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import {userDropdown} from "../../../../../components/user-dropdown"

import { Card } from "../../../../../components/ui/card";
import { cn } from "../../../../../lib/utils";

import { tools } from "../../../../../constants";
import { DropdownMenu } from "../../../../../components/ui/dropdown-menu";

const Dashboard = ({ currentPage = '/home' }: { currentPage?: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div className="flex justify-center mb-8">
        <ul className="flex border border-gray-500 bg-gray">
          <li className="flex-1">
          <a
              className={`text-center block border ${
                currentPage === '/home'
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-white hover:border-gray-200 hover:bg-gray-200 text-blue-500'
              } rounded py-2 px-4`}
              href="/home"
            >
              Home
            </a>
          </li>
          <li className="flex-1">
            <a
              className={`text-center block border ${
                currentPage === '/interview'
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-white hover:border-gray-200 hover:bg-gray-200 text-blue-500'
              } rounded py-2 px-4`}
              href="/interview"
            >
              Interview
            </a>
          </li>
          <li className="text-center flex-1 ml-2">
            <a
              className={`text-center block border ${
                currentPage === '/feedback'
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-white hover:border-gray-200 hover:bg-gray-200 text-blue-500'
              } rounded py-2 px-4`}
              href="/feedback"
            >
              Feedback
            </a>
          </li>
        </ul>
      </div>
      <div className="text-gray-800 absolute top-10 right-7 cursor-pointer" onClick={toggleDropdown}>
        <FaRegUser size={30}/>
      </div>
      {isDropdownOpen && (
        <div className="absolute top-16 right-10 w-40 bg-white shadow-lg rounded border border-gray-200">
          {/* Dropdown menu content */}
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><a href="/">Logout</a></li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;