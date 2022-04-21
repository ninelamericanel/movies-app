import React, { Component } from 'react';
import { format } from 'date-fns';

import {
  CatchErrorFunc,
  CreateMovieViewFunc,
  HandleChangePageFunc,
  HandleTotalResultFunc,
  MovieType,
  OnErrorFunc,
  OnLoadMoviesFunc,
  SendRequestFunc,
  SetRateMoviesFunc,
} from 'types/app';
import movieService from 'services/movieService';
import { Spinner } from 'components/Spinner';
import { ErrorComponent } from 'components/ErrorComponent';
import { MoviesItem } from 'components/MoviesItem';

import './MoviesList.scss';
type CheckRatedMovieFunc = (id: string) => number;

type MoviesListState = {
  movies: MovieType[];
  totalResult: number;
  loading: boolean;
  error: boolean;
  currentPage: number;
  errorInfo: string;
};

interface MoviesListProps {
  search: string;
  setRateMovies: SetRateMoviesFunc;
}

export default class MoviesList extends Component<MoviesListProps, MoviesListState> {
  service = new movieService();

  state: MoviesListState = {
    movies: [],
    totalResult: 0,
    currentPage: 1,
    loading: true,
    error: false,
    errorInfo: '',
  };

  componentDidMount() {
    this.sendRequest(this.props.search);
  }

  componentDidUpdate(prevProps: MoviesListProps, prevState: MoviesListState): void {
    const { search } = this.props;
    const { currentPage } = this.state;
    if (search !== prevProps.search) {
      this.sendRequest(search);
    }
    if (currentPage !== prevState.currentPage) {
      this.sendRequest(search, currentPage);
    }
  }

  sendRequest: SendRequestFunc = (value, page = 1) => {
    this.setState({
      error: false,
      errorInfo: '',
    });
    this.service
      .getMovies(value, page)
      .then(([response, totalResult]) => {
        this.catchError(response);
        this.onLoadMovies(response);
        this.handleTotalResult(totalResult);
      })
      .catch((error) => {
        this.onError(error.message);
      });
  };

  catchError: CatchErrorFunc = (response) => {
    if (response instanceof Error) throw new Error(response.message);
    if (response.length === 0) throw new Error('Not found');
  };

  handleTotalResult: HandleTotalResultFunc = (result) => {
    this.setState({
      totalResult: result,
    });
  };

  handleChangePage: HandleChangePageFunc = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  onLoadMovies: OnLoadMoviesFunc = (movies) => {
    let arr = movies.map((movie) => this.createMovieView(movie));
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
      release: this.checkEmptyDate(movie.release_date),
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null,
      description: this.truncateText(overview),
      genresIds: movie.genre_ids,
      popularity: movie.vote_average,
      rated: this.checkRatedMovie(id.toString()),
    };
  };

  checkRatedMovie: CheckRatedMovieFunc = (id) => {
    const array = JSON.parse(localStorage.myRatedMovies);
    return array.reduce((acc: number, rateMovie: MovieType) => {
      if (rateMovie.id === id) acc += rateMovie.rated;
      return acc;
    }, 0); //преобразовать для поиска по айдишнику из ЛС
  };

  private truncateText = (text: string): string => {
    const maxLength = 100;
    if (text.length >= maxLength) {
      return text
        .slice(0, maxLength)
        .trim()
        .replace(/\W*\s(\S)*$/, '...');
    }
    return text;
  };

  private checkEmptyDate = (date: string): string | null => {
    return date ? format(new Date(date), 'PP') : null;
  };

  render() {
    const { loading, error, errorInfo, movies } = this.state;
    const loadComponent = loading ? <Spinner /> : null;
    const errorComponent = error ? <ErrorComponent errorInfo={errorInfo} /> : null;
    const hasData = !loading && !error && movies.length !== 0;
    const moviesList = hasData ? <MoviesItem listMovies={movies} setRateMovies={this.props.setRateMovies} /> : null;

    return (
      <>
        {loadComponent}
        {errorComponent}
        {moviesList}
      </>
    );
  }
}
