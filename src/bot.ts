require('dotenv').config();
import Telegraf from 'telegraf';
import Stage from 'telegraf/stage';
import session from 'telegraf/session';

import logger from './util/logger';
import start from './controllers/start';
import searchScene from './controllers/search';

logger.debug(undefined, 'Starting a bot');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const stage = new Stage([searchScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start(start);
bot.command('search', async (ctx: any) => ctx.scene.enter('search'));
bot.startPolling();