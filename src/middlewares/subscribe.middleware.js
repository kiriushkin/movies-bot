import { Telegram } from 'telegraf';
import Channel from '../models/Channel.js';

const { BOT_TOKEN, SUBSCRIPTION_SCENE } = process.env;

export default async (ctx, next) => {
  try {
    if (!ctx.session) ctx.session = {};
    if (ctx.session.isAdmin) return next();

    const channels = await Channel.findAll({ raw: true });
    ctx.session.channels = channels;

    const promises = [];

    channels.forEach((channel) => {
      promises.push(
        new Telegram(BOT_TOKEN).getChatMember(channel.channelId, ctx.chat.id)
      );
    });

    const results = await Promise.all(promises);

    for (let result of results)
      if (result.status === 'left') return ctx.scene.enter(SUBSCRIPTION_SCENE);

    next();
  } catch (err) {
    console.error(err);
  }
};
