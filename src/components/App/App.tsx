import React, { Component } from 'react';
import { format } from 'date-fns';

import { MovieType } from '../../types/app';
import { MoviesList } from '../MoviesList';
import { ErrorComponent } from '../ErrorComponent';
import './App.scss';
import movieService from '../../services/movieService';
import { Spinner } from '../Spinner';

type AppState = {
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
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface AppProps {}

type TruncateTextFunc = (text: string) => string;
type OnLoadMoviesFunc = (movies: Response[]) => void;
type OnErrorFunc = (message: string) => void;
type CreateMovieViewFunc = (movie: Response) => MovieType;
type CheckEmptyFunc = (date: string) => string | null;

export default class App extends Component<AppProps | AppState> {
  service = new movieService();

  state: AppState = {
    movies: [],
    loading: true,
    error: false,
    errorInfo: '',
  };

  componentDidMount() {
    this.service
      .getMovies('hello')
      .then((response) => {
        if (response instanceof Error) throw new Error(response.message);
        if (response.length === 0) throw new Error('Not found');
        this.onLoadMovies(response);
      })
      .catch((error) => {
        console.log(error);
        this.onError(error.message);
      });
  }

  onLoadMovies: OnLoadMoviesFunc = (movies) => {
    let arr = movies.map((movie: Response) => {
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
      poster: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
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
    const { loading, movies, error, errorInfo } = this.state;
    console.log(errorInfo);
    const loadComponent = loading ? <Spinner /> : null;
    const errorComponent = error ? <ErrorComponent errorInfo={errorInfo} /> : null;
    return (
      <div className="content">
        {loadComponent}
        {errorComponent}
        <MoviesList movies={movies} />
      </div>
    );
  }
}
