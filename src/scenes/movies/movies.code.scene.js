import { Scenes } from 'telegraf';
import locales from '../../locales/ru.json' assert { type: 'json' };
import { back } from '../../keyboards/common.keyboard.js';
import moviesService from '../../service/movies.service.js';

const { START_SCENE, MOVIES_CODE_SCENE } = process.env;

const scene = new Scenes.BaseScene(MOVIES_CODE_SCENE);

scene.enter((ctx) => {
  ctx.reply(locales.movies.reply.code, back());
});

scene.hears(locales.back, (ctx) => {
  ctx.scene.enter(START_SCENE);
});

scene.hears('/saveme', (ctx) => {
  ctx.scene.enter(START_SCENE);
});

scene.on('text', async (ctx) => {
  try {
    const id = +ctx.message.text;

    if (typeof id !== 'number')
      return ctx.replyWithHTML(`<b>Введите корректный код!</b>`);

    const movie = await moviesService.getMovie(id);

    if (!movie) return ctx.replyWithHTML(`<b>Фильм не найден.</b>`);

    await ctx.replyWithMediaGroup([
      {
        type: 'photo',
        media: movie.photoId,
        caption: `🎬 Название фильма: ${movie.title}\n📺 Жанр: ${movie.genre}\n🕰️ Дата выхода: ${movie.releaseDate}\n🌎 Страна: ${movie.country}\n📽️ Режиссер: ${movie.director}\n📝 Сценарий: ${movie.script}\n⏱️ Продолжительность: ${movie.duration}\n💰 Бюджет: ${movie.budget}\n👨‍👩‍👧‍👦 Возраст: ${movie.age}\n\n📊 Рейтинги:\n📈 КиноПоиск: ${movie.kinopoiskRate} из 10\n📈 IMDb: ${movie.imdbRate} из 10\n\n🗒️ Краткое описание фильма: ${movie.description}`,
      },
      { type: 'video', media: movie.videoId },
    ]);

    ctx.scene.enter(START_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(START_SCENE);
  }
});

export default scene;
