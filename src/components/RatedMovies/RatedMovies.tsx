import React, { Component } from 'react';

import { HandleChangePageFunc, OnLoadMoviesFunc, ResponseType } from 'types/app';
import { MoviesItem } from 'components/MoviesItem';
import MovieService from 'services/movieService';

import { Spinner } from '../Spinner';

interface RatedMoviesProps {}

type RatedMoviesState = {
  movies: ResponseType[] | [];
  totalResult: number;
  currentPage: number;
  loading: boolean;
};

export default class RatedMovies extends Component<RatedMoviesProps, RatedMoviesState> {
  service = new MovieService();

  state: RatedMoviesState = {
    movies: [],
    totalResult: 0,
    currentPage: 1,
    loading: true,
  };

  componentDidMount() {
    this.sendRequest();
  }

  componentDidUpdate(prevProps: RatedMoviesProps, prevState: RatedMoviesState): void {
    const { currentPage } = this.state;
    if (currentPage !== prevState.currentPage) {
      this.sendRequest(currentPage);
    }
  }

  sendRequest = (page: number = 1) => {
    const sessionId = localStorage.sessionId;
    this.service.getRatedMovies(sessionId, page).then((res) => {
      this.onLoadMovies(res.results, res.total_results);
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
    const { movies, totalResult, currentPage, loading } = this.state;
    const loadComponent = loading ? <Spinner text="We are getting films that you like..." /> : null;
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
      </>
    );
  }
}
