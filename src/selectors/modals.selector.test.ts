// Selectors
import { selectModalDataById } from './modals.selector';

// Typings
import { RootReducerStateT } from 'store/typings';

describe('#modals.selector.ts', () => {
  const EXISTING_MODAL_ID = 'existing-modal-id';
  const NON_EXISTING_MODAL_ID = 'non-existing-modal-id';

  const existingModalData = { isShown: true, additionalData: { foo: 'bar' } };

  const state = ({
    global: {
      modals: {
        [EXISTING_MODAL_ID]: existingModalData,
      },
    },
  } as unknown) as RootReducerStateT;

  describe('#selectModalDataById', () => {
    test('Selects correct data', () => {
      const modalData = selectModalDataById(state, EXISTING_MODAL_ID);

      expect(modalData).toEqual(existingModalData);
    });

    test('Returns default modal data if it does not exist', () => {
      const modalData = selectModalDataById(state, NON_EXISTING_MODAL_ID);

      expect(modalData).toEqual({ isShown: false });
    });
  });
});
