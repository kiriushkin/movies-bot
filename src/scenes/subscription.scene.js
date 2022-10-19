import { Scenes } from 'telegraf';
import locales from '../locales/ru.json' assert { type: 'json' };
import { checkSubscription } from '../keyboards/common.keyboard.js';
import subscribe from '../middlewares/subscribe.middleware.js';

const { START_SCENE, SUBSCRIPTION_SCENE } = process.env;

const scene = new Scenes.BaseScene(SUBSCRIPTION_SCENE);

scene.enter(async (ctx) => {
  try {
    const links = ctx.session.channels.map((channel) => {
      return `<a href='${channel.url}'>${channel.name}</a>`;
    });

    if (ctx.session.wasHere)
      return ctx.replyWithHTML(
        `${locales.subscibtion.reply.firstTime}\n${links.join('\n')}`,
        { disable_web_page_preview: true, ...checkSubscription() }
      );

    ctx.replyWithHTML(
      `${locales.subscibtion.reply.anotherTime}\n${links.join('\n')}`,
      { disable_web_page_preview: true, ...checkSubscription() }
    );
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(START_SCENE);
  }
});

scene.hears(locales.subscibtion.button.checkSubscription, (ctx) => {
  subscribe(ctx, () => ctx.scene.enter(START_SCENE));
});

export default scene;
