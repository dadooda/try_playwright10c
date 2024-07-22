
/**
 * Установки высокого уровня.
 * @module
 */

import * as type from './type';

/**
 * Целевые сайты.
 * @module
 */
export module target {
  // AF: TODO: Fin.

  export const QA: type.Target = {
    name: "QA",
    url: "https://qa.webcaster.ru",
  }

  export const STG2: type.Target = {
    name: "Staging2",
    url: "https://staging2.webcaster.ru",
  }
}
