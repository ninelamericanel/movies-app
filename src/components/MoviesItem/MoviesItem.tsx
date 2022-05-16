import React, { FC } from 'react';
import { Pagination } from 'antd';
import { format } from 'date-fns';

import { Movie } from 'components/Movie';
import { HandleChangePageFunc, MovieType, ResponseType, SetRateMoviesFunc } from 'types/app';

interface MoviesItemsProps {
  movies: ResponseType[];
  setRateMovies: SetRateMoviesFunc;
  totalResult?: number;
  currentPage?: number;
  handleChangePage?: HandleChangePageFunc;
}

const MoviesItem: FC<MoviesItemsProps> = ({ handleChangePage, currentPage, totalResult, movies, setRateMovies }) => {
  // const checkRatedMovie = (id: string): number => {
  //   const array = JSON.parse(localStorage.myRatedMovies);
  //   return array.reduce((acc: number, rateMovie: MovieType) => {
  //     if (rateMovie.id === id) acc += rateMovie.rated;
  //     return acc;
  //   }, 0);
  // };

  const truncateText = (text: string): string => {
    const maxLength = 120;
    if (text.length >= maxLength) {
      return text
        .slice(0, maxLength)
        .trim()
        .replace(/\W*\s(\S)*$/, '...');
    }
    return text;
  };

  const checkEmptyDate = (date: string): string | null => (date ? format(new Date(date), 'PP') : null);

  const checkRating = (id: number | undefined) => {
    const ratedMovies = JSON.parse(localStorage.myRatedMovies);
    let rating = 0;
    ratedMovies.forEach((item) => {
      if (item.idRated == id) {
        rating = item.rating;
      }
    });
    return rating;
  };
  const createMovieView = (movie: ResponseType): MovieType => {
    const rate = checkRating(movie.id);
    return {
      name: movie.title,
      id: movie.id.toString(),
      release: checkEmptyDate(movie.release_date),
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : null,
      description: truncateText(movie.overview),
      genresIds: movie.genre_ids,
      popularity: movie.vote_average,
      rating: movie.rating || rate,
    };
  };

  const elements = movies.map((movie) => {
    // console.log(movie);
    const rateMovie = createMovieView(movie);
    const { id } = movie;
    return (
      <li className="movie" key={id}>
        <Movie movie={rateMovie} setRateMovies={setRateMovies} />
      </li>
    );
  });

  return (
    <div className="view">
      <ul className="view__list list">{elements}</ul>
      <div className="view__pagination pagination">
        <Pagination
          onChange={(page) => (handleChangePage ? handleChangePage(page) : null)}
          total={totalResult}
          current={currentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MoviesItem;
