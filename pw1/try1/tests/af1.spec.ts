
import { expect, test } from '@playwright/test';

interface Creds {
  email: string;
  password: string;
}

const credsAdmin1: Creds = {
  email: 'test_admin@inventos.ru',
  password: "gk54aerpgp3k4",
};

const credsInvalid: Creds = {
  email: 'joe@isp.com',
  password: 'shmassword',
};

test('hehe', async ({ page }) => {
  test.setTimeout(5000);

  await page.goto('https://staging2.webcaster.ru/admin');

  const creds = credsAdmin1;

  await page.getByLabel('E-mail').fill(creds.email);
  await page.getByLabel('Пароль').fill(creds.password);
  await page.getByRole('button', { name: /Войти/ }).click();

  await page.waitForSelector('.navbar-fixed-top');
});
