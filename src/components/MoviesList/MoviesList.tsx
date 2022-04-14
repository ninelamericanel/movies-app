import React, { Component } from 'react';
import { format } from 'date-fns';
import { Pagination } from 'antd';

import {
  CatchErrorFunc,
  CheckEmptyFunc,
  CreateMovieViewFunc,
  HandleChangePageFunc,
  HandleTotalResultFunc,
  MovieType,
  OnErrorFunc,
  OnLoadMoviesFunc,
  SendRequestFunc,
  TruncateTextFunc,
} from 'types/app';
import movieService from 'services/movieService';
import { Spinner } from 'components/Spinner';
import { ErrorComponent } from 'components/ErrorComponent';
import { Movie } from 'components/Movie';

import './MoviesList.scss';

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
      console.log(search);
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
    const { loading, error, errorInfo, movies, totalResult, currentPage } = this.state;
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
    const hasData = !loading && !error && movies.length !== 0;
    const moviesList = hasData ? (
      <div className="main">
        <ul className="main__list list">{elements}</ul>
        <div className="main__pagination pagination">
          <Pagination
            onChange={(page) => {
              this.handleChangePage(page);
            }}
            total={totalResult}
            pageSize={20}
            current={currentPage}
            showSizeChanger={false}
          />
        </div>
      </div>
    ) : null;

    return (
      <>
        {loadComponent}
        {errorComponent}
        {moviesList}
      </>
    );
  }
}
