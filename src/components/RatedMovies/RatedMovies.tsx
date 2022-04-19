import React from 'react';

import { MovieType, SetRateMoviesFunc } from 'types/app';
import { Movie } from 'components/Movie';

interface RatedMoviesProps {
  ratedMovies: MovieType[];
  setRateMovies: SetRateMoviesFunc;
}

const RatedMovies: React.FC<RatedMoviesProps> = ({ ratedMovies, setRateMovies }) => {
  const elements = ratedMovies.map((movie) => {
    const { id } = movie;
    return (
      <li className="movie" key={id}>
        <Movie movie={movie} setRateMovies={setRateMovies} />
      </li>
    );
  });

  return <div className="main__list list">{elements}</div>;
};

export default RatedMovies;
