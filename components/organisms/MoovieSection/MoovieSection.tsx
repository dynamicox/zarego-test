"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import MoovieCard from "@/components/molecules/MoovieCard/MoovieCard";
import { useFetchMoviesBySearchQuery } from "@/shared/store/api/moovieSlice";
import { OMDBMovieShort } from "@/shared/types";

SwiperCore.use([]);

export type MoovieSectionProps = {
  genre: string;
  query: string;
};

const MoovieSection: React.FC<MoovieSectionProps> = ({ genre, query }) => {
  const { data, error, isLoading } = useFetchMoviesBySearchQuery(query);
  const swiperRef = useRef<any>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  if (isLoading) {
    return <div>Loading {genre} movies...</div>;
  }

  if (error) {
    return <div>Error loading {genre} movies.</div>;
  }

  const movies: OMDBMovieShort[] = data?.Search || [];

  return (
    <div className="relative py-4">
      <div className="text-white font-bold uppercase p-2 text-2xl">{genre}</div>
      <Swiper
        ref={swiperRef}
        slidesPerView={"auto"}
        spaceBetween={20}
        freeMode={false}
        initialSlide={2}
        loop
        navigation
        centeredSlidesBounds
        className="moovie-swiper"
      >
        {movies?.map((item, idx) => (
          <SwiperSlide key={idx} className="focus:outline-none moovie-slide">
            <MoovieCard movie={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoovieSection;
