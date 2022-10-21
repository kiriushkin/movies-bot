import { Scenes } from 'telegraf';
import locales from '../locales/ru.js';
import getKeyboard from '../keyboards/start.keyboard.js';
import { back } from '../keyboards/common.keyboard.js';
import usersService from '../service/users.service.js';
import moviesService from '../service/movies.service.js';

const { START_SCENE, ADMIN_MAIN_SCENE, MOVIES_CODE_SCENE } = process.env;

const scene = new Scenes.BaseScene(START_SCENE);

scene.enter(async (ctx) => {
  try {
    if (ctx.session.message_id)
      return ctx.telegram.editMessageText(
        ctx.from.id,
        ctx.session.message_id,
        undefined,
        locales.start.reply.anotherTime,
        { ...getKeyboard(ctx.session.isAdmin), parse_mode: 'MarkdownV2' }
      );

    if (ctx.session.new) {
      ctx.session.new = false;
      if (ctx.session.wasHere)
        return ctx.reply(locales.start.reply.anotherTime, {
          ...getKeyboard(ctx.session.isAdmin),
          parse_mode: 'MarkdownV2',
        });

      const user = await usersService.getUser(ctx.from.id);

      if (!user)
        await usersService.addUser({
          id: ctx.from.id,
          username: ctx.from.username,
        });

      ctx.session.wasHere = true;
      ctx.reply(locales.start.reply.firstTime, {
        ...getKeyboard(ctx.session.isAdmin),
        parse_mode: 'MarkdownV2',
      });
    } else {
      if (ctx.session.wasHere)
        return ctx.editMessageText(locales.start.reply.anotherTime, {
          ...getKeyboard(ctx.session.isAdmin),
          parse_mode: 'MarkdownV2',
        });

      const user = await usersService.getUser(ctx.from.id);

      if (!user)
        await usersService.addUser({
          id: ctx.from.id,
          username: ctx.from.username,
        });

      ctx.session.wasHere = true;
      ctx.editMessageText(locales.start.reply.firstTime, {
        ...getKeyboard(ctx.session.isAdmin),
        parse_mode: 'MarkdownV2',
      });
    }
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(START_SCENE);
  }
});

scene.action(locales.start.button.admin, (ctx) => {
  ctx.scene.enter(ADMIN_MAIN_SCENE);
});

scene.action(locales.start.button.movies, (ctx) =>
  ctx.scene.enter(MOVIES_CODE_SCENE)
);

scene.action(locales.start.button.random, async (ctx) => {
  const ids = await moviesService.getMoviesIds();

  const index = Math.floor(Math.random() * ids.length);

  const movie = await moviesService.getMovie(ids[index].id);

  await ctx.replyWithMediaGroup([
    {
      type: 'photo',
      media: movie.photoId,
      caption: `🎬 Название фильма: ${movie.title}\n📺 Жанр: ${movie.genre}\n🕰️ Дата выхода: ${movie.releaseDate}\n🌎 Страна: ${movie.country}\n📽️ Режиссер: ${movie.director}\n📝 Сценарий: ${movie.script}\n⏱️ Продолжительность: ${movie.duration}\n💰 Бюджет: ${movie.budget}\n👨‍👩‍👧‍👦 Возраст: ${movie.age}\n\n📊 Рейтинги:\n📈 КиноПоиск: ${movie.kinopoiskRate} из 10\n📈 IMDb: ${movie.imdbRate} из 10\n\n🗒️ Краткое описание фильма: ${movie.description}`,
    },
    { type: 'video', media: movie.videoId },
  ]);

  ctx.session.message_id = (await ctx.reply('text', back())).message_id;
  ctx.scene.enter(START_SCENE);
});

export default scene;
