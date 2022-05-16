import React, { Component } from 'react';

import { MoviesList } from 'components/MoviesList';
import { Tabs } from 'components/Tabs';
import { SearchInput } from 'components/SearchInput';
import { RatedMovies } from 'components/RatedMovies';
import { RatedMovieType, SetRateMoviesFunc, SetTabFunc, SetValueToSearchFunc } from 'types/app';
import MovieService from 'services/movieService';
import { AppContextInterface, GenresContext } from 'genres-context/genres-context';

import './App.scss';

type AppState = {
  search: string;
  tab: string;
  ratedMovies: RatedMovieType[];
  genres: [] | AppContextInterface;
};

interface AppProps {}

type GetGenresFunc = () => void;

export default class App extends Component<AppProps | AppState> {
  service = new MovieService();

  genres = [];

  state: AppState = {
    search: '',
    tab: 'search',
    ratedMovies: [],
    genres: [],
  };

  componentDidMount() {
    this.createGuestSessionId();
    this.syncRateMovies();
    this.getResponseGenres();
  }

  createGuestSessionId = (): void => {
    this.service.createGuestSession().then((guestSessionId) => {
      const session = localStorage.sessionId ? localStorage.sessionId : guestSessionId;
      localStorage.setItem('sessionId', session);
    });
  };

  syncRateMovies = (): void => {
    const ratedMovies = localStorage.myRatedMovies ? localStorage.myRatedMovies : JSON.stringify([]);
    localStorage.setItem('myRatedMovies', ratedMovies);
  };

  outputGenres = (array: []): void => {
    this.setState({
      genres: array,
    });
  };

  getResponseGenres: GetGenresFunc = () => {
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

  setRateMovies: SetRateMoviesFunc = (array) => {
    this.setState({
      ratedMovies: array,
    });
  };

  render() {
    const { search, tab, genres } = this.state;
    const movieListOutput = search ? <MoviesList search={search} setRateMovies={this.setRateMovies} /> : null;
    const viewTab = tab === 'rated' ? <RatedMovies setRateMovies={this.setRateMovies} /> : movieListOutput;
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
