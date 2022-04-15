import React, { Component } from 'react';

import { MoviesList } from 'components/MoviesList';
import { Tabs } from 'components/Tabs';
import { SearchInput } from 'components/SearchInput';
import { SetValueToSearchFunc } from 'types/app';

import './App.scss';

type AppState = {
  search: string;
};

interface AppProps {}

export default class App extends Component<AppProps | AppState> {
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
        <Tabs />
        <SearchInput setValueToSearch={this.setValueToSearch} />
        <main className="view">{movieListOutput}</main>
      </div>
    );
  }
}
