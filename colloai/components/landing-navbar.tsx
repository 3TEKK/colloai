"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
   const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-black", font.className)}>
          COLLO AI
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={"/dashboard"}>
          <Button variant="ghost" className="rounded-full text-black">
            Solutions
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant="ghost" className="rounded-full text-balck">
            Product
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant="ghost" className="rounded-full text-black">
            Demo
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant="ghost" className="rounded-full text-black">
            Pricing
          </Button>
        </Link>
        {/* <Link href={isSignedIn ? "/dashboard" : "/sign-up"}> */}
        <Link href={isSignedIn ? "/home" : "/sign-up"}>
          <Button variant="default" className="rounded-full text-white">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
