import { Scenes } from 'telegraf';
import locales from '../locales/ru.js';
import { checkSubscription } from '../keyboards/common.keyboard.js';
import subscribe from '../middlewares/subscribe.middleware.js';

const { START_SCENE, SUBSCRIPTION_SCENE } = process.env;

const scene = new Scenes.BaseScene(SUBSCRIPTION_SCENE);

scene.enter(async (ctx) => {
  try {
    const channels = ctx.session.channels;

    if (!ctx.session.message_id) {
      if (ctx.session.wasHere)
        return (ctx.session.message_id = await ctx.replyWithHTML(
          locales.subscibtion.reply.firstTime,
          checkSubscription(channels)
        ));

      return (ctx.session.message_id = await ctx.replyWithHTML(
        locales.subscibtion.reply.anotherTime,

        checkSubscription(channels)
      ));
    }

    if (ctx.session.wasHere) {
      ctx.telegram.editMessageReplyMarkup(
        ctx.from.id,
        ctx.session.message_id,
        ctx.session.message_id,
        checkSubscription(channels)
      );
      return ctx.telegram.editMessageText(
        ctx.from.id,
        ctx.session.message_id,
        ctx.session.message_id,
        locales.subscibtion.reply.firstTime
      );
    }

    ctx.editMessageReplyMarkup(checkSubscription(channels));
    ctx.editMessageText(locales.subscibtion.reply.anotherTime);
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
