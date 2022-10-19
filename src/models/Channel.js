import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Channel = sequelize.define(
  'channel',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    channelId: { type: DataTypes.BIGINT, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

try {
  await Channel.sync({ alter: true });
  console.log('Channels table synced.');
} catch (err) {
  console.error(err);
}

export default Channel;
