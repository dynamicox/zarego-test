"use client";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import { selectHeroHeaderImgUrl } from "@/shared/store/appState";
import { useAppSelector } from "@/shared/store/hooks";
import { usePathname } from "next/navigation";
import React from "react";

const HeroHeader = () => {
  const pathname = usePathname();
  const heroHeaderImgUrl = useAppSelector(selectHeroHeaderImgUrl);

  return (
    <div className="h-[650px] relative flex justify-center items-end">
      <div className="absolute h-full z-10 w-full top-0 bg-gradient-to-b from-transparent to-black" />
      <img
        src={
          heroHeaderImgUrl ||
          "https://images.pexels.com/photos/20085947/pexels-photo-20085947/free-photo-of-a-window-shot-of-a-comic-books.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        alt=""
        className="w-full absolute h-full object-cover select-none"
      />
      {(pathname === "/" || pathname.startsWith("/search")) && (
        <div className="z-10 p-10 bg-[rgba(31,41,55,0.8)] rounded w-xl">
          <div className="text-center text-white font-bold text-3xl mb-4">
            Discover Your Next Favorite Movie
          </div>
          <div className="text-center text-white mx-auto mb-4">
            Search for movies, view details, and save your favorites. <br />
            Get AI-powered recommendations based on your preferences.
          </div>
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default HeroHeader;
