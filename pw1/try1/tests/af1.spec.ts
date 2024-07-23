
import { expect, test } from '@playwright/test';

import * as cmpCat from '../lib/cmpCat';
import * as env from '../lib/env';
import * as pageCat from '../lib/pageCat';
import * as preset from '../lib/preset';
import * as setup from '../lib/setup';
import * as util from '../lib/util';

// AF: TODO: Fin.
const target = setup.target.QA;

test('fefe', async () => {
  const creds = preset.auth.SUPER;
  console.log('creds', creds);
});

// ЦТ: Логинимся корректным логином, переходим на "ФиР".
test.skip('hehe', async ({ page }) => {
  // test.setTimeout(10000);

  // AF: TODO: Fin.
  const target = setup.target.QA;
  // const target = setup.target.STG2;
  const creds = preset.auth.SUPER;

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
