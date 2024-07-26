
/**
 * На базе `SyncData` одной частью логинимся и воруем cookies,
 * а другими -- потребляем эти данные и входим ("вламываемся") с готовой сессией.
 * @module
 */

import { test } from '@playwright/test';

import * as pageCat from '../../lib/pageCat';
import * as preset from '../../lib/preset';
import * as setup from '../../lib/setup';
import { SyncData } from '../../lib/SyncData';
import { sleep } from '../../lib/util';
import * as wc from '../../lib/wc';

const COOKIES_BNAME = 'cookies.json';

const creds = preset.auth.WC.super;
const target = setup.target.QA;
const sd = new SyncData({ path: `var/persist/${process.ppid}/` });

// Если раскомментировать, то будет настоящая параллельность,
// как между разными файлами.
test.describe.configure({ mode: 'parallel' });

test('log in and save cookies', async ({ context, page }) => {
  const m = (...args) => console.log('\x1b[32mproducer():\x1b[0m', ...args);
  m('hey');

  await page.goto(`${target.url}/admin`);

  const lg = new pageCat.Login({ page });
  await lg.fillEnterSuccess(creds);

  const cookies = wc.filterLoginCookies(await context.cookies());

  await sd.produce(COOKIES_BNAME, JSON.stringify(cookies));
  m('after produce');
});

test('barge into clients', async ({ context, page }) => {
  const m = (...args) => console.log('\x1b[32msettings():\x1b[0m', ...args);
  m('hey');
  const cookies = JSON.parse(await sd.consume(COOKIES_BNAME));
  m('cookies ready');
  await context.addCookies(cookies);

  await page.goto(`${target.url}/admin/clients`);

  await sleep(1000);
});

test('barge into settings', async ({ context, page }) => {
  const m = (...args) => console.log('\x1b[32msettings():\x1b[0m', ...args);
  m('hey');
  const cookies = JSON.parse(await sd.consume(COOKIES_BNAME));
  m('cookies ready');
  await context.addCookies(cookies);

  await page.goto(`${target.url}/admin/settings`);

  await sleep(1000);
});

test('barge into users', async ({ context, page }) => {
  const m = (...args) => console.log('\x1b[32mvideofls():\x1b[0m', ...args);
  m('hey');
  const cookies = JSON.parse(await sd.consume(COOKIES_BNAME));
  m('cookies ready');
  await context.addCookies(cookies);

  await page.goto(`${target.url}/admin/users`);

  await sleep(1000);
});

test('barge into videofiles', async ({ context, page }) => {
  const m = (...args) => console.log('\x1b[32mvideofls():\x1b[0m', ...args);
  m('hey');
  const cookies = JSON.parse(await sd.consume(COOKIES_BNAME));
  m('cookies ready');
  await context.addCookies(cookies);

  await page.goto(`${target.url}/admin/video_files`);

  await sleep(1000);
});
