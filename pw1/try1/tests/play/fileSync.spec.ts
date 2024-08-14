
/**
 * Здесь:
 *
 * 1. Одной частью поставляем данные в файл.
 * 2. Другой частью потребляем данные из файла.
 *
 * @module
 */

import { test } from '@playwright/test';

import { SyncData } from '../../lib/SyncData';
import { sleep } from '../../lib/util';

// NOTE: Можно `process.ppid` если надо каждый раз свежую диру.
const sd = new SyncData({ path: 'var/persist/fileSync/999/' });

// Нам нужна настоящая параллельность тестов.
test.describe.configure({ mode: 'parallel' });

test('produce', async () => {
  const dt = (...args) => console.log('\x1b[32mproduce():\x1b[0m', ...args);
  dt('hey');

  await sd.produce('kk.txt', async () => {
    await sleep(2000);
    return `mkk ${Math.random()}`;
  });

  dt('ret');
});

test('consume 1', async () => {
  const dt = (...args) => console.log('\x1b[32mconsume1():\x1b[0m', ...args);
  test.setTimeout(3000);
  const content = await sd.consume('kk.txt');
  dt('content', content);
});

test('consume 2', async () => {
  const dt = (...args) => console.log('\x1b[32mconsume2():\x1b[0m', ...args);
  test.setTimeout(3000);
  const content = await sd.consume('kk.txt');
  dt('content', content);
});
