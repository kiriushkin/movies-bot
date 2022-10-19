import { Scenes } from 'telegraf';
import admin from './middlewares/admin.middleware.js';
import subscribtions from './middlewares/subscribe.middleware.js';
import startScene from './scenes/start.scene.js';
import subscriptionScene from './scenes/subscription.scene.js';
import adminScenes from './scenes/admin/admin.scenes.js';
import moviesScenes from './scenes/movies/movies.scenes.js';

const stage = new Scenes.Stage([
  startScene,
  subscriptionScene,
  ...adminScenes,
  ...moviesScenes,
]);

stage.use(admin);
stage.use(subscribtions);

export default stage;
