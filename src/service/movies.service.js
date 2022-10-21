import Movie from '../models/Movie.js';
import Search from '../models/Search.js';

class MovieService {
  async getMovie(id) {
    Search.create({ movie_id: id });
    return await Movie.findByPk(id);
  }

  async getMoviesIds() {
    return await Movie.findAll({ attributes: ['id'], raw: true });
  }
}

export default new MovieService();
