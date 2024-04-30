"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "../../../../../components/ui/card";
import { cn } from "../../../../../lib/utils";

import { tools } from "../../../../../constants";
import Dashboard from "../dashboard/page";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <Dashboard currentPage="/home"/>  

      <div className="max-w-lg mx-auto mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Job Description</h1>
            <form>
                <div className="mb-6">
                    <textarea className="w-full p-4 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" rows={6} placeholder="Insert job description here...."></textarea>
                </div>
                <button type="submit" className="w-half bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Submit</button>
            </form>
        </div>
    </div>
  </div>
  );
}
