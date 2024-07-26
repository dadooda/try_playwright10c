
/**
 * Каталог страниц, поколение 2. Здесь:
 *
 * 1. Встроенный `open()`.
 *
 * ВАЖНО!
 *
 * * Классы страниц называются СТРОГО как предмет. Например, "Login" нельзя, противоречиво.
 *   Можно, например, "LoginForm".
 *
 * @module
 */

import * as pth from 'path';
import { ppid } from 'process';

import { expect, Page } from '@playwright/test';

import { Creds, Target } from '../lib/type';
import * as cmpCat from './cmpCat';

export class Base {
  readonly PATH: string;

  protected readonly page: Page;
  protected readonly target: Target;

  constructor({ page, target }: {
    target: Target;

    /** Объект `page` из теста. */
    page: Page,
  }) {
    this.page = page;
    this.target = target;
  }

  /** Открываем нашу страницу, сделав на неё `page.goto()`. */
  async goto(): Promise<void> {
    const resp = await this.page.goto(this.url);
    expect(resp?.ok()).toBeTruthy();
    expect(this.page.getByText('Вам необходимо войти в систему или зарегистрироваться')).toBeVisible();
  }

  //--------------------------------------

  /** URL нашей страницы. */
  private get url(): string {
    if (this.PATH == undefined) throw new Error("Define `PATH` in your class");
    return pth.join(this.target.url, this.PATH);
  }
}

/**
 * Форма врода в админку.
 */
export class LoginForm extends Base {
  readonly PATH = '/admin';

  readonly LABEL = {
    email: 'E-mail',
    enter: /Войти/,
    password: 'Пароль',
  };

  /**
   * Вводим реквизиты и жмакаем кнопку «Войти».
   */
  async fillEnter(creds: Creds): Promise<void> {
    await this.fill(creds);
    await this.page.getByRole('button', { name: this.LABEL.enter }).click();
  }

  /**
   * Вводим реквизиты, входим, ожидаем, что вход успешен.
   */
  async fillEnterSuccess(creds: Creds): Promise<void> {
    await this.fillEnter(creds);
    await this.page.waitForSelector(cmpCat.Navigation.SELECTOR.navbar);
  }

  //--------------------------------------

  private async fill(creds: Creds): Promise<void> {
    await this.page.getByLabel(this.LABEL.email).fill(creds.email);
    await this.page.getByLabel(this.LABEL.password).fill(creds.password);
  }
}

//
// Implementation notes:
//
// * Было бы логично назвать этот модуль `page`, но уж больно слово ходовое.
//   Поэтому выбрал более нейтральное.
