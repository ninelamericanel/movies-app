import React, { Component } from 'react';

import { ResponseType, SetRateMoviesFunc } from 'types/app';
import { MoviesItem } from 'components/MoviesItem';
import MovieService from 'services/movieService';

interface RatedMoviesProps {
  setRateMovies: SetRateMoviesFunc;
}

type RatedMoviesState = {
  movies: ResponseType[] | [];
  totalResult: number;
  currentPage: number;
};

export default class RatedMovies extends Component<RatedMoviesProps, RatedMoviesState> {
  service = new MovieService();

  state: RatedMoviesState = {
    movies: [],
    totalResult: 0,
    currentPage: 1,
  };

  componentDidMount() {
    const session = localStorage.sessionId;
    this.service.getRatedMovies(session).then((res) => {
      this.viewMovies(res.results, res.page, res.total_results);
    });
  }

  viewMovies = (array: ResponseType[], page: number, totalResults: number): void => {
    this.setState({
      movies: array,
      totalResult: totalResults,
      currentPage: page,
    });
  };

  render() {
    const { movies, totalResult, currentPage } = this.state;
    return (
      <MoviesItem
        movies={movies}
        totalResult={totalResult}
        currentPage={currentPage}
        setRateMovies={this.props.setRateMovies}
      ></MoviesItem>
    );
  }
}
