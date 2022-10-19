import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Search = sequelize.define('search', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

try {
  await Search.sync({ alter: true });
  console.log('Searchs table synced.');
} catch (err) {
  console.error(err);
}

export default Search;
