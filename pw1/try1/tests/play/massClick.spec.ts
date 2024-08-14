
/**
 * Здесь:
 *
 * 1. Логинимся и воруем cookies.
 * 2. Параметризовано протыкиваем и сверяем десятки страниц.
 *
 * @module
 */

import * as pth from 'path';

import { expect, Page, test } from '@playwright/test';

import * as pageCat from '../../lib/pageCat2';
import * as preset from '../../lib/preset';
import * as setup from '../../lib/setup';
import { SyncData } from '../../lib/SyncData';
import { _, sleep } from '../../lib/util';
import * as wc from '../../lib/wc';

const COOKIES_BNAME = 'cookies.json';

const creds = preset.auth.WC.super;
const target = setup.target.QA;
const sd = new SyncData({ path: `var/persist/${process.ppid}/` });

// Если раскомментировать, то будет настоящая параллельность,
// как между разными файлами.
test.describe.configure({ mode: 'parallel' });

// AF: TODO: Fin.
// test('log in and save cookies', async ({ context, page }) => {
//   const dt = (...args) => console.log('\x1b[32mlog_in():\x1b[0m', ...args);
//   dt('hey');

//   dt('logging in...');
//   const lg = new pageCat.LoginForm({ target, page });
//   await lg.goto();
//   await lg.fillEnterSuccess(creds);
//   const cookies = wc.filterLoginCookies(await context.cookies());
//   dt('producing...');
//   await sd.produce(COOKIES_BNAME, JSON.stringify(cookies));
//   dt('ret');
// });

ArrayOfStep([
  {
    path: '/admin/clients',
    verifyFn: async ({ page }) => {
      const m = (...args) => console.log('\x1b[32mver1():\x1b[0m', ...args);
      m('hey');
    },
  },
]).forEach((elem) => {
  test(`barge into ${_(elem.path)}`, async ({ context, page }) => {
    const m = (...args) => console.log(`\x1b[32m[path ${_(elem.path)}]:\x1b[0m`, ...args);
    m('hey');
    const cookies = JSON.parse(await sd.consume(COOKIES_BNAME));
    await context.addCookies(cookies);

    const resp = await page.goto(pth.join(target.url, elem.path));
    expect(resp?.ok()).toBeTruthy();

    await elem.verifyFn({ page });
  })
}); // forEach()

//-------------------------------------- Инструменты

interface Step {
  /** Путь, например '/admin/clients'. */
  path: string;

  /** Callback для сверки. */
  verifyFn: ({ page }: { page: Page }) => Promise<void>;
}

/** Типизатор. */
function ArrayOfStep(ar: Step[]): Step[] {
  return ar;
}
