
import * as fs from 'fs/promises';
import * as pth from 'path';
import { Memoize } from 'typescript-memoize';

import { sleep } from './util';

/**
 * Поставщик и потребитель синхронных файловых данных.
 */
export class SyncData {
  /** Путь к данным. */
  private readonly path: string;

  private readonly consumerBootDelay: number;
  private readonly consumerLoopDelay: number;

  constructor({ consumerBootDelay, consumerLoopDelay, path }: {
    consumerBootDelay?: number,
    consumerLoopDelay?: number,
    path: string,
  }) {
    this.path = path;
    this.consumerBootDelay = consumerBootDelay || 50;
    this.consumerLoopDelay = consumerLoopDelay || 50;
  }

  /**
   * Загружаем данные из файла по мере его готовности.
   * @param bname
   */
  async consume(bname: string): Promise<string> | never {
    const m = (...args) => console.log('\x1b[32mfunc():\x1b[0m', ...args);

    const fname = pth.join(await this.conveyPath(), bname);
    const pname = this.makeSemaPname(fname);

    // Делаем стартовую паузу, чтобы продюсер успел раньше нас.
    await sleep(this.consumerBootDelay);

    // Ждём появления семафорной диры.
    while (true) {
      try {
        // Щупаем объект файловой системы.
        const st = await fs.stat(pname);

        // Если мы здесь, значит что-то существует. Это дира?
        if (!st.isDirectory()) throw new Error(`Invalid semaphore: ${_(pname)}`)

        // Дождались. Можно читать данные.
        break;
      } catch {}

      await sleep(this.consumerLoopDelay);
    } // while

    // Читаем данные и возвращаем их.
    return (await fs.readFile(fname)).toString();
  }

  /**
   * Сохраняем данные в файл и сигналим о готовности.
   * @param bname Базовое имя файла, например `'cookies.json'`.
   */
  async produce(bname: string, content: string): Promise<void> {
    const fname = pth.join(await this.conveyPath(), bname);
    const pname = this.makeSemaPname(fname);

    // Безусловно сносим семафорную диру.
    // Продюсер -- только мы и больше никто.
    // Раз нас вызвали, значит данные нужно записать заново.
    try {
      await fs.rmdir(pname);
    } catch {}

    // Пишем данные, создаём семафор.
    await fs.writeFile(fname, content);
    await fs.mkdir(pname);
  }

  //--------------------------------------

  /** Создаём директорию для данных и возвращаем путь к ней. */
  @Memoize()
  private async conveyPath(): Promise<string> {
    await fs.mkdir(this.path, { recursive: true });
    return this.path;
  }

  /**
   * Составляем имя семафорной директории.
   * @param fname Например, `'/path/to/file.json'`.
   */
  private makeSemaPname(fname: string): string {
    return `${fname}.ready`;
  }
}

//--------------------------------------

const _ = JSON.stringify;
