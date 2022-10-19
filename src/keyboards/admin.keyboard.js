import { Markup } from 'telegraf';
import locales from '../locales/ru.js';

const main = () => {
  return Markup.keyboard(
    [
      Markup.button.text(locales.admin.button.addChannel),
      Markup.button.text(locales.admin.button.addMovie),
      Markup.button.text(locales.admin.button.editChannel),
      Markup.button.text(locales.admin.button.editMovie),
      Markup.button.text(locales.admin.button.deleteChannel),
      Markup.button.text(locales.admin.button.deleteMovie),
      Markup.button.text(locales.admin.button.statistics),
      Markup.button.text(locales.admin.button.infoMovies),
      Markup.button.text(locales.admin.button.sendMessage),
      Markup.button.text(locales.back),
    ],
    { columns: 2 }
  ).resize();
};

const channelsList = (channels) => {
  return Markup.keyboard(
    [
      ...channels.map((channel) => Markup.button.text(channel.name)),
      Markup.button.text(locales.back),
    ],
    { columns: 2 }
  ).resize();
};

const editChannel = () => {
  return Markup.keyboard(
    [
      Markup.button.text(locales.admin.button.editId),
      Markup.button.text(locales.admin.button.editName),
      Markup.button.text(locales.admin.button.editUrl),
      Markup.button.text(locales.back),
    ],
    { columns: 3 }
  ).resize();
};

const deleteChannel = () => {
  return Markup.keyboard(
    [
      Markup.button.text(locales.admin.button.deleteConfirm),
      Markup.button.text(locales.back),
    ],
    { columns: 2 }
  ).resize();
};

const movieList = (movies) => {
  return Markup.keyboard(
    [
      ...movies.map((movie) => Markup.button.text(movie.title)),
      Markup.button.text(locales.back),
    ],
    { columns: 2 }
  ).resize();
};

const editMovie = () => {
  return Markup.keyboard(
    [
      Markup.button.text(locales.admin.button.editTitle),
      Markup.button.text(locales.admin.button.editGenre),
      Markup.button.text(locales.admin.button.editReleaseDate),
      Markup.button.text(locales.admin.button.editCountry),
      Markup.button.text(locales.admin.button.editDirector),
      Markup.button.text(locales.admin.button.editScript),
      Markup.button.text(locales.admin.button.editDuration),
      Markup.button.text(locales.admin.button.editBudget),
      Markup.button.text(locales.admin.button.editAge),
      Markup.button.text(locales.admin.button.editKinopoiskRate),
      Markup.button.text(locales.admin.button.editImdbRate),
      Markup.button.text(locales.admin.button.editDescription),
      Markup.button.text(locales.admin.button.editPreview),
      Markup.button.text(locales.admin.button.editTrailer),
      Markup.button.text(locales.back),
    ],
    { columns: 2 }
  ).resize();
};

const deleteMovie = () => {
  return Markup.keyboard(
    [
      Markup.button.text(locales.admin.button.deleteConfirm),
      Markup.button.text(locales.back),
    ],
    { columns: 2 }
  ).resize();
};

const pages = (number) => {
  let i = 1;
  return Markup.keyboard(
    [
      ...new Array(number).fill(0).map(() => Markup.button.text(i++)),
      Markup.button.text(locales.back),
    ],
    { columns: 5 }
  ).resize();
};

export {
  main,
  channelsList,
  editChannel,
  deleteChannel,
  movieList,
  editMovie,
  deleteMovie,
  pages,
};
