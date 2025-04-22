"use client";
import MoovieCardContainer from "@/components/organisms/MoovieCardContainer/MoovieCardContainer";
import { useFetchMoviesBySearchQuery } from "@/shared/store/api/moovieSlice";
import { selectSearchQuery, setSearchQuery } from "@/shared/store/appState";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface SearchPageParams {
  query?: string;
}

const SearchPage = () => {
  const { query }: SearchPageParams = useParams();
  const dispatch = useAppDispatch();
  const storedQuery = useAppSelector(selectSearchQuery);
  const { data } = useFetchMoviesBySearchQuery(query || "", {
    skip: !query,
  });

  useEffect(() => {
    if (query && !storedQuery) {
      dispatch(setSearchQuery(query));
    }
  }, [query]);

  return (
    <div className="min-h-[50vh] bg-black px-4">
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {data?.Search?.map((item) => {
            return <MoovieCardContainer movie={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
