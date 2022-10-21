import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { editMovie } from '../../keyboards/admin.keyboard.js';
import { back } from '../../keyboards/common.keyboard.js';
import adminService from '../../service/admin.service.js';

const { ADMIN_EDIT_MOVIES_SCENE, ADMIN_EDIT_MOVIE_SCENE, ADMIN_MAIN_SCENE } =
  process.env;

const scene = new Scenes.BaseScene(ADMIN_EDIT_MOVIE_SCENE);

scene.enter(async (ctx) => {
  try {
    const { movie } = ctx.session;

    await ctx.replyWithMediaGroup([
      {
        type: 'photo',
        media: movie.photoId,
        caption: `ID: ${movie.id}\n🎬 Название фильма: ${movie.title}\n📺 Жанр: ${movie.genre}\n🕰️ Дата выхода: ${movie.releaseDate}\n🌎 Страна: ${movie.country}\n📽️ Режиссер: ${movie.director}\n📝 Сценарий: ${movie.script}\n⏱️ Продолжительность: ${movie.duration}\n💰 Бюджет: ${movie.budget}\n👨‍👩‍👧‍👦 Возраст: ${movie.age}\n\n📊 Рейтинги:\n📈 КиноПоиск: ${movie.kinopoiskRate} из 10\n📈 IMDb: ${movie.imdbRate} из 10\n\n🗒️ Краткое описание фильма: ${movie.description}`,
      },
      { type: 'video', media: movie.videoId },
    ]);

    ctx.reply(locales.admin.reply.movieEdit, editMovie());
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.action(locales.back, (ctx) => {
  if (ctx.session.input) {
    ctx.session.input = null;
    return ctx.scene.enter(ADMIN_EDIT_MOVIE_SCENE);
  }

  ctx.session.movie = null;
  return ctx.scene.enter(ADMIN_EDIT_MOVIES_SCENE);
});

scene.action(locales.admin.button.editTitle, (ctx) => {
  ctx.session.input = 'movieTitle';
  ctx.editMessageText(locales.admin.reply.movieTitle, back());
});

scene.action(locales.admin.button.editGenre, (ctx) => {
  ctx.session.input = 'movieGenre';
  ctx.editMessageText(locales.admin.reply.movieGenre, back());
});

scene.action(locales.admin.button.editReleaseDate, (ctx) => {
  ctx.session.input = 'movieReleaseDate';
  ctx.editMessageText(locales.admin.reply.movieReleaseDate, back());
});

scene.action(locales.admin.button.editCountry, (ctx) => {
  ctx.session.input = 'movieCountry';
  ctx.editMessageText(locales.admin.reply.movieCountry, back());
});

scene.action(locales.admin.button.editDirector, (ctx) => {
  ctx.session.input = 'movieDirector';
  ctx.editMessageText(locales.admin.reply.movieDirector, back());
});

scene.action(locales.admin.button.editScript, (ctx) => {
  ctx.session.input = 'movieScript';
  ctx.editMessageText(locales.admin.reply.movieScript, back());
});

scene.action(locales.admin.button.editDuration, (ctx) => {
  ctx.session.input = 'movieDuration';
  ctx.editMessageText(locales.admin.reply.movieDuration, back());
});

scene.action(locales.admin.button.editBudget, (ctx) => {
  ctx.session.input = 'movieBudget';
  ctx.editMessageText(locales.admin.reply.movieBudget, back());
});

scene.action(locales.admin.button.editAge, (ctx) => {
  ctx.session.input = 'movieAge';
  ctx.editMessageText(locales.admin.reply.movieAge, back());
});

scene.action(locales.admin.button.editKinopoiskRate, (ctx) => {
  ctx.session.input = 'movieKinopoiskRate';
  ctx.editMessageText(locales.admin.reply.movieKinopoiskRate, back());
});

scene.action(locales.admin.button.editImdbRate, (ctx) => {
  ctx.session.input = 'movieImdbRate';
  ctx.editMessageText(locales.admin.reply.movieImdbRate, back());
});

scene.action(locales.admin.button.editDescription, (ctx) => {
  ctx.session.input = 'movieDescription';
  ctx.editMessageText(locales.admin.reply.movieDescription, back());
});

scene.action(locales.admin.button.editPreview, (ctx) => {
  ctx.session.input = 'moviePreview';
  ctx.editMessageText(locales.admin.reply.moviePreview, back());
});

scene.action(locales.admin.button.editTrailer, (ctx) => {
  ctx.session.input = 'movieTrailer';
  ctx.editMessageText(locales.admin.reply.movieTrailer, back());
});

scene.on('text', async (ctx) => {
  try {
    const { movie } = ctx.session;
    switch (ctx.session.input) {
      case 'movieTitle':
        movie.title = ctx.message.text;
        break;
      case 'movieGenre':
        movie.genre = ctx.message.text;
        break;
      case 'movieReleaseDate':
        movie.releaseDate = ctx.message.text;
        break;
      case 'movieCountry':
        movie.country = ctx.message.text;
        break;
      case 'movieDirector':
        movie.director = ctx.message.text;
        break;
      case 'movieScript':
        movie.script = ctx.message.text;
        break;
      case 'movieDuration':
        movie.duration = ctx.message.text;
        break;
      case 'movieBudget':
        movie.budget = ctx.message.text;
        break;
      case 'movieAge':
        movie.age = ctx.message.text;
        break;
      case 'movieKinopoiskRate':
        movie.kinopoiskRate = ctx.message.text;
        break;
      case 'movieImdbRate':
        movie.imdbRate = ctx.message.text;
        break;
      case 'movieDescription':
        movie.description = ctx.message.text;
        break;
    }

    const newMovie = await adminService.editMovie(movie);

    await ctx.replyWithMediaGroup([
      {
        type: 'photo',
        media: newMovie.photoId,
        caption: `ID: ${newMovie.id}\n🎬 Название фильма: ${newMovie.title}\n📺 Жанр: ${newMovie.genre}\n🕰️ Дата выхода: ${newMovie.releaseDate}\n🌎 Страна: ${newMovie.country}\n📽️ Режиссер: ${newMovie.director}\n📝 Сценарий: ${newMovie.script}\n⏱️ Продолжительность: ${newMovie.duration}\n💰 Бюджет: ${newMovie.budget}\n👨‍👩‍👧‍👦 Возраст: ${newMovie.age}\n\n📊 Рейтинги:\n📈 КиноПоиск: ${newMovie.kinopoiskRate} из 10\n📈 IMDb: ${newMovie.imdbRate} из 10\n\n🗒️ Краткое описание фильма: ${newMovie.description}`,
      },
      { type: 'video', media: movie.videoId },
    ]);

    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.on('photo', async (ctx) => {
  try {
    if (ctx.session.input !== 'moviePreview') return;

    const { movie } = ctx.session;
    const { photo: array } = ctx.update.message;

    movie.photoId = array[array.length - 1].file_id;

    const newMovie = await adminService.editMovie(movie);

    await ctx.replyWithMediaGroup([
      {
        type: 'photo',
        media: newMovie.photoId,
        caption: `ID: ${newMovie.id}\n🎬 Название фильма: ${newMovie.title}\n📺 Жанр: ${newMovie.genre}\n🕰️ Дата выхода: ${newMovie.releaseDate}\n🌎 Страна: ${newMovie.country}\n📽️ Режиссер: ${newMovie.director}\n📝 Сценарий: ${newMovie.script}\n⏱️ Продолжительность: ${newMovie.duration}\n💰 Бюджет: ${newMovie.budget}\n👨‍👩‍👧‍👦 Возраст: ${newMovie.age}\n\n📊 Рейтинги:\n📈 КиноПоиск: ${newMovie.kinopoiskRate} из 10\n📈 IMDb: ${newMovie.imdbRate} из 10\n\n🗒️ Краткое описание фильма: ${newMovie.description}`,
      },
      { type: 'video', media: movie.videoId },
    ]);

    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.on('video', async (ctx) => {
  try {
    if (ctx.session.input !== 'movieTrailer') return;

    const { movie } = ctx.session;
    movie.videoId = ctx.update.message.video.file_id;

    const newMovie = await adminService.editMovie(movie);

    await ctx.replyWithMediaGroup([
      {
        type: 'photo',
        media: newMovie.photoId,
        caption: `ID: ${newMovie.id}\n🎬 Название фильма: ${newMovie.title}\n📺 Жанр: ${newMovie.genre}\n🕰️ Дата выхода: ${newMovie.releaseDate}\n🌎 Страна: ${newMovie.country}\n📽️ Режиссер: ${newMovie.director}\n📝 Сценарий: ${newMovie.script}\n⏱️ Продолжительность: ${newMovie.duration}\n💰 Бюджет: ${newMovie.budget}\n👨‍👩‍👧‍👦 Возраст: ${newMovie.age}\n\n📊 Рейтинги:\n📈 КиноПоиск: ${newMovie.kinopoiskRate} из 10\n📈 IMDb: ${newMovie.imdbRate} из 10\n\n🗒️ Краткое описание фильма: ${newMovie.description}`,
      },
      { type: 'video', media: movie.videoId },
    ]);

    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

export default scene;
