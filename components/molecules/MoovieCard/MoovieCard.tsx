import { OMDBMovieShort } from "@/shared/types";
import Link from "next/link";
import React from "react";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import DetailsIcons from "@/components/atoms/DetailsIcon/DetailsIcons";

interface MovieCardProps {
  movie: OMDBMovieShort;
}

const MoovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { Poster, Title, imdbID } = movie;
  const imageUrl =
    Poster ||
    "https://images.pexels.com/photos/20085947/pexels-photo-20085947/free-photo-of-a-window-shot-of-a-comic-books.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <div
      className={`group h-[220px] min-w-[320px] transition-all duration-300 relative`}
    >
      <img
        src={imageUrl}
        alt={Title}
        className="object-cover select-none w-full h-full rounded-2xl group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 cursor-pointer"
      />

      <div
        className="opacity-0 
        absolute 
        top-0 
        transition 
        duration-300 
        z-10 
        invisible 
        sm:visible 
        delay-300 
        w-full 
        scale-0 
        group-hover:scale-125 
        group-hover:-translate-y-[2vw] 
        group-hover:opacity-100"
      >
        <img
          src={imageUrl}
          alt={Title}
          className="h-[220px] object-cover rounded-t-md w-full z-10 cursor-pointer select-none"
        />
        <div className="bg-gray-800 p-4 rounded-b-md">
          <div className="flex justify-between">
            <div className="cursor-pointer h-8 w-8 rounded-full flex justify-center items-center ">
              <FavoriteButton moovie={movie} />
            </div>
            <Link href={`/${imdbID}`}>
              <div className="relative w-8 h-8 flex justify-center items-center">
                <div className="absolute inset-0 rounded-full border-1 border-current pointer-events-none" />
                <DetailsIcons className="pt-0.5" width={32} />
              </div>
            </Link>
          </div>
          <div className="mt-2">{Title}</div>
        </div>
      </div>
    </div>
  );
};

export default MoovieCard;
