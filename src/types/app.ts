export interface MovieType {
  name: string;
  id: string;
  genres: string[];
  release: string | null;
  description: string;
  poster: string | null;
}

export interface Response {
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
}

export type SetValueToSearchFunc = (value: HTMLButtonElement) => void;
export type TruncateTextFunc = (text: string) => string;
export type OnLoadMoviesFunc = (movies: Response[]) => void;
export type OnErrorFunc = (message: string) => void;
export type CreateMovieViewFunc = (movie: Response) => MovieType;
export type CheckEmptyFunc = (date: string) => string | null;
export type HandleTotalResultFunc = (totalResult: number) => void;
export type HandleChangePageFunc = (page: number) => void;
export type SendRequestFunc = (value: string, page?: number) => void;
export type CatchErrorFunc = (response: any) => void;
