// Utils
import { createEntityFieldGetter, createEntityPathGetter, getLabel, getValue } from './getters.utils';

/**
 * Article field names enum
 */
enum ArticleFieldsE {
  ID = 'id',
  DESCRIPTION = 'description',
  USER = 'user',
}

/**
 * Article `user` field names enum
 */
enum ArticleUserFieldsE {
  NAME = 'name',
  USERNAME = 'username',
}

/**
 * Article `user` field interface
 */
interface ArticleUserI {
  [ArticleUserFieldsE.NAME]: string;
  [ArticleUserFieldsE.USERNAME]: string;
}

/**
 * Article entity interface
 */
interface ArticleI {
  [ArticleFieldsE.ID]: number;
  [ArticleFieldsE.DESCRIPTION]: string;
  [ArticleFieldsE.USER]: ArticleUserI;
}

describe('#getters.utils.ts', () => {
  const article: ArticleI = {
    id: 1,
    description: 'This is desc',
    user: {
      name: 'User',
      username: 'some-username',
    },
  };

  describe('#createEntityFieldGetter', () => {
    const articleDescriptionGetter = createEntityFieldGetter<ArticleI, ArticleFieldsE.DESCRIPTION>(
      ArticleFieldsE.DESCRIPTION
    );

    test('Returns the getter function', () => {
      expect(articleDescriptionGetter).toBeInstanceOf(Function);
    });

    test('Getter function returns correct data', () => {
      expect(articleDescriptionGetter(article)).toEqual(article.description);
    });

    test('Getter function returns the default value if the data is missing', () => {
      const defaultValue = 'this is a default value';

      expect(articleDescriptionGetter(null, defaultValue)).toEqual(defaultValue);
    });

    test('Getter function returns undefined if the data and default value are missing', () => {
      expect(articleDescriptionGetter(null)).toEqual(undefined);
    });
  });

  describe('#createEntityPathGetter', () => {
    const articleUserNameGetter = createEntityPathGetter<ArticleI, ArticleUserI[ArticleUserFieldsE.NAME]>([
      ArticleFieldsE.USER,
      ArticleUserFieldsE.NAME,
    ]);

    test('Returns the getter function', () => {
      expect(articleUserNameGetter).toBeInstanceOf(Function);
    });

    test('Getter function returns correct data', () => {
      expect(articleUserNameGetter(article)).toEqual(article.user.name);
    });

    test('Getter function returns the default value if the data is missing', () => {
      const defaultValue = 'this is a default value';

      expect(articleUserNameGetter(null, defaultValue)).toEqual(defaultValue);
    });

    test('Getter function returns undefined if the data and default value are missing', () => {
      expect(articleUserNameGetter(null)).toEqual(undefined);
    });
  });

  describe('#getLabel', () => {
    const label = 'some label';
    const value = 'some value';
    const data = { label, value };

    test('Returns correct data', () => {
      expect(getLabel(data)).toEqual(label);
    });

    test('Returns the default value if the data is missing', () => {
      const defaultValue = 'this is a default value';

      expect(getLabel(undefined, defaultValue)).toEqual(defaultValue);
    });

    test('Returns undefined if the data and default value are missing', () => {
      expect(getLabel(undefined)).toEqual(undefined);
    });
  });

  describe('#getValue', () => {
    const label = 'some label';
    const value = 'some value';
    const data = { label, value };

    test('Returns correct data', () => {
      expect(getValue(data)).toEqual(value);
    });

    test('Returns the default value if the data is missing', () => {
      const defaultValue = 'this is a default value';

      expect(getValue(undefined, defaultValue)).toEqual(defaultValue);
    });

    test('Returns undefined if the data and default value are missing', () => {
      expect(getValue(undefined)).toEqual(undefined);
    });
  });
});
