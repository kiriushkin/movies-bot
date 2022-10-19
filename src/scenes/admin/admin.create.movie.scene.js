import { Scenes } from 'telegraf';
import { nanoid } from 'nanoid';
import locales from '../../locales/ru.js';
import { back } from '../../keyboards/common.keyboard.js';
import adminService from '../../service/admin.service.js';

const { ADMIN_MAIN_SCENE, ADMIN_CREATE_MOVIE_SCENE } = process.env;

const scene = new Scenes.BaseScene(ADMIN_CREATE_MOVIE_SCENE);

scene.enter((ctx) => {
  ctx.session.input = 'movieTitle';
  ctx.session.movie = {};
  ctx.reply(locales.admin.reply.movieTitle, back());
});

scene.hears(locales.back, (ctx) => {
  ctx.session.input = null;
  ctx.session.movie = null;
  ctx.scene.enter(ADMIN_MAIN_SCENE);
});

scene.on('text', async (ctx) => {
  try {
    switch (ctx.session.input) {
      case 'movieTitle':
        ctx.session.input = 'movieGenre';
        ctx.session.movie.title = ctx.message.text;
        ctx.reply(locales.admin.reply.movieGenre, back());
        break;
      case 'movieGenre':
        ctx.session.input = 'movieReleaseDate';
        ctx.session.movie.genre = ctx.message.text;
        ctx.reply(locales.admin.reply.movieReleaseDate, back());
        break;
      case 'movieReleaseDate':
        ctx.session.input = 'movieCountry';
        ctx.session.movie.releaseDate = ctx.message.text;
        ctx.reply(locales.admin.reply.movieCountry, back());
        break;
      case 'movieCountry':
        ctx.session.input = 'movieDirector';
        ctx.session.movie.country = ctx.message.text;
        ctx.reply(locales.admin.reply.movieDirector, back());
        break;
      case 'movieDirector':
        ctx.session.input = 'movieScript';
        ctx.session.movie.director = ctx.message.text;
        ctx.reply(locales.admin.reply.movieScript, back());
        break;
      case 'movieScript':
        ctx.session.input = 'movieDuration';
        ctx.session.movie.script = ctx.message.text;
        ctx.reply(locales.admin.reply.movieDuration, back());
        break;
      case 'movieDuration':
        ctx.session.input = 'movieBudget';
        ctx.session.movie.duration = ctx.message.text;
        ctx.reply(locales.admin.reply.movieBudget, back());
        break;
      case 'movieBudget':
        ctx.session.input = 'movieAge';
        ctx.session.movie.budget = ctx.message.text;
        ctx.reply(locales.admin.reply.movieAge, back());
        break;
      case 'movieAge':
        ctx.session.input = 'movieKinopoiskRate';
        ctx.session.movie.age = ctx.message.text;
        ctx.reply(locales.admin.reply.movieKinopoiskRate, back());
        break;
      case 'movieKinopoiskRate':
        ctx.session.input = 'movieImdbRate';
        ctx.session.movie.kinopoiskRate = ctx.message.text;
        ctx.reply(locales.admin.reply.movieImdbRate, back());
        break;
      case 'movieImdbRate':
        ctx.session.input = 'movieDescription';
        ctx.session.movie.imdbRate = ctx.message.text;
        ctx.reply(locales.admin.reply.movieDescription, back());
        break;
      case 'movieDescription':
        ctx.session.input = 'moviePreview';
        ctx.session.movie.description = ctx.message.text;
        ctx.reply(locales.admin.reply.moviePreview, back());
        break;
    }
  } catch (err) {
    console.error(err);
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.on('photo', (ctx) => {
  if (ctx.session.input !== 'moviePreview') return;

  const { photo: array } = ctx.update.message;

  ctx.session.input = 'movieTrailer';
  ctx.session.movie.photoId = array[array.length - 1].file_id;
  ctx.reply(locales.admin.reply.movieTrailer, back());
});

scene.on('video', async (ctx) => {
  try {
    if (ctx.session.input !== 'movieTrailer') return;

    ctx.session.movie.videoId = ctx.update.message.video.file_id;

    const { movie } = ctx.session;

    await adminService.addMovie(movie);

    await ctx.reply(locales.admin.reply.movieCreated);

    await ctx.replyWithMediaGroup([
      {
        type: 'photo',
        media: movie.photoId,
        caption: `🎬 Название фильма: ${movie.title}\n📺 Жанр: ${movie.genre}\n🕰️ Дата выхода: ${movie.releaseDate}\n🌎 Страна: ${movie.country}\n📽️ Режиссер: ${movie.director}\n📝 Сценарий: ${movie.script}\n⏱️ Продолжительность: ${movie.duration}\n💰 Бюджет: ${movie.budget}\n👨‍👩‍👧‍👦 Возраст: ${movie.age}\n\n📊 Рейтинги:\n📈 КиноПоиск: ${movie.kinopoiskRate} из 10\n📈 IMDb: ${movie.imdbRate} из 10\n\n🗒️ Краткое описание фильма: ${movie.description}`,
        parse_mode: 'HTML',
      },
      { type: 'video', media: movie.videoId },
    ]);

    ctx.session.input = null;
    ctx.session.movie = null;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

export default scene;
