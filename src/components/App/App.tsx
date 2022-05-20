import React, { Component } from 'react';

import { MoviesList } from 'components/MoviesList';
import { Tabs } from 'components/Tabs';
import { SearchInput } from 'components/SearchInput';
import { RatedMovies } from 'components/RatedMovies';
import { NoParamsVoidFunc, OutputGenresFunc, SetTabFunc, SetValueToSearchFunc } from 'types/app';
import MovieService from 'services/movieService';
import { AppContextInterface, GenresContext } from 'genres-context/genres-context';

import './App.scss';

type AppState = {
  search: string;
  tab: string;
  genres: [] | AppContextInterface;
};

interface AppProps {}

export default class App extends Component<AppProps | AppState> {
  service = new MovieService();

  state: AppState = {
    search: '',
    tab: 'search',
    genres: [],
  };

  componentDidMount() {
    this.createGuestSessionId();
    this.syncRateMovies();
    this.getResponseGenres();
  }

  createGuestSessionId: NoParamsVoidFunc = () => {
    this.service.createGuestSession().then((guestSessionId) => {
      const session = localStorage.sessionId ? localStorage.sessionId : guestSessionId;
      localStorage.setItem('sessionId', session);
    });
  };

  syncRateMovies: NoParamsVoidFunc = () => {
    const ratedMovies = localStorage.myRatedMovies ? localStorage.myRatedMovies : JSON.stringify({});
    localStorage.setItem('myRatedMovies', ratedMovies);
  };

  outputGenres: OutputGenresFunc = (array) => {
    this.setState({
      genres: array,
    });
  };

  getResponseGenres: NoParamsVoidFunc = () => {
    this.service
      .getGenres()
      .then((res) => this.outputGenres(res))
      .catch((err) => err);
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
    const { search, tab, genres } = this.state;
    const movieListOutput = search ? <MoviesList search={search} /> : null;
    const viewTab = tab === 'rated' ? <RatedMovies /> : movieListOutput;
    const viewSearchInput =
      tab === 'search' ? <SearchInput search={search} setValueToSearch={this.setValueToSearch} /> : null;
    return (
      <GenresContext.Provider value={genres}>
        <div className="content">
          <Tabs setTab={this.setTab} />
          {viewSearchInput}
          <main className="main">{viewTab}</main>
        </div>
      </GenresContext.Provider>
    );
  }
}
