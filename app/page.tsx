"use client";
import MoovieSection from "@/components/organisms/MoovieSection/MoovieSection";
import { DEFAULT_SECTIONS } from "@/shared/constants";
import { useGetAllFavoritesQuery } from "@/shared/store/api/favorites";

export default function Home() {
  useGetAllFavoritesQuery();

  return (
    <div className="bg-black">
      {DEFAULT_SECTIONS.map(({ genre, query }, idx) => (
        <div className="py-8 pl-16" key={`moovie-section-${idx}`}>
          <MoovieSection genre={genre} query={query} />
        </div>
      ))}
    </div>
  );
}
