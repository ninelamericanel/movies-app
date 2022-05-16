import React, { FC } from 'react';
import { Pagination } from 'antd';
import { format } from 'date-fns';

import { Movie } from 'components/Movie';
import { HandleChangePageFunc, MovieType, ResponseType } from 'types/app';

interface MoviesItemsProps {
  movies: ResponseType[];
  totalResult: number;
  currentPage: number;
  handleChangePage?: HandleChangePageFunc;
}

const MoviesItem: FC<MoviesItemsProps> = ({ handleChangePage, currentPage, totalResult, movies }) => {
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
    return ratedMovies.reduce((acc: number, rateMovie) => {
      if (rateMovie.idRated == id) acc += rateMovie.rating;
      return acc;
    }, 0);
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
    const rateMovie = createMovieView(movie);
    const { id } = movie;
    return (
      <li className="movie" key={id}>
        <Movie movie={rateMovie} />
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
          pageSize={20}
        />
      </div>
    </div>
  );
};

export default MoviesItem;
