import React, { Component } from 'react';

import { MovieType } from '../../types/app';
import { MoviesList } from '../MoviesList';
import './App.scss';

type AppState = {
  movies: MovieType[];
};

interface AppProps {}

export default class App extends Component<AppProps | AppState> {
  state = {
    movies: [
      {
        name: 'The way back',
        id: '1',
        genres: ['Action', 'Drama'],
        realise: new Date('March 5, 2020'),
        poster: 'poster',
        description:
          'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      },
      {
        name: 'The way back',
        id: '2',
        genres: ['Action', 'Drama'],
        realise: new Date('March 5, 2020'),
        poster: 'poster',
        description:
          'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      },
      {
        name: 'The way back',
        id: '3',
        genres: ['Action', 'Drama'],
        realise: new Date('March 5, 2020'),
        poster: 'poster',
        description:
          'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      },
    ],
  };

  render() {
    return (
      <div className="content">
        <MoviesList movies={this.state.movies} />
      </div>
    );
  }
}
