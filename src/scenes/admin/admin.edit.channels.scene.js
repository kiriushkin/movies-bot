import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { channelsList } from '../../keyboards/admin.keyboard.js';
import adminService from '../../service/admin.service.js';

const {
  ADMIN_MAIN_SCENE,
  ADMIN_EDIT_CHANNELS_SCENE,
  ADMIN_EDIT_CHANNEL_SCENE,
} = process.env;

const scene = new Scenes.BaseScene(ADMIN_EDIT_CHANNELS_SCENE);

scene.enter(async (ctx) => {
  try {
    ctx.session.channelList = await adminService.getChannels(1);
    ctx.reply(
      locales.admin.reply.channelList,
      channelsList(ctx.session.channelList)
    );
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.hears(locales.back, (ctx) => {
  ctx.scene.enter(ADMIN_MAIN_SCENE);
});

scene.on('text', (ctx) => {
  const [channel] = ctx.session.channelList.filter(
    (channel) => channel.name === ctx.message.text
  );

  if (!channel) return;

  ctx.session.channel = channel;
  ctx.scene.enter(ADMIN_EDIT_CHANNEL_SCENE);
});

export default scene;
