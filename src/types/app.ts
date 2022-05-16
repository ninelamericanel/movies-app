export interface MovieType {
  name: string;
  id: string;
  genresIds: number[];
  release: string | null;
  description: string;
  poster: string | null;
  popularity: number;
  rating: number | undefined;
}

export interface RatedMovieType extends MovieType {
  updatedUp: number;
}

export interface GenresType {
  id: number;
  name: string;
}

export interface ResponseType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rating?: number;
}

export type SetValueToSearchFunc = (value: HTMLButtonElement) => void;
export type OnLoadMoviesFunc = (movies: Response[]) => void;
export type OnErrorFunc = (message: string) => void;
export type CreateMovieViewFunc = (movie: Response) => MovieType;
export type HandleTotalResultFunc = (totalResult: number) => void;
export type HandleChangePageFunc = (page: number) => void;
export type SendRequestFunc = (value: string, page?: number) => void;
export type CatchErrorFunc = (response: any) => void;
export type SetTabFunc = (tab: string) => void;
export type SetRateMoviesFunc = (array: MovieType[]) => void;
