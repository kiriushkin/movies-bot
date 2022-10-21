import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { channelsList, deleteChannel } from '../../keyboards/admin.keyboard.js';
import { back } from '../../keyboards/common.keyboard.js';
import adminService from '../../service/admin.service.js';

const { ADMIN_MAIN_SCENE, ADMIN_DELETE_CHANNEL_SCENE } = process.env;

const scene = new Scenes.BaseScene(ADMIN_DELETE_CHANNEL_SCENE);

scene.enter(async (ctx) => {
  try {
    ctx.session.channelList = await adminService.getChannels(1);
    ctx.editMessageText(
      locales.admin.reply.channelList,
      channelsList(ctx.session.channelList)
    );
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.action(locales.back, (ctx) => {
  if (ctx.session.channel) {
    ctx.session.channel = null;
    return ctx.scene.enter(ADMIN_DELETE_CHANNEL_SCENE);
  }
  ctx.scene.enter(ADMIN_MAIN_SCENE);
});

scene.action(locales.admin.button.deleteConfirm, async (ctx) => {
  try {
    if (!ctx.session.channel) return;

    await adminService.deleteChannel(ctx.session.channel.id);
    await ctx.editMessageText(locales.admin.reply.channelDeleted);

    ctx.session.channel = null;
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.on('callback_query', (ctx) => {
  const [channel] = ctx.session.channelList.filter(
    (channel) => channel.name === ctx.update.callback_query.data
  );

  if (!channel) return;

  ctx.session.channel = channel;
  ctx.editMessageText(
    `<b>${locales.admin.reply.channelDelete}</b>\nID: <code>${channel.channelId}</code>\nИмя: <code>${channel.name}</code>\nСсылка: <code>${channel.url}</code>`,
    { ...deleteChannel(), parse_mode: 'HTML' }
  );
});

export default scene;
