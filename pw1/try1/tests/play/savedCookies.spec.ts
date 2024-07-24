
import { Cookie, test } from '@playwright/test';

import * as pageCat from '../../lib/pageCat';
import * as preset from '../../lib/preset';
import * as setup from '../../lib/setup';
import { sleep } from '../../lib/util';
import * as wc from '../../lib/wc';

// AF: TODO: Fin.
const creds = preset.auth.WC.super;
const target = setup.target.QA;

let grabbedCookies: Cookie[];

// ВАЖНО! Сначала воруем.
test.describe.configure({ mode: 'serial' });

test('grab session', async ({ context, page }) => {
  const m = (...args) => console.log('\x1b[32mgrab: \x1b[0m', ...args);

  await page.goto(`${target.url}/admin`);

  const lg = new pageCat.Login({ page });
  await lg.fillEnterSuccess(creds);

  grabbedCookies = wc.filterLoginCookies(await context.cookies());
  m('grabbedCookies', grabbedCookies);
});

test.describe('use session', () => {
  // ERR: Не сработает.
  // test.describe.configure({ mode: 'parallel' });

  test('use session 1', async ({ context, page }) => {
    const m = (...args) => console.log('\x1b[32muse_sess1: \x1b[0m', ...args);

    m('grabbedCookies', grabbedCookies);
    await context.addCookies(grabbedCookies);

    await page.goto(`${target.url}/admin/video_files`);

    await sleep(2000);
  });

  test('use session 2', async ({ context, page }) => {
    await context.addCookies(grabbedCookies);

    await page.goto(`${target.url}/admin/events`);

    await sleep(2000);
  })
});
