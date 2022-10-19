import { Op } from 'sequelize';
import moment from 'moment';
import Search from '../models/Search.js';

class SearchesService {
  async getSearchesCount(type = 'default') {
    if (type === 'default') return await Search.count();

    if (type === 'daily')
      return await Search.count({
        where: {
          createdAt: { [Op.gte]: moment().subtract(1, 'day').toDate() },
        },
      });

    if (type === 'weekly')
      return await Search.count({
        where: {
          createdAt: { [Op.gte]: moment().subtract(7, 'days').toDate() },
        },
      });

    if (type === 'monthly')
      return await Search.count({
        where: {
          createdAt: { [Op.gte]: moment().subtract(1, 'month').toDate() },
        },
      });
  }
}

export default new SearchesService();
