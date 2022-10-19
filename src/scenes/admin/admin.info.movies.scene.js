import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { pages } from '../../keyboards/admin.keyboard.js';
import adminService from '../../service/admin.service.js';

const { ADMIN_MAIN_SCENE, ADMIN_INFO_MOVIES_SCENE } = process.env;

const scene = new Scenes.BaseScene(ADMIN_INFO_MOVIES_SCENE);

scene.enter(async (ctx) => {
  try {
    const count = await adminService.getMoviesCount();
    ctx.session.pages = count >= 10 ? count - (count % 10) / 10 : 1;
    ctx.reply(locales.admin.reply.pageSelect, pages(ctx.session.pages));
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.hears(locales.back, (ctx) => {
  ctx.scene.enter(ADMIN_MAIN_SCENE);
});

scene.on('text', async (ctx) => {
  try {
    const page = +ctx.message.text;
    if (typeof page !== 'number' || page > ctx.session.pages || page <= 0)
      return;

    const movies = await adminService.getMovies(page);

    ctx.replyWithHTML(
      movies
        .map((movie) => `<code>${movie.id}</code> - <b>${movie.title}</b>`)
        .join('\n')
    );
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

export default scene;
