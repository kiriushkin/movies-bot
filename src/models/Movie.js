import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Movie = sequelize.define(
  'movie',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.STRING(10), allowNull: false },
    country: { type: DataTypes.STRING(50), allowNull: false },
    director: { type: DataTypes.STRING(50), allowNull: false },
    script: { type: DataTypes.STRING(50), allowNull: false },
    duration: { type: DataTypes.STRING(50), allowNull: false },
    budget: { type: DataTypes.STRING(50), allowNull: false },
    age: { type: DataTypes.STRING(50), allowNull: false },
    kinopoiskRate: { type: DataTypes.FLOAT, allowNull: false },
    imdbRate: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    photoId: { type: DataTypes.STRING, allowNull: false },
    videoId: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

try {
  await Movie.sync({ alter: true });
  console.log('Movies table synced.');
} catch (err) {
  console.error(err);
}

export default Movie;
