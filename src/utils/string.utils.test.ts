// Utils
import { includesBy } from './string.utils';

describe('#string.utils.ts', () => {
  describe('#includesBy', () => {
    test('Works correctly if no `decorator` has been passed', () => {
      const str1 = 'This is a very long string';
      const str2 = 'is a';
      const str3 = 'whaaat';

      expect(includesBy(str1, str2)).toBe(true);

      expect(includesBy(str1, str3)).toBe(false);
    });

    test('Decorates the passed values before checking if one includes another', () => {
      const str1 = 'This is a very long string';
      const str2 = 'IS A';

      const decorator = (str: string) => str.toLowerCase();

      expect(includesBy(str1, str2, decorator)).toBe(true);
    });
  });
});
