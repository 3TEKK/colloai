"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "../../../../../components/ui/card";
import { cn } from "../../../../../lib/utils";

import { tools } from "../../../../../constants";
import Dashboard from "../dashboard/page";


export default function Interview() {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center">
        <Dashboard currentPage="/interview"/>
      </div>
      <div className="bg-white flex items-center justify-center h-80">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-20">Job Interview</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Join Now
        </button>
      </div>

      
    </div>


  </div>  
  );
}
