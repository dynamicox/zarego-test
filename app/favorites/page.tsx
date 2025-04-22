"use client";
import MoovieCard from "@/components/molecules/MoovieCard/MoovieCard";
import { useGetAllFavoritesQuery } from "@/shared/store/api/favorites";
import React from "react";

const page = () => {
  const { data, isLoading } = useGetAllFavoritesQuery();

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div className="min-h-[50vh] bg-black">
      <div className="mx-auto px-18 mb-20 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-12">
          {data?.map((item) => (
            <MoovieCard movie={item} key={item.imdbID} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
