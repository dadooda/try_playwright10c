
import * as fs from 'fs/promises';
import * as pth from 'path';
import { Memoize } from 'typescript-memoize';

import { sleep } from './util';

/**
 * Поставщик и потребитель синхронных файловых данных.
 *
 * Потребители ждут. Поставщик готовит данные и сигналит о готовности.
 */
export class SyncData {
  private readonly consumerBootDelay: number;
  private readonly consumerLoopDelay: number;
  private readonly path: string;

  constructor({ consumerBootDelay, consumerLoopDelay, path }: {
    /** Задержка `consume()` при старте, миллисекунд. По умолчанию 50. */
    consumerBootDelay?: number,

    /** Задержка `consume()` между циклами ожидания семафора, миллисекунд. По умолчанию 50. */
    consumerLoopDelay?: number,

    /** Рабочая директория для файлов и семафоров. */
    path: string,
  }) {
    this.consumerBootDelay = consumerBootDelay || 50;
    this.consumerLoopDelay = consumerLoopDelay || 50;
    this.path = path;
  }

  /**
   * Потребляем данные из файла, как только он будет готов.
   * @param bname Базовое имя файла, например `'cookies.json'`.
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
        // Щупаем объект файловой системы. Если нету -- вылетит в `catch`.
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
   * Поставляем данные в файл и сигналим о готовности.
   * @param bname Базовое имя файла, например `'cookies.json'`.
   * @param content Содержимое.
   */
  async produce(bname: string, content: string): Promise<void> {
    // TODO: Fin. См. `produceRight()`.

    const fname = pth.join(await this.conveyPath(), bname);
    const pname = this.makeSemaPname(fname);

    // С ходу сносим семафорную диру.
    // Продюсер -- только мы и больше никто.
    // Раз нас вызвали, значит данные нужно поставить заново.
    try {
      await fs.rmdir(pname);
    } catch {}

    // Пишем данные, создаём семафор.
    await fs.writeFile(fname, content);
    await fs.mkdir(pname);
  }

  /**
   * Поставляем данные в файл и сигналим о готовности.
   * @param bname Базовое имя файла, например `'cookies.json'`.
   * @param content Асинхронный callback для генерации данных.
   */
  async produceRight(bname: string, contentFn: () => Promise<string>): Promise<void> {
    const dt = (...args) => console.log('\x1b[32mproduceRight():\x1b[0m', ...args);
    dt('hey');

    const fname = pth.join(await this.conveyPath(), bname);
    const pname = this.makeSemaPname(fname);

    // С ходу сносим семафорную диру.
    // Продюсер -- только мы и больше никто.
    // Раз нас вызвали, значит данные нужно поставить заново.
    try {
      await fs.rmdir(pname);
    } catch {}

    // Получаем данные.
    const cnt = await contentFn();
    dt('cnt', cnt);

    // Получаем данные. Пишем данные. Создаём семафор.
    await fs.writeFile(fname, cnt);
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

//-------------------------------------- Служебное

const _ = JSON.stringify;
