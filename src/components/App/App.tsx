import React, { Component } from 'react';

import { MoviesList } from 'components/MoviesList';
import { Tabs } from 'components/Tabs';
import { SearchInput } from 'components/SearchInput';
import { RatedMovies } from 'components/RatedMovies';
import { MovieType, SetRateMoviesFunc, SetTabFunc, SetValueToSearchFunc } from 'types/app';

import './App.scss';

type AppState = {
  search: string;
  tab: string;
  ratedMovies: MovieType[];
};

interface AppProps {}

export default class App extends Component<AppProps | AppState> {
  state: AppState = {
    search: '',
    tab: 'search',
    ratedMovies: [],
  };

  componentDidMount() {
    const movies = JSON.parse(localStorage.myRatedMovies || '[]');
    localStorage.setItem('myRatedMovies', JSON.stringify(movies));
  }

  componentDidUpdate() {
    const { ratedMovies } = this.state;
    localStorage.setItem('myRatedMovies', JSON.stringify(ratedMovies));
  }

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

  setRateMovies: SetRateMoviesFunc = (array) => {
    this.setState({
      ratedMovies: array,
    });
  };

  render() {
    const { search, tab, ratedMovies } = this.state;
    console.log(ratedMovies);
    const movieListOutput = search ? <MoviesList search={search} setRateMovies={this.setRateMovies} /> : null;
    const viewTab = tab === 'rated' ? <RatedMovies ratedMovies={ratedMovies} /> : movieListOutput;
    const viewSearchInput = tab === 'search' ? <SearchInput setValueToSearch={this.setValueToSearch} /> : null;
    return (
      <div className="content">
        <Tabs setTab={this.setTab} />
        {viewSearchInput}
        <main className="view">{viewTab}</main>
      </div>
    );
  }
}
