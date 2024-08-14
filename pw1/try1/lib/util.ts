
/**
 * Инструменты. Желательно, чтобы их было как можно меньше.
 * @module
 */

/** Инспектируем аргумент. */
export function _(arg: unknown): string {
  return JSON.stringify(arg);
}

/** Спим асинхронно. */
export async function sleep(delay: number) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), delay))
}
