import React, { Component } from 'react';
import { Rate } from 'antd';

import { MovieType } from 'types/app';

interface RatedMoviesProps {}

interface RatedMoviesType extends MovieType {
  rated: number;
}

type RatedMoviesState = {
  movies: RatedMoviesType[];
};

export default class RatedMovies extends Component<RatedMoviesProps, RatedMoviesState> {
  state: RatedMoviesState = {
    movies: [],
  };

  componentDidMount() {
    const ratedMovies: any = localStorage.getItem('myRatedMovies');
    const arr = JSON.parse(ratedMovies);
    this.setState({
      movies: arr,
    });
  }

  render() {
    const { movies } = this.state;
    const viewMovies = movies.map((item) => {
      const { description, id, name, rated, release, genres, poster } = item;
      const srcPoster = poster ? <img src={poster} title={name}></img> : null;
      const arrayGenres = genres.map((genre, i) => (
        <p key={i} className="movie__genre">
          {genre}
        </p>
      ));
      return (
        <li className="movie" key={id}>
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
            <Rate className="movie__rate" allowHalf count={10} defaultValue={rated} />
          </div>
        </li>
      );
    });

    return <div>{viewMovies}</div>;
  }
}
