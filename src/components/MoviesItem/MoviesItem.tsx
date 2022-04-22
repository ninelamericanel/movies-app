import React, { FC } from 'react';
import { Pagination } from 'antd';

import { Movie } from 'components/Movie';
import { HandleChangePageFunc, MovieType, RatedMovieType, SetRateMoviesFunc } from 'types/app';

interface MoviesItemsProps {
  listMovies: RatedMovieType[] | MovieType[];
  setRateMovies: SetRateMoviesFunc;
  pagination: boolean;
  totalResult?: number;
  currentPage?: number;
  handleChangePage?: HandleChangePageFunc;
}

const MoviesItem: FC<MoviesItemsProps> = ({
  handleChangePage,
  currentPage,
  totalResult,
  pagination,
  listMovies,
  setRateMovies,
}) => {
  const elements = listMovies.map((movie) => {
    const { id } = movie;
    return (
      <li className="movie" key={id}>
        <Movie movie={movie} setRateMovies={setRateMovies} />
      </li>
    );
  });
  const paginationView = pagination ? (
    <div className="view__pagination pagination">
      <Pagination
        onChange={(page) => (handleChangePage ? handleChangePage(page) : null)}
        total={totalResult}
        current={currentPage}
        showSizeChanger={false}
      />
    </div>
  ) : null;

  return (
    <div className="view">
      <ul className="view__list list">{elements}</ul>
      {paginationView}
    </div>
  );
};

export default MoviesItem;
