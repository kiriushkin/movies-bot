import 'dotenv/config';
import { Telegraf, session } from 'telegraf';
import stage from './stage.js';

const { BOT_TOKEN, START_SCENE } = process.env;

const bot = new Telegraf(BOT_TOKEN);

bot.use(session());
bot.use(stage.middleware());

try {
  await bot.launch();
  console.log('Bot launched.');
} catch (err) {
  console.error(err);
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
