import React, { FC } from 'react';
import { Pagination } from 'antd';
import { format } from 'date-fns';

import { Movie } from 'components/Movie';
import {
  CheckEmptyDateFunc,
  CheckRatingFunc,
  CreateMovieViewFunc,
  HandleChangePageFunc,
  ResponseType,
  TruncateTextFunc,
} from 'types/app';

import './MoviesItem.scss';

interface MoviesItemsProps {
  movies: ResponseType[];
  totalResult: number;
  currentPage: number;
  handleChangePage: HandleChangePageFunc;
}

const MoviesItem: FC<MoviesItemsProps> = ({ handleChangePage, currentPage, totalResult, movies }) => {
  const truncateText: TruncateTextFunc = (text) => {
    const maxLength = 120;
    if (text.length >= maxLength) {
      return text
        .slice(0, maxLength)
        .trim()
        .replace(/\W*\s(\S)*$/, '...');
    }
    return text;
  };
  const checkEmptyDate: CheckEmptyDateFunc = (date) => (date ? format(new Date(date), 'PP') : null);
  const checkRating: CheckRatingFunc = (id) => {
    const ratedMovies = JSON.parse(localStorage.myRatedMovies);
    const ids = Object.keys(ratedMovies);
    if (ids.length !== 0) {
      return ids.reduce((acc: number, rateMovie) => {
        if (+rateMovie === id) {
          acc += ratedMovies[rateMovie];
        }
        return acc;
      }, 0);
    }
  };
  const createMovieView: CreateMovieViewFunc = (movie) => {
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
    const rateMovie = createMovieView(movie);
    const { id } = movie;
    return (
      <li className="movie" key={id}>
        <Movie movie={rateMovie} />
      </li>
    );
  });

  const viewPagination =
    totalResult > 20 ? (
      <>
        <div className="view__pagination pagination">
          <Pagination
            onChange={(page) => (handleChangePage ? handleChangePage(page) : null)}
            total={totalResult}
            current={currentPage}
            showSizeChanger={false}
            pageSize={20}
          />
        </div>
      </>
    ) : null;

  return (
    <div className="view">
      <ul className="view__list list">{elements}</ul>
      {viewPagination}
    </div>
  );
};

export default MoviesItem;
