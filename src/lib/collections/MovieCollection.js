import { Collection } from 'lib/framework/Collection';

export default class MovieCollection extends Collection {
  constructor(movieCollection) {
    super({
      collection: 'MovieCollection',
      model: 'Movie',
      driver: 'omdb',
      movies: movieCollection
    });
  }
}
