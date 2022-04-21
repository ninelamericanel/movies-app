import React, { FC, useState } from 'react';
import { Pagination } from 'antd';

import { Movie } from 'components/Movie';
import { MovieType, RatedMovieType, SetRateMoviesFunc } from 'types/app';

interface MoviesItemsProps {
  listMovies: RatedMovieType[] | MovieType[];
  setRateMovies: SetRateMoviesFunc;
}

const MoviesItem: FC<MoviesItemsProps> = ({ listMovies, setRateMovies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const elements = listMovies.map((movie) => {
    const { id } = movie;
    return (
      <li className="movie" key={id}>
        <Movie movie={movie} setRateMovies={setRateMovies} />
      </li>
    );
  });

  return (
    <div className="view">
      <ul className="view__list list">{elements}</ul>
      <div className="view__pagination pagination">
        <Pagination
          onChange={(page) => setCurrentPage(page)}
          total={elements.length - 1}
          pageSize={10}
          current={currentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MoviesItem;
