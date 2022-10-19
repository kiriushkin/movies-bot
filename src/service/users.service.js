import { Op } from 'sequelize';
import moment from 'moment';
import User from '../models/User.js';

class UserService {
  async getUser(id) {
    return await User.findByPk(id);
  }

  async getUsers() {
    return await User.findAll({ raw: true });
  }

  async getUsersCount(type = 'default') {
    if (type === 'default') return await User.count();

    if (type === 'daily')
      return await User.count({
        where: {
          createdAt: { [Op.gte]: moment().subtract(1, 'day').toDate() },
        },
      });

    if (type === 'weekly')
      return await User.count({
        where: {
          createdAt: { [Op.gte]: moment().subtract(7, 'days').toDate() },
        },
      });

    if (type === 'monthly')
      return await User.count({
        where: {
          createdAt: { [Op.gte]: moment().subtract(1, 'month').toDate() },
        },
      });
  }

  async addUser(data) {
    return await User.create(data);
  }
}

export default new UserService();
