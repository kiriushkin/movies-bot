const { ADMIN_IDS } = process.env;

const { START_SCENE } = process.env;

export default (ctx, next) => {
  try {
    if (!ctx.session) ctx.session = {};

    const ids = ADMIN_IDS.replace(' ', '').split(',');

    for (let id of ids) {
      if (ctx.from.id === +id) {
        ctx.session.isAdmin = true;
        break;
      }
      ctx.session.isAdmin = false;
    }

    if (!ctx.session.__scenes?.current?.match('admin') || ctx.session.isAdmin)
      return next();

    ctx.reply('У вас нет доступа');
    ctx.scene.enter(START_SCENE);
  } catch (err) {
    console.error(err);
  }
};
