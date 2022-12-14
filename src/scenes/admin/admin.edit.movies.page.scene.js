import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { movieList } from '../../keyboards/admin.keyboard.js';
import { back } from '../../keyboards/common.keyboard.js';
import adminService from '../../service/admin.service.js';

const {
  ADMIN_MAIN_SCENE,
  ADMIN_EDIT_MOVIES_SCENE,
  ADMIN_EDIT_MOVIES_PAGE_SCENE,
  ADMIN_EDIT_MOVIE_SCENE,
} = process.env;

const scene = new Scenes.BaseScene(ADMIN_EDIT_MOVIES_PAGE_SCENE);

scene.enter(async (ctx) => {
  try {
    ctx.session.movieList = await adminService.getMovies(ctx.session.page);
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
  ctx.scene.enter(ADMIN_EDIT_MOVIES_SCENE);
});

scene.on('callback_query', (ctx) => {
  const [movie] = ctx.session.movieList.filter(
    (movie) => movie.title === ctx.update.callback_query.data
  );

  if (!movie) return;

  ctx.session.movie = movie;
  ctx.scene.enter(ADMIN_EDIT_MOVIE_SCENE);
});

export default scene;
