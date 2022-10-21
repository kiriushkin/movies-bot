import { Scenes } from 'telegraf';
import locales from '../locales/ru.js';
import { checkSubscription } from '../keyboards/common.keyboard.js';
import subscribe from '../middlewares/subscribe.middleware.js';

const { START_SCENE, SUBSCRIPTION_SCENE } = process.env;

const scene = new Scenes.BaseScene(SUBSCRIPTION_SCENE);

scene.enter(async (ctx) => {
  try {
    const channels = ctx.session.channels;

    if (ctx.session.wasHere)
      return ctx.reply(
        locales.subscibtion.reply.anotherTime,
        checkSubscription(channels)
      );

    ctx.session.wasHere = true;

    ctx.reply(locales.subscibtion.reply.firstTime, checkSubscription(channels));
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(START_SCENE);
  }
});

scene.action(locales.subscibtion.button.checkSubscription, (ctx) => {
  ctx.session.new = false;
  subscribe(ctx, () => ctx.scene.enter(START_SCENE));
});

export default scene;
