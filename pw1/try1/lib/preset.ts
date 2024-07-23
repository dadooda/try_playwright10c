
/**
 * Предопределённые наборы данных.
 * @module
 */

import * as env from './env';
import { Creds } from './type';

/**
 * Наборы данных для аутентификации.
 * @module
 */
export module auth {
  /** Супер-админ. */
  export const SUPER: Creds = {
    // AF: TODO: Системно решил с хранением credentials за пределами репы.
    // email: 'test_admin@inventos.ru',
    // password: 'gk54aerpgp3k4',
    email: env.require('U_SUPER_EMAIL'),
    password: env.require('U_SUPER_PASSWORD'),
  };

  /** Админ ОТР. */
  export const OTR: Creds = {
    email: 'test_otr@inventos.ru',
    password: 'gk54aerpgp3k4',
  };
}
