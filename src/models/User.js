import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

try {
  await User.sync({ alter: true });
  console.log('Users table synced.');
} catch (err) {
  console.error(err);
}

export default User;
