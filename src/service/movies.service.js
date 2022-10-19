import Movie from '../models/Movie.js';
import Search from '../models/Search.js';

class MovieService {
  async getMovie(id) {
    Search.create({ movie_id: id });
    return await Movie.findByPk(id);
  }
}

export default new MovieService();
