
/**
 * Здесь тренируемся одной частью складывать данные в файлы,
 * а другой -- по мере готовности считывать и делать работу.
 * @module
 */

import { test } from '@playwright/test';

import * as sema from '../../lib/sema';
import { sleep } from '../../lib/util';

// AF: TODO: Fin.
// const creds = preset.auth.WC.super;
// const target = setup.target.QA;

const tpi = () => process.env['TEST_PARALLEL_INDEX'];
const twi = () => process.env['TEST_WORKER_INDEX'];

const consumerSleep = async () => sleep(300);

test('create data', () => {
  console.log('sema.randon', sema.randon);
  const env = process.env;
  console.log('tpi()', tpi());
  console.log('twi()', twi());
  console.log('process.env["_"]', process.env["_"]);
  console.log('Object.keys(env).sort()', Object.keys(env).sort());
  console.log('process.pid', process.pid);
  console.log('process.ppid', process.ppid);
});

test('check pid 2', () => {
  await consumerSleep();
  console.log('sema.randon', sema.randon);
  console.log('tpi()', tpi());
  console.log('twi()', twi());
  console.log('process.pid', process.pid);
  console.log('process.ppid', process.ppid);
});

test('check pid 3', () => {
  console.log('sema.randon', sema.randon);
  console.log('tpi()', tpi());
  console.log('twi()', twi());
  console.log('process.pid', process.pid);
  console.log('process.ppid', process.ppid);
});
// test.describe('consume data', () => {
//   test('consume 1', () => {

//   });
// });
