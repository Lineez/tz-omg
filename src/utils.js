/**
 * Возвращает случайное число между min (включительно) и max (включительно)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}