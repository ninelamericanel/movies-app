import React from 'react';
import { Rate } from 'antd';

import { GenresType, MovieType, RatedMovieType, SetRateMoviesFunc } from 'types/app';
import './Movie.scss';
import 'antd/dist/antd.css';
import { GenresContext } from 'genres-context/genres-context';

interface MovieProps {
  movie: MovieType;
  setRateMovies: SetRateMoviesFunc;
}

interface HashMapRatedMovies {
  [id: string]: RatedMovieType;
}

type HandleChangeFunc = (value: number) => void;

const Movie: React.FC<MovieProps> = ({ movie, setRateMovies }) => {
  const { name, description, poster, release, popularity, rated, genresIds } = movie;
  const findGenres = (array: GenresType[]) => {
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
  const getRatedMoviesFromLocalStorage = (): RatedMovieType[] => {
    const value: any = localStorage.getItem('myRatedMovies');
    return JSON.parse(value);
  };
  const makeHashMapRatedMovies = (array: RatedMovieType[]): RatedMovieType[] => {
    const reducer = array.reduce((acc: HashMapRatedMovies, curr: RatedMovieType) => {
      const id: string = curr.id;
      acc[id] = curr;
      return acc;
    }, {});
    return Object.values(reducer);
  };
  const sortArray = (array: RatedMovieType[]) => array.sort((a, b) => (a.updatedUp < b.updatedUp ? 1 : -1));
  const createRatedMovie = (unratedMovie: MovieType): RatedMovieType => {
    return {
      updatedUp: Date.now(),
      ...unratedMovie,
    };
  };
  const handleChange: HandleChangeFunc = (value) => {
    movie.rated = value;
    const ratedMov: RatedMovieType = createRatedMovie(movie);
    const ratedMoviesArray: RatedMovieType[] = getRatedMoviesFromLocalStorage();
    ratedMoviesArray.push(ratedMov);
    const arrayOfMovies: RatedMovieType[] = sortArray(makeHashMapRatedMovies(ratedMoviesArray));
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
        <div className="movie__genres">{findGenres(React.useContext(GenresContext))}</div>
        <p className="movie__description">{description}</p>
        <Rate className="movie__rate" defaultValue={rated} allowHalf count={10} onChange={handleChange} />
      </div>
    </>
  );
};

export default Movie;
//перенести в movielist и сделать проверку по айдищникам
