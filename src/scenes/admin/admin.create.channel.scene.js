import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { back } from '../../keyboards/common.keyboard.js';
import adminService from '../../service/admin.service.js';

const { ADMIN_MAIN_SCENE, ADMIN_CREATE_CHANNEL_SCENE } = process.env;

const scene = new Scenes.BaseScene(ADMIN_CREATE_CHANNEL_SCENE);

scene.enter((ctx) => {
  ctx.session.input = 'channelId';
  ctx.session.channel = {};
  ctx.editMessageText(locales.admin.reply.channelId, back());
});

scene.action(locales.back, (ctx) => {
  ctx.session.input = null;
  ctx.session.channel = null;
  ctx.scene.enter(ADMIN_MAIN_SCENE);
});

scene.on('text', async (ctx) => {
  try {
    switch (ctx.session.input) {
      case 'channelId':
        ctx.session.input = 'channelName';
        ctx.session.channel.channelId = ctx.message.text;
        ctx.reply(locales.admin.reply.channelName, back());
        break;
      case 'channelName':
        ctx.session.input = 'channelUrl';
        ctx.session.channel.name = ctx.message.text;
        ctx.reply(locales.admin.reply.channelUrl, back());
        break;
      case 'channelUrl':
        ctx.session.input = null;
        ctx.session.channel.url = ctx.message.text;

        const { channelId, name, url } = ctx.session.channel;
        await adminService.addChannel({ channelId, name, url });

        await ctx.replyWithHTML(
          `<b>${locales.admin.reply.channelCreated}</b>\nid: <code>${channelId}</code>\nИмя: <code>${name}</code>\nСсылка: <code>${url}</code>`
        );
        ctx.session.channel = null;
        ctx.session.message_id = (await ctx.reply('Text', back())).message_id;
        ctx.scene.enter(ADMIN_MAIN_SCENE);
        break;
    }
  } catch (err) {
    console.error(err.parent);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

export default scene;
