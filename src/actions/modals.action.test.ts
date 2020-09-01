// Constants
import { SHOW_MODAL, HIDE_MODAL } from 'constants/modals.constants';
// Actions
import { showModal, hideModal } from './modals.action';

describe('#modals.action.ts', () => {
  const id = 'modal-id';
  const additionalData = { foo: 'bar' };

  describe('#showModal', () => {
    test('Creates a show modal action', () => {
      const expectedAction = {
        type: SHOW_MODAL,
        payload: {
          id,
          additionalData,
        },
      };

      expect(showModal(id, additionalData)).toEqual(expectedAction);
    });
  });

  describe('#hideModal', () => {
    test('Creates a hide modal action', () => {
      const expectedAction = {
        type: HIDE_MODAL,
        payload: {
          id,
          additionalData,
        },
      };

      expect(hideModal(id, additionalData)).toEqual(expectedAction);
    });
  });
});
