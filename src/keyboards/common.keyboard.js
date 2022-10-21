import { Markup } from 'telegraf';
import locales from '../locales/ru.js';

const back = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback(locales.back, locales.back),
  ]);
};

const checkSubscription = (channels) => {
  return Markup.inlineKeyboard(
    [
      ...channels.map((channel) =>
        Markup.button.url(channel.name, channel.url)
      ),
      Markup.button.callback(
        locales.subscibtion.button.checkSubscription,
        locales.subscibtion.button.checkSubscription
      ),
    ],
    { columns: 1 }
  );
};

export { back, checkSubscription };
