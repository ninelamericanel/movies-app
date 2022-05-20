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

export type HandleChangePageFunc = (page: number) => void;
export type OnLoadMoviesFunc = (array: ResponseType[], totalResults: number) => void;
export type SetValueToSearchFunc = (value: HTMLButtonElement) => void;
export type SetTabFunc = (tab: string) => void;
export type OnErrorFunc = (message: string) => void;
export type NoParamsVoidFunc = () => void;
export type OutputGenresFunc = (array: []) => void;
export type StyleForRatingFunc = (value: number) => string;
export type HandleRateMovieFunc = (value: number) => void;
export type AddedToLocalStorageFunc = (value: number) => void;
export type FindGenresFunc = (array: GenresType[]) => JSX.Element[];
export type TruncateTextFunc = (text: string) => string;
export type CreateMovieViewFunc = (movie: ResponseType) => MovieType;
export type CheckEmptyDateFunc = (date: string) => string | null;
export type CheckRatingFunc = (id: number) => number | undefined;
export type SendRequestFunc = (value: string, page?: number) => void;
export type SendRequestRatedMoviesFunc = (page?: number) => void;
