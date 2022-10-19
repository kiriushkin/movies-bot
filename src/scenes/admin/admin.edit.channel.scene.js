import { Scenes } from 'telegraf';
import locales from '../../locales/ru.json' assert { type: 'json' };
import { editChannel } from '../../keyboards/admin.keyboard.js';
import { back } from '../../keyboards/common.keyboard.js';
import adminService from '../../service/admin.service.js';

const {
  ADMIN_EDIT_CHANNELS_SCENE,
  ADMIN_EDIT_CHANNEL_SCENE,
  ADMIN_MAIN_SCENE,
} = process.env;

const scene = new Scenes.BaseScene(ADMIN_EDIT_CHANNEL_SCENE);

scene.enter(async (ctx) => {
  try {
    const { channel } = ctx.session;

    ctx.replyWithHTML(
      `<b>${locales.admin.reply.channelEdit}</b>\nID: <code>${channel.channelId}</code>\nИмя: <code>${channel.name}</code>\nСсылка: <code>${channel.url}</code>`,
      editChannel()
    );
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.hears(locales.back, (ctx) => {
  if (ctx.session.input) {
    ctx.session.input = null;
    return ctx.scene.enter(ADMIN_EDIT_CHANNEL_SCENE);
  }

  ctx.session.channel = null;
  return ctx.scene.enter(ADMIN_EDIT_CHANNELS_SCENE);
});

scene.hears(locales.admin.button.editId, (ctx) => {
  ctx.session.input = 'channelId';
  ctx.reply(locales.admin.reply.channelId, back());
});

scene.hears(locales.admin.button.editName, (ctx) => {
  ctx.session.input = 'channelName';
  ctx.reply(locales.admin.reply.channelName, back());
});

scene.hears(locales.admin.button.editUrl, (ctx) => {
  ctx.session.input = 'channelUrl';
  ctx.reply(locales.admin.reply.channelUrl, back());
});

scene.on('text', async (ctx) => {
  try {
    const { channel } = ctx.session;
    switch (ctx.session.input) {
      case 'channelId':
        channel.channelId = ctx.message.text;
        break;
      case 'channelName':
        channel.name = ctx.message.text;
        break;
      case 'channelUrl':
        channel.url = ctx.message.text;
        break;
    }

    const { channelId, name, url } = await adminService.editChannel(channel);

    await ctx.replyWithHTML(
      `<b>${locales.admin.reply.channelEdited}</b>\nid: <code>${channelId}</code>\nИмя: <code>${name}</code>\nСсылка: <code>${url}</code>`
    );

    ctx.scene.enter(ADMIN_MAIN_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

export default scene;
