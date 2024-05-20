"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "../../../../../components/ui/card";
import { cn } from "../../../../../lib/utils";

import { tools } from "../../../../../constants";
import Dashboard from "../dashboard/page";
import { Button } from "../../../../../components/ui/button";
import { useState } from "react";


const PopupContent = ({ handleClosePopup }) => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="absolute bg-white shadow-lg rounded-lg p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Good Job!</h1>
      <div className="flex justify-around text-center mb-6">
        <div>
          <div className="gauge vocabulary"></div>
          <p className="text-sm font-semibold mt-2">Vocabulary</p>
          <p className="text-sm text-gray-500">25.71%</p>
        </div>
        <div>
          <div className="gauge confidence"></div>
          <p className="text-sm font-semibold mt-2">Confidence</p>
          <p className="text-sm text-gray-500">25.71%</p>
        </div>
        <div>
          <div className="gauge speech"></div>
          <p className="text-sm font-bold mt-2">Speech Analysis</p>
          <p className="text-sm text-gray-500">70.71%</p>
        </div>
      </div>
      <div className="bg-blue-100 p-4 mb-6">
        <p className="text-sm mb-4">Here’s how you could have answered this question better</p>
        <p className="text-sm">You effectively highlighted your ability to communicate and coordinate with team members from different departments, which is a valuable skill in our organization. However, I noticed that you could further enhance your response by providing specific examples of challenges you faced and how you successfully resolved them within these teams.</p>
        <div className="flex justify-between mt-4">
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 1</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 2</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 3</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 4</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 5</button>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="bg-red-500 text-white py-2 px-4 rounded">Try Again</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleClosePopup}>OK</button>
      </div>
    </div>
  </div>
);

export default function Feedback() {
  const router = useRouter();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };


  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <Dashboard currentPage="/feedback"/>
      </div>  
      <div className="max-w-6xl mx-auto py-10 px-5">
        <div className="text-3xl font-bold mb-6 ">Feedback History</div>
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-px text-center py-4 table-header text-white">
            <div>Interview</div>
            <div>Name</div>
            <div>Date</div>
            <div>Status</div>
            <div>Feedback</div>
            <div></div>
          </div>
          <div className="grid grid-cols-6 gap-px text-center py-4 bg-slate-700 text-white">
            <div>Interview #1</div>
            <div>Interview Name #1</div>
            <div>27 Febuary 2023</div>
            <div className="completed">Completed</div>
            <Button variant="destructive" className="md:text-lg p-4 md:p-6 rounded-full font-semibold" onClick={handleOpenPopup}>
              Open
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-px text-center py-4 bg-slate-700 text-white">
            <div>Interview #2</div>
            <div>Interview Name #2</div>
            <div>20 Febuary 2024</div>
            <div className="completed">Completed</div>
            <Button variant="destructive" className="md:text-lg p-4 md:p-6 rounded-full font-semibold" onClick={handleOpenPopup}>
              Open
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-px text-center py-4 bg-slate-700 text-white">
            <div>Interview #3</div>
            <div>Interview Name #3</div>
            <div>7 March 2024</div>
            <div className="incomplete">Incomplete</div>
            <Button variant="destructive" className="md:text-lg p-4 md:p-6 rounded-full font-semibold" onClick={handleOpenPopup}>
              Open
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-px text-center py-4 bg-slate-700 text-white">
            <div>Interview #4</div>
            <div>Interview Name #4</div>
            <div>27 April 2024</div>
            <div className="incomplete">Incomplete</div>
            <Button variant="destructive" className="md:text-lg p-4 md:p-6 rounded-full font-semibold" onClick={handleOpenPopup}>
              Open
            </Button>
          </div>
        </div>
      </div>
      {isPopupOpen && <PopupContent handleClosePopup={handleClosePopup} />}
    </div>
  );
}
