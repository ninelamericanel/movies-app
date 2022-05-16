import React, { Component } from 'react';
import { Alert } from 'antd';

import {
  CatchErrorFunc,
  HandleChangePageFunc,
  HandleTotalResultFunc,
  OnErrorFunc,
  ResponseType,
  SendRequestFunc,
  SetRateMoviesFunc,
} from 'types/app';
import movieService from 'services/movieService';
import { Spinner } from 'components/Spinner';
import { MoviesItem } from 'components/MoviesItem';

import './MoviesList.scss';

type MoviesListState = {
  movies: ResponseType[] | [];
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
    this.resetError();
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

  resetError = (): void => {
    this.setState({
      error: false,
      errorInfo: '',
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

  onLoadMovies = (array: ResponseType[]): void => {
    this.setState({
      movies: array,
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

  render() {
    const { loading, error, errorInfo, currentPage, totalResult, movies } = this.state;
    const loadComponent = loading ? <Spinner /> : null;
    const errorComponent = error ? (
      <Alert className="alert" message="Error" description={errorInfo} type="error" />
    ) : null;
    const hasData = !loading && !error && movies.length !== 0;
    const moviesList = hasData ? (
      <MoviesItem
        currentPage={currentPage}
        totalResult={totalResult}
        movies={movies}
        setRateMovies={this.props.setRateMovies}
        handleChangePage={this.handleChangePage}
      />
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
