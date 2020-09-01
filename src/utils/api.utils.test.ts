// Utils
import { fetchAPI } from './api.utils';

// Mocking the Fetch API
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);

describe('#api.utils.ts', () => {
  test('Passes correct arguments to the Fetch API', () => {
    const url = '/get-more-cats';
    const params = { method: 'POST' };

    fetchAPI(url, params);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenNthCalledWith(1, url, params);
  });
});
