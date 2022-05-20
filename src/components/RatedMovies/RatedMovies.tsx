import React, { Component } from 'react';
import { Alert } from 'antd';

import {
  HandleChangePageFunc,
  NoParamsVoidFunc,
  OnErrorFunc,
  OnLoadMoviesFunc,
  ResponseType,
  SendRequestRatedMoviesFunc
} from "types/app";
import { MoviesItem } from 'components/MoviesItem';
import { Spinner } from 'components/Spinner';
import MovieService from 'services/movieService';

interface RatedMoviesProps {}

type RatedMoviesState = {
  movies: ResponseType[] | [];
  totalResult: number;
  currentPage: number;
  loading: boolean;
  error: boolean;
  errorInfo: string;
};

export default class RatedMovies extends Component<RatedMoviesProps, RatedMoviesState> {
  service = new MovieService();

  state: RatedMoviesState = {
    movies: [],
    totalResult: 0,
    currentPage: 1,
    loading: true,
    error: false,
    errorInfo: '',
  };

  componentDidMount() {
    this.sendRequest();
  }

  componentDidUpdate(prevProps: RatedMoviesProps, prevState: RatedMoviesState) {
    const { currentPage } = this.state;
    if (currentPage !== prevState.currentPage) {
      this.sendRequest(currentPage);
    }
  }

  sendRequest: SendRequestRatedMoviesFunc = (page = 1) => {
    this.resetError();
    const sessionId = localStorage.sessionId;
    this.service
      .getRatedMovies(sessionId, page)
      .then((res) => this.onLoadMovies(res.results, res.total_results))
      .catch(() => {
        this.catchError();
        this.onError('Failed to fetch response! You can try to connect vpn.');
      });
  };

  catchError: NoParamsVoidFunc = () => {
    localStorage.clear();
  };

  resetError: NoParamsVoidFunc = () => {
    this.setState({
      error: false,
      errorInfo: '',
    });
  };

  onError: OnErrorFunc = (message) => {
    this.setState({
      loading: false,
      error: true,
      errorInfo: message,
    });
  };

  handleChangePage: HandleChangePageFunc = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  onLoadMovies: OnLoadMoviesFunc = (array, totalResults) => {
    this.setState({
      movies: array,
      totalResult: totalResults,
      loading: false,
    });
  };

  render() {
    const { movies, totalResult, currentPage, loading, error, errorInfo } = this.state;
    const loadComponent = loading ? <Spinner text="We are getting films that you like..." /> : null;
    const errorComponent = error ? (
      <Alert className="alert" message="Error" description={errorInfo} type="error" />
    ) : null;
    const hasData = !loading && movies.length !== 0;
    const moviesList = hasData ? (
      <MoviesItem
        movies={movies}
        totalResult={totalResult}
        currentPage={currentPage}
        handleChangePage={this.handleChangePage}
      />
    ) : null;
    return (
      <>
        {loadComponent}
        {moviesList}
        {errorComponent}
      </>
    );
  }
}
