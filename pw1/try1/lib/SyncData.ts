
import * as fs from 'fs/promises';
import * as pth from 'path';
import { Memoize } from 'typescript-memoize';

/**
 * Поставщик и потребитель синхронных файловых данных.
 */
export class SyncData {
  /** Путь к данным. */
  private readonly path: string;

  constructor({ path }: { path: string }) {
    this.path = path;
  }

  /**
   * Загружаем данные из файла по мере его готовности.
   * @param bname
   */
  async consume(bname: string): string {

  }

  /**
   * Сохраняем данные в файл и сигналим о готовности.
   * @param bname Базовое имя файла, например `'cookies.json'`.
   */
  async produce(bname: string, content: string): Promise<void> {
    const m = (...args) => console.log('\x1b[32mprovide():\x1b[0m', ...args);

    const fname = pth.join(await this.conveyPath(), bname);
    const pname = this.makeSemaPname(fname);
    m('pname', pname);

    // Безусловно сносим семафорную диру.
    // Продюсер -- только мы, и больше никто.
    // Раз нас вызвали, значит данные нужно записать заново.
    try {
      await fs.rmdir(pname, { });
      m('rmdir ok');
    } catch {}

    await fs.writeFile(fname, content);
    await fs.mkdir(pname);
  }

  //--------------------------------------

  /** Создаём директорию для данных и возвращаем путь к ней. */
  @Memoize()
  private async conveyPath(): Promise<string> {
    // AF: TODO: Fin.
    const m = (...args) => console.log('\x1b[32mpath():\x1b[0m', ...args);
    await fs.mkdir(this.path, { recursive: true });
    return this.path;
  }

  /**
   * Форматируем имя семафорной директории.
   * @param fname Например, `'/path/to/file.json'`.
   */
  private makeSemaPname(fname: string): string {
    return `${fname}.ready`;
  }
}
