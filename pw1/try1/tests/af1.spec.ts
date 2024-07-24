
import { Cookie, expect, test } from '@playwright/test';

import * as cmpCat from '../lib/cmpCat';
import * as env from '../lib/env';
import * as pageCat from '../lib/pageCat';
import * as preset from '../lib/preset';
import * as setup from '../lib/setup';
import * as util from '../lib/util';

// AF: TODO: Fin.
const creds = preset.auth.WC.super;
const target = setup.target.QA;

// ЦТ: Логинимся и воруем реквизиты для быстрого входа.
test('fefe', async ({ browser, context, page }) => {
  const m = (...args) => console.log('\x1b[1;32mfefe(): \x1b[0m', ...args);

  await page.goto(`${target.url}/admin`);

  const lg = new pageCat.Login({ page });
  await lg.fillEnterSuccess(creds);

  // console.log('browser.storageState', browser.options.storageState);
  const coo = await context.cookies();
  m('coo', coo);
  m('coo.length', coo.length);

  // Выбираем только нашинские cookies.
  const ours = coo.filter((ck) => ck.name == '_webcaster_new_session');
  console.log('ours', ours);

  // const proper = coo.find()

  // console.log('context.cookies', await context.cookies());
  // console.log('context.storageState', context.storageState);

});

// ЦТ: Логинимся корректным логином, переходим на "ФиР".
test.skip('hehe', async ({ page }) => {
  // test.setTimeout(10000);

  await page.goto(`${target.url}/admin`);
  console.log('target', target);

  await page.getByLabel('E-mail').fill(creds.email);
  console.log('creds', creds);
  await page.getByLabel('Пароль').fill(creds.password);
  await page.getByRole('button', { name: /Войти/ }).click();

  await page.waitForSelector('.navbar-fixed-top');

  await page.getByText('Медиа').hover();

  await page.getByRole('link', { name: 'Файлы и ролики' }).click();

  await page.waitForSelector('.navbar-fixed-top');
});
