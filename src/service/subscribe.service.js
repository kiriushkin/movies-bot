import { Telegram } from 'telegraf';
import Channel from '../models/Channel.js';

const { BOT_TOKEN } = process.env;

class SubscribeService {
  async checkSubscriptions(ctx) {
    try {
      const channels = await Channel.findAll({ raw: true });
      ctx.session.channels = channels;

      const promises = [];

      channels.forEach((channel) => {
        promises.push(
          new Telegram(BOT_TOKEN).getChatMember(channel.channelId, ctx.chat.id)
        );
      });

      const results = await Promise.all(promises);

      for (let result of results) if (result.status === 'left') return false;

      return true;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new SubscribeService();
