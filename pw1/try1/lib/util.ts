
/**
 * Инструменты. Желательно, чтобы их было как можно меньше.
 * @module
 */

/**
 * Спим асинхронно.
 */
export async function sleep(delay: number) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), delay))
}
