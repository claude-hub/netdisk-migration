// Utils
import { buildActionType } from './build-action-type.utils';

describe('#build-action-type.ts', () => {
  test('Builds action type correctly', () => {
    expect(buildActionType('action-name', 'fetch')).toEqual('action-name/fetch');
  });
});
