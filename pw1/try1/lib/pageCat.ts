
/**
 * "Каталог" страниц сайта. В терминах документации Playwright такие классы
 * называются "fixtures".
 * @module
 */

import { Page } from '@playwright/test';

import { Creds } from '../lib/type';
import * as cmpCat from './cmpCat';

export class Base {
  protected readonly page: Page;

  constructor({ page }: { page: Page }) {
    this.page = page;
  }
}

export class Login extends Base {
  LABEL = {
    email: 'E-mail',
    enter: /Войти/,
    password: 'Пароль',
  }

  /**
   * Вводим реквизиты и жмакаем кнопку «Войти».
   */
  async fillEnter(creds: Creds) {
    await this.fill(creds);
    await this.page.getByRole('button', { name: this.LABEL.enter }).click();
  }

  /**
   * Вводим реквизиты, входим, ожидаем, что вход успешен.
   */
  async fillEnterSuccess(creds: Creds) {
    await this.fillEnter(creds);
    await this.page.waitForSelector(cmpCat.Navigation.SELECTOR.navbar);
  }

  //--------------------------------------

  private async fill(creds: Creds) {
    await this.page.getByLabel(this.LABEL.email).fill(creds.email);
    await this.page.getByLabel(this.LABEL.password).fill(creds.password);
  }
}

//
// Implementation notes:
//
// * Было бы логично назвать этот модуль `page`, но уж больно слово ходовое.
//   Поэтому выбрал более нейтральное.
