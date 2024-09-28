import React from "react";

const Hero = () => {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-screen-xl  px-4 py-20 flex-col gap-2 sm:gap-4 flex h-screen items-center">
        <h2 className="hidden md:inline-block  text-center border border-whites w-fit text-white rounded-full py-2 px-3">
          See what's new | <span className="text-[#94DBFF]"> AI Diagram</span>
        </h2>

        <h1 className="text-2xl text-[#94DBFF] font-extrabold sm:text-5xl">
          For better Experience
          <strong className="font-extrabold text-gray-200 sm:block">
            {" "}
            use its Desktop version
          </strong>
        </h1>

        <div className=" hidden md:inline-block mx-auto max-w-2xl text-center leading-relaxed py-2 md:py-3">
          <h1 className="text-2xl text-[#94DBFF] font-extrabold sm:text-5xl">
            Documents & diagrams
            <strong className="font-extrabold text-gray-200 sm:block">
              {" "}
              for engineering teams
            </strong>
          </h1>

          <p className="mt-4 text-white sm:text-xl/relaxed">
            All-in-one markdown editor, collaborative canvas, and
            diagram-as-code builder
          </p>

          <div className="mt-8 md:flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:bg-gray-200 focus:outline-none   sm:w-auto"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
