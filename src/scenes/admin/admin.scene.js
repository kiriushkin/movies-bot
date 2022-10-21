import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
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
  if (!ctx.session.message_id)
    return ctx.editMessageText(locales.admin.reply.enter, {
      ...main(),
      parse_mode: 'MarkdownV2',
    });

  ctx.telegram.editMessageText(
    ctx.from.id,
    ctx.session.message_id,
    undefined,
    locales.admin.reply.enter,
    { ...main(), parse_mode: 'MarkdownV2' }
  );

  ctx.session.message_id = null;
});

scene.action(locales.back, (ctx) => ctx.scene.enter(START_SCENE));

scene.action(locales.admin.button.addChannel, (ctx) => {
  ctx.scene.enter(ADMIN_CREATE_CHANNEL_SCENE);
});

scene.action(locales.admin.button.editChannel, (ctx) => {
  ctx.scene.enter(ADMIN_EDIT_CHANNELS_SCENE);
});

scene.action(locales.admin.button.deleteChannel, (ctx) => {
  ctx.scene.enter(ADMIN_DELETE_CHANNEL_SCENE);
});

scene.action(locales.admin.button.addMovie, (ctx) => {
  ctx.scene.enter(ADMIN_CREATE_MOVIE_SCENE);
});

scene.action(locales.admin.button.editMovie, (ctx) => {
  ctx.scene.enter(ADMIN_EDIT_MOVIES_SCENE);
});

scene.action(locales.admin.button.deleteMovie, (ctx) => {
  ctx.scene.enter(ADMIN_DELETE_MOVIE_SCENE);
});

scene.action(locales.admin.button.statistics, (ctx) =>
  ctx.scene.enter(ADMIN_STATISTICS_SCENE)
);

scene.action(locales.admin.button.infoMovies, (ctx) =>
  ctx.scene.enter(ADMIN_INFO_MOVIES_SCENE)
);

scene.action(locales.admin.button.sendMessage, (ctx) =>
  ctx.scene.enter(ADMIN_SEND_SCENE)
);

export default scene;
