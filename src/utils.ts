export function isValidDate(str = '') {
  if (!str) return false;
  const date = new Date(str);
  return !isNaN(date.getTime());
}
