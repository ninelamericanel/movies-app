import React from 'react';

import { RatedMovieType, SetRateMoviesFunc } from 'types/app';
import { MoviesItem } from 'components/MoviesItem';

interface RatedMoviesProps {
  ratedMovies: RatedMovieType[];
  setRateMovies: SetRateMoviesFunc;
}

const RatedMovies: React.FC<RatedMoviesProps> = ({ ratedMovies, setRateMovies }) => {
  return <MoviesItem listMovies={ratedMovies} setRateMovies={setRateMovies}></MoviesItem>;
};

export default RatedMovies;
// pagination(true, false)
