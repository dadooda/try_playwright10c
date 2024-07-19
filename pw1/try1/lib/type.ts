
/**
 * Типы для всякого разного.
 * @module
 */

/** Реквизиты доступа на сайт. */
export type Creds = HasEmail & HasPassword

/** Целевой сайт. */
export interface Target {
  /** Значимое имя для отчётов, диагностики и пр. */
  name: string;

  url: string;
}

//--------------------------------------

interface HasEmail {
  email: string;
}

interface HasPassword {
  password: string;
}
