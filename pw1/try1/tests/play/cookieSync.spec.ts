
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
  const dt = (...args) => console.log('\x1b[32mlog_in():\x1b[0m', ...args);
  dt('hey');

  // Типа настоящий поставщик.
  if (true) {
    await sd.produceRight(COOKIES_BNAME, async () => {
      const dt = (...args) => console.log('\x1b[32mcb():\x1b[0m', ...args);
      dt('hey');

      await page.goto(`${target.url}/admin`);

      const lg = new pageCat.Login({ page });
      await lg.fillEnterSuccess(creds);

      const cookies = wc.filterLoginCookies(await context.cookies());
      dt('cookies', cookies);

      return JSON.stringify(cookies);
    });
  }

  // Игружечный поставщик.
  // AF: TODO: CUP.
  if (false) {
    await sd.produceRight(COOKIES_BNAME, async () => {
      await sleep(2000);
      return 'ho ho ho';
    })
  }

  // НЕТОЧНЫЙ вариант, где `produce()` в конце.
  if (false) {
    await page.goto(`${target.url}/admin`);

    const lg = new pageCat.Login({ page });
    await lg.fillEnterSuccess(creds);

    const cookies = wc.filterLoginCookies(await context.cookies());

    await sd.produce(COOKIES_BNAME, JSON.stringify(cookies));
    dt('after produce');
  }

  dt('ret');
});

test('barge into /clients', async ({ context, page }) => {
  const dt = (...args) => console.log('\x1b[32mdo_clients():\x1b[0m', ...args);
  dt('hey');

  const cookies = JSON.parse(await sd.consume(COOKIES_BNAME));
  dt('cookies ready');
  await context.addCookies(cookies);

  await page.goto(`${target.url}/admin/clients`);

  await sleep(1000);
});

test.skip('barge into /settings', async ({ context, page }) => {
  const dt = (...args) => console.log('\x1b[32mdo_settings():\x1b[0m', ...args);
  dt('hey');

  const cookies = JSON.parse(await sd.consume(COOKIES_BNAME));
  dt('cookies ready');
  await context.addCookies(cookies);

  await page.goto(`${target.url}/admin/settings`);

  await sleep(1000);
});

test.skip('barge into /users', async ({ context, page }) => {
  const dt = (...args) => console.log('\x1b[32mdo_users():\x1b[0m', ...args);
  dt('hey');

  const cookies = JSON.parse(await sd.consume(COOKIES_BNAME));
  dt('cookies ready');
  await context.addCookies(cookies);

  await page.goto(`${target.url}/admin/users`);

  await sleep(1000);
});

test.skip('barge into /videofiles', async ({ context, page }) => {
  const dt = (...args) => console.log('\x1b[32mdo_videofiles():\x1b[0m', ...args);
  dt('hey');

  const cookies = JSON.parse(await sd.consume(COOKIES_BNAME));
  dt('cookies ready');
  await context.addCookies(cookies);

  await page.goto(`${target.url}/admin/video_files`);

  await sleep(1000);
});
