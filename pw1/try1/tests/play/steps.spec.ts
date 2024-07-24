
/**
 * Здесь конкретно примеры того, как я с чем-то балуюсь.
 * Как правило, в первый раз.
 * @module
 */

import { expect, test } from '@playwright/test';

import * as pageCat from '../../lib/pageCat';
import * as preset from '../../lib/preset';
import * as setup from '../../lib/setup';

// AF: TODO: Fin.
const creds = preset.auth.WC.super;
const target = setup.target.QA;

test('try `test.step`', async ({ page }) => {
  await test.step('Шуры', async () => {
    await page.goto(`${target.url}/admin`);
  })

  await test.step('Муры', async () => {
    const lg = new pageCat.Login({ page });
    await test.step('Харахуры', async () => {
      await lg.fillEnterSuccess(creds);
    })
  })
})
