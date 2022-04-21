import React, { useState } from 'react';
import { Pagination } from 'antd';

import { MovieType, SetRateMoviesFunc } from 'types/app';
import { Movie } from 'components/Movie';

interface RatedMoviesProps {
  ratedMovies: MovieType[];
  setRateMovies: SetRateMoviesFunc;
}

const RatedMovies: React.FC<RatedMoviesProps> = ({ ratedMovies, setRateMovies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const elements = ratedMovies.map((movie) => {
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

export default RatedMovies;
