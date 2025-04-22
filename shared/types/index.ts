export interface OMDBMovieShort {
  Poster: string;
  Title: string;
  imdbID: string;
}

export interface OMDBResponse {
  Search?: OMDBMovieShort[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

export interface OMDBMoovie extends OMDBMovieShort {
  Type: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface SentimentData {
  positive_score: number;
  negative_score: number;
  neutral_score: number;
  overall: "positive" | "negative" | "neutral";
  summary: string;
}
