import React, { Component } from 'react';
import { Alert } from 'antd';

import { HandleChangePageFunc, OnErrorFunc, OnLoadMoviesFunc, ResponseType } from 'types/app';
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

  sendRequest = (value: string, page: number = 1): void => {
    this.resetError();
    this.service
      .getMovies(value, page)
      .then(([response, totalResult]) => {
        if (response.length === 0) throw new Error('Not found');
        this.onLoadMovies(response, totalResult);
      })
      .catch((error) =>
        error.message === 'Not found'
          ? this.onError(error.message)
          : this.onError('Failed to fetch response! You can try to connect vpn.')
      );
  };

  resetError = (): void => {
    this.setState({
      error: false,
      errorInfo: '',
    });
  };

  handleChangePage: HandleChangePageFunc = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  onLoadMovies: OnLoadMoviesFunc = (array, totalResult) => {
    this.setState({
      movies: array,
      totalResult: totalResult,
      loading: false,
    });
  };

  onError: OnErrorFunc = (message: string): void => {
    this.setState({
      loading: false,
      error: true,
      errorInfo: message,
    });
  };

  render() {
    const { loading, error, errorInfo, currentPage, totalResult, movies } = this.state;
    const loadComponent = loading ? <Spinner text="We are search movies..." /> : null;
    const errorComponent = error ? (
      <Alert className="alert" message="Error" description={errorInfo} type="error" />
    ) : null;
    const hasData = !loading && !error && movies.length !== 0;
    const moviesList = hasData ? (
      <MoviesItem
        currentPage={currentPage}
        totalResult={totalResult}
        movies={movies}
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
