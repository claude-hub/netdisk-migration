// Modules
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

// Constants
import { SHOW_MODAL, HIDE_MODAL } from 'constants/modals.constants';

/**
 * Modals state interface
 */
interface StateI {
  [id: string]: {
    isShown: boolean;
    [t: string]: any;
  };
}

/**
 * Modal action payload interface
 */
interface ModalActionPayloadI<T extends object> {
  id: string;
  additionalData: T;
}

const initialState = {} as StateI;

const handleShowModal = <T extends object>(state: StateI, action: PayloadAction<ModalActionPayloadI<T>>) => {
  const {
    payload: { id, additionalData },
  } = action;

  if (!id) {
    return state;
  }

  return {
    ...state,
    [id]: {
      additionalData,
      isShown: true,
    },
  };
};

const handleHideModal = <T extends object>(state: StateI, action: PayloadAction<ModalActionPayloadI<T>>) => {
  const {
    payload: { id, additionalData },
  } = action;

  if (!id) {
    return state;
  }

  return {
    ...state,
    [id]: {
      additionalData,
      isShown: false,
    },
  };
};

const handlers = {
  [SHOW_MODAL]: handleShowModal,
  [HIDE_MODAL]: handleHideModal,
};

export default createReducer(initialState, handlers);
