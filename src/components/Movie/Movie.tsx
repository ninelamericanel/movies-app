import React from 'react';
import { Rate } from 'antd';

import { MovieType, SetRateMoviesFunc } from 'types/app';
import './Movie.scss';
import 'antd/dist/antd.css';

interface MovieProps {
  movie: MovieType;
  setRateMovies: SetRateMoviesFunc;
}

interface Huinya {
  [id: string]: MovieType;
}

type HandleChangeFunc = (value: number) => void;

const Movie: React.FC<MovieProps> = ({ movie, setRateMovies }) => {
  const { name, description, poster, genres, release, popularity, rated } = movie;
  const arrayGenres = genres.map((genre, id) => (
    <p key={id} className="movie__genre">
      {genre}
    </p>
  ));

  const srcPoster = poster ? <img src={poster} title={name}></img> : null;
  const handleChange: HandleChangeFunc = (value) => {
    movie.rated = value;
    const ratedMov: any = localStorage.getItem('myRatedMovies');
    const arr = JSON.parse(ratedMov);
    arr.push(movie);
    const reducer = arr.reduce((acc: Huinya, curr: MovieType) => {
      const id: string = curr.id;
      acc[id] = curr;
      return acc;
    }, {});
    const arrayOfMovies: MovieType[] = Object.values(reducer);
    setRateMovies(arrayOfMovies);
  };

  const styleForRating = (value: number): string => {
    let className = 'movie__popularity';
    if (value >= 0 && value < 3) className += ' red';
    if (value >= 3 && value < 5) className += ' orange';
    if (value >= 5 && value < 7) className += ' yellow';
    if (value >= 7) className += ' green';
    return className;
  };

  return (
    <>
      <div className="movie__poster">{srcPoster}</div>
      <div className="movie__info">
        <div className="movie__header">
          <h5 className="movie__title">{name}</h5>
          <div className={styleForRating(popularity)}>
            <p>{popularity}</p>
          </div>
        </div>
        <p className="movie__realise">{release}</p>
        <div className="movie__genres">{arrayGenres}</div>
        <p className="movie__description">{description}</p>
        <Rate className="movie__rate" defaultValue={rated} allowHalf count={10} onChange={handleChange} />
      </div>
    </>
  );
};

export default Movie;
