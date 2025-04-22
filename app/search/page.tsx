import SearchSVG from "@/components/atoms/SearchSVG/SearchSVG";
import React from "react";

const page = () => {
  return (
    <div className="min-h-[50vh] py-20 text-center bg-black flex flex-col justify-center items-center">
      <SearchSVG />
      <div className=" font-bold text-4xl w-2xl mx-auto pt-12">
        Search for movies, view details, and save your favorites.
      </div>
      <div className="">
        Get AI-powered recommendations based on your preferences.
      </div>
    </div>
  );
};

export default page;
