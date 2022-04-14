import React from 'react';

import { MovieType } from 'types/app';
import './Movie.scss';

interface MovieProps {
  movie: MovieType;
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
  const { name, description, poster, genres, release } = movie;
  const arrayGenres = genres.map((genre, id) => (
    <p key={id} className="movie__genre">
      {genre}
    </p>
  ));

  const srcPoster = poster ? <img src={poster} title={name}></img> : null;

  return (
    <>
      <div className="movie__poster">{srcPoster}</div>
      <div className="movie__info">
        <h5 className="movie__title">{name}</h5>
        <p className="movie__realise">{release}</p>
        <div className="movie__genres">{arrayGenres}</div>
        <p className="movie__description">{description}</p>
      </div>
    </>
  );
};

export default Movie;
