// Constants
import { SHOW_MODAL, HIDE_MODAL } from 'constants/modals.constants';

/**
 * Action for showing a modal window by its id
 */
export const showModal = <T extends object>(id: string, additionalData: T = {} as T) => ({
  type: SHOW_MODAL,
  payload: {
    id,
    additionalData,
  },
});

/**
 * Action for hiding a modal window by its id
 */
export const hideModal = <T extends object>(id: string, additionalData: T = {} as T) => ({
  type: HIDE_MODAL,
  payload: {
    id,
    additionalData,
  },
});
