"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
// import { useAuth } from "@clerk/nextjs";

import { Button } from "./ui/button";

export const LandingHero = () => {
  // const { isSignedIn } = useAuth();

  return (
    <div className="text-black font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Awsome AI Interview can</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Give Review",
                "Best interview",
                "feedback"
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Get hired using AI 10x faster.
      </div>
      <div>
        {/* <Link href={isSignedIn ? "/dashboard" : "/sign-up"}> */}
        <Link href={"/dashboard"}>
          <Button variant="default" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Start Interview For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
        
        {/* <iframe
          id="ytplayer"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe> */}

      </div>
    </div>
  );
};
