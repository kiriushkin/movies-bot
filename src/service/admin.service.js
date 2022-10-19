import Channel from '../models/Channel.js';
import Movie from '../models/Movie.js';

class AdminService {
  async getChannel(id) {
    return await Channel.findByPk(id, { raw: true });
  }

  async getChannels(page) {
    return await Channel.findAll({
      limit: 10,
      offset: 10 * (page - 1),
      raw: true,
    });
  }

  async addChannel(data) {
    return await Channel.create(data);
  }

  async editChannel(data) {
    await Channel.update(data, { where: { id: data.id } });

    return await this.getChannel(data.id);
  }

  async deleteChannel(id) {
    return await Channel.destroy({ where: { id } });
  }

  async getMovie(id) {
    return await Movie.findByPk(id, { raw: true });
  }

  async getMoviesCount() {
    return await Movie.count();
  }

  async getMovies(page) {
    return await Movie.findAll({
      limit: 10,
      offset: 10 * (page - 1),
      raw: true,
    });
  }

  async addMovie(data) {
    return await Movie.create(data);
  }

  async editMovie(data) {
    await Movie.update(data, { where: { id: data.id } });

    return await this.getMovie(data.id);
  }

  async deleteMovie(id) {
    return await Movie.destroy({ where: { id } });
  }
}

export default new AdminService();
