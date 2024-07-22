
import { expect, test } from '@playwright/test';

import * as fxt from '../lib/fixture';
import * as setup from '../lib/setup';

test('hehe', async ({ page }) => {
  test.setTimeout(10000);

  // AF: TODO: Fin.
  const target = setup.target.QA;
  // const target = setup.target.STG2;
  const creds = fxt.auth.SUPER;

  await page.goto(`${target.url}/admin`);
  console.log('target', target);

  await page.getByLabel('E-mail').fill(creds.email);
  console.log('creds', creds);
  await page.getByLabel('Пароль').fill(creds.password);
  await page.getByRole('button', { name: /Войти/ }).click();

  await page.waitForSelector('.navbar-fixed-top');

  // AF: TODO: Fin.
  const sleep = async (delay: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), delay))

  await page.getByText('Медиа').hover();

  await page.getByRole('link', { name: 'Файлы и ролики' }).click();

  await page.waitForSelector('.navbar-fixed-top');
});
