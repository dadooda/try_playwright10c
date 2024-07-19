import { expect, test } from '@playwright/test';

import * as fxt from '../lib/fixture';
import * as setup from '../lib/setup';

// interface Creds {
//   email: string;
//   password: string;
// }

// const credsAdmin1: Creds = {
//   email: 'test_admin@inventos.ru',
//   password: 'gk54aerpgp3k4',
// };

// const credsInvalid: Creds = {
//   email: 'joe@isp.com',
//   password: 'shmassword',
// };

test('hehe', async ({ page }) => {
  test.setTimeout(5000);

  const target = setup.target.STG2;
  const creds = fxt.auth.SUPER;

  // AF: TODO: Fin.
  // await page.goto('https://staging2.webcaster.ru/admin');
  await page.goto(`${target.url}/admin`);

  await page.getByLabel('E-mail').fill(creds.email);
  await page.getByLabel('Пароль').fill(creds.password);
  await page.getByRole('button', { name: /Войти/ }).click();

  await page.waitForSelector('.navbar-fixed-top');
});
