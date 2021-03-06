import React, { FC } from 'react';
import { Rate } from 'antd';

import {
  AddedToLocalStorageFunc,
  FindGenresFunc,
  GenresType,
  HandleRateMovieFunc,
  MovieType,
  StyleForRatingFunc,
} from 'types/app';
import './Movie.scss';
import 'antd/dist/antd.css';
import { GenresContext } from 'genres-context/genres-context';
import MovieService from 'services/movieService';

interface MovieProps {
  movie: MovieType;
}

const Movie: FC<MovieProps> = ({ movie }) => {
  const service = new MovieService();
  const { id, name, description, poster, release, popularity, rating, genresIds } = movie;
  const findGenres: FindGenresFunc = (array) => {
    const moviesGenres = array.filter((genre: GenresType) => {
      return genresIds.includes(genre.id);
    });
    return moviesGenres.map((genre: GenresType) => {
      return (
        <div key={genre.id} className="movie__genre">
          <p>{genre.name}</p>
        </div>
      );
    });
  };
  const srcPoster = poster ? <img src={poster} title={name}></img> : null;
  const addedToLocalStorage: AddedToLocalStorageFunc = (value) => {
    const ratedMovies = JSON.parse(localStorage.myRatedMovies);
    ratedMovies[id] = value;
    localStorage.myRatedMovies = JSON.stringify(ratedMovies);
  };
  const handleRateMovie: HandleRateMovieFunc = (value) => {
    const sessionId = localStorage.sessionId;
    service.rateMovie(id, sessionId, value);
    addedToLocalStorage(value);
  };
  const styleForRating: StyleForRatingFunc = (value) => {
    let className = 'movie__popularity';
    if (value >= 0 && value < 3) className += ' movie__popularity--red';
    if (value >= 3 && value < 5) className += ' movie__popularity--orange';
    if (value >= 5 && value < 7) className += ' movie__popularity--yellow';
    if (value >= 7) className += ' movie__popularity--green';
    return className;
  };

  return (
    <>
      <div className="movie__poster">{srcPoster}</div>
      <div className="movie__header">
        <h5 className="movie__title">{name}</h5>
        <div className={styleForRating(popularity)}>
          <p>{popularity}</p>
        </div>
      </div>
      <p className="movie__realise">{release}</p>
      <div className="movie__genres">{findGenres(React.useContext(GenresContext))}</div>
      <p className="movie__description">{description}</p>
      <Rate className="movie__rate" defaultValue={rating} allowHalf count={10} onChange={handleRateMovie} />
    </>
  );
};

export default Movie;
