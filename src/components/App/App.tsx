import React, { Component } from 'react';

import { MoviesList } from 'components/MoviesList';
import { Tabs } from 'components/Tabs';
import { SearchInput } from 'components/SearchInput';
import { RatedMovies } from 'components/RatedMovies';
import { SetTabFunc, SetValueToSearchFunc } from 'types/app';

import './App.scss';

type AppState = {
  search: string;
  tab: string;
};

interface AppProps {}

export default class App extends Component<AppProps | AppState> {
  state: AppState = {
    search: '',
    tab: 'search',
  };

  setValueToSearch: SetValueToSearchFunc = (value) => {
    this.setState({
      search: value,
    });
  };

  setTab: SetTabFunc = (tab) => {
    this.setState({
      tab: tab,
    });
  };

  render() {
    const { search, tab } = this.state;
    const movieListOutput = search ? <MoviesList search={search} /> : null;
    const viewTab = tab === 'rated' ? <RatedMovies /> : movieListOutput;
    return (
      <div className="content">
        <Tabs setTab={this.setTab} />
        <SearchInput setValueToSearch={this.setValueToSearch} />
        <main className="view">{viewTab}</main>
      </div>
    );
  }
}
