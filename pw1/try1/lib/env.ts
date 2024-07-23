
/**
 * Осмысленно работаем с environment-установками.
 * @module
 */

import 'dotenv/config';

/**
 * Читаем значение  и возвращаем его.
 * Если ключ не найден, пуляем исключение.
 */
export function require(key: string): string | never {
  let v: string | undefined;
  const m = console.log;
  if ((v = process.env[key]) == undefined) throw new Error(`Key not found: ${_(key)}`)
  return v
}

//-------------------------------------- Инструменты

const _ = JSON.stringify;
