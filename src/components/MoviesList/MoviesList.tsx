import React from 'react';

import { MovieType } from '../../types/app';
import { Movie } from '../Movie';

import './MoviesList.scss';

interface MoviesListProps {
  movies: MovieType[];
}

const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  const elements = movies.map((movie) => {
    const { id } = movie;
    return (
      <li className="movie" key={id}>
        <Movie movie={movie} />
      </li>
    );
  });

  return <ul className="list">{elements}</ul>;
};

export default MoviesList;
