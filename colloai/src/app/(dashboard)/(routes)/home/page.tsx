"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card } from "../../../../../components/ui/card";
import { cn } from "../../../../../lib/utils";

import { tools } from "../../../../../constants";
import Dashboard from "../dashboard/page";
import { useUser } from "@clerk/nextjs";

export default function HomePage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const { isLoaded, isSignedIn, user } = useUser();

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the form from being submitted to the server
    console.log("Job description:", jobDescription);
    console.log("User Name: ", user?.fullName)
    // Save the job description and user name to localStorage
    localStorage.setItem("jobDescription", jobDescription);
    if (user?.fullName) {
      localStorage.setItem("userName", user.fullName);
    }
    
    // Navigate to the interview page
    router.push("/interview");
    
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(event.target.value);
  };

  return (
    <div>
      <Dashboard currentPage="/home"/>  

      <div className="max-w-lg mx-auto mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Job Description</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <textarea 
                      className="w-full p-4 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                      rows={6} 
                      placeholder="Insert job description here...."
                      value={jobDescription}
                      onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <button type="submit" className="w-half bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Submit</button>
            </form>
        </div>
    </div>
  </div>
  );
}
