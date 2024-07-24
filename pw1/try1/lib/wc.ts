
/**
 * Инструменты Webcaster.
 * @module
 */

import { Cookie } from '@playwright/test';

/**
 * Вытаскиваем из массива cookies, нужные для корректного восстановления сессии.
 */
export function filterLoginCookies(cookies: Cookie[]) {
  return cookies.filter((ck) => ck.name == '_webcaster_new_session');
}
