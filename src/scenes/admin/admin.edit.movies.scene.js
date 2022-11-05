import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { pages } from '../../keyboards/admin.keyboard.js';
import { back } from '../../keyboards/common.keyboard.js';
import adminService from '../../service/admin.service.js';

const {
  ADMIN_MAIN_SCENE,
  ADMIN_EDIT_MOVIES_SCENE,
  ADMIN_EDIT_MOVIES_PAGE_SCENE,
} = process.env;

const scene = new Scenes.BaseScene(ADMIN_EDIT_MOVIES_SCENE);

scene.enter(async (ctx) => {
  try {
    const count = await adminService.getMoviesCount();
    ctx.session.pages =
      count >= 10 ? Math.ceil(count / 10) : count === 0 ? 0 : 1;
    ctx.editMessageText(
      locales.admin.reply.pageSelect,
      pages(ctx.session.pages)
    );
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.session.message_id = (await ctx.reply('text', back())).message_id;
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.action(locales.back, (ctx) => {
  ctx.scene.enter(ADMIN_MAIN_SCENE);
});

scene.on('callback_query', (ctx) => {
  const page = +ctx.update.callback_query.data;
  if (typeof page !== 'number' || page > ctx.session.pages || page <= 0) return;

  ctx.session.page = page;
  ctx.scene.enter(ADMIN_EDIT_MOVIES_PAGE_SCENE);
});

export default scene;
