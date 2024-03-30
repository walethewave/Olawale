import React from "react";
import MotionWrap from "@/components/MotionWrap";

function Hero() {
  return (
    <MotionWrap className="w-full mt-2 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className=" grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
            Designer & Developer
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Hi, I'm Sriram Balaji
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            I design and build beautiful websites. Welcome to my portfolio.
          </p>
        </div>
      </div>
    </MotionWrap>
  );
}

export default Hero;
