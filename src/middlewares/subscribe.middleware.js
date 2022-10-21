import subscribeService from '../service/subscribe.service.js';

const { SUBSCRIPTION_SCENE } = process.env;

export default async (ctx, next) => {
  try {
    if (!ctx.session) ctx.session = {};
    if (
      ctx.session.__scenes?.current === SUBSCRIPTION_SCENE &&
      ctx.update?.message?.text !== '/start'
    )
      return next();
    // if (ctx.session.isAdmin) return next();

    const result = await subscribeService.checkSubscriptions(ctx);

    if (!result) return ctx.scene.enter(SUBSCRIPTION_SCENE);

    next();
  } catch (err) {
    console.error(err);
  }
};
