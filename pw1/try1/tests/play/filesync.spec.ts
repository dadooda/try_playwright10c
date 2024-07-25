
/**
 * Здесь тренируемся одной частью складывать данные в файлы,
 * а другой -- по мере готовности считывать и делать работу.
 * @module
 */

import { test } from '@playwright/test';

import { SyncData } from '../../lib/SyncData';
import { sleep } from '../../lib/util';

// AF: TODO: Fin.
// const creds = preset.auth.WC.super;
// const target = setup.target.QA;

const varPath = `var/${process.ppid}`;
const ckBname = `${varPath}/cookies.json`;

const consumerSleep = async () => sleep(300);

test('producer', async () => {
  const m = (...args) => console.log('\x1b[32mproducer():\x1b[0m', ...args);
  m('process.cwd()', process.cwd());
  const sd = new SyncData({ path: 'var/persist/999/' });
  await sd.produce('kk.txt', `mkk ${Math.random()}`);
  // m('sd.conveyPath()', await sd.conveyPath());

  // m('sd.randon', sd.randon);
  // m('sd.randon', sd.randon);
});

test('consumer 1', async () => {
  await consumerSleep();
});

test('consumer 2', async () => {
  await consumerSleep();
});
// test.describe('consume data', () => {
//   test('consume 1', () => {

//   });
// });

//--------------------------------------

