import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { back } from '../../keyboards/common.keyboard.js';
import moviesService from '../../service/movies.service.js';

const { START_SCENE, MOVIES_CODE_SCENE } = process.env;

const scene = new Scenes.BaseScene(MOVIES_CODE_SCENE);

scene.enter((ctx) => {
  ctx.editMessageText(locales.movies.reply.code, {
    ...back(),
    parse_mode: 'MarkdownV2',
  });
});

scene.action(locales.back, (ctx) => {
  ctx.scene.enter(START_SCENE);
});

scene.on('text', async (ctx) => {
  try {
    const id = +ctx.message.text;

    if (isNaN(id))
      return ctx.replyWithMarkdownV2(locales.movies.reply.incorrect, back());

    const movie = await moviesService.getMovie(id);

    if (!movie)
      return await ctx.replyWithMarkdownV2(
        locales.movies.reply.notFound,
        back()
      );

    await ctx.replyWithMediaGroup([
      {
        type: 'photo',
        media: movie.photoId,
        caption: `🎬 Название фильма: ${movie.title}\n📺 Жанр: ${movie.genre}\n🕰️ Дата выхода: ${movie.releaseDate}\n🌎 Страна: ${movie.country}\n📽️ Режиссер: ${movie.director}\n📝 Сценарий: ${movie.script}\n⏱️ Продолжительность: ${movie.duration}\n💰 Бюджет: ${movie.budget}\n👨‍👩‍👧‍👦 Возраст: ${movie.age}\n\n📊 Рейтинги:\n📈 КиноПоиск: ${movie.kinopoiskRate} из 10\n📈 IMDb: ${movie.imdbRate} из 10\n\n🗒️ Краткое описание фильма: ${movie.description}`,
      },
      { type: 'video', media: movie.videoId },
    ]);

    ctx.session.new = true;
    ctx.scene.enter(START_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(START_SCENE);
  }
});

export default scene;
