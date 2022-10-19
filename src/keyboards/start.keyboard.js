import { Markup } from 'telegraf';
import locales from '../locales/ru.json' assert { type: 'json' };

export default (isAdmin) => {
  if (isAdmin)
    return Markup.keyboard([
      Markup.button.text(locales.start.button.admin),
      Markup.button.text(locales.start.button.movies),
    ]).resize();
  return Markup.keyboard([
    Markup.button.text(locales.start.button.movies),
  ]).resize();
};
