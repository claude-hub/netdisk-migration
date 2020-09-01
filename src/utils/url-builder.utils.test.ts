// Utils
import { buildQueryString } from './url-builder.utils';

describe('#url-builder.utils.ts', () => {
  test('Builds url correctly with params and query', () => {
    const url = '/some-url/:userName';

    const query = { userId: 0, name: 'Cat', isActive: true, houseIds: [1, 2, 3] };
    const params = { userName: 'Albert' };

    expect(buildQueryString(url, { query, params })).toEqual(
      '/some-url/Albert?userId=0&name=Cat&isActive=true&houseIds=1%2C2%2C3'
    );
  });

  test('Builds url correctly if we pass empty array in query', () => {
    const url = '/some-url';

    const query = { users: [] };

    expect(buildQueryString(url, { query })).toEqual(url);
  });

  test('Builds url correctly without params and query', () => {
    const url = '/some-url';

    expect(buildQueryString(url)).toEqual(url);
  });
});
