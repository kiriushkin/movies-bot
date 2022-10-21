import { Scenes } from 'telegraf';
import admin from './middlewares/admin.middleware.js';
import subscribtions from './middlewares/subscribe.middleware.js';
import startScene from './scenes/start.scene.js';
import subscriptionScene from './scenes/subscription.scene.js';
import adminScenes from './scenes/admin/admin.scenes.js';
import moviesScenes from './scenes/movies/movies.scenes.js';

const { START_SCENE } = process.env;

const stage = new Scenes.Stage([
  startScene,
  subscriptionScene,
  ...adminScenes,
  ...moviesScenes,
]);

stage.use(admin);
stage.use(subscribtions);

stage.start((ctx) => {
  ctx.session.new = true;
  ctx.scene.enter(START_SCENE);
});

export default stage;
