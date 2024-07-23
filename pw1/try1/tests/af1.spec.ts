
import { expect, test } from '@playwright/test';

import * as cmpCat from '../lib/cmpCat';
import * as pageCat from '../lib/pageCat';
import * as preset from '../lib/preset';
import * as setup from '../lib/setup';
import * as util from '../lib/util';

// ЦТ: Орудуем формой логина через класс страницы.
test('bebe', async ({ page }) => {
  await page.goto(`${setup.target.QA.url}/admin`);

  const lgp = new pageCat.Login({ page });
  await lgp.fillEnterSuccess(preset.auth.SUPER);

  // await util.sleep(5000);
})




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
