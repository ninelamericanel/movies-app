import React from 'react';
import { Rate } from 'antd';

import { MovieType } from 'types/app';
import './Movie.scss';
import 'antd/dist/antd.css';

interface MovieProps {
  movie: MovieType;
}

type HandleChangeFunc = (value: number) => void;

const Movie: React.FC<MovieProps> = ({ movie }) => {
  const { name, description, poster, genres, release } = movie;
  const arrayGenres = genres.map((genre, id) => (
    <p key={id} className="movie__genre">
      {genre}
    </p>
  ));

  const srcPoster = poster ? <img src={poster} title={name}></img> : null;
  const handleChange: HandleChangeFunc = (value) => {
    const movieRated = {
      rated: value,
      ...movie,
    };
    const ratedMov: any = localStorage.getItem('myRatedMovies');
    const arr = JSON.parse(ratedMov);
    arr.push(movieRated);
    console.log(arr);
    localStorage.setItem('myRatedMovies', JSON.stringify(arr));
    // setLocalStorage(movieRated);
  };
  // const setLocalStorage = (movie) => {
  //   // localStorage.setItem()
  // };

  return (
    <>
      <div className="movie__poster">{srcPoster}</div>
      <div className="movie__info">
        <div className="movie__header">
          <h5 className="movie__title">{name}</h5>
          <div className="movie__rating">
            <p>5</p>
          </div>
        </div>
        <p className="movie__realise">{release}</p>
        <div className="movie__genres">{arrayGenres}</div>
        <p className="movie__description">{description}</p>
        <Rate className="movie__rate" allowHalf count={10} onChange={handleChange} />
      </div>
    </>
  );
};

export default Movie;
