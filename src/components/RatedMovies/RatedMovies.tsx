import React, { Component } from 'react';

import { ResponseType, SetRateMoviesFunc } from 'types/app';
import { MoviesItem } from 'components/MoviesItem';
import MovieService from 'services/movieService';

interface RatedMoviesProps {
  setRateMovies: SetRateMoviesFunc;
}

type RatedMoviesState = {
  movies: ResponseType[] | [];
};

export default class RatedMovies extends Component<RatedMoviesProps, RatedMoviesState> {
  service = new MovieService();

  state: RatedMoviesState = {
    movies: [],
  };

  componentDidMount() {
    const session = localStorage.sessionId;
    this.service.getRatedMovies(session).then((res) => this.viewMovies(res.results));
  }

  viewMovies = (array) => {
    this.setState({
      movies: array,
    });
  };

  render() {
    const { movies } = this.state;
    return <MoviesItem movies={movies} setRateMovies={this.props.setRateMovies}></MoviesItem>;
  }
}
