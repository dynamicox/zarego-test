import React from "react";
import { OMDBMoovie } from "../../../shared/types/index";

import FavoriteButton from "@/components/molecules/FavoriteButton/FavoriteButton";

export interface MoovieDetailsProps {
  data: OMDBMoovie;
}

const MoovieDetails: React.FC<MoovieDetailsProps> = ({ data }) => {
  const { imdbID, Poster, Title } = data;
  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-2">{data?.Title}</h2>
        <div className="flex items-center mb-4">
          <span className="text-white text-xs rounded-full px-2 py-1 mr-2">
            {data?.Rated}
          </span>
          <span className="text-gray-400 mr-2">{data?.Runtime}</span>
          <span className="text-yellow-400 mr-2">
            <svg
              className="w-4 h-4 inline-block mr-1 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.176-6.545L.587 7.645l6.545-.952L10 1l2.868 5.693 6.545.952-4.765 4.098 1.176 6.545z" />
            </svg>
            {data?.imdbRating}
          </span>
          <FavoriteButton moovie={{ imdbID, Poster, Title }} />
        </div>
      </div>

      {/* Plot */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1">Plot</h3>
        <p className="text-gray-400 text-sm">{data?.Plot}</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Details</h3>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-white">Director:</span>{" "}
            {data?.Director}
          </p>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-white">Writers:</span>{" "}
            {data?.Writer}
          </p>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-white">Actors:</span>{" "}
            {data?.Actors}
          </p>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-white">Genre:</span>{" "}
            {data?.Genre}
          </p>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-white">Released:</span>{" "}
            {data?.Released}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Ratings</h3>
          {data?.Ratings?.map((item) => {
            return (
              <p className="text-gray-400 text-sm" key={item.Source}>
                <span className="font-semibold text-white">{item.Source}</span>{" "}
                {item.Value}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoovieDetails;
