import { Driver } from 'lib/framework/Driver';

export default class OMDBDriver extends Driver {

  constructor() {
    super();
    this.URL = 'https://api.themoviedb.org/3/movie/';
    this.API_KEY = '?api_key=9b5e3663e1666d475ee124a09ab22662';
  }

  async read(payload) {
    try {
      const response = await fetch(this.URL + payload.id + this.API_KEY);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    } catch(err) {
      throw new Error(err);
    }
  }

  async all(payload) {
    try {
      const response = await fetch(this.URL + 'popular' + this.API_KEY);
      const jsonResponse = await response.json();
      return jsonResponse.results;
    } catch(err) {
      throw new Error(err);
    }
  }
}
