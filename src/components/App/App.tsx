import React, { Component } from 'react';

import { MoviesList } from '../MoviesList';
import './App.scss';
import movieService from '../../services/movieService';
import { SearchInput } from '../SearchInput';

type AppState = {
  search: string;
};

interface AppProps {}

export type SetValueToSearchFunc = (value: HTMLButtonElement) => void;

export default class App extends Component<AppProps | AppState> {
  service = new movieService();

  state: AppState = {
    search: '',
  };

  setValueToSearch: SetValueToSearchFunc = (value) => {
    this.setState({
      search: value,
    });
  };

  render() {
    const { search } = this.state;
    const movieListOutput = search ? <MoviesList search={search} /> : null;
    return (
      <div className="content">
        <SearchInput setValueToSearch={this.setValueToSearch} />
        <main>{movieListOutput}</main>
      </div>
    );
  }
}
