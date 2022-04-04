import React, { Component } from 'react';

import { MovieType } from '../../types/app';
import { MoviesList } from '../MoviesList';
import './App.scss';
import movieService from '../../services/movieService';

type AppState = {
  movies: MovieType[];
};

interface AppProps {}

type TruncateTextFunc = (text: string) => string;

export default class App extends Component<AppProps | AppState> {
  service = new movieService();

  state: AppState = {
    movies: [],
  };

  componentDidMount() {
    this.service.getMovies('return').then((arrayOfMovies) => {
      let arr = arrayOfMovies.map((movie: any) => {
        return {
          name: movie.title,
          id: movie.id,
          // realise: new Date(),
          poster: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
          description: this.truncateText(movie.overview),
          genres: ['Action', 'Drama'],
        };
      });
      this.setState({
        movies: arr,
      });
    });
  }

  truncateText: TruncateTextFunc = (text) => {
    const maxLength = 100;
    if (text.length >= maxLength) {
      return text
        .slice(0, maxLength)
        .trim()
        .replace(/\W*\s(\S)*$/, '...');
    }
    return text;
  };

  render() {
    // this.updateMovie();
    return (
      <div className="content">
        <MoviesList movies={this.state.movies} />
      </div>
    );
  }
}
