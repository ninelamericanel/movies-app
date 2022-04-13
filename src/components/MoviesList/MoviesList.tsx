import React, { Component } from 'react';
import { format } from 'date-fns';

import { MovieType } from '../../types/app';
import './MoviesList.scss';
import movieService from '../../services/movieService';
import { Spinner } from '../Spinner';
import { ErrorComponent } from '../ErrorComponent';
import { Movie } from '../Movie';

type MoviesListState = {
  movies: MovieType[];
  loading: boolean;
  error: boolean;
  errorInfo: string;
};

interface Response {
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

interface MoviesListProps {
  search: string;
}

export type TruncateTextFunc = (text: string) => string;
export type OnLoadMoviesFunc = (movies: Response[]) => void;
export type OnErrorFunc = (message: string) => void;
export type CreateMovieViewFunc = (movie: Response) => MovieType;
export type CheckEmptyFunc = (date: string) => string | null;

export default class MoviesList extends Component<MoviesListProps, MoviesListState> {
  service = new movieService();

  state: MoviesListState = {
    movies: [],
    loading: true,
    error: false,
    errorInfo: '',
  };

  componentDidMount() {
    const { search } = this.props;
    this.service
      .getMovies(search)
      .then((response) => {
        if (response instanceof Error) throw new Error(response.message);
        if (response.length === 0) throw new Error('Not found');
        this.onLoadMovies(response);
      })
      .catch((error) => {
        this.onError(error.message);
      });
  }

  componentDidUpdate(prevProps: MoviesListProps): void {
    const { search } = this.props;
    if (search !== prevProps.search) {
      this.service
        .getMovies(search)
        .then((response) => {
          if (response instanceof Error) throw new Error(response.message);
          if (response.length === 0) throw new Error('Not found');
          this.onLoadMovies(response);
        })
        .catch((error) => {
          this.onError(error.message);
        });
    }
  }

  onLoadMovies: OnLoadMoviesFunc = (movies) => {
    let arr = movies.map((movie) => {
      return this.createMovieView(movie);
    });
    this.setState({
      movies: arr,
      loading: false,
    });
  };

  onError: OnErrorFunc = (message) => {
    this.setState({
      loading: false,
      error: true,
      errorInfo: message,
    });
  };

  private createMovieView: CreateMovieViewFunc = (movie) => {
    const { title, id, overview } = movie;
    return {
      name: title,
      id: id.toString(),
      release: this.checkEmpty(movie.release_date),
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null,
      description: this.truncateText(overview),
      genres: ['Action', 'Drama'],
    };
  };

  private truncateText: TruncateTextFunc = (text) => {
    const maxLength = 100;
    if (text.length >= maxLength) {
      return text
        .slice(0, maxLength)
        .trim()
        .replace(/\W*\s(\S)*$/, '...');
    }
    return text;
  };

  private checkEmpty: CheckEmptyFunc = (date) => {
    return date ? format(new Date(date), 'PP') : null;
  };

  render() {
    const { loading, error, errorInfo, movies } = this.state;
    const loadComponent = loading ? <Spinner /> : null;
    const errorComponent = error ? <ErrorComponent errorInfo={errorInfo} /> : null;
    const elements = movies.map((movie) => {
      const { id } = movie;
      return (
        <li className="movie" key={id}>
          <Movie movie={movie} />
        </li>
      );
    });
    const moviesOutput = movies.length !== 0 ? elements : null;

    return (
      <ul className="list">
        {loadComponent}
        {errorComponent}
        {moviesOutput}
      </ul>
    );
  }
}
