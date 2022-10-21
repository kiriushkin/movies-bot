import { Markup } from 'telegraf';
import locales from '../locales/ru.js';

const main = () => {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback(
        locales.admin.button.addChannel,
        locales.admin.button.addChannel
      ),
      Markup.button.callback(
        locales.admin.button.addMovie,
        locales.admin.button.addMovie
      ),
      Markup.button.callback(
        locales.admin.button.editChannel,
        locales.admin.button.editChannel
      ),
      Markup.button.callback(
        locales.admin.button.editMovie,
        locales.admin.button.editMovie
      ),
      Markup.button.callback(
        locales.admin.button.deleteChannel,
        locales.admin.button.deleteChannel
      ),
      Markup.button.callback(
        locales.admin.button.deleteMovie,
        locales.admin.button.deleteMovie
      ),
      Markup.button.callback(
        locales.admin.button.statistics,
        locales.admin.button.statistics
      ),
      Markup.button.callback(
        locales.admin.button.infoMovies,
        locales.admin.button.infoMovies
      ),
      Markup.button.callback(
        locales.admin.button.sendMessage,
        locales.admin.button.sendMessage
      ),
      Markup.button.callback(locales.back, locales.back),
    ],
    { columns: 2 }
  );
};

const channelsList = (channels) => {
  return Markup.inlineKeyboard(
    [
      ...channels.map((channel) =>
        Markup.button.callback(channel.name, channel.name)
      ),
      Markup.button.callback(locales.back, locales.back),
    ],
    { columns: 2 }
  );
};

const editChannel = () => {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback(
        locales.admin.button.editId,
        locales.admin.button.editId
      ),
      Markup.button.callback(
        locales.admin.button.editName,
        locales.admin.button.editName
      ),
      Markup.button.callback(
        locales.admin.button.editUrl,
        locales.admin.button.editUrl
      ),
      Markup.button.callback(locales.back, locales.back),
    ],
    { columns: 3 }
  );
};

const deleteChannel = () => {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback(
        locales.admin.button.deleteConfirm,
        locales.admin.button.deleteConfirm
      ),
      Markup.button.callback(locales.back, locales.back),
    ],
    { columns: 2 }
  );
};

const movieList = (movies) => {
  return Markup.inlineKeyboard(
    [
      ...movies.map((movie) =>
        Markup.button.callback(movie.title, movie.title)
      ),
      Markup.button.callback(locales.back, locales.back),
    ],
    { columns: 2 }
  );
};

const editMovie = () => {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback(
        locales.admin.button.editTitle,
        locales.admin.button.editTitle
      ),
      Markup.button.callback(
        locales.admin.button.editGenre,
        locales.admin.button.editGenre
      ),
      Markup.button.callback(
        locales.admin.button.editReleaseDate,
        locales.admin.button.editReleaseDate
      ),
      Markup.button.callback(
        locales.admin.button.editCountry,
        locales.admin.button.editCountry
      ),
      Markup.button.callback(
        locales.admin.button.editDirector,
        locales.admin.button.editDirector
      ),
      Markup.button.callback(
        locales.admin.button.editScript,
        locales.admin.button.editScript
      ),
      Markup.button.callback(
        locales.admin.button.editDuration,
        locales.admin.button.editDuration
      ),
      Markup.button.callback(
        locales.admin.button.editBudget,
        locales.admin.button.editBudget
      ),
      Markup.button.callback(
        locales.admin.button.editAge,
        locales.admin.button.editAge
      ),
      Markup.button.callback(
        locales.admin.button.editKinopoiskRate,
        locales.admin.button.editKinopoiskRate
      ),
      Markup.button.callback(
        locales.admin.button.editImdbRate,
        locales.admin.button.editImdbRate
      ),
      Markup.button.callback(
        locales.admin.button.editDescription,
        locales.admin.button.editDescription
      ),
      Markup.button.callback(
        locales.admin.button.editPreview,
        locales.admin.button.editPreview
      ),
      Markup.button.callback(
        locales.admin.button.editTrailer,
        locales.admin.button.editTrailer
      ),
      Markup.button.callback(locales.back, locales.back),
    ],
    { columns: 3 }
  );
};

const deleteMovie = () => {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback(
        locales.admin.button.deleteConfirm,
        locales.admin.button.deleteConfirm
      ),
      Markup.button.callback(locales.back, locales.back),
    ],
    { columns: 2 }
  );
};

const pages = (number) => {
  let i = 1;
  return Markup.inlineKeyboard(
    [
      ...new Array(number).fill(0).map(() => Markup.button.callback(i, i++)),
      Markup.button.callback(locales.back, locales.back),
    ],
    { columns: 5 }
  );
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
