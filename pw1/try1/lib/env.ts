
/**
 * Инструменты для осмысленной работы с env-переменными.
 * @module
 */

import 'dotenv/config';

/**
 * Читаем значение и возвращаем его.
 */
export function get(key: string): string | undefined {
  return process.env[key];
}

/**
 * Читаем значение и возвращаем его.
 * Если ключ не найден, пуляем исключение.
 */
export function require(key: string): string | never {
  let v: string | undefined;
  if ((v = get(key)) == undefined) throw new Error(`Env variable is not set: ${_(key)}`)
  return v
}

//-------------------------------------- Инструменты

const _ = JSON.stringify;
