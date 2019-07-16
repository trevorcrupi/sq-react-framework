import Model from 'lib/framework/Model';

export default class Movie extends Model {
  constructor(movie) {
    super({
      model: 'Movie',
      driver: 'omdb',
      schema: {
        id: ['number', movie.id],
        title: ['string', movie.title],
        imdb_id: ['string', movie.imdb_id],
        popularity: ['number', movie.popularity],
        poster_path: ['string', movie.poster_path],
        overview: ['string', movie.overview],
        backdrop_path: ['string', movie.backdrop_path],
        runtime: ['number', movie.runtime],
      }
    });
  }

  get(value) {
    return this[value] ? this[value] : '...';
  }
}
