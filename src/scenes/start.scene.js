import { Scenes } from 'telegraf';
import locales from '../locales/ru.json' assert { type: 'json' };
import getKeyboard from '../keyboards/start.keyboard.js';
import usersService from '../service/users.service.js';

const { START_SCENE, ADMIN_MAIN_SCENE, MOVIES_CODE_SCENE } = process.env;

const scene = new Scenes.BaseScene(START_SCENE);

scene.enter(async (ctx) => {
  try {
    if (ctx.session.wasHere)
      return ctx.reply(
        locales.start.reply.anotherTime,
        getKeyboard(ctx.session.isAdmin)
      );

    const user = await usersService.getUser(ctx.from.id);

    if (!user)
      await usersService.addUser({
        id: ctx.from.id,
        username: ctx.from.username,
      });

    ctx.session.wasHere = true;
    ctx.reply(locales.start.reply.firstTime, getKeyboard(ctx.session.isAdmin));
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(START_SCENE);
  }
});

scene.hears(locales.start.button.admin, (ctx) => {
  ctx.scene.enter(ADMIN_MAIN_SCENE);
});

scene.hears(locales.start.button.movies, (ctx) =>
  ctx.scene.enter(MOVIES_CODE_SCENE)
);

export default scene;
