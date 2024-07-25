
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

// AF: TODO: Fin.
// const consumerSleep = async () => sleep(300);

const sd = new SyncData({ path: 'var/persist/999/' });

// test('producer', async () => {
//   const m = (...args) => console.log('\x1b[32mproducer():\x1b[0m', ...args);
//   m('hey');
//   await sd.produce('kk.txt', `mkk ${Math.random()}`);
//   m('after produce');
//   // m('sd.conveyPath()', await sd.conveyPath());

//   // m('sd.randon', sd.randon);
//   // m('sd.randon', sd.randon);
// });

test('consumer 1', async () => {
  const m = (...args) => console.log('\x1b[32mconsumer1():\x1b[0m', ...args);
  test.setTimeout(3000);
  const content = await sd.consume('kk.txt');
  m('content', content);
});

test('consumer 2', async () => {
  const m = (...args) => console.log('\x1b[32mconsumer2():\x1b[0m', ...args);
  test.setTimeout(3000);
  const content = await sd.consume('kk.txt');
  m('content', content);
});

//--------------------------------------

