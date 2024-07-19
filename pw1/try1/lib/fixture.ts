
/**
 * Предопределённые наборы данных.
 * @module
 */

import { Creds } from './type';

/**
 * Наборы данных для аутентификации.
 * @module
 */
export module auth {
  /** Супер-админ. */
  export const SUPER: Creds = {
    email: "test_admin@inventos.ru",
    password: "gk54aerpgp3k4",
  };

  /** Админ ОТР. */
  export const OTR: Creds = {
    email: "test_otr@inventos.ru",
    password: "gk54aerpgp3k4",
  }
}
