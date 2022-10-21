import { Markup } from 'telegraf';
import locales from '../locales/ru.js';

export default (isAdmin) => {
  if (isAdmin)
    return Markup.inlineKeyboard(
      [
        Markup.button.callback(
          locales.start.button.admin,
          locales.start.button.admin
        ),
        Markup.button.callback(
          locales.start.button.movies,
          locales.start.button.movies
        ),
        Markup.button.url(
          locales.start.button.support,
          'https://t.me/rucinemaclips_sup'
        ),
      ],
      { columns: 2 }
    );
  return Markup.inlineKeyboard(
    [
      Markup.button.callback(
        locales.start.button.movies,
        locales.start.button.movies
      ),
      Markup.button.url(
        locales.start.button.support,
        'https://t.me/rucinemaclips_sup'
      ),
    ],
    { columns: 1 }
  );
};
