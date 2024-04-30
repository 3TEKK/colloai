"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "../../../../../components/ui/card";
import { cn } from "../../../../../lib/utils";

import { tools } from "../../../../../constants";
import Dashboard from "../dashboard/page";
import { Button } from "../../../../../components/ui/button";

export default function Feedback() {
  const router = useRouter();

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
            <Button variant="destructive" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Open
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-px text-center py-4 bg-slate-700 text-white">
            <div>Interview #2</div>
            <div>Interview Name #2</div>
            <div>20 Febuary 2024</div>
            <div className="completed">Completed</div>
            <Button variant="destructive" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Open
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-px text-center py-4 bg-slate-700 text-white">
            <div>Interview #3</div>
            <div>Interview Name #3</div>
            <div>7 March 2024</div>
            <div className="incomplete">Incomplete</div>
            <Button variant="destructive" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Open
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-px text-center py-4 bg-slate-700 text-white">
            <div>Interview #4</div>
            <div>Interview Name #4</div>
            <div>27 April 2024</div>
            <div className="incomplete">Incomplete</div>
            <Button variant="destructive" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Open
            </Button>
          </div>
        </div>
      </div>
    </div>
    
  );
}
