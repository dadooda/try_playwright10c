
/**
 * Здесь тренируемся одной частью складывать данные в файлы,
 * а другой -- по мере готовности считывать и делать работу.
 * @module
 */

import { Memoize } from 'typescript-memoize';

import { test } from '@playwright/test';

import { sleep } from '../../lib/util';

// AF: TODO: Fin.
// const creds = preset.auth.WC.super;
// const target = setup.target.QA;

const varPath = `var/${process.ppid}`;
const ckBname = `${varPath}/cookies.json`;

const consumerSleep = async () => sleep(300);





test('producer', async () => {
  const m = (...args) => console.log('\x1b[32mproducer(): \x1b[0m', ...args);
  m('process.cwd()', process.cwd());
  // const sd = new SyncData({ fn: 'var/persist/999/cookies.json' });
  // m('sd.randon()', sd.randon());
  // m('sd.randon()', sd.randon());
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

/**
 * Поставщик и потребитель синхронных файловых данных.
 */
 class SyncData {
  /** Имя файла с данными. */
  private readonly fn: string;

  constructor({ fn }: { fn: string }) {
    this.fn = fn;
  }

  @Memoize()
  public randon() {
    return Math.random();
  }

  // public async provide() {

  // }


}
