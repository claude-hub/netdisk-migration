// Selectors
import { selectModalDataById } from 'selectors/modals.selector';

// Constants
import { USER_DETAILS_MODAL_ID } from '../constants/user-details-modals.constants';

// Typings
import { RootReducerStateT } from 'store/typings';
import { UserI } from '../typings/user.typings';

/**
 * Selects user details modal data
 */
export const selectUserDetailsModalData = (state: RootReducerStateT) =>
  selectModalDataById<{ user: UserI }>(state, USER_DETAILS_MODAL_ID);
