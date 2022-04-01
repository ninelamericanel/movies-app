export default class MovieService {
  api_key = '856dc569092ab9cdd989b0d8a88b2a64';

  getResponse = async (value) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&query=${value}`);
    if (!response.ok) {
      throw new Error('Something wrong');
    }
    return response.json();
  };
}
