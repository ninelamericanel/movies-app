export default class MovieService {
  api_key = '6d5b169772ed153e688038b162dd0462';

  url = 'https://api.themoviedb.org/3';

  getResponseMovies = async (value, page) => {
    const response = await fetch(`${this.url}/search/movie?api_key=${this.api_key}&query=${value}&page=${page}`);
    if (!response.ok) {
      throw new Error(`Something wrong happen! Code of Error: ${response.status}`);
    }

    return response.json();
  };

  getResponseGenres = async () => {
    const response = await fetch(`${this.url}/genre/movie/list?api_key=${this.api_key}`);
    if (!response.ok) {
      throw new Error(`Something wrong happen! Code of Error: ${response.status}`);
    }

    return response.json();
  };

  getResponseGuestSession = async () => {
    const response = await fetch(`${this.url}/authentication/guest_session/new?api_key=${this.api_key}`);
    if (!response.ok) {
      throw new Error(`Failed to create guest session! Code of Error: ${response.status}`);
    }

    return response.json();
  };

  createGuestSession = async () => {
    return this.getResponseGuestSession()
      .then((res) => {
        if (!res.success) {
          throw new Error(`Failed to create guest session! Code of Error: ${res.status_code}`);
        }
        return res.guest_session_id;
      })
      .catch((err) => err);
  };

  getGenres = async () => {
    return this.getResponseGenres()
      .then((res) => res.genres)
      .catch((err) => err);
  };

  getMovies = async (value, page) => {
    return this.getResponseMovies(value, page)
      .then((res) => [res.results, res.total_results])
      .catch((err) => err);
  };
}
