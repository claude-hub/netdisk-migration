/**
 * Helper for checking if one string includes another.
 * It also accepts a `decorator` function which decorates
 * the strings before checking for including
 */
export const includesBy = (str1: string, str2: string, decorator: (str: string) => string = val => val) =>
  decorator(str1).includes(decorator(str2));
