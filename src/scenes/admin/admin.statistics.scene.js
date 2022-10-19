import { Scenes } from 'telegraf';
import locales from '../../locales/ru.js';
import { back } from '../../keyboards/common.keyboard.js';
import usersService from '../../service/users.service.js';
import searchesService from '../../service/searches.service.js';

const { ADMIN_MAIN_SCENE, ADMIN_STATISTICS_SCENE } = process.env;

const scene = new Scenes.BaseScene(ADMIN_STATISTICS_SCENE);

scene.enter(async (ctx) => {
  try {
    const promises = [
      usersService.getUsersCount(),
      usersService.getUsersCount('daily'),
      usersService.getUsersCount('weekly'),
      usersService.getUsersCount('monthly'),
      searchesService.getSearchesCount(),
      searchesService.getSearchesCount('daily'),
      searchesService.getSearchesCount('weekly'),
      searchesService.getSearchesCount('monthly'),
    ];

    const [
      allUsers,
      daylyUsers,
      weeklyUsers,
      monthlyUsers,
      allSearches,
      dailySearches,
      weeklySearches,
      monthlySearches,
    ] = await Promise.all(promises);

    ctx.replyWithHTML(
      `${locales.admin.reply.statistics}\n\nВсего пользователей: <code>${allUsers}</code>\nНовых пользователей за день: <code>${daylyUsers}</code>\nНовых пользователей за неделю: <code>${weeklyUsers}</code>\nНовых пользователей за месяц: <code>${monthlyUsers}</code>\n\nВсего поисковых запросов: <code>${allSearches}</code>\nПоисковых запросов за день: <code>${dailySearches}</code>\nПоисковых запросов за неделю: <code>${weeklySearches}</code>\nПоисковых запросов за месяц: <code>${monthlySearches}</code>`,
      back()
    );
  } catch (err) {
    console.error(err);
    ctx.reply('Произошла ошибка');
    ctx.scene.enter(ADMIN_MAIN_SCENE);
  }
});

scene.hears(locales.back, (ctx) => ctx.scene.enter(ADMIN_MAIN_SCENE));

export default scene;
