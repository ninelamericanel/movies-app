import React, { Component } from 'react';

import { Film } from '../../types/app';
import { MoviesList } from '../MoviesList';

type AppState = {
  films: Film[];
};

interface AppProps {}

export default class App extends Component<AppProps | AppState> {
  state = {
    films: [
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
        id: '1',
        genres: ['Action', 'Drama'],
        realise: new Date('March 5, 2020'),
        poster: 'poster',
        description:
          'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      },
      {
        name: 'The way back',
        id: '1',
        genres: ['Action', 'Drama'],
        realise: new Date('March 5, 2020'),
        poster: 'poster',
        description:
          'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      },
    ],
  };

  render() {
    return <MoviesList />;
  }
}
