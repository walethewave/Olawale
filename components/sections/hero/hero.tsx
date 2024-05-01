import React from "react";
import MotionWrap from "@/components/motion-wrap";
import Image from "next/image";

function Hero() {
  return (
    <MotionWrap className="mt-14 w-full py-12 md:mt-0 md:py-24 lg:py-32 xl:py-48">
      <div className=" grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
            Designer & Developer
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Hi, I&apos;m John Doe
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I design and build beautiful websites. Welcome to my portfolio.
          </p>
        </div>
        <Image
          alt="Image"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
          height="450"
          sizes="100vw"
          src={"/images/hero.jpg"}
          width="800"
        />
      </div>
    </MotionWrap>
  );
}

export default Hero;
