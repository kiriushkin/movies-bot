import { Scenes } from 'telegraf';
import locales from '../locales/ru.js';
import { checkSubscription } from '../keyboards/common.keyboard.js';
import subscribeService from '../service/subscribe.service.js';

const { START_SCENE, SUBSCRIPTION_SCENE } = process.env;

const scene = new Scenes.BaseScene(SUBSCRIPTION_SCENE);

scene.enter(async (ctx) => {
  try {
    const channels = ctx.session.channels;

    if (ctx.session.wasHere)
      return ctx.reply(locales.subscibtion.reply.anotherTime, {
        ...checkSubscription(channels),
        parse_mode: 'MarkdownV2',
      });

    ctx.session.wasHere = true;

    ctx.reply(locales.subscibtion.reply.firstTime, {
      ...checkSubscription(channels),
      parse_mode: 'MarkdownV2',
    });
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(START_SCENE);
  }
});

scene.action(locales.subscibtion.button.checkSubscription, async (ctx) => {
  ctx.session.new = false;

  const result = await subscribeService.checkSubscriptions(ctx);

  if (result) return ctx.scene.enter(START_SCENE);

  ctx.answerCbQuery('❌ Вы подписались не на все каналы!');
});

export default scene;
