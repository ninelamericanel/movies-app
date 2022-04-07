export default class MovieService {
  api_key = '856dc569092ab9cdd989b0d8a88b2a64';

  url = 'https://api.themoviedb.org/3';

  getResponse = async (value) => {
    const response = await fetch(`${this.url}/search/movie?api_key=${this.api_key}&query=${value}`);

    console.log(response);
    if (!response.ok) {
      throw new Error(`Something wrong happen! Code of Error: ${response.status}`);
    }

    return response.json();
  };

  getMovies = async (value) => {
    return this.getResponse(value)
      .then((res) => res.results)
      .catch((err) => err);
  };
}
