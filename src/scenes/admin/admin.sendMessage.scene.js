import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { back } from '../../keyboards/common.keyboard.js';
import usersService from '../../service/users.service.js';

const { ADMIN_MAIN_SCENE, ADMIN_SEND_SCENE, ADMIN_IDS } = process.env;

const scene = new Scenes.BaseScene(ADMIN_SEND_SCENE);

scene.enter((ctx) => {
  ctx.editMessageText(locales.admin.reply.sendMessage, back());
});

scene.action(locales.back, (ctx) => ctx.scene.enter(ADMIN_MAIN_SCENE));

scene.on('message', async (ctx) => {
  try {
    const admins = ADMIN_IDS.replace(/\s/g, '').split(',');

    const users = await usersService.getUsers();
    const promises = [];

    users
      .filter((user) => {
        for (let i = 0; i < admins.length; i++) {
          if (user.id === +admins[i]) return false;
        }
        return true;
      })
      .forEach(async (user) =>
        promises.push(
          await ctx.telegram.copyMessage(
            user.id,
            ctx.from.id,
            ctx.update.message.message_id
          )
        )
      );

    await Promise.all(promises);

    await ctx.reply(locales.admin.reply.messagesSent);

    ctx.session.message_id = (await ctx.reply('text', back())).message_id;

    ctx.scene.enter(ADMIN_MAIN_SCENE);
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

export default scene;
