import { Markup } from 'telegraf';
import locales from '../locales/ru.js';

const back = () => {
  return Markup.keyboard([Markup.button.text(locales.back)]).resize();
};

const checkSubscription = () => {
  return Markup.keyboard([
    Markup.button.text(locales.subscibtion.button.checkSubscription),
  ]).resize();
};

export { back, checkSubscription };
