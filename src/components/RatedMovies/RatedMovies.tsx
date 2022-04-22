import React, { Component } from 'react';

import { RatedMovieType, SetRateMoviesFunc } from 'types/app';
import { MoviesItem } from 'components/MoviesItem';

interface RatedMoviesProps {
  setRateMovies: SetRateMoviesFunc;
}

type RatedMoviesState = {
  ratedMovies: RatedMovieType[];
};

export default class RatedMovies extends Component<RatedMoviesProps, RatedMoviesState> {
  state: RatedMoviesState = {
    ratedMovies: [],
  };

  componentDidMount() {
    const movies = JSON.parse(localStorage.myRatedMovies || '[]');
    localStorage.setItem('myRatedMovies', JSON.stringify(movies));
    this.setState({
      ratedMovies: movies,
    });
  }

  render() {
    const { ratedMovies } = this.state;

    return (
      <MoviesItem pagination={false} listMovies={ratedMovies} setRateMovies={this.props.setRateMovies}></MoviesItem>
    );
  }
}

// export default RatedMovies;
// pagination(true, false)
