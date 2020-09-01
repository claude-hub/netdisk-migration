// Reducers
import modalsReducer from './modals.reducer';

// Constants
import { SHOW_MODAL, HIDE_MODAL } from 'constants/modals.constants';

// Actions
import { showModal, hideModal } from 'actions/modals.action';

describe('#modals.reducer.ts', () => {
  const MODAL_ID = 'modal-id';
  const additionalData = { foo: 'bar' };

  const initialState = {};

  const unsupportedAction = { type: 'UNSUPPORTED_ACTION_TYPE' };

  test('Returns initial state if the state is not specified and the action type is not supported', () => {
    expect(modalsReducer(undefined, unsupportedAction)).toEqual(initialState);
  });

  test('Returns initial state if the action type is not supported', () => {
    expect(modalsReducer(initialState, unsupportedAction)).toEqual(initialState);
  });

  describe(`=> action type: ${SHOW_MODAL}`, () => {
    test('Returns correct state', () => {
      expect(modalsReducer(initialState, showModal(MODAL_ID, additionalData))).toEqual({
        ...initialState,
        [MODAL_ID]: { isShown: true, additionalData },
      });
    });

    test('Returns the same state if modal id is missing', () => {
      expect(modalsReducer(initialState, showModal(''))).toEqual(initialState);
    });
  });

  describe(`=> action type: ${HIDE_MODAL}`, () => {
    test('Returns correct state', () => {
      expect(modalsReducer(initialState, hideModal(MODAL_ID, additionalData))).toEqual({
        ...initialState,
        [MODAL_ID]: { isShown: false, additionalData },
      });
    });

    test('Returns the same state if modal id is missing', () => {
      expect(modalsReducer(initialState, hideModal(''))).toEqual(initialState);
    });
  });
});
