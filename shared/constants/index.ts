import { MoovieSectionProps } from "@/components/organisms/MoovieSection/MoovieSection";

export const DEFAULT_SECTIONS: MoovieSectionProps[] = [
  { genre: "Action Movies", query: "Action" },
  { genre: "Comedy Movies", query: "Comedy" },
  { genre: "Documentaries", query: "Documentary" },
  { genre: "Animated Films", query: "Animation" },
  // !TODO: GET ANOTHER GENRE { genre: "Sci-Fi Thrillers", query: "Sci-Fi Thriller" },
];
