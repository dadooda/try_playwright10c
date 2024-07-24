
/**
 * Разные типы.
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

//-------------------------------------- Inline-типизаторы

export function Creds(obj: Creds) {
  return obj;
}

//--------------------------------------

interface HasEmail {
  email: string;
}

interface HasPassword {
  password: string;
}
