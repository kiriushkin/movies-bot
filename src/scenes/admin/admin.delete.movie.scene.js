import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { movieList, deleteMovie } from '../../keyboards/admin.keyboard.js';
import { back } from '../../keyboards/common.keyboard.js';
import adminService from '../../service/admin.service.js';

const { ADMIN_MAIN_SCENE, ADMIN_DELETE_MOVIE_SCENE } = process.env;

const scene = new Scenes.BaseScene(ADMIN_DELETE_MOVIE_SCENE);

scene.enter(async (ctx) => {
  try {
    ctx.session.movieList = await adminService.getMovies(1);
    ctx.editMessageText(
      locales.admin.reply.movieList,
      movieList(ctx.session.movieList)
    );
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.action(locales.back, (ctx) => {
  if (ctx.session.movie) {
    ctx.session.movie = null;
    return ctx.scene.enter(ADMIN_DELETE_MOVIE_SCENE);
  }
  ctx.scene.enter(ADMIN_MAIN_SCENE);
});

scene.action(locales.admin.button.deleteConfirm, async (ctx) => {
  try {
    if (!ctx.session.movie) return;

    await adminService.deleteMovie(ctx.session.movie.id);
    await ctx.editMessageText(locales.admin.reply.movieDeleted);

    ctx.session.movie = null;
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.on('callback_query', (ctx) => {
  const [movie] = ctx.session.movieList.filter(
    (movie) => movie.title === ctx.update.callback_query.data
  );

  if (!movie) return;

  ctx.session.movie = movie;
  ctx.editMessageText(
    `<b>${locales.admin.reply.movieDelete}</b>\nID: <code>${movie.id}</code>\nНазвание: <code>${movie.title}</code>\n`,
    { ...deleteMovie(), parse_mode: 'HTML' }
  );
});

export default scene;
