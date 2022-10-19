import { Scenes } from 'telegraf';
import locales from '../../locales/ru.json' assert { type: 'json' };
import { main } from '../../keyboards/admin.keyboard.js';

const {
  ADMIN_MAIN_SCENE,
  ADMIN_CREATE_CHANNEL_SCENE,
  ADMIN_EDIT_CHANNELS_SCENE,
  ADMIN_DELETE_CHANNEL_SCENE,
  ADMIN_CREATE_MOVIE_SCENE,
  ADMIN_EDIT_MOVIES_SCENE,
  ADMIN_DELETE_MOVIE_SCENE,
  ADMIN_INFO_MOVIES_SCENE,
  ADMIN_STATISTICS_SCENE,
  ADMIN_SEND_SCENE,
  START_SCENE,
} = process.env;

const scene = new Scenes.BaseScene(ADMIN_MAIN_SCENE);

scene.enter((ctx) => {
  ctx.reply(locales.admin.reply.enter, main());
});

scene.hears(locales.back, (ctx) => ctx.scene.enter(START_SCENE));

scene.hears(locales.admin.button.addChannel, (ctx) => {
  ctx.scene.enter(ADMIN_CREATE_CHANNEL_SCENE);
});

scene.hears(locales.admin.button.editChannel, (ctx) => {
  ctx.scene.enter(ADMIN_EDIT_CHANNELS_SCENE);
});

scene.hears(locales.admin.button.deleteChannel, (ctx) => {
  ctx.scene.enter(ADMIN_DELETE_CHANNEL_SCENE);
});

scene.hears(locales.admin.button.addMovie, (ctx) => {
  ctx.scene.enter(ADMIN_CREATE_MOVIE_SCENE);
});

scene.hears(locales.admin.button.editMovie, (ctx) => {
  ctx.scene.enter(ADMIN_EDIT_MOVIES_SCENE);
});

scene.hears(locales.admin.button.deleteMovie, (ctx) => {
  ctx.scene.enter(ADMIN_DELETE_MOVIE_SCENE);
});

scene.hears(locales.admin.button.statistics, (ctx) =>
  ctx.scene.enter(ADMIN_STATISTICS_SCENE)
);

scene.hears(locales.admin.button.infoMovies, (ctx) =>
  ctx.scene.enter(ADMIN_INFO_MOVIES_SCENE)
);

scene.hears(locales.admin.button.sendMessage, (ctx) =>
  ctx.scene.enter(ADMIN_SEND_SCENE)
);

scene.hears('/saveme', (ctx) => {
  ctx.scene.enter(START_SCENE);
});

export default scene;
