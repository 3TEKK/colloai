"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

import { Card } from "../../../../../components/ui/card";
import { cn } from "../../../../../lib/utils";

import { tools } from "../../../../../constants";

const Dashboard = ({ currentPage = '/home' }: { currentPage?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
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
      <div className="text-gray-800">
        <i className="fas fa-user"></i>
      </div>
    </div>
  );
};

export default Dashboard;